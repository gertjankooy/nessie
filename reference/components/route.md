---
component: Route
category: domain
status: stable
aliases: [NesRouteItem]
zeroheight_page_id: 2101153
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/23cb91-route
figma_node: "2371:51993"
last_synced: 2026-06-30
related: [journey-pill, tag, sticker, rush]
gaps: [Best practices, Content guidelines]
---

# Route

## Usage
### Use when
- Clarifying the start, intermediate, and end locations on a route.
- Clarifying the carriers on a route.
- Showing metadata like a platform as trailing text.
- Showing departure and arrival times of modalities at a location.
- Use the Error type when the start or end location is unknown.

## Anatomy
- **Navigation bone**: marks the point type — departure, location, arrival, or error (start/end).
- **Time**: the departure or arrival time, with an optional delay.
- **Location**: the station or stop name.
- **Carrier** (optional): the operator.
- **Trailing text** (optional): metadata such as platform/track, with an updated value on change.
- **Custom content** (optional): a slot, for example a [Sticker](https://design.ns.nl/4a05a30ad/p/708a6e-sticker).
- **Route message**: an error message at the start or end (e.g. a missed check-in/out).

## Configurations
### Bone type
Departure, Location, Arrival, Error start, or Error end.

### Cancelled
Marks a leg cancelled; the location and carrier strike-through follow the cancelled state but can each be turned off.

### Delay and platform change
Shows a delay (e.g. "+5") and an updated trailing text when the platform changes.

### Location overflow
A long location can be constrained to a single line and truncated with an ellipsis.

## Placement
- Render route items and messages in a vertical (scrolling) list with consistent spacing; reserve space for the time to keep alignment even when it's empty.

## Behavior
- Cancelled legs render in the cancelled grey state, with optional strike-through.
- Error messages at the start or end flag missed check-ins or check-outs.

## Best practices
_Not available in ZeroHeight — to review._

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
- Combine each direction's labels into a single container announcement — for example "Departure time, 09:00", "Delayed by 5 minutes", "Departure location, …", "Carrier, …", "Boarding location, …", and the matching connection and arrival labels. `[1.3.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/23cb91-route (page `2101153`, synced 2026-06-30)
- Figma: `2371:51993`
