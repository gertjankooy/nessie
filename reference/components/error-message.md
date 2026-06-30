---
component: Error Message
category: forms
status: stable
aliases: []
zeroheight_page_id: 1814898
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/6484fb-error-message
figma_node: "1488:34596"
last_synced: 2026-06-30
related: [input, label, checkboxes, radio-buttons, message-inline]
gaps: []
---

# Error Message

## Usage
### Use when
- There is a validation error in a form — for example, asking the user to choose an option before continuing, or to correct input so it matches what the system accepts.
### Don't use when
- The error concerns the whole app or screen — use a [Message bar](https://design.ns.nl/4a05a30ad/v/latest/p/73e19f-message-bar) or [Message inline](https://design.ns.nl/4a05a30ad/v/latest/p/774e05-message-inline).
- Informing users they aren't eligible or lack permission to do something.

## Anatomy
- **Icon**: the "Alert" icon.
- **Message**: the error string, stating how to fix the problem.
- **Top padding**: positions the component against other elements without defining spacing separately.

## Configurations
### Scope
- **Default**: validation for a single field.
- **For group**: a single message for a group of [Radio buttons](https://design.ns.nl/4a05a30ad/p/44b43f) or [Checkboxes](https://design.ns.nl/4a05a30ad/p/401822).

## Placement
- Sits with the field it validates. With horizontally placed inputs, align the message to the left rather than below the second field.

## Behavior
- Show the message only when the user tries to move to the next part of a form, using inline validation. Don't show it when the user selects or taps an input, or while they are typing.

## Best practices
- Pair with inline validation so errors surface at the right moment, not prematurely.

## Content guidelines
- State what went wrong and how to fix it. Detailed error copywriting lives on the [Content tab](https://design.ns.nl/4a05a30ad/p/563e7c-error-message).

## Accessibility
- Include a hidden "Error:" prefix (for example via an `.sr-only` class) so the message is announced as "Error: Date of birth must be in the past". `[1.3.1]`
- Link the field to its message with `aria-describedby` pointing at the message's `id` so assistive technology reads it. `[3.3.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/6484fb-error-message (page `1814898`, synced 2026-06-30)
- Figma: `1488:34596`
