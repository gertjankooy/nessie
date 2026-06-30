---
component: Date Picker Input
category: forms
status: stable
aliases: [Datepicker]
zeroheight_page_id: 5233388
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/89e5bd-date-picker-input
figma_node: "1487:30737"
last_synced: 2026-06-30
related: [date-input, time-picker-input, input]
gaps: [Content guidelines, Accessibility]
---

# Date Picker Input

## Usage
### Use when
- The user is scheduling something.
- Letting the user enter, view, and edit a date.
### Don't use when
- Asking for a date the user already knows or can look up, such as a date of birth — use [Date input](https://design.ns.nl/4a05a30ad/p/62eede-date-input).

A date picker input builds on the [Input](https://design.ns.nl/4a05a30ad/p/49d14e-input) base component; see Input for general field guidance.

## Anatomy
- **Label**: describes the date (birthday, arrival date, etc.).
- **Optional** (optional): shown after the label when the field isn't required.
- **Input field**: accepts numbers.
- **Placeholder / filled text**: e.g. `01112023` rendering as 01-11-2023.
- **Trailing button** (optional): triggers the picker separately from the input field.
- **Trailing icon** (optional): used when only one action (input or picker) applies to the whole field.
- **Error message** (optional): context when the entry doesn't meet criteria (e.g. "please select a date in the future").

## Configurations
### Trigger mode
- **Input + picker**: typing in the field plus a separate trailing button that opens the picker.
- **Single action**: the whole field triggers either date input or the picker, shown with a trailing icon.
- **Picker only**: the field always opens the picker rather than accepting typed input.

## Placement
- When a picker is available, separate it from the date-input action: use the NES icon-only tertiary button (its light-blue color signals the picker action). When the whole field triggers a single action, use a plain NES icon instead.

## Behavior
- Three active states: active date input, active button picker, and active input picker (whole field).
- Triggering the picker opens native widgets — an inline date picker on iOS and a `DatePickerDialog` on Android. Triggering input shows a numeric keyboard.
- Keep the picker fully in view; if it extends beyond the visible area, scroll it into view and restore the previous scroll position when it closes.
- Minimum field width is 164dp with a full year (yyyy); use 144dp with a short year (yy) when space is tight.

## Best practices
- Keep the picker action visually distinct from the typed-input action.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/89e5bd-date-picker-input (page `5233388`, synced 2026-06-30)
- Figma: `1487:30737`
