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

### Surface (branded vs plain)
> **Local guidance — keep on sync (authored ahead of ZeroHeight; not a removal).** From NS app-team decisions; reconcile and delete this line once ZeroHeight covers it.

Two surface treatments; which one you use follows the **navigation context**, not the screen's look. The deciding signal is whether the bottom navigation is visible.

- **Branded** (`brand.primary.alt`) — **main navigation**: screens where the bottom nav is visible (the main pages and their sub-navigation). Carries NS identity and wayfinding; content on it uses the on-brand pairing (`brand.primary.on-default`).
  - **Canvas pairing:** if that screen's canvas is `content.background.base`, use `content.background.base-alt` instead — otherwise the bar and canvas are the same gray in dark mode and don't separate. Pick the canvas itself per the surface guidance in `../tokens/color.md` (Visual hierarchy) — don't reach for `base` by default.
- **Plain** (white / transparent — equivalent on `content.background.default`) — **tasks and side-steps**: sheets, focused flows, and any task where the bottom nav is hidden. Keeps focus on the task, not the branding. Sits on `content.background.default` by default; a task may sit on `base` (e.g. a search view), in which case follow the surface guidance in `../tokens/color.md` (Visual hierarchy).

## Placement
- Pinned to the top, visually unified with the status bar.
- Can be combined with [Tabs](https://design.ns.nl/4a05a30ad/p/236902-tabs) for navigation between related, same-level content.

## Behavior
- Stays in place while scrolling; sits at the same elevation as content by default.
- Height and font size follow the OS guidelines.
- A long title truncates rather than wrapping.

### Scrolled state (being finalized with the component)
> **Local guidance — keep on sync (authored ahead of ZeroHeight; not a removal).**

On scroll the bar shifts to a more content-forward treatment. Known so far: in **light mode** the branded bar **stays branded** (Android too), while **iOS 26** renders it transparent (system glass); in **dark mode** the scrolled bar uses a blurred background with a light overlay. Plain bars go transparent. Exact values land with the Android / iOS 26+ variants.

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
