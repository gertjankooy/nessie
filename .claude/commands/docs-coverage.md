---
description: Read-only audit — list ZeroHeight pages that have no mapping in the /sync-docs registry or no matching reference file, plus reference docs that don't follow the machine-readable tag convention. Coverage overview, writes nothing.
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
- **PRINCIPLES** (Visual direction, Platform Consistency, UX Guidelines) → `design-language.md` / `reference/fundamentals/layout.md` (navigation region)

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
   - ⚠️ **Mapped, no file yet** — registry lists it (or marks TODO) but no reference file exists yet.
   - ❌ **Unmapped** — in scope but absent from both the registry and the reference files. **This is the headline list.**
   - 🔌 **Reverse gap** — a reference file (or section) that cites no ZeroHeight source but draws from another source (Notion App Guidelines, platform code) — flag so a source can be mapped later.
4. **Convention audit** (local files only — no ZeroHeight needed). Report every reference doc that doesn't follow the machine-readable tag convention in `reference/components/_component-doc-standard.md` → *Machine-readable tags*:
   - **Components** — a `reference/components/*.md` with a `## Configurations` section but **no** `` `variant:` `` or `` `state:` `` tag in it. Exclude `index.md` and `_component-doc-standard.md`.
     `for f in reference/components/*.md; do case "$f" in *index.md|*_component-doc-standard.md) continue;; esac; grep -q '^## Configurations' "$f" && ! grep -qE '`(variant|state): [a-z0-9-]+`' "$f" && echo "$f"; done`
   - **Patterns** — a `reference/patterns/*.md` with no `` `pattern:` `` tag.
     `for f in reference/patterns/*.md; do grep -qE '`pattern: [a-z0-9-]+`' "$f" || echo "$f"; done`
   - **Malformed tags** — anything matching `variant:`/`state:`/`pattern:` that isn't backticked kebab-case, or a slug used twice in the same file.
     `grep -rnoE '\b(variant|state|pattern): [A-Za-z0-9 _-]+' reference/ | grep -vE '`(variant|state|pattern): [a-z0-9-]+`'`

   Also flag docs missing the other slots the standard mandates, since they're cheap to check in the same pass. The standard is the authority on what each requires; don't restate its rules here, just report what's absent. Check the `### Motion` sub-header on components that animate, the length limit under `## Content guidelines`, and the three required `## Accessibility` statements (touch areas, accessibility labels, font scaling at 200%). A quick first pass on the accessibility trio:
   `for f in reference/components/*.md; do case "$f" in *index.md|*_component-doc-standard.md) continue;; esac; m=""; grep -qiE 'touch|2\.5\.8' "$f" || m="$m touch-areas"; grep -qiE 'announce|4\.1\.2|1\.1\.1' "$f" || m="$m a11y-labels"; grep -qiE '200%|1\.4\.4|scal' "$f" || m="$m font-scaling"; [ -n "$m" ] && echo "$f:$m"; done`

   Treat that grep as a shortlist, not a verdict: confirm by reading before reporting.

   - **Em dashes** are banned house-wide (`reference/components/_component-doc-standard.md` → *Golden rules*). Report every file containing one, with a count:
     `grep -rc '—' reference/ | grep -v ':0$'`

   Report all of the above as **⚙️ Convention gap**; they are *not* ZeroHeight coverage gaps and stay in their own table.

5. **Report** as five short tables (Unmapped first, Convention gaps last), each coverage row: `ZeroHeight page · area · id · suggested target file`; each convention row: `file · which convention · what's missing`. End with a one-line count summary (`X in scope · Y covered · Z unmapped · N reverse-gaps · M convention gaps`) and, for `--`-style brevity, list only ❌, 🔌 and ⚙️ when everything else is green.

## Notes
- IDs drift — always resolve fresh from `list-pages`, don't trust cached numbers.
- This command is the inverse of `/sync-docs`: `/sync-docs` pulls content for **mapped** pages; `/docs-coverage` finds the pages **not yet mapped**. Neither touches token *values* — that's `/sync-tokens`.
- Treat a same-named **Web** page as out of scope even when an App page is missing; never suggest mapping the Web variant.
