import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname } from 'node:path';

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
