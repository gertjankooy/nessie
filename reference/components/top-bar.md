---
component: Top Bar
category: navigation
status: stable
aliases: [App Bar, Top App Bar]
zeroheight_page_id: 2237001
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/37561d-top-bar
figma_node: "2959:51844"
last_synced: 2026-06-30
related: [tabs, bottom-navigation, button, badge]
gaps: [Usage:Don't use when]
---

# Top Bar

## Usage
### Use when
- Displaying the title of the screen.
- Providing a back option.
- Providing contextual actions.
- Implementing branding consistently across the app.
### Don't use when
_Not available in ZeroHeight — to review._

Use the "Logo only" type when there's no need for a title, back option, or contextual action. Use the "Search bar" type as a call to action to make searching for diverse content available.

## Anatomy
- **Title**: describes the screen the user is viewing.
- **Back option**: on the left; returns the user to the previous screen.
- **Contextual actions**: on the right; one or more important actions shown as an icon or text.
- **Logo**: NS branding, used alone in the "Logo only" type.

## Configurations
### Type
- **Default**: title, optional back option, and contextual actions.
- **Logo only**: branding without title, back, or actions.
- **Search bar**: a search call to action.

### Heading XL
A bolder heading type that shrinks as the user scrolls.

## Placement
- Pinned to the top, visually unified with the status bar.
- Can be combined with [Tabs](https://design.ns.nl/4a05a30ad/p/236902-tabs) for navigation between related, same-level content.

## Behavior
- Stays in place while scrolling; sits at the same elevation as content by default.
- Height and font size follow the OS guidelines.
- A long title truncates rather than wrapping.

## Best practices
- Use a title that describes the current screen.
- Prefer text for a contextual action; use an icon only when it conveys the action just as clearly.

## Content guidelines
- Keep titles short.

## Accessibility
- When a contextual action uses an icon, include a label in code so it's announced. `[4.1.2]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/37561d-top-bar (page `2237001`, synced 2026-06-30)
- Figma: `2959:51844`
