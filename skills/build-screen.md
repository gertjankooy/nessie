# Skill: Build a screen (NESSIE, iOS-first)

Use when the user wants to design or generate a new screen, view, component composition, or flow in Figma / Figma Make using the NESSIE design system.

## Before you design
1. Confirm **platform & context**: default to **iOS app**. Ask only if ambiguous (web vs app, or a specific Android-only screen). Android is derived from the iOS design afterwards.
2. Identify the **screen type** — this drives surface choice, spacing pattern, and the interaction model:
   - **Navigation / Home** — tab hub, cards + navigation lists. Single Container per Section. See `reference/patterns/layout.md → Screen type patterns`.
   - **Flow** — booking, configuration, decision screens. Multiple thematic Containers in the Section. See `reference/patterns/layout.md → Screen type patterns` and `reference/patterns/interaction-models.md` for top bar / close-confirm placement.
   - **Settings / Utility** — see `reference/patterns/settings-utility.md`.
   - **Content / Detail, Form, List, Travel-planner** — check `reference/patterns/layout.md` for surface and spacing guidance and `reference/patterns/interaction-models.md` for the interaction model.
3. Identify the **domain**: if it's travel-planner (journeys, routes, travel cards), the relevant components are in the Domain section of `reference/components/index.md` (e.g. `route.md`, `journey-pill.md`, `travel-cards.md`).

## How to build
1. **Pick components first, not layouts.** Open `reference/components/index.md` and choose existing `🚄 NES App Components` for every element. If the user does not have this library attached, notify them before continuing. Never hand-roll something a NESSIE component already covers.
2. **Open the specific per-component file** linked from `index.md` (one file per component — e.g. `button.md`, `input.md`, `tiles.md`, `route.md`) for usage, configurations, anatomy, behavior, and accessibility.
3. **Set up the screen frame first** — bind the root frame to `screenSize/width` and `screenSize/height` variables before placing any content. See `reference/patterns/layout.md → Screen frame setup`.
4. **Lay it out** per `reference/patterns/layout.md` — use app inset/stack/gap tokens for all spacing, the right surface (base / default / elevated), and respect safe areas.
5. **Apply tokens only** — colors, type, spacing, radius, motion all come from `reference/tokens/*`. Never a raw hex, never an off-scale number.
6. **Match the brand feel** — check `reference/design-language.md` for tone, iconography, and brand-color usage.
7. **Bake in accessibility** — follow `reference/patterns/accessibility.md`: meaningful labels, contrast pairings, 44pt (iOS) / 48dp (Android) targets, heading structure.

## Output
- When generating in Figma, follow the `/figma-use` skill (mandatory before `use_figma`).
- State which components and key tokens you used so the user can verify, and flag any place you had to deviate from the system (and why).
