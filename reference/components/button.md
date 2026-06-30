---
component: Button
category: buttons
status: stable
aliases: [IconButton, FloatingButton]
zeroheight_page_id: 1780833
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/15d4f2-button
figma_node: "1437:8588"
last_synced: 2026-06-30
related: [button-group, link]
gaps: []
---

# Button

## Usage
### Use when
- Signifying an important action on a screen.
- Confirming or submitting information entered in a form.
- Canceling an action.
- Resetting a form or dataset.
- Opening or closing a modal or section.
- Moving forward or backward through a flow or form.
### Don't use when
- An action should read as inline text — use the link type, or the [Link](https://design.ns.nl/4a05a30ad/v/latest/p/12345b-link) component.

A button triggers an action; a link navigates. If the element takes the user somewhere rather than doing something, reach for a link instead.

## Anatomy
- **Label**: the action text, in sentence case.
- **Icon** (optional): a single icon before the label to reinforce the action.
- **Chevron right** (optional): placed after the label to signal a next step; only within a funnel and only on a brand button. Never combine it with another icon.

## Configurations
### Type
- **Brand**: entering a purchase funnel and within the funnel itself.
- **Primary**: the single most important action.
- **Secondary**: less important actions.
- **Tertiary**: the least important actions; only ever placed next to another button.
- **Link**: an action that should look like a link.

### Icon only
A last resort, for instance when there is not enough room for a label. The icon must clearly convey the action, and a hidden label must still be supplied for assistive technology.

### Floating
Use when the call-to-action should stay visible while scrolling or on top of maps.

### Size
- **Default**: 48px tall.
- **Compact**: 32px tall, padded to a 48px touch target.

### Width
Full by default to fill the parent container; can be set to half or auto (sized to the label). Keep a minimum width of 80px so short labels stay easy to operate.

### Destructive
Primary, secondary, and tertiary buttons can trigger a destructive action, in which case they turn red. Pick the type by how much emphasis the destructive action needs. Destructive actions permanently remove something that is hard to recover, and always prompt for confirmation. Cancel, close, and logout are not destructive.

### Inverted
Inverted variants exist for placement on colored or dark backgrounds, where the standard pairing would not meet contrast.

⚠️ **Missing the disabled state?** Disabled states are intentionally omitted: not all users recognize them, greyed-out styling causes contrast issues, and disabled controls can't receive focus so screen readers skip them. Instead, let users interact and respond with a message inline and/or error message.

## Placement
- Buttons can sit on multiple backgrounds; use inverted variants on colored or dark surfaces.
- Combine related actions with the [Button group](https://design.ns.nl/4a05a30ad/v/latest/p/61b5f9-button-group) component.
- Keep ≥16px between adjacent buttons.

## Behavior
- **Loading**: the label is replaced by a spinner while the button keeps its color; the tertiary type is excluded because it only appears beside another button. When several buttons are shown, only the pressed one shows a spinner.

## Best practices
- Use only one icon, placed before the label.
- Add icons to reinforce an action, never purely for decoration.
- Avoid placing secondary or tertiary buttons on a yellow background — the combination fails contrast.

## Content guidelines
- Write labels in sentence case.
- Detailed button copywriting lives on the [Content tab](https://design.ns.nl/4a05a30ad/v/latest/p/37dee7-button).

## Accessibility
- Supply a visually-hidden label for an icon-only button so assistive technology can announce the action. `[4.1.2]`
- Keep touch targets at least 48px and separated by at least 8px (16px between buttons). `[2.5.8]`
- Don't place secondary or tertiary buttons on a yellow background, and don't rely on color alone to convey state. `[1.4.3]`

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/15d4f2-button (page `1780833`, synced 2026-06-30)
- Figma: `1437:8588`
