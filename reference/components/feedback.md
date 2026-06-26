# NESSIE Feedback — Components (App / iOS-first)

iOS-first reference for Claude when designing or auditing feedback/status UI in Figma Make. Use ONLY the App component variants documented here. Do not invent variants, props, or tokens. `> **Android:**` callouts flag platform divergence.

Status priority guide: pick the surface by scope — **Message Inline** (tied to a specific section/content), **Message Bar** (system-level, not the current screen), **Message Toast** (transient confirmation of the user's own action). Never rely on color alone for status: every status carries an icon + worded label, and the Message* components prepend a hidden type word ("Error:", "Waarschuwing:", "Informatief:", "Succes:") for assistive tech.

---

## Message Inline
**When to use:** Contextual low/medium-priority message inside a page or section — status, context, or a navigational action tied to specific content. Position at top of the screen if it applies to the whole screen, or at the top of the relevant section.
**Variants:**
- **Type** (`NesMessageInlineType`): `Success`, `Info`, `Warning`, `Error`. (A11y copy also references "Attention" for the warning family.)
- **Behaviour:** `Default` (`NesMessageInline`), `Dismissible` (`NesMessageInlineDismissible`), `Expandable` (`NesMessageInlineExpandable` — collapsed/expanded), `Navigate` (`NesMessageInlineNavigate` — whole message taps through to another page).
**Anatomy / slots:** 1) semantic icon (auto by type, **not customisable** in standard use) · 2) Title (≤3 lines) · 3) Body/subtext (optional for Default, mandatory for Expandable) · 4) optional CTA button · 5) Dismiss button (Default/Dismissible) · 6) Expand/collapse button + 7) chevron (Navigate). Subtext is required when a button is present.
**Tokens used:** Per-type semantic status families (bg + matching `*Contrast` foreground); pale tint surface e.g. `colors.bg.tint.primary-pale` (#f7f7f9).
**Accessibility:** Bakes LiveRegion **Polite**. Icon + text means status is not color-only. Type + title + body + variant-action announce as **one callout**; the CTA is a **separate focus target**. Variant action labels: Default "Dismiss message", Expandable "Read more"/"Read less", Navigate reads the title as a `[Button]`. Optimised for font scaling to 200%.
**iOS-first notes:** `NesMessageInline(title:).subText().messageType(.success).buttonTitle().isDismissible().onAction{}.onClose{}`; `.overrideIcon()` to replace the icon. iOS highlights the top-right variant action with the type/title/body announced as a callout attached to it. `> **Android:**` separate composables per behaviour (`NesMessageInline` / `NesMessageInlineDismissible` / `NesMessageInlineExpandable` / `NesMessageInlineNavigate`); Android highlights the **entire message box** as one element with the CTA highlighted separately. Both platforms announce the same content/order — difference is visual highlight only.
**Don't:** Don't use for system-level messages (use Message Bar) or for transient confirmation of a user action (use Toast). Don't stack two messages of the same type — combine only unrelated different types, else use progressive disclosure / dismiss-to-reveal / a single expandable. If multiple unavoidable, order by severity Error → Warning → Success → Informative.

---

## Message Bar
**When to use:** System-level or not-current-screen messages — exceptions like a train-schedule disruption or long call-center waits. Positioned directly below the Top Bar.
**Variants:** Type (`NesMessageBarType`): `Success`, `Informative`, `Warning`, `Error`, `ErrorHeavy`.
- Success: positive event. Informative: no immediate action. Warning: take action / may not work as expected. Error: needs attention. ErrorHeavy: critical, needs immediate attention.
- Flags: `isDismissible` (close button), interaction/Link (`linkLabel` / `linkText` using the Link component), `hasTopBorder` / `hasBottomBorder`, iOS `interaction: .collapse | .dismiss` + `.setCollapsed`.
**Anatomy / slots:** Status icon · label/title · optional Link · optional dismiss button · optional top/bottom border. Use the Disruption or Maintenance icon for those specific cases.
**Tokens used:** Per-type status color families with matching `*Contrast` foreground.
**Accessibility:** Prepends hidden type word ("Error:", "Waarschuwing:", "Informatief:", "Succes:") so it reads e.g. "Error: We can't connect to the internet". Icon + worded status (not color alone).
**iOS-first notes:** `NesMessageBar(title:linkText:messageType:interaction:)` with `.setCollapsed()`, `.topBorder()`, `.bottomBorder()`, `.onTapLinkText{}`, `.onTapCloseButton{}`. Default border is bottom. `> **Android:**` `NesMessageBar(type =, label =, linkLabel =, onDismiss =, onClick =)`; type also via `NesMessageBarType("success")`.
**Don't:** Don't use for content tied to the current screen (put it in main content or use Message Inline). Don't use for confirming a user action (use Toast). Use sparingly — people miss banners (banner blindness).

---

## Message Toast
**When to use:** Transient confirmation of an action the user just took, when no next step is expected (e.g. "Item removed from list"). Auto-dismisses after ~5 seconds. Enters from the bottom, centered in the viewport.
**Variants:** State (`NesMessageToastType` / `messageState`): `Default` (neutral, the standard) and `Error` (discouraged — only for errors **not** caused by the user, e.g. network loss; always shown with the Alert icon; copy ≤3 words). Default may add an optional CTA, close, and optional icon; Error may add CTA + close.
**Anatomy / slots:** Leading icon (optional, Default only — for context) · title (short) · optional CTA button · optional close. Caller is responsible for placement.
**Tokens used:** Neutral toast surface tokens; Error uses the alert/error family + Alert icon.
**Accessibility:** Prepends hidden type word like other Message components ("Error:" etc.). Note toasts are hard for low-vision/low-dexterity users (auto-disappear, not keyboard-reachable, may appear away from focus) — so never for critical/actionable info.
**iOS-first notes:** `NesMessageToast(title:messageState:)`, plus `leadingIcon:` and `buttonTitle:`. `> **Android:**` `NesMessageToast(label =, ctaLabel =, type = NesMessageToastType.Error)`; the user places the toast.
**Don't:** Don't add instructive icons to the Default type (keep it neutral) and don't pair Default with an Alert icon. Don't use Error toast for user-caused/forced errors or persistent errors — use Error Message / Message Inline / Message Bar. Don't use for critical info needing immediate action.

---

## Badge
**When to use:** Indicate a quantifiable status change or new notification on a parent element (icon, tab, button). Counter variant for counts; flag variant (no counter) for a plain status dot.
**Variants:** `NesBadgeVariant` (Android) / style (iOS): `Brand`, `Default`, `Important`, `Subtle`, `SubtleInverted`, `Success`. Content modes: counter (`count`), text/title (`text` / `.title`), or flag (no counter). Blue = default; red (`Important`) reserved for importance.
**Anatomy / slots:** Small shape positioned relative to a child element (default top-right). On buttons, the badge center aligns to the top of the button. Counter shows the number; "9+" when count exceeds 9; hidden at 0.
**Tokens used:** Per-variant badge color tokens.
**Accessibility:** `contentDescription` is **required** — a bare number lacks context, so describe it ("There are 5 unread messages", not "5"). When badging a nav item, set the badge's own `contentDescription` to null and put the combined description on the parent so AT reads item + badge as one element.
**iOS-first notes:** `NesBadge(style: .brand).count(3)` / `.title("…")`; flag = `NesBadge(style: .default)`. `> **Android:**` `NesBadge(contentDescription =, variant =, count =/text =)`; on Bottom Navigation set `useLegacySemanticsForBadge = false` and merge semantics onto the nav item.
**Don't:** Don't show a badge when the count is 0. Don't show a bare number without descriptive hidden text. Don't use red except to convey importance.

---

## Loader
**When to use:** Indeterminate waits over ~3 seconds where the result shape is unknown — full screen, inside a card/modal, next step in a flow, or large server fetches.
**Variants:** Size (`NesLoaderSize` / iOS size): `Compact`, `Default` (start here), `Large`. Unified visual across iOS and Android.
**Anatomy / slots:** Spinner only. Default is the starting size; use Compact when space is tight.
**Tokens used:** Brand/spinner color tokens.
**Accessibility:** Ships a localized default `contentDescription` — **keep it** (don't blank it). Announce loading transitions via a Polite live region.
**iOS-first notes:** `NesLoader(size: .normal)` (Default) / `.compact`. `> **Android:**` `NesLoader(size = NesLoaderSize.Default)`.
**Don't:** Don't use for waits under 3 seconds. If triggered by a button, place the spinner in the button and disable the button's action while it shows. If only part of the page updates, place the spinner there. Use Skeleton instead when the content shape is known.

---

## Skeleton
**When to use:** Loading state of ≳2 seconds **when you know the shape** the data will take — placeholder matching the upcoming layout. Improves perceived performance by focusing attention on progress.
**Variants:** Shape (`NesSkeletonShape`): `rounded`/`square`, `circle`, `heading`, `text`. Text shape supports an adjustable line count (2–5; Android `textLines`).
**Anatomy / slots:** Animated placeholder block(s). Compose multiple skeletons (with spacing-scale gaps) for paragraphs; size via spacing scale and border-radius tokens.
**Tokens used:** Spacing scale tokens (height/width), border-radius tokens for shape; placeholder fill + shimmer.
**Accessibility:** Provide a `contentDescription` for meaningful shapes (e.g. circle as "User avatar"). Show static, never-changing content immediately; only skeleton the dynamic parts.
**iOS-first notes:** `NesSkeleton(shape: .square)` — shapes rounded / circle / heading / text; text shape lines 2–5. `> **Android:**` `NesSkeleton(shape = NesSkeletonShape.Text, textLines = 3)` / `NesSkeletonShape.Circle` with `contentDescription`.
**Don't:** Don't use when the data shape is unknown (use Loader). Don't keep it up longer than a few seconds. Don't skeleton static content that never changes.
