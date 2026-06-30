# figma-skills

NESSIE (NS Dutch Railways) design skill for Figma / Figma Make. `CLAUDE.md` is the entry point applied as instructions for an AI session. It helps an AI **design** and **audit** screens against the NESSIE design system, iOS-first.

## Architecture

Three layers, loaded lazily — `CLAUDE.md` routes to a skill, which pulls in only the reference files it needs.

```
CLAUDE.md                  Entry point: routing + non-negotiable rules + reference map
skills/                    Task playbooks (the "commands")
  build-screen.md            Design a new screen from scratch
  audit-screen.md            Full review of a screen against NESSIE
  audit-tokens.md            Focused token-only audit
reference/                 Source-of-truth knowledge (self-contained, skimmable)
  design-language.md         Brand, visual direction, iconography
  components/                App component docs + index.md (master catalog)
  tokens/                    color, typography, spacing, shape, motion, applied
  patterns/                  layout, navigation-patterns (iOS/Android), accessibility
```

## Sources

Reference content is distilled from the NESSIE ZeroHeight, the design-tokens Token Studio export, Notion layout guidelines, and the platform code references. iOS-first; Android and iOS-26+ distinctions are slotted into marked sections as they're discovered.

## Updating

Edit the relevant `reference/` or `skills/` file, then commit and push (changes are picked up on the next session). Keep files tight — they're AI-consumed references, not marketing copy.
