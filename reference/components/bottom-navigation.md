---
component: Bottom Navigation
category: navigation
status: stable
aliases: [Bottom Nav, Tab Bar]
zeroheight_page_id: 2256756
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/65dd76-bottom-navigation
figma_node: "3024:60096"
last_synced: 2026-08-26
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
- When content is reachable from multiple tabs, navigate within the current tab's stack; don't switch the active tab as a side effect of in-content navigation. This preserves the user's context and matches platform conventions on both iOS and Android.
- Stays in place while scrolling; a subtle shadow appears when content slides underneath it.

### Tapping the active tab
Each tap moves one step back toward the top of the tab:

1. **Deeper in the tab's stack:** returns to the tab's root page, restoring the scroll position that page had.
2. **On the root, scrolled down:** scrolls to the top.
3. **On the root, already at the top:** nothing happens.

Reaching the top of the root from a deep page takes two taps, one to return and one to scroll. From the root it takes one. The behavior is the same on both platforms. For the transitions used, see [../fundamentals/motion.md](../fundamentals/motion.md).

## Best practices
- Keep the bar consistent across platforms while letting the section below it match each OS.

## Content guidelines
Follow the UX-writing scorecard and NS voice in [../content/index.md](../content/index.md). Component-specific copy guidance is not yet in ZeroHeight — to review.

## Accessibility
- Don't rely on color alone for the active state — pair it with a filled or thicker icon. `[1.4.1]`
- When an item carries a badge, group the badge with the item so assistive technology reads them as one element (for example "Mijn reizen, there are 2 new items"). `[1.3.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/65dd76-bottom-navigation (page `2256756`, synced 2026-08-26)
- Figma: `3024:60096`
