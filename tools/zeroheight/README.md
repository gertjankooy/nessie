# ZeroHeight push (text only)

Maintainer tooling. Not part of the distributed skill.

```bash
node tools/zeroheight/build.mjs build [name]   # generate zeroheight/
node tools/zeroheight/build.mjs check          # verify output is current
```

## How a doc opts in

A reference doc is pushed to ZeroHeight when its frontmatter says so:

```yaml
sync: push
```

Absent or `pull` means ZeroHeight owns the page and `/sync-docs` pulls it inward. `push` means this repo owns it: the file is generated into `zeroheight/` and `/sync-docs` must never write to it. Every doc is owned by exactly one side.

Output mirrors the source path, so `reference/fundamentals/motion.md` becomes `zeroheight/fundamentals/motion.md`.

## What gets stripped

See `/build-zeroheight` for the full list: frontmatter, the H1, `## Source`, `Local guidance` and gap markers, and repo-relative links (rewritten to ZeroHeight URLs, or flattened to the target's title).

## Scope

Text only, by design: no Figma export, no image handling, no network, no credentials. Component docs are written out as a single page rather than split across ZeroHeight's Design guidelines / A11y / Content / Examples tabs.

Both of those live in the fuller pipeline on `docs/zeroheight-push-pipeline` (`tools/zeroheight/zh.mjs`), which this script borrows its frontmatter parsing, section splitting, and stripping rules from. Pull that branch in when images or tab-splitting are needed.
