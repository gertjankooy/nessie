---
component: Journey Pill
category: domain
status: partial
aliases: []
zeroheight_page_id: 8061362
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/772221-journey-pill
figma_node: ""
last_synced: 2026-06-30
related: [route, rush, badge, tag]
gaps: [Usage:Don't use when, Best practices, Content guidelines]
---

# Journey Pill

> ZeroHeight guidelines are still empty; this is distilled from the documented pill types and platform variants.

## Usage
### Use when
- Representing a leg of a planned journey — public transport, a personal or shared modality, a transfer, or an expand affordance for more legs.
### Don't use when
_Not available in ZeroHeight — to review._

## Anatomy
- **Modality icon**: indicates the transit mode, using modality tokens.
- **Label** (optional): a line label such as "IC Direct" or destination.
- **Duration / time** (optional): minutes for modality and transfer pills.
- **Attention badge** (optional): Info, Warning, or Critical.

## Configurations
### Type
- **Public transport**: train (subtype, e.g. Intercity, Sprinter) or OV (bus, tram, metro).
- **Modality**: own (e.g. bike), shared (e.g. OV-fiets, Check, car), or other (walk).
- **Transfer**: a transfer with a time and optional check-in/out icon.
- **Expand**: a pill showing how many more legs are available.

### Attention badge
Info, Warning, or Critical.

### Cancelled
Marks the leg or transfer as cancelled.

## Placement
- Used in a row to represent the legs of a journey; use intrinsic heights so pills in a row share the same size.

## Behavior
- A cancelled pill shows the cancelled state; a transfer shows its time; an expand pill shows the remaining leg count. Pills can be clickable.

## Best practices
_Not available in ZeroHeight — to review._

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
- A custom content description overrides the default and is read in full (for example "De trein naar Maastricht rijdt niet vanwege een gestrande trein"). `[1.3.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/772221-journey-pill (page `8061362`, synced 2026-06-30)
- Figma: —
