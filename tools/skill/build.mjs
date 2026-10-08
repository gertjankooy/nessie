#!/usr/bin/env node
// Maintainer tooling for the root SKILL.md (Agent Skills standard, agentskills.io).
// Not part of the distributed skill (see tools/cli for that).
//
//   node tools/skill/build.mjs build                 regenerate SKILL.md from AGENTS.md
//   node tools/skill/build.mjs check                 SKILL.md is current + passes the spec rules
//   node tools/skill/build.mjs spec-check            has the upstream standard changed since the snapshot?
//   node tools/skill/build.mjs spec-check --update   accept the upstream standard as the new snapshot
//
// SKILL.md = the frontmatter below + the body of AGENTS.md, verbatim. AGENTS.md
// stays the single canonical brief; SKILL.md is generated output and never
// hand-edited (`check` enforces that). Because it sits at the repo root, every
// relative path in AGENTS.md (skills/, reference/) resolves the same from both.
//
// The validation rules mirror https://agentskills.io/specification. When
// `spec-check` reports an upstream change, update RULES/validate() to match,
// then accept the new snapshot with `spec-check --update`.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
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
const SPEC_PAGES = {
  'specification.md': 'https://agentskills.io/specification.md',
  'best-practices.md': 'https://agentskills.io/skill-creation/best-practices.md',
  'optimizing-descriptions.md': 'https://agentskills.io/skill-creation/optimizing-descriptions.md',
};

// ------------------------------------------------------------------ the rules

const RULES = {
  nameMax: 64,
  descriptionMax: 1024,
  compatibilityMax: 500,
  bodyLinesMax: 500,      // "Keep your main SKILL.md under 500 lines"
  bodyTokensMax: 5000,    // "< 5000 tokens recommended"
  knownFields: ['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'],
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
    // The spec wants name === parent folder. The repo's own name is `nessie`, but
    // a clone can live in any folder, so a mismatch is only a warning here.
    if (basename(ROOT) !== name) warnings.push(`folder is "${basename(ROOT)}", spec expects it to match name "${name}" (fine for a renamed clone)`);
  }

  if (typeof description !== 'string' || !description.trim()) errors.push('description is required');
  else if (len(description) > RULES.descriptionMax) errors.push(`description is ${len(description)} characters (max ${RULES.descriptionMax})`);

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
  for (const [, target] of body.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const file = target.split('#')[0];
    if (!existsSync(join(ROOT, posix.normalize(file)))) errors.push(`broken file reference: ${target}`);
  }

  return { errors, warnings, lines, tokens };
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

async function fetchSpec() {
  const out = {};
  for (const [file, url] of Object.entries(SPEC_PAGES)) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
    // Drop the site-wide "Documentation Index" preamble so it can't cause noise.
    out[file] = (await res.text()).replace(/^(> .*\n)+\n?/, '').trimEnd() + '\n';
  }
  return out;
}

function diff(a, b) {
  const A = a.split('\n'), B = b.split('\n');
  const setA = new Set(A), setB = new Set(B);
  return [...A.filter(l => !setB.has(l)).map(l => `- ${l}`), ...B.filter(l => !setA.has(l)).map(l => `+ ${l}`)];
}

async function specCheck(update) {
  const live = await fetchSpec();
  mkdirSync(SNAPSHOT_DIR, { recursive: true });
  let changed = 0;
  for (const [file, text] of Object.entries(live)) {
    const path = join(SNAPSHOT_DIR, file);
    const old = existsSync(path) ? readFileSync(path, 'utf8') : '';
    if (old === text) { console.log(`unchanged  ${file}`); continue; }
    changed++;
    if (update) { writeFileSync(path, text); console.log(`updated    ${file}`); continue; }
    console.log(`CHANGED    ${file}  (${SPEC_PAGES[file]})`);
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
  if (!skillsRef()) fail = true;
  if (fail) process.exit(1);
} else if (cmd === 'spec-check') {
  await specCheck(process.argv.includes('--update'));
} else {
  console.error('usage: node tools/skill/build.mjs build|check|spec-check [--update]');
  process.exit(2);
}
