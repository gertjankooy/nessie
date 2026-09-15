# nessie-skill

Install the **NESSIE** (NS Dutch Railways) design system agent skill into your AI tool of choice — Claude Code, Cursor, Codex, or GitHub Copilot — with one command.

It vendors the skill (`AGENTS.md` + `skills/` + `reference/`) into a `.nessie/` folder in your project and writes the small entry file each tool reads, pointing it at `.nessie/AGENTS.md`.

## Usage

```bash
# from your project root
npx nessie-skill init            # auto-detects your tool(s) (prompts if a TTY)
npx nessie-skill init --all      # configure every supported tool
npx nessie-skill status          # is a newer version of the docs available?
npx nessie-skill update          # refresh .nessie/ to the latest docs
npx nessie-skill remove          # remove .nessie/ and the entry-file blocks
```

### Options

| Flag | Description |
| :--- | :--- |
| `--tools <list>` | Comma list: `claude, cursor, codex, copilot` (default: auto-detect / prompt) |
| `--all` | Configure every supported tool |
| `--yes` | Non-interactive: accept detected tools without prompting (good for CI) |
| `--dir <path>` | Target project (default: current directory) |
| `--ref <ref>` | Branch, tag, or commit of the skill repo (default: `main`) |
| `--repo <o/n>` | Source repo (default: `gertjankooy/nessie`) |

## What it writes

```
your-project/
  .nessie/                          # vendored skill (safe to commit or gitignore)
    AGENTS.md  skills/  reference/
    .nessie-version                 # records repo + ref + install time + last update check
  AGENTS.md                         # → points to .nessie/AGENTS.md (Cursor, Codex)
  CLAUDE.md                         # → points to .nessie/AGENTS.md (Claude Code)
  .github/copilot-instructions.md   # → points to .nessie/AGENTS.md (Copilot)
  .cursor/rules/nessie.mdc          # Cursor rule (alwaysApply)
  .claude/settings.json             # + a SessionStart hook (Claude Code only, see below)
```

Entry files use a **managed block** (`<!-- nessie:start … -->`), so re-running never
duplicates content and never overwrites your own instructions — it updates only its block.
The SessionStart hook is merged into `.claude/settings.json` the same way — it never
touches any other hooks or settings already in that file.

## How it stays current

The skill **docs** are downloaded from the public repo tarball at the given `--ref`
(default `main`), so `update` always pulls the latest without republishing this package.
`status` compares your installed commit against the latest and tells you if an update
exists. Pin a fixed version with `--ref v1.2.0`.

Updates are **not automatic** — nothing re-fetches `.nessie/` on its own. Every tool is
set up to proactively offer the update itself, so you don't have to remember to run
`status`/`update` by hand — but *how* reliably that happens differs by tool, because
only one of them has a real hook API:

- **Claude Code** gets a `SessionStart` hook (`npx nessie-skill status --hook`) — a
  shell command that **always** runs at the start of every session, rate-limited to
  once a day. If it finds a newer version, it deterministically injects an instruction
  telling the agent to ask you directly ("want me to update the NESSIE docs now?") and,
  if you say yes, run `npx nessie-skill update` on the spot. Best-effort and silent on
  failure (offline, GitHub unreachable, `.nessie/` missing) — it will never break
  session start. `remove` cleans the hook back out of `.claude/settings.json`.
- **Cursor, Codex, and Copilot** have no equivalent scriptable session-start hook this
  installer can target. Instead, their always-loaded entry file (the Cursor rule,
  `AGENTS.md`, `copilot-instructions.md`) carries a written instruction asking the
  agent to run `npx nessie-skill status` at the start of a session and offer the same
  yes/no update. This is **not deterministic** — it relies on the agent choosing to
  follow it, the same reliability as every other instruction in that file (including
  "read AGENTS.md before any UI work"). In practice that's usually enough, but if an
  agent skips it, running `npx nessie-skill status` yourself is always the fallback.

**Figma Agent users don't need any of this** — the [`figma-bootstrap/`](../../figma-bootstrap)
skill re-fetches `AGENTS.md` live from GitHub via the MCP connector on every session, so
it's always current by construction. This CLI is only relevant for coding-agent tools
that read local vendored files.

The **CLI itself** updates via npm — `npx nessie-skill@latest …` always runs the newest
published version.

## Notes

- Requires **Node 18+** (uses built-in `fetch`).
- The source repo is **public and read-only** — no token or auth needed.
- To read an actual Figma design (audits, design-to-code), your tool still needs the
  **Figma MCP / Dev Mode MCP server** connected — the skill files can't provide that.
- Maintainer commands (`/sync-docs`, `/sync-tokens`, `/docs-coverage`) live in the skill
  repo's `.claude/` and are intentionally **not** vendored by this installer.

## License

Apache-2.0 — see [`LICENSE`](LICENSE). (The design-system **docs** it vendors are CC BY 4.0.)
