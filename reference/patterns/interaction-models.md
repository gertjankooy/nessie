---
pattern: Interaction Models
zeroheight_page_id: 8100862
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/529255-interaction-models
last_synced: 2026-06-30
platforms: [ios, android]
related: [navigation-patterns, layout]
gaps: []
---

# Interaction Models

How users perform actions that require a choice, adjustment, or task completion across the NS app on iOS and Android. **Intent drives the choice, not visual size** — a full-height sheet and a focused flow both fill the screen but serve different purposes. Platform conventions are respected (cohesion over consistency); where iOS and Android differ, both are documented.

> iOS uses native SwiftUI APIs directly; Android uses Nessie's `Nes`-prefixed implementations (e.g. `NesAlertDialog`, `NesPopupMenu`). This page is iOS/Android only — not web. It does not cover motion, toast/snackbar feedback, or onboarding.

## Menus & actions

Patterns triggered directly by the user (a button tap or long press) that surface choices or initiate actions without a new surface.

### Overflow menu
`pattern: overflow-menu` · iOS pull-down (`UIMenu`) · Android `NesPopupMenu`
- A list of secondary actions anchored to an explicit `⋯` (iOS) / `⋮` (Android) trigger; the trigger's scope must match the actions' scope (page-level in the top bar, item-level on a card/row).
- **Use when:** 2–5 secondary actions that don't need persistent visibility and relate to the screen or an element.
- **Don't use when:** more than 5 actions, or actions needing toggles/adjustable settings — use a **Sheet**.
- **Rules:** order top-to-bottom by frequency; destructive actions last and in red; a destructive selection is followed by an **Action sheet** (iOS) / **Alert** (Android), never executed immediately.

### Pop-up menu
`pattern: popup-menu` · iOS pop-up button (`UIButton` + `UIMenu`) · Android exposed dropdown (`NesPopupMenu`)
- An explicit button reflecting the current selection; tapping reveals mutually exclusive options and the label updates to the chosen value.
- **Use when:** a control has mutually exclusive options (sort, filter, appearance) and the current selection should stay visible.
- **Rules:** reflect the selection in the label; dismiss on selection (no confirm); only for selecting options, never for actions or anything with side effects.

### Action sheet
`pattern: action-sheet` · **iOS only** (`.confirmationDialog()`); on Android use an **Alert** (≤3 options) or a **Sheet**.
- A confirmation step for a destructive or irreversible action, triggered from a button or as a follow-up to a destructive overflow option.
- **Use when:** an action is destructive/irreversible and the user should understand what's affected before confirming.
- **Rules:** title names what's affected ("Delete widget"); label the destructive button with a specific verb (not "OK"); Cancel is always a separate button.

### Alert
`pattern: alert` · iOS `.alert()` · Android `NesAlertDialog`
- A system-initiated interruption requiring immediate response.
- **Use when:** something critical needs acknowledgment, a permission is required, or an error blocks progress.
- **Rules:** keep to two buttons where possible (a third only when genuinely needed); title is a short statement/question, not "Error"; button labels are specific verbs ("Go to settings", "Try again"); never for marketing or non-critical info. Destructive confirmations use an action sheet (iOS), not an alert.

## Presentation

Patterns that introduce a new surface above the current screen.

### Sheet
`pattern: sheet` · iOS `.sheet()` (medium/large detent) · Android `NesBottomSheetDialogFragment`
- Slides up from the bottom; the user stays conceptually tied to the originating screen. Size follows content complexity, not interaction type.
- **Partial** (`variant: partial`): single selections or short adjustments; dismiss on selection for single choices, explicit **Apply** when configuring multiple settings together; always show a grab handle on iOS (optional on Android).
- **Full height** (`variant: full-height`): small gap at the top; for more vertical space or multiple fields; always dimmed; always a toolbar (Cancel left, Save/Apply right); cancelling with unsaved changes triggers an action sheet (iOS) / alert (Android) to confirm discard.
- **Drag to dismiss:** on by default; disable when the user must complete a step first; tapping the dimmed area dismisses unless there are unsaved changes.

### Focused flow
`pattern: focused-flow` · iOS `.fullScreenCover()` · Android `NesActivityFullScreen`
- A full-screen (no top gap) presentation for a self-contained task with a clear start and end; the user can't return without completing or cancelling.
- **Use when:** the interaction spans multiple steps, has a clear completion milestone (purchase, onboarding), and doesn't need the originating context.
- **Dismissal:** Cancel only at the very start; mid-flow cancel confirms via action sheet/alert; drag-to-dismiss disabled once meaningful input exists; Back moves within the flow; completing returns to the originating screen.

### Persistent panel — map context
`pattern: persistent-panel` `context: map` · iOS non-modal `.sheet()` with detents · Android `NesBottomSheet`
- A panel over an active map (Maps, Disruptions). Three states — collapsed, half height, full height — dragged between; no drag-to-dismiss, closed only explicitly.
- Collapsed/half: map stays visible and interactive, top bar and bottom nav visible. Full height: stops below the top bar, a sliver of map stays visible.
- Opening a detail hides all nav bars and zooms the map; from full height the panel first collapses to partial so map context stays visible. Contextual details open as a partial sheet (map zooms); informational details open as a full dimmed sheet.
> **iOS 26+:** the collapsed/half panel has side padding and rounded corners matching the floating bottom nav, with concentric radius as it expands; full width at full height. Android is full width at all states.

### Persistent panel — active journey
`pattern: persistent-panel` `context: active-journey` · iOS `bottomAccessory` · Android custom card
- A compact surface floating above the bottom nav, visible across screens for an active journey. Tapping opens a full sheet with the complete detail; persists until the journey ends; no drag-to-dismiss.
> **iOS 26+:** on scroll the bottom nav collapses to the active tab icon and the journey panel slides into the centre in a minimal form (still tappable to open the full sheet).

### Layering & stacking
`pattern: stacking`
- A partial sheet can stack over a full-height sheet (e.g. travel options → transport preferences); a sheet can stack over a focused flow (e.g. terms/info during purchase). On dismiss, the surface beneath is restored exactly as it was — no state lost, no navigation.
- **Bottom nav:** hidden behind any sheet or focused flow; visible at all heights of a map-context panel (hidden when a detail opens); visible behind an active-journey panel.

## Choosing the right pattern
| If the situation is… | Use |
| :--- | :--- |
| Secondary actions on a screen or element | Overflow menu |
| Pick one option from several | Pop-up menu |
| More than 5 actions, or actions needing context | Sheet |
| A destructive action needs confirmation | Action sheet (iOS) / Alert (Android) |
| The system must interrupt with something critical | Alert |
| A simple selection or short adjustment | Sheet (partial) |
| A multi-field configuration needing space | Sheet (full height) |
| A self-contained task with a clear start and end | Focused flow |
| Map content the user can drill into | Persistent panel, map context |
| An active journey needing awareness across screens | Persistent panel, active journey |

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/529255-interaction-models (page `8100862`, synced 2026-06-30)
