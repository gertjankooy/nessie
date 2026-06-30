---
component: Chips
category: content
status: stable
aliases: [Chip, Filter Chip, Action Chip, Dismissible Chip]
zeroheight_page_id: 2314045
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/01a414-chips
figma_node: "3435:25336"
last_synced: 2026-06-30
related: [sticker, badge, radio-buttons, selectable, bottom-sheet]
gaps: []
---

# Chips

## Usage
### Use when
- **Filter**: filtering content, offering single or multiple options to select.
- **Action**: triggering an action related to primary content, appearing dynamically and contextually (unlike buttons, which are persistent).
- **Dismissible**: representing a small, removable element of feedback or input, such as a discount code added to a form.
### Don't use when
- Highlighting information — use a [Sticker](https://design.ns.nl/4a05a30ad/p/708a6e-sticker).
- Representing the status of an object — use a [Badge](https://design.ns.nl/4a05a30ad/p/540677-badge).
- Offering several options where only one can be selected — use [Radio buttons](https://design.ns.nl/4a05a30ad/p/44b43f-radio-buttons) or [Radio panel](https://design.ns.nl/4a05a30ad/p/042c3f-radio-panel).
- Presenting only a single option.

## Anatomy
- **Label**: short text, preferably one word.
- **Leading icon** (optional): on action chips.
- **Dismiss button**: on dismissible chips.
- **Badge** (optional): a count on a multi-filter chip.

## Configurations
### Type
- **Filter**: applies and manages filter criteria; supports single or multi-select.
- **Action**: triggers a contextual action.
- **Dismissible**: a removable choice or input.

### Style
Outlined by default; set to Filled only when placed on a tinted background.

### Multi-filter
A filter chip can carry a subtle badge showing how many options it triggers. Tapping a multi-select chip opens a [Bottom sheet](https://design.ns.nl/4a05a30ad/p/438def-bottom-sheet) of [Selectable](https://design.ns.nl/4a05a30ad/p/332804-selectable) options, with the saved count shown in the chip's badge.

## Placement
- Filter chips can sit beneath a search field.
- Action chips are positioned after primary content, such as the bottom of a tile or screen.
- Avoid stacking chips onto multiple rows on mobile; prefer horizontal scrolling.

## Behavior
- Show a checkmark on active filter chips when multiple filters can be active at once; omit the checkmark for a single filter that clears all others.

## Best practices
- Always present chips as a set — a chip never stands alone.
- Use filled chips only on a tinted background; otherwise keep them outlined.

## Content guidelines
- Keep the label as short as possible, preferably one word.
- An action chip's label starts with an active verb describing the action.

## Accessibility
- Keep touch targets at least 48px and separated by at least 8px. `[2.5.8]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/01a414-chips (page `2314045`, synced 2026-06-30)
- Figma: `3435:25336`
