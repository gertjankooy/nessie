# NS NESSIE — Design Language

> What makes a screen feel like NESSIE: brand personality, visual direction, color, iconography, logo/assets, platform philosophy, and core UX principles. iOS-first. Source of truth: NS Nessie design system (design.ns.nl). Never invent guidance.

## Brand personality & voice

NS is the Dutch national railway. Digital products should feel like a warm, human conversation with a colleague — never bureaucratic or cold.

**Experience principles** (apply to every screen):
- **Warm & welcoming** — feel personal and human, like talking to an NS colleague in person; make users feel valued and understood.
- **Strikingly simple** — eliminate complexity; interaction must be straightforward and intuitive so anyone can use it with ease.
- **Meaningful in every moment** — give the right information at exactly the right moment (a purchase, a disruption); every interaction should feel relevant and timely.

**Brand voice** for UX copy: Human, Open, Connecting, Driven, Resourceful. Write to these; follow the NS content guidelines. Voice attributes are sometimes also phrased as "Human, Open, Connecting, Driven and Resourceful" — treat tone, not vocabulary, as the test.

> **Rationale:** Nessie components carry the visual brand; the *feeling* comes from copy tone + showing the right thing at the right moment. A technically correct screen with cold copy is off-brand.

## Visual direction

- Nessie is the 3.0 visual direction, stemming from the "Online van Wereldklasse (OVW)" program.
- The system is **multi-platform** (Web, iOS, Android) and aims for one unambiguous brand experience across them.
- Detailed brand/identity rules (logo construction, the "flow" element, full color usage) live on **NS Merkplaats**, not in Nessie itself — defer there for brand-level questions.

### Style language (what conveys the brand feel)

- **Border radius is meaningful** — each radius level signals a different message:
  - `border.radius.particle` (3px) — micro controls (checkboxes): precision, utility.
  - `border.radius.default` (6px) — core interactive components (buttons, chips, inputs): balanced, approachable.
  - `border.radius.container` (12px) — containers/cards: friendly, soft, content-carrying.
  - `border.radius.interaction` (16px) — animated hover states: tactile, responsive.
  - `border.radius.entire` (full) — pill shapes (stickers, tags): expressive, attention-grabbing. Non-interactive accents only.
- **Border width** — `1px` default (boundaries, separation); `2px` active (focus states, emphasized interactive elements like tabs).
- Soft, rounded, approachable surfaces are core to the Nessie feel — avoid hard sharp corners on cards/containers.

## Color

Use **only** NS Fundamentals colors (shared across platforms via design tokens). Never hardcode hex; reference semantic tokens.

- **NS Yellow** — the primary brand color and the screen's main accent / primary action.
- **NS Navy (dark blue)** — primary text / structural / high-emphasis brand color.
- **Light blue** — secondary / supporting brand color.
- Logo color is restricted to **dark blue, yellow, or white** — no other colors permitted (see Logo rules).

> **Rationale:** Color carries the brand; tokens (not raw hex) keep it consistent across platforms and dark mode. See `patterns/accessibility.md` for contrast rules — never rely on color alone to convey status.

## Iconography

300+ icons. Always work from the official sets; if an icon is missing, contact the Nessie team rather than drawing one.

### NesIconType buckets (size/variant)
- `Size32x32` — standard 32-dp iconography, **the default** for inline use.
- `Size16x16` — small inline icons.
- `Detail` — illustrative detail icons (larger canvas; mainly e-commerce / product).
- `Logo` — brand logos.
- `Cropped` — icons without surrounding padding, for tight layouts.
- `CroppedDetail` — cropped variant of the detail set.

The design-system docs also frame the two families as **Icon (inline, small)** — used in Button, Chip, Link, List Item — and **Icon Detail (large)** — mainly e-commerce products.

### Sizing tokens (inline vs detail)
| Variant | Box | Token |
| --- | --- | --- |
| Icon inline | 16×16 | `size-component-icon-xs` |
| Icon inline | 24×24 | `size-component-icon-sm` |
| Icon inline | 32×32 | `size-component-icon-md` |
| Icon Detail | 48×48 | `size-component-icon-lg` |
| Icon Detail | 56×56 | `size-component-icon-xl` |

Icons vary in optical size, so there is no single perfect bounding box — a 24×24 box or no box (cropped) is the designer's choice per context. Other formats (16, 32, 48, 56) are available.

### Naming
- Names are **kebab-case**, resolved to drawable ids like `ic_nes_32x32_arrow_right` (dashes → underscores).
- Common names: `alarm`, `arrow-right`, `arrow-left`, `calendar`, `cart`, `check`, `chevron-down`, `chevron-right`, `close`, `info`, `person`, `search`, `train`.
- Each name exists in multiple type variants; use `Size32x32` for standard inline iconography.

### Tinting
- Default tint comes from content color. Override by token reference (e.g. `brandPrimaryDefault`), token-name string, or palette name. Prefer tokens, not raw color.

### Rules
- Do **not** use the **Filled** Check, Info, and Alert icons in normal designs — Filled types are reserved for Message components and the app's Bottom Navigation Bar.
- Inline icons may be enlarged for marketing/inserts, but keep all enlargements the same scale.

> **iOS:** The **Share** icon follows the native iOS pattern (differs from Android/Web, which share the Android icon). The **More dots** icon: only the **horizontal** version is used on all platforms.

## Logo & assets

- **NS-Vignet** (the logo, designed 1968 by Gert Dumbar & René van Raalte) symbolizes a train moving back and forth on the track.
- Logo color: **dark blue, yellow, or white only**. No other colors permitted.
- **Flow** — an identity style element standing for freedom of movement; contributes to NS recognizability. Use per the Branding Guidelines.
- A clickable logo (e.g. navigating home) is interactive and **must have an accessible label** (see `patterns/accessibility.md`).
- Full logo clear-space/construction rules live on NS Merkplaats / NS Branding Guidelines.

## Platform-consistency philosophy

Core stance: **keep design as consistent as possible across Web / iOS / Android for one unambiguous brand experience — but not at any cost.** Where a native best practice genuinely improves the customer experience, respect it: *cohesion takes precedence over consistency.*

**Aligned across platforms** (look the same): Fundamentals (color, type, icons via shared tokens), Buttons, Floating Action Button, Input, Radio/Checkbox, Radio Panel (used only as a form control), Tabs, Top Bar, Bottom Navigation.

**Intentionally kept native** (differ per platform): pressed/Ripple states, Prompts (iOS Alerts vs Android Dialog), pull-to-Refresh interaction, Keyboards, Datepickers, the Share icon.

> **iOS:** Touch-target guidance differs (iOS 44, Android 48) — **Nessie standardizes on 48 for all platforms.** Shadows are defined as three options on iOS/Web and translated to Elevation values on Android. iOS uses native Alerts for prompts and a native pull-to-refresh interaction (the spinner itself is visually aligned).

## Core UX principles (working rules)

- Adhere to the three Experience principles (Warm & welcoming, Strikingly simple, Meaningful in every moment).
- Base work on **user insights** (visitor data, market/CS research, station/Happy Labs/NS-panel/Maze testing).
- **Always use Nessie.** To deviate: honor brand guidelines + design principles, and check with the Nessie team.
- Follow NS brand guidelines — use only NS Fundamentals (colors, fonts, icons); apply Merkplaats style rules.
- Write copy in NS brand voice; follow content guidelines.
- Design **accessible to WCAG 2.2 AA** — run the role-specific accessibility checklist; coordinate with dev at handoff. (See `patterns/accessibility.md`.)
- Strive for **consistency** between features and channels; review with another designer; only deviate to honor platform guidelines.
- **Validate** with users where possible (moderated interviews/NS panel/Happy Labs; unmoderated via Maze).
