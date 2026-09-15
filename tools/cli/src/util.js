import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { createInterface } from 'node:readline';

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const wrap = (code) => (s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : String(s));
export const c = {
  dim: wrap('2'),
  bold: wrap('1'),
  green: wrap('32'),
  yellow: wrap('33'),
  cyan: wrap('36'),
};

/** Minimal `--flag value` / `--bool` / positional parser. */
export function parseArgs(argv) {
  const out = { _: [], flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        out.flags[key] = next;
        i++;
      } else {
        out.flags[key] = true;
      }
    } else {
      out._.push(a);
    }
  }
  return out;
}

const START = '<!-- nessie:start (managed by nessie-skill — do not edit inside these markers) -->';
const END = '<!-- nessie:end -->';
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Insert or refresh a nessie-managed block in a Markdown file without touching
 * the user's own content. Returns 'created' | 'updated' | 'inserted'.
 */
export async function upsertManagedBlock(file, body) {
  const block = `${START}\n${body}\n${END}`;
  let existing = '';
  if (existsSync(file)) existing = await readFile(file, 'utf8');
  await mkdir(dirname(file), { recursive: true });

  if (existing.includes(START) && existing.includes(END)) {
    const re = new RegExp(`${escapeRe(START)}[\\s\\S]*?${escapeRe(END)}`);
    await writeFile(file, existing.replace(re, block));
    return 'updated';
  }
  if (existing.trim()) {
    await writeFile(file, `${existing.replace(/\s*$/, '')}\n\n${block}\n`);
    return 'inserted';
  }
  await writeFile(file, `${block}\n`);
  return 'created';
}

export async function writeFileEnsured(file, content) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}

/** Remove a nessie-managed block; delete the file if nothing else remains. */
export async function removeManagedBlock(file) {
  if (!existsSync(file)) return 'absent';
  const content = await readFile(file, 'utf8');
  if (!content.includes(START) || !content.includes(END)) return 'absent';
  const re = new RegExp(`${escapeRe(START)}[\\s\\S]*?${escapeRe(END)}`);
  const next = content.replace(re, '').replace(/\n{3,}/g, '\n\n').trim();
  if (!next) {
    await rm(file, { force: true });
    return 'deleted';
  }
  await writeFile(file, `${next}\n`);
  return 'stripped';
}

/** Substring that marks a SessionStart hook entry as nessie-owned, for upsert/remove. */
const HOOK_MARKER = 'nessie-skill status --hook';

/**
 * Insert or refresh the nessie SessionStart hook in a Claude Code settings file,
 * without touching any other hooks or settings already there. Idempotent.
 */
export async function upsertSessionStartHook(file, command) {
  let json = {};
  if (existsSync(file)) {
    try {
      json = JSON.parse(await readFile(file, 'utf8'));
    } catch {
      json = {};
    }
  }
  json.hooks ??= {};
  const list = Array.isArray(json.hooks.SessionStart) ? json.hooks.SessionStart : [];
  const kept = list.filter((block) => !(block.hooks || []).some((h) => h.command?.includes(HOOK_MARKER)));
  kept.push({ hooks: [{ type: 'command', command }] });
  json.hooks.SessionStart = kept;
  await writeFileEnsured(file, `${JSON.stringify(json, null, 2)}\n`);
}

/** Remove the nessie SessionStart hook, cleaning up now-empty hooks/SessionStart keys. */
export async function removeSessionStartHook(file) {
  if (!existsSync(file)) return false;
  let json;
  try {
    json = JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return false;
  }
  const list = json.hooks?.SessionStart;
  if (!Array.isArray(list)) return false;
  const kept = list.filter((block) => !(block.hooks || []).some((h) => h.command?.includes(HOOK_MARKER)));
  if (kept.length === list.length) return false;
  if (kept.length) json.hooks.SessionStart = kept;
  else delete json.hooks.SessionStart;
  if (json.hooks && Object.keys(json.hooks).length === 0) delete json.hooks;
  await writeFileEnsured(file, `${JSON.stringify(json, null, 2)}\n`);
  return true;
}

/** Single-line prompt with a default; returns the default on empty/no-TTY. */
export function promptLine(question, def) {
  if (!process.stdin.isTTY) return Promise.resolve(def || '');
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const label = def ? `${question} [${def}] ` : `${question} `;
  return new Promise((resolve) => {
    rl.question(label, (ans) => {
      rl.close();
      resolve((ans || '').trim() || def || '');
    });
  });
}
