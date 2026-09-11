#!/usr/bin/env node
// Maintainer tooling for the llms.txt pair at the repo root.
// Not part of the distributed skill (see tools/cli for that).
//
//   node tools/llms/build.mjs build    regenerate llms.txt + llms-full.txt
//   node tools/llms/build.mjs check    verify both files are current
//
// llms.txt      — the map (llmstxt.org spec): H1, summary blockquote, H2 file
//                 lists linking to the raw .md of every skill and reference doc.
// llms-full.txt — the whole skill concatenated in AGENTS.md routing order, for
//                 agents that can fetch but not clone (Cursor/Windsurf `@url`,
//                 Figma Make, web agents). One file, ~85K tokens.
//
// Both are generated output and never hand-edited; `check` enforces that.
// Unlike the ZeroHeight build, nothing agent-facing is stripped: Local
// guidance / Superseded markers and the machine-readable tags stay in.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const RAW = 'https://raw.githubusercontent.com/gertjankooy/nessie/main/';
const OUT_MAP = join(ROOT, 'llms.txt');
const OUT_FULL = join(ROOT, 'llms-full.txt');

const url = p => RAW + p;
const read = p => readFileSync(join(ROOT, p), 'utf8');
const mdFiles = dir => readdirSync(join(ROOT, dir)).filter(f => f.endsWith('.md')).sort().map(f => posix.join(dir, f));

// ---------------------------------------------------------------- frontmatter

// Same minimal YAML subset as tools/zeroheight/build.mjs. Throws on anything it
// doesn't understand so a malformed doc fails loudly.
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
const stripComment = s => s.replace(/\s+#\s.*$/, '').trim();
const unquote = s => s.replace(/^["'](.*)["']$/, '$1');

// -------------------------------------------------------------------- loading

function loadDoc(path) {
  const { data, body } = parseFrontmatter(read(path));
  const lines = body.split('\n');
  const h1 = (lines.find(l => /^# /.test(l)) || '').replace(/^# /, '').trim();
  // Lead paragraph: first prose line after the H1 (not a heading, quote, table, list).
  let lead = '';
  let seenH1 = false;
  for (const l of lines) {
    if (/^# /.test(l)) { seenH1 = true; continue; }
    if (!seenH1 || !l.trim()) continue;
    if (/^(#|>|\||-|\*|\d+\.|```|<)/.test(l)) continue;
    lead = l.trim();
    break;
  }
  return { path, data, body, h1, lead };
}

// The lead paragraph, de-markdowned and capped at a word boundary for a
// one-line note. Whole lead rather than first sentence: many leads are two
// short sentences, and sentence-splitting trips on "e.g." anyway.
function note(text, max = 160) {
  let s = text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // links → label
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (s.length > max) s = s.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
  return s.replace(/[.:;,]$/, '');
}

// Rewrite relative .md links (with optional #anchor) to absolute raw URLs,
// resolved against the linking doc's directory. External links, anchors-only
// links, non-.md targets, and targets that don't exist (e.g. a `[kebab.md]`
// example inside a code span) are left alone.
function absolutize(body, docPath) {
  const dir = posix.dirname(docPath);
  return body.replace(/\]\(([^)\s]+)\)/g, (m, target) => {
    if (/^(https?:|mailto:|#)/.test(target)) return m;
    const [file, anchor] = target.split('#');
    if (!file.endsWith('.md')) return m;
    const abs = posix.normalize(posix.join(dir, file));
    if (abs.startsWith('..') || !existsSync(join(ROOT, abs))) return m;
    return `](${url(abs)}${anchor ? '#' + anchor : ''})`;
  });
}

// --------------------------------------------------------------- the corpus

// Component order follows the master catalog. Anything on disk but not in the
// catalog is appended and reported, so a missing index row is visible.
function componentsFromIndex() {
  const index = read('reference/components/index.md');
  const out = [];
  let category = '';
  for (const line of index.split('\n')) {
    const h = line.match(/^## (.+)$/);
    if (h) { category = h[1].replace(/\s*\(.*\)\s*$/, '').trim(); continue; }
    const row = line.match(/^\| ([^|]+) \| ([^|]+) \| \[[^\]]+\]\(([^)]+)\) \|$/);
    if (row) out.push({ name: row[1].trim(), when: row[2].trim(), path: posix.join('reference/components', row[3].trim()), category });
  }
  return out;
}

function corpus() {
  const comps = componentsFromIndex();
  const known = new Set(comps.map(c => c.path));
  const orphans = mdFiles('reference/components').filter(p => !known.has(p) && !p.endsWith('/index.md') && !posix.basename(p).startsWith('_'));

  // tokens ↔ fundamentals pairs, per the AGENTS.md reference map
  const pairs = [
    ['color', 'color'], ['typography', 'typography'], ['spacing', 'layout'],
    ['shape', 'style'], ['motion', 'motion'],
  ];

  return {
    start: ['AGENTS.md', ...mdFiles('skills')],
    components: comps,
    orphans,
    pairs: pairs.map(([t, f]) => ({ tokens: `reference/tokens/${t}.md`, fundamentals: `reference/fundamentals/${f}.md` })),
    applied: 'reference/tokens/applied.md',
    patterns: mdFiles('reference/patterns'),
    content: ['reference/content/index.md', ...mdFiles('reference/content').filter(p => !p.endsWith('/index.md'))],
    crossCutting: ['reference/design-language.md', 'reference/accessibility.md'],
    optional: [
      'reference/components/_component-doc-standard.md',
      'README.md', 'CHANGELOG.md', 'LICENSE-docs.md', 'tools/cli/README.md',
    ],
  };
}

// ------------------------------------------------------------------ llms.txt

const SUMMARY = `NESSIE is the NS (Dutch Railways) design system. This repo is an agent skill for designing and auditing app screens against it, iOS-first: tokens only, components first, dark mode automatic, accessibility built in. The reference docs are self-contained markdown, synced from the NS ZeroHeight.`;

function buildMap(c) {
  const L = [];
  const item = (label, path, n) => L.push(`- [${label}](${url(path)})${n ? `: ${n}` : ''}`);
  const doc = p => loadDoc(p);

  L.push('# NESSIE Design System', '', `> ${SUMMARY}`, '');
  L.push(`This file is the map. The playbook is \`AGENTS.md\`: read it before producing any design output, then the skill file for the task, then only the reference files you need. Every link below is the raw markdown of a file in the repo; relative links inside those files resolve against the same base. Generated by \`tools/llms/build.mjs\`, never hand-edited.`, '');

  L.push('## Start here', '');
  item('AGENTS.md', 'AGENTS.md', 'entry point — context detection, skill routing table, reference map, non-negotiable rules');
  for (const p of c.start.slice(1)) {
    const d = doc(p);
    item(d.h1.replace(/^Skill: /, ''), p, note(d.lead));
  }
  L.push('');

  L.push('## Components', '');
  item('Component index', 'reference/components/index.md', 'master catalog — pick a component here first, then open its own file');
  for (const comp of c.components) item(comp.name, comp.path, `${comp.category} — ${note(comp.when)}`);
  for (const p of c.orphans) { const d = doc(p); item(d.h1, p, note(d.lead)); }
  L.push('');

  L.push('## Tokens and fundamentals', '');
  L.push('Load these in pairs: the tokens file holds the values (vocabulary), its fundamentals file says which token to pick when (usage).', '');
  for (const pr of c.pairs) {
    const t = doc(pr.tokens), f = doc(pr.fundamentals);
    item(t.h1.replace(/^NESSIE /, ''), pr.tokens, note(t.lead));
    item(f.h1.replace(/^NS NESSIE — /, ''), pr.fundamentals, note(f.lead));
  }
  { const a = doc(c.applied); item(a.h1.replace(/^NESSIE /, ''), c.applied, note(a.lead)); }
  L.push('');

  L.push('## Patterns', '');
  L.push('Patterns outrank components for "which one should I use". Start with Interaction Models.', '');
  for (const p of c.patterns) { const d = doc(p); item(d.h1, p, note(d.lead)); }
  L.push('');

  L.push('## Content (UX writing)', '');
  for (const p of c.content) { const d = doc(p); item(d.h1.replace(/^Content — /, ''), p, note(d.lead)); }
  L.push('');

  L.push('## Design language and accessibility', '');
  for (const p of c.crossCutting) { const d = doc(p); item(d.h1.replace(/^NS NESSIE — /, ''), p, note(d.lead)); }
  L.push('');

  L.push('## Optional', '');
  const optNotes = {
    'reference/components/_component-doc-standard.md': 'house standard for authoring a component doc (frontmatter, section order, conventions)',
    'README.md': 'repo overview, install via `npx nessie-skill`, architecture, licenses',
    'CHANGELOG.md': 'what changed in the skill and when',
    'LICENSE-docs.md': 'CC BY 4.0 for the docs; NS trademarks and brand assets are not licensed',
    'tools/cli/README.md': 'the `nessie-skill` installer for Claude Code, Cursor, Codex, Copilot',
  };
  for (const p of c.optional) item(posix.basename(p) === 'README.md' && p !== 'README.md' ? p : posix.basename(p), p, optNotes[p]);
  L.push('');
  L.push(`The whole skill in one file (~${Math.round(fullTokens / 1000)}K tokens, needs a large context window): [llms-full.txt](${url('llms-full.txt')})`);
  L.push('');
  return L.join('\n');
}

// ------------------------------------------------------------- llms-full.txt

function meta(data) {
  const parts = [];
  for (const [k, v] of Object.entries(data)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const inner = Object.entries(v).map(([a, b]) => `${a}=${b}`).join(', ');
      parts.push(`${k}: {${inner}}`);
    } else if (Array.isArray(v)) {
      parts.push(`${k}: ${v.length ? v.join(', ') : 'none'}`);
    } else {
      parts.push(`${k}: ${v}`);
    }
  }
  return parts.join(' · ');
}

function fullOrder(c) {
  return [
    ...c.start,
    'reference/design-language.md',
    'reference/components/index.md',
    ...c.components.map(x => x.path),
    ...c.orphans,
    ...c.pairs.flatMap(p => [p.tokens, p.fundamentals]),
    c.applied,
    ...c.patterns,
    ...c.content,
    'reference/accessibility.md',
    'reference/components/_component-doc-standard.md',
  ];
}

function buildFull(c) {
  const order = fullOrder(c);
  const L = [];
  L.push('# NESSIE Design System — full reference', '', `> ${SUMMARY}`, '');
  L.push(`Every skill and reference doc of the NESSIE agent skill, concatenated in the reading order \`AGENTS.md\` prescribes. Each document starts with a \`Source:\` line giving its canonical URL; links between documents have been rewritten to those URLs. Read \`AGENTS.md\` (first below) before producing any design output. The short map of the same content is [llms.txt](${url('llms.txt')}). Generated by \`tools/llms/build.mjs\`, never hand-edited.`, '');
  L.push('Contents:', '');
  for (const p of order) L.push(`- ${p}`);
  L.push('');

  for (const p of order) {
    const d = loadDoc(p);
    L.push('', '---', '', `Source: ${url(p)}`);
    const m = meta(d.data);
    if (m) L.push(`Meta: ${m}`);
    L.push('');
    L.push(absolutize(d.body, p).replace(/\s+$/, ''));
  }
  L.push('');
  return L.join('\n');
}

// ----------------------------------------------------------------------- main

let fullTokens = 0;
function generate() {
  const c = corpus();
  const full = buildFull(c);
  fullTokens = Math.round(full.length / 4);
  const map = buildMap(c);
  return { map, full, c };
}

const cmd = process.argv[2];
if (cmd === 'build') {
  const { map, full, c } = generate();
  writeFileSync(OUT_MAP, map);
  writeFileSync(OUT_FULL, full);
  console.log(`llms.txt       ${map.length} chars (~${Math.round(map.length / 4000)}K tokens)`);
  console.log(`llms-full.txt  ${full.length} chars (~${Math.round(full.length / 4000)}K tokens)`);
  if (c.orphans.length) console.log(`components on disk but missing from index.md (appended): ${c.orphans.join(', ')}`);
} else if (cmd === 'check') {
  const { map, full } = generate();
  const stale = [];
  if (!existsSync(OUT_MAP) || readFileSync(OUT_MAP, 'utf8') !== map) stale.push('llms.txt');
  if (!existsSync(OUT_FULL) || readFileSync(OUT_FULL, 'utf8') !== full) stale.push('llms-full.txt');
  if (stale.length) {
    console.error(`stale: ${stale.join(', ')} — run: node tools/llms/build.mjs build`);
    process.exit(1);
  }
  console.log('llms.txt and llms-full.txt are current');
} else {
  console.error('usage: node tools/llms/build.mjs build|check');
  process.exit(2);
}
