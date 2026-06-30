# NESSIE Component Index — Master Catalog

Routing/lookup table for the NESSIE (NS Dutch Railways) **App** component library. iOS-first; use only documented App variants — never invent variants.

**Read this first** to pick a component, then open its own `<component>.md` file (linked below) for usage, anatomy, configurations, placement, behavior, content, and accessibility. Each file is synced from the NS ZeroHeight and carries frontmatter (`zeroheight_page_id`, `last_synced`, `gaps`). Run `/sync-component <name>` to refresh one from ZeroHeight, or `/sync-component all`.

> Sections marked `_Not available in ZeroHeight — to review._` (and listed in each file's `gaps:`) are documentation gaps to fill later, not missing features.

## Buttons

| Component | When to use | Doc |
| :--- | :--- | :--- |
| Button | Primary on-screen action; types Brand/Primary/Secondary/Tertiary/Link, plus Icon-only and Floating, sizes, destructive/inverted/loading. | [button.md](button.md) |
| Button Group | Group two or three related actions (one primary + tertiary others). | [button-group.md](button-group.md) |

## Navigation

| Component | When to use | Doc |
| :--- | :--- | :--- |
| Bottom Navigation | Persistent switch between top-level destinations. | [bottom-navigation.md](bottom-navigation.md) |
| Top Bar | Screen title, back option, contextual actions, branding. | [top-bar.md](top-bar.md) |
| Tabs | Navigate between related, same-level content groups. | [tabs.md](tabs.md) |
| Sticky Footer | One or two important CTAs pinned to the bottom. | [sticky-footer.md](sticky-footer.md) |

## Forms

| Component | When to use | Doc |
| :--- | :--- | :--- |
| Input | Text/number entry; types Text/Email/Number/Password/Price/Read-only. | [input.md](input.md) |
| Textarea Input | Multi-line free-form text. | [textarea-input.md](textarea-input.md) |
| Label | Names a form control; placed above the input. | [label.md](label.md) |
| Help Text | In-context help after the label. | [help-text.md](help-text.md) |
| Error Message | Inline form validation error. | [error-message.md](error-message.md) |
| Checkboxes | Select any number of options from a list. | [checkboxes.md](checkboxes.md) |
| Radio Buttons | Select exactly one from mutually exclusive options. | [radio-buttons.md](radio-buttons.md) |
| Radio Panel | Pick one of 2–3 short options side by side. | [radio-panel.md](radio-panel.md) |
| Toggle | Switch a feature on/off with immediate effect. | [toggle.md](toggle.md) |
| Select | One choice from ~7–15 options via native menu. | [select.md](select.md) |
| Selectable | Single/multi-select set of content tiles (form tokens). | [selectable.md](selectable.md) |
| OTP Input | Enter a one-time verification code. | [otp-input.md](otp-input.md) |
| Stepper | Increase/decrease a numerical value near a default. | [stepper.md](stepper.md) |
| Date Input | Enter a known date (e.g. date of birth). | [date-input.md](date-input.md) |
| Date Picker Input | Schedule a date via input + native picker. | [date-picker-input.md](date-picker-input.md) |
| Time Picker Input | Schedule a time via input + native picker. | [time-picker-input.md](time-picker-input.md) |
| Range Slider | Select a value within a numeric range. | [range-slider.md](range-slider.md) |
| Chipcard Input | Enter an OV-chipkaart number. | [chipcard-input.md](chipcard-input.md) |
| Creditcard Input | Enter a credit card number (auto type/format). | [creditcard-input.md](creditcard-input.md) |

## Feedback

| Component | When to use | Doc |
| :--- | :--- | :--- |
| Message Inline | Contextual status within a page; Default/Expandable/Navigate. | [message-inline.md](message-inline.md) |
| Message Bar | System-level message below the Top Bar. | [message-bar.md](message-bar.md) |
| Message Toast | Brief confirmation feedback, auto-dismiss. | [message-toast.md](message-toast.md) |
| Badge | Count or status indicator on another element. | [badge.md](badge.md) |
| Loader | Indeterminate loading (>3s). | [loader.md](loader.md) |
| Skeleton | Shaped placeholder while content loads (>2s). | [skeleton.md](skeleton.md) |
| Highlight Box | Make non-critical info jump out; lighter than Message Inline. | [highlight-box.md](highlight-box.md) |
| Feature Tip | Coachmark introducing a feature. | [feature-tip.md](feature-tip.md) |
| Dialog | Interruptive alert requiring acknowledgment (iOS native). | [dialog.md](dialog.md) |

## Content

| Component | When to use | Doc |
| :--- | :--- | :--- |
| List Items | Vertical list of related info/actions; Base + prefabs. | [list-items.md](list-items.md) |
| Text List Items | Text-only list; Ordered/Unordered/Checked. | [text-list-items.md](text-list-items.md) |
| Tiles | Group related info/actions as a card; entry point to detail. | [tiles.md](tiles.md) |
| Bottom Sheet | Supplementary content surface over the primary UI. | [bottom-sheet.md](bottom-sheet.md) |
| Expandable | Show/hide sections; List or Stand-alone. | [expandable.md](expandable.md) |
| Chips | Filter content, trigger actions, or dismiss a choice. | [chips.md](chips.md) |
| Sticker | Highlight contextual info on a nearby element. | [sticker.md](sticker.md) |
| Tag | Inline line/route number or platform/track location. | [tag.md](tag.md) |
| Price | Display an amount of money. | [price.md](price.md) |
| Dividers | Separate content groups; Default/Strong/Brand. | [dividers.md](dividers.md) |
| Link | Button styled as a link ("Read more", external, attachment). | [link.md](link.md) |
| Image | Visual support with fixed aspect ratios. | [image.md](image.md) |
| Icon | NES icon by name/size (retrieval API documented). | [icon.md](icon.md) |
| Hero | Attention-grabbing page intro with image + title. | [hero.md](hero.md) |

## Domain (NS travel-planner — use modality tokens)

| Component | When to use | Doc |
| :--- | :--- | :--- |
| Journey Pill | Compact pill for a journey leg/transfer/expand. | [journey-pill.md](journey-pill.md) |
| Travel Cards | Show a travel card's status, balance, check-in. | [travel-cards.md](travel-cards.md) |
| Route | Stations/carriers along a route, with times/delays/platforms. | [route.md](route.md) |
| Rush | Indicate how busy a train is. | [rush.md](rush.md) |
| Receipt | Live calculated price outcome of a form. | [receipt.md](receipt.md) |
| From To | Departure/arrival/via input for the travel planner. | [from-to.md](from-to.md) |
