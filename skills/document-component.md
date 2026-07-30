# Skill: Document a component (NESSIE, iOS-first)

Use when creating or updating a `reference/components/<kebab>.md` doc for a NESSIE **App** component. Produces a doc that matches the house standard so it's consistent and machine-navigable.

## The standard is the spec
Follow **[`reference/components/_component-doc-standard.md`](../reference/components/_component-doc-standard.md)** — it defines the frontmatter, the fixed section order, the cross-link and gaps conventions, and a filled skeleton. This skill is the *procedure*; that file is the *spec*. Don't restate it — open it and follow it.

> Maintainers with the ZeroHeight MCP connected can run `/sync-docs <name>` to do this automatically from ZeroHeight. Use this skill when authoring by hand, or when sourcing from pasted content instead of a live connection.

## Before you write
1. **Confirm it's an App component.** Use `COMPONENTS → App` on ZeroHeight — never the `Web` group. If it exists only under Web, stop and say so.
2. **Get the source.** Read the ZeroHeight App page (via the ZeroHeight MCP `get-page`, or from content the user pastes). Optionally read the Figma node for anatomy/variants. **ZeroHeight is the source of truth — never invent variants, states, props, or token names.**
3. **Check for an existing file.** If `reference/components/<kebab>.md` already exists, edit it (reconcile both directions — fold in new/changed content *and* remove what the source dropped); don't create a duplicate.

## Write it
Open the spec and follow it for the **frontmatter, section order, disabled-state callout, gaps convention, and cross-links** — this skill does not restate them. While filling the doc from the source:

4. **Fill only what the source documents.** Every variant, state, and token name comes from ZeroHeight/Figma; where the source is silent, mark a gap per the spec — don't infer.
5. **Set `last_synced` to today**, and list every undocumented section in `gaps:`.
6. **Mark anything authored ahead of the source.** If you add a decision that isn't in ZeroHeight yet (from a design meeting, app-team guidance, etc.), it **must** carry the `Local guidance` marker — see the spec's *Local guidance* section. This is not optional; without it `/sync-docs` will delete the block on the next run.

## Finish
6. **Filename** = kebab-case of the App page title; **update `reference/components/index.md`** — add or refresh the row (`| Name | when to use | [kebab.md](kebab.md) |`) under the right category section.
7. **Run the [authoring checklist](../reference/components/_component-doc-standard.md) in the spec** before calling it done.
8. **Report** — the file written, sections filled vs `gaps:` flagged, any Web page skipped, and confirm the index row was updated.
