---
component: Tabs
category: navigation
status: stable
aliases: []
zeroheight_page_id: 2305694
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/236902-tabs
figma_node: "3232:57720"
last_synced: 2026-06-30
related: [top-bar, bottom-navigation, tiles]
gaps: [Accessibility]
---

# Tabs

## Usage
### Use when
- Organizing and navigating between groups of content that are related and at the same level of hierarchy.
### Don't use when
- Users need to read through all the content in order, such as a step-by-step process.
- Users need to compare information across tabs.
- The tab content is unrelated — use separate views instead.

Use the "Default" type as the starting point. Use the "Inline" type to embed tabs in a specific interface region.

## Anatomy
- **Tab**: a label that links to a group of content.

## Configurations
### Type
- **Default**: the standard tabs, often combined with the Top Bar.
- **Inline**: embedded tabs for a specific region; can show an optional divider.

## Placement
- Combine "Default" tabs with the [Top Bar](https://design.ns.nl/4a05a30ad/p/37561d-top-bar).
- Embed "Inline" tabs within a region such as a [Tile](https://design.ns.nl/4a05a30ad/p/26346e-tiles) to control that region's content.

## Behavior
- Minimum tab width and height are 48px; when there's no Top Bar above, the tab bar is 56px tall to avoid height jumps between screens.
- Tabs scroll horizontally when their combined width exceeds a small viewport.
- Tabs stay in place while scrolling; a subtle shadow appears when content slides underneath.

## Best practices
- Test the content without tabs first; consider reducing content or separating it with clear headings instead.
- Order tabs by user need, with the most common section first.
- Aim for two or three tabs; never show fewer than two.

## Content guidelines
- Make labels clearly describe what they link to.
- Keep labels concise — one or two words.
- Favor nouns over verbs, such as "Train times", "Facilities", "Map".

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/236902-tabs (page `2305694`, synced 2026-06-30)
- Figma: `3232:57720`
