---
component: Toggle
category: forms
status: stable
aliases: [Switch]
zeroheight_page_id: 1861390
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/663c99-toggle
figma_node: "1533:41841"
last_synced: 2026-06-30
related: [checkboxes, radio-buttons]
gaps: [Anatomy, Accessibility]
---

# Toggle

## Usage
### Use when
- Turning a feature, mode, or functionality on and off.
- Switching triggers an immediate change in the UI.
- Switching triggers a change in background behavior without affecting the UI.
### Don't use when
- Requesting a choice from a group of options — use a group of [Radio buttons](https://design.ns.nl/4a05a30ad/p/44b43f-radio-buttons).
- The user must perform additional steps for the change to take effect — use a [Checkbox](https://design.ns.nl/4a05a30ad/p/401822-checkboxes).

A toggle takes up less space than two radio buttons limited to "On"/"Off", and communicates intent better than a single checkbox that switches functionality.

## Anatomy
_Not available in ZeroHeight — to review._

## Configurations
### Loading
A toggle can show a loading state while its change is being applied.

⚠️ **Missing the disabled state?** Disabled states are intentionally omitted across form components. Let users interact and give feedback instead of greying the control out.

## Placement
- Place a detailed description of the setting directly below the toggle.

## Behavior
- The state is saved immediately on click, like a light switch — there's no separate submit step.

## Best practices
- Keep enough space between stacked toggles so each is easy to operate.

## Content guidelines
- Write the label to describe the "On" state.
- Use: "Notifications enabled"
- Don't use: "Notifications off"
- Avoid negations, which force the user to turn the switch on to turn a setting off.

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/663c99-toggle (page `1861390`, synced 2026-06-30)
- Figma: `1533:41841`
