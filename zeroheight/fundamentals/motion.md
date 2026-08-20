> When and how motion is applied in the NS app: which transition belongs to which kind of navigation, and how that differs per platform. The duration and easing **tokens themselves** live in NESSIE Motion Tokens; this page is about applying them.

Navigation **structure** (top bar, tabs vs bottom navigation, back navigation) is defined in Layout for App (Navigation region). The transient surfaces themselves (sheets, focused flows, panels, menus) are defined in [Interaction Models](https://design.ns.nl/4a05a30ad/v/latest/p/529255-interaction-models). This page describes how those surfaces and screens arrive and leave.

## General rules

- **Default to `motion.duration.default` with `motion.ease.default`.** Faster for micro-interactions, slow or slower for large surfaces.
- **Respect reduced motion.** Animation degrades gracefully when the OS requests reduced motion.
- **Stay close to the platform.** Most navigation motion below is native behaviour on iOS and Android. That is deliberate: deviating from what the OS already does needs a reason.

## Navigation transitions

### Choosing the transition

| The user is moving… | Category | Motion |
| :--- | :--- | :--- |
| Between top-level destinations (bottom nav) | Parallel | None, instant |
| Deeper into or back out of a hierarchy | Hierarchy | Horizontal |
| To temporary content tied to the current screen | Temporary | Vertical |
| Into a self-contained task with a start and an end | Focused flow | Vertical, full screen |

The underlying rule: **parallel destinations get no motion, hierarchy gets horizontal motion, temporary content gets vertical motion.** Focused flows are vertical too, but full screen, because the user leaves the current context rather than layering on top of it.

### Tab navigation

`transition: tab-switch` · both platforms

- Switching tabs is **instant**. No transition animation.
- Each tab keeps its own navigation stack. Returning to a tab restores the view where the user left it, not the root.
- Tapping the tab that is already active returns to that tab's root page, also instantly.

Example: Planner (tab) to Map (tab) to Tickets (tab). Uses [Bottom Navigation](https://design.ns.nl/4a05a30ad/v/latest/p/65dd76-bottom-navigation).

### Page navigation

`transition: page-enter` `transition: page-back`

Pushing and popping pages inside a tab. Uses [Top Bar](https://design.ns.nl/4a05a30ad/v/latest/p/37561d-top-bar) for the back affordance. Example: Tickets (tab) to My tickets (page) to Order details (page).

**iOS**
- Enter: the incoming page slides in from the trailing edge at full width.
- Top bar: the title moves with the content; buttons cross-fade.
- Back: the reverse of the push, driven by the back control or the edge-swipe gesture.

**Android**
- Enter: shared axis X. Both pages move a short distance horizontally while cross-fading. Not the full-width slide that iOS uses.
- Back: predictive back (Android 14+). The current page scales down, insets from the edge with rounded corners, and slides toward the edge the swipe started from, revealing the previous page underneath.

> **Android:** predictive back is owned by the system and works from either edge, so back is not a fixed "slide out to the trailing edge". Do not define a custom back animation on top of it.

### Sheets

`transition: sheet-open` `transition: sheet-close` · both platforms

- Open: slides up from the bottom and stops at the intended height (partial or full height).
- Close: slides down toward the bottom edge.
- Moving between heights is a drag, not a played animation.

Example: saving notifications for a trip. Uses [Bottom Sheet](https://design.ns.nl/4a05a30ad/v/latest/p/438def-bottom-sheet); for the sheet variants and their rules see [Interaction Models](https://design.ns.nl/4a05a30ad/v/latest/p/529255-interaction-models).

### Focused flow

`transition: focused-flow-open` `transition: focused-flow-close`

A full-screen, self-contained task (purchase, onboarding). Vertical rather than horizontal, because the user steps out of the current context instead of deeper into it.

**iOS**
- Open: a vertical slide-in from the bottom, covering the full screen height.
- Close: the same movement reversed.

**Android**
- Open: a short vertical movement combined with a cross-fade. Same axis as iOS, much shorter distance.
- Close: the current screen scales down and slides downward, with a cross-fade.

> Do not confuse this with an alert or dialog. Same full-bleed impression, different meaning: an alert interrupts and demands a response, a focused flow is a task the user chose to start. See [Interaction Models](https://design.ns.nl/4a05a30ad/v/latest/p/529255-interaction-models).

### Timing and easing

_Not settled yet. Being researched in a separate story; do not pick durations or curves from this section._

Until that lands, treat the transitions above as native platform behaviour and let the platform supply the timing. The token rules in NESSIE Motion Tokens still apply everywhere else: semantic tokens only, never raw ms values or invented curves.

The open question is the shape of the token, not only its value. Gesture-driven transitions (back on both platforms) are spring-based and interruptible, which a duration plus easing curve cannot express. The intended direction is one semantic token per transition type, with timing, easing, and direction filled in per platform so each matches native behaviour.

### Not yet decided

Flag these rather than guessing at them:

- Whether the bottom navigation stays in place during a page push or moves with the page.
- What each transition degrades to under reduced motion.
- Persistent panels (map, active journey). They are dragged between three heights and never dismissed, so the sheet rule does not describe them. See [Interaction Models](https://design.ns.nl/4a05a30ad/v/latest/p/529255-interaction-models).
- Whether the skeleton or loading state appears during the transition or after it settles. See Layout for App (Loading transitions).
- Whether swipe-initiated navigation is specified here or left entirely to the platform.
