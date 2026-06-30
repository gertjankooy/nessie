---
component: Time Picker Input
category: forms
status: stable
aliases: []
zeroheight_page_id: 5238638
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/939604-time-picker-input
figma_node: ""
last_synced: 2026-06-30
related: [date-picker-input, date-input, input]
gaps: [Content guidelines, Accessibility]
---

# Time Picker Input

## Usage
### Use when
- The user is scheduling something.
- Letting the user enter, view, and edit a time.
### Don't use when
- Asking for a time the user already knows or can look up without a picker.

A time picker input builds on the [Input](https://design.ns.nl/4a05a30ad/p/49d14e-input) base component; see Input for general field guidance.

## Anatomy
- **Label**: describes the time (arrival or departure time).
- **Optional** (optional): shown after the label when the field isn't required.
- **Input field**: accepts numbers.
- **Placeholder / filled text**: e.g. `1230` rendering as 12:30.
- **Trailing button** (optional): triggers the picker separately from the input field.
- **Trailing icon** (optional): used when only one action (input or picker) applies to the whole field.
- **Error message** (optional): context when the entry doesn't meet criteria.

## Configurations
### Trigger mode
- **Input + picker**: typing in the field plus a separate trailing button that opens the picker.
- **Single action**: the whole field triggers either time input or the picker, shown with a trailing icon.
- **Picker only**: the field always opens the picker rather than accepting typed input.

## Placement
- When a picker is available, separate it from the time-input action: use the NES icon-only tertiary button (light-blue signals the picker action). When the whole field triggers a single action, use a plain NES icon.

## Behavior
- Three active states: active time input, active button picker, and active input picker (whole field).
- Triggering the picker opens native widgets — inline time-picker wheels on iOS and a `TimePickerDialog` on Android. Triggering input shows a numeric keyboard.
- Keep the picker fully in view; scroll it into view if needed and restore the previous scroll position when it closes.
- Minimum field width is 120dp, or 148dp when configured for AM/PM.

## Best practices
- Keep the picker action visually distinct from the typed-input action.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/939604-time-picker-input (page `5238638`, synced 2026-06-30)
- Figma: —
