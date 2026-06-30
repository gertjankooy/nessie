---
component: Travel Cards
category: domain
status: stable
aliases: [Travel Card]
zeroheight_page_id: 7132183
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/43cee1-travel-cards
figma_node: "5276:26272"
last_synced: 2026-06-30
related: [price, sticker, button]
gaps: [Usage:Don't use when, Content guidelines]
---

# Travel Cards

## Usage
### Use when
- Displaying the user's travel card status and related travel information.
### Don't use when
_Not available in ZeroHeight — to review._

Use only one Default variant per page view, since it hints which card the user is on. When switching between multiple cards, use the Inline variant instead.

## Anatomy
- **Card type**: NS Flex, NS Business, a payment card (Euro/Master/Visa), or anonymous OV-chip card.
- **Product name**: the subscription, such as "Dal Voordeel".
- **Balance**: uses the [Price](https://design.ns.nl/4a05a30ad/p/97e622-price) component; shows €0,00 when none, and keeps the last known balance once loaded.
- **Check-in status**: built on the [Sticker](https://design.ns.nl/4a05a30ad/p/708a6e-sticker) component.
- **Button**: an icon-only button for card settings, mainly signalling the whole card is tappable.

## Configurations
### Type
NS Flex, NS Business, Payment card, Anonymous (and Single ticket for inline).

### Format
- **Default**: the full card.
- **Inline**: Default or Compact size, for switching between cards.

### Balance
`alwaysShowDecimals` keeps trailing decimals (e.g. €10,00).

## Placement
- Show a single Default card per page view; use Inline cards when several need to coexist.

## Behavior
- Balance shows €0,00 when unavailable and retains the last known value once loaded.
- Card name, balance, and check-in status each support a loading state.
- Default cards are optimised for font scaling up to 200%.

## Best practices
- Don't mix multiple Default variants on one page.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
- Announce in reading order: card name → subscription → balance ("Balance: €20,45") → check-in status → button ("Go to card details"). `[1.3.1]`
- Keep the 200% font-scaling support intact. `[1.4.4]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/43cee1-travel-cards (page `7132183`, synced 2026-06-30)
- Figma: `5276:26272`
