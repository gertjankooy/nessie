---
component: Highlight Box
category: feedback
status: stable
aliases: []
zeroheight_page_id: 3549754
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/27e793-highlight-box
figma_node: "5631:11769"
last_synced: 2026-06-30
related: [message-inline, sticker, link]
gaps: []
---

# Highlight Box

## Usage
### Use when
- A [Message inline](https://design.ns.nl/4a05a30ad/p/774e05-message-inline) feels too heavy and you want non-critical information to jump out.
### Don't use when
- Conveying information that's critical or that needs an action — use a [Message inline](https://design.ns.nl/4a05a30ad/p/774e05-message-inline) instead. Warning and Alert types have been removed from the highlight box.

## Anatomy
- **Type** (optional): the highlight category, shown for emphasis.
- **Message text**: the highlighted information; the bold part carries the highlight color, the rest uses the body text color.
- **Icon** (optional): only when it adds meaning; it's decorative for accessibility.
- **Link** (optional): adding a link makes the whole box interactive.

## Configurations
### Type
- **Highlight**: neutral, higher priority than Info.
- **Offer**: positive — an upsell or offer.
- **Info**: general information, lower priority.
- **Brand**: needs extra attention.

### Icon
- **Off**: no icon.
- **Default**: a 32x32 icon.
- **Detail**: a large 56x56 detail icon.

### Link
Adding a link makes the entire highlight box interactable.

## Placement
- Don't stack multiple highlight boxes directly after each other; merge or restructure instead.
- Can be combined with a single message inline on one page.

## Behavior
- Icon and text auto-align: the icon is centered by default and jumps to the top from 3 lines of text onward. In Figma this alignment must be set manually.
- When link text wraps, the icon aligns to the end of the final line, 5px from the last character.
- Default-sized boxes are optimised for font scaling up to 200%.

## Best practices
- Keep content concise — 1 to 3 lines works best.
- Use an informative, supportive tone, not urgent.
- Pair with an icon only when it adds meaning; avoid decorative-only icons.
- When interactive, make the whole box tappable with a pressed state — never a separate link button with its own interaction state.

## Content guidelines
- Keep the message short and supportive; only the emphasis word(s) take the highlight color.

## Accessibility
- Treat the whole box as one accessibility element: a descriptive label when static, a single button when interactive, announced as type → message → action. `[4.1.2]`
- Hide the decorative icon from assistive technology, and never expose a second focus stop for the link. `[1.1.1]`
- Keep the 200% font-scaling support intact. `[1.4.4]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/27e793-highlight-box (page `3549754`, synced 2026-06-30)
- Figma: `5631:11769`
