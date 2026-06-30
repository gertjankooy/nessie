---
component: Checkboxes
category: forms
status: stable
aliases: [Checkbox]
zeroheight_page_id: 1864658
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/401822-checkboxes
figma_node: "1375:4207"
last_synced: 2026-06-30
related: [radio-buttons, radio-panel, toggle, label, help-text, error-message]
gaps: []
---

# Checkboxes

## Usage
### Use when
- A user can select any number of options from a set list.
- A user needs to see all the available options at a glance.
- A user has to perform additional steps for changes to become effective.
### Don't use when
- A user can only select one option from a list — use [Radio buttons](https://design.ns.nl/4a05a30ad/p/44b43f-radio-buttons) or [Radio panel](https://design.ns.nl/4a05a30ad/p/042c3f-radio-panel).

## Anatomy
- **Checkbox**: the selectable control.
- **Label**: the option text; positioned in the header of the listview for the group.
- **Help text** (optional): below the label, or per option when needed.
- **Error message** (optional): positioned in the footer of the listview.

## Configurations
### Indeterminate
Use an indeterminate state for a "Select all" option when its underlying options are a mix of checked and unchecked. Offer "Select all" at the top when there are many options the user may want to select at once.

⚠️ **Missing the disabled state?** Disabled states are intentionally omitted: they're easy to miss, cause contrast issues, and can't receive focus so screen readers skip them. Let users interact and respond with an error message instead.

## Placement
- Group checkboxes within a listview.
- List options vertically; horizontal listings make it hard to tell which label belongs to which checkbox.

## Behavior
- The label is selectable — tapping either the label or the checkbox toggles the option.
- The default view has no option selected.

## Best practices
- List options in a logical order (alphabetical, numerical, time-based).
- Avoid checkboxes whose action is the opposite of what the user expects.

## Content guidelines
- Use positive statements; negative labels are counterintuitive.
- Use: "I want to get notifications"
- Don't use: "I don't want to receive notifications"

## Accessibility
- Make both the label and the control part of the same touch target so either can toggle the option. `[2.5.8]`
- Associate the group label and any error message with the options in code. `[1.3.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/401822-checkboxes (page `1864658`, synced 2026-06-30)
- Figma: `1375:4207`
