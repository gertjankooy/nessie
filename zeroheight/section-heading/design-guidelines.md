Names a section of content and hosts the actions that belong to that section as a whole.

## Usage

### Use when
- The section carries an action scoped to the whole group: show all, collapse and expand, or dismiss. A section-scoped action has nowhere else to live, and an action on an item means something different from an action on the set.
- The section is a named collection that its own content doesn't name. A ticket names a journey, not the category "Tickets", so the category name exists only in the heading.
- Several sections need headings and at least one of them has actions. Then use it on all of them, so the rhythm stays consistent.

### Don't use when
- The content is FAQ-like, or the expansion is purely textual. Use [Expandable](https://design.ns.nl/4a05a30ad/v/latest/p/90132b-expandable).
- You need a heading between paragraphs of copy. Use a heading type style with the heading role applied.
- The section holds a single self-naming item with nothing larger behind it and no section-scoped action. A disruption tile that already carries its own descriptive title needs no heading above it.

Either trigger above is sufficient on its own. The test for the second one: if you deleted the heading, would a user still know what this group is? For a ticket, no. For a disruption tile, yes.

![section-heading-rules](https://raw.githubusercontent.com/gertjankooy/nessie/docs/zeroheight-push-pipeline/zeroheight/assets/section-heading/rules.png)
*Tickets takes a heading because the collection could grow and has a "Show all" action. The disruption tile names itself, so it gets none.*

The number of visible items is not the deciding factor. A homepage widget showing one ticket is still a window into "Tickets" and keeps its heading, while a single disruption tile is the section itself and doesn't get one.

**Stability.** If a section could hold more than one item on another day, keep the heading permanently rather than showing it only once a second item arrives. A heading that appears and disappears as data changes shifts the layout and breaks the section map that screen-reader users build between sessions.

## Anatomy

![Section Heading anatomy, expanded and collapsed](https://raw.githubusercontent.com/gertjankooy/nessie/docs/zeroheight-push-pipeline/zeroheight/assets/section-heading/anatomy.png)
*Expanded and collapsed. The divider belongs to the collapsed state only.*

| # | Part | Role |
| :-- | :--- | :--- |
| 1 | **Heading** | The section title, `heading4` carrying the heading role. |
| 2 | **Section action — label** (optional) | A text action trailing the heading. |
| 3 | **Section action — icon** (optional) | An icon action trailing the heading. |
| 4 | **Divider** (optional) | A rule closing the section, available on the collapsed state only. |
| 5 | **Content slot** (optional) | Holds the section's content when expanded. |
| — | **Spacer** (optional) | The gap between the heading row and the content slot; not called out in the diagram. |

The content slot exists for composition in Figma. In code the slot is optional, and content may be stacked directly after the heading at the section spacing given under Placement.

## Configurations

### Content slot
- **Collapsed** `variant: collapsed`: the heading row on its own. The divider is available, but optional, in this state.
- **Expanded** `variant: expanded`: heading row, spacer, then the content slot. The divider is hidden.

### Section action (icon)

![The four icon actions](https://raw.githubusercontent.com/gertjankooy/nessie/docs/zeroheight-push-pipeline/zeroheight/assets/section-heading/icon-actions.png)
*from left to right: Expand, Collapse, Dismiss, and More options.*

An icon-only [Button](https://design.ns.nl/4a05a30ad/v/latest/p/15d4f2-button) at the tiny (32) size, inheriting its states, touch behavior, and disabled handling. Only the glyph changes:

- **Expand** `variant: chev-down`: opens the section.
- **Collapse** `variant: chev-up`: closes the section.
- **Dismiss** `variant: close`: removes the section.
- **More options** `variant: dots`: opens further actions.

### Section action (label)

![Label actions states](https://raw.githubusercontent.com/gertjankooy/nessie/docs/zeroheight-push-pipeline/zeroheight/assets/section-heading/label-actions.png)

A text action trailing the heading. It is a purpose-built action rather than a [Link](https://design.ns.nl/4a05a30ad/v/latest/p/12345b-link) or [Button](https://design.ns.nl/4a05a30ad/v/latest/p/15d4f2-button) instance, so it can carry its own background without inheriting the offsets those components apply elsewhere.

- **Default** `state: default`: at rest.
- **Pressed** `state: pressed`: while held.
- **Focus** `state: focus`: while focused.

### Badge

![Badge on icon action](https://raw.githubusercontent.com/gertjankooy/nessie/docs/zeroheight-push-pipeline/zeroheight/assets/section-heading/badge.png)

- **Dot** `property: badge`: a boolean on the icon action; the dot is its only permitted form, offset 2 from the top and 2 from the right, sitting outside the component bounds.

Use the dot to flag that a collapsed section holds new or changed content worth expanding, such as a section that gained items since the user last looked. Reserve it for genuinely new content and clear it once the section is opened; it never conveys a count.

Restricted to the dot form. A counter or text badge overlaps the icon at this size and must not be used here. See [Badge](https://design.ns.nl/4a05a30ad/v/latest/p/540677-badge).

### Divider
- **Divider** `property: divider`: a boolean rule closing a collapsed section against what follows.

Available on the collapsed state only. When the section expands, the content itself provides that separation and the divider is hidden.

## Placement

![Section rhythm example 1](https://raw.githubusercontent.com/gertjankooy/nessie/docs/zeroheight-push-pipeline/zeroheight/assets/section-heading/section-rhythm-1.png)
*The gap between sections stays constant whether a section is collapsed or expanded.*

- Default spacing between sections is `applied.space.app.container.stack.control` (32), whether the section is collapsed or expanded, so the rhythm doesn't change as sections open and close.
- Override to `applied.space.app.container.stack.default` (24) for denser layouts where keeping content scrollable matters more, such as search results.
- Place the heading **outside** the content container it labels, directly against it, with no extra spacing and 0 stacking.
- Keep the heading larger than any heading inside the container below it. The Section Heading is `heading4` (18), a following subheading is `labelDefaultStrong` (16), and labels inside the section's own items are smaller again.

![Section rhythm example 2](https://raw.githubusercontent.com/gertjankooy/nessie/docs/zeroheight-push-pipeline/zeroheight/assets/section-heading/section-rhythm-2.png)

See the layout fundamentals for the Group and SubGroup model this sits in.

| Do | Don't |
| :--- | :--- |
| ![Heading outside the container](https://raw.githubusercontent.com/gertjankooy/nessie/docs/zeroheight-push-pipeline/zeroheight/assets/section-heading/do.png) | ![Heading nested inside the container](https://raw.githubusercontent.com/gertjankooy/nessie/docs/zeroheight-push-pipeline/zeroheight/assets/section-heading/dont.png) |
| **Do.** Keep the heading outside the container it labels. | **Don't.** Don't nest the heading inside the container. |

## Behavior

- Expanding and collapsing toggles the content slot. The divider hides on expand and returns on collapse.
- Sections expand independently, so several can be open at once. Accordion behavior, where opening one closes another, is deliberately avoided, matching [Expandable](https://design.ns.nl/4a05a30ad/v/latest/p/90132b-expandable).

### Sizing
- The title takes up to 2 lines when expanded. Actions bottom-align so they stay close to the content slot.
- When collapsed, the title truncates to 1 line.

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
