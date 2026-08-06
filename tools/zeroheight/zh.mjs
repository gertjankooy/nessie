#!/usr/bin/env node
// Maintainer tooling for the repo -> ZeroHeight push pipeline.
// Not part of the distributed skill (see tools/cli for that).
//
//   node tools/zeroheight/zh.mjs build   [name]   generate zeroheight/ tab files
//   node tools/zeroheight/zh.mjs images  [name]   export Figma frames to PNG
//   node tools/zeroheight/zh.mjs check            verify generated output is current
//
// Canonical source is reference/components/<name>.md with `sync: push`.
// Generated output is never hand-edited; `check` enforces that.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

// Load the repo-root .env if present. Node only does this with --env-file, and
// relying on a flag means forgetting the flag. A real environment variable
// always wins, so CI can set FIGMA_TOKEN without a file.
function loadEnv() {
  const path = join(ROOT, '.env');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^\s*(?:export\s+)?([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/i);
    if (!m) continue;
    const value = m[2].trim().replace(/^["'](.*)["']$/, '$1');
    if (process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}
loadEnv();
const COMPONENTS = join(ROOT, 'reference/components');
const OUT = join(ROOT, 'zeroheight');
const ASSETS = join(OUT, 'assets');

// Default Figma file: NES App Components. Override per doc with `figma_file:`.
const DEFAULT_FIGMA_FILE = 'KsSrdx1GQvt1kRfXhsPiT6';

// Image URLs are written against `main` in the source, because that is where
// they resolve once merged. The build retargets them to whatever ref is checked
// out, so pointing ZeroHeight at a branch works without editing any source.
// Override with --ref <branch> or ZH_REF.
const RAW_BASE = 'https://raw.githubusercontent.com/gertjankooy/nessie/';
const retargetAssets = (text, ref) =>
  ref === 'main' ? text : text.replaceAll(`${RAW_BASE}main/`, `${RAW_BASE}${ref}/`);

// Which sections land in which tab. Dev is authored in ZeroHeight, never generated.
const TABS = {
  overview:   ['__intro__', 'Usage', 'Anatomy'],
  guidelines: ['Configurations', 'Placement', 'Behavior', 'Best practices'],
  a11y:       ['Accessibility'],
  content:    ['Content guidelines'],
};

// Repo-only scaffolding that must not reach ZeroHeight.
const DROP_SECTIONS = ['Source'];
const LOCAL_GUIDANCE = /^>\s*\*\*Local guidance/;
const GAP_MARKER = /^_Not available in ZeroHeight.*to review\._\s*$/;

// ---------------------------------------------------------------- frontmatter

// Minimal YAML subset: scalars, inline [lists], inline {maps}, and nested
// two-space block maps. Throws on anything it doesn't understand rather than
// guessing, so a malformed doc fails loudly instead of generating silent junk.
function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return { data: {}, body: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) throw new Error('unterminated frontmatter');
  const raw = text.slice(4, end);
  const body = text.slice(text.indexOf('\n', end + 1) + 1);

  const data = {};
  let parentKey = null;
  for (const line of raw.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const nested = line.match(/^ {2}([\w.-]+):\s*(.*)$/);
    if (nested) {
      if (!parentKey) throw new Error(`indented key with no parent: ${line}`);
      data[parentKey][nested[1]] = unquote(stripComment(nested[2]));
      continue;
    }

    const top = line.match(/^([\w.-]+):\s*(.*)$/);
    if (!top) throw new Error(`unparseable frontmatter line: ${line}`);
    const [, key, rest] = top;
    const value = stripComment(rest);

    if (value === '') { data[key] = {}; parentKey = key; continue; }
    parentKey = null;

    if (value.startsWith('[')) {
      data[key] = value.slice(1, -1).split(',').map(s => unquote(s.trim())).filter(Boolean);
    } else if (value.startsWith('{')) {
      data[key] = {};
      for (const pair of value.slice(1, -1).split(',')) {
        if (!pair.trim()) continue;
        const i = pair.indexOf(':');
        data[key][unquote(pair.slice(0, i).trim())] = unquote(pair.slice(i + 1).trim());
      }
    } else {
      data[key] = unquote(value);
    }
  }
  return { data, body };
}

// Only strip a trailing comment when the '#' is clearly not inside a value.
const stripComment = s => s.replace(/\s+#\s.*$/, '').trim();
const unquote = s => s.replace(/^["'](.*)["']$/, '$1');

// -------------------------------------------------------------------- parsing

// Split a body into its `## ` sections, keeping anything before the first one
// as __intro__ (the H1 plus the lead paragraph).
function splitSections(body) {
  const lines = body.split('\n');
  const sections = [];
  let current = { name: '__intro__', lines: [] };
  for (const line of lines) {
    const m = line.match(/^## (.+)$/);
    if (m) {
      sections.push(current);
      current = { name: m[1].trim(), lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  sections.push(current);
  return sections;
}

// Remove the H1, Local guidance marker lines, and gap markers.
function clean(lines, isIntro) {
  const out = [];
  for (const line of lines) {
    if (isIntro && /^# /.test(line)) continue;
    if (LOCAL_GUIDANCE.test(line)) continue;
    if (GAP_MARKER.test(line)) continue;
    out.push(line);
  }
  return out;
}

const isBlank = lines => lines.every(l => !l.trim());
const trimBlank = lines => {
  let a = 0, b = lines.length;
  while (a < b && !lines[a].trim()) a++;
  while (b > a && !lines[b - 1].trim()) b--;
  return lines.slice(a, b);
};

// Promote every heading one level, used when a tab holds a single section.
const promote = lines => lines.map(l => (/^###+ /.test(l) ? l.slice(1) : l));

// Relative links are correct in the repo but dead on ZeroHeight, which does not
// resolve relative paths. Rewrite each one to the target's ZeroHeight URL when
// the target declares one, and otherwise drop the link and keep the text.
let urlMap = null;
function zeroheightUrls() {
  if (urlMap) return urlMap;
  urlMap = new Map();
  for (const f of readdirSync(COMPONENTS)) {
    if (!f.endsWith('.md')) continue;
    try {
      const { data } = parseFrontmatter(readFileSync(join(COMPONENTS, f), 'utf8'));
      if (data.zeroheight_url && data.zeroheight_url !== 'TBD') urlMap.set(f, data.zeroheight_url);
    } catch { /* unparseable frontmatter is reported by the doc's own tooling */ }
  }
  return urlMap;
}

function resolveLinks(text, flattened) {
  const urls = zeroheightUrls();
  return text.replace(/\[([^\]]+)\]\((?!https?:)([^)]+)\)/g, (whole, label, target) => {
    // Only same-directory component links can be resolved. A target containing
    // a slash points outside reference/components/ (../content/link.md is a
    // different file from link.md) and must never collide with a component of
    // the same basename.
    const path = target.split('#')[0];
    const url = path.includes('/') ? null : urls.get(path);
    if (url) return `[${label}](${url})`;
    flattened.add(target);
    return label;
  });
}

// -------------------------------------------------------------------- build

function renderTabs(source, flattened = new Set(), ref = 'main') {
  const { data, body } = parseFrontmatter(source);
  if (data.sync !== 'push') return null;

  const sections = splitSections(body);
  const byName = new Map();
  for (const s of sections) {
    if (DROP_SECTIONS.includes(s.name)) continue;
    const lines = trimBlank(clean(s.lines, s.name === '__intro__'));
    if (s.name !== '__intro__' && isBlank(lines)) continue; // gap-only section
    byName.set(s.name, lines);
  }

  const files = {};
  for (const [tab, wanted] of Object.entries(TABS)) {
    const present = wanted.filter(n => byName.has(n));
    if (!present.length) continue;

    // A tab holding exactly one named section drops that header and promotes,
    // so the tab doesn't repeat its own name.
    const single = present.length === 1 && present[0] !== '__intro__';
    const parts = present.map(name => {
      const lines = byName.get(name);
      if (name === '__intro__') return trimBlank(lines).join('\n');
      if (single) return promote(trimBlank(lines)).join('\n');
      return `## ${name}\n\n${trimBlank(lines).join('\n')}`;
    });
    const joined = parts.join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
    files[tab] = retargetAssets(resolveLinks(joined, flattened), ref);
  }
  return { data, files };
}

function pushDocs(filter) {
  return readdirSync(COMPONENTS)
    .filter(f => f.endsWith('.md') && !f.startsWith('_') && f !== 'index.md')
    .filter(f => !filter || f === `${filter}.md`)
    .map(f => ({ name: f.replace(/\.md$/, ''), path: join(COMPONENTS, f) }))
    .map(d => ({ ...d, source: readFileSync(d.path, 'utf8') }))
    .filter(d => {
      try { return parseFrontmatter(d.source).data.sync === 'push'; }
      catch { return false; }
    });
}

// Default to the branch actually checked out, so `build` and `check` always
// agree. Merging to main leaves the output pointing at the old branch, which
// `check` then flags as stale, prompting the rebuild that fixes it.
function currentRef() {
  if (process.env.ZH_REF) return process.env.ZH_REF;
  const i = process.argv.indexOf('--ref');
  if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1];
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { cwd: ROOT, encoding: 'utf8' }).trim() || 'main';
  } catch { return 'main'; }
}

function build(filter, { write = true, flattened = new Set(), ref = currentRef() } = {}) {
  const results = [];
  for (const doc of pushDocs(filter)) {
    const rendered = renderTabs(doc.source, flattened, ref);
    if (!rendered) continue;
    for (const [tab, content] of Object.entries(rendered.files)) {
      const path = join(OUT, doc.name, `${tab}.md`);
      results.push({ path, content });
      if (write) {
        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, content);
      }
    }
  }
  return results;
}

// -------------------------------------------------------------------- images

async function images(filter) {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error('FIGMA_TOKEN is not set.');
    console.error('  cp .env.example .env   then paste your Figma personal access token');
    console.error('  Create one at: Figma > Settings > Security > Personal access tokens');
    console.error('  .env is gitignored, and the pre-commit gate blocks figd_ tokens.');
    process.exit(1);
  }

  for (const doc of pushDocs(filter)) {
    const { data } = parseFrontmatter(doc.source);
    const manifest = data.images || {};
    const names = Object.keys(manifest);
    if (!names.length) { console.log(`${doc.name}: no images declared`); continue; }

    const fileKey = data.figma_file || DEFAULT_FIGMA_FILE;
    const ids = names.map(n => manifest[n]);
    const url = `https://api.figma.com/v1/images/${fileKey}`
      + `?ids=${encodeURIComponent(ids.join(','))}&format=png&scale=2`;

    const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
    if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`);
    const { images: rendered, err } = await res.json();
    if (err) throw new Error(`Figma API: ${err}`);

    const dir = join(ASSETS, doc.name);
    mkdirSync(dir, { recursive: true });

    // Downloads are the whole cost here: one API call yields N render URLs, and
    // fetching them serially scales linearly with image count. A small worker
    // pool keeps a full rebuild bounded without hammering the CDN.
    const CONCURRENCY = 6;
    const queue = names.slice();
    const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      for (let name = queue.shift(); name !== undefined; name = queue.shift()) {
        const src = rendered[manifest[name]];
        if (!src) { console.warn(`  ${name}: node ${manifest[name]} returned no image`); continue; }
        const png = await fetch(src);
        if (!png.ok) throw new Error(`download failed for ${name}: ${png.status}`);
        writeFileSync(join(dir, `${name}.png`), Buffer.from(await png.arrayBuffer()));
        console.log(`  ${doc.name}/${name}.png`);
      }
    });
    await Promise.all(workers);
  }
}

// --------------------------------------------------------------------- check

// Regenerate in memory and compare. Catches both a hand-edited output file and
// a stale one where the source moved on.
function check() {
  const expected = build(null, { write: false });
  const problems = [];

  for (const { path, content } of expected) {
    if (!existsSync(path)) problems.push(`missing (run build): ${rel(path)}`);
    else if (readFileSync(path, 'utf8') !== content) problems.push(`out of date or hand-edited: ${rel(path)}`);
  }

  // Anything in zeroheight/ that build no longer produces is an orphan.
  const known = new Set(expected.map(e => e.path));
  if (existsSync(OUT)) {
    for (const dir of readdirSync(OUT)) {
      if (dir === 'assets') continue;
      const d = join(OUT, dir);
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (!known.has(p)) problems.push(`orphaned (no longer generated): ${rel(p)}`);
      }
    }
  }

  if (problems.length) {
    console.error('zeroheight/ is not in sync with reference/components/:');
    for (const p of problems) console.error(`  ${p}`);
    console.error('\nRun: node tools/zeroheight/zh.mjs build');
    process.exit(1);
  }
  console.log(`zeroheight/ is current (${expected.length} generated files)`);
}

const rel = p => p.replace(ROOT + '/', '');

// ---------------------------------------------------------------------- main

const argv = process.argv.slice(2).filter(a => a !== '--ref' && !a.startsWith('--'));
const [cmd, arg] = argv;
const skipImages = process.argv.includes('--skip-images');

// Everything, in the order that matters: refresh the PNGs from Figma, then
// regenerate the tab files that reference them, then verify the result.
async function all(filter) {
  if (skipImages) {
    console.log('Skipping image export (--skip-images)\n');
  } else {
    console.log('1/3  Exporting images from Figma');
    await images(filter);
    console.log('');
  }
  console.log(`${skipImages ? '1/2' : '2/3'}  Generating ZeroHeight tab files`);
  const flattened = new Set();
  const ref = currentRef();
  console.log(`     targeting ref: ${ref}`);
  const written = build(filter, { flattened, ref });
  for (const { path } of written) console.log(`     ${rel(path)}`);
  if (flattened.size) {
    console.log(`\n     ${flattened.size} link target(s) had no ZeroHeight URL and were flattened to plain text:`);
    for (const t of [...flattened].sort()) console.log(`       ${t}`);
  }
  console.log(`\n${skipImages ? '2/2' : '3/3'}  Verifying`);
  check();
}

if (cmd === 'build') {
  // Rebuild from scratch so renames and removals don't leave orphans behind.
  if (!arg && existsSync(OUT)) {
    for (const dir of readdirSync(OUT)) {
      if (dir !== 'assets') rmSync(join(OUT, dir), { recursive: true, force: true });
    }
  }
  const flattened = new Set();
  const ref = currentRef();
  console.log(`targeting ref: ${ref}`);
  const written = build(arg, { flattened });
  for (const { path } of written) console.log(`  ${rel(path)}`);
  console.log(`${written.length} file(s) generated`);
  if (flattened.size) {
    console.log(`\n${flattened.size} link target(s) had no ZeroHeight URL, so the link text was kept without a link:`);
    for (const t of [...flattened].sort()) console.log(`  ${t}`);
    console.log('Give the target a zeroheight_url in its frontmatter to turn these back into links.');
  }
} else if (cmd === 'images') {
  await images(arg);
} else if (cmd === 'check') {
  check();
} else if (cmd === 'all') {
  await all(arg);
} else {
  console.log(`Usage:
  node tools/zeroheight/zh.mjs all    [name]   images + build + check (what /build-zeroheight runs)
  node tools/zeroheight/zh.mjs build  [name]   generate zeroheight/ tab files
  node tools/zeroheight/zh.mjs images [name]   export Figma frames to PNG (needs FIGMA_TOKEN)
  node tools/zeroheight/zh.mjs check           verify generated output is current

Options:
  --skip-images    with 'all', reuse the PNGs already exported
  --ref <branch>   override the ref image URLs point at (default: current branch)`);
  process.exit(cmd ? 1 : 0);
}
