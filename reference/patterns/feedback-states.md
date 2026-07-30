---
pattern: Feedback & States
zeroheight_page_id: 8773720
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/4717b2-feedback-states
last_synced: 2026-07-28
platforms: [ios, android]
related: [interaction-models, navigation-patterns, layout, accessibility]
gaps: []
---

# Feedback & States

How the NS app tells the user that something is empty, loading, missing, or broken — and which surface to use in each situation. This page is about **choosing the surface and the state**; component anatomy, variants, and tokens live on the individual component pages.

> This page names the currently published Message components. The revised Message architecture renames these (story `DSM-4579`); update when it lands.

## The two questions that decide everything

Before picking a component, answer these in order:

1. **Is there still content on the screen?** Almost every wrong choice here comes from skipping this. A first load that fails with nothing on screen is an **Empty State**. A refresh that fails while content is still there keeps the content and adds a message. Same technical error, different surface — because in one case the user is still looking at something useful.
2. **What is the scope?** Does this apply to the whole content area, to a section, or to one element?

**Severity does not decide placement — scope does.** A severe problem affecting one field stays an Error Message; a minor problem affecting a whole section can still be a Message Inline. Use the semantic colour variants to signal severity; use the surface to signal scope.

## Choosing the surface

Read top to bottom — the first row that matches is the answer.

| If the situation is… | Surface | Example |
| :--- | :--- | :--- |
| The content area has nothing to show, whatever the cause | **Empty State** (component WIP) | No tickets bought yet |
| Content is on screen and something about a whole section is wrong or worth knowing | **Message Inline** | Reservation required on this leg |
| The content on screen is out of date (e.g. cached content while offline) | **Message Inline** | Showing older departures while offline |
| A background action finished and doesn't change what's on screen | **Message Toast** | Preference saved |
| A single field has invalid or missing input | **Error Message** | Date is in the past |
| The user must make a choice before anything else can happen | **Alert** (see `interaction-models.md`) | Allow location to continue |
| Content is on its way and will arrive shortly | **Skeleton** | Loading travel advice |

**Surfaces at a glance:**
- **Empty State** — replaces the content area; used when there's nothing to show, including when loading failed.
- **Message Inline** — sits at the top of a section, with that section's content below it.
- **Message Toast** — short, self-dismissing, for background results.
- **Error Message** — field-level validation, directly under the input.
- **Alert** — interrupts and requires a choice, for critical or blocking situations.
- **Skeleton** — placeholder shape while content loads.

## Empty states

An Empty State replaces content — it fills the area where a screen's content would have been and explains why nothing is there. Every reason it's empty uses the **same layout**; only the text and the action differ. The three cases:

1. **No content** — nothing bought/saved/reported yet. The most common case, and not a failure.
2. **No results** — content exists but a filter or search excludes it.
3. **Failed** — loading failed (error or offline) and there's nothing cached to fall back on.

### Use when
- There's no content yet and that's a normal state (no tickets, no saved journeys).
- There's nothing because everything is fine (no disruptions, no delays) — good news.
- A filter or search returned no results.
- Loading failed and there's nothing cached to fall back on.

### Scope
It fills the content area only; the top bar and bottom nav stay in place — and so do any controls that scope the current view, such as a filter, a search field, or in-screen tabs. Refresh gestures keep working while an Empty State is shown.

### Variants
- **`empty`** — no content. Two readings: *nothing yet* (explain what will appear; add an action when the user can create the first item, e.g. buy a ticket) and *all clear* (nothing because everything is fine, e.g. no disruptions — positive tone, usually no action). Illustration allowed.
- **`no-results`** — content exists but the current filter/search excludes it. Text refers to the filter or search term; the action clears or adjusts it. **Must look and read differently from `empty`** — if it doesn't, users assume the feature is broken. Illustration allowed.
- **`error`** — loading failed, nothing cached. Say what didn't load in plain language; the action is **Try again**. Use an icon, not an illustration.
- **`offline`** — no connection, nothing cached. Explain the connection is missing; the action is **Try again**. Use an icon, not an illustration.

### Rules
- One primary action at most; a second is allowed only when it leads somewhere genuinely different (e.g. help).
- Don't reuse one text across variants — a first-use state and a no-results state are different situations needing different wording and actions.
- The illustration or icon is decorative; the **title must carry the meaning on its own**.

### Tone
Wording follows the Content scorecard (`reference/content/index.md`); what's specific here is which variant gets which tone.
- `empty` and `no-results` are neutral. A short line in the NS voice is welcome — warm, human, positive words. The *all clear* reading of `empty` (e.g. no disruptions) can lean a little more positive, since it's good news.
- `error` and `offline` stay plain and factual. Keep the NS voice, but no jokes, and never make light of money or a missed journey.

## Error handling

Where a failure is shown, what the user can do about it, and how retries behave. (Wording rules live on the Content pages.)

### Principles
- **The user is never at fault.** Describe what happened, not what they did wrong.
- **Always offer a way forward.** A failure without a next step is a dead end.
- **Never destroy what the user already had.** Keep their input; keep the content that already loaded.
- **Match the surface to the scope of the failure.**
- **Colour follows repair, not severity:** `critical` when something is broken and needs an action to fix (failed load, invalid field); `attention` when nothing is broken but the user should know something before acting (content may be out of date); `informative` for pure context with no action.
- **Don't block the user** unless the failure genuinely blocks them.

### Failure categories
| Failure | Surface | Colour | Action |
| :--- | :--- | :--- | :--- |
| Input is missing, incomplete, or not accepted | Error Message, under the input | `critical` | None — user corrects the field |
| Load failed and nothing is on screen | Empty State (WIP) | n/a | Try again |
| Load failed but cached content is available | Message Inline over the cached content | `attention` | Refresh |
| An action or save failed | Message Toast | `critical` | None, or a single retry |
| A background action failed and doesn't affect this screen | Message Toast | `critical` | None, or a single undo |
| A permission is needed before the user can continue | Alert | n/a | Grant, or go to settings |

### Load failure, nothing cached (`variant: load-failure-empty`)
The content area becomes an Empty State (`error` or `offline` variant). The deciding question is whether **anything is cached** — if not, it's an Empty State. Name what didn't load in plain language, never a generic "er is iets misgegaan". Back navigation and the bottom nav keep working; the user is never trapped.

### Load failure, cached content available (`variant: load-failure-cached`)
- Show the cached content immediately — never blank it out.
- Add a **Message Inline** above it saying the content isn't current (e.g. "Even geen verbinding, je ziet oudere gegevens"), using `attention`.
- Offer a manual refresh; update automatically and remove the Message Inline when the connection returns.

**Refresh and timing:** don't flip to a failure state the moment a request is slow — wait for a timeout first (threshold is a product decision) so a slow load doesn't flash an error before content arrives. Once a state is shown, keep it visible long enough to read. Background refresh updates content in place; it never covers existing content with a loading state. Refresh cadence is set per feature (time-sensitive data like disruptions refreshes more often).

### Action or save failure (`variant: action-failure`)
- Return the interface to its previous state straight away (a toggle that couldn't be saved goes back).
- Show a **Message Toast** naming what didn't save (e.g. "Je voorkeur is niet opgeslagen").
- Don't block the user — they can keep using the screen.
- Retry in the background where safe, at most twice, with a growing delay. **Never retry anything that costs money or triggers a purchase.** If a background retry succeeds, don't announce it — silently correct the state.

### Validation (`variant: validation`)
- Validate when the user leaves a field or tries to continue — not while typing.
- If more than one field is wrong, move focus to the first one.
- Say what's wrong *and how to fix it* ("Vul een datum in" doesn't tell the user their date was in the past).
- Don't use a Message Inline for a problem that lives in one field.

### Retry behaviour
- Retry is not a default action — only offer it when repeating the same request could reasonably succeed.
- The retry retries only what failed, not the whole screen.
- While retrying, the action shows a loading state and can't be tapped again.
- If it fails again, keep the same surface and wording. After repeated failures, offer a different route out (help, going back) instead of a third identical retry.

> **Android:** pull-to-refresh is called swipe-to-refresh; on both platforms it's a *secondary* way to reload list-based screens. There is always a visible retry action too — a gesture is never the only way out.

## What this page does not cover
- App-wide calamity messaging → **Message Bar** (`../components/message-bar.md`).
- Loading and placeholder shapes → **Skeleton** (`../components/skeleton.md`).
- Empty or promotional widgets (an incentive to add something) → **Highlight Box** (`../components/highlight-box.md`), not an Empty State.
- Alert anatomy, use, and button rules → **Interaction Models** (`interaction-models.md`).
- Component anatomy, variants, and tokens → the individual component pages.
- Wording and tone in full → `../content/index.md` (scorecard) + `../content/error-message.md` / `../content/empty-state.md`.
- Accessibility requirements → `../accessibility.md`.

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/4717b2-feedback-states (page `8773720`, synced 2026-07-28)
- Tabs folded in: Overview, Empty States, Error Handling.
