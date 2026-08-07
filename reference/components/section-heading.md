---
component: Section Heading
category: content
status: partial
aliases: [Section Header, Headings, Subhead]
zeroheight_page_id: 8842376
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/57cffa-section-heading
figma_node: "20300:25645"
last_synced: 2026-08-07
related: [expandable, list-items, tiles, badge, dividers, button]
gaps: []
---

# Section Heading

Names a section of content and hosts the actions that belong to that section as a whole.

## Usage
### Use when
- The section carries an action scoped to the whole group: show all, collapse and expand, or dismiss. A section-scoped action has nowhere else to live, and an action on an item means something different from an action on the set.
- The section is a named collection that its own content doesn't name. A ticket names a journey, not the category "Tickets", so the category name exists only in the heading.
- Several sections need headings and at least one of them has actions. Then use it on all of them, so the rhythm stays consistent.

### Don't use when
- The content is FAQ-like, or the expansion is purely textual. Use [Expandable](expandable.md).
- You need a heading between paragraphs of copy. Use a heading [type style](../tokens/typography.md) with the heading role applied.
- The section holds a single self-naming item with nothing larger behind it and no section-scoped action. A disruption tile that already carries its own descriptive title needs no heading above it.

Either trigger above is sufficient on its own. The test for the second one: if you deleted the heading, would a user still know what this group is? For a ticket, no. For a disruption tile, yes.

The number of visible items is not the deciding factor. A homepage widget showing one ticket is still a window into "Tickets" and keeps its heading, while a single disruption tile is the section itself and doesn't get one.

**Stability.** If a section could hold more than one item on another day, keep the heading permanently rather than showing it only once a second item arrives. A heading that appears and disappears as data changes shifts the layout and breaks the section map that screen-reader users build between sessions.

## Anatomy
Numbers match the callouts in the anatomy diagram.

| # | Part | Role |
| :-- | :--- | :--- |
| 1 | **Heading** | The section title, `heading4` carrying the heading role. |
| 2 | **Section action, label** (optional) | A text action trailing the heading. |
| 3 | **Section action, icon** (optional) | An icon action trailing the heading. |
| 4 | **Divider** (optional) | A rule closing the section, available on the collapsed state only. |
| 5 | **Content slot** (optional) | Holds the section's content when expanded. |
| | **Spacer** (optional) | The gap between the heading row and the content slot; not called out in the diagram. |

The content slot is a content composable that stacks against the heading when the spacer is enabled. It is optional: content may instead be stacked directly after the heading at the section spacing given under Placement.

## Configurations
### Content slot
- **Collapsed** `variant: collapsed`: the heading row on its own. The divider is available, but optional, in this state.
- **Expanded** `variant: expanded`: heading row, spacer, then the content slot. The divider is hidden.

### Section action (icon)
An icon-only [Button](button.md) at the tiny (32) size, inheriting its states, touch behavior, and disabled handling. Only the glyph changes:

- **Expand** `variant: chev-down`: opens the section.
- **Collapse** `variant: chev-up`: closes the section.
- **Dismiss** `variant: close`: removes the section.
- **More options** `variant: dots`: opens further actions.

### Section action (label)
A text action trailing the heading. It is a purpose-built action rather than a [Link](link.md) or [Button](button.md) instance, so it can carry its own background without inheriting the offsets those components apply elsewhere.

- **Default** `state: default`: at rest.
- **Pressed** `state: pressed`: while held.
- **Focus** `state: focus`: while focused.

### Badge
- **Dot** `property: badge`: a boolean on the icon action; the dot is its only permitted form.

Use the dot to flag that a collapsed section holds new or changed content worth expanding, such as a section that gained items since the user last looked. Reserve it for genuinely new content and clear it once the section is opened; it never conveys a count.

Restricted to the dot form. A counter or text badge overlaps the icon at this size and must not be used here. See [Badge](badge.md).

### Divider
- **Divider** `property: divider`: a boolean rule closing a collapsed section against what follows.

Available on the collapsed state only. When the section expands, the content itself provides that separation and the divider is hidden.

## Placement
- Default spacing between sections is `applied.space.app.container.stack.control` (32), whether the section is collapsed or expanded, so the rhythm doesn't change as sections open and close.
- Override to `applied.space.app.container.stack.default` (24) for denser layouts where keeping content scrollable matters more, such as search results.
- Place the heading **outside** the content container it labels, directly against it, with no extra spacing and 0 stacking.
- Keep the heading larger than any heading inside the container below it. The Section Heading is `heading4` (18), a following subheading is `labelDefaultStrong` (16), and labels inside the section's own items are smaller again.

See [App Layout](../fundamentals/layout.md) for the Group and SubGroup model this sits in.

## Behavior
Sections expand independently, so several can be open at once. Accordion behavior, where opening one closes another, is deliberately avoided, matching [Expandable](expandable.md).

### Sizing
- The title takes up to 2 lines when expanded. Actions bottom-align so they stay close to the content slot.
- When collapsed, the title truncates to 1 line.

### Motion
Expanding and collapsing use 350ms with `ease.in-out-quint`. Under reduced motion the section changes state instantly. See [Motion](../tokens/motion.md) guidelines.

> **Android:** uses a spring animation with stiffness 400 rather than a duration-and-curve pair.

## Best practices
- Prefer a single section-scoped action; two are supported where genuinely needed.
- Don't nest Section Headings.

## Content guidelines
- Write the title as a noun or noun phrase naming the category of content below it, never a question.
- Sentence case, no ending punctuation.
- **Length:** aim for 1–3 words and a single line. Treat roughly 25 characters as the practical ceiling before the collapsed title starts truncating on a small screen.
- Name the destination rather than the gesture in a label action. Prefer "All tickets" over "Show all" when the heading alone doesn't make the destination obvious, and fall back to "Show all" when it does.

Follow the UX-writing scorecard and NS voice in [../content/index.md](../content/index.md), and the link wording rules in [../content/link.md](../content/link.md).

## Accessibility
- The title carries the heading **role**, not just `heading4` typography, so the heading gesture and rotor can step section to section and skip over the content between them. `1.3.1` `2.4.6`
- Focus is **per element inside a traversal group**, so the heading and each action are separately focusable. Do not merge the section into one focusable node: it always contains interactive children, and merging fails outright once there are two actions. `1.3.2`
- Announce the action **after** the heading text, so the section is identified before the thing you can do to it.
- **Reading order.** Take a Tickets section with a "Show all" label action and a collapse control, currently expanded. A screen reader steps through three separate nodes:
  1. "Tickets, `heading`"
  2. "All tickets, `button`"
  3. "Collapse tickets, `button`, expanded"

  The heading never absorbs the action labels into one announcement. Keeping them separate is the point of the traversal group. `1.1.1` `4.1.2`
- With two actions, each needs its own distinct, specific label: "Expand tickets" and "Dismiss tickets", not two controls both announced as "button". `2.5.3`
- Expose the expanded and collapsed state of an expandable section, and update it on toggle. `4.1.2` `4.1.3`
- Icon-only actions need a text alternative naming the section they act on: "Collapse tickets", not "Collapse". `1.1.1`
- **Font scaling at 200%:** the title wraps to its second line rather than truncating. The second line exists for this reason, because at 150% on a small screen a truncated title leaves almost nothing readable. Actions stay bottom-aligned as the title grows and never overlap it. `1.4.4` `1.4.10`
- Respect reduced motion. Expanding and collapsing degrade to an instant state change when the OS requests it.
- **Touch area.** The icon action measures 32×32 but carries a minimum 44×44 touch area, extending beyond the visible control on all sides. That clears the 24 minimum comfortably. Keep surrounding spacing clear so the touch areas of neighbouring controls never overlap. `2.5.8`

Follow the cross-cutting rules in [../accessibility.md](../accessibility.md).

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/57cffa-section-heading (page `8842376`, synced 2026-08-07)
- Figma: `20300:25645` (🚄 NES App Components → Section Heading)
