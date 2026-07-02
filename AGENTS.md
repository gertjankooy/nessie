# NESSIE Design System — Agent Skill

You are working with **NESSIE**, the NS (Dutch Railways) design system. This skill helps you **design new screens** and **audit existing screens** so they correctly follow NESSIE components, tokens, layout, accessibility, and brand. It is tool-agnostic — it works with any AI coding/design agent (Claude Code, Cursor, Codex, Copilot, the Figma AI agent, Figma Make).

**Default context: iOS app.** Screens are designed iOS-first; Android is derived afterwards from the differences. Only treat a task as web or Android when the user says so.

## Context detection — run this first, every session

Before reading skill files or producing any design output, determine which environment you are running in and verify its prerequisite.

### Local coding agent (Claude Code, Cursor, Codex, Copilot, …)

**How to detect:** You have direct filesystem access to this repository (you can read `AGENTS.md`, `skills/`, and `reference/`), and there is **no** `[Enabled Libraries: …]` block and **no** `src/NesFundamentals` kit.

**Prerequisite:** none — the reference docs in this repo are self-contained. Read this brief, then the relevant skill and reference files below, and proceed.

### Figma Agent (AI panel in Figma)

**How to detect:** Your system context contains an `[Enabled Libraries: …]` block (injected by the Figma AI panel).

**Prerequisite check:** Scan `[Enabled Libraries: …]` for the key `lk-167c442bae9da6aac8ec1c58e6026a2f71189db5c1f46b7eeb3795b562284aadea1732849c8ad53afc2713a37d59dc416728cd6d7e5b2e385947a8f5d42ab4ec`.

- ✅ **Key present** → proceed normally.
- ❌ **Key absent** → stop and tell the user:

  > The **🚄 NES App Components** library is not connected. Please add it via the **Add Context** button in the Figma AI panel, then try again.

Do not attempt design or audit work until the library is connected.

### Figma Make (code generation)

**How to detect:** No `[Enabled Libraries: …]` block in context; you have filesystem access to a `src/` directory with React source files.

**Prerequisite check:** Verify that `../src/NesFundamentals/guidelines/Guidelines.md` is readable.

- ✅ **File present** → invoke the `make-kit` skill and proceed.
- ❌ **File absent** → stop and tell the user:

  > The **Nessie Make Kit** is not included in this project. Please add it as a dependency in Figma Make before generating any UI.

Do not generate any UI until the Make Kit is confirmed present.

## How to use this skill

This file (`AGENTS.md`) is the entry point. **Read the relevant skill file before producing any design output** — do not rely on memory from a previous session. Then lazy-load only the reference files you need for that task (each `reference/` file is self-contained and skimmable).

| User intent | Read this skill file first — before any output | Then load |
| :--- | :--- | :--- |
| Design / generate a new screen, view, or flow | **`skills/build-screen.md`** | `reference/components/index.md`, then specific component + token + layout files |
| Review / check an existing screen against NESSIE | **`skills/audit-screen.md`** | the five reference areas it lists |
| Check only token usage | **`skills/audit-tokens.md`** | `reference/tokens/*` |

All paths are **relative to the repository root**. Re-read files every session; never assume you remember them.

## Reference map

- `reference/design-language.md` — brand personality, visual direction, iconography, brand-color usage. (The "what makes it feel NESSIE" doc.)
- `reference/components/index.md` — **master catalog**: every App component, when to use it, and a link to its own file. **Start here to pick components**, then open the linked `reference/components/<component>.md` (one file per component — e.g. `button.md`, `input.md`, `route.md`). Each is synced from ZeroHeight and carries `zeroheight_page_id` / `last_synced` / `gaps` frontmatter. (Maintainers refresh docs with the `/sync-docs` command in Claude Code.)
- `reference/tokens/` — `color.md` · `typography.md` · `spacing.md` · `shape.md` · `motion.md` · `applied.md`
- `reference/patterns/` — `layout.md` (app insets/stacks/surfaces/safe areas) · `navigation-patterns.md` (nav **structure**: top bar, tabs vs bottom nav, back nav) · `interaction-models.md` (transient **surfaces**: menus, sheets, dialogs, flows, panels — iOS vs Android) · `accessibility.md` · `settings-utility.md` (settings list layout/behaviour/states)

### Token doc convention (always follow when adding/editing tokens)

Token names have two shapes that must never be confused: **Figma binds variables in slash form with a `--` prefix** (e.g. `--content/text/default`), while **these docs use dotted JSON form** (e.g. `content.text.default`). Convert by dropping the leading `--` and replacing `/` with `.`. The Token Studio JSON / Figma variable names are authoritative; older Notion labels are out of date.

Every file in `reference/tokens/` MUST carry a callout near the top stating this rule with a token example from that file, cross-linking to `reference/patterns/layout.md` (the single-source naming crosswalk). When you add a new token file or a new token category, add/extend that callout — do not document a token only in dotted form without noting its Figma `--slash/form`.

## Non-negotiable rules (always apply)

1. **Tokens only.** Every color, type style, spacing, radius, and motion value comes from a NESSIE token (`base`/semantic or `applied`/component tier). Never a raw hex, never an off-scale number, never a `core`/raw-palette token used directly.
2. **Components first.** Use an existing NESSIE App component for anything it covers — never hand-roll a duplicate. Use only documented variants.
3. **Dark mode is automatic.** Tokens remap per mode; never hardcode light-mode values or branch on mode manually.
4. **Accessibility is built in, meaning is yours.** NESSIE components carry role / touch-target / heading semantics; you must still supply labels, contrast pairings, and structure (`reference/patterns/accessibility.md`).
5. **Figma generation.** When running in a Figma environment, before calling `use_figma` follow the `/figma-use` skill (mandatory). Prefer the Figma plugin's bundled skills when present.
6. **When in doubt, flag it.** If a design needs something the system doesn't have, surface it as a system gap rather than inventing a token or component.
7. **Read before you design.** When any screen or component task starts, read the skill file for that task (from the routing table above) *before* writing any design output. This is a hard gate, not a suggestion.

## Figma Make — Nessie Kit

When running in **Figma Make** (generating React/web UI), the Nessie Kit applies in addition to the rules above.

### Make Kit bootstrap

At the start of every Make session, these design-system guidelines MUST be read in full **before generating any UI**:

- `../src/NesFundamentals/guidelines/Guidelines.md` — NES Fundamentals guidelines

Invoke the `make-kit` skill **before** generating any UI element, updating tokens, picking icons, or reproducing an attached design or screenshot.

### Before applying styles

Before hardcoding a color, spacing, radius, font-size, or any other style value, check the kit's stylesheet for a CSS custom property that fits — e.g. `--primary-button`, `--text-default`, `--spacer-md`. Use `var(--name)` rather than raw hex / px / rem values. Hardcoded values bypass the kit's theming and break dark mode, re-skinning, and future token changes.

Some base components have styling (e.g. gap, typography) baked in as defaults. Explicitly set any styling from the guidelines in generated React to override those defaults.

## Platform notes

iOS-first. Android-specific and iOS-26+ distinctions live in clearly-marked sections of `reference/patterns/navigation-patterns.md` and as `> **Android:**` / `> **iOS 26+:**` callouts inside component files. Add new distinctions there as they're discovered.
