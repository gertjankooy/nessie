---
component: Date Input
category: forms
status: stable
aliases: []
zeroheight_page_id: 1814897
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/62eede-date-input
figma_node: ""
last_synced: 2026-06-30
related: [date-picker-input, time-picker-input, input, label, help-text]
gaps: []
---

# Date Input

## Usage
### Use when
- Asking for a date the user already knows or can look up without a calendar, such as a date of birth.
- Asking for a date far in the future.
### Don't use when
- The user is scheduling something — use [Date picker input](https://design.ns.nl/4a05a30ad/p/89e5bd-date-picker-input).

## Anatomy
- **Label**: describes the date being asked for.
- **Separate fields**: distinct day, month, and year fields, each clearly labeled.
- **Placeholder**: shows the expected format (dd, mm, jjjj).
- **Help text** (optional): extra context.
- **Error message** (optional): when the entry doesn't match criteria.

## Configurations
_Not documented as configurable properties in ZeroHeight._

## Placement
- When placing two date fields horizontally on a small screen, consider a shorter year format to fit (see Date picker input sizing).

## Behavior
- A numeric keyboard is shown on touch devices.
- Blank, filled, and error states are distinguishable.

## Best practices
- Provide clear labels for each field ("Day", "Month", "Year").
- Use placeholders to show the desired format (dd, mm, jjjj).

## Content guidelines
- Use format placeholders rather than instructions: dd, mm, jjjj.

## Accessibility
- Include the label within the touch target of the field. `[2.5.8]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/62eede-date-input (page `1814897`, synced 2026-06-30)
- Figma: —
