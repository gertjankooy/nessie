# NESSIE Shape Tokens (Radius & Border Width)

Corner-radius and border-width reference for NS app surfaces. Pick **semantic radius/width tokens** — never raw radius steps, never invented values. Values are px / points / dp.

## 3-tier model

| Tier | Example | Who uses it |
| :--- | :--- | :--- |
| Core / raw | `border.radius.150` = 6, `border.radius.300` = 12, `border.width.2` = 2 | System only. **Never in designs.** |
| Base / semantic | `border.radius.container`, `border.width.active` | **Designers pick these.** |
| Applied | `control.border.radius`, `route.border.radius.indicator` | Component-fixed values. |

> **Figma variable / naming:** Figma binds these as `--border/radius/container` etc. (slash form). JSON = `border.radius.container`; Android = `NesTokens.layout.borderRadiusContainer`; iOS = `NesCornerRadius`; Web/CSS = `--nes-base-border-radius-*` (Tailwind `nes:rounded-container`).
> **iOS note:** The older iOS `NesCornerRadius` enum (`.sm`=3, `.md`=6, `.lg`=12, `.xl`=16, `.full`=9999) predates the app layout-radius tokens. For **app design, follow the semantic app values below** (cards/list items = `container` 12), not `.md`=6.

## Border radius

Usage column reflects the **app layout-token system** (authoritative — `NesTokens.layout.borderRadius*`).

| Token | Value | Usage |
| :--- | :--- | :--- |
| `border.radius.keen` | 0 | Sharp corner / flush edge. |
| `border.radius.edge` | 1 | Barely-rounded edge. |
| `border.radius.particle` | 3 | Pill indicators, chips, badges, compact buttons. |
| `border.radius.default` | 6 | Small / compact elements, text fields, inline controls. |
| `border.radius.container` | 12 | **Cards, list items, containers** (the everyday app container radius). |
| `border.radius.interaction` | 16 | Interactive overlays, **bottom sheets**. |
| `border.radius.panel` | 24 | Large panels or modals. |
| `border.radius.area` | 32 | Large area surfaces. |
| `border.radius.entire` | 9999 | Fully round — pills, fully-rounded elements, circular. |

## Border width

| Token | Value | Usage |
| :--- | :--- | :--- |
| `border.width.none` | 0 | No border. |
| `border.width.default` | 1 | Standard dividers, rest-state outlines. |
| `border.width.active` | 2 | Focused / selected / active borders; focus outline width. |

## Applied shape (component)

| Token | Resolves to | Usage |
| :--- | :--- | :--- |
| `control.border.radius` | `border.radius.default` (6) | Default control corner radius. |
| `interaction.outline.width` | `border.width.active` (2) | Focus-ring stroke width. |
| `interaction.outline.offset.default` / `.sm` | 3 / 1 | Focus-ring offset from element. |
| `route.border.radius.indicator` | `border.radius.entire` | Route/journey indicator dot. |
| `route.border.width` | 2 | Route line. |

## Rules / Don'ts

- **Never raw `border.radius.*` numeric steps** in a design — pick a semantic radius.
- **Never invent radii** (4, 8, 10). The scale is sparse by design; round to nearest token and flag.
- **Cards/list items/containers → `container` (12).** Bottom sheets/interactive overlays → `interaction` (16). Modals/large panels → `panel` (24). Text fields/compact controls → `default` (6). Pills/chips → `particle` (3) or `entire`.
- **Focused/selected state uses `border.width.active` (2)** — don't thicken arbitrarily.
- **Shadow OR border on elevated surfaces, never both** (see color.md `content.background.elevated`).
