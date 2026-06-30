---
component: List Items
category: content
status: stable
aliases: [List Item, List Group]
zeroheight_page_id: 2011193
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/35d15f-list-items
figma_node: "2211:48420"
last_synced: 2026-06-30
related: [tiles, text-list-items, dividers, toggle, badge]
gaps: [Usage:Don't use when, Accessibility]
---

# List Items

## Usage
### Use when
- Grouping related information and/or actions in a vertical list.
### Don't use when
_Not available in ZeroHeight — to review._

Use the Base when the prefabs don't cover the use case. Prefabs cover Search suggestion, Favorite, Current location, Navigation, and Horizontal (terms/descriptions or settings) use cases.

## Anatomy
- **Leading icon** (optional): visually supports the topic.
- **Label**: the main text.
- **Subtext** (optional): additional information below the label.
- **Trailing subtext** (optional): additional information beside the label.
- **Trailing icon** (optional): affordance or a secondary action.

## Configurations
### Prefab
Base, Search suggestion, Favorite, Current location, Navigation, and Horizontal.

### Options
When `hasOptions` is set, the text below the label renders in the interactive color (an option) rather than the help-text color (subtext).

### Destructive
A list item can trigger a destructive action; its content color turns red. Destructive actions permanently remove something hard to recover and always prompt for confirmation.

## Placement
- Within the app, list items have a 16px indent on the left and right; remove it inside slot-based components (Tile, Bottom sheet) so content aligns.
- Dividers between list items don't span the full width — keep white space on the left and right.

## Behavior
- By default there are no dividers between items, so the list scans cleanly; add dividers only when content starts to float.
- By default there's no vertical space between items; add space from the spacing scale if needed.
- The pressed state visually extends beyond the item's invisible layout.

## Best practices
- Keep related list items consistent in structure.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/35d15f-list-items (page `2011193`, synced 2026-06-30)
- Figma: `2211:48420`
