---
description: Read-only audit — list ZeroHeight pages that have no mapping in the /sync-docs registry or no matching reference file. Coverage overview, writes nothing.
argument-hint: [area: components | patterns | fundamentals | all (default)]
allowed-tools: mcp__claude_ai_ZeroHeight__list-pages, mcp__claude_ai_ZeroHeight__list-releases, Read, Bash
---

# /docs-coverage

Give a coverage overview of the NESSIE ZeroHeight (`Nessie Design System`) against this skill's reference docs: **which in-scope ZeroHeight pages are not yet mapped or documented.** Pure audit — **never writes**. Run it after new ZeroHeight pages land (e.g. Error Handling, Search) to see what's worth adding to the `/sync-docs` registry.

**Argument:** `$ARGUMENTS` — optional area filter (`components`, `patterns`, `fundamentals`); default `all`.

## In scope (App skill)
- **COMPONENTS → App** → `reference/components/*.md`
- **Design System → PATTERNS** (Interaction Models, Settings & Utility, Feedback & States, Search) → `reference/patterns/*.md`
- **Fundamentals** (Color, Typography, Style, Motion, Icons, Logo/Assets, Composition → Layout for App) and **TOKENS** (Color, Typography, Dimension, Style, Motion, Opacity, Screen, Overview/applied) → `reference/tokens/*.md`, `reference/fundamentals/layout.md`, `design-language.md`
- **Guidelines → ACCESSIBILITY** → `reference/accessibility.md`
- **Guidelines → CONTENT** (Principles, Content scorecard, per-component copy) → `reference/content/*.md`
- **PRINCIPLES** (Visual direction, Platform Consistency, UX Guidelines) → `design-language.md` / `navigation-patterns.md`

## Out of scope (don't report as gaps)
COMPONENTS → **Web**, TEMPLATES → Web, Fundamentals → Composition → **Layout for Web**, **Get started** (installation, release notes, downloads, about, dev guides), CONTENT product copy. These are intentionally not part of the App design skill.

## Workflow (read-only)
1. `list-pages` → full ZeroHeight tree (current IDs/titles).
2. Build the **repo inventory**:
   - Registry entries: read `.claude/commands/sync-docs.md` (the source registry table).
   - Covered page IDs: collect `zeroheight_page_id` from `reference/**/*.md` frontmatter (components, patterns, fundamentals, content, accessibility), and the `zeroheight_url` page slugs cited in `reference/tokens/*.md` / `design-language.md`. A quick way to list component/pattern coverage:
     `grep -rhoE 'zeroheight_page_id: [0-9]+' reference | grep -oE '[0-9]+' | sort -u`
3. For every **in-scope** ZeroHeight page, classify:
   - ✅ **Mapped & covered** — in the registry *and* a reference file cites its id/slug.
   - ⚠️ **Mapped, no file yet** — registry lists it (or marks TODO) but no reference file exists (e.g. Error Handling / Search when still stubs).
   - ❌ **Unmapped** — in scope but absent from both the registry and the reference files. **This is the headline list.**
   - 🔌 **Reverse gap** — a reference file that cites no ZeroHeight source (e.g. `navigation-patterns.md` today) — flag so a source can be mapped later.
4. **Report** as four short tables (Unmapped first), each row: `ZeroHeight page · area · id · suggested target file`. End with a one-line count summary (`X in scope · Y covered · Z unmapped · N reverse-gaps`) and, for `--`-style brevity, list only ❌ and 🔌 when everything else is green.

## Notes
- IDs drift — always resolve fresh from `list-pages`, don't trust cached numbers.
- This command is the inverse of `/sync-docs`: `/sync-docs` pulls content for **mapped** pages; `/docs-coverage` finds the pages **not yet mapped**. Neither touches token *values* — that's `/sync-tokens`.
- Treat a same-named **Web** page as out of scope even when an App page is missing; never suggest mapping the Web variant.
