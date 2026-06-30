---
component: Button Group
category: buttons
status: stable
aliases: []
zeroheight_page_id: 1936817
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/086fef-button-group
figma_node: "1833:44029"
last_synced: 2026-06-30
related: [button, bottom-sheet, tiles]
gaps: [Accessibility]
---

# Button Group

## Usage
### Use when
- There are two (or three) related actions for the user to choose from.
### Don't use when
- The actions are not related to each other.

## Anatomy
- **Primary action**: the single most important action.
- **Other actions**: one or two related actions shown as tertiary buttons.

## Configurations
### Stack
- **Vertical**: actions stacked, primary on top.
- **Horizontal**: actions side by side, primary on the far left.

### Primary action type
By default the primary action is a primary button; the others are tertiary buttons. When the primary action leads to a purchase funnel, swap it for a brand button. There can be only one primary button.

## Placement
- The primary action always comes first (top when vertical, far left when horizontal), so the most important action follows immediately after the content.
- Alignment can be set to the right when it conveys a sense of progress.
- Commonly placed below text or a form, within a bottom sheet, or within a tile.

## Behavior
- Button width can be full, half, or auto. By default it's full width on small viewports and auto on large viewports, with a minimum width of 80px.

## Best practices
- Limit to two actions where possible; three is the maximum.
- Buttons within a group follow the [Button](button.md) best practices.

## Content guidelines
- Follow the [Button](button.md) copywriting guidelines.
- Give labels the same number of words, preferably one each — especially for a horizontal group on a small viewport.

## Accessibility
_Not documented separately; follows [Button](button.md) accessibility._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/086fef-button-group (page `1936817`, synced 2026-06-30)
- Figma: `1833:44029`
