# Domain Components

NESSIE NS travel-domain components. iOS-first; only App variants documented. Never invent variants.

These are travel-planner / journey-specific components and use **modality tokens** (per transit mode: train subtype, OV/bus/tram/metro, shared mobility, own bike, walk) plus state colors for delay/cancelled. See `index.md` for the master routing table and `content.md` for the related Tag and Price primitives these reuse.

---

## Journey Pill
**When to use:** Represent a single leg or transfer in a journey/route as a compact pill — modality, line label, duration, transfer time, or an "expand" affordance for hidden legs.
**Variants (pick by sub-component):**
- `PublicTransport` — `Train` (subtypes: `Intercity`, `Sprinter`, …), `OV` (subtypes: `Bus`, tram/metro, …). Optional `label` (e.g. "IC Direct", "M5").
- `Modality` — `Own` (e.g. `Bike`), `Shared` (e.g. `OVFiets`, `Check`, `Car`), `Other` (e.g. `Walk`). Usually carries a `time` (minutes).
- `Transfer` — a transfer with `time` in minutes, optional icon (use cropped icons), optional attention badge.
- `Expand` — "+N" pill revealing additional legs (`count`, `onClick`).
Flags across pills: `cancelled`, `attentionBadge` (`Info` | `Warning` | `Critical`), optional `onClick`, custom `contentDescription`.
**Anatomy / slots:** Modality icon + optional label/time + optional attention badge. Use intrinsic/max height in a row so all pills match height.
**Tokens used:** Modality tokens per transit mode (train/OV/shared/own/walk) for icon + color; attention-badge tokens (Info/Warning/Critical); cancelled state styling.
**Accessibility:** Default content descriptions are generated per modality/state; override `contentDescription` only to replace the full announcement (e.g. cancellation reason "De trein naar Maastricht rijdt niet vanwege een gestrande trein").
**iOS-first notes:** ZeroHeight iOS/guidelines sections are sparse; mirror the Android sub-component shapes below and apply NS modality tokens.
> **Android:** `NesJourneyPillPublicTransport(transport=NesJourneyPillType.PublicTransport.Train(NesJourneyModalityTrainSubtype.Intercity), label, cancelled, attentionBadge=NesAttentionBadgeType.Critical, onClick)`, `NesJourneyPillModality(modality=...Modality.Shared(NesJourneyModalitySharedSubtype.OVFiets), time, cancelled)`, `NesJourneyPillTransfer(time, icon, cancelled, attentionBadge)`, `NesJourneyPillExpand(count, cancelled, onClick)`.
**Don't:** Invent modality subtypes. Use uncropped icons in the Transfer pill (the bounding box expands). Encode cancelled state by color only — keep the badge/description.

---

## Travel Cards
**When to use:** Display the user's travel card status and related travel info (type, subscription, balance, check-in status). Use the full card to show one card; the inline variant when switching between multiple cards.
**Variants:**
- `type`: `NSFlex`, `NSBusiness`, `PaymentCard`, `Anonymous`.
- Full `NesTravelCard` and `NesTravelCardInline` (inline sizes `Default` | `Compact`; inline `type` adds `SingleTicket`).
- States: active/inactive, `checkedIn` true/false. Per-field async states (`subtext`, `checkInLabel`, `balance`, `cardNumber`) render skeleton (Loading) / content (Success) / none.
**Anatomy / slots:** Card type, Product/subscription name, Balance (uses **Price** component — show €0,00 when none, keep last known balance once loaded), Check-In status (uses **Sticker** as the base), Icon-only Button (card settings; mainly signals the whole card is tappable, with chevron).
**Tokens used:** `colors.bg.tint.primary-pale` (#F7F7F9) surface; per-type card styling tokens; Price + Sticker tokens for balance and check-in.
**Accessibility:** Reading order (active): Card name → Subscription → "Balance: €0,00" → Check-in status → "Go to card details" [Button]. Inactive cards announce name → "Inactive" → check-out, no button. Optimized for font scaling up to 200%.
**iOS-first notes:** `NesTravelCard(title:, cardType:.nsFlex, subtext:, checkInText:, balanceLeading:, balanceInCents:, isActive:, checkedIn:).showChevron(true)` with `.balanceLoading()/.subtextLoading()/.checkInStatusLoading()`. Inline: `NesTravelCardInline(cardNumber:, cardType:.paymentCard, cardSize:.compact, isActive:)`.
> **Android:** `NesTravelCard(name, subtext=NesState.Success(...), checkInLabel, balanceInCents=NesState.Success(2050), balanceAlwaysShowDecimals, type=NesTravelCardType.NSFlex, checkedIn, onClick)`; `NesTravelCardInline(type=NesTravelCardInlineType.Anonymous/NSBusiness/SingleTicket, size, cardNumber)`.
**Don't:** Show more than one full-card variant per page view (the variant hints which card is in use — use inline to switch). Hide a loaded balance — always keep the last known value.

---

## Route
**When to use:** Show the stations/stops and carriers along a route — start, intermediate, and end locations, with times, delays, platforms, carriers, and error states.
**Variants:**
- `NesRouteItem` (current) with `boneType` = `Departure` | `Location` | (arrival via Location) — drives the route-line "bone" connector.
- `NesRouteMessage` with `boneType` = `ErrorStart` | `ErrorEnd` — for unknown/missed check-in or check-out at the start/end.
- Flags: `delay`, `cancelled` (+ `locationStrikeThrough`, `carrierCancelled` to override strike-through independently), `singleLineLocation` (ellipsize), `weight` (`Bold` default for items / `Normal`), `updatedTrailingText` (e.g. platform change), custom `content` slot. (`NesRoute` is deprecated — use `NesRouteItem`.)
**Anatomy / slots:** Bone/connector + Time (+ delay) + Location + Carrier + Trailing text (e.g. "Track 3", with `updatedTrailingText` for changes) + optional custom content (e.g. a Sticker "NS Prijstijd Deal").
**Tokens used:** Modality/route-line bone color tokens; delay + cancelled (grey/strike-through) state tokens; carrier text tokens.
**Accessibility:** Set `accessibilityLabel` on a container (e.g. UIStackView) combining departure/connection/arrival. Label parts: "Departure time, {time}", "Delayed by {n} minutes", "Departure location, {station}", "Carrier, {carrier}", "Boarding location, {platform}" — and equivalents for connection and arrival. NL labels documented (Vertrektijd, Vervoerder, Opstapplaats, etc.).
**iOS-first notes:** `NesRoute(embarkPoint: .Embark(time:, delay:, location:, trailingText:, updatedTrailingText:, carrier:, isCancelled:, isError:), connectionPoints: [...], disembarkPoint: .Disembark(...))`. Render items in a vertically scrolling list with `NesRouteItemDefaults.ITEM_SPACING`; use `time = ""` (not nil) to reserve leading space and keep alignment.
> **Android:** `NesRouteItem(boneType=NesBoneType.Departure/Location, time, delay, location, carrier, trailingText, updatedTrailingText, cancelled, singleLineLocation, weight, content{})`; `NesRouteMessage(boneType=NesBoneType.ErrorStart/ErrorEnd, message, time, weight)`.
**Don't:** Use the deprecated `NesRoute` per-item API for new work (use `NesRouteItem`). Drop time to `null` when you need to preserve alignment spacing (use `""`).

---

## Rush
**When to use:** Indicate how busy a train is when planning a trip (crowding insight).
**Variants:** `status` from quiet/calm → busy (`NesRushStatus.Calm`, `.Busy`, …). Display `type`: icon (default) or `text`.
**Anatomy / slots:** Rush icon, optionally accompanied by a text label for context.
**Tokens used:** Crowding-level color/icon tokens per status.
**Accessibility:** Pair the icon with a label so the crowding level isn't conveyed by icon/color alone.
**iOS-first notes:** `NesRush(status: .calm)` for icon; `NesRush(type: .text, status: .busy)` for text.
> **Android:** `NesRush(status = NesRushStatus.Calm)`.
**Don't:** Rely on the icon alone without a label when context is needed.

---

## Receipt
**When to use:** Show a calculated price outcome of a (partly) completed form, updating live as the user makes choices.
**Variants:** Single component in its most complete setup; sections (titles, cost items, subitems, total) can be removed without detaching; number of cost subitems is a property.
**Anatomy / slots:** Optional grouping Titles → cost items (and subitems) → total amount. Uses the **Price** component for amounts.
**Tokens used:** Price tokens for amounts; likely a `Strong` divider before the total; surface tokens.
**Accessibility:** Give a clear indication when data updates so the change is perceivable; announce updated totals.
**iOS-first notes:** Content always reflects current form choices. In Figma, delete a section with backspace (no detach); change subitem count via the amount property.
> **Android:** (No dedicated sample documented — compose from Price + dividers following the Figma structure.)
**Don't:** Use a title to group cost items when there's only a single cost item. Show stale totals after a form change.

---

## From To
**When to use:** Let users define a departure and arrival point (and optional via station) — the travel planner's core input.
**Variants:** `Base` (From, To, Via field + error message) and prefabs: `Brand Background`, `Surface Background`, `Via Station`, `Unfilled`.
**Anatomy / slots:** Departure field (always shown) → optional Via station field (enabled from options menu; always shows a Remove icon) → Destination field (always shown) → Swap icon (Tertiary Icon Button) → Error message (uses the Error Message component, optional top spacing). Common autocomplete uses List Item prefabs (Search Suggestion, Favorite, Current Location).
**Tokens used:** Brand vs. surface/neutral background tokens; input border + pressed/focus state tokens; error message token.
**Accessibility:** Each field is a Button with edit hints. Labels (EN): "Starting point, [Button], {station}, Edit the Starting point for your trip"; "Via Station, [Button]…"; "Remove Via station, [Button]"; "Arrival point, [Button], {station}…"; "Swap, [Button], Swap Start- and Arrival points"; "Error, [Error message], {message}". NL equivalents documented (Vertrekpunt, Aankomstpunt, Omwisselen, etc.). Mind the touch areas.
**iOS-first notes:** `NesFromToView(departure:, connection:, arrival:)`; set `.errorText` for validation (e.g. same departure/arrival). Pre-fill From/To with last entered locations; show placeholder only on first use. Truncate long station names. Error state stays contained within the component (readable on any background) with extra bottom padding.
> **Android:** (Compose following the Figma base/prefabs; iOS API shown above.)
**Don't:** Use the border on a brand background (omit it); do use the border on a neutral background. Let the error state overflow outside the component. Skip pre-filling the last locations.
