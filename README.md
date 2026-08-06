# nessie — design system agent skill

NESSIE (NS Dutch Railways) design skill for AI agents. **`AGENTS.md` is the canonical, tool-agnostic entry point** applied as instructions for an AI session; it helps an AI **design** and **audit** screens against the NESSIE design system, iOS-first. Works with Claude Code, Cursor, Codex, Copilot, the Figma AI agent, and Figma Make.

## Install (Claude Code, Cursor, Codex, Copilot)

The quickest way to add the skill to your own project is the installer:

```bash
npx nessie-skill init      # auto-detects your tool(s); --all for every tool
npx nessie-skill status    # check for newer docs
npx nessie-skill update    # pull the latest docs
```

It vendors `AGENTS.md` + `skills/` + `reference/` into a `.nessie/` folder and writes the entry file your tool reads (`CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`, `.cursor/rules/`) — using managed blocks that never overwrite your own instructions. See [`tools/cli/`](tools/cli/).

No install needed? Point any repo-aware agent at this public repo and tell it to read `AGENTS.md`. To **audit** an actual Figma file, your tool also needs the Figma MCP / Dev Mode MCP server connected.

## Architecture

Three layers, loaded lazily — the entry brief routes to a skill, which pulls in only the reference files it needs. Each tool auto-reads its own entry file; all of them redirect into `AGENTS.md`.

```
AGENTS.md                  Canonical entry point: context detection + routing + rules + reference map
CLAUDE.md                  Thin pointer → AGENTS.md (Claude Code)
.github/copilot-instructions.md  Thin pointer → AGENTS.md (GitHub Copilot)
skills/                    Task playbooks (the "commands")
  build-screen.md            Design a new screen from scratch
  audit-screen.md            Full review of a screen against NESSIE
  audit-tokens.md            Focused token-only audit
reference/                 Source-of-truth knowledge (self-contained, skimmable)
  design-language.md         Brand, visual direction, iconography
  components/                App component docs + index.md (master catalog)
  tokens/                    color, typography, spacing, shape, motion, applied
  fundamentals/              layout (composition: insets, stacks, surfaces, safe areas)
  content/                   UX writing — index + per-component wording
  accessibility.md           Cross-cutting a11y guidance (WCAG 2.2 AA)
  patterns/                  interaction-models, feedback-states, settings-utility
zeroheight/                Generated ZeroHeight tab files + image assets (never hand-edited)
tools/zeroheight/          Build tooling for the repo → ZeroHeight push pipeline
.claude/commands/          Maintainer tooling (Claude Code only; not part of the distributed skill)
```

## Sources

Reference content is distilled from the NESSIE ZeroHeight, the design-tokens Token Studio export, Notion layout guidelines, and the platform code references. iOS-first; Android and iOS-26+ distinctions are slotted into marked sections as they're discovered.

Docs flow in **both** directions, decided per file by the `sync:` frontmatter key:

- **`sync: pull`** (the default, and every doc that omits the key) — ZeroHeight is the source, and `/pull-from-zeroheight` pulls pages into `reference/`.
- **`sync: push`** — this repo is the source. `reference/components/<name>.md` stays the single editable copy, `tools/zeroheight/zh.mjs build` generates one file per ZeroHeight tab into `zeroheight/`, and ZeroHeight syncs those from git. `/pull-from-zeroheight` never writes to a push doc.

See [`tools/zeroheight/`](tools/zeroheight/) for the commands, what the build strips, and the constraints ZeroHeight imposes on synced markdown.

## Updating

Edit the relevant `reference/` or `skills/` file, then commit and push (changes are picked up on the next session, and by `npx nessie-skill update`). Keep files tight — they're AI-consumed references, not marketing copy.

## License

- **Code** (e.g. `tools/cli/`) — Apache-2.0, see [`LICENSE`](LICENSE).
- **Documentation** (`AGENTS.md`, `skills/`, `reference/`) — CC BY 4.0, see [`LICENSE-docs.md`](LICENSE-docs.md).
- NS trademarks, logos, brand colours, and the "flow" element are **not** licensed and remain the property of NS.
