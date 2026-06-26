# NESSIE Forms — Components (App / iOS-first)

iOS-first reference for Claude when designing or auditing forms in Figma Make. Use ONLY the App component variants documented here. Do not invent variants, props, or tokens. `> **Android:**` callouts flag platform divergence.

Core principle: reach for the `Nes*` component so it inherits role, 48pt min touch target, and semantics for free; always supply the dynamic, localized meaning (labels, state, error copy) the system cannot invent. There is intentionally **no Disabled state** for Checkbox / Radio (and Nessie avoids disabled interaction elements generally) — let users interact and give feedback via Error Message / Message Inline instead.

---

## Input / TextField
**When to use:** Single-line entry of text, numbers, email, password, or currency in forms and dialogs. Pick the variant by data type so the right keyboard appears. Use Textarea for multi-line, Select/Radio/Checkbox when choosing from a fixed set, Date Input for known dates.
**Variants:** (input type, drives keyboard) `Text`, `Email`, `Number`, `Password`, `Price`/`Currency`, `Read Only`.
- `Text`: default keyboard; any letters/numbers/symbols. Use for postal codes (number + letter mix).
- `Email`: email keyboard with `@` and `.com`.
- `Number`: number-pad; digits only.
- `Password`: masks characters as asterisks; supplies a show/hide toggle.
- `Price`: default keyboard with numbers layout (gives access to `,` for 14,99); currency symbol comes from device locale and is not editable.
- `Read Only`: non-interactive display of data the user entered earlier (not for static text that never had interaction — use text-list-item).
**Anatomy / slots:** Label (above) · optional "(optional)" suffix · optional Help Text (below label) · input field container · optional LeadingIcon · optional TrailingIcon / TrailingButton (e.g. opens date picker, fires its own action separately) · placeholder text (an example, never a label) · validation/Error Message (below). Two distinct App components: `NesInput` (composed: title/label + helpText + errorText + required + border + icons baked in) and `NesTextField` (bare field only — no label/help/error slots; compose them around it).
**Tokens used:** `form.*` applied tokens for field fill, border, text, placeholder. Type via typography tokens (never hardcoded sizes — supports Resize Text). On tinted backgrounds keep contrast ≥ 4.5:1.
**Accessibility:** Label must stay visible on focus and be programmatically associated with the field; announced to screen reader on focus. Never use placeholder as the label. Error field gets `aria-describedby` pointing at the error message id; Error Message prepends hidden "Error:". Entire field can be the touch target; a TrailingButton is a separate target/action. Min target 48pt.
**iOS-first notes:** `NesInput(title:value:)` with `.isRequired`, `.errorText`, `.helpText`, `.placeholder`, `.isSecure` (password), `.hasBorder`, `.leadingIcon`, `.trailingIcon`, `.isTrailingIconUserInteractionEnabled`, `.keyboardType`. `NesTextField(text:)` is the label-less field. Min field width 164dp; overflow text scrolls while typing, truncates when unfocused.
**Don't:** Don't use placeholder as a label. Don't use Number for postal codes (use Text). Don't use Read Only for static, never-interactive text. Don't pick a long label; keep it brief — if a long label + "(optional)" is unavoidable, the optional tag follows inline.

---

## Textarea Input
**When to use:** Multi-line free-form text — comments, chat, feedback. Use single-line Input for short answers.
**Variants:** No type variants. Flags mirror Input: label, helpText, isRequired, border, errorText.
**Anatomy / slots:** Label · optional Help Text · multi-line field · Error Message. Default keyboard.
**Tokens used:** Same `form.*` field tokens as Input; typography tokens for text.
**Accessibility:** Same as Input — visible associated label, error via `aria-describedby` + hidden "Error:" prefix.
**iOS-first notes:** `NesTextAreaInput(label:helpText:isRequired:border:errorText:)`. Default height ≈ 104px; adjust to expected line count. `> **Android:**` no dedicated textarea — use `NesTextField(singleLine = false)` with an explicit height modifier.
**Don't:** Don't use for short single-line input. Don't shrink below a usable multi-line height.

---

## Label
**When to use:** Immediately before/above every form control to say what to provide.
**Variants:** Required vs optional. Optional appends the word "optioneel" in parentheses right after the label text.
**Anatomy / slots:** Label text · optional "(optioneel)" suffix · optional tooltip trigger (popover) for info only some users need.
**Tokens used:** Label typography + form label color tokens.
**Accessibility:** Must stay visible when the input is focused, be announced to the screen reader on focus, and be associated with the input in code. Help Text appears directly after the label so AT reads context before asking for data.
**iOS-first notes:** `NesLabel(text:isRequired:)`. Placed above inputs (top-aligned — higher completion than left-aligned). `> **Android:**` `NesLabel(text =, optional = true)` (uses `optional` flag rather than `isRequired`).
**Don't:** Don't use a label to give a data example (use Help Text or placeholder). Don't use placeholder as a label. Keep to max ~3 short words, always capitalized, active verb where possible.

---

## Help Text
**When to use:** Context the label can't give — where to find info, how data is used, how many options can be selected, technical boundaries (max chars, allowed signs) that prevent an error.
**Variants:** None. Positioned below the Label (for the whole field/group) or per option in Checkbox/Radio groups.
**Anatomy / slots:** Short helper string directly under the label.
**Tokens used:** `form.helptext` color token (iOS `NesColor.formHelptext`), `sizeBase` font token, min height ≈ spacing6.
**Accessibility:** Sits right after the label so AT users get the extra info before their data is requested. On tinted backgrounds the default help color may fail contrast — clarify the label or switch help to default text color.
**iOS-first notes:** Available focused-input context. `> **Android:**` no dedicated component yet — styled `Text` with `NesTypography.TextBase` / `Gray500`, min height 24dp.
**Don't:** Don't use when the label already says enough. Don't write long paragraphs — keep short and active.

---

## Error Message
**When to use:** A validation error on a field or group (must choose an option, must correct input). Not for app/screen-wide errors (use Message Bar) and not for permission/eligibility messaging.
**Variants:** Single-field error and group error (for a Radio / Checkbox group, shown in the group's footer).
**Anatomy / slots:** Alert icon · message string · top padding for positioning. For horizontally placed inputs, align the error to the left, not under the second field.
**Tokens used:** Error/danger semantic color family (icon + text); pair foreground with its own `*Contrast` family on tinted surfaces.
**Accessibility:** Component bakes in a hidden "Error:" prefix (`.sr-only`) so AT reads "Error: <message>". The field must set `aria-describedby` to the error's id. Status is conveyed by icon + worded label, never color alone. Announce via assertive live region for blocking errors.
**iOS-first notes:** `NesErrorView(title:)`. In a form, prefer inline validation. `> **Android:**` `NesErrorMessage(errorMessage =)`, or pass `errorMessage` into `NesFormRow` for grouped fields.
**Don't:** Don't show errors on focus/tap or while typing — only when the user tries to advance. Don't use for whole-screen errors. Don't blame the user; give constructive fix advice.

---

## Checkbox
**When to use:** Select any number (zero to many) of options from a visible list; or a single checkbox to confirm/agree. Use when all options should be visible at a glance and a separate submit step applies.
**Variants:** State `unchecked` / `checked` / `indeterminate`; flags `hasBorder`, `showError`. **No disabled state by design.** Two App components: `NesCheckbox` (control only) and `NesCheckboxView` (control + title + helpText).
**Anatomy / slots:** Grouped inside a Listview. Label/heading in the Listview header · optional Help Text below the label and/or per option · checkbox + selectable label rows (tap label or box) · Error Message in the Listview footer. "Select all" with indeterminate when children are mixed checked/unchecked.
**Tokens used:** `form.*` control fill/border/check tokens; default fill #FFFFFF, 1px inside border.
**Accessibility:** Role + checked state wired in — supply label + state name. Whole label is a tap target. Group errors live in the footer with hidden "Error:" prefix. No disabled state avoids low-contrast greyed-out controls that AT skips.
**iOS-first notes:** `NesCheckbox(isChecked:).hasBorder().isIndeterminate()` / `.showError(true)`; `NesCheckboxView(isChecked:title:helpText:)`. `> **Android:**` `NesCheckbox(text =, checked =, onCheckedChange =, helpText =, border =, error =)`.
**Don't:** Don't use for single-choice (use Radio). Don't list horizontally — stack vertically. Don't use negative labels ("I don't want…"); phrase positively. Default is nothing selected.

---

## Radio Buttons
**When to use:** Choose exactly one option from a small set of mutually exclusive choices that fit a small viewport.
**Variants:** State selected / not selected; flag `hasBorder`. **No disabled state by design.** Two App components: `NesRadioButton` (control) and `NesRadioButtonView` (control + title + helpText). (Radio Panel is a separate component, not covered here.)
**Anatomy / slots:** Grouped in a Listview. Label in header · optional Help Text below label and/or per option · radio + selectable label rows · Error Message in footer.
**Tokens used:** `form.*` control tokens; #FFFFFF fill, 1px inside border.
**Accessibility:** Role.RadioButton + state wired in; supply label + state. Whole label tappable. Vertical stack preferred; horizontal needs ≥16px between options (less scannable).
**iOS-first notes:** `NesRadioButton(isSelected:).hasBorder().onTapRadioButton{}`; `NesRadioButtonView(isSelected:title:helpText:)`. Caller manages single-selection across the group. `> **Android:**` `NesRadioButton(text =, checked = state == option){ state = option }`.
**Don't:** Don't use for multi-select or zero-allowed (use Checkbox). Don't use when >~7 options (use Select / search). Don't use to flip a setting on/off instantly (use Toggle). Preselect the first option by default — except where a preselection implies a wrong assumption (e.g. gender), then select none; add an explicit "None" option if no-choice is valid.

---

## Toggle
**When to use:** Turn a feature/mode on or off with an immediate effect (UI or background). Saves instantly on tap — no submit step.
**Variants:** State on / off; iOS state set `.default` plus a `Loading` state (`NesToggleableState.Loading`). Optional `.labelHidden()`.
**Anatomy / slots:** Toggle switch + label (label describes the ON state). Detailed description goes directly below the toggle.
**Tokens used:** `form.*` / control track + thumb tokens; #FFFFFF fill, 1px inside border.
**Accessibility:** Role.Switch + state wiring baked in — supply label + state name. Min 48pt target. Label written for the ON state.
**iOS-first notes:** `NesToggle("Title", isOn: $isOn)`; hide label via `.labelHidden()`. `> **Android:**` `NesToggleRow(label =, checked =, onCheckedChange =)` for label+switch, `NesToggle(checked =)` for switch only, and a `NesToggleableState.Loading` state for async.
**Don't:** Don't use for choosing among grouped options (use Radio) or when a separate submit step is needed (use Checkbox). Don't write negated labels ("Notifications Off"). Don't flip-then-submit — state commits on click.

---

## Select
**When to use:** Last resort for single choice from ~7–15 options with limited space. Triggers the native platform select menu.
**Variants:** Native select (no Nessie style variants). Trigger field shows placeholder or default value.
**Anatomy / slots:** Label · trigger field showing current/placeholder value · native menu on tap. Native menus available in the Figma library under **Extras**.
**Tokens used:** `form.*` field tokens for the trigger; menu is native/OS-styled.
**Accessibility:** Native control inherits platform a11y; supply a clear label and a "Select [group name]" placeholder when no default.
**iOS-first notes:** Opens the native iOS picker. `> **Android:**` opens the native Android dropdown menu — both reachable from the same Select trigger.
**Don't:** Don't use with <7 options (use Radio / Radio Panel / Stepper). Don't use with >15 options (use search + autosuggest). List alphabetically/logically; keep option labels under ~5 words.

---

## Date Input
**When to use:** A date the user already knows or can look up without a calendar (e.g. date of birth), or a date far in the future. For scheduling, use Date Picker Input instead (separate component).
**Variants:** Single field, or separate Day / Month / Year fields. Flags: helpText, isRequired, border, errorText. States include error.
**Anatomy / slots:** Label (include label in the touch target) · optional Help Text with format hint · field(s) with placeholders like "dd" / "mm" / "jjjj" · Error Message. Native date-picker calendars live in the Figma library under **Extras**.
**Tokens used:** `form.*` field tokens (example fill #F7F7F9, 1px border).
**Accessibility:** Numeric keyboard on touch devices. Label is part of the touch target. Clear per-field labels ("Day"/"Month"/"Year").
**iOS-first notes:** `NesDateInput(label:helpText:isRequired:border:errorText:)`. `> **Android:**` `NesDateInput` inside `NesFormRow(label=, errorMessage=)` with `onValueChanged` / `onError`; a separate `NesDatePicker` dialog can fill a read-only `NesTextField` with a calendar trailing icon.
**Don't:** Don't use for scheduling tasks (use Date Picker). Don't omit format placeholders.

---

## Stepper
**When to use:** Increase/decrease a numeric value that deviates only slightly from a common default — small adjustments by step (tickets, minutes).
**Variants:** Configurable `range`, `stepSize`, `unit`; optional label + help text (`NesLabeledStepper` on Android). At range min/max the corresponding button auto-disables.
**Anatomy / slots:** Optional Label + Help Text · minus button · value · plus button. Step and unit made explicit in copy (euros, adults, minutes, %).
**Tokens used:** `form.*` / button + field tokens; #FFFFFF fill, 1px border.
**Accessibility:** Provide `.minusButtonAccessibilityLabel` / `.plusButtonAccessibilityLabel`; pass a `unit` (e.g. "minutes") so the value is announced meaningfully. Buttons disable at range bounds.
**iOS-first notes:** `NesStepper(title:value:).titleWeight().helpText().range().stepSize()`. `> **Android:**` `NesStepper(value=, range=, stepSize=, unit=, onStepperChanged=)`, wrap with `NesLabeledStepper(label=, helpText=)` for label + help.
**Don't:** Don't use for large-variability values or big jumps (e.g. 1→25 — use a Number Input). Set the most common value as default.

---

## OTP Input
**When to use:** Securely enter a one-time verification code via separate single-character cells.
**Variants:** Configurable `length` (default 6, e.g. 4); states: default/empty, prefilled (cursor at end), error, readOnly, disabled. Optional custom `horizontalArrangement` (alignment/spacing).
**Anatomy / slots:** Row of single-character input cells; optional `errorMessage` below.
**Tokens used:** `form.*` field/cell tokens.
**Accessibility:** Error message announced; on error a wiggle animation plays and the value auto-clears (field forced readOnly during the animation to block input).
**iOS-first notes:** App OTP component (`NesOTPInput`). `> **Android:**` `NesOTPInput(value=, onValueChange=, length=, errorMessage=, readOnly=, enabled=, horizontalArrangement=)`; error wiggle + auto-clear behavior as above.
**Don't:** Don't allow editing during the error animation. Don't use for general numeric input (use Number Input).
