---
description: Sync NESSIE skill docs from ZeroHeight — App components, app patterns, and fundamentals — into the matching reference files. Flags undocumented gaps.
argument-hint: <name | "all" | "components" | "patterns" | "fundamentals" | comma-list> [--check]
allowed-tools: mcp__claude_ai_ZeroHeight__list-pages, mcp__claude_ai_ZeroHeight__search-pages, mcp__claude_ai_ZeroHeight__get-page, mcp__claude_ai_ZeroHeight__list-releases, Read, Write, Edit
---

# /sync-docs

Refresh this skill's reference docs from the NESSIE ZeroHeight (`Nessie Design System`). One run can check **all** relevant ZeroHeight pages — App components, app patterns, and fundamentals — and fold changes into the matching files. Write in **US English**, **App / iOS-first**, ZeroHeight as the source of truth.

**Argument:** `$ARGUMENTS`
- A name → sync that one component/pattern/fundamental (e.g. `/sync-docs Tag`, `/sync-docs Interaction Models`, `/sync-docs Color`).
- A **category** → `components` · `patterns` · `fundamentals` · `guidelines` (Content + Accessibility).
- `all` → everything in the registry below.
- A comma-list → each in turn.
- Append `--check` → report drift only, write nothing.

## Source registry  (ZeroHeight → repo file · template)

| ZeroHeight area | Repo target | Template |
| :--- | :--- | :--- |
| **COMPONENTS → App** (54 pages) | `reference/components/<kebab>.md` (one per component; see `index.md`) | Component |
| **Design System → PATTERNS → Interaction Models** (`8100862`) | `reference/patterns/interaction-models.md` | Pattern |
| **Design System → PATTERNS → Settings & Utility** (`8094399`) | `reference/patterns/settings-utility.md` | Pattern |
| **Design System → PATTERNS → Feedback & States** (`8773720`) | `reference/patterns/feedback-states.md` (folds in the page's Overview + Empty States + Error Handling tabs) | Pattern |
| **Fundamentals → Color** (`6693013`) + **TOKENS → Color** (`6694970`) | `reference/tokens/color.md` (usage + Visual hierarchy + token list) | Token |
| **Fundamentals → Typography** (`6693097`) + **TOKENS → Typography** (`6694972`) | `reference/tokens/typography.md` | Token |
| **Fundamentals → Style** (`6693107`) + **TOKENS → Style/Dimension** (`6699361`/`6694971`) | `reference/tokens/shape.md` · `spacing.md` | Token |
| **Fundamentals → Motion** (`6693108`) + **TOKENS → Motion** (`6699072`) | `reference/tokens/motion.md` | Token |
| **TOKENS → Overview / applied** | `reference/tokens/applied.md` | Token |
| **Fundamentals → Composition → Layout for App** (`6693137`) | `reference/fundamentals/layout.md` | Fundamental |
| **Fundamentals → Icons** (`6693098`) | `reference/components/icon.md` + `reference/design-language.md` | mixed |
| **Fundamentals / PRINCIPLES → Visual direction** (`5794046`), **Logo / Assets** (`6693011`) | `reference/design-language.md` | Doc |
| **Guidelines → CONTENT** — Principles of content design (`4492224`), Content scorecard (`5784475`), per-component content (Button `4449721`, Link `4460300`, Error message `4460630`, Empty state `4885927`, Breadcrumb `4492170`) | `reference/content/index.md` + `reference/content/<kebab>.md` (`button` · `link` · `error-message` · `empty-state` · `breadcrumb`) — wording/tone source of truth referenced by patterns (`feedback-states.md`) and by the matching `reference/components/*.md`. **TODO:** Products (Ticket `5784480`) not yet synced | Doc |
| **Guidelines → ACCESSIBILITY** — Accessibility (`5784505`), WCAG (`6221540`), Checklist per role (`5784836`), Getting started (`5868110`), Accessibility labels deep-dive (`5891441`) | `reference/accessibility.md` (design-level a11y rules; fold ZeroHeight guidance into the existing house-style doc — it has no frontmatter, preserve it) | Doc |

> Re-resolve page IDs with `list-pages` before trusting them — IDs can change. The token files draw from **two** ZeroHeight pages each (a Fundamentals usage page + a Tokens list page); reconcile both. The **CONTENT** and **ACCESSIBILITY** rows each cover several ZeroHeight pages under one Guidelines section — sync the section as a set, not page-by-page.

## Hard rules (all templates)
1. **App only.** Use `COMPONENTS → App`, never the `Web` group. If something exists only under Web, report "no App page" and skip.
2. **ZeroHeight is the only source of truth.** Never invent content, variants, props, token names, or values.
3. **Gaps are kept, not dropped.** A section with nothing in ZeroHeight keeps its header with `_Not available in ZeroHeight — to review._`, is added to frontmatter `gaps:` (where the file has frontmatter), and is flagged in the run report. **Cross-link exception:** for a component's `## Accessibility` or `## Content guidelines` section with no ZeroHeight content, replace the bare marker with a pointer to the general doc — `[../accessibility.md](../accessibility.md)` or `[../content/index.md](../content/index.md)` respectively — while still keeping the type in `gaps:` (component-specific detail is still pending). Don't revert these cross-links back to the bare marker on re-sync.
4. **No implementation details** — no SwiftUI/Compose/web code, Storybook links, or platform status tables. **Exception:** iOS-first *design* divergences as `> **Android:**` / `> **iOS 26+:**` callouts.
5. **Drop the noise** — per-image `**Style**`/`**Attributes**` tables (`#FFFFFF`, `848px`, `X:0 Y:0`), decorative images, "Questions?"/"Copywriting moved" blocks, marketing prose.
6. **Tokens by meaning, never hex** in base/applied rows; the **core tier** may show a raw value exactly as the existing tables do.
7. **Match each file's existing structure and tone.** Don't reformat a doc that already has a house style; extend it.
8. **Sync is a two-way diff — reconcile removals, not just additions.** When ZeroHeight has *dropped* a section, subsection, variant, rule, table row, or piece of guidance that the existing file still carries, **remove it from the file too**. A sync that only folds in new/changed content and never deletes will accumulate stale text. Before writing, walk the existing file section by section and confirm each still exists on the page; delete what no longer does, and note every deletion in the report. **Do not delete** the intentional house-style scaffolding the docs keep by design: the `## Source` block, `gaps:` placeholders (rule 3), `> **Android:**` / `> **iOS 26+:**` divergence callouts, cross-references to other reference files, and deliberate distillations (e.g. glossaries the doc chose not to mirror). If you can't tell whether something was an earlier deliberate distillation or is newly removed, keep it and flag it in the report rather than guessing.

   **Local-guidance exception (design changes that land here before ZeroHeight).** Sometimes a decision is documented in the skill *before* the upstream page catches up (the flow runs both ways). Any block whose heading is followed by a `> **Local guidance — keep on sync …**` line is authored here ahead of / independent of the page — **its absence from ZeroHeight is not a removal; never delete it on sync.** When the page later covers that content, reconcile the two wordings and **remove the `Local guidance` marker** (it becomes normal synced content); until then leave the block and its marker untouched. Report every `Local guidance`-marked block you passed over. (Don't confuse this with the gap cross-link phrase "…not yet in ZeroHeight — to review", which means the opposite: ZeroHeight lacks it, we cross-link the general doc.)

9. **No em dashes.** Per the house writing rules in `reference/components/_component-doc-standard.md` → *Golden rules*, which apply to every file this command writes, not just components. Rewrite as you distill; verify with `grep -n '—' <file>`.

10. **Never write to a `sync: push` doc.** Frontmatter `sync: push` means the repo owns the file and ZeroHeight renders it, the opposite of this command's direction. Read it if you need context, never modify it, and list it under "skipped (push)" in the report. An absent `sync:` key means `pull`, so every existing doc is unaffected. See `reference/components/_component-doc-standard.md` → *Sync direction*.

## Templates

### Component  (`reference/components/<kebab>.md`)
**Canonical spec: `reference/components/_component-doc-standard.md`** (distributed with the skill) — follow it; keep this summary in sync with it, don't let them drift.
Frontmatter (`component, category, status, aliases, zeroheight_page_id, zeroheight_url, figma_node, last_synced, related, gaps`) + fixed body order, sentence case, no `---` dividers in the body:
`# <Component>` → `## Usage` (`### Use when` / `### Don't use when`) → `## Anatomy` → `## Configurations` (with the `⚠️ Missing the disabled state?` callout for buttons/form components) → `## Placement` → `## Behavior` → `## Best practices` → `## Content guidelines` → `## Accessibility` (WCAG refs in backticks) → `## Source`.
Filename = kebab-case of the App page title. After writing, update the row in `index.md`.

### Pattern  (`reference/patterns/*.md`)
Frontmatter (`pattern, zeroheight_page_id, zeroheight_url, last_synced, platforms, related, gaps`) + a pattern-appropriate structure (overview/principles, the patterns themselves with use-when/rules, a "choosing the right pattern" table, `## Source`). iOS-first; `> **Android:**` / `> **iOS 26+:**` callouts for divergence. No frontmatter-template lock-in — follow the page's own shape, distilled.

Every pattern carries an inline `` `pattern: <kebab-slug>` `` tag on the line under its heading, and each sub-variant a `` `variant: <kebab-slug>` `` tag — the same machine-readable convention components use (`reference/components/_component-doc-standard.md` → *Machine-readable tags*). `/docs-coverage` reports untagged pattern docs.

A pattern is **components + connections + function**: the building blocks, the interactions between them, and the purpose that emerges. Each documented pattern should make all three legible — name the **components it requires to function** (linked to `../components/*.md`), how they connect, and what the combination is for. A pattern that names no components is usually a guideline, not a pattern.

### Token / Fundamentals  (`reference/tokens/*.md`, `design-language.md`)
These files have an established house style (3-tier tables, usage columns, the Figma-slash callout) and **no YAML frontmatter** — **preserve it**. Fold changes in:
- New/changed semantic or applied tokens → the right tier table, described by meaning.
- Usage guidance (e.g. Color's *Visual hierarchy*, variant scale, when-to-use concepts) → the matching prose section.
- **Always keep the `--slash/form` vs dotted-JSON callout** at the top of every `reference/tokens/` file (token-doc convention in `CLAUDE.md`); add it to any new token file/category.
- Token **values** come from the design-tokens repo, not ZeroHeight prose — prefer `/sync-tokens` for the numeric source of truth; `/sync-docs` handles the *guidance and names*.

## Workflow (per item)
1. `list-pages` (or `search-pages`) → resolve the page in the right area; confirm it's App, not Web.
2. `get-page` → read it.
3. **Diff both directions.** Walk the ZeroHeight page → file (what's new or changed) **and** the file → ZeroHeight page (what the file still has that the page no longer does). `--check`: report added / changed / **removed** sections, variants, rows, and guidance — stop, no write.
4. Distill into the matching template: fold in new/changed content **and delete anything the page no longer contains** (rule 8, minus the protected scaffolding). Set `last_synced` to today and fill `gaps:` where the file has frontmatter. If you knowingly add content that isn't on the page yet (an interim decision), **mark it with the `Local guidance` marker** (rule 8) so the next sync doesn't delete it.
5. `Write`/`Edit` the target file; for components also update `index.md`.
6. Report: files written, variant/section counts, **every section/variant/row removed and why**, every `gaps` flagged, any Web page deliberately ignored, and any registry page that 404'd or is still TODO.
