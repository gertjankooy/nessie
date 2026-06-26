# Content Components

NESSIE (NS Dutch Railways) content components. iOS-first; only App variants documented. Never invent variants.

For navigation, buttons, forms, and feedback components see their respective reference files. See `index.md` for the master routing table.

---

## List Items
**When to use:** Group related information and/or actions in a vertical list. Use a `Base` when prefabs don't fit; otherwise pick the prefab closest to the use case.
**Variants:**
- App prefabs: `Base`, `Search Suggestion`, `Favorite`, `Current Location`, `Navigation`, `Horizontal`. (Code adds prefabs like Button, Context Action, Data Action, Description, Menu, Toggle, Weblink — design from the Figma prefab set above.)
- Corner-shaping `type`: `Top` | `Middle` | `Bottom` | `Single`. This drives the rounded-corner logic when items are grouped:
  - **Single** = standalone item, all four corners rounded.
  - **Top** = first item in a group, top corners rounded only.
  - **Middle** = interior item, no rounded corners. (Do not set `contained=false` casually — a Middle then loses its container shaping.)
  - **Bottom** = last item in a group, bottom corners rounded only.
  - Group order = Top → Middle* → Bottom.
- Other flags: `hasOptions` (renders subtext in interactive/option color vs. help-text color), `contained`, optional `onClick`.
**Anatomy / slots:** Leading icon (supports the topic / platform type), Label, Subtext (below label), Trailing subtext/value (beside label), Trailing icon (affordance or secondary action e.g. favorite heart). Prefab-specific: Distance (Search Suggestion), Address (Favorite, Current Location), Value (Horizontal).
**Tokens used:** `color.content.background.default` surface; `nes-color-text-body` for content; interactive/option color for `hasOptions` subtext; help-text color for plain subtext; destructive turns content red. Honor the spacing scale when adding vertical space.
**Accessibility:** `onClick` does NOT add a button role — set it explicitly. Trailing-icon actions need their own accessible label. Destructive actions always prompt for confirmation.
**iOS-first notes:** App List Items have a 16px left/right indent by default. Default has no dividers between items and no vertical space; add dividers only when content starts to "float" — dividers do not span full width (keep white space left/right). Pressed state visually extends beyond the layout bounds.
> **Android:** Code-side prefab names (NesListItemButton/ContextAction/DataAction/Menu/Toggle/Weblink) and the deprecated `NesListItem`; ignore these for Figma — use the Figma prefab set.
**Don't:** Let dividers span full width. Set `contained=false` on Middle items. Use destructive styling for non-destructive actions like Cancel/Close/Logout.

---

## Tile Container & Tiles
**When to use:** Group related information and/or actions as one card, often as an entry point to more detail. Use the `Container` when the `Default` prefab doesn't fit.
**Variants:**
- `Container` (empty, three predefined slot sections) and `Default` prefab.
- Emphasis properties: `Border` (default; prefer for non-interactive tiles), `Border + Shadow` (on white backgrounds — Default prefab uses this), `Shadow` only (on tinted backgrounds), `Tinted` (to highlight specific content).
- `density`: `Default` | `Dense` (code also exposes `Custom` spacing/insets).
**Anatomy / slots:** Header (heading + optional metadata), Content (any content), Footer (actions). 16px padding. Uses the Slot method in Figma. Default heading font size is 2XL.
**Tokens used:** `color.content.background.default`; tint background token for Tinted; border + elevation/shadow tokens per emphasis property.
**Accessibility:** Treat grouped interactive tiles like other actionable rows — ensure the tappable area carries the right role/label.
**iOS-first notes:** Tiles span full width; height is content-driven. Swap slot instances or detach to extend; if detaching, match the examples and note updates won't propagate.
> **Android:** `NesTileContainer(header/content/footer)`, `NesTileContainerDensity.Default/Dense/Custom(spacing, insets)`, `border`, `elevation`.
**Don't:** Use a Tile to group all your content (use white space first). Use a Tile for feedback/status — use Message Inline. Pack a lot of complex content into one tile — use a separate page.

---

## Text List Items
**When to use:** Display a list of text-only related content with similar structure. Component in Figma; in code it's an icon/number + a text style.
**Variants:** `Ordered` (numbered or alphabetical; use when sequence/priority matters, keep 3–9 items), `Unordered` (default starting point; no required order), `Checked` (highlight benefits, e.g. subscription discounts). Sizes: `Xs`, `Sm`, `Base`, `Lg`.
**Anatomy / slots:** Marker (number/letter/bullet/check) + Label text. Supports emphasized substrings within the label.
**Tokens used:** Text typography tokens by size; surface `#FFFFFF`/`color.content.background.default`.
**Accessibility:** Introduce lists with a clear heading or descriptive sentence so the list's purpose is announced.
**iOS-first notes:** `NesTextListItem(size:.xs/.sm/.base/.lg, organise:.ordered(position:)/.unordered/.checked)`.
> **Android:** `NesTextListItemOrdered/Unordered/Checked`; `attachEmphasis()` helper for emphasized substrings.
**Don't:** Mix grammar/capitalization between items. Repeat the same opening word on each item. Use for anything but related, similarly-structured text.

---

## Expandable
**When to use:** Show/hide sections of related content to keep content-heavy pages clean when the content isn't crucial to read in full.
**Variants:** `List` (multiple sections; default border at top, last item also gets bottom border) and `StandAlone` (single section). States: `Collapsed` (default) and `Expanded`.
**Anatomy / slots:**
- List: Header + Content. Tapping anywhere on the header toggles; plus icon rotates into a cross.
- Stand-alone: Button + Content. Tapping the button toggles; chevron-down rotates to chevron-up. Content background is transparent by default; an optional tinted background (`hasTint`) is available.
**Tokens used:** Surface `color.content.background.default`; border token (1px) for List separators; tint token for the optional Stand-alone tinted content.
**Accessibility:** Announce expanded/collapsed state. Content is pushed down (not overlaid) on expand.
**iOS-first notes:** Each section expands independently — multiple can be open at once. Avoid accordion behaviour (only one open). Uses the Slot method in Figma.
> **Android:** `NesExpandable(header, type=NesExpandableType.StandAlone/List, expanded=NesExpandableState.Collapsed/Expanded, onExpand, onCollapse)`.
**Don't:** Hide content essential to all users. Nest Expandable Lists. Stuff non-textual / heavy content inside.

---

## Sticker
**When to use:** Highlight information tied to a specific context — a price, offer, status, or to draw attention to content within a tile/component. Never as standalone text.
**Variants:** `Brand`, `Default`, `Subtle`, `Offer`, `Attention`, `Alert`, `Info`, `Highlight`. Each has its own attention level (pick deliberately). Size `Default`; `filled` true/false; optional xs leading icon.
- Brand: immediate attention / NS brand reinforcement. Default: noticeable but not primary. Subtle: neutral/supporting info. Offer: deals/discounts. Attention: important warning, not critical. Alert: affects safety/access/task completion. Info: helpful, non-urgent. Highlight: new/noteworthy ("New", "Beta").
**Anatomy / slots:** Optional xs icon + short label (max two words).
**Tokens used:** Established color patterns per type so importance reads instantly; fill vs. outline styling.
**Accessibility:** Stickers never stand alone — combine the sticker with the element it relates to into ONE accessible label. Format: `{Primary Element}, {Sticker Type (if meaningful)}, {Sticker Content}`. Include the type only when it adds clarity (Offer/Attention/Alert: include; Brand/Default/Subtle/Highlight: content only; Info: only if helpful). iOS: set `.accessibilityLabel` on the container/parent. NL pronunciations differ (Offer→"Aanbieding", Attention→"Let op", Alert→"Pas op").
**iOS-first notes:** `NesSticker(text, style: .brand, size: .normal, isFilled: true)`. String failable initialisers fall back to `Default` on invalid type/size. Positioning within a tile changes its attention value.
> **Android:** `NesSticker(text, type=NesStickerType.Brand, size=NesStickerSize.Default, filled=true)`; `toNesStickerType()`/`toNesStickerSize()` string extensions; hide child from TalkBack and put description on parent.
**Don't:** Use a sticker for standalone text not connected to other info. Exceed two words.

---

## Highlight Box
**When to use:** Draw attention to important-but-not-blocking info inline with the content body, when a Message Inline would be too heavy. Non-critical info only.
**Variants:** `Highlight` (neutral, higher priority than Info), `Offer` (positive/upsell), `Info` (general info, lower priority), `Brand` (needs extra attention — a11y type is "Attention"/"Let op"). Warning/Alert types were removed — use Message Inline for those.
**Anatomy / slots:** Optional icon + text (1–3 lines ideal; bold substrings carry the highlight color, regular text uses `nes-color-text-body`) + optional Link. Icon options: `Off`, `Default` (32x32), `Detail` (56x56 icon-detail). Adding a Link makes the ENTIRE box interactive.
**Tokens used:** `nes-color-text-body` for regular text; highlight color token (per type) for bold text; per-variant background/border tokens.
**Accessibility:** Treat the whole box as one accessibility element. Static = one descriptive label (no button role); interactive (has link) = one button. Reading order: Type → Message → Action label. Icon is decorative — hide it (`.accessibilityHidden(true)` / `contentDescription=null`). Never create a second focus stop for the link. Optimized for font scaling up to 200%.
**iOS-first notes:** `NesHighlightBox(title:, boxType:.default, image:)` + `.infoButtonTitle()` / `.onTapInfoButton{}`. Icon auto-aligns center, but jumps to top from 3+ lines of text — in Figma set this manually. Wrapped link text: icon aligns to end of final line, 5px gap.
> **Android:** `NesHighlightBox(icon, text, type=NesHighlightBoxType.Brand/Default/Info/Offer, linkText, onLinkClick)`; `attachHighlight()` helper for bold substrings.
**Don't:** Convey critical/blocking info or actions (use Message Inline). Stack multiple highlight boxes back-to-back. Give the link its own separate interaction state. Center-align the icon with 3+ lines of text. Use decorative-only icons.

---

## Dividers
**When to use:** Separate content into clear groups/sections when white space alone isn't enough. Prefer white space over dividers.
**Variants:** `Default` (1px), `Strong` (extra attention, e.g. cost list before a total), `Brand` (4px; sparingly, adds NS branding e.g. under a content intro). (Code type enum exposes `Default` and `Brand`.)
**Anatomy / slots:** A single rule line. Spans full container width by default (note: between List Items it intentionally does NOT span full width).
**Tokens used:** Divider/border color token; Brand uses a brand color token and 4px weight.
**Accessibility:** Decorative; convey grouping structurally, not via the divider alone.
**iOS-first notes:** `NesDivider(style: .standard)`. Beware "scroll stoppers" — a divider with content after it sitting just outside the viewport can read as the end of content.
> **Android:** `NesDivider(type = NesDividerType.Default)` (Default 1dp / Brand 4dp).
**Don't:** Use a divider where white space would group content clearly. Let trailing dividers become scroll stoppers.

---

## Selectable
**When to use:** Present a structured set of tiles the user selects from — single-select (radio-like) or multi-select (checkbox-like). Always a set of two or more.
**Variants:** Single-select and multi-select behaviors; layout Horizontal or Vertical; a Prefab with built-in radio/checkbox indicator. States Default, Hover, Active, Focus behave like other Form controls.
**Anatomy / slots:** A selectable card wrapping arbitrary content; optional radio/checkbox indicator. Padding baseline 20px (Radio/Checkbox prefab padding is fixed at 20px).
**Tokens used:** Built on Form tokens/components (not Tile tokens) — selection border/background, focus ring.
**Accessibility:** Maps to radio button (single) or checkbox (multi) semantics; ensure correct grouping and selected state announcement.
**iOS-first notes:** `NesSelectable(isSelected:){ content }.contentPadding(...)`. Spacing can be tuned per need (baseline 20px) except the fixed-padding radio/checkbox prefabs.
> **Android:** `NesSelectable(selected, onClick, contentPadding){ content }`.
**Don't:** Use Selectable for navigation to another page (use a Tile). Mix Selectable and Tiles in the same row. Use for a single option, or where only one of many can be selected (prefer Radio Buttons / Radio Panel).

---

## Chips
**When to use:** Compact elements to filter content or trigger actions. Always presented as a set — never standalone.
**Variants (pick by behaviour):**
- `Action` (`NesChipAction`) — triggers an action related to primary content; appears dynamically/contextually (vs. buttons which are persistent). Optional leading icon; `filled`. Label leads with an active verb.
- `Filter` (`NesChipFilter`) — toggle/filter; `checked`, `multi`, optional `badge` (subtle count for multi-filter). Tapping a multi-filter should open a bottom sheet of Selectable options; selected count shows in the badge.
- `Dismissible` (`NesChipDismissible`) — removable; `onDismissClick`. E.g. an entered discount code in a form.
**Anatomy / slots:** Optional leading icon + short label (prefer one word) + (Filter) optional checkmark/badge or (Dismissible) trailing dismiss icon.
**Tokens used:** `color.content.background.default`, `color.content.border.subtle`. Default style is Outlined; `filled` only on tinted backgrounds.
**Accessibility:** Touch targets ≥ 48px, separated by ≥ 8px, reachable by thumb. For multi-active filters show a checkmark on activated chips; for a single chip that clears all others, omit the checkmark.
**iOS-first notes:** `NesChipAction(title:, icon:).isFilled().onTapView{}`, `NesChipFilter(title:, style:.filled).isMulti().badgeInfo("3").onTapView{}`, `NesChipDismissible(title:).onDismiss{}`. Prefer horizontal scroll over stacked rows on mobile.
> **Android:** `NesChipAction(text, leadingIcon, onClick)`, `NesChipFilter(text, checked, multi, filled, onCheckedChange, badge={NesBadge(...)})`, `NesChipDismissible(text, filled, onDismissClick)`.
**Don't:** Use a chip to highlight info (Sticker) or show object status (Badge). Use chips for single-select-of-many (Radio) or a single option. Use Filled chips on the default (untinted) background. Let a chip stand alone.

---

## Tag
**When to use:** Inline indicator for a transit line/route number or a platform/track location, including change/cancelled status. Travel-domain adjacent but lives with content primitives.
**Variants:**
- `Line` tag — a line/route number (metro/bus/train).
- `Location` tag — platform/track location. Color variants `Neutral` and `Blue`; states `Default`, `Changed(newValue)`, `Cancelled` (and combined Changed+Cancelled).
**Anatomy / slots:** Category/location-type context (e.g. "Platform", "Track") + Number/Letter value (e.g. "8", "13b", "IC78").
**Tokens used:** Neutral vs. Blue color sets; cancelled/changed state colors.
**Accessibility:** Provide a `contentDescription` for the location type. Formats — Line: `{Category}, {Number/Letter}` ("Metro Line, 8"). Location default: `{Location Type}, {Number/Letter}` ("Platform, B"). Changed: "Track, Changed from 18a to 13b". Cancelled: rely on `aria-labelledby`/surrounding context.
**iOS-first notes:** Guidelines/examples are "Coming soon" on ZeroHeight; follow the Android API shape and a11y label rules above.
> **Android:** `NesTagLocation(variant=NesTagLocationVariant.Neutral/Blue, location, state=NesTagLocationState.Default/Changed("7a")/Cancelled, contentDescription)`.
**Don't:** Omit the location-type `contentDescription`. Convey a changed/cancelled state by color alone.

---

## Price
**When to use:** Display an amount of money — nothing else.
**Variants / properties:** Size and font-weight options (tune attention level); alignment left or right (by position in a section); stacked layout; optional leading text and/or trailing text; discount presentation; `alwaysShowDecimals`.
**Anatomy / slots:** Optional leading text + currency symbol + amount + optional trailing text.
**Tokens used:** Default body text color (only vary weight/size for emphasis — don't recolor); typography size tokens.
**Accessibility:** Announce as a monetary value with currency (e.g. "Balance: €20,45").
**iOS-first notes:** `NesPrice(priceInCents:, trailingText:, stacked:false)`. One space between currency symbol and amount. Default hides trailing-zero decimals (€4 not €4,00). When a round price sits in a column with non-round prices, set `alwaysShowDecimals=true` on every price in the group so shapes align. NL: comma decimal separator, point thousands separator.
> **Android:** `NesPrice(priceInCents = 1000, alwaysShowDecimals = true)`.
**Don't:** Use for anything other than money. Recolor the price for emphasis (use weight/size). Mix round and non-round decimal styles within one column.
