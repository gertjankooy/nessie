# nessie — design system agent skill

NESSIE (NS Dutch Railways) design skill for AI agents. **`AGENTS.md` is the canonical, tool-agnostic entry point** applied as instructions for an AI session; it helps an AI **design** and **audit** screens against the NESSIE design system, iOS-first. Works with Claude Code, Cursor, Codex, Copilot, the Figma AI agent, and Figma Make.

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
  patterns/                  layout, navigation-patterns, interaction-models, settings-utility, accessibility
.claude/commands/          Maintainer tooling (Claude Code only; not part of the distributed skill)
```

## Sources

Reference content is distilled from the NESSIE ZeroHeight, the design-tokens Token Studio export, Notion layout guidelines, and the platform code references. iOS-first; Android and iOS-26+ distinctions are slotted into marked sections as they're discovered.

## Updating

Edit the relevant `reference/` or `skills/` file, then commit and push (changes are picked up on the next session). Keep files tight — they're AI-consumed references, not marketing copy.
