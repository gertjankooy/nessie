---
component: Radio Buttons
category: forms
status: stable
aliases: [Radio Button]
zeroheight_page_id: 1862104
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/44b43f-radio-buttons
figma_node: "1600:42244"
last_synced: 2026-06-30
related: [radio-panel, checkboxes, toggle, select, label, help-text, error-message]
gaps: [Content guidelines, Accessibility]
---

# Radio Buttons

## Usage
### Use when
- Users need to select only one option from a set of mutually exclusive choices.
- The number of options fits on a small viewport.
### Don't use when
- Users can select multiple options, or zero options — use [Checkboxes](https://design.ns.nl/4a05a30ad/p/401822-checkboxes).
- There are too many options to display — use a [Select](https://design.ns.nl/4a05a30ad/p/98f3c6-select) or search with autosuggest.
- The goal is to turn an option on or off instantly — use a [Toggle](https://design.ns.nl/4a05a30ad/p/663c99-toggle).

## Anatomy
- **Radio button**: the selectable control.
- **Label**: the option text; positioned in the header of the listview for the group.
- **Help text** (optional): below the label, or per option when needed.
- **Error message** (optional): positioned in the footer of the listview.

## Configurations
⚠️ **Missing the disabled state?** Disabled states are intentionally omitted: they're easy to miss, cause contrast issues, and can't receive focus so screen readers skip them. Let users interact and respond with an error message instead.

## Placement
- Group radio buttons within a listview, stacked vertically. Use a horizontal group only when vertical space must be saved, and keep at least 16px between options.

## Behavior
- The label is selectable — tapping either the label or the control selects the option.
- Generally preselect the first option. When preselection could create incorrect assumptions (for example "Male"/"Female"), select nothing by default.

## Best practices
- If selecting nothing is a valid choice, include an explicit option such as "None".
- Prefer vertical stacking — horizontal lists are less scannable.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/44b43f-radio-buttons (page `1862104`, synced 2026-06-30)
- Figma: `1600:42244`
