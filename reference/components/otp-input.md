---
component: OTP Input
category: forms
status: partial
aliases: [One-Time Password Input]
zeroheight_page_id: 8518817
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/1606f8-otp-input
figma_node: ""
last_synced: 2026-06-30
related: [input, error-message]
gaps: [Usage:Don't use when, Anatomy, Placement, Best practices, Content guidelines, Accessibility]
---

# OTP Input

## Usage
### Use when
- Entering a one-time password or verification code, using multiple single-character fields.
### Don't use when
_Not available in ZeroHeight — to review._

## Anatomy
- **Character fields**: a row of single-character input cells, one per digit of the code.

## Configurations
### Length
The number of character fields. Default is 6; other lengths such as 4 are supported.

### Read-only
Displays the code without allowing edits.

⚠️ **Missing the disabled state?** A disabled rendering exists in code, but follow the form-component guidance: prefer read-only for non-editable codes and give feedback through the error state rather than greying the control out.

## Placement
_Not available in ZeroHeight — to review._

## Behavior
- On error, the fields play a wiggle animation and then clear automatically; input is blocked (read-only) while the animation plays.

## Best practices
_Not available in ZeroHeight — to review._

## Content guidelines
_Not available in ZeroHeight — to review._

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/1606f8-otp-input (page `8518817`, synced 2026-06-30)
- Figma: —
