---
description: Export Figma images and generate the ZeroHeight tab files for every `sync: push` doc, then verify the result.
argument-hint: [component name | blank for all] [--skip-images]
allowed-tools: Bash, Read, Edit
---

# /build-zeroheight

Refresh everything ZeroHeight reads from this repo. Finds every `reference/components/*.md` with `sync: push` in its frontmatter, exports the Figma frames it declares, regenerates the per-tab files in `zeroheight/`, and checks the result.

**Argument:** `$ARGUMENTS`
- A component name → just that one (e.g. `/build-zeroheight section-heading`).
- Blank → every push doc.
- `--skip-images` → reuse the PNGs already exported and only rebuild the pages. Use when you changed prose but no Figma frame.

## Run

```bash
node tools/zeroheight/zh.mjs all $ARGUMENTS
```

That is the whole job: images, then build, then check, in that order. Don't run the sub-commands separately unless something fails and you are isolating it.

## Then report

- Which components were rebuilt, and how many images were exported.
- **Every flattened link.** The build lists link targets with no ZeroHeight URL, which render as plain text rather than links. Repeated appearances of the same target are worth raising as a real gap, not noise.
- The ref the image URLs point at. It follows the checked-out branch, so confirm it matches the branch ZeroHeight is set to read.
- Anything the verify step flagged.

## When it fails

**`FIGMA_TOKEN is not set`** — the token is missing from `.env`. The error prints the setup steps; don't work around it by skipping the export unless the user asks, because the PNGs then silently go stale.

**`403` from Figma** — the token lacks `file_content:read`, or it can't see that file. Report it rather than retrying.

**`node ... returned no image`** — a declared node id doesn't exist in the Figma file, usually because a frame was renamed, deleted, or lives in a different file. Name the image and its id; the fix is in the doc's `images:` block or in `figma_file:`.

**Verify fails after a successful build** — that means output was hand-edited, since a fresh build should always match. Report which file; the fix is to make the change in `reference/components/` instead and rebuild.

## Rules

- **Never edit anything in `zeroheight/`.** It is generated output. Every fix belongs in `reference/components/<name>.md`, followed by a rebuild.
- **Never commit a build you didn't verify.** The pre-commit hook blocks stale or unstaged output, so a failing check means a failing commit.
- Image URLs in the source always point at `main`; the build retargets them. Don't hand-edit a URL to a branch.
- Adding a new image needs two things: a `name: "node:id"` entry in `images:`, and a markdown image in the body pointing at `zeroheight/assets/<component>/<name>.png`. See `tools/zeroheight/README.md`.
