---
component: Message Inline
category: feedback
status: stable
aliases: [Inline Message, Attention Block]
zeroheight_page_id: 2245173
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/774e05-message-inline
figma_node: "5464:2914"
last_synced: 2026-06-30
related: [message-bar, message-toast, highlight-box, expandable]
gaps: []
---

# Message Inline

## Usage
### Use when
- Showing a short, immediate status update or confirmation that's not obtrusive to surrounding content (Default).
- Keeping contextual information visible while letting it collapse to reduce noise — for service disruptions, travel updates, or conditional instructions (Expandable).
- Guiding the user to another part of the app, focused on action (Navigate).
### Don't use when
- The message applies at a system level or isn't about a specific piece of content — use a [Message bar](https://design.ns.nl/4a05a30ad/p/73e19f-message-bar).
- You're giving feedback about an action the user just took — use a [Message toast](https://design.ns.nl/4a05a30ad/p/781098-message-toast).

## Anatomy
- **Icon**: a semantic icon for the type (Info, Success, Warning, Error); not customisable, set automatically.
- **Title**: summarises the message in a maximum of 3 lines.
- **Body** (optional): optional for Default, mandatory for Expandable.
- **CTA** (optional): guides the user toward a solution or next step.
- **Dismiss button** (optional): removes the message from the page.
- **Expand/collapse button**: toggles the Expandable state.
- **Chevron**: signals that the whole Navigate message is interactive.

## Configurations
### Type
- **Default**: short status update, optionally dismissible and/or with a CTA.
- **Expandable**: persistent context that can be collapsed; body is mandatory.
- **Navigate**: the whole message navigates elsewhere when tapped.

### Variant
- **Success**: a positive outcome or confirmation.
- **Informative**: general information, no immediate action.
- **Warning**: a potential issue or required action.
- **Error**: a critical issue requiring immediate attention.

## Placement
- Position at the top of the screen when the message applies to the whole screen, or at the top of a section when it applies to that section.

## Behavior
- Default with neither CTA nor close button is non-interactive.
- Expandable toggles via the icon button; when collapsed, the entire message area is tappable to expand.
- Navigate makes the entire message area interactive and always navigates away.
- Default-sized messages are optimised for font scaling up to 200%.

## Best practices
- Avoid stacking inline messages of the same type; only combine different types when they're completely unrelated.
- If multiple messages are unavoidable, order by severity: Error → Warning → Success → Informative.
- Prefer progressive disclosure, dismiss-to-reveal, or grouping related messages into one expandable, over stacking.

## Content guidelines
- Keep it short and descriptive; write active, stay polite, avoid jargon and negative words.
- Success: manage expectations and add a little personality ("Veel reisplezier.").
- Informative: explain what's needed and what to do.
- Warning/Error: convey gracefully without blaming the user; for errors, give constructive advice on the fix.

## Accessibility
- The type, title, body, and variant action are announced together as a single callout; the CTA is always a separate focus target. `[1.3.1]`
- Provide the documented action labels — "Dismiss message" / "Bericht sluiten", and "Read more"/"Read less" for Expandable. `[4.1.2]`
- Keep the design's 200% font-scaling support intact. `[1.4.4]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/774e05-message-inline (page `2245173`, synced 2026-06-30)
- Figma: `5464:2914`
