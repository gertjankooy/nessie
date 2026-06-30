---
component: Link
category: content
status: stable
aliases: [Button Link]
zeroheight_page_id: 1871465
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/12345b-link
figma_node: "3257:96076"
last_synced: 2026-06-30
related: [button, message-bar, list-items]
gaps: [Content guidelines]
---

# Link

## Usage
### Use when
- An action should look like a link.
### Don't use when
- An action should come across as a button — use another [Button](button.md) type.

In apps there are no true links; this is a button styled as a link.

## Anatomy
- **Link text**: the action label.
- **Leading icon** (optional): supports the action.
- **External icon** (optional): signals the link leaves the app.
- **Trailing subtext** (optional): for attachments, the file type and (over 99 MB) size.

## Configurations
### Size
Compact or normal.

### External
When the link goes outside the app, add the "External" icon.

### Attachment
When the link leads to an attachment, add an appropriate icon and trailing subtext describing the file.

## Placement
- A common pattern is to place a link below a short piece of text ("Read more"), rather than coloring words inside running text.

## Behavior
- A link can carry a leading icon, an external indicator, or attachment metadata depending on its destination.

## Content guidelines
_Detailed copywriting lives on the Content tab (not synced here)._

## Accessibility
- Keep touch targets at least 48px and separated by at least 8px; this is why "Read more" is a link below the text, not colored words inside it. `[2.5.8]`
- For an external link, add hidden text such as "verlaat NS app" so screen-reader users are warned upfront. `[2.4.4]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/12345b-link (page `1871465`, synced 2026-06-30)
- Figma: `3257:96076`
