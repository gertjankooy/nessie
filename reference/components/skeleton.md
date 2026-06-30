---
component: Skeleton
category: feedback
status: stable
aliases: [Skeleton Loader]
zeroheight_page_id: 2630877
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/125446-skeleton
figma_node: "4290:82378"
last_synced: 2026-06-30
related: [loader]
gaps: [Content guidelines]
---

# Skeleton

## Usage
### Use when
- You have a good idea of the shape the data will take.
- The data takes longer to load (over 2 seconds).
### Don't use when
- You don't know in advance what shape the data will take — use a [Loader](https://design.ns.nl/4a05a30ad/p/42095a-loader) instead.

## Anatomy
- **Placeholder block**: an animated shape standing in for content not yet loaded.

## Configurations
### Shape
Available shapes include rounded, circle, heading, and text. Adjust height and width with the spacing scale and corner radius with the border-radius tokens.

### Text lines
For the text shape, the number of lines can be set (2 to 5).

## Placement
- Compose multiple skeletons with spacing-scale gaps to stand in for a paragraph.

## Behavior
- Appears for only a few seconds and disappears once the content has loaded.
- Improves perceived performance by directing attention to progress rather than waiting time.

## Best practices
- Show static content that never changes immediately, and use skeletons only for dynamic content.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
- Give non-text shapes a content description where they represent meaningful content (for example a user avatar circle). `[1.1.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/125446-skeleton (page `2630877`, synced 2026-06-30)
- Figma: `4290:82378`
