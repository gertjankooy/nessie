## Configurations

### Content slot
- **Collapsed** `variant: collapsed`: the heading row on its own. The divider is available in this state.
- **Expanded** `variant: expanded`: heading row, spacer, then the content slot. The divider is hidden.

### Section action (icon)

![The four icon actions](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight/assets/section-heading/icon-variants.png)

*Expand, collapse, dismiss, and more options.*

- **Expand** `variant: chev-down`: opens the section.
- **Collapse** `variant: chev-up`: closes the section.
- **Dismiss** `variant: close`: removes the section.
- **More options** `variant: dots`: opens further actions.

### Section action (label)
A text action trailing the heading. It is a purpose-built action rather than a [Link](https://design.ns.nl/4a05a30ad/v/latest/p/12345b-link) or [Button](https://design.ns.nl/4a05a30ad/v/latest/p/15d4f2-button) instance, so it can carry its own background without inheriting the offsets those components apply elsewhere.

- **Default** `state: default`: at rest.
- **Pressed** `state: pressed`: while held.
- **Focus** `state: focus`: while focused.

### Badge
- **Dot** `variant: dot`: on the icon action only, offset 2 from the top and 2 from the right, sitting outside the component bounds.

Restricted to the dot variant. A counter or text badge overlaps the icon at this size and must not be used here. See [Badge](https://design.ns.nl/4a05a30ad/v/latest/p/540677-badge).

[Image: **Badge placement and the numeric exclusion.** Zoomed detail of the icon action carrying a dot badge, with the 2 top and 2 right offsets dimensioned and the component bounds drawn as a dashed rectangle. Beside it, the same action with a numeric badge, crossed out.]

### Divider
- **Divider** `variant: divider`: a rule closing a collapsed section against what follows.

Available on the collapsed state only. When the section expands, the content itself provides that separation and the divider is hidden.

## Placement

![Section rhythm](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight/assets/section-heading/section-rhythm.png)

*The gap between sections stays constant whether a section is collapsed or expanded.*

- Default spacing between sections is `applied.space.app.container.stack.control` (32), whether the section is collapsed or expanded, so the rhythm doesn't change as sections open and close.
- Override to `applied.space.app.container.stack.default` (24) for denser layouts where keeping content scrollable matters more, such as search results.
- Place the heading **outside** the content container it labels, directly against it, with no extra spacing and 0 stacking.
- Keep the heading larger than any heading inside the container below it. The Section Heading is `heading4` (18), a following subheading is `labelDefaultStrong` (16), and labels inside the section's own items are smaller again.

See the layout fundamentals for the Group and SubGroup model this sits in.

| Do | Don't |
| :--- | :--- |
| [Image: heading above and outside the container, flush at 0 stacking] | [Image: the same heading placed inside the container's padding] |
| **Do.** Keep the heading outside the container it labels. | **Don't.** Don't nest the heading inside the container. |

## Behavior

- Expanding and collapsing toggles the content slot. The divider hides on expand and returns on collapse.
- Sections expand independently, so several can be open at once. Accordion behavior, where opening one closes another, is deliberately avoided, matching [Expandable](https://design.ns.nl/4a05a30ad/v/latest/p/90132b-expandable).

### Sizing
- The title takes up to 2 lines when expanded. Actions bottom-align so they stay close to the content slot.
- When collapsed, the title truncates to 1 line.
- The icon action is `size.component.control.height.tiny` (32).

### Motion
Expanding and collapsing use `motion.duration.default` (300ms) with `motion.ease.default`, the existing NESSIE defaults. Under reduced motion the section changes state instantly. See the motion tokens.

> **Android:** uses a spring animation with stiffness 400 rather than a duration-and-curve pair.

**Motion debt.** NESSIE has no spring token, so the Android stiffness above can't currently be expressed as a token. The iOS side needs no new token: `motion.duration.default` and `motion.ease.default` already resolve to exactly the intended 300ms and `(0.2, 0.9, 0.4, 1)` curve. A spring token is the only outstanding motion work for this component.

## Best practices

- Put the heading outside the content container, never inside it.
- Don't use a Section Heading to label a single self-describing item. Let the item speak for itself.
- When one section in a group has actions, give every sibling section a heading too, so the group reads as one rhythm.
- Keep to one section-scoped action where possible. Two are supported, but each needs its own distinct label.
- Don't nest Section Headings.
