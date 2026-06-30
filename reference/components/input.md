---
component: Input
category: forms
status: stable
aliases: [TextField]
zeroheight_page_id: 1814901
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/49d14e-input
figma_node: ""
last_synced: 2026-06-30
related: [label, help-text, error-message, textarea-input, select, checkboxes, radio-buttons, date-input]
gaps: []
---

# Input

## Usage
### Use when
- Letting the user enter, view, and edit text, numbers, or a combination.
- Collecting data in a form or dialog.
### Don't use when
- The user is choosing from a specific set of options — use [Checkboxes](https://design.ns.nl/4a05a30ad/p/401822), [Radio buttons](https://design.ns.nl/4a05a30ad/p/44b43f), or [Select](https://design.ns.nl/4a05a30ad/p/98f3c6).
- The answer spans multiple lines — use [Textarea](https://design.ns.nl/4a05a30ad/p/0108a7).
- Showing static text that needed no prior interaction — use [Text list item](https://design.ns.nl/4a05a30ad/p/55aa68).

## Anatomy
- **Label**: describes the input field.
- **Help text** (optional): context for what to do with the field.
- **Optional** (optional): the word "optional" shown after the label when the field isn't required.
- **Input field**: the container that accepts the entry.
- **Placeholder text** (optional): an example of the data to enter.
- **Leading icon** (optional): visual context or identifier.
- **Trailing icon** (optional): indicates additional information.
- **Trailing button** (optional): a secondary action such as a date picker, with its own touch target.

## Configurations
### Type
- **Text**: any combination of letters, numbers, or symbols, when you can't reasonably predict the answer. Default keyboard.
- **Email**: an email address. The keyboard shows the @ sign and .com on smaller viewports.
- **Number**: numeric data only. Number-pad keyboard.
- **Password**: masks characters as asterisks, with the ability to hide and show the entry.
- **Price**: an amount in any currency. The currency symbol follows the device locale and the keyboard keeps access to "," for custom amounts.
- **Read only**: shows data entered in a previous step that now needs to be displayed non-interactively. Not for static text that had no prior interaction.

⚠️ **Missing the disabled state?** Disabled states are intentionally omitted across form components: they're easy to miss, cause contrast issues, and can't receive focus so screen readers skip them. Use a read-only state for previously entered data, and respond to problems with an error message instead.

## Placement
- Position fields vertically or horizontally. When horizontal, align fields to the bottom of their wrapper so a single label can serve both; an error message then aligns left, not below the second field.
- Keep ≥32dp between vertically stacked fields; use 16dp (`related-m`) for horizontal placement.

## Behavior
- **States**: blank, filled, and error states must be distinguishable at a glance.
- **Sizing**: minimum field width is 164dp.
- **Overflow**: input text that exceeds the field scrolls while typing and is truncated when displayed.
- **Spacing**: the start padding shifts depending on whether a leading icon is shown.

## Best practices
- Make fields look interactive.
- Match the input type to the data so the best-suited keyboard appears.
- Format placeholder text as an example, not as a label or instructions.
- Consider autocomplete when the user has some idea of what's available.

## Content guidelines
- Keep labels and error messages brief and easy to act on.
- Use sentence case.
- Keep labels short; if a long label must combine with the optional marker, place the optional marker inline after the label.

## Accessibility
- When a trailing button is present, expose its action separately from the text input so each has its own touch target and announcement. `[4.1.2]`
- Choose the input type that matches the data so the correct keyboard and semantics are provided. `[1.3.5]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/49d14e-input (page `1814901`, synced 2026-06-30)
- Figma: —
