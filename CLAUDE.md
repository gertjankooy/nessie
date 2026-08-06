# NESSIE Design System — Agent Skill

This repository uses **`AGENTS.md`** as its single canonical agent brief (tool-agnostic).

👉 **Read [`AGENTS.md`](AGENTS.md) in the repo root and follow it** before designing or auditing any screen. It covers context detection, the skill routing table (`skills/*`), the reference docs (`reference/**`), the token conventions, accessibility, and the non-negotiable rules.

Everything a designer needs lives in `AGENTS.md`, `skills/`, and `reference/`.

---

_Maintainer note (Claude Code only):_ the commands in `.claude/commands/` — `/sync-docs`, `/sync-tokens`, `/docs-coverage` — refresh the docs from ZeroHeight / the design-tokens repo. They are not part of the distributed skill.

_When editing reference docs by hand:_ any content you add that is **not sourced from ZeroHeight** (a design decision documented here before the upstream page catches up) MUST carry a `Local guidance` marker directly under its heading — `> **Local guidance — keep on sync (authored ahead of ZeroHeight; not a removal).**` — otherwise `/sync-docs` will delete it as a "removal" on the next run. Convention: `reference/components/_component-doc-standard.md` → *Local guidance*.

_ZeroHeight push pipeline:_ docs with `sync: push` in their frontmatter are authored **here** and rendered by ZeroHeight, the reverse of `/sync-docs`. `reference/**` stays the only file to read or edit; `zeroheight/` is generated output built by `tools/zeroheight/zh.mjs` and must never be edited or cited. See [`tools/zeroheight/README.md`](tools/zeroheight/README.md).

_Security (public repo):_ a pre-commit gate in `.githooks/pre-commit` blocks secrets and local-only files on every commit, and blocks stale or unstaged `zeroheight/` output. **Enable it once per clone:** `git config core.hooksPath .githooks` (it's local config, not carried by `git clone`). Run the thorough interactive scan with `/pre-publish-check` before publishing; bypass the gate only when certain with `git commit --no-verify`.
