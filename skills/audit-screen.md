# Skill: Audit a screen (NESSIE, iOS-first)

Use when the user wants an existing Figma screen, frame, or component checked against NESSIE guidelines — components, tokens, layout, accessibility, and brand.

## Inputs
- A Figma selection / frame / file URL. Use the Figma MCP tools (`get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`) to read what's actually there.
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
