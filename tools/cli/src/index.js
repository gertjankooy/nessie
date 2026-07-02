import { resolve, join } from 'node:path';
import { existsSync } from 'node:fs';
import { readFile, rm } from 'node:fs/promises';
import { parseArgs, upsertManagedBlock, writeFileEnsured, c } from './util.js';
import { fetchSkill } from './fetch.js';
import { TOOLS, TOOL_KEYS, detectTools, pointerBody, cursorRule } from './tools.js';

const DEFAULT_REPO = 'gertjankooy/nessie';
const DEFAULT_REF = 'main';
const VENDOR = '.nessie';

export async function run(argv) {
  const { _, flags } = parseArgs(argv);
  const cmd = _[0] || 'help';
  if (cmd === 'help' || flags.help) return help();
  if (cmd === 'init') return init(flags);
  if (cmd === 'update') return update(flags);
  throw new Error(`Unknown command "${cmd}". Run "nessie-skill help".`);
}

function selectTools(flags, dir) {
  if (flags.all) return TOOL_KEYS;
  if (flags.tools) {
    const list = String(flags.tools)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    for (const t of list) {
      if (!TOOLS[t]) throw new Error(`Unknown tool "${t}". Valid: ${TOOL_KEYS.join(', ')}.`);
    }
    return list;
  }
  const detected = detectTools(dir);
  if (detected.length) return detected;
  return ['cursor', 'codex']; // fallback: a root AGENTS.md serves both
}

async function init(flags) {
  const dir = resolve(flags.dir || process.cwd());
  const repo = flags.repo || DEFAULT_REPO;
  const ref = flags.ref || DEFAULT_REF;
  const tools = selectTools(flags, dir);
  const dest = join(dir, VENDOR);

  console.log(`${c.cyan('nessie-skill')} → installing into ${c.bold(dir)}`);
  console.log(`  ${c.dim('source')} ${repo}@${ref}`);
  console.log(`  ${c.dim('tools ')} ${tools.map((t) => TOOLS[t].label).join(', ')}`);

  const kept = await fetchSkill(dest, { repo, ref });
  await writeVersion(dest, { repo, ref, files: kept.length });
  console.log(`${c.green('✓')} vendored ${kept.length} files into ${VENDOR}/`);

  await writePointers(dir, tools);
  console.log(
    `\n${c.green('Done.')} Your agent reads ${c.bold(`${VENDOR}/AGENTS.md`)}. ` +
      `Refresh later with ${c.bold('npx nessie-skill update')}.`
  );
}

async function update(flags) {
  const dir = resolve(flags.dir || process.cwd());
  const dest = join(dir, VENDOR);
  if (!existsSync(dest)) {
    throw new Error(`No ${VENDOR}/ here. Run "nessie-skill init" first.`);
  }
  const meta = await readVersion(dest);
  const repo = flags.repo || meta.repo || DEFAULT_REPO;
  const ref = flags.ref || meta.ref || DEFAULT_REF;

  console.log(`${c.cyan('nessie-skill')} → updating ${VENDOR}/ from ${repo}@${ref}`);
  for (const sub of ['AGENTS.md', 'skills', 'reference']) {
    await rm(join(dest, sub), { recursive: true, force: true });
  }
  const kept = await fetchSkill(dest, { repo, ref });
  await writeVersion(dest, { repo, ref, files: kept.length });
  console.log(`${c.green('✓')} refreshed ${kept.length} files.`);
}

async function writePointers(dir, tools) {
  const mdTargets = new Set();
  const fileTargets = new Set();
  for (const t of tools) {
    for (const m of TOOLS[t].md || []) mdTargets.add(m);
    for (const f of TOOLS[t].files || []) fileTargets.add(f);
  }
  for (const rel of mdTargets) {
    const res = await upsertManagedBlock(join(dir, rel), pointerBody());
    console.log(`${c.green('✓')} ${res} ${rel}`);
  }
  for (const rel of fileTargets) {
    await writeFileEnsured(join(dir, rel), cursorRule());
    console.log(`${c.green('✓')} wrote ${rel}`);
  }
}

async function writeVersion(dest, { repo, ref, files }) {
  const body = { repo, ref, files, installedAt: new Date().toISOString() };
  await writeFileEnsured(join(dest, '.nessie-version'), `${JSON.stringify(body, null, 2)}\n`);
}

async function readVersion(dest) {
  try {
    return JSON.parse(await readFile(join(dest, '.nessie-version'), 'utf8'));
  } catch {
    return {};
  }
}

function help() {
  console.log(`
${c.bold('nessie-skill')} — install the NESSIE design system agent skill into your AI tool.

${c.bold('Usage')}
  npx nessie-skill init [options]     Vendor .nessie/ and write tool entry files
  npx nessie-skill update [options]   Refresh .nessie/ to the latest docs
  npx nessie-skill help

${c.bold('Options')}
  --tools <list>   Comma list: ${TOOL_KEYS.join(', ')} (default: auto-detect)
  --all            Configure every supported tool
  --dir <path>     Target project (default: current directory)
  --ref <ref>      Branch, tag, or commit of the skill repo (default: ${DEFAULT_REF})
  --repo <o/n>     Source repo (default: ${DEFAULT_REPO})

${c.bold('Examples')}
  npx nessie-skill init
  npx nessie-skill init --tools claude,cursor
  npx nessie-skill init --all --ref v1.0.0
  npx nessie-skill update
`);
}
