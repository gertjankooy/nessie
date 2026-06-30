---
component: Message Bar
category: feedback
status: stable
aliases: [Banner]
zeroheight_page_id: 3859161
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/73e19f-message-bar
figma_node: "7839:86662"
last_synced: 2026-06-30
related: [message-inline, message-toast, top-bar, link]
gaps: [Content guidelines]
---

# Message Bar

## Usage
### Use when
- The message isn't directly related to the current screen.
- The message applies at a system level.
- There's an exception, such as a disruption to the normal train schedule or long call-center waiting times.
### Don't use when
- The information relates directly to what the user is doing on the current screen — put it in the main content, or use a [Message inline](https://design.ns.nl/4a05a30ad/p/774e05-message-inline) if it needs to stand out.
- You're giving feedback about an action the user took — use a [Message toast](https://design.ns.nl/4a05a30ad/p/781098-message-toast).

## Anatomy
- **Icon**: the semantic type icon; use the Disruption or Maintenance icon for those messages.
- **Label**: the message text.
- **Link** (optional): makes the bar interactive, using the [Link](https://design.ns.nl/4a05a30ad/p/12345b-link) component.
- **Dismiss** (optional): for a dismissible bar.
- **Borders**: bottom border by default, optionally top, or none.

## Configurations
### Type
- **Success**: something positive happened.
- **Informative**: information with no immediate action needed.
- **Warning**: the user should act, or something may not work as expected.
- **Error**: something happened that requires attention.
- **Error heavy**: something critical that requires immediate attention.

### Border
Bottom border by default; can be moved to the top, or omitted when adjacent sections already provide enough distinction.

### Dismissible
Use a dismissible bar when the message can be dismissed.

### Interactive
Use an interactive bar when the message links to content on another screen.

## Placement
- Position the bar directly below the [Top bar](https://design.ns.nl/4a05a30ad/p/37561d-top-bar).

## Behavior
- A dismissible bar can be closed by the user; an interactive bar links out via the Link component.

## Best practices
- Use message bars sparingly — people often miss them, and overuse worsens banner blindness.

## Content guidelines
_Detailed copywriting lives on the Content tab (not synced here)._

## Accessibility
- The message includes a hidden type prefix ("Error:", "Waarschuwing:", "Informatief:", "Succes:") so it's announced as, for example, "Error: We can't connect to the internet". `[1.3.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/73e19f-message-bar (page `3859161`, synced 2026-06-30)
- Figma: `7839:86662`
