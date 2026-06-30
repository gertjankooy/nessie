---
component: Dialog
category: feedback
status: stable
aliases: [Alert]
zeroheight_page_id: 2086149
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/48e821-dialog
figma_node: "2380:52491"
last_synced: 2026-06-30
related: [bottom-sheet, message-inline]
gaps: [Usage:Don't use when, Accessibility]
---

# Dialog

## Usage
### Use when
- Critical information requires full attention on a task, decision, or acknowledgment before continuing.
- Errors are blocking operation.
### Don't use when
_Not available in ZeroHeight — to review._

## Anatomy
- **Heading**: communicates the dialog's purpose.
- **Description**: a brief supporting statement.
- **Confirm and dismiss buttons**: tertiary buttons for the actions.

## Configurations
_Not documented as configurable properties in ZeroHeight._

> **iOS:** there's no custom NESSIE dialog — use the native iOS Alert and follow Apple's guidelines.

## Placement
- Overlays the underlying page so its context isn't lost.

## Behavior
- Interrupts the user and demands an action without losing the context of the underlying page.

## Best practices
- On iOS, use the native Alert rather than a custom component.

## Content guidelines
- Let the heading communicate the purpose; consider reusing words from the triggering component.
- Use a brief, clear statement or question; avoid ambiguity like "Are you sure?".
- Keep the content short and concise.

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/48e821-dialog (page `2086149`, synced 2026-06-30)
- Figma: `2380:52491`
