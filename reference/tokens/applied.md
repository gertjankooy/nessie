# NESSIE Applied Tokens

Component-level (tier 3) tokens: pre-composed values for form states, interaction states, skeleton, modality, and layout. **Use an applied token when one exists** instead of re-composing base tokens — it encodes a fixed design decision and themes automatically. Each resolves to a base token (shown), which in turn remaps per light/dark.

> **iOS:** `NesPalette.formColorLabel`, `NesPalette.interactionColorHover`, etc. **Android:** `NesTokens` applied refs. **Web/CSS:** `--nes-applied-form-color-label`, `--nes-applied-interaction-color-hover`, …
> **Figma variable names** appear in slash form (`--form/color/border`). To match a token in this doc, drop the leading `--` and replace `/` with `.` → `form.color.border`. The Token Studio JSON / Figma names are authoritative; older Notion labels are out of date. See `../patterns/layout.md` for the full naming crosswalk.

## Form (TextField, Checkbox, Radio, Toggle, Select)

| Token | Resolves to | Usage |
| :--- | :--- | :--- |
| `form.color.label` | `content.text.default` | Field label. |
| `form.color.helptext` | `content.text.alpha-subtle` | Helper / hint text. |
| `form.color.background` | `content.background.default` | Field fill. |
| `form.color.border` | `content.border.alpha-strong` | Field outline. |
| `form.color.value-default` | `content.text.strong` | Entered value text. |
| `form.color.value-checked` | `content.text.default` | Selected option text. |
| `form.color.placeholder` | `content.text.alpha-subtle` | Placeholder text. |
| `form.color.checked` | `system.success.accent` | Checked/selected indicator (check, radio dot, toggle on). |
| `form.color.icon` | `content.text.default` | Field icon. |
| `form.color.error` | `system.critical.default` | Error text / border. |
| `form.max-width.default` | `max-width.lg` (512) | Form column max width. |

## Interaction (hover / active / pressed / disabled)

| Token | Resolves to | Usage |
| :--- | :--- | :--- |
| `interaction.color.hover` | `content.background.alpha-subtle` | Hover overlay on a surface. |
| `interaction.color.hover-alt` | `content.background.alpha-alt` | Alt hover. |
| `interaction.color.hover-subdued` | `content.background.alpha-subdued` | Quieter hover. |
| `interaction.color.hover-strong` | `content.background.alpha-strong` | Stronger hover. |
| `interaction.color.hover-inverse` | `content.background.alpha-inverse-subtle` | Hover on inverse surface. |
| `interaction.color.active` | `brand.tertiary.default` | Active / selected accent. |
| `interaction.color.active-pressed` | `brand.tertiary.subdued` | Pressed state. |
| `interaction.color.active-inverse` | `brand.tertiary.on-default` | Active on inverse surface. |
| `interaction.opacity.disabled.component` | `opacity.50` (0.50) | Disabled component opacity. |
| `interaction.opacity.disabled.text` | `opacity.25` (0.25) | Disabled text opacity. |
| `interaction.outline.width` | `border.width.active` (2) | Focus-ring width. |
| `interaction.outline.offset.default` / `.sm` | 3 / 1 | Focus-ring offset. |

> Hover is a pointer concept — on **iOS** it is largely N/A; use `active` / `active-pressed` for touch press states. Hover tokens matter for web/iPad-pointer.

## Skeleton

| Token | Resolves to | Usage |
| :--- | :--- | :--- |
| `skeleton.color.default` | `content.background.alpha-subdued` | Loading-placeholder fill. |

## Modality — transport / travel-planner surfaces ONLY

Color-codes transport modes. **Never use as generic accents.** `modality.color.text` = white (foreground on filled modality chips).

| Token | Value / resolves to | Mode |
| :--- | :--- | :--- |
| `modality.color.ns.background` | `brand.primary.default` (yellow) | NS train. |
| `modality.color.ns.text` | `brand.primary.on-default` (blue) | NS train text. |
| `modality.color.ov` | `brand.secondary.alt` | OV / public transport. |
| `modality.color.own-transport` | `teal.600` | Walking / own transport. |
| `modality.color.shared-bike` | #1E7BBC | Shared bike. |
| `modality.color.shared-car` | #11872F | Shared car. |
| `modality.color.parking` | #28549C | Parking. |
| `modality.color.check` | #8A46F0 | Check-in/out. |
| `modality.color.dott` | `green.600` | Dott (shared mobility). |
| `modality.color.btm-pink` / `btm-teal` | `pink.600` / `teal.600` | Bus/tram/metro lines. |
| `modality.color.cancelled.background` | `content.background.inverse-subdued` | Cancelled service fill. |
| `modality.color.cancelled.text` | `content.text.subdued` | Cancelled service text. |

## Route / hero (journey surfaces)

| Token | Resolves to | Usage |
| :--- | :--- | :--- |
| `route.color.border` | `system.info.default` | Route line color. |
| `route.size.indicator` | 12 | Route stop indicator size. |
| `route.border.radius.indicator` | `border.radius.entire` | Round indicator. |
| `route.border.width` | 2 | Route line width. |
| `hero.color.text-shadow-inverse` | `alpha.white.400` | Text shadow over hero imagery. |

## Applied layout spacing

| Token | Resolves to | Usage |
| :--- | :--- | :--- |
| `space.app.section.inset` | `space.app.inset.default` (16) | Horizontal inset for app sections. |
| `space.app.container.inset` | `space.app.inset.relaxed` (32) | Vertical inset for app containers. |
| `space.app.container.stack.default` | `space.app.stack.default` (24) | Between containers. |
| `space.app.container.stack.control` | `space.app.stack.comfy` (32) | Between controls in a container. |
| `space.app.group.stack.default` | `space.app.stack.dense` (16) | Between grouped elements. |
| `space.app.group.stack.comfy` | `space.app.stack.comfy` (32) | Relaxed grouped spacing. |
| `control.border.radius` | `border.radius.default` (6) | Control corner radius. |

> **Web-only applied:** `container.max-width.default` (1728) / `.narrow` (1328). Not for iOS app screens.

## Opacity tokens (compose on-grid alpha)

`opacity.0`–`opacity.100` in steps of 5 (21 steps). Use these to compose custom alpha **on-grid** instead of hand-writing 0.5. Mode-conditional visibility: `opacity.hide-in-light` (0 light / 1 dark), `opacity.hide-in-dark` (1 light / 0 dark).

> **iOS:** `NesColor.Opacity*`. **Android:** `NesTokens` opacity steps.

## Rules / Don'ts

- **Prefer an applied token over re-composing base tokens** for forms, interaction, skeleton, modality, route.
- **Modality colors are scoped** to transport/travel-planner surfaces — never generic accents.
- **Disabled = `interaction.opacity.disabled.*`** (50% component / 25% text) — never a custom opacity or greyed color.
- **Custom alpha must use `opacity.*` steps** (multiples of 5) — never hand-write `0.5`.
- **iOS press states** use `active` / `active-pressed`; hover tokens are pointer-only.
- Applied tokens still **never expose hex or core** to the designer — they resolve to base, which resolves to core automatically.
