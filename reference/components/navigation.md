# NESSIE Navigation Components (App / iOS-first)

Source of truth: NS ZeroHeight design system. Use ONLY the documented App variants below. Never invent variants, props, or token names. iOS-first; `> **Android:**` callouts flag platform divergences.

---

## Top Bar
**When to use:** Display the current screen's title, a back option, and contextual actions; carry NS branding consistently across the app.
- **Text** flavor: standard screens with a title.
- **Logo Only** flavor: entry points where branding belongs and there is no need for a title, back option, or contextual action.
- **Header** flavor: hero screens — large, collapsible heading that shrinks on scroll (use Heading XL for a bolder heading).

**Variants:**
- Flavors: `Text` (title), `Logo Only` (centered NS logo), `Header` (large/collapsible).
- Styles: `Default` (brand), `Modal` (neutral), `Transparent`.

**Anatomy / slots:**
- Left: back option (returns to previous screen).
- Center: title (Text flavor) or NS logo (Logo Only).
- Right: contextual actions slot — icon button(s) or text action. Text is preferred; use an icon only when its meaning is unambiguous. Never mix more than is needed.
- Optional: divider, status bar above it, Tabs combined below it.

**Tokens used:** surface fill `contentBackgroundDefault`; title via Heading semantics (`NesHeading`), Heading XL = type size 20 for Header flavor; divider uses Default divider (1px).

**Accessibility:**
- Baked in: title rendered through Heading semantics.
- Designer must supply: a text label in code for any icon contextual action (and the back button) so screen readers announce it — coordinate with development.

**iOS-first notes:** Height and font-size follow the OS guidelines; the bar visually unifies with the iOS status bar. Back navigation pairs the nav-bar back button with the iOS swipe-back gesture. On scroll the bar stays in place; by default it sits at the same elevation as content (Modal style can show a divider only once scrolled).
> **Android:** Back handled via system back + top bar back icon. Status bar styling differs; Figma Library provides both iOS and Android status bars.

**Don't:**
- Don't use Logo Only when a title, back, or action is required.
- Don't write long titles — keep them short; overflow truncates.
- Don't add an icon action whose meaning isn't clear; prefer text.

---

## Tabs
**When to use:** Navigate between groups of related content at the same hierarchy level.
- **Default:** the standard starting point for tabs (top of screen, can combine visually with the Top Bar).
- **Inline:** embed tabs inside a specific interface region (e.g. within a Tile/card/section), optionally with a divider.

**Variants:** `Default`, `Inline`. Inline only: optional `divider`. Items are plain string labels.

**Anatomy / slots:** Row of string-label tab items + a selection indicator under the active tab.
- Default: dark background, brand-secondary indicator.
- Inline: light background, brand-primary indicator, optional divider.

**Tokens used:** Default indicator → brand secondary; Inline indicator → brand primary; min tab width 48px, min tab height 48px (56px when Tabs are the only bar with no Top Bar above).

**Accessibility:** Labels must clearly describe destinations. Keep 2–3 tabs to limit cognitive load; never fewer than 2.

**iOS-first notes:** Tabs stay in place on scroll; same elevation as content by default, with a subtle shadow once content slides under. If labels overflow the viewport, the row scrolls horizontally.

**Don't:**
- Don't use tabs for sequential/step-by-step content, for comparing info across tabs, or for unrelated content (use separate views).
- Don't exceed ~3 tabs or show fewer than 2.
- Don't apply the Inline-only divider to Default tabs.

---

## Bottom Navigation
**When to use:** Persistent bar to switch between 3–5 top-level destinations accessible from anywhere in the app.

**Variants:** Single bar component; each item has Inactive / Active states. Items take an icon, a label, and an optional Badge.

**Anatomy / slots:** Navigation items, each = icon + label, optional badge. Active state shown by a filled or thicker-line icon plus color (never color alone).

**Tokens used:** selected/active content color → `brandSecondaryDefault`; default elevation 0; surface blends with the device home/navigation bar area below.

**Accessibility:**
- Baked in: active state is conveyed by icon weight/fill, not color only.
- Designer/dev must supply: when an item has a Badge, set the badge `contentDescription` to null and fold its meaning into the item's own description so assistive tech reads item + badge as one element (e.g. "Mijn reizen, There are 2 new items").

**iOS-first notes:** When content scrolls under it, a subtle shadow indicates elevation. May be temporarily covered by Bottom Sheets, keyboards, or flow elements — but never permanently obstructed. When content is reachable from multiple tabs, navigate within the current tab's stack; do not switch the active tab as a side effect.
> **Android:** Visually blends with the Android navigation bar below (iOS blends with the home indicator).

**Don't:**
- Don't use for fewer than 3 or more than 5 destinations.
- Don't change the active tab as a side effect of in-content navigation.
- Don't permanently obstruct the bar.

---

## Bottom Sheet
**When to use:** Present supplementary content over the primary UI region for self-contained processes with a clear start and end; stage complex/feature-rich content to keep the main screen simple.

**Variants / configuration:**
- **With background overlay:** content becomes secondary; blocks interaction with the underlying region; sits on top of the Bottom Navigation.
- **Without background overlay:** content refers directly to the primary region; allows interaction underneath; sits behind the Bottom Navigation; cannot be dismissed (it is part of the UI).
- Snap positions: `Hidden`, `Collapsed`, `HalfExpanded`, `Expanded` (fullscreen).

**Anatomy / slots:** Primary UI region (below) + sheet layer on top. Sheet has a handle, header slot (title, optional subtext, optional icon, close/collapse option), content slot, footer slot. Header and footer become sticky when fullscreen; content scrolls underneath.

**Tokens used:** internal padding 16px (`nesSpacing4`); heading XL (size 20) by default, drops to LG (18) when subtext is added; surface fill `#FFFFFF`.

**Accessibility:** Header heading identifies the task so context is clear on entry. Keep headings short.

**iOS-first notes:** Initial vertical position preferably capped at ~50% of screen height so top content stays reachable; sheets taller than 50% can be dragged full-screen and scroll internally. Dismissal (overlay variant): tap overlay, tap close, swipe down, or tap an in-sheet action. Without-overlay sheet returns to initial state via collapse option or swipe down.
> **Android:** Also dismissable via the system Back button. iOS uses native sheet detents (medium/large); Android uses modal bottom-sheet snap positions.

**Don't:**
- Don't open a sheet already fullscreen — it puts top content out of reach.
- Don't use for long multi-step tasks/forms — use a separate screen.
- Don't place a with-overlay sheet behind the Bottom Navigation, or a without-overlay sheet on top of it.

---

## Dialog
**When to use:** Interrupt the user for critical info requiring attention, a decision, or acknowledgment before continuing, or for errors blocking operation — without losing the underlying page's context. Destructive actions always confirm via a Dialog.

**Variants:** Alert dialog. Confirm button required; dismiss button optional; title and text. Buttons must be NESSIE Buttons (Tertiary by default) and auto-stack vertically when they don't fit side by side.

**Anatomy / slots:** Title (heading) + body text + confirm button + optional dismiss button. Dismiss request fires on outside tap / back press — not on button clicks.

**Tokens used:** Surface `#FFFFFF`; buttons use Button tokens (see buttons.md).

**Accessibility:** Heading states the dialog's purpose; reuse wording from the triggering component. Avoid ambiguous headings like "Are you sure?". Keep content short.

**iOS-first notes:** There is no custom NESSIE Dialog for iOS — use the native iOS Alert (Apple HIG) and the native components from the Figma Component Library.
> **Android:** Use the `NesAlertDialog` component; outside tap and the Back button both trigger the dismiss request.

**Don't:**
- Don't build a custom dialog on iOS — use the native Alert.
- Don't use vague/ambiguous headings.
- Don't trigger a destructive action without a confirming Dialog.
