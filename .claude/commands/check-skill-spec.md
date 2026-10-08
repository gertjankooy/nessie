---
description: Check whether the Agent Skills standard (agentskills.io) changed since the last snapshot, adapt SKILL.md and its validator to any change, and verify the skill still passes.
allowed-tools: Bash, Read, Edit, WebFetch
---

# /check-skill-spec

Keeps the root `SKILL.md` in line with the [Agent Skills standard](https://agentskills.io/specification). `SKILL.md` is generated from `AGENTS.md` by `tools/skill/build.mjs`, which also holds the frontmatter and the validation rules. Three upstream pages are snapshotted in `tools/skill/spec-snapshot/`: the specification, best practices, and optimizing descriptions. They're read as `.mdx` source from the standard's own repo, [agentskills/agentskills](https://github.com/agentskills/agentskills) (`docs/`), with a shallow git clone, so the check works anywhere GitHub is reachable.

## Run

```bash
node tools/skill/build.mjs spec-check   # exit 1 + a line diff when an upstream page changed
node tools/skill/build.mjs check        # SKILL.md is current and passes the rules
```

## When nothing changed

Report "standard unchanged since the last snapshot" and the `check` result. Write nothing.

## When a page changed

1. **Read the diff and classify each change.** Note that the diff is line-based, so a moved line shows as removed + added.
   - **Rule change** (a frontmatter field added/removed/renamed, a new length or naming constraint, a directory convention, a new size limit) → update `FRONTMATTER`, `RULES` and `validate()` in `tools/skill/build.mjs` to match.
   - **Guidance change** (best practices, description advice) → check whether `FRONTMATTER.description` or the structure of `AGENTS.md` should follow it. Propose a change; don't rewrite `AGENTS.md` without the maintainer's go-ahead, it's the canonical brief for every tool.
   - **Wording only** → no change needed.
2. Rebuild and verify: `node tools/skill/build.mjs build && node tools/skill/build.mjs check`.
3. Accept the new snapshot: `node tools/skill/build.mjs spec-check --update`.
4. Report per page: what changed, which category, what you changed (or why nothing), and the `check` result.

## Rules

- **Never edit `SKILL.md` by hand.** Change `AGENTS.md` or the frontmatter in the build script, then rebuild. The pre-commit hook rebuilds and checks it whenever `AGENTS.md`, `SKILL.md` or the build script is staged.
- **Never run `--update` before the rules are adapted.** The snapshot is the record of which version of the standard the validator implements; updating it alone hides the drift.
- A new upstream page worth tracking goes in `SPEC_PAGES` in the build script (path inside the agentskills repo). If `spec-check` reports a tracked page no longer exists upstream, the docs were moved: find the new path, update `SPEC_PAGES`, and treat it as a change to review.
