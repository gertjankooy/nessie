---
component: Price
category: content
status: stable
aliases: []
zeroheight_page_id: 1995200
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/97e622-price
figma_node: "1923:43813"
last_synced: 2026-06-30
related: [receipt, sticker, tag]
gaps: [Accessibility]
---

# Price

## Usage
### Use when
- Displaying an amount of money.
### Don't use when
- Showing anything other than an amount of money.

## Anatomy
- **Currency symbol**: with one space between it and the amount.
- **Amount**: the monetary value.
- **Leading text** (optional): text before the amount.
- **Trailing text** (optional): text after the amount.

## Configurations
### Size and weight
Different sizes and font weights to set the attention a price deserves.

### Always show decimals
`alwaysShowDecimals` forces trailing decimals; use it across a group when round and non-round prices appear together.

### Alignment
Left or right, depending on the price's position within a section.

### Stacked
The amount can be stacked, and combined with leading and/or trailing text.

## Placement
- Align right or left depending on the surrounding section.

## Behavior
- A separator (.) groups thousands (€ 1.000).
- By default, prices show without trailing zero decimals (€ 4, not € 4,00).
- When a round price sits in a column with non-round prices, set `alwaysShowDecimals` to true on every price in the group so they share the same shape.

## Best practices
- Use the default text color; only vary weight and size to adjust attention.

## Content guidelines
- In the Netherlands the decimal separator is a comma and the thousands separator is a point; other countries may reverse these.

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/97e622-price (page `1995200`, synced 2026-06-30)
- Figma: `1923:43813`
