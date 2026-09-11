---
description: Regenerate llms.txt (the map) and llms-full.txt (the whole skill in one file) at the repo root from AGENTS.md, skills/ and reference/, then verify.
allowed-tools: Bash, Read
---

# /build-llms

Regenerate the two files at the repo root that agents fetch by URL instead of cloning:

- `llms.txt` — the map, per the [llmstxt.org](https://llmstxt.org/) spec: H1, summary blockquote, then H2 file lists linking to the raw markdown of every skill and reference doc. Built from `reference/components/index.md` (component order and "when to use" notes) and each doc's H1 + lead paragraph. ~5K tokens.
- `llms-full.txt` — every skill and reference doc concatenated in the reading order `AGENTS.md` prescribes, each with a `Source:` URL line and relative links rewritten to absolute URLs. ~85K tokens.

## Run

```bash
node tools/llms/build.mjs build
node tools/llms/build.mjs check
```

## Then report

- The size of each file in tokens.
- Any component reported as **on disk but missing from `index.md`** — the build appends it at the end of the component list, but the real fix is adding its row to the catalog.

## Rules

- **Never edit `llms.txt` or `llms-full.txt` by hand.** They are generated output. Change the source doc (or the section text in `tools/llms/build.mjs`), then rebuild.
- **You normally don't need to run this by hand.** The pre-commit hook rebuilds and stages the pair whenever `AGENTS.md`, `skills/`, `reference/`, or the generated files are staged, then runs `check` and blocks if anything is still stale. It skips the auto-build when a source file has unstaged edits (it won't bake half-staged content into a commit) — stage everything and commit again. Run `/build-llms` yourself when you want to inspect the output before committing.
- Unlike `/build-zeroheight`, this build strips **nothing** agent-facing: `Local guidance` / `Superseded` markers, gap markers, and the machine-readable tags all stay in. Only the frontmatter block is folded into a one-line `Meta:`.
- These files are **not vendored** by `npx nessie-skill` (they're not in `.nessie-manifest.json`) — vendored installs already have `AGENTS.md` and the tree, and the absolute URLs would bypass a pinned `--ref`.
