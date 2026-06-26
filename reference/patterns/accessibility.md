# NS NESSIE — Accessibility (design-level rules)

> Design/audit a11y for NESSIE screens. Target: **WCAG 2.2 AA**. iOS-first. Reframed as design guidance, not code. Source of truth: NS Nessie accessibility docs + staged references. Never invent guidance.

## Why it matters

In the Netherlands ~1 million travellers face accessibility challenges (visual, auditory, motor). Train travel is essential to their participation in society, and the European Accessibility Act (EAA, in force June 2025) makes this a legal requirement, not only a moral one. Accessible products also improve the experience for everyone — access needs can be permanent, temporary, or situational (aging eyes, a broken arm, carrying a baby).

The four WCAG pillars: **Perceivable, Operable, Understandable, Robust.** Accessibility is a shared responsibility across the whole team, not a single role's job.

## Core principle: Nessie bakes in role/target/heading; you supply meaning

Reach for the `Nes*` component so it inherits **role, touch-target size, and heading semantics for free.** Your job is to supply the dynamic, localized **meaning** the system cannot invent (labels, content descriptions, state names).

> **Rationale:** Styling a plain text node with heading typography does NOT make it a heading. Use the actual heading component, or assistive tech can't navigate it.

### What Nessie gives vs what you must supply
| Element | Nessie bakes in | You supply |
| --- | --- | --- |
| Heading / Top bar | Heading semantics + color | The text (use the heading component, not styled text) |
| Button | 48-target + Role.Button; label defaults to text | Meaningful text |
| IconButton | Target + role | Mandatory content description |
| Toggle / Checkbox / Radio | Role + state wiring | Label + state name |
| Icon | Role when described | Description for meaningful icons; null for decorative |
| ListItem with onClick | Tap handling (NOT button role) | Role + label |
| Badge | Shape/size | Description of the count ("3 unread") |
| Loader | Localized default description | Keep it |
| MessageInline / Bar | Icon + text + type description (status not color-only) | Label / subtext copy |

## Contrast & color

- On colored status/emphasis surfaces, use the matching **`*Contrast` foreground family** (e.g. `textInfoContrast` on `bgInfoContrast`). The default text token may fall below 4.5:1.
- Pair a foreground with its **own** token family. **Never** branch on dark mode manually — use semantic tokens.
- Body/UI text must meet **4.5:1**. Informative icons/graphics meet at least **3:1**.
- Size text with **typography tokens** (dynamic-type / sp-aware), never hardcoded sizes — supports Resize Text.
- **Never rely on color alone** for status: pair an icon shape change + worded label. (A red→green color swap alone fails colorblind users; change the icon, e.g. ✕ → ✓.)

## Icons: informative vs decorative

- **Informative icon** = if a user can't perceive it, they lose information needed to do a task (logos, graph/data icons, filetype icons like a PDF download). Must have a **text alternative**; minimum **3:1** contrast.
- **Decorative icon** = purely cosmetic. **Hide from assistive tech.**
- Write the alternative as the *meaning*, not the shape: "Checkmark", **not** "Checkmark icon".
- Interactive icons/logos must have a proper **role and name** (accessible label).

## Touch targets

- Minimum target **48 (dp/pt) on all platforms.** Nessie standardizes on 48 even where the iOS guideline says 44.

> **iOS:** Native guidance is 44pt, but NESSIE uses 48 everywhere for consistency — do not size down to 44.

## Headings & structure

- Use real heading components so the heading gesture/rotor can navigate; styled text is not a heading.
- In lists, mark **each item a heading** so the heading gesture steps card-to-card.
- Do **NOT** mark tab rows as headings — tabs are controls (Role.Tab).
- **Section box:** wrap heading + body into one focusable, heading-navigable node with a summary description. But do NOT merge a section that contains its own interactive children — group those with a traversal-group instead.
- **Composite card** that is one tap target: consolidate into one node (clear-and-set-semantics); re-add any child actions.

## Focus order & status announcements

- Focus/traversal order must follow the logical reading order; use traversal-group to keep grouped content together.
- Announce loading/error transitions via **live regions** — state swaps are silent otherwise:
  - **Polite** for progress / non-blocking updates.
  - **Assertive** for blocking errors.

## Labels (writing)

- Provide clear visual labels **by default**; use accessibility labels as a **last resort**, only when needed (interactive icons/logos, extra context, breadcrumbs).
- **Label in name:** the accessible name must contain the visible label text. If a field shows "Zoeken", its accessible name must include "Zoeken" (critical for voice-control users).
- Add context when the visible label is vague: "Lees meer" → "Bestel hier je kaartje tussen Amsterdam en Berlijn".
- Caution with `aria-label` / `aria-labelledby`: they **overwrite** other naming methods and even the element's own contents — use deliberately.

## Enforcement / handoff

- Stay on `Nes*` primitives (a lint rule flags raw Material/UIKit equivalents). Never suppress without justification + a11y review.
- Server-driven UI: the accessibility description is an explicit contract field per node — the client can't invent it; the contract must guarantee non-empty labels.
- Coordinate with development at handoff on what they need to implement a11y correctly.

## Per-concern audit checklist

**Contrast & color**
- [ ] Text ≥ 4.5:1; informative icons/graphics ≥ 3:1.
- [ ] Colored surfaces use the matching `*Contrast` foreground family.
- [ ] No status communicated by color alone (icon shape + word present).
- [ ] Text uses typography tokens; no hardcoded sizes; survives Resize Text.

**Components & roles**
- [ ] Every interactive element is a `Nes*` primitive (no raw Material/UIKit).
- [ ] IconButtons have content descriptions; decorative icons are hidden.
- [ ] ListItem-with-onClick has button role + label added.
- [ ] Badges describe their count; toggles/checkboxes/radios have label + state name.

**Targets**
- [ ] All tap targets ≥ 48.

**Structure & headings**
- [ ] Headings use real heading components (not styled text).
- [ ] List items are headings; tab rows are NOT headings.
- [ ] Section boxes merged into one navigable node (unless they contain interactive children → traversal-group).

**Focus & status**
- [ ] Focus order matches reading order.
- [ ] Loading/error states announced via live regions (Polite progress / Assertive blocking).

**Labels**
- [ ] Accessible name contains the visible label (label-in-name).
- [ ] Vague link/button labels given extra context.
- [ ] Accessibility labels used only where a visible label can't do the job.

## WCAG touchpoints referenced
1.1.1 Non-text Content · 1.3.1 Info & Relationships · 1.4.1 Use of Color · 1.4.3 / 1.4.11 Contrast · 1.4.4 Resize Text · 2.4.6 Headings & Labels · 2.5.8 Target Size · 4.1.2 Name/Role/Value · 4.1.3 Status Messages.
