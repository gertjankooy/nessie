---
component: Tag
category: content
status: partial
aliases: [Line Tag, Location Tag]
zeroheight_page_id: 7055570
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/80d155-tag
figma_node: ""
last_synced: 2026-06-30
related: [route, journey-pill, sticker]
gaps: [Best practices, Content guidelines]
---

# Tag

> ZeroHeight guidelines and examples are marked "coming soon"; this is distilled from the documented accessibility labels and platform variants.

## Usage
### Use when
- Indicating a line or route number inline (Line tag), such as a metro or bus line.
- Communicating a platform or track location with status cues (Location tag).
### Don't use when
_Not available in ZeroHeight — to review._

## Anatomy
- **Line tag**: a category (transit mode) plus a number or letter.
- **Location tag**: a location type (Platform, Track, Bus stop, Tram stop) plus a number or letter.

## Configurations
### Type
- **Line**: a line or route number.
- **Location**: a platform or track location.

### Location variant
Neutral or Blue color set.

### Location state
- **Default**: a static value.
- **Changed**: shows the change from an old value to a new one.
- **Cancelled**: indicates the location is cancelled.

## Placement
- Used inline alongside the content it qualifies, such as within a [Route](https://design.ns.nl/4a05a30ad/p/23cb91-route).

## Behavior
- A location tag reflects default, changed (old → new), and cancelled states, perceivable visually and programmatically.

## Best practices
_Not available in ZeroHeight — to review._

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
- Line tag announces as `{Category}, {Number/Letter}` — for example "Metro Line, 8". `[1.3.1]`
- Location tag announces the type and value, and for a change "Track, Changed from 18a to 13b"; for a cancelled tag, reference surrounding context with `aria-labelledby`. `[4.1.2]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/80d155-tag (page `7055570`, synced 2026-06-30)
- Figma: —
