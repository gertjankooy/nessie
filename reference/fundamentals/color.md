---
fundamental: Using Color
zeroheight_page_id: 6693013
# zeroheight_url: unknown, fill in once resolved from ZeroHeight
last_synced: 2026-08-20
sync: pull
platforms: [ios, android]
related: [layout, typography, color-tokens]
gaps: []
---

# Using Color

> How to choose color on an NS app screen: which surface carries which job, and how tokens combine. The **token list itself** (brand, system, content, applied) lives in `../tokens/color.md`; this page is about applying it.

Pick by **meaning**, never by swatch. Dark mode resolves automatically, so you never hand-pick a light-mode step or set a dark override.

## Visual hierarchy: choosing a background

Three foundational surface tokens build app layout hierarchy: `base`, `default`, and `elevated` (each with an `-alt` for a different dark-mode tone). Pick by the screen's job, not by looks.

- **`default`**: content-first screens (forms, reading, flows), rich text, and primary containers. **Modals and bottom sheets always use `default`**; they are content-heavy and need clarity across modes.
- **`base`**: utility / navigation-dominant screens (settings, search, overview/filter panels), and as the canvas to **visually group** `default` containers placed on top.
- **`elevated`**: components that must lift off the surface (cards, tiles, inputs). In **dark mode** use a border (shadows barely read); shadow *or* border, never both.

**Nesting & combinations**
- Nest `default` containers inside a `base` screen (e.g. settings: `base` page + `default` grouped containers). Inside a container, separate items with dividers; don't wrap every item in its own container.
- **Avoid full-page `elevated`**; it is reserved for components only.
- Use `background-alpha` tokens for overlays / semi-transparent components (badges, tooltips, overlays) so they adapt across elevations and modes.

**Quick reference**

| Use case | Background |
| :--- | :--- |
| Settings screen | `base` + `default` for list containers |
| Grouped list sections | `default` on `base` |
| Search / filter view | `base` (results: `default` on `base`) |
| Modal / bottom sheet | `default` |
| Input container | `default` |
| Tile / card container | `elevated` / `elevated-alpha` |

See `layout.md` for spacing and insets on these surfaces, and `../patterns/settings-utility.md` for settings-screen structure.

## Applying color

- **Pick by meaning, not by swatch.** Matching colors is not a reason to reuse a token.
- **`on-default` for foreground on a filled surface.** Don't reuse `content.text.default` on a colored button.
- **Modality colors are scoped** to transport and travel-planner surfaces; never use them as generic accents.
- **Disabled** is an opacity token (`interaction.opacity.disabled-component`, 50%), not a greyed color.
- **Type color** comes from `content.text.*`, never baked into a type style. See `typography.md`.

## Source

- ZeroHeight: Fundamentals → Color (page `6693013`). Token list: TOKENS → Color (page `6694970`), documented in `../tokens/color.md`.
