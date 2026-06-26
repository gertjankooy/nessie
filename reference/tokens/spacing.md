# NESSIE Spacing & Dimension Tokens

Spacing, control-height, and icon-size reference for NS app layouts. Pick **semantic space tokens** — never raw dimension steps, never invented values. Values are px (web) / points (iOS) / dp (Android).

> **Figma variable names** appear in slash form (`--space/app/stack/default`). To match a token in this doc, drop the leading `--` and replace `/` with `.` → `space.app.stack.default`. The Token Studio JSON / Figma names are authoritative; older Notion labels are out of date. See `../patterns/layout.md` for the app `inset`/`stack`/`inline` tokens and the full naming crosswalk.

## 3-tier model

| Tier | Example | Who uses it |
| :--- | :--- | :--- |
| Core / raw | `dimension.400` = 16, `dimension.600` = 24 | System only. **Never in designs.** |
| Base / semantic | `space.md`, `space.app.stack.default`, `size.component.icon.md` | **Designers pick these.** |
| Applied | `space.app.section.inset`, `space.app.container.stack.default` | Pre-composed layout spacing. |

> **iOS:** `NesLayout.spacingN` where N = value/4 → `spacing1`=4, `spacing4`=16, `spacing6`=24, etc. Scale is **non-contiguous** (no spacing7/9/11). **Android:** `NesTokens` dp. **Web/CSS:** `--nes-base-space-*` / Tailwind `nes:gap-md nes:pt-xl`.

## Base spacing scale

| Token | Value | iOS `NesLayout` |
| :--- | :--- | :--- |
| `space.none` | 0 | — |
| `space.2xs` | 4 | `spacing1` |
| `space.xs` | 8 | `spacing2` |
| `space.sm` | 12 | `spacing3` |
| `space.md` | 16 | `spacing4` |
| `space.lg` | 20 | `spacing5` |
| `space.xl` | 24 | `spacing6` |
| `space.2xl` | 32 | `spacing8` |
| `space.3xl` | 48 | `spacing12` |
| `space.4xl` | 64 | `spacing16` |

iOS also exposes `spacing10`=40, `spacing14`=56, `spacing20`=80, `spacing24`=96, `spacing32`=128 for larger gaps.

## App layout spacing (semantic intent — prefer these for screen structure)

### Inset (horizontal/container padding)
| Token | Value | Usage |
| :--- | :--- | :--- |
| `space.app.inset.tight` | 8 | Compact contained content. |
| `space.app.inset.dense` | 12 | Structured but scan-focused content. |
| `space.app.inset.default` | 16 | **Default** screen padding & most containers (left/right). |
| `space.app.inset.comfy` | 24 | Open, clearly separated container. |
| `space.app.inset.relaxed` | 32 | Strong separation / large grouping (sparingly). |

### Stack (vertical gaps between blocks)
| Token | Value | Usage |
| :--- | :--- | :--- |
| `space.app.stack.tiny` | 8 | Tightly related elements reading as one unit. |
| `space.app.stack.tight` | 12 | Repeated/related components in a group. |
| `space.app.stack.dense` | 16 | Minimised vertical space, clear grouping. |
| `space.app.stack.default` | 24 | **Default** between containers/sections. |
| `space.app.stack.comfy` | 32 | Forms / grouped input fields. |

### Inline (horizontal gaps between small elements)
| Token | Value | Usage |
| :--- | :--- | :--- |
| `space.app.inline.dense` | 8 | Text items read together. |
| `space.app.inline.default` | 12 | Small related elements (icon + label). |
| `space.app.inline.comfy` | 16 | Avoid horizontal crowding. |

### Box (dynamic component padding)
`space.box.xs` = 8, `space.box.sm` = 12, `space.box.md` = 16.

> **Android/Web only — web layout tokens:** `space.web.gutter.*` (dense 12 / default 24 / comfy·relaxed 32), `space.web.section.inset.*` (tight 32 / default·loose 40), `space.web.container.inset.*` (24), `space.web.wrapper.stack.default` (24). Not for iOS app screens.

## Control heights

| Token | Value | Usage |
| :--- | :--- | :--- |
| `size.component.control.height.tiny` | 32 | Chips / dense controls. |
| `size.component.control.height.compact` | 40 | Compact buttons/fields. |
| `size.component.control.height.default` | 48 | **Default** — meets WCAG 2.5.5 touch target. |
| `size.component.control.height.comfy` | 56 | Prominent controls. |
| `size.component.control.height.relaxed` | 64 | Hero / primary actions. |

## Icon sizes

| Token | Value | Usage |
| :--- | :--- | :--- |
| `size.component.icon.xs` | 16 | Inline with small text. |
| `size.component.icon.sm` | 24 | Default inline icon. |
| `size.component.icon.md` | 32 | List/row leading icon. |
| `size.component.icon.lg` | 48 | Feature / emphasis. |
| `size.component.icon.xl` | 56 | Hero. |

## Rules / Don'ts

- **Never raw `dimension.*`** in a design — pick a semantic space token.
- **Never invent off-grid values** (28, 36, 10pt). If a target falls between steps, round to the nearest token and flag it.
- **Never divide a token** (no "half of `space.md`").
- **Default touch targets ≥ 48** — use `control.height.default`; don't shrink below for primary actions.
- **iOS scale is sparse/non-contiguous** — there is no `spacing7`; map to nearest existing step.
- **Use app.* intent tokens for screen structure** (inset/stack/inline) over picking bare `space.md` ad hoc, when an intent token fits.
