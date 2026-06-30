---
component: Badge
category: feedback
status: stable
aliases: []
zeroheight_page_id: 2127429
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/540677-badge
figma_node: "2553:54283"
last_synced: 2026-06-30
related: [bottom-navigation, button, sticker]
gaps: [Usage:Don't use when, Content guidelines]
---

# Badge

## Usage
### Use when
- Indicating a quantifiable status change related to a destination.
- Showing only a shape, without a counter, to flag a status change or new notification.
### Don't use when
_Not available in ZeroHeight — to review._

## Anatomy
- **Shape**: the badge container.
- **Count or text** (optional): a number, short text (such as "OK"), or nothing (flag).

## Configurations
### Variant
Documented variants include Default, Important, Success, and Brand.

### Content
- **Counter**: a number.
- **Text**: a short string.
- **Flag**: shape only, no value.

## Placement
- Positioned relative to a child element (such as an icon); default placement is top right.
- On buttons, the badge's center point aligns with the top of the button.

## Behavior
- Hide the badge when the count is zero.
- Show "9+" when the number exceeds 9.

## Best practices
- Badges are blue or red; reserve red to convey importance.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
- A standalone number lacks context for screen-reader users — include hidden text such as "You have 4 unread messages" rather than just "4". `[1.1.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/540677-badge (page `2127429`, synced 2026-06-30)
- Figma: `2553:54283`
