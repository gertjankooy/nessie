# Skill: Audit tokens (NESSIE)

Focused, token-only check. Use when the user wants to verify that a Figma screen/frame/component uses NESSIE design tokens correctly — without the full screen audit. (For a complete review use `/audit-screen`.)

## Inputs
- A Figma selection / frame / file URL. Read the actual values with the Figma MCP tools — especially `get_variable_defs` (bound variables) and `get_design_context`.

> **Requires Figma variable data.** This audit hinges on `get_variable_defs` — available in the Figma AI agent, or in an external LLM tool (Claude Code, Cursor, Codex, Copilot) **only when the Figma MCP / Dev Mode MCP server is connected**. Without it you can't see whether a value is a *bound* token: ask the user to connect the Figma MCP and select the frame, or state clearly that you can only comment on visible values, not on token bindings (don't pass a token check you couldn't verify).

> **Variable name format:** Figma reports bound variables in slash form (e.g. `--space/app/inset/default`, `--border/radius/container`). To match the token names in the reference docs, drop the leading `--` and replace `/` with `.`. The Figma/JSON names are the source of truth — do **not** trust older Notion labels (e.g. Notion `inset.relaxed`/`inset.loose` are really `inset.comfy`/`inset.relaxed`).

## Checks
1. **Color** — Every fill, stroke, and text color must be a bound NESSIE color variable (`base`/`applied` tier), never a raw hex and never a `core`/raw-palette token used directly. Verify the semantic choice fits the role (e.g. text on a colored surface uses the matching `*Contrast`/`on-default` token). See `reference/tokens/color.md` + `reference/tokens/applied.md`.
2. **Typography** — Text uses a NESSIE type style (heading1-4, body/article, label lg/default/sm/xs, caption, footnote, eyebrow, link), not a detached font size/weight. See `reference/tokens/typography.md`.
3. **Spacing** — All padding, gaps, and margins are on-scale spacing/layout tokens (`space.*`, `space.app.inset/stack/inline.*`). Flag off-scale values (e.g. 28, 36) and recommend the nearest token. See `reference/tokens/spacing.md` + `reference/patterns/layout.md`.
4. **Shape** — Corner radii and border widths use radius/border tokens, not literals. See `reference/tokens/shape.md`.
5. **Motion** — Any prototyped transitions use duration/easing tokens. See `reference/tokens/motion.md`.

## Output
A table: **Element | Property | Current value | Expected token | Severity**. Then a one-line summary. Distinguish "raw value, no token bound" (blocker) from "wrong semantic token" (warning) from "on-scale but could be more semantic" (suggestion). If a value is genuinely off-grid, say which two tokens it sits between.
