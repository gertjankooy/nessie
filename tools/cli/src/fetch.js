import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { x as tarExtract } from 'tar';

/** Fallback allowlist when a ref predates .nessie-manifest.json. */
const DEFAULT_VENDOR = ['AGENTS.md', 'skills/', 'reference/'];

const UA = { 'User-Agent': 'nessie-skill' };

function matches(rel, vendor) {
  return vendor.some((v) => (v.endsWith('/') ? rel.startsWith(v) : rel === v));
}

/**
 * Read the repo's `.nessie-manifest.json` (`vendor` list) for the given ref.
 * Returns a sanitized prefix list, or null if absent/unreadable.
 */
export async function fetchManifest({ repo, ref }) {
  try {
    const url = `https://raw.githubusercontent.com/${repo}/${ref}/.nessie-manifest.json`;
    const res = await fetch(url, { headers: UA });
    if (!res.ok) return null;
    const json = await res.json();
    const list = Array.isArray(json.vendor) ? json.vendor : null;
    if (!list) return null;
    // Never allow absolute paths or parent-dir escapes from the manifest.
    return list.map(String).filter((p) => p && !p.startsWith('/') && !p.includes('..'));
  } catch {
    return null;
  }
}

/** Resolve a ref (branch/tag/sha) to its current commit SHA, or null if unreachable. */
export async function resolveCommit({ repo, ref }) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits/${ref}`, {
      headers: { ...UA, Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.sha || null;
  } catch {
    return null;
  }
}

/**
 * Download the skill repo tarball for `ref` and extract the paths listed in the
 * repo's `.nessie-manifest.json` (or the default allowlist) into `destDir`.
 * Works for branches, tags, and commit SHAs. Public repo → no auth needed.
 */
export async function fetchSkill(destDir, { repo, ref }) {
  const vendor = (await fetchManifest({ repo, ref })) || DEFAULT_VENDOR;

  const url = `https://api.github.com/repos/${repo}/tarball/${ref}`;
  const res = await fetch(url, {
    headers: { ...UA, Accept: 'application/vnd.github+json' },
    redirect: 'follow',
  });
  if (!res.ok) {
    throw new Error(
      `Could not download ${repo}@${ref} (HTTP ${res.status}). ` +
        `Check the --repo/--ref values and that the repo is public.`
    );
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const tmp = await mkdtemp(join(tmpdir(), 'nessie-'));
  const tgz = join(tmp, 'skill.tgz');
  await writeFile(tgz, buf);
  await mkdir(destDir, { recursive: true });

  const kept = [];
  try {
    await tarExtract({
      file: tgz,
      cwd: destDir,
      strip: 1, // drop the "owner-repo-<sha>/" wrapper dir
      filter: (path) => {
        const rel = path.split('/').slice(1).join('/'); // path after the wrapper dir
        const ok = Boolean(rel) && matches(rel, vendor);
        if (ok && !rel.endsWith('/')) kept.push(rel);
        return ok;
      },
    });
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }

  if (!kept.includes('AGENTS.md')) {
    throw new Error(`AGENTS.md not found in ${repo}@${ref} — nothing vendored.`);
  }
  return kept;
}
