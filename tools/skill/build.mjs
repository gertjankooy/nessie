#!/usr/bin/env node
// Maintainer tooling for the root SKILL.md (Agent Skills standard, agentskills.io).
// Not part of the distributed skill (see tools/cli for that).
//
//   node tools/skill/build.mjs build                 regenerate SKILL.md from AGENTS.md
//   node tools/skill/build.mjs check                 SKILL.md is current + passes the spec rules,
//                                                    and every link in skills/ + reference/ resolves
//   node tools/skill/build.mjs toc                   add/refresh/remove the generated "## Contents" blocks
//   node tools/skill/build.mjs spec-check            has the upstream standard changed since the snapshot?
//   node tools/skill/build.mjs spec-check --update   accept the upstream standard as the new snapshot
//
// SKILL.md = the frontmatter below + the body of AGENTS.md, verbatim. AGENTS.md
// stays the single canonical brief; SKILL.md is generated output and never
// hand-edited (`check` enforces that). Because it sits at the repo root, every
// relative path in AGENTS.md (skills/, reference/) resolves the same from both.
//
// Tables of contents: Claude's skill-authoring guide asks that reference files
// over 100 lines open with a table of contents, because Claude may preview a
// referenced file with a partial read (e.g. `head -100`) and would otherwise
// not see what the rest of the file covers. `toc` generates that block from the
// file's headings, between <!-- toc --> markers, for every playbook and
// reference page over the limit, and removes it again when a file shrinks under
// it. The block is generated output: never hand-edit it. The pre-commit hook
// regenerates it, `check` fails when one is missing or stale, /sync-docs keeps
// it, and the llms-full and ZeroHeight builds strip it (it is navigation for a
// partial read of one file, meaningless in a concatenation or on ZeroHeight).
//
// The validation rules mirror https://agentskills.io/specification. When
// `spec-check` reports an upstream change, update RULES/validate() to match,
// then accept the new snapshot with `spec-check --update`.

import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SRC = join(ROOT, 'AGENTS.md');
const OUT = join(ROOT, 'SKILL.md');
const SNAPSHOT_DIR = join(ROOT, 'tools/skill/spec-snapshot');

// ---------------------------------------------------------------- frontmatter

// Edit here, then rebuild. `description` is what agents read to decide whether
// to load the skill at all: imperative, user-intent first, explicit about the
// cases where the user doesn't name NESSIE (agentskills.io → Optimizing
// skill descriptions).
const FRONTMATTER = {
  name: 'nessie',
  description:
    'Design and audit NS (Dutch Railways) app screens with the NESSIE design system, iOS-first. ' +
    'Use this skill whenever the user wants to build, mock up or generate a screen, view, flow or component ' +
    'composition for an NS app in Figma or Figma Make; audit an existing screen or check its token bindings; ' +
    'document a NESSIE component; or asks which NESSIE component, design token, pattern, colour, spacing, ' +
    'typography, motion, UX-writing or accessibility rule applies. Use it even when the user only mentions NS, ' +
    'the NS app or the travel planner without naming NESSIE.',
  license: 'CC-BY-4.0 for the docs (LICENSE-docs.md); Apache-2.0 for the tooling (LICENSE)',
  compatibility:
    'Works from the bundled markdown in any agent. Reading or auditing an actual Figma file needs the ' +
    'Figma MCP (Dev Mode MCP server) connected.',
  metadata: {
    repository: 'https://github.com/gertjankooy/nessie',
    source: 'AGENTS.md',
  },
};

// Upstream pages whose changes matter to how this skill is packaged and written.
// Two sources:
// - the open standard, read as .mdx source from its own repo with a shallow git
//   clone (works anywhere GitHub does, including behind an egress proxy);
// - Claude's own skill-authoring guide, which adds rules of its own (reserved
//   words, no XML tags, a table of contents in long reference files). Fetched
//   as markdown from the Claude docs site.
const SPEC_REPO = 'https://github.com/agentskills/agentskills.git';
const SPEC_PAGES = {
  'specification.mdx': { repo: 'docs/specification.mdx' },
  'best-practices.mdx': { repo: 'docs/skill-creation/best-practices.mdx' },
  'optimizing-descriptions.mdx': { repo: 'docs/skill-creation/optimizing-descriptions.mdx' },
  'claude-best-practices.md': { url: 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices.md' },
};
const sourceOf = ({ repo, url }) => url || `${SPEC_REPO.replace(/\.git$/, '')}/blob/main/${repo}`;

// ------------------------------------------------------------------ the rules

const RULES = {
  nameMax: 64,
  descriptionMax: 1024,
  compatibilityMax: 500,
  bodyLinesMax: 500,      // "Keep your main SKILL.md under 500 lines"
  bodyTokensMax: 5000,    // "< 5000 tokens recommended"
  knownFields: ['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'],
  reservedWords: ['anthropic', 'claude'],   // Claude: not allowed in name
  tocAfterLines: 100,                        // Claude: longer reference files open with a table of contents
};

function validate(fm, body) {
  const errors = [];
  const warnings = [];
  const len = s => [...s].length;

  for (const k of Object.keys(fm)) if (!RULES.knownFields.includes(k)) errors.push(`unknown frontmatter field: ${k}`);

  const { name, description, compatibility, metadata } = fm;
  if (typeof name !== 'string' || !name) errors.push('name is required');
  else {
    if (len(name) > RULES.nameMax) errors.push(`name is longer than ${RULES.nameMax} characters`);
    if (!/^[a-z0-9-]+$/.test(name)) errors.push('name may only contain lowercase letters, digits and hyphens');
    if (/^-|-$/.test(name)) errors.push('name must not start or end with a hyphen');
    if (name.includes('--')) errors.push('name must not contain consecutive hyphens');
    for (const w of RULES.reservedWords) if (name.includes(w)) errors.push(`name must not contain the reserved word "${w}"`);
    // The spec wants name === parent folder. The repo's own name is `nessie`, but
    // a clone can live in any folder, so a mismatch is only a warning here.
    if (basename(ROOT) !== name) warnings.push(`folder is "${basename(ROOT)}", spec expects it to match name "${name}" (fine for a renamed clone)`);
  }

  if (typeof description !== 'string' || !description.trim()) errors.push('description is required');
  else if (len(description) > RULES.descriptionMax) errors.push(`description is ${len(description)} characters (max ${RULES.descriptionMax})`);
  for (const [k, v] of [['name', name], ['description', description]]) {
    if (typeof v === 'string' && /<\/?[A-Za-z][^>]*>/.test(v)) errors.push(`${k} must not contain XML tags`);
  }

  if (compatibility !== undefined && (len(compatibility) < 1 || len(compatibility) > RULES.compatibilityMax)) {
    errors.push(`compatibility must be 1-${RULES.compatibilityMax} characters`);
  }
  if (metadata !== undefined) {
    if (typeof metadata !== 'object' || Array.isArray(metadata)) errors.push('metadata must be a key-value map');
    else for (const [k, v] of Object.entries(metadata)) if (typeof v !== 'string') errors.push(`metadata.${k} must be a string`);
  }
  if (fm['allowed-tools'] !== undefined && typeof fm['allowed-tools'] !== 'string') errors.push('allowed-tools must be a space-separated string');

  const lines = body.split('\n').length;
  const tokens = Math.round(body.length / 4);
  if (lines > RULES.bodyLinesMax) warnings.push(`body is ${lines} lines (spec recommends under ${RULES.bodyLinesMax})`);
  if (tokens > RULES.bodyTokensMax) warnings.push(`body is ~${tokens} tokens (spec recommends under ${RULES.bodyTokensMax})`);

  // Relative file references must resolve from the skill root.
  for (const target of brokenLinks(body, '.')) errors.push(`broken file reference: ${target}`);

  return { errors, warnings, lines, tokens };
}

// Relative links in `text` (a file in `dir`, repo-relative) whose target doesn't
// exist. Code spans and fenced blocks are skipped: they hold examples such as
// `[kebab.md](kebab.md)`, not real references.
function brokenLinks(text, dir) {
  const prose = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  const out = [];
  for (const [, target] of prose.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const file = decodeURI(target.split('#')[0]);
    if (!existsSync(join(ROOT, dir, file))) out.push(target);
  }
  return out;
}

// The supporting files the skill routes to: the playbooks and the reference
// docs. The standard sets no format for them, so this checks only what breaks
// an agent silently — a dead link (blocks) — plus its size advice (warns).
const RESOURCE_DIRS = ['skills', 'reference'];

function mdFilesUnder(dir) {
  const out = [];
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = posix.join(dir, e.name);
    if (e.isDirectory()) out.push(...mdFilesUnder(rel));
    else if (e.name.endsWith('.md')) out.push(rel);
  }
  return out;
}

function checkResources() {
  const errors = [];
  const warnings = [];
  const files = RESOURCE_DIRS.flatMap(mdFilesUnder);
  for (const f of files) {
    const text = readFileSync(join(ROOT, f), 'utf8');
    for (const target of brokenLinks(text, posix.dirname(f))) errors.push(`${f}: broken link → ${target}`);
    const tokens = Math.round(text.replace(TOC_BLOCK, '').length / 4); // the generated contents block doesn't count
    if (tokens > RULES.bodyTokensMax) warnings.push(`${f} is ~${tokens} tokens; the spec advises small, focused reference files — consider splitting`);
    if (withToc(text) !== text) errors.push(`${f}: table of contents missing or stale (Claude: reference files over ${RULES.tocAfterLines} lines open with one) — run: node tools/skill/build.mjs toc`);
  }
  for (const w of warnings) console.log(`warning: ${w}`);
  for (const e of errors) console.error(`error: ${e}`);
  if (!errors.length) console.log(`${files.length} skill and reference files: every relative link resolves`);
  return errors.length === 0;
}

// ----------------------------------------------------------- tables of contents

const TOC_OPEN = '<!-- toc: generated by tools/skill/build.mjs from the headings below; do not edit -->';
const TOC_CLOSE = '<!-- /toc -->';
const TOC_BLOCK = /<!-- toc: [^\n]*-->\n[\s\S]*?<!-- \/toc -->\n*/;

// GitHub's heading anchors: lowercase, drop punctuation, spaces to hyphens,
// and number repeats (-1, -2) in document order.
function slugger() {
  const seen = new Map();
  return text => {
    const base = text.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').trim().replace(/\s/g, '-');
    const n = seen.get(base) || 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };
}

// Heading text as rendered: links to their label, code and emphasis unwrapped.
const plain = h => h.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, '').trim();

// The file with its contents block added, refreshed or removed, as the line
// count requires. The count excludes the block itself, so adding one can't
// push a file over the limit and removing one can't drop it back under.
function withToc(text) {
  const bare = text.replace(TOC_BLOCK, '');
  const lines = bare.split('\n');
  if (lines.length <= RULES.tocAfterLines) return bare;

  const headings = [];
  let fence = false, first = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*```/.test(lines[i])) fence = !fence;
    if (fence) continue;
    const m = lines[i].match(/^(#{1,3}) (.+?)\s*#*\s*$/);
    if (!m) continue;
    if (m[1].length === 2 && first === -1) first = i;
    headings.push({ level: m[1].length, text: plain(m[2]) });
  }
  if (first === -1) return bare; // no sections to list

  // Every heading takes a slug, H1 included, so repeats number like GitHub's.
  const slug = slugger();
  const entries = headings.map(h => ({ ...h, anchor: slug(h.text) }));
  const h2 = entries.filter(e => e.level === 2);
  // List ## sections; add their ### sub-sections when there are few sections,
  // so a short list still shows the file's scope.
  const listed = entries.filter(e => e.level === 2 || (e.level === 3 && h2.length < 5));
  const block = [
    TOC_OPEN,
    '## Contents',
    '',
    // The anchor comes from the heading as written; the label swaps an em dash
    // for a colon so the block never adds one (house rule: no em dashes).
    ...listed.map(e => `${e.level === 3 ? '  ' : ''}- [${e.text.replace(/\s*—\s*/g, ': ')}](#${e.anchor})`),
    TOC_CLOSE,
    '',
    '',
  ].join('\n');
  return [...lines.slice(0, first), block + lines.slice(first).join('\n')].join('\n');
}

function writeTocs() {
  const changed = [];
  for (const f of RESOURCE_DIRS.flatMap(mdFilesUnder)) {
    const path = join(ROOT, f);
    const text = readFileSync(path, 'utf8');
    const next = withToc(text);
    if (next !== text) { writeFileSync(path, next); changed.push(f); }
  }
  return changed;
}

// ------------------------------------------------------------------ rendering

// YAML scalar: always double-quoted so colons, hashes and parentheses are safe.
const q = s => JSON.stringify(s);

function render() {
  const fm = FRONTMATTER;
  const L = ['---'];
  for (const [k, v] of Object.entries(fm)) {
    if (v && typeof v === 'object') {
      L.push(`${k}:`);
      for (const [a, b] of Object.entries(v)) L.push(`  ${a}: ${q(b)}`);
    } else {
      L.push(`${k}: ${q(v)}`);
    }
  }
  L.push('---');
  const body = readFileSync(SRC, 'utf8');
  if (body.startsWith('---\n')) throw new Error('AGENTS.md must not carry its own frontmatter; set it in tools/skill/build.mjs');
  const header = '<!-- Generated from AGENTS.md by tools/skill/build.mjs. Edit AGENTS.md (or the frontmatter in the build script), never this file. -->';
  return { text: `${L.join('\n')}\n${header}\n\n${body}`, body };
}

function report({ errors, warnings, lines, tokens }) {
  for (const w of warnings) console.log(`warning: ${w}`);
  for (const e of errors) console.error(`error: ${e}`);
  if (!errors.length) console.log(`SKILL.md passes the Agent Skills spec rules (${lines} lines, ~${tokens} tokens)`);
}

// The spec's own validator, when installed (pip install skills-ref). Optional:
// the rules above already cover what it checks.
function skillsRef() {
  try {
    execFileSync('skills-ref', ['validate', ROOT], { stdio: 'pipe' });
    console.log('skills-ref validate: passed');
    return true;
  } catch (e) {
    if (e.code === 'ENOENT') return true;
    console.error(`skills-ref validate failed:\n${(e.stdout || '') + (e.stderr || '')}`);
    return false;
  }
}

// ----------------------------------------------------------------- spec-check

// Repo pages: one shallow, sparse clone of just the tracked files.
function fetchRepoPages(pages) {
  const dir = mkdtempSync(join(tmpdir(), 'agentskills-'));
  const git = (...args) => execFileSync('git', args, { cwd: dir, stdio: 'pipe', encoding: 'utf8' });
  try {
    execFileSync('git', ['clone', '--quiet', '--depth', '1', '--filter=blob:none', '--sparse', SPEC_REPO, dir], { stdio: 'pipe' });
    git('sparse-checkout', 'set', '--no-cone', ...pages.map(([, s]) => s.repo));
    const out = {};
    for (const [file, { repo }] of pages) {
      if (!existsSync(join(dir, repo))) throw new Error(`${repo} no longer exists upstream; the docs moved — update SPEC_PAGES`);
      out[file] = readFileSync(join(dir, repo), 'utf8');
    }
    return { out, commit: git('rev-parse', '--short=12', 'HEAD').trim() };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// URL pages: Node's fetch ignores HTTPS_PROXY, so behind an egress proxy (a
// cloud sandbox) curl fetches instead, which honours it.
async function fetchUrl(url) {
  if (process.env.HTTPS_PROXY || process.env.https_proxy) {
    return execFileSync('curl', ['-sSfL', '--max-time', '30', url], { encoding: 'utf8' });
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

async function fetchSpec() {
  const entries = Object.entries(SPEC_PAGES);
  const { out: pages, commit } = fetchRepoPages(entries.filter(([, s]) => s.repo));
  for (const [file, { url }] of entries.filter(([, s]) => s.url)) {
    try {
      pages[file] = await fetchUrl(url);
    } catch (e) {
      throw new Error(`could not fetch ${url} (${e.message.split('\n')[0]}); is the host allowed in this environment's network policy?`);
    }
  }
  return { pages, commit };
}

function diff(a, b) {
  const A = a.split('\n'), B = b.split('\n');
  const setA = new Set(A), setB = new Set(B);
  return [...A.filter(l => !setB.has(l)).map(l => `- ${l}`), ...B.filter(l => !setA.has(l)).map(l => `+ ${l}`)];
}

async function specCheck(update) {
  const { pages: live, commit } = await fetchSpec();
  console.log(`agentskills/agentskills @ ${commit}`);
  mkdirSync(SNAPSHOT_DIR, { recursive: true });
  let changed = 0;
  for (const [file, text] of Object.entries(live)) {
    const path = join(SNAPSHOT_DIR, file);
    const old = existsSync(path) ? readFileSync(path, 'utf8') : '';
    if (old === text) { console.log(`unchanged  ${file}`); continue; }
    changed++;
    if (update) { writeFileSync(path, text); console.log(`updated    ${file}`); continue; }
    console.log(`CHANGED    ${file}  (${sourceOf(SPEC_PAGES[file])})`);
    for (const l of diff(old, text)) console.log(`    ${l}`);
  }
  if (changed && !update) {
    console.error(`\n${changed} upstream page(s) changed. Review the diff, adapt the rules/frontmatter in tools/skill/build.mjs (and the skill) if needed, then run: node tools/skill/build.mjs spec-check --update`);
    process.exit(1);
  }
}

// ----------------------------------------------------------------------- main

const cmd = process.argv[2];
if (cmd === 'build') {
  const { text, body } = render();
  const result = validate(FRONTMATTER, body);
  report(result);
  if (result.errors.length) process.exit(1);
  writeFileSync(OUT, text);
  console.log(`SKILL.md       ${text.length} chars`);
} else if (cmd === 'check') {
  const { text, body } = render();
  const result = validate(FRONTMATTER, body);
  report(result);
  let fail = result.errors.length > 0;
  if (!existsSync(OUT) || readFileSync(OUT, 'utf8') !== text) {
    console.error('stale: SKILL.md — run: node tools/skill/build.mjs build');
    fail = true;
  }
  if (!checkResources()) fail = true;
  if (!skillsRef()) fail = true;
  if (fail) process.exit(1);
} else if (cmd === 'toc') {
  // One path per line: the pre-commit hook re-stages exactly these.
  for (const f of writeTocs()) console.log(f);
} else if (cmd === 'spec-check') {
  await specCheck(process.argv.includes('--update'));
} else {
  console.error('usage: node tools/skill/build.mjs build|check|toc|spec-check [--update]');
  process.exit(2);
}
