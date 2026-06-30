# NESSIE Color Tokens

Semantic color reference for designing/auditing iOS-first NS app screens. Pick **base (semantic)** or **applied (component)** tokens — never core/raw, never hex. Dark mode resolves automatically; you do not set dark values by hand.

> **Figma variable names** appear in slash form (`--content/text/default`). To match a token in this doc, drop the leading `--` and replace `/` with `.` → `content.text.default`. The Token Studio JSON / Figma names are authoritative; older Notion labels are out of date. See `../patterns/layout.md` for the full naming crosswalk.

## 3-tier model

| Tier | Example | Who uses it |
| :--- | :--- | :--- |
| Core / raw | `color.brand.yellow` = #FFC917, `color.gray.800` | System only. **Never in designs.** |
| Base / semantic | `content.text.default`, `system.critical.default` | **Designers pick these.** |
| Applied / component | `form.color.border`, `interaction.color.hover` | Pre-composed states; pick when one exists. |

A base token points at a core ramp step that differs per mode (e.g. light pairs a darker step, dark pairs a lighter step) to preserve contrast. That remap is automatic — choose by **meaning**, not by how the swatch looks.

> **iOS:** `NesPalette.contentTextDefault` (camelCase, no `default` suffix dropped). **Android:** `NesTokens` color refs. **Web/CSS:** `--nes-base-color-content-text-default` / Tailwind `nes:text-default`. Core = `NesColor` (iOS) / `--nes-core-*` (web) — debug/define only.

## Variant suffix scale

Intensity ladder, light→heavy emphasis. Not every role has every step.

`Default` → `OnDefault` → `Alt` → `Pale` → `Gentle` → `Subtle` → `Subdued` → `Strong` → `Heavy` → `Accent`

| Suffix | Meaning |
| :--- | :--- |
| `Default` | The standard value for the role. |
| `OnDefault` | Foreground/content placed *on* the Default fill (e.g. text on a colored button). |
| `Alt` | Alternate value, often for dark-mode pairing or large areas. |
| `Pale` | Lightest tint — soft fills, highlight backgrounds. |
| `Gentle` | Soft, low-contrast. |
| `Subtle` | Quiet — hint/tertiary text, rest-state outlines. |
| `Subdued` | Secondary, de-emphasised. |
| `Strong` | Emphasised, higher contrast. |
| `Heavy` | Highest-contrast / densest overlay. |
| `Accent` | Saturated accent (e.g. checked state). |
| `Alpha*` | Semi-transparent variant of any of the above. |

## Brand

| Token | Light → Dark (core step) | Usage |
| :--- | :--- | :--- |
| `brand.primary.default` | yellow #FFC917 → #FFC917 | NS Yellow — primary CTA, buy-ticket button. |
| `brand.primary.on-default` | blue #003082 | Content on yellow. |
| `brand.primary.alt` | yellow → gray.900 | Yellow surface in dark mode. |
| `brand.primary.strong` / `.gentle` / `.pale` | yellow.700 / .200 / .50 (light) | Stronger / soft / palest yellow. |
| `brand.secondary.default` | blue #003082 → blue.400 | NS Blue — secondary brand surfaces. |
| `brand.secondary.on-default` | white → blue.950 | Content on NS Blue. |
| `brand.secondary.alt` / `.subdued` | blue → blue.600 / blue.900→.300 | Pairing / de-emphasised. |
| `brand.tertiary.default` | light-blue #0063D3 → blue.400 | Interactive / link / active accent. |
| `brand.tertiary.on-default` / `.alt` / `.subdued` | white→blue.950 / … | On-tertiary, alt, pressed. |

## System / feedback

Each role: `default` (+`on-default`), and where present `alt`, `subdued`, `accent`, `gentle`, `pale` (critical also `strong`).

| Role | Default (light→dark) | Usage |
| :--- | :--- | :--- |
| `system.success.*` | green.600 → green.400 | On-time, success, confirmation. `accent`=green.500 (used for form checked). |
| `system.attention.*` | orange.600 → orange.400 | Warning, caution. |
| `system.critical.*` | red.600 → red.400 | Error, critical, destructive. Has `strong` (red.800→.200). |
| `system.info.*` | light-blue → blue.400 | Informational, neutral notices. |
| `system.highlight.*` | purple.600 → purple.400 | Offers / promos / highlight accent. |

Use `.pale` for the tinted background of an alert, `.default` for icon/border, `.on-default` for text on a filled status fill, `.gentle` for soft fills.

## Content — Text

| Token | Light → Dark | Usage |
| :--- | :--- | :--- |
| `content.text.default` | blue #003082 → gray.200 | Body text, labels, headings (default ink). |
| `content.text.strong` | gray.800 → gray.100 | Emphasised text. |
| `content.text.subdued` | gray.600 → gray.300 | Secondary text. |
| `content.text.subtle` | gray.500 → gray.400 | Hint / tertiary text. |
| `content.text.gentle` | gray.400 → gray.500 | Very soft text. |
| `content.text.logo` | blue → yellow | Logo mark color. |
| `content.text.inverse` | white → gray.800 | Text on dark/colored backgrounds. |
| `content.text.inverse-subdued` | gray.100 → gray.700 | Secondary text on dark backgrounds. |
| `content.text.alpha-gentle` / `-subtle` / `-inverse` | alpha overlays | Semi-transparent text over imagery/any surface. |

## Content — Background

| Token | Light → Dark | Usage |
| :--- | :--- | :--- |
| `content.background.base` | gray.25 → gray.900 | App canvas — settings, search, nav-heavy screens. |
| `content.background.base-alt` | gray.25 → gray.950 | Pairs with brand-alt; avoids overlap in dark mode. |
| `content.background.default` | white → gray.800 | Content-first screens, modals, forms, grouped containers. |
| `content.background.alt` | white → gray.200 | Alternative theming, larger areas in dark mode. |
| `content.background.elevated` | white → gray.700 | Cards, tiles, form inputs (shadow OR border, never both). |
| `content.background.elevated-alpha` / `-alpha-inverse` | white / alpha | Component overlays on any surface. |
| `content.background.inverse` / `-subtle` / `-subdued` | gray.700/500/300 → gray.200/400/600 | Tooltips, toasts, inverted sections. |
| `content.background.alpha-subtle/-subdued/-strong/-heavy/-alt/-inverse-subtle` | alpha steps | Adaptive overlays over any surface. |
| `content.background.pure` | white → black | True white/black surface (rare). |

## Visual hierarchy — choosing a background

Three foundational surface tokens build app layout hierarchy: `base`, `default`, and `elevated` (each with an `-alt` for a different dark-mode tone). Pick by the screen's job, not by looks.

- **`default`** — content-first screens (forms, reading, flows), rich text, and primary containers. **Modals and bottom sheets always use `default`** — they're content-heavy and need clarity across modes.
- **`base`** — utility / navigation-dominant screens (settings, search, overview/filter panels), and as the canvas to **visually group** `default` containers placed on top.
- **`elevated`** — components that must lift off the surface (cards, tiles, inputs). In **dark mode** use a border (shadows barely read) — shadow *or* border, never both.

**Nesting & combinations**
- Nest `default` containers inside a `base` screen (e.g. settings: `base` page + `default` grouped containers). Inside a container, separate items with dividers — don't wrap every item in its own container.
- **Avoid full-page `elevated`** — it's reserved for components only.
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

See `../patterns/layout.md` for spacing/insets on these surfaces and `../patterns/settings-utility.md` for settings-screen structure.

## Content — Border, Shadow, Scrim

| Token | Light → Dark | Usage |
| :--- | :--- | :--- |
| `content.border.default` | gray.100 → gray.600 | Standard dividers. |
| `content.border.subtle` | gray.75 → gray.700 | Rest-state input outlines. |
| `content.border.strong` | gray.400 → gray.400 | Selected / focused borders. |
| `content.border.inverse` | white → gray.700 | Borders on dark backgrounds. |
| `content.border.alpha-default/-subtle/-subdued/-strong` | alpha steps | Adaptive dividers on any surface. |
| `content.shadow.default` | black | Shadow color (compose with elevation/opacity). |
| `content.scrim.default` | alpha.black.500 → alpha.white.800 | Modal/sheet backdrop scrim. |

## Applied color (component)

Prefer these over re-composing base tokens for forms, interaction, skeleton, modality. Full table in `applied.md`.

- `form.color.label/helptext/background/border/value-default/value-checked/placeholder/checked/icon/error`
- `interaction.color.hover/-hover-alt/-hover-subdued/-hover-strong/-hover-inverse/active/active-pressed/active-inverse`
- `skeleton.color.default`
- `modality.color.*` (travel-planner / transport surfaces only — see applied.md)

## Rules / Don'ts

- **Never core/raw** (`color.brand.yellow`, `color.gray.*`, `NesColor.*`, `--nes-core-*`) in a design — only base/applied.
- **Never hex.** Every fill, text, and border must trace to a semantic token.
- **Dark mode is automatic.** Don't hand-pick light-mode steps or set dark overrides — the token remaps itself.
- **Pick by meaning, not by swatch** — matching colors is not a reason to reuse a token.
- **`on-default` for foreground on a filled surface** — don't reuse `content.text.default` on a colored button.
- **Modality colors are scoped** to transport/travel-planner surfaces; never use them as generic accents.
- **Disabled** = opacity token (`interaction.opacity.disabled-component` 50%), not a greyed color.
