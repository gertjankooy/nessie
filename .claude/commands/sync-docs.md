---
description: Sync NESSIE skill docs from ZeroHeight — App components, app patterns, and fundamentals — into the matching reference files. Flags undocumented gaps.
argument-hint: <name | "all" | "components" | "patterns" | "fundamentals" | comma-list> [--check]
allowed-tools: mcp__claude_ai_ZeroHeight__list-pages, mcp__claude_ai_ZeroHeight__search-pages, mcp__claude_ai_ZeroHeight__get-page, mcp__claude_ai_ZeroHeight__list-releases, Read, Write, Edit
---

# /sync-docs

Refresh this skill's reference docs from the NESSIE ZeroHeight (`Nessie Design System`). One run can check **all** relevant ZeroHeight pages — App components, app patterns, and fundamentals — and fold changes into the matching files. Write in **US English**, **App / iOS-first**, ZeroHeight as the source of truth.

**Argument:** `$ARGUMENTS`
- A name → sync that one component/pattern/fundamental (e.g. `/sync-docs Tag`, `/sync-docs Interaction Models`, `/sync-docs Color`).
- A **category** → `components` · `patterns` · `fundamentals`.
- `all` → everything in the registry below.
- A comma-list → each in turn.
- Append `--check` → report drift only, write nothing.

## Source registry  (ZeroHeight → repo file · template)

| ZeroHeight area | Repo target | Template |
| :--- | :--- | :--- |
| **COMPONENTS → App** (54 pages) | `reference/components/<kebab>.md` (one per component; see `index.md`) | Component |
| **Design System → PATTERNS → Interaction Models** (`8100862`) | `reference/patterns/interaction-models.md` | Pattern |
| **Design System → PATTERNS → Settings & Utility** (`8094399`) | `reference/patterns/settings-utility.md` | Pattern |
| PATTERNS → Error Handling / Search | *(no page yet / TODO — skip, flag when published)* | Pattern |
| **Fundamentals → Color** (`6693013`) + **TOKENS → Color** (`6694970`) | `reference/tokens/color.md` (usage + Visual hierarchy + token list) | Token |
| **Fundamentals → Typography** (`6693097`) + **TOKENS → Typography** (`6694972`) | `reference/tokens/typography.md` | Token |
| **Fundamentals → Style** (`6693107`) + **TOKENS → Style/Dimension** (`6699361`/`6694971`) | `reference/tokens/shape.md` · `spacing.md` | Token |
| **Fundamentals → Motion** (`6693108`) + **TOKENS → Motion** (`6699072`) | `reference/tokens/motion.md` | Token |
| **TOKENS → Overview / applied** | `reference/tokens/applied.md` | Token |
| **Fundamentals → Composition → Layout for App** (`6693137`) | `reference/patterns/layout.md` | Pattern |
| **Fundamentals → Icons** (`6693098`) | `reference/components/icon.md` + `reference/design-language.md` | mixed |
| **Fundamentals / PRINCIPLES → Visual direction** (`5794046`), **Logo / Assets** (`6693011`) | `reference/design-language.md` | Doc |

> Re-resolve page IDs with `list-pages` before trusting them — IDs can change. The token files draw from **two** ZeroHeight pages each (a Fundamentals usage page + a Tokens list page); reconcile both.

## Hard rules (all templates)
1. **App only.** Use `COMPONENTS → App`, never the `Web` group. If something exists only under Web, report "no App page" and skip.
2. **ZeroHeight is the only source of truth.** Never invent content, variants, props, token names, or values.
3. **Gaps are kept, not dropped.** A section with nothing in ZeroHeight keeps its header with `_Not available in ZeroHeight — to review._`, is added to frontmatter `gaps:` (where the file has frontmatter), and is flagged in the run report.
4. **No implementation details** — no SwiftUI/Compose/web code, Storybook links, or platform status tables. **Exception:** iOS-first *design* divergences as `> **Android:**` / `> **iOS 26+:**` callouts.
5. **Drop the noise** — per-image `**Style**`/`**Attributes**` tables (`#FFFFFF`, `848px`, `X:0 Y:0`), decorative images, "Questions?"/"Copywriting moved" blocks, marketing prose.
6. **Tokens by meaning, never hex** in base/applied rows; the **core tier** may show a raw value exactly as the existing tables do.
7. **Match each file's existing structure and tone.** Don't reformat a doc that already has a house style; extend it.

## Templates

### Component  (`reference/components/<kebab>.md`)
Frontmatter (`component, category, status, aliases, zeroheight_page_id, zeroheight_url, figma_node, last_synced, related, gaps`) + fixed body order, sentence case, no `---` dividers in the body:
`# <Component>` → `## Usage` (`### Use when` / `### Don't use when`) → `## Anatomy` → `## Configurations` (with the `⚠️ Missing the disabled state?` callout for buttons/form components) → `## Placement` → `## Behavior` → `## Best practices` → `## Content guidelines` → `## Accessibility` (WCAG refs in backticks) → `## Source`.
Filename = kebab-case of the App page title. After writing, update the row in `index.md`.

### Pattern  (`reference/patterns/*.md`)
Frontmatter (`pattern, zeroheight_page_id, zeroheight_url, last_synced, platforms, related, gaps`) + a pattern-appropriate structure (overview/principles, the patterns themselves with use-when/rules, a "choosing the right pattern" table, `## Source`). iOS-first; `> **Android:**` / `> **iOS 26+:**` callouts for divergence. No frontmatter-template lock-in — follow the page's own shape, distilled.

### Token / Fundamentals  (`reference/tokens/*.md`, `design-language.md`)
These files have an established house style (3-tier tables, usage columns, the Figma-slash callout) and **no YAML frontmatter** — **preserve it**. Fold changes in:
- New/changed semantic or applied tokens → the right tier table, described by meaning.
- Usage guidance (e.g. Color's *Visual hierarchy*, variant scale, when-to-use concepts) → the matching prose section.
- **Always keep the `--slash/form` vs dotted-JSON callout** at the top of every `reference/tokens/` file (token-doc convention in `CLAUDE.md`); add it to any new token file/category.
- Token **values** come from the design-tokens repo, not ZeroHeight prose — prefer `/sync-tokens` for the numeric source of truth; `/sync-docs` handles the *guidance and names*.

## Workflow (per item)
1. `list-pages` (or `search-pages`) → resolve the page in the right area; confirm it's App, not Web.
2. `get-page` → read it.
3. `--check`: diff against the existing file, report added/removed variants, changed guidance, new sections — stop, no write.
4. Distill into the matching template; set `last_synced` to today and fill `gaps:` where the file has frontmatter.
5. `Write`/`Edit` the target file; for components also update `index.md`.
6. Report: files written, variant/section counts, every `gaps` flagged, any Web page deliberately ignored, and any registry page that 404'd or is still TODO.
