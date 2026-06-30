---
component: Message Toast
category: feedback
status: stable
aliases: [Toast, Snackbar]
zeroheight_page_id: 2245188
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/781098-message-toast
figma_node: "2746:98074"
last_synced: 2026-06-30
related: [message-inline, message-bar]
gaps: []
---

# Message Toast

## Usage
### Use when
- Giving general confirmation of a task or action the user initiated.
- Providing visual feedback for an action taken, without expecting a next step.
- Showing short feedback such as "Item removed from list" — the toast disappears after 5 seconds, so it's not for extensive feedback.
### Don't use when
- The information relates directly to the current screen — use a [Message inline](https://design.ns.nl/4a05a30ad/p/774e05-message-inline).
- The message applies at a system level and must alert all users — use a [Message bar](https://design.ns.nl/4a05a30ad/p/73e19f-message-bar).
- Showing user-forced or persistent error messages — use a [Message inline](https://design.ns.nl/4a05a30ad/p/774e05-message-inline).
- Conveying critical information users must act on immediately — toasts auto-dismiss, aren't easily keyboard-accessible, and may appear away from the user's focus.

## Anatomy
- **Label**: the message text.
- **Icon** (optional): only on the Default type, to highlight context; the Error type always shows the Alert icon.
- **CTA** (optional): a call-to-action.
- **Close** (optional): dismisses the toast.

## Configurations
### Type
- **Default**: neutral confirmation, neither positive nor negative; can include a CTA, close, and optional icon.
- **Error**: discouraged — reserve for errors not caused by the user (such as a network issue). Always shown with the Alert icon; keep the message to no more than 3 words.

## Placement
- Centered in the viewport, entering from the bottom. The consuming team is responsible for placement.

## Behavior
- Automatically disappears after 5 seconds.

## Best practices
- Keep the Default type neutral; don't add instructive icons to it.
- Don't pair the Default type with an Alert icon.
- Use the Error type only for errors not caused by the user.

## Content guidelines
- Keep it short, active, and polite; avoid negative words and jargon.
- Success messages can carry a little personality ("Veel reisplezier.").
- Error messages convey the problem gracefully and, where possible, advise on the fix.

## Accessibility
- The message includes a hidden type prefix ("Error:", "Waarschuwing:", "Informatief:", "Succes:") so it's announced as, for example, "Error: We can't connect to the internet". `[1.3.1]`
- Because toasts auto-dismiss and are hard to reach by keyboard, never put critical, action-required information in them. `[2.2.1]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/781098-message-toast (page `2245188`, synced 2026-06-30)
- Figma: `2746:98074`
