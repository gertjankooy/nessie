---
component: Stepper
category: forms
status: stable
aliases: []
zeroheight_page_id: 1814907
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/37f00c-stepper
figma_node: "1480:29803"
last_synced: 2026-06-30
related: [input, select]
gaps: []
---

# Stepper

## Usage
### Use when
- Reducing input effort for fields whose values deviate little from the default.
### Don't use when
- Values have large variability — use a [number Input](https://design.ns.nl/4a05a30ad/p/49d14e-input) instead.

## Anatomy
- **Minus button**: decreases the value.
- **Value**: the current numerical value, ideally with its unit.
- **Plus button**: increases the value.
- **Label** (optional): describes what the value represents.
- **Help text** (optional): extra context for the field.

## Configurations
### Range
The minimum and maximum allowed values.

### Step size
How much each button press changes the value; usually one unit, but task analysis may call for a larger step.

### Unit
A unit shown with the value, such as euros, adults, or minutes.

## Placement
_Not documented separately; follows form-field placement._

## Behavior
- When the range minimum or maximum is reached, the corresponding button is disabled.

## Best practices
- Set the most frequently selected value as the default.
- Step by one unit per press unless a larger step is clearly appropriate.
- Don't use a stepper for large adjustments (for example 1 to 25) — use a number input.

## Content guidelines
- Make the step and the unit explicit, for example euros, adults, or percentage.

## Accessibility
- Provide a unit for the value so it's announced (for example "minutes"). `[1.3.1]`
- Give the plus and minus buttons descriptive labels. `[4.1.2]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/37f00c-stepper (page `1814907`, synced 2026-06-30)
- Figma: `1480:29803`
