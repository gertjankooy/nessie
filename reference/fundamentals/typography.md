---
fundamental: Using Typography
zeroheight_page_id: 6693097
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/2024f1-typography
last_synced: 2026-08-20
sync: pull
platforms: [ios, android]
related: [layout, color, typography-tokens]
gaps: []
---

# Using Typography

> How to choose a type preset on an NS app screen. The **preset list itself** (headings, body, labels, caption, link, eyebrow) lives in `../tokens/typography.md`; this page is about picking between them.

A preset carries size, weight, leading, and tracking together. Pick a preset by the role the text plays, and never recombine a size with a different weight or leading.

## Picking guide

| Need | Preset |
| :--- | :--- |
| Page title | `heading1` (or `heading2` if compact) |
| Section header | `heading2` / `heading3` |
| Card title | `heading4` |
| Prose / paragraph | `bodyDefault` |
| Long article | `bodyArticle` |
| List item title | `labelDefault` |
| Button text | `labelDefault` |
| Form field label | `labelSm` |
| Subtitle / metadata | `caption` |
| Legal / fine print | `footnote` |
| Inline link | `link` |
| Category lead-in | `eyebrow` |

## Applying type

- **Pick by role, not by size.** A card title is `heading4` because of what it is, not because 18px looked right.
- **Type color** comes from `content.text.*` (see `color.md`), never baked into the type style.
- **Heading structure carries meaning.** Visual level and semantic level should agree; see `../accessibility.md` for headings and structure.
- **Section headings** in the body region are a type style with the heading role, not an app-library component. See `layout.md` (Body region).

## Source

- ZeroHeight: Fundamentals → Typography (page `6693097`). Preset list: TOKENS → Typography (page `6694972`), documented in `../tokens/typography.md`.
