---
component: From To
category: domain
status: stable
aliases: [Search From To]
zeroheight_page_id: 2202960
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/26ffd0-from-to
figma_node: ""
last_synced: 2026-06-30
related: [input, list-items, error-message, receipt]
gaps: []
---

# From To

## Usage
### Use when
- The user needs to define a departure and arrival point, for example in the travel planner.
### Don't use when
_Not documented; this is a travel-planner-specific entry component._

## Anatomy
- **Departure**: always available.
- **Via station** (optional): shown when enabled from the options menu, with a remove icon.
- **Destination**: always available.
- **Swap icon**: an icon-only tertiary button that swaps the locations.
- **Error message**: uses the [Error message](https://design.ns.nl/4a05a30ad/p/6484fb-error-message) component, with optional top spacing.

## Configurations
### Background
- **Brand**: on a brand background, don't use the border.
- **Surface**: on a neutral background, do use the border.

### Via station
Add a via field from the options menu; it includes a remove icon.

## Placement
- Match the border to the background — no border on brand, border on neutral.

## Behavior
- Tapping a field highlights its border and slightly darkens its text as the pressed state.
- The error state stays contained within the component (for readable contrast on any background), with extra bottom padding.
- Long station names truncate.

## Best practices
- The default text indicates what the user should enter.
- Pre-fill the From and To fields with the last entered locations; show placeholder text only on first use.
- Offer autocomplete via prefab list items — Search suggestion, Favorite, and Current location.

## Content guidelines
- Use default text that indicates the expected entry, and pre-fill with the last entered locations.

## Accessibility
- Label each control with its role and an edit hint — for example "Starting point, Button, {address or station}, Edit the Starting point for your trip", plus "Via station", "Remove Via station", "Arrival point", and "Swap". `[4.1.2]`
- Announce the error as "Error, {Error message}". `[3.3.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/26ffd0-from-to (page `2202960`, synced 2026-06-30)
- Figma: —
