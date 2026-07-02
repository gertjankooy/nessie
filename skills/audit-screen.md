# Skill: Audit a screen (NESSIE, iOS-first)

Use when the user wants an existing Figma screen, frame, or component checked against NESSIE guidelines — components, tokens, layout, accessibility, and brand.

## Reading the design (environment dependency — check this first)

Auditing a real Figma screen means reading it through the **Figma MCP tools** (`get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`). Their availability depends on where you run:

- **Figma AI agent** — available natively; read the selection / frame directly.
- **External LLM tool** (Claude Code, Cursor, Codex, Copilot) — available **only if the Figma MCP (Dev Mode MCP server) is connected** in the tool and a frame is selected. If it is, use it the same way.
- **No Figma access** — if those tools aren't available you **cannot read the file**. Ask the user to either **(a)** connect the Figma MCP and select the frame, or **(b)** paste a **screenshot** plus, where possible, exported code and the bound-variable list. Then audit from what you were given and **state the reduced fidelity**: without `get_variable_defs` you can flag visible issues but **cannot confirm token bindings** (a value that looks right may not be a bound token, and vice versa) — mark those checks **"unverified"** rather than passing them.

## Inputs
- A Figma selection / frame / file URL (read via the tools above), or a screenshot / exported code when no Figma access is available.
- Assume **iOS app** context unless told otherwise.

## What to check (run all five passes)
1. **Components** — Is every element an actual NESSIE App component, used with a valid variant? Flag hand-built elements that duplicate a `Nes*` component. Cross-check against `reference/components/index.md` and the relevant component file.
2. **Tokens** — Every color, type style, spacing, radius, and motion value must map to a NESSIE token. Flag raw hex, off-scale spacing, non-token type. See `reference/tokens/*` (or run the focused `/audit-tokens` skill).
3. **Layout** — Correct surface (base/default/elevated), app inset/stack/gap tokens, safe areas, list density. See `reference/patterns/layout.md`.
4. **Accessibility** — Contrast pairings (`*Contrast` families, 4.5:1), touch-target minimums, heading structure, color-not-alone, meaningful labels. See `reference/patterns/accessibility.md`.
5. **Brand & content** — Tone, iconography, brand-color usage per `reference/design-language.md`.

## Output format
Report findings grouped by the five passes, each as:
- **Severity** (Blocker / Warning / Suggestion)
- **What** — the specific element and the rule it breaks
- **Fix** — the exact NESSIE component/token/value to use instead

End with a short summary count (e.g. "3 blockers, 5 warnings"). Prefer concrete, copy-pasteable fixes over general advice. If something can't be verified from the Figma data, say so rather than guessing.
