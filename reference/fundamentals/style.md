# Using Shape & Style

> How to choose corner radius and border width on an NS app surface. The **token lists themselves** live in `../tokens/shape.md` (radius, border width) and `../tokens/spacing.md` (spacing scale, control heights, icon sizes); this page is about picking between them.

The radius scale is sparse by design. Round to the nearest token and flag the gap rather than inventing a value.

## Choosing a radius

| Surface | Radius |
| :--- | :--- |
| Cards, list items, containers | `border.radius.container` (12) |
| Bottom sheets, interactive overlays | `border.radius.interaction` (16) |
| Modals, large panels | `border.radius.panel` (24) |
| Large area surfaces | `border.radius.area` (32) |
| Text fields, compact controls | `border.radius.default` (6) |
| Pills, chips, badges | `border.radius.particle` (3) or `border.radius.entire` |
| Sharp corner / flush edge | `border.radius.keen` (0) |

## Choosing a border width

- **`border.width.default`** (1) for standard dividers and rest-state outlines.
- **`border.width.active`** (2) for focused, selected, and active borders, including the focus outline. Don't thicken arbitrarily.

## Applying shape

- **Shadow or border on elevated surfaces, never both.** In dark mode a shadow barely reads, so use the border. See `color.md`.
- **Radius follows the surface's job**, not its size. A large card is still `container`.

## Spacing

Applied spacing guidance for screen structure (inset, stack, inline, and the four body levels) lives in `layout.md`. This page does not restate it.

## Source

- ZeroHeight: Fundamentals → Style (page `6693107`). Token lists: TOKENS → Style/Dimension (pages `6699361` / `6694971`), documented in `../tokens/shape.md` and `../tokens/spacing.md`.
