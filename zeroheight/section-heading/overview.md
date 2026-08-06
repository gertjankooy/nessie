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

The number of visible items is not the deciding factor. A homepage widget showing one ticket is still a window into "Tickets" and keeps its heading, while a single disruption tile is the section itself and doesn't get one.

**Stability.** If a section could hold more than one item on another day, keep the heading permanently rather than showing it only once a second item arrives. A heading that appears and disappears as data changes shifts the layout and breaks the section map that screen-reader users build between sessions.

[Image: **The two cases, side by side.** Two phone screens at the same scale, both showing exactly one item. Left: a homepage "Tickets" section with an "All tickets" label action and one ticket tile. Right: a disruption section, a single dynamic tile carrying its own title, with no Section Heading above it. Caption each: "Window into a collection, so it takes a heading" and "The section itself, so it doesn't".]

## Anatomy

![Section Heading anatomy](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight/assets/section-heading/anatomy.png)

*Expanded and collapsed. The divider belongs to the collapsed state only.*

- **Heading**: the section title, `heading4` carrying the heading role.
- **Section action** (optional): a label action, an icon action, or both, trailing the heading.
- **Spacer** (optional): the gap between the heading row and the content slot.
- **Divider** (optional): a rule closing the section, available on the collapsed state only.
- **Content slot** (optional): holds the section's content when expanded.

The content slot exists for composition in Figma. In code the slot is optional, and content may be stacked directly after the heading at the section spacing given under Placement.
