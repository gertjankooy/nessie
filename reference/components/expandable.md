---
component: Expandable
category: content
status: stable
aliases: [Accordion]
zeroheight_page_id: 2105596
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/90132b-expandable
figma_node: "2486:53403"
last_synced: 2026-06-30
related: [list-items, tiles, message-inline]
gaps: [Accessibility]
---

# Expandable

## Usage
### Use when
- Organizing related sections of content and showing or hiding them as needed.
- Keeping content-heavy pages clean when the content isn't crucial to read in full.
### Don't use when
- Hiding content that is essential to all users.

Use the List type for multiple sections, and the Stand-alone type for a single section.

## Anatomy
- **List**: a header plus content per section.
- **Stand-alone**: a button plus content.

## Configurations
### Type
- **List**: multiple expandable sections.
- **Stand-alone**: a single expandable section.

### Background (Stand-alone)
Transparent by default; a tinted background is also possible.

## Placement
- A List shows a top border by default, with a bottom border on the last item to separate it from following content.

## Behavior
- Collapsed is the default state, showing only the header (List) or button (Stand-alone) for a high-level overview.
- Tapping the header (List) or button (Stand-alone) toggles the state; the plus icon rotates to a cross (List) or the chevron flips (Stand-alone), and following content is pushed down.
- Each section expands independently — multiple can be open at once; accordion behaviour (only one open) is deliberately avoided.

## Best practices
- Order the list labels by priority and importance.
- Don't nest expandable lists.
- Keep the content textual.

## Content guidelines
- Keep the label brief but clear and descriptive, in sentence case and limited to one sentence.

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/90132b-expandable (page `2105596`, synced 2026-06-30)
- Figma: `2486:53403`
