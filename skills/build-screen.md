# Skill: Build a screen (NESSIE, iOS-first)

Use when the user wants to design or generate a new screen, view, component composition, or flow in Figma / Figma Make using the NESSIE design system.

## Before you design
1. Confirm **platform & context**: default to **iOS app**. Ask only if ambiguous (web vs app, or a specific Android-only screen). Android is derived from the iOS design afterwards.
2. Identify the **screen type** (settings, content/detail, form, list, travel-planner) — this drives surface choice (see `reference/patterns/layout.md`).
3. Identify the **domain**: if it's travel-planner (journeys, routes, travel cards), load `reference/components/domain.md`.

## How to build
1. **Pick components first, not layouts.** Open `reference/components/index.md` and choose existing '🚄 NES App Components' for every element, which should be attached via the Libary menu, if a user doesn't have this library attached, make sure you notify the user before continuing. Never hand-roll something a `Nes*` component already covers.
2. **Open the specific component file** (`navigation.md`, `buttons.md`, `forms.md`, `feedback.md`, `content.md`, `domain.md`) for variants, slots, and the correct tokens.
3. **Lay it out** per `reference/patterns/layout.md` — use app inset/stack/gap tokens for all spacing, the right surface (base / default / elevated), and respect safe areas.
4. **Apply tokens only** — colors, type, spacing, radius, motion all come from `reference/tokens/*`. Never a raw hex, never an off-scale number.
5. **Match the brand feel** — check `reference/design-language.md` for tone, iconography, and brand-color usage.
6. **Bake in accessibility** — follow `reference/patterns/accessibility.md`: meaningful labels, contrast pairings, 44pt (iOS) / 48dp (Android) targets, heading structure.

## Output
- When generating in Figma, follow the `/figma-use` skill (mandatory before `use_figma`).
- State which components and key tokens you used so the user can verify, and flag any place you had to deviate from the system (and why).
