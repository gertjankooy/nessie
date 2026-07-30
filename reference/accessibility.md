# NS NESSIE — Accessibility (design-level rules)

> Design/audit a11y for NESSIE screens. Target: **WCAG 2.2 AA**. iOS-first. Reframed as design guidance, not code. Source of truth: ZeroHeight Guidelines → ACCESSIBILITY (pages `5784505` overview, `5784836` checklist per role, `5868110` getting started, `5891441` accessibility labels), synced 2026-07-22. Never invent guidance.

## Why it matters

In the Netherlands ~1 million travellers face accessibility challenges (visual, auditory, motor). Train travel is essential to their participation in society, and the European Accessibility Act (EAA, in force June 2025) makes this a legal requirement, not only a moral one. Accessible products also improve the experience for everyone — access needs can be permanent, temporary, or situational (aging eyes, a broken arm, carrying a baby).

The four WCAG pillars: **Perceivable, Operable, Understandable, Robust.** Accessibility is a shared responsibility across the whole team, not a single role's job.

## Shared responsibility & process

Every role owns a slice, and the roles look to each other to get their slice right: **Designers** integrate a11y into the design; **Content specialists** craft clear, navigable copy and text alternatives; **Developers** write accessible code from the ground up; **Product owners** prioritise it; **Testers** verify it. As a designer you're *responsible* for contrast, structure/headings, meaningful sequence, descriptive labels, and error clarity — and *aware* of the criteria other roles own (keyboard/switch order, text alternatives) so you can flag them.

Build it in rather than bolting it on:
- **Ask at the start of every feature:** "how will we make this accessible?" — alongside the usual value/security/privacy questions.
- **Make it a recurring ritual** — in refinement, review, and retro — and add it to your Definition of Ready & Done.
- **Boy-scout principle:** leave each screen a little more accessible than you found it. Small, continual improvements beat a big one-off audit — write one alt text, fix one vague label, correct one non-heading.
- **Perfect is the enemy of good:** partial improvement always beats waiting for a perfect pass.

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

**Interaction, layout & errors** (design-relevant criteria from the role checklist, app-framed)
- [ ] **Meaningful sequence** — reading/focus order matches the visual/logical order; know where a floating button lands for a screen reader.
- [ ] **Orientation** — the screen works in both portrait and landscape; nothing is locked to one orientation without cause.
- [ ] **Images of text** — real text set with typography tokens, not text baked into an image (it can't resize or be read aloud).
- [ ] **Content on hover/focus** — transient content (tooltips, popovers) is dismissible, doesn't auto-vanish, and doesn't obstruct what's underneath.
- [ ] **Focus visible** — the focused element is always clearly indicated for keyboard/switch-control users.
- [ ] **Labels or instructions** — inputs have persistent labels; placeholder text is never the only instruction.
- [ ] **Error identification & suggestion** — errors are detected, described in text, and paired with a concrete fix (ties to `patterns/feedback-states.md`; don't rely on colour alone).
- [ ] **Link purpose in context** — link text describes its destination; no "Klik hier"/"Lees meer"/"Volgende" on their own (see `content/link.md`).
- [ ] **Multiple ways** — more than one route to key content (navigation + search) where it matters.

## WCAG touchpoints referenced
1.1.1 Non-text Content · 1.2.x Media alternatives (captions / audio description) · 1.3.1 Info & Relationships · 1.3.2 Meaningful Sequence · 1.3.4 Orientation · 1.4.1 Use of Color · 1.4.3 / 1.4.11 Contrast · 1.4.4 Resize Text · 1.4.5 Images of Text · 1.4.12 Text Spacing · 1.4.13 Content on Hover or Focus · 2.4.4 Link Purpose (In Context) · 2.4.5 Multiple Ways · 2.4.6 Headings & Labels · 2.4.7 Focus Visible · 2.5.3 Label in Name · 2.5.8 Target Size · 3.2.3 Consistent Navigation · 3.3.1 Error Identification · 3.3.2 Labels or Instructions · 3.3.3 Error Suggestion · 4.1.2 Name/Role/Value · 4.1.3 Status Messages.

## Where to get help
- NS **#accessibility** Slack channel for community support.
- NS **Team Toegankelijkheid** (`programma.toegankelijkheid@ns.nl`) for specialised assistance.
- WCAG 2.2 AA [quick reference](https://www.w3.org/WAI/WCAG22/quickref/) for the authoritative criteria.
