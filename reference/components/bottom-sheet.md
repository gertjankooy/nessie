---
component: Bottom Sheet
category: content
status: stable
aliases: []
zeroheight_page_id: 2101155
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/438def-bottom-sheet
figma_node: "3796:71640"
last_synced: 2026-06-30
related: [dialog, sticky-footer, bottom-navigation, tiles]
gaps: [Accessibility]
---

# Bottom Sheet

## Usage
### Use when
- Handling a self-contained process with a clear start and end point.
- Supplementing the primary UI region with extra content.
- Managing complex designs by revealing less important actions or information in stages.
### Don't use when
- A task requires many actions, such as a multi-step form — use a separate screen instead.

## Anatomy
- **Primary UI region**: the area below the bottom sheet.
- **Bottom sheet**: the layer on top, holding any kind of content.
- **Handle**: the drag affordance at the top.
- **Header**: an XL heading (LG when subtext is added), with optional subtext.
- **Slots**: areas where a designer adds elements.

## Configurations
### Background overlay
- **With overlay**: the primary region becomes secondary, all attention goes to the sheet, and underlying interaction is blocked.
- **Without overlay**: the sheet refers to the primary region, attention is shared, and the underlying content stays interactive.

### Subtext
Optional text below the heading; adding it reduces the heading size from XL to LG.

## Placement
- A sheet with an overlay sits on top of the [Bottom navigation](https://design.ns.nl/4a05a30ad/p/65dd76-bottom-navigation); a sheet without an overlay sits behind it.
- Default padding is 16px (`nesSpacing4`).

## Behavior
- Grows with its content; the initial position is capped at about 50% of screen height to keep top content reachable.
- Content over 50% can be pulled to full screen and scrolls internally; in full screen the header and footer become sticky.
- Don't open a sheet full screen — it puts the top content out of reach.
- A sheet with an overlay closes by tapping the overlay, the close option, swiping down, tapping an action, or the back button (Android). A sheet without an overlay can't be closed, but a full-screen one collapses via the collapse option or swiping down.

## Best practices
- Keep bottom sheets as consistent as possible — default padding 16px, heading XL.

## Content guidelines
- Show a heading that identifies the task, so the new context is clear when users switch into the sheet.

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/438def-bottom-sheet (page `2101155`, synced 2026-06-30)
- Figma: `3796:71640`
