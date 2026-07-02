import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { x as tarExtract } from 'tar';

/** Only these top-level paths are vendored from the skill repo. */
function keep(rel) {
  return rel === 'AGENTS.md' || rel.startsWith('skills/') || rel.startsWith('reference/');
}

/**
 * Download the skill repo tarball for `ref` and extract only AGENTS.md, skills/,
 * and reference/ into `destDir`. Works for branches, tags, and commit SHAs.
 * Public repo → no auth needed (GitHub API just requires a User-Agent).
 */
export async function fetchSkill(destDir, { repo, ref }) {
  const url = `https://api.github.com/repos/${repo}/tarball/${ref}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'nessie-skill', Accept: 'application/vnd.github+json' },
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
        const ok = Boolean(rel) && keep(rel);
        if (ok && !rel.endsWith('/')) kept.push(rel);
        return ok;
      },
    });
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }

  if (!kept.some((f) => f === 'AGENTS.md')) {
    throw new Error(`AGENTS.md not found in ${repo}@${ref} — nothing vendored.`);
  }
  return kept;
}
