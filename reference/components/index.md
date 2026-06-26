# NESSIE Component Index — Master Catalog

Routing/lookup table for the NESSIE (NS Dutch Railways) **App** component library. iOS-first; use only App variants — never invent variants.

**Read this first** to pick a component, then open the linked reference file for variants, slots, tokens, accessibility, and iOS/Android notes. Components are grouped by category. The "Doc" column names the reference file that documents the component in full.

Reference files: `navigation.md`, `buttons.md`, `forms.md`, `feedback.md`, `content.md`, `domain.md`.

> Note: `navigation.md`, `buttons.md`, `forms.md`, and `feedback.md` cover the components routed to them below; `content.md` and `domain.md` are documented in this folder.

---

## Buttons

| Component | When to use | Doc |
| :--- | :--- | :--- |
| Button | Primary on-screen action; types Brand/Primary/Secondary/Tertiary, Default/Compact size, destructive/inverted/loading flags. | buttons.md |
| IconButton | Icon-only action; mandatory contentDescription. Same types/flags as Button. | buttons.md |
| FloatingButton | Persistent floating primary action (FAB); optional icon + expandable label. | buttons.md |

## Navigation

| Component | When to use | Doc |
| :--- | :--- | :--- |
| List Item — Navigation prefab | A tappable row that navigates elsewhere (leading icon, label, trailing chevron). | content.md |
| From To | Define departure/arrival (and via) point — travel planner entry. | domain.md |

## Forms

| Component | When to use | Doc |
| :--- | :--- | :--- |
| TextField | Single/multi-line text entry; placeholder, error/errorMessage, leading/trailing icon, maxLength. Compose label/help text around it. | forms.md |
| OTPInput | One-time-code entry; row of single-char cells (default length 6). | forms.md |
| Checkbox | Boolean / multi-select option; optional helpText, error. | forms.md |
| Toggle | On/off switch (Role.Switch); supports loading. | forms.md |
| Radio Button / Radio Panel | Single choice from a group (Role.RadioButton); panel variant for richer rows. | forms.md |
| Selectable | Set of selectable tiles, single (radio) or multi (checkbox); built on Form tokens. | content.md |
| Chips — Filter | Toggle/filter content; checked, multi, optional count badge. | content.md |

## Feedback

| Component | When to use | Doc |
| :--- | :--- | :--- |
| MessageInline | Inline status message (Success/Info/Warning/Error); icon + text, dismissible, optional button. Use for critical/blocking info or actions. | feedback.md |
| MessageBar | Bar-level status (Success/Informative/Warning/Error/ErrorHeavy); label + optional link. | feedback.md |
| Badge | Count or short text status indicator (Brand/Default/Important/Subtle/SubtleInverted/Success); contentDescription required. | feedback.md |
| Loader | Indicate loading; Compact/Default/Large; keep the localized contentDescription. | feedback.md |
| Highlight Box | Draw attention to important-but-not-blocking info inline; lighter than MessageInline. | content.md |

## Content

| Component | When to use | Doc |
| :--- | :--- | :--- |
| List Items | Group related info/actions in a vertical list; Base + prefabs; Top/Middle/Bottom/Single corner logic. | content.md |
| Tile Container & Tiles | Group related info/actions as one card; entry point to more detail. | content.md |
| Text List Items | Text-only related list; Ordered/Unordered/Checked. | content.md |
| Expandable | Show/hide sections of content; List or Stand-alone. | content.md |
| Sticker | Highlight contextual info (offer/status/attention) on a nearby element; never standalone. | content.md |
| Highlight Box | Attention to non-critical inline info (also listed under Feedback). | content.md |
| Dividers | Separate content groups when white space isn't enough; Default/Strong/Brand. | content.md |
| Selectable | Selectable tile set (also listed under Forms). | content.md |
| Chips — Action | Trigger a contextual action tied to primary content. | content.md |
| Chips — Dismissible | Removable element representing a choice/input (e.g. discount code). | content.md |
| Tag | Inline line/route number or platform/track location with changed/cancelled status. | content.md |
| Price | Display an amount of money; size/weight/alignment, alwaysShowDecimals. | content.md |
| Text / Heading | Body text (NesText with typography token) / titled heading semantics (NesHeading). | content.md |

## Domain (NS travel-planner — use modality tokens)

| Component | When to use | Doc |
| :--- | :--- | :--- |
| Journey Pill | Compact pill for a journey leg/transfer — modality, line label, duration, or expand affordance. | domain.md |
| Travel Cards | Show a travel card's status — type, subscription, balance, check-in (NSFlex/NSBusiness/PaymentCard/Anonymous). | domain.md |
| Route | Stations/stops and carriers along a route, with times, delays, platforms, errors. | domain.md |
| Rush | Indicate how busy a train is when planning a trip. | domain.md |
| Receipt | Live calculated price outcome of a (partly) completed form. | domain.md |
| From To | Departure/arrival/via input (also listed under Navigation). | domain.md |
