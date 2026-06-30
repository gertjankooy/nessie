---
component: Bottom Navigation
category: navigation
status: stable
aliases: [Bottom Nav, Tab Bar]
zeroheight_page_id: 2256756
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/65dd76-bottom-navigation
figma_node: "3024:60096"
last_synced: 2026-06-30
related: [top-bar, tabs, badge, bottom-sheet]
gaps: [Usage:Don't use when, Content guidelines]
---

# Bottom Navigation

## Usage
### Use when
- Offering top-level destinations that need to be accessible from anywhere in the app.
### Don't use when
_Not available in ZeroHeight — to review._

## Anatomy
- **Navigation item**: an icon with a label representing a primary destination.
- **Badge** (optional): attached to an item to flag new information.

## Configurations
### Badge
Add a [Badge](https://design.ns.nl/4a05a30ad/p/540677-badge) to a navigation item to indicate new information is available for that view or mode.

## Placement
- Pinned to the bottom of the screen; blends visually with the iOS home bar and the Android navigation bar.
- May be temporarily covered by [Bottom sheets](https://design.ns.nl/4a05a30ad/p/438def-bottom-sheet), the on-screen keyboard, or other flow elements, but never permanently obstructed.

## Behavior
- Items are inactive or active; the active state is shown with a filled or thicker-line icon, not color alone.
- Navigate within the current tab's stack — don't switch the active tab as a side effect of in-content navigation.
- Stays in place while scrolling; a subtle shadow appears when content slides underneath it.

## Best practices
- Keep the bar consistent across platforms while letting the section below it match each OS.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
- Don't rely on color alone for the active state — pair it with a filled or thicker icon. `[1.4.1]`
- When an item carries a badge, group the badge with the item so assistive technology reads them as one element (for example "Mijn reizen, there are 2 new items"). `[1.3.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/65dd76-bottom-navigation (page `2256756`, synced 2026-06-30)
- Figma: `3024:60096`
