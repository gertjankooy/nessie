---
component: Range Slider
category: forms
status: stable
aliases: []
zeroheight_page_id: 4897602
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/96ecb7-range-slider
figma_node: "9441:96354"
last_synced: 2026-06-30
related: [input, stepper]
gaps: [Content guidelines]
---

# Range Slider

## Usage
### Use when
- Selecting a single value within a defined numeric range with clear minimum and maximum.
- Granular input where precision matters, such as percentages or values within a specific range.
- Offering a visually engaging way to interact with numeric input.
### Don't use when
- An exact numeric value is required — sliders may not allow precise input, especially on touch devices.
- The range is very large or needs high precision — use a numeric keypad or separate input fields.

## Anatomy
- **Track**: the visual representation of the available range.
- **Thumb**: the draggable control that sets the value.
- **Label**: names what the value represents.
- **Help text** (optional): extra context.
- **Trailing unit** (optional): the unit shown with the value, such as "km".

## Configurations
### Range
The minimum and maximum values of the slider.

### Trailing unit
A unit appended to the value (for example "km").

## Placement
_Not documented separately; placed within a form like other inputs._

## Behavior
- The thumb is draggable to select a value within the range.
- The displayed value updates in real time as the user drags.
- The control is responsive across device sizes.

## Best practices
- Provide clear labels for the minimum and maximum values.
- Set a sensible default value so users don't have to start from the minimum.
- Avoid very small ranges that are hard to adjust accurately.
- Give visual feedback (thumb or track changes) for the selected value.

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
- Provide clear min/max labels and a unit so the value is understandable. `[1.3.1]`
- Ensure the thumb is reachable and operable, including via keyboard. `[2.1.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/96ecb7-range-slider (page `4897602`, synced 2026-06-30)
- Figma: `9441:96354`
