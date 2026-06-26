# NESSIE Button Components (App / iOS-first)

Source of truth: NS ZeroHeight design system. Use ONLY the documented App variants below. Never invent variants, props, or token names. iOS-first; `> **Android:**` callouts flag platform divergences.

> **No disabled state.** NESSIE intentionally omits disabled buttons (poor a11y/contrast, not focusable). Let users interact, then give feedback via an Attention block / Error message. (A loading state exists; a greyed-out "disabled" style does not.)

---

## Button
**When to use:** Trigger important actions — submit/confirm forms, cancel, reset, open/close a modal or section, move through a flow.
- **Brand:** entering and progressing within a purchase funnel.
- **Primary:** the most important action.
- **Secondary:** less important actions.
- **Tertiary:** least important actions (also the default partner button in a Button Group).

**Variants:**
- Type: `Brand`, `Primary`, `Secondary`, `Tertiary`.
- Size: `Default`, `Compact`.
- Flags: `destructive`, `inverted`, `isLoading`, leading/trailing icon. (`wrap` controls width — see below. No `disabled`.)
- iOS style modifiers: `.buttonStyle(.brand/.primary/.secondary/.tertiary)`, with `-Inverted` / `-Destructive` variants; `.stretchable()` to fill width.

**Anatomy / slots:** Label, optional single icon. Icon rules: at most one icon, placed before the label; exception is the trailing `Chevron Right` to indicate a next step. Never use an icon and a chevron together. Funnel buttons carry a `Cart` icon; chevrons only appear inside the funnel and only on Brand buttons. Icons must reinforce meaning, never decorate.

**Sizing & width:**
- Default height 48px; Compact height 32px (touch target padded to 48px).
- Width: Full width (default, fills container), Half width, or Auto (fits label). Figma `wrap`: full-width when off, shrink-to-content when on.
- Minimum width 80px (set Width = Full width, then scale back to 80px).

**Tokens used:** Brand/Primary use solid brand fills; destructive turns the button red; inverted variants exist for placement on colored/dark backgrounds. Spacing: 16px between adjacent buttons (min 8px). Touch target ≥48px.

**Accessibility:**
- Baked in: ≥48px touch targets; loading replaces label with a spinner while keeping color.
- Designer must supply: confirmation flow for destructive actions; correct inverted variant for contrast on the chosen background (Secondary/Tertiary on yellow fail contrast — avoid).

**States / behaviour:**
- **Loading (`isLoading`):** keeps its color, replaces the label with a spinner; Tertiary has no spinner (it only appears beside another button). With multiple buttons, only the pressed one spins.
- **Destructive:** Primary/Secondary/Tertiary can each be destructive (turn red); pick emphasis by how primary the destructive step is. Destructive = permanent + hard to recover (e.g. Delete account, Remove OV-chipkaart). Cancel/Close/Logout are NOT destructive.
- **Inverted:** for placement on colored/dark backgrounds.

**iOS-first notes:** Use `.buttonStyle(...)` + `.stretchable()`; size `.compact` available. Primary actions should be thumb-reachable.

**Don't:**
- Don't add a disabled state.
- Don't combine an icon with a chevron, or place a non-chevron icon after the label.
- Don't use chevrons outside the funnel or on non-Brand buttons.
- Don't put Secondary/Tertiary on a yellow background (contrast fail).
- Don't fire a destructive action without confirmation.

---

## Icon Button (Icon only)
**When to use:** Last resort when there isn't room for a labeled button, and the icon alone clearly conveys the action.

**Variants:** Same types as Button — `Brand`, `Primary`, `Secondary`, `Tertiary`; same `Default`/`Compact` sizes and `destructive` / `inverted` / `isLoading` flags.

**Anatomy / slots:** Single icon, no visible label.

**Tokens used:** Same fills/tokens as the matching Button type; touch target ≥48px.

**Accessibility:** A visually hidden label (`accessibilityLabel` on iOS / `contentDescription` on Android) is MANDATORY so assistive tech announces the action — coordinate with development.

**iOS-first notes:** `NesButton(icon:, accessibilityLabel:, ...)`.
> **Android:** `contentDescription` is required.

**Don't:**
- Don't ship an icon button without an accessible label.
- Don't use one when the icon's meaning is ambiguous — use a labeled button.

---

## Floating Button
**When to use:** When the call-to-action must stay visible while scrolling or sit on top of maps.

**Variants:** Type `Brand` (default) and `Primary` (documented examples). Optional icon + text; `expanded` toggles whether the label shows; default shape is a circle. iOS: apply `.buttonType(.floating)`.

**Anatomy / slots:** Icon and/or text in a floating, circular-by-default container; expands to reveal a label.

**Tokens used:** Brand/Primary fills as per Button type; elevated above content.

**Accessibility:** ≥48px touch target; if icon-only, supply a hidden label like an Icon Button.

**iOS-first notes:** Use `.buttonType(.floating)` modifier; overlays content/maps and persists on scroll.

**Don't:**
- Don't use it for low-priority actions that don't need to stay visible.
- Don't leave an icon-only floating button without an accessible label.

---

## Button Group
**When to use:** Combine 2 (ideally) — up to 3 — related actions for the user to choose from.

**Variants:**
- Stack/orientation: `Vertical`, `Horizontal`.
- Composition: default is one Primary + one Tertiary. The primary may be swapped for Brand when it leads to a purchase funnel. With 3 actions: exactly one Primary, the rest Tertiary.
- Width per button: Full width, Half width, or Auto.

**Anatomy / slots:** `primaryAction` slot + `otherActions` slot. Primary action always comes first (top when vertical, far left when horizontal); alignment may be set right to convey progress.

**Tokens used:** Inherits Button tokens; 16px between buttons.

**Accessibility:** Buttons follow Button component a11y (≥48px targets, ≥8px / 16px separation).

**iOS-first notes:** `NesButtonGroup { primary } secondaryButton: { ... }` with `.groupStyle(.vertical)`; buttons use `.stretchable()`. Default width is Full width on small viewports, Auto on large; min width 80px.

**Don't:**
- Don't group unrelated actions.
- Don't include more than one Primary button.
- Don't exceed 3 actions.
- Don't reverse the order — primary action stays first.

---

## Link (Button Link)
**When to use:** For actions that should look like a link rather than a button. In-app there are no true hyperlinks — this is a button styled as a link. Common pattern: a "Read more" link placed below a short piece of text.

**Variants:** Sizes `normal` and `compact`. Optional leading icon; optional trailing subtext (e.g. file type/size). External and attachment treatments below.

**Anatomy / slots:** Text label, optional leading icon, optional trailing subtext.
- **External:** add the `External` icon when leaving the app; also add hidden text "verlaat NS app" for screen-reader users.
- **Attachment:** add an appropriate icon and trailing subtext naming the file type (and size if over 99 MB).

**Tokens used:** Link/brand text color; ≥48px touch target.

**Accessibility:** ≥48px touch target; separate touch targets by ≥8px. For external links include the hidden "verlaat NS app" text.

**iOS-first notes:** `NesLinkButton(title:, size:, leadingImage:, trailingText:)`; `size: .normal` or `.compact`.

**Don't:**
- Don't color words inside running text to make a link — it breaks touch-target sizing; place a Button Link below the text instead.
- Don't use a Link when the action should read as a button — use a Button type.
- Don't omit the External icon/hidden text when leaving the app.
