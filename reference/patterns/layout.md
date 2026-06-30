# NS NESSIE — App Layout System

> How to space, inset, stack and scale content on an NS app screen. iOS-first; spacing is the primary tool for expressing structure and guiding focus. Source of truth: Nessie design system (design.ns.nl) + Token Studio JSON. Never invent token names. Token names below come from the Token Studio `screen.*.json` source; values are resolved to px (dp on Android).

## Core principle: design for the task, not the screen

Choose layout density by what the user is doing in a section, not by screen size:

- **Scan mode** — quickly find/compare info (journey details, disruptions). → Denser layouts, tighter grouping, minimal scrolling. Prioritise scan-ability.
- **Decision mode** — making choices or entering data (booking, forms, settings). → More space, clearer separation, calmer rhythm. Prioritise clarity and calm.

A screen may contain both; apply the dominant strategy **per section**. Three rules underneath:
1. **Design for the task, not the screen** — density follows scan vs decision.
2. **Spacing communicates relationships** — closer = more strongly related. Use spacing instead of borders/dividers where possible.
3. **Be consistent unless meaning changes** — only break rhythm when task or hierarchy genuinely differs.

> Choose tokens based on the **strength of the relationship** between elements, not visual preference.

## The three app spacing concepts

The app layout system is built on three dynamic spacing families. All scale automatically with the active density mode (see Breakpoints) — designers do not hand-tune density per component.

| Concept | What it controls | Token group |
| :--- | :--- | :--- |
| **Inset** | Space *inside* a container or boundary (padding) | `space.app.inset.*` |
| **Stack** | Vertical distance between stacked elements | `space.app.stack.*` |
| **Inline** | Horizontal distance between elements | `space.app.inline.*` |

> **iOS:** Use these as the app spacing language. In Figma, apply inset as padding, stack as vertical auto-layout gap, inline as horizontal auto-layout gap.
> **Android:** Same tokens map to `NesTokens.layout.spaceAppInset*`, `spaceAppStack*`, `spaceAppInline*` (Compose). `space.app.inset.default` → `Modifier.padding(NesTokens.layout.spaceAppInsetDefault)`.

### Token naming across surfaces (the JSON is the source of truth)

The same token has three name shapes. **The Token Studio JSON / Figma variables are authoritative**

| Surface | Format | Example |
| :--- | :--- | :--- |
| **Figma variable** (what you see when auditing a Figma file) | slash-separated, `--` prefix | `--space/app/inline/comfy` |
| Token Studio JSON | dot-separated | `space.app.inline.comfy` |
| Android (Compose) | camelCase, drop dashes | `spaceAppInlineComfy` |

> **Auditing tip:** Figma binds variables in the `--space/app/...` form. Convert by replacing `/` with `.` (drop the leading `--`) to match the JSON token names in this doc.

### App Inset — padding inside a container/boundary

Value column is the **default** density mode (standard phone); **2xs** is the compact small-window value. Values in px/dp.

| Token | default | 2xs | When to use |
| :--- | :--- | :--- | :--- |
| `space.app.inset.tight` | 8 | 8 | Compact internal padding where space is limited and content is strongly related. |
| `space.app.inset.dense` | 12 | 12 | Use for contained content that needs structure but remains scan-focused. |
| `space.app.inset.default` | 16 | 12 | Default inset for most containers and screen padding (left/right). |
| `space.app.inset.comfy` | 24 | 20 | Use when a container should feel open and clearly separated from surrounding content. |
| `space.app.inset.relaxed` | 32 | 24 | Use sparingly for strong separation or emphasis, e.g. large containers or high-level grouping. |

> Screen left/right padding = `space.app.inset.default` (16). This is the standard horizontal screen margin.

### App Stack — vertical gap between stacked elements

| Token | default | 2xs | When to use |
| :--- | :--- | :--- | :--- |
| `space.app.stack.tiny` | 8 | 8 | Tightly related elements that should read as a single unit. |
| `space.app.stack.tight` | 12 | 8 | Between repeated or highly related components that belong to the same group. |
| `space.app.stack.dense` | 16 | 12 | When vertical space should be minimized while preserving clear grouping. |
| `space.app.stack.default` | 24 | 20 | Default spacing between containers and sections in most layouts. |
| `space.app.stack.comfy` | 32 | 24 | Decision-focused contexts, such as forms or grouped input fields. |

### App Inline — horizontal gap between elements

| Token | default | 2xs | When to use |
| :--- | :--- | :--- | :--- |
| `space.app.inline.dense` | 8 | 8 | Between text items or elements that should be read together. |
| `space.app.inline.default` | 12 | 8 | Default spacing between small related elements (e.g. icon + label). |
| `space.app.inline.comfy` | 16 | 12 | When horizontal separation is needed to avoid visual crowding. |

## Applied layout tokens (composed patterns)

Use applied tokens for common layout structures instead of composing spacing by hand. They reference the base tokens above. (These names are documented in Notion and may expand over time.)

| Applied token | References | Use |
| :--- | :--- | :--- |
| `applied.space.app.section.inset` | `inset.default` (16) | Section left/right padding. |
| `applied.space.app.container.inset` | `inset.comfy` (24) | Container top/bottom padding. |
| `applied.space.app.container.stack.default` | `stack.default` (24) | Default gap between containers/sections. |
| `applied.space.app.container.stack.control` | `stack.comfy` (32) | Gap around list types and input fields. |
| `applied.space.app.group.stack.default` | `stack.dense` (16) | Default gap within a group. |
| `applied.space.app.group.stack.relaxed` | `stack.default` (24) | Relaxed gap within a group. |

> `applied.app.pane.inset` and `applied.app.split.gutter` are reserved (future) for MD/expanded multi-pane layouts — not yet defined.

## Layout regions

### Screen frame setup

Always bind the root screen frame to ScreenSize variables **before placing any content**:

- **Width** (`screenSize/width`) — required. Keeps all screens consistent with the agreed design format and enables dynamic layout scaling.
- **Height** (`screenSize/height`) — required. Height is secondary when content overflows the frame, but binding it ensures format consistency across the team.

Apply this to every new screen frame regardless of screen type.

### Navigation region

Holds primary navigation: the Header (top bar) and the Bottom Navigation. See `navigation-patterns.md` for component choices and placement. For focused flow screens (close/confirm button placement, modal vs push navigation), see `interaction-models.md`.

### Body region

Scrollable content, structured as four nested levels of grouping. The strongest relationship uses the tightest spacing.

| Level | Name | Role | Spacing rule |
| :--- | :--- | :--- | :--- |
| 1 | **Section** | Content collection for the page; wraps all Containers. LR padding always: `applied.space.app.section.inset` (16). TB padding varies by screen type — see "Screen type patterns" below. | Section `gap` = 0; spacing between Containers is created by compounding Container TB insets. |
| 2 | **Container** | Thematic grouping of related components (e.g. all booking options, all traveller inputs). On flow screens, multiple Containers stack directly in the Section. On navigation screens, a single Container wraps all Groups. | TB: `applied.space.app.container.inset` (24). Internal gap between Groups: `applied.space.app.container.stack.default` (24) or `applied.space.app.container.stack.control` (32) for list types and input fields. |
| 3 | **Group** | Related components sharing a conceptual purpose. Can contain one or more SubGroups. `🚄 Headings` — when used — is the first child of the first SubGroup and carries its own bottom spacing. | Gap between SubGroups: `applied.space.app.group.stack.default` (16) or `applied.space.app.group.stack.relaxed` (24). Headings are not always required — see `reference/patterns/settings-utility.md`. |
| 4 | **SubGroup** | A zero-gap stack of tightly related components that share the same Group heading but need a subtle visual break from sibling SubGroups (e.g. info fields / card actions / destructive action, all under "About this card"). | `gap` is **always 0** on the SubGroup layer itself. The gap between SubGroups is controlled by the parent Group's `itemSpacing` token — never applied on the SubGroup layer. |

## Stacking behaviour (spacing compounds)

When sections/containers stack, top + bottom insets **add up**. This is intentional — larger outer spacing signals weaker relationships, tighter internal spacing signals stronger ones.

These insets apply to **containers**. When containers stack within a section, adjacent top + bottom insets compound to the totals below.

| Inset (top + bottom) | Total between sections | Internal stacking |
| :--- | :--- | :--- |
| 16 + 16 | 32 | 16 default, up to 24 max |
| 24 + 24 | 48 | 24 default, up to 32 max |
| 32 + 32 | 64 | 32 (min and max) |

### Picking the inset by screen type

Default container inset depends on the kind of screen (all values are `space.app.inset.*` tokens):

| Screen type | Container inset | Token | Effect when stacked |
| :--- | :--- | :--- | :--- |
| **Flow screens** (booking, onboarding, decision-mode) | 24 | `space.app.inset.comfy` | 24 + 24 = 48 between containers; calmer rhythm. |
| **High-density screens** (scan-mode, data-heavy) | 16 | `space.app.inset.default` | 16 + 16 = 32 between containers; tighter grouping. |

> **Forms** typically use **32 stacking** *within* the container between grouped input fields — `applied.space.app.container.stack.control` (→ `space.app.stack.comfy`, 32). This is separate from the container inset choice above.

### Screen type patterns

Two patterns are documented from real screens. Add further types here as screens are analysed.

| Screen type | Section TB padding | Containers in Section | Container internal gap | Bottom chrome |
| :--- | :--- | :--- | :--- | :--- |
| **Navigation / Home** (tab hub, cards + navigation lists) | `space/app/inset/relaxed` (32) | Single Container wrapping all Groups | `applied.space.app.container.stack.control` (32) | `🚄 Bottom Navigation` |
| **Flow** (booking, configuration, decision screens) | — | Multiple thematic Containers; Section `gap:0` | `applied.space.app.container.stack.default` (24) | Sticky footer — see `interaction-models.md` for focused flow top bar guidance |

> **Flow compounding:** Section `gap` is 0 between Containers. Spacing is created by compounding Container TB insets — 24 + 24 = 48px between adjacent Containers, signalling each Container is a separate topic.

_Add further screen types as they are analysed from real screens._

## Layout rules & constraints

- **Scaling increments** — all spacing scales in steps of 4px.
- **Minimum spacing** — dynamic spacing never scales below **8px**. An 8px value in Default stays 8px in 2xs. Ensures touch safety and legibility on small screens.

## Breakpoints / density modes (screen scaling)

The app does **not** target device types. It maps platform window-size classes into a small set of **layout density modes**. Design in **Default**; use **2xs** and **MD** to validate. Density is derived from window size, not designer choice — if **either** width or height drops below a threshold, the layout switches to a more compact mode (smallest dimension wins).

| Conceptual layer | NS density mode | Token file | Android (approx.) | iOS (approx.) |
| :--- | :--- | :--- | :--- | :--- |
| Small window | **2XS** | `screen.2xs.json` | ~360sw (≤ 360sw compact) | ≤ 375w |
| Standard phone window | **Default** | `screen.default.json` | > 360sw & ≤ 512sw | > 375w |
| Large / expanded window | **MD** (future) | `screen.md.json` | ≥ 512sw | large window / tablet |

> Exact numeric thresholds are an **implementation detail** and differ per platform; the design system abstracts them into one shared model. iOS thresholds above are approximate and noted as such in the source.

The token set also ships `sm`, `lg`, `xl` breakpoint files (`screen.sm/lg/xl.json`); at and above `sm`, app inset/stack/inline values match the Default mode (only `2xs` compresses), while control heights grow at `lg`/`xl`. Dynamic tokens swap value automatically per active mode — you reference the same token name everywhere.

### Component scaling

Control components (buttons, inputs, list items) scale their **minimum height** with the density mode; width/position stay controlled by surrounding spacing. System-driven, no manual adjustment.

| Token | default | 2xs | Used for |
| :--- | :--- | :--- | :--- |
| `size.component.control.height.tiny` | 32 | 32 | Tiny buttons / inputs |
| `size.component.control.height.compact` | 40 | 40 | Compact button |
| `size.component.control.height.default` | 48 | 40 | Normal button |
| `size.component.control.height.comfy` | 56 | 48 | — |
| `size.component.control.height.relaxed` | 64 | 56 | List items |

## Static vs dynamic — when to use which

- **Dynamic** (`NesTokens.layout.spaceApp*`, the `space.app.*` tokens above) — preferred for app layout: screen/container insets, gaps between components, control/icon sizes. They follow the active density mode.
- **Static** (`NesDimension.Dn`, where every 25 units = 1dp, so `D400` = 16dp) — only when a value must stay fixed regardless of density: low-level drawing values, fixed dimensions. Don't use a static value where an app spacing token exists.
- When migrating an old value, pick the new token by **intent**, not by matching the old number — the same old `spacing_8` can become `space.app.inset.relaxed`, an icon size, or a control height depending on use.

## Generic & box spacing (when no app context applies)

| Token | px | | Token | px |
| :--- | :--- | :--- | :--- | :--- |
| `space.2xs` | 4 | | `space.xl` | 24 |
| `space.xs` | 8 | | `space.2xl` | 32 |
| `space.sm` | 12 | | `space.3xl` | 48 |
| `space.md` | 16 | | `space.4xl` | 64 |
| `space.lg` | 20 | | | |

Box spacing for spacing inside boxed UI elements (form inputs, highlight boxes, messages): `space.box.xs` (8), `space.box.sm` (12), `space.box.md` (16).

## Surfaces for layout (base vs default vs elevated)

NESSIE surface roles for layout (see `design-language.md` / tokens for exact token names — never invent):

- **Base surface** — the lightest background layer (light grey). Content sits directly on it. Cards on a base surface often need **no outline** (App Guidelines: skip the outline when on background base).
- **Default surface** — standard content surface; the normal container fill, typically outlined to separate from surroundings.
- **Elevated surface** — raised via shadow/elevation. Use elevation for cards that **lead to a modal** (where you edit the card's content) or summary cards that **lead to a deeper page**.

> Card rules (App Guidelines): a card leading to another screen is always filled + outlined. Use shadow only when it leads to a modal that edits the card, or is a summary leading deeper. Skip the outline when it conflicts with the background (try an alpha outline first), when sibling surfaces also have none, or when on the base (light grey) surface. A fully non-interactive grouping of related info is outlined, not elevated.

## Safe areas

> **iOS:** Respect the safe-area insets (notch / Dynamic Island at top, home-indicator at bottom). Apply `space.app.inset.default` (16) as horizontal screen padding *inside* the safe area; never place interactive content under the status bar or home indicator.
> **Android:** Respect system insets (status bar, navigation bar, gesture insets / cutouts). Edge-to-edge content draws behind system bars but interactive elements stay within the insets. _Confirm exact NS safe-area handling with the Nessie team before finalising._

## iOS 26+ notes

_Placeholder — fill in over time._ Differences for newer iOS layout conventions (e.g. updated safe-area / edge treatments, any concentric-radius or container-padding changes) go here. Not yet documented in the Nessie source.
