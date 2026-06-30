---
component: Loader
category: feedback
status: stable
aliases: [Spinner]
zeroheight_page_id: 1906108
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/42095a-loader
figma_node: "1743:44090"
last_synced: 2026-06-30
related: [skeleton, button]
gaps: [Content guidelines, Accessibility]
---

# Loader

## Usage
### Use when
- The wait time is expected to be longer than three seconds.
- Loading content for an entire screen, inside a component such as a card, inside a modal, or for the next step in a flow.
- It's not possible to display the total wait time, for example when retrieving a lot of data.
### Don't use when
- The waiting time is shorter than three seconds.

## Anatomy
- **Spinner**: the animated loading indicator.

## Configurations
### Size
- **Default**: the standard starting point.
- **Compact**: for when space is limited.

## Placement
- When only part of a page is updating, place the loader in that part of the page.

## Behavior
- The loader is unified across iOS and Android.

## Best practices
- Start with the default size; use compact only when space is tight.
- When a loader is triggered by a [Button](button.md), place the spinner in the button and disable the button's action while it's visible.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/42095a-loader (page `1906108`, synced 2026-06-30)
- Figma: `1743:44090`
