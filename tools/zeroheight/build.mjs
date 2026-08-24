#!/usr/bin/env node
// Maintainer tooling for the repo -> ZeroHeight push pipeline (text only).
// Not part of the distributed skill (see tools/cli for that).
//
//   node tools/zeroheight/build.mjs build [name]   generate zeroheight/ pages
//   node tools/zeroheight/build.mjs check          verify generated output is current
//
// Canonical source is any reference/**/<name>.md carrying `sync: push`.
// Generated output is never hand-edited; `check` enforces that.
//
// Deliberately text only: no Figma export, no image handling, no network, no
// credentials. Images and component tab-splitting live in the fuller pipeline
// on docs/zeroheight-push-pipeline.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const REFERENCE = join(ROOT, 'reference');
const OUT = join(ROOT, 'zeroheight');

// Repo-only scaffolding that must not reach ZeroHeight.
const DROP_SECTIONS = ['Source'];
const LOCAL_GUIDANCE = /^>\s*\*\*Local guidance/;
const SUPERSEDED = /^>\s*\*\*Superseded/;
const GAP_MARKER = /^_Not available in ZeroHeight.*to review\._\s*$/;

// Machine-readable tags exist so an agent can address a variant or state without
// parsing prose. On ZeroHeight they are meaningless slugs, so they come out.
const TAG = /`(?:pattern|variant|state|property|context|transition):\s*[a-z0-9-]+`/g;

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
  const sections = [];
  let current = { name: '__intro__', lines: [] };
  for (const line of body.split('\n')) {
    const m = line.match(/^## (.+)$/);
    if (m) { sections.push(current); current = { name: m[1].trim(), lines: [] }; }
    else current.lines.push(line);
  }
  sections.push(current);
  return sections;
}

// Remove the H1, protected-marker blocks, gap markers, and machine-readable
// tags. A line that held nothing but tags is dropped; one that held tags plus
// prose keeps the prose, with any orphaned separator tidied away.
//
// The two markers come out differently. Local guidance loses only its marker
// line, because the block beneath it is real documentation. Superseded loses
// the whole banner: it warns about the doc rather than documenting the
// component, and a page telling its own reader it is out of date, in repo
// bookkeeping wording, reads as noise on ZeroHeight.
function clean(lines, isIntro) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isIntro && /^# /.test(line)) continue;
    if (LOCAL_GUIDANCE.test(line)) continue;
    if (SUPERSEDED.test(line)) {
      while (i + 1 < lines.length && /^\s*>/.test(lines[i + 1])) i++;
      continue;
    }
    if (GAP_MARKER.test(line)) continue;
    if (!TAG.test(line)) { out.push(line); continue; }
    TAG.lastIndex = 0;
    const stripped = line.replace(TAG, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/^\s*[·|]\s*/, '')
      .replace(/\s*[·|]\s*$/, '')
      .replace(/\s+([:;,.])/g, '$1')
      .trim();
    if (stripped) out.push(stripped);
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

// ------------------------------------------------------------------ discovery

function allDocs() {
  const out = [];
  const walk = dir => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) { walk(p); continue; }
      if (!f.endsWith('.md') || f.startsWith('_')) continue;
      out.push({ path: p, rel: relative(REFERENCE, p) });
    }
  };
  walk(REFERENCE);
  return out.map(d => ({ ...d, source: readFileSync(d.path, 'utf8') }));
}

function pushDocs(filter) {
  return allDocs()
    .filter(d => {
      try { return parseFrontmatter(d.source).data.sync === 'push'; }
      catch { return false; }
    })
    .filter(d => !filter || d.rel === filter || d.rel.endsWith(`/${filter}.md`) || d.rel === `${filter}.md`);
}

// Relative links are correct in the repo but dead on ZeroHeight, which does not
// resolve relative paths. Map every reference doc's repo-relative path to the
// ZeroHeight URL it declares, so a link can be rewritten to the real page.
let docIndex = null;
function index() {
  if (docIndex) return docIndex;
  docIndex = new Map();
  for (const d of allDocs()) {
    try {
      const { data, body } = parseFrontmatter(d.source);
      const h1 = body.match(/^# (.+)$/m);
      docIndex.set(d.rel, {
        url: data.zeroheight_url && data.zeroheight_url !== 'TBD' ? data.zeroheight_url : null,
        title: data.component || data.pattern || data.fundamental || (h1 && h1[1].trim()) || d.rel,
      });
    } catch { /* unparseable frontmatter is reported by the doc's own tooling */ }
  }
  return docIndex;
}

// Rewrite each relative link to the target's ZeroHeight URL when the target
// declares one, and otherwise drop the link and keep the text. Flattened
// targets are reported: a repeated one is a real gap, not noise.
function resolveLinks(text, fromRel, flattened) {
  const docs = index();
  const lookup = target => {
    const path = target.split('#')[0];
    const key = relative(REFERENCE, resolve(join(REFERENCE, dirname(fromRel)), path));
    return { key, hit: docs.get(key) };
  };

  // Markdown links: keep the author's label, point it at the real page.
  text = text.replace(/\[([^\]]+)\]\((?!https?:)([^)]+)\)/g, (whole, label, target) => {
    const { key, hit } = lookup(target);
    if (!hit) return whole;                       // not a reference doc, leave alone
    if (hit.url) return `[${label}](${hit.url})`;
    flattened.add(`${key} (from ${fromRel})`);
    return label;
  });

  // Backticked bare paths (`../tokens/motion.md`), the dominant style in these
  // docs. Only rewritten when the target resolves to a real reference doc, so
  // token names that happen to end in .md (`space.md`) are left untouched.
  return text.replace(/`([^`\s]+\.md)`/g, (whole, target) => {
    const { key, hit } = lookup(target);
    if (!hit) return whole;
    if (hit.url) return `[${hit.title}](${hit.url})`;
    flattened.add(`${key} (from ${fromRel})`);
    return hit.title;                             // readable prose, not a dead path
  });
}

// -------------------------------------------------------------------- build

function render(source, fromRel, flattened) {
  const { data, body } = parseFrontmatter(source);
  if (data.sync !== 'push') return null;

  const parts = [];
  for (const s of splitSections(body)) {
    if (DROP_SECTIONS.includes(s.name)) continue;
    const lines = trimBlank(clean(s.lines, s.name === '__intro__'));
    if (isBlank(lines)) continue; // gap-only or empty section
    parts.push(s.name === '__intro__' ? lines.join('\n') : `## ${s.name}\n\n${lines.join('\n')}`);
  }
  const joined = parts.join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  return { data, text: resolveLinks(joined, fromRel, flattened) };
}

const outPathFor = rel => join(OUT, rel);

function build(filter, { write = true } = {}) {
  const docs = pushDocs(filter);
  const flattened = new Set();
  const results = [];
  for (const d of docs) {
    const r = render(d.source, d.rel, flattened);
    if (!r) continue;
    results.push({ rel: d.rel, out: outPathFor(d.rel), text: r.text });
  }
  if (write) {
    if (existsSync(OUT)) rmSync(OUT, { recursive: true });
    for (const r of results) { mkdirSync(dirname(r.out), { recursive: true }); writeFileSync(r.out, r.text); }
  }
  return { results, flattened };
}

// ------------------------------------------------------------------- commands

const [cmd, ...rest] = process.argv.slice(2);
const filter = rest.find(a => !a.startsWith('-'));

if (cmd === 'build') {
  const { results, flattened } = build(filter);
  if (!results.length) {
    console.log('No docs with `sync: push` found.' + (filter ? ` (filter: ${filter})` : ''));
    process.exit(0);
  }
  for (const r of results) console.log(`  ${r.rel}  ->  ${relative(ROOT, r.out)}`);
  console.log(`\n${results.length} page(s) built into ${relative(ROOT, OUT)}/`);
  if (flattened.size) {
    console.log('\nFlattened links (target has no zeroheight_url, rendered as plain text):');
    for (const f of [...flattened].sort()) console.log(`  ${f}`);
  }
} else if (cmd === 'check') {
  const { results } = build(undefined, { write: false });
  const stale = results.filter(r => !existsSync(r.out) || readFileSync(r.out, 'utf8') !== r.text);
  const known = new Set(results.map(r => r.out));
  const orphans = [];
  const walk = dir => { if (!existsSync(dir)) return; for (const f of readdirSync(dir)) {
    const p = join(dir, f); statSync(p).isDirectory() ? walk(p) : (known.has(p) || orphans.push(p)); } };
  walk(OUT);
  if (!stale.length && !orphans.length) { console.log(`zeroheight/ is current (${results.length} page(s)).`); process.exit(0); }
  for (const r of stale) console.error(`  stale or missing: ${relative(ROOT, r.out)}`);
  for (const o of orphans) console.error(`  not generated by any push doc: ${relative(ROOT, o)}`);
  console.error('\nRun `node tools/zeroheight/build.mjs build`. Never hand-edit zeroheight/.');
  process.exit(1);
} else {
  console.error('usage: build.mjs build [name] | check');
  process.exit(1);
}
