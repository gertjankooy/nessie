# Component Doc Standard

The canonical structure for a `reference/components/<kebab>.md` file. Follow this when **creating or editing** a component doc so every component reads the same way and stays machine-navigable. [button.md](button.md) is the reference example. This spec is the single source of truth — the `/sync-docs` Component template points here.

**Golden rules**
- **ZeroHeight (App) is the source of truth** — never invent variants, props, states, or token names. If something isn't documented, mark it a gap (below), don't guess.
- **iOS-first, US English, sentence case** in headings and body.
- **No `---` dividers in the body**, no implementation code (SwiftUI/Compose/web), no Storybook links, no per-image style/attribute tables.
- **Filename = kebab-case of the App page title** (e.g. "Date Picker Input" → `date-picker-input.md`).
- After writing, **add/refresh the row in `index.md`**.

## Frontmatter

Every component file opens with this YAML block:

```yaml
---
component: <Name>            # display name, e.g. "Date Picker Input"
category: <one of>          # forms · content · feedback · navigation · buttons · domain
status: <stable | partial>  # partial = documented but incomplete/evolving
aliases: [<other names>]    # search aliases; [] if none
zeroheight_page_id: <id>    # numeric ZeroHeight App page id
zeroheight_url: <url>       # canonical App page URL
figma_node: "<node>"        # e.g. "1437:8588"; omit if unknown
last_synced: <YYYY-MM-DD>   # date of this sync
related: [<kebab slugs>]    # sibling docs by name-slug (not paths), e.g. [button-group, link]
gaps: [<Section names>]     # sections with no ZeroHeight content; [] if complete
---
```

- `related` uses **name slugs**, not file paths (e.g. `button-group`, not `button-group.md`).
- `gaps` lists the **section headers** that are undocumented (see Gaps below); it drives `/docs-coverage` reporting.

## Body — fixed section order

Use exactly these headers, in this order. Keep a header even when its content is a gap.

| # | Section | What it holds |
| :-- | :--- | :--- |
| 1 | `# <Component>` | The H1, matching `component:`. |
| 2 | `## Usage` → `### Use when` / `### Don't use when` | Bulleted when-to-use / when-not-to. A short prose line after the lists is fine (e.g. button-vs-link). |
| 3 | `## Anatomy` | The parts of the component, each **bolded** with a one-line role. Mark optional parts "(optional)". |
| 4 | `## Configurations` | Variants, types, sizes, widths, states. Group under `###` sub-headers (Type / Size / Width / …). Buttons & form controls carry the disabled-state callout (below). |
| 5 | `## Placement` | Where it sits, spacing to neighbours, backgrounds/surfaces, pairing with other components. |
| 6 | `## Behavior` | Interactive/dynamic behaviour — loading, expand/collapse, selection, transitions. |
| 7 | `## Best practices` | Do/consider guidance that isn't a hard rule. |
| 8 | `## Content guidelines` | Copy rules. Cross-link to the matching `../content/<kebab>.md` (or `../content/index.md`) — see Cross-links. |
| 9 | `## Accessibility` | A11y specifics with **WCAG refs in backticks** (e.g. `` `2.5.8` ``). Cross-link to `../accessibility.md` for the cross-cutting rules. |
| 10 | `## Source` | ZeroHeight URL + `(page <id>, synced <date>)`, and `Figma: <node>` when known. |

### The disabled-state callout (buttons & form controls)
When a component *could* have a disabled state, include this after Configurations:

```
⚠️ **Missing the disabled state?** Disabled states are intentionally omitted: not all users recognize them, greyed-out styling causes contrast issues, and disabled controls can't receive focus so screen readers skip them. Instead, let users interact and respond with a message inline and/or error message.
```

## Cross-links (paths are relative to `reference/components/`)
- Content → `../content/<kebab>.md` if a matching content file exists, else `../content/index.md`.
- Accessibility → `../accessibility.md`.
- Other components → same-dir bare slug link, e.g. `[Button group](button-group.md)`.
- Layout/spacing → `../fundamentals/layout.md`; interaction/surfaces → `../patterns/interaction-models.md`.

## Gaps (kept, not dropped)
A section with nothing in ZeroHeight keeps its header and is added to `gaps:`. Mark it:

```
_Not available in ZeroHeight — to review._
```

**Cross-link exception:** for `## Accessibility` and `## Content guidelines` with no component-specific ZeroHeight content, replace the bare marker with a pointer to the general doc (`../accessibility.md` / `../content/index.md`) — but **keep the section in `gaps:`**, since the component-specific detail is still pending.

## Local guidance (authored ahead of ZeroHeight)

**Rule: any content you add that is not sourced from ZeroHeight MUST carry this marker.** Sometimes a decision is documented here *before* the ZeroHeight page catches up (design changes flow both ways). Mark every such block so `/sync-docs` doesn't mistake its absence upstream for a removal and delete it:

```
> **Local guidance — keep on sync (authored ahead of ZeroHeight; not a removal).**
```

Put the line directly under the section/sub-section heading it protects. When ZeroHeight later covers the content, reconcile the wording and **remove the marker** — it becomes normal synced content. This is the counterpart to a gap: a gap = ZeroHeight has it, we don't yet; a `Local guidance` block = we have it, ZeroHeight doesn't yet. (Keep the marker's "Local guidance" wording distinct from the gap phrase "not yet in ZeroHeight — to review", which means the opposite.)

## Authoring checklist (verify before done)

- [ ] It's an **App** component (not Web); source is ZeroHeight (+ Figma), nothing invented.
- [ ] **Frontmatter** complete; `zeroheight_page_id` / `zeroheight_url` match the App page; `last_synced` = today; `related` uses name-slugs.
- [ ] **All 10 section headers present and in order** — gaps kept (header + marker), not dropped.
- [ ] Every variant / state / token name is traceable to the source.
- [ ] `## Accessibility` and `## Content guidelines` gaps are **cross-linked** (`../accessibility.md` / `../content/index.md`), not bare markers — and still listed in `gaps:`.
- [ ] Buttons / form controls carry the `⚠️ Missing the disabled state?` callout.
- [ ] Cross-links resolve (paths relative to `reference/components/`); WCAG refs in backticks.
- [ ] No implementation code, no `---` dividers, sentence case throughout.
- [ ] Filename = kebab-case of the App page title; **`index.md` row added/refreshed** under the right category.

## Minimal skeleton

```markdown
---
component: Example
category: forms
status: stable
aliases: []
zeroheight_page_id: 0000000
zeroheight_url: https://design.ns.nl/…/example
figma_node: "0:0"
last_synced: 2026-01-01
related: []
gaps: [Behavior]
---

# Example

## Usage
### Use when
- …
### Don't use when
- …

## Anatomy
- **Part**: role.

## Configurations
### Type
- **Default**: …

## Placement
- …

## Behavior
_Not available in ZeroHeight — to review._

## Best practices
- …

## Content guidelines
Follow the UX-writing scorecard and NS voice in [../content/index.md](../content/index.md).

## Accessibility
- … `[1.4.3]`

## Source
- ZeroHeight: https://design.ns.nl/…/example (page `0000000`, synced 2026-01-01)
```
