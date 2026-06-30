---
pattern: Settings & Utility
zeroheight_page_id: 8094399
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/17b7b1-settings-utility
last_synced: 2026-06-30
platforms: [ios, android]
related: [interaction-models, navigation-patterns, layout]
gaps: [Accessibility]
---

# Settings & Utility

How settings, preferences, and utility-related UI behave across the NS app. Applies to dedicated **Settings** areas (Mijn NS settings, notification preferences), **preference** flows embedded deeper in the app, and **utility** screens ("About this app", "Help & Support", "Account actions") that use the same list-based structure.

**Core principles:** users should always understand *where* they are, *what* they're changing, and the *impact*; navigation must be predictable and reversible; platform conventions are respected unless a documented, engineering-reviewed deviation is justified by user benefit.

## Layout

### Grouping & hierarchy
- A settings screen is divided into **groups**, each containing list items about the same topic or entity. By default, list groups stack within a container using `container.stack.control`, with one section heading per group.
- **Section heading** — use when a section has multiple related items, items share a recognisable category ("Notifications", "Privacy"), or a single item represents a category that may expand later ("Payment methods"). Don't use a section heading that just repeats the list item label.
- **Subgroups** — use within a group when actions are related but differ in intent/impact (informational vs actionable) or part of the section needs help text that doesn't apply to adjacent items. Stack list views within a group using `group.stack.comfy`.
- **Destructive actions** — visually and structurally separated, placed as a single action in their own subgroup, with explicit context in help text ("Remove card", "Log out").

### Subtitles vs help text
- **Subtitle** (inside the list item, under the label): immediate, short, scannable clarification (max 80 characters, aim ≤60) that helps the user decide before entering the follow-up screen. Must not contain instructions, describe consequences that need careful reading, or replace trailing state values.
- **Help text** (outside the container): for explanations over 2 lines, non-obvious consequences, legal/privacy/system implications, or guidance that applies to multiple items. Never embedded in a list item; placed directly below the group (or above when framing is needed).

### Badges & notification indicators
- Use a badge when a setting needs attention (incomplete setup, new feature), content is unread ("3 unread messages"), or an action is time-sensitive but not critical.
- Nessie provides a **Dot badge** and a **Counter badge** (see [Badge](../components/badge.md)).
- **Rules:** remove a badge immediately once the user views the content; never use badges for critical errors (use inline error states); maximum one badge per list item; a badge persists when navigating back if the content is still unread/unsolved.

## Behavior

### Navigation affordances
- Show a **chevron** on any list item that leads to a new screen, a modal, or a bottom sheet.
- Use the **external link icon only** when navigating outside the NS app; web content shown inside an in-app modal/frame uses a chevron only.
- On follow-up screens, the page header reflects the selected item using a **small page header inside the top bar** — don't add a new large header. Large headers are reserved for main entry pages (e.g. Mijn NS root).

### State reflection
- Use a concise, scannable **trailing value** when a single selection has been made on a follow-up screen.
- For an empty state use **"Not set"** — don't leave the trailing value empty and avoid imperative text like "Select …". This reads clearly for screen readers and distinguishes unset from unavailable.

### Confirmation patterns
- **Immediate execution** is allowed when the action is reversible, minor, and the state change is clearly visible.
- **Confirmation required** when the action is destructive, affects multiple entities, or can't be undone — use a **modal** confirmation, not an inline alert.

### Deep linking
- A deep link into a settings page behaves as a normal navigation destination; header and layout stay unchanged.
- **Back** goes to the previous in-app screen if one exists, otherwise the logical parent settings page — never back to the external source that triggered the deep link (prevents dead ends).

## States
- **Loading:** when a settings screen needs backend data, show skeleton loaders matching the layout structure (list items, toggles, text blocks) with consistent sizing/spacing. Never show an empty screen on initial load; loading must not block navigation (back stays functional); show cached content immediately and update when fresh data arrives; on failure transition to the appropriate error state.

## Accessibility
_ZeroHeight lists labels/headings, state-change announcements, focus order in groups/subgroups, and TalkBack behaviour for destructive actions as topics, but the detail isn't published yet — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/17b7b1-settings-utility (page `8094399`, synced 2026-06-30)
