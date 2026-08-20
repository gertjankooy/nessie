---
description: Build docs OUT to ZeroHeight. Regenerates the stripped markdown in zeroheight/ for every `sync: push` reference doc, then verifies. The opposite direction is /sync-docs.
argument-hint: [doc name | blank for all]
allowed-tools: Bash, Read, Edit
---

# /build-zeroheight

Regenerate everything ZeroHeight reads from this repo. Finds every `reference/**/*.md` whose frontmatter says `sync: push` and writes a stripped copy to `zeroheight/<same path>`.

**Argument:** `$ARGUMENTS`
- A doc name → just that one (e.g. `/build-zeroheight motion`).
- Blank → every push doc.

## Run

```bash
node tools/zeroheight/build.mjs build $ARGUMENTS
node tools/zeroheight/build.mjs check
```

## What the build strips

Repo-only scaffolding that would be meaningless to a reader on ZeroHeight:

- The **frontmatter block** in full.
- The **H1**, since the ZeroHeight page supplies its own title. Output starts at `##`.
- The **`## Source`** section (ZeroHeight is the output now, not the source).
- **`Local guidance` markers** and **gap markers**, plus any section left empty by removing them.
- **Repo-relative links**, both `[label](../x/y.md)` and the bare backticked `` `../x/y.md` `` form. Each becomes a real ZeroHeight link when the target doc declares a `zeroheight_url`, and otherwise falls back to the target's title as plain text. A token name that happens to end in `.md` (`space.md`) is left alone, because it resolves to no file.

## Then report

- Which pages were built.
- **Every flattened link.** These are targets with no `zeroheight_url`, so they render as plain text instead of a link. A target that shows up repeatedly is a real gap worth filling in that doc's frontmatter, not noise.

## Rules

- **Never edit anything in `zeroheight/`.** It is generated output. Every fix belongs in the `reference/` source, followed by a rebuild.
- **Never commit a build you didn't verify.** The pre-commit hook runs `check` whenever `reference/` or `zeroheight/` is staged, so stale output fails the commit.
- This build is **text only**: no Figma export, no images, no credentials. The fuller pipeline with image export and per-tab component pages lives on the `docs/zeroheight-push-pipeline` branch.
