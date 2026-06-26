# NS NESSIE — Navigation Patterns

> Screen-flow and navigation structure for the NS app: top bar, tabs vs bottom nav, sheets vs dialogs, back navigation. iOS-first; Android and iOS-26+ differences are marked. Source of truth: Nessie design system (design.ns.nl) + Notion App Guidelines. Never invent token or component names. Where the source is silent this is flagged — confirm with the Nessie team rather than inventing.

## Navigation region

Every screen splits into a **navigation region** (primary navigation) and a **body region** (content — see `layout.md`). The navigation region holds two components:

- **Header navigation** (top bar)
- **Bottom navigation**

## Top bar (Header)

The Header is the top navigation component. It carries the screen title, back/close affordance, and trailing actions.

### Header start spacing

The Header's start (top) spacing varies by screen type (Notion App Guidelines):

| Start spacing | When |
| :--- | :--- |
| 32 | List page (large title / scrolling list screens) |
| 24 | Default top and bottom |
| 0 | Flush header (no extra start spacing) |

> **iOS:** Treat the Header like a native navigation bar — title + back/close + optional trailing actions. Large-title (32 start spacing) suits scroll/list landing screens; the title can collapse to inline on scroll. Use the system back chevron with the previous screen's title where appropriate.
> **Android:** Maps to a top app bar; default 24 top/bottom spacing. Back is the up-affordance (arrow) plus the system back gesture/button.

## Tabs vs bottom navigation

- **Bottom navigation** — top-level destinations of the app (the primary sections a user switches between). Lives in the navigation region, persistent across those top-level screens. Use for switching *between* major areas, not for navigating within one.
- **Tabs** — switching between views/filters *within a single screen or section*. Use inside the body region, not for top-level app structure.

> Rule of thumb: bottom nav = "where in the app am I", tabs = "which view of this screen". Don't use tabs to fake top-level navigation, and don't use bottom nav for in-screen view switching.

_The Nessie source reviewed here documents the bottom navigation as a navigation-region component but does not enumerate item counts or tab variants — confirm specific tab/bottom-nav component rules against the component library before finalising._

## Bottom sheets vs dialogs

Both interrupt the flow for a focused task; choose by weight and content:

- **Bottom sheet** — for content-rich or contextual tasks tied to the current screen: pickers, option lists, secondary flows, editing the content of a card. Reachable, dismissible by swipe/scrim. Prefer for anything more than a couple of lines or that benefits from staying anchored to the current context.
- **Dialog** — for short, blocking decisions that need an explicit choice before continuing: confirmations, destructive-action warnings, critical errors. Keep copy short; offer a clear primary + secondary action.

> Cards that **lead to a modal** (e.g. to edit the card's content) should use shadow/elevation to signal that depth (see `layout.md` surface rules).

> **iOS:** Bottom sheet = native sheet presentation (detents / drag indicator). Dialog = alert. Follow iOS modal-dismissal conventions (swipe-down to dismiss non-blocking sheets).
> **Android:** Bottom sheet = Material modal/standard bottom sheet. Dialog = Material dialog. System back dismisses the sheet/dialog.

## Back navigation

- Provide a clear back/up affordance in the Header for any pushed screen.
- Modals/sheets close (dismiss) rather than go "back"; dialogs resolve via their actions.

> **iOS:** Back chevron in the top-left of the Header (often with the previous title); edge-swipe-back gesture is expected. Sheets dismiss with swipe-down or an explicit Close/Done.
> **Android:** Up arrow in the top app bar **plus** the system back gesture/button — both must work and lead to the same destination. Predictive back where supported.

## Loading transitions

When navigating to a new screen or refreshing data (Notion App Guidelines):

- **Skeleton loader** — when the layout/structure of the incoming content is predictable. Shows placeholder blocks mimicking the final content for progressive loading.
- **Loading spinner** — when the structure or duration is unpredictable; for transitions/actions with no content yet to show.

## iOS vs Android

| Aspect | iOS | Android |
| :--- | :--- | :--- |
| Top bar | Navigation bar; large-title collapses to inline on scroll | Top app bar; default 24 top/bottom spacing |
| Back | Back chevron (with prev title) + edge-swipe-back | Up arrow + system back gesture/button (+ predictive back) |
| Bottom sheet | Native sheet with detents / drag indicator | Material modal/standard bottom sheet |
| Dialog | Alert | Material dialog |
| Window/size class | Regular vs compact/limited window | smallest-width drives size class (orientation-independent) |
| Density mapping | Compact / Regular / Large window → 2XS / Default / MD | Compact / Medium / Expanded → 2XS / Default / MD |

> Density modes (and therefore spacing/component scaling in the nav region) are derived from window size, not platform — see `layout.md` breakpoints. The design system abstracts both platforms into the shared 2XS / Default / MD model.

_Platform-specific component names, exact gesture behaviours, and bottom-nav item limits are not fully enumerated in the source reviewed — fill in from the component library / Nessie team over time._

## iOS 26+ notes

_Placeholder — fill in over time._ Newer iOS navigation conventions go here (e.g. updated tab-bar / navigation-bar treatments, sheet/material changes, any "Liquid Glass"-style bar or floating-element behaviours). Not yet documented in the Nessie source reviewed.
