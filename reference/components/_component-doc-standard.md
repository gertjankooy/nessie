# Component Doc Standard

The canonical structure for a `reference/components/<kebab>.md` file. Follow this when **creating or editing** a component doc so every component reads the same way and stays machine-navigable. [button.md](button.md) is the reference example. This spec is the single source of truth — the `/pull-from-zeroheight` Component template points here.

**Golden rules**
- **ZeroHeight (App) is the source of truth** — never invent variants, props, states, or token names. If something isn't documented, mark it a gap (below), don't guess.
- **iOS-first, US English, sentence case** in headings and body.
- **No `---` dividers in the body**, no implementation code (SwiftUI/Compose/web), no Storybook links, no per-image style/attribute tables.
- **Never use an em dash (`—`).** Rewrite the sentence instead: a colon to introduce, a semicolon or full stop to separate two clauses, commas or parentheses for an aside. Don't swap in a spaced hyphen (` - `) as a lookalike. En dashes in numeric ranges (`1–3 words`) are fine. **This one applies house-wide**, to every doc in the skill and not only components; `/pull-from-zeroheight` and `/docs-coverage` both defer to this rule rather than restating it.
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
sync: <pull | push>         # who owns this doc; omit = pull. See Sync direction below
images: {<name>: "<node>"}  # push docs only: image name to Figma node id
---
```

- `related` uses **name slugs**, not file paths (e.g. `button-group`, not `button-group.md`).
- `gaps` lists the **section headers** that are undocumented (see Gaps below); it drives `/docs-coverage` reporting.

## Body — fixed section order

Use exactly these headers, in this order. Keep a header even when its content is a gap.

| # | Section | What it holds |
| :-- | :--- | :--- |
| 1 | `# <Component>` | The H1, matching `component:`. |
| 2 | `## Examples` | One or two representative images with a caption each, no prose beyond the captions. On ZeroHeight this becomes the **Examples** tab. Every image is a declared `images:` entry (see Sync direction). New docs start with 1-2 placeholder `[Image: …]` briefs here. |
| 3 | `## Usage` → `### Use when` / `### Don't use when` | Bulleted when-to-use / when-not-to. A short prose line after the lists is fine (e.g. button-vs-link). |
| 4 | `## Anatomy` | The parts of the component, each **bolded** with a one-line role. Mark optional parts "(optional)". |
| 5 | `## Configurations` | Variants, types, sizes, widths, states. Group under `###` sub-headers (Type / Size / Width / …). Every variant and state carries a **machine-readable tag** (below). Buttons & form controls carry the disabled-state callout (below). |
| 6 | `## Placement` | Where it sits, spacing to neighbours, backgrounds/surfaces, pairing with other components. |
| 7 | `## Behavior` | Interactive/dynamic behaviour — loading, expand/collapse, selection, transitions. Covers **sizing** (min/max, truncation, multi-line) and **scroll behaviour** where they apply, plus a `### Motion` sub-header (below). Input components also document their **keyboard/input triggers** here (keyboard type, autocapitalisation, return key, input masks). |
| 8 | `## Best practices` | Do/consider guidance that isn't a hard rule. |
| 9 | `## Content guidelines` | Copy rules, including **length limits** — max characters or a word-count target where one exists. Cross-link to the matching `../content/<kebab>.md` (or `../content/index.md`) — see Cross-links. |
| 10 | `## Accessibility` | A11y specifics with **WCAG refs in backticks** (e.g. `` `2.5.8` ``). Three items are always stated: **touch areas** (the component's own target size, and any deliberate exception to the ≥48 default, `2.5.8`), **accessibility labels** (what is announced, in what order — with a worked example where the label is composed from several parts, `1.1.1` `4.1.2`), and **font-scaling behaviour at 200%** (what reflows, what truncates, what the component must not do, `1.4.4`). Cross-link to `../accessibility.md` for the cross-cutting rules. |
| 11 | `## Source` | ZeroHeight URL + `(page <id>, synced <date>)`, and `Figma: <node>` when known. |

The section order above is authored order. On ZeroHeight the push build regroups it into tabs: **Examples** (`## Examples`), **Design guidelines** (intro through Best practices), **A11y**, and **Content**. See Sync direction.

### The disabled-state callout (buttons & form controls)
When a component *could* have a disabled state, include this after Configurations:

```
⚠️ **Missing the disabled state?** Disabled states are intentionally omitted: not all users recognize them, greyed-out styling causes contrast issues, and disabled controls can't receive focus so screen readers skip them. Instead, let users interact and respond with a message inline and/or error message.
```

## Sync direction

Every doc is owned by exactly one side. The `sync:` key says which, and an absent key means `pull`.

| `sync:` | Who owns it | What happens |
| :--- | :--- | :--- |
| `pull` (default) | ZeroHeight | `/pull-from-zeroheight` pulls the page into this file, as it always has. |
| `push` | This repo | The file is generated into `zeroheight/` and ZeroHeight renders it. **`/pull-from-zeroheight` never writes to it.** |

**This file stays the single canonical copy either way.** For `push` docs the tab files under `zeroheight/` are generated output: never hand-edited, never read by an agent, and enforced by a pre-commit check that regenerates and diffs. They carry no "generated" marker, because the file's whole content is published.

### What a push doc keeps in frontmatter
`zeroheight_page_id` / `zeroheight_url` are dropped: the ZeroHeight pages are linked once by hand in the git integration and there is nothing to resolve. Add `images:` mapping a name to the Figma node id it exports from, which is what the image export reads.

### What the generator strips on the way out
Repo-only scaffolding that would be meaningless to a reader on ZeroHeight:

- The **frontmatter block** in full.
- The **`## Source`** section (ZeroHeight is the output now, not the source).
- **`Local guidance` markers**: the marker line only; the content it protects is kept.
- **Gap markers** (`_Not available in ZeroHeight — to review._`) and their empty sections.
- The **H1**, since each ZeroHeight tab supplies its own page title. Generated files start at `##`.

### Tab mapping (push docs)
The sections split across four generated files. The Dev tab is authored in ZeroHeight and never generated, because implementation code is out of scope here.

| Tab file | Sections |
| :--- | :--- |
| `examples.md` | Examples |
| `design-guidelines.md` | intro, Usage, Anatomy, Configurations, Placement, Behavior, Best practices |
| `a11y.md` | Accessibility |
| `content.md` | Content guidelines |

When a tab holds exactly one section, its `##` header is dropped and the content promoted, so the tab doesn't repeat its own name.

### Writing for both audiences
A push doc is read by agents *and* published to designers, so it must satisfy both. In practice that means images are allowed and useful (see below), while implementation code still isn't.

**Images.** ZeroHeight's markdown sync renders images only from **absolute URLs**; relative paths don't resolve, raw HTML is escaped, and there is no inline width syntax. So:

- Reference exported PNGs by full URL, with a bold title and an italic caption line beneath.
- Size images by **layout, not attributes**: a two-column markdown table gives a side-by-side do/don't pair, a single-cell table narrows one image, and no table means full width.
- Register every image in `images:` so the export can regenerate it from Figma.

## Machine-readable tags

Docs in this skill carry inline tags so an agent can address a specific variant or state without parsing prose. The pattern docs already do this (`` `pattern: sheet` ``, `` `variant: full-height` `` in `../patterns/interaction-models.md`); components use the same convention.

**Rule: every variant and every state documented under `## Configurations` carries a tag.** Put it in the bullet, directly after the bolded name:

```markdown
### Type
- **Default** `variant: default`: the standard appearance.
- **Compact** `variant: compact`: for dense layouts.

### State
- **Pressed** `state: pressed`: while the control is held.
```

- Two tag types only: `variant:` for variants, types, sizes, and widths; `state:` for interaction states.
- The slug is **kebab-case of the variant name** (`Full height` → `full-height`) and must be unique within the file.
- Tags are backticked so they read as code and stay greppable: `grep -rhoE '\`(variant|state): [a-z0-9-]+\`'`.
- A doc whose `## Configurations` has no tags is reported by `/docs-coverage` as a convention gap.

Anatomy parts, placement rules, and behaviour are **not** tagged — only the addressable configuration surface.

## Deliberately out of scope (don't add, don't report as gaps)

These belong to ZeroHeight or the platform repos, not to this skill. They're excluded on purpose, so a checklist comparison shouldn't flag them:

- **Implementation code** — SwiftUI / Compose / web snippets, Storybook links, package names.
- **Per-platform status and resources** — availability tables, version numbers, "coming to Android" notes. iOS-first *design* divergence uses a `> **Android:**` callout instead.
- **Visual examples** — instance galleries, annotated anatomy images, in-context screenshots. The docs describe; ZeroHeight and Figma show.

## Motion

When a component animates, document it under a `### Motion` sub-header inside `## Behavior`, naming the semantic tokens rather than raw values (`motion.duration.default`, `motion.ease.default` — see `../tokens/motion.md`). State reduced-motion behaviour. Where a platform diverges, use a `> **Android:**` callout. If the motion can't be expressed with existing tokens, say so and mark the block `Local guidance` so the gap survives the next sync.

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

**Rule: any content you add that is not sourced from ZeroHeight MUST carry this marker.** Sometimes a decision is documented here *before* the ZeroHeight page catches up (design changes flow both ways). Mark every such block so `/pull-from-zeroheight` doesn't mistake its absence upstream for a removal and delete it:

```
> **Local guidance — keep on sync (authored ahead of ZeroHeight; not a removal).**
```

Put the line directly under the section/sub-section heading it protects. When ZeroHeight later covers the content, reconcile the wording and **remove the marker** — it becomes normal synced content. This is the counterpart to a gap: a gap = ZeroHeight has it, we don't yet; a `Local guidance` block = we have it, ZeroHeight doesn't yet. (Keep the marker's "Local guidance" wording distinct from the gap phrase "not yet in ZeroHeight — to review", which means the opposite.)

## Authoring checklist (verify before done)

- [ ] It's an **App** component (not Web); source is ZeroHeight (+ Figma), nothing invented.
- [ ] **Frontmatter** complete; `zeroheight_page_id` / `zeroheight_url` match the App page; `last_synced` = today; `related` uses name-slugs.
- [ ] **All 10 section headers present and in order** — gaps kept (header + marker), not dropped.
- [ ] Every variant / state / token name is traceable to the source.
- [ ] **Every variant and state under `## Configurations` carries a `variant:` / `state:` tag**, kebab-case and unique in the file.
- [ ] If the component animates, `## Behavior` has a `### Motion` sub-header naming semantic motion tokens and reduced-motion behaviour.
- [ ] `## Accessibility` states **touch areas** (`2.5.8`), **accessibility labels** — what's announced and in what order, with a worked example where the label is composed (`1.1.1` `4.1.2`) — and **font-scaling behaviour at 200%** (`1.4.4`).
- [ ] `## Content guidelines` gives a **length limit** (max characters or word target) where one exists.
- [ ] `## Behavior` covers **sizing** and **scroll** where they apply; input components document **keyboard/input triggers**.
- [ ] `## Accessibility` and `## Content guidelines` gaps are **cross-linked** (`../accessibility.md` / `../content/index.md`), not bare markers — and still listed in `gaps:`.
- [ ] Buttons / form controls carry the `⚠️ Missing the disabled state?` callout.
- [ ] Cross-links resolve (paths relative to `reference/components/`); WCAG refs in backticks.
- [ ] No implementation code, no `---` dividers, sentence case throughout.
- [ ] **No em dash (`—`) anywhere in the file** (`grep -n '—' <file>` returns nothing).
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

## Examples
![Example in context](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight/assets/example/in-context.png)

*A one-line caption naming what the image shows.*

## Usage
### Use when
- …
### Don't use when
- …

## Anatomy
- **Part**: role.

## Configurations
### Type
- **Default** `variant: default`: …

### State
- **Pressed** `state: pressed`: …

## Placement
- …

## Behavior
- …

### Motion
- Uses `motion.duration.default` with `motion.ease.default`. Degrades to an instant change under reduced motion.

## Best practices
- …

## Content guidelines
- Keep the label to N characters / 1–3 words.

Follow the UX-writing scorecard and NS voice in [../content/index.md](../content/index.md).

## Accessibility
- … `[1.4.3]`
- Touch area is `size.component.control.height.default` (48). `[2.5.8]`
- Announced as "<label>, <role>, <state>" — e.g. "Tickets, button, collapsed". `[1.1.1]` `[4.1.2]`
- At 200% font scaling the label wraps rather than truncating. `[1.4.4]`

## Source
- ZeroHeight: https://design.ns.nl/…/example (page `0000000`, synced 2026-01-01)
```
