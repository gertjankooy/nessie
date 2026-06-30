---
description: Sync one (or all) NESSIE App component doc(s) from ZeroHeight into reference/components/<name>.md using the Tractie-style usage-doc standard.
argument-hint: <Component name | "all" | comma-list> [--check]
allowed-tools: mcp__claude_ai_ZeroHeight__list-pages, mcp__claude_ai_ZeroHeight__search-pages, mcp__claude_ai_ZeroHeight__get-page, mcp__claude_ai_ZeroHeight__list-releases, Read, Write, Edit
---

# /sync-component

Author or update the per-component reference doc(s) in `reference/components/` from the **App** documentation in the NESSIE ZeroHeight (`Nessie Design System` styleguide). One Markdown file per component, in the usage-doc standard below. Write in **US English**.

**Argument:** `$ARGUMENTS`

- A component name → sync that one (e.g. `/sync-component Button`).
- A comma-separated list → sync each (e.g. `/sync-component Button, Tag, Route`).
- `all` → sync every component under **COMPONENTS → App**.
- Append `--check` to report drift only (ZeroHeight vs the file's `last_synced` / content) **without writing**.

## Hard rules

1. **App only.** Use pages under `COMPONENTS → App` in `list-pages`. **Never** the `Web` group, even if a same-named Web page exists. If a component exists only under Web, report "no App page yet" and skip — the user adds Figma-only ones later.
2. **ZeroHeight is the only source of truth.** Do not invent content, variants, props, or guidance. Only write what the fetched page supports.
3. **Gaps are kept, not dropped.** If a standard section has nothing in ZeroHeight, keep the header and write `_Not available in ZeroHeight — to review._`, add the section name to frontmatter `gaps:`, and flag it in the run report. (This overrides the usual "omit empty sections" instinct — the user wants the reminder.)
4. **No implementation details.** No SwiftUI/Compose/web code, no Storybook links, no platform status/support tables. Usage guidance only. **Exception:** iOS-first *design* divergences are kept as `> **Android:**` / `> **iOS 26+:**` callouts inside the relevant section (NESSIE is iOS-first per `CLAUDE.md`).
5. **Drop the noise.** Ignore each image's `**Style**` / `**Attributes**` tables (generic `X:0 Y:0`, `#FFFFFF`, `848px`), decorative example images, the "Questions?" / "Copywriting / We've moved" blocks, and marketing prose.
6. **Tokens by meaning, never hex.** Where a token is named, use dotted JSON form (`content.text.default`); otherwise describe the role. See the token-doc convention in `CLAUDE.md`.
7. **Filename** = kebab-case of the ZeroHeight App page title, trimmed (`Button` → `button.md`, `Message Inline` → `message-inline.md`, `From To` → `from-to.md`).
8. After writing, **update `index.md`** so its row points to the per-component file, and (per project decision) once every component in a legacy grouped file (`buttons.md`, `forms.md`, `feedback.md`, `content.md`, `domain.md`, `navigation.md`) has its own file, delete the grouped file.

## Writing rules (from the Tractie usage-doc standard)

- **Sentence case** everywhere — headings, bullets, labels. Never title case, never all caps.
- **No dividers** — never use `---` between sections.
- **Active voice**; direct instructions, not passive description.
- **Use when / Don't use when** bullets are short noun/verb fragments, not full sentences, each ending with a period. ✅ "Filtering content with multiple selectable options." ❌ "Use this when you need to filter content."
- **Anatomy** bullets start with the part in **bold**, mark optional parts `(optional)` (not bold), then `: ` and the guideline. e.g. `**Title** (optional): summary of the empty state.`
- **Configurations** documents configurable properties teams actively set; each gets a `###` sub-section named by human concept (e.g. `### Variant`, `### Size`), not the API attribute. For **buttons and all form components**, end Configurations with a `⚠️ Missing the disabled state?` callout explaining why disabled states are intentionally omitted (and the Read-only vs Disabled distinction if relevant).
- **Content guidelines** do/don't format: `- Use: "Exporteer"` / `- Don't use: "Export"`. Include sentence-case guidance where relevant.
- **Accessibility** — only the consuming team's responsibilities (content they supply, integration they wire up, design decisions like not relying on color alone). Do not document what the component handles itself (semantics, keyboard, focus, ARIA). End each point with the WCAG criterion in backticks, e.g. `[2.4.6]`. ~3 bullets typical; don't pad.
- **Links** — preserve internal ZeroHeight/Tractie links from the source as full URLs.
- Use code/property names sparingly — only when needed to explain a guideline.

Which sections typically appear, by component type (guide, not a mandate — keep the header + `gaps` note when absent):

| Component type | Anatomy | Configurations | Placement | Behavior | Content guidelines | Best practices |
|---|---|---|---|---|---|---|
| Interactive control (Button, Checkbox, Input…) | Sometimes | Always | Sometimes | Sometimes | Usually | Sometimes |
| Feedback / messaging (Message Bar, Dialog…) | Rarely | Usually | Always | Sometimes | Always | Rarely |
| Structural / layout (Top Bar, Bottom Sheet…) | Always | Sometimes | Always | Sometimes | Sometimes | Rarely |
| Display / informational (Badge, Tag, Price…) | Sometimes | Usually | Sometimes | Rarely | Rarely | Sometimes |

## Workflow (per component)

1. `list-pages` → find the App page id (or `search-pages` by name, then confirm it's in the App group).
2. `get-page` that id → read the full page.
3. If `--check`: diff against the existing file, report changes (added/removed variants, changed behavior, new guidance), stop — no write.
4. Distill into the standard below.
5. `Write` `reference/components/<kebab>.md` (overwrite if present; preserve any line the user marked `<!-- keep -->`).
6. Set `last_synced` to today; set `zeroheight_page_id`/`url` to the real values; fill `gaps:`.
7. Update `index.md` (and remove the legacy grouped file once fully covered).
8. Report: file written, variant count, `gaps` flagged, any same-named Web page deliberately ignored.

## The standard (template)

Frontmatter is metadata for the sync tooling (not a content section). The body uses the fixed section order; no `---` dividers in the body.

````markdown
---
component: <ZeroHeight App page title>
category: buttons | navigation | forms | feedback | content | domain
status: stable | partial | figma-only
aliases: [<other names, e.g. TextField for Input>]
zeroheight_page_id: <int>
zeroheight_url: <page url>
figma_node: <node-id or "">
last_synced: <YYYY-MM-DD>
related: [<kebab names of related component files>]
gaps: [<section names written as "to review">]
---

# <Component name>

## Usage
### Use when
- <short fragment.>
### Don't use when
- <short fragment; name + link the better alternative.>

<optional 1-2 sentence disambiguation from a commonly-confused component.>

## Anatomy
- **<Part>**: <guideline.>
- **<Part>** (optional): <guideline.>

## Configurations
### <Property concept>
<values / guidance.>

<for buttons & form components:>
⚠️ **Missing the disabled state?** <why disabled is intentionally omitted; Read-only vs Disabled if relevant.>

## Placement
<container, neighbors, stacking, container-driven width.>

## Behavior
<responsive / scroll / timing / loading / interaction rules. iOS-first; `> **Android:**` callouts for divergence.>

## Best practices
- <short do/don't not tied to a property.>

## Content guidelines
- Use: "<copy>"
- Don't use: "<copy>"

## Accessibility
- <consuming-team responsibility.> `[x.x.x]`

## Source
- ZeroHeight: <url> (page `<id>`, synced <date>)
- Figma: <node or "—">
````

`## Source` is a provenance footer (not part of the Tractie content set) so the file is traceable and the `--check` mode has an anchor. Keep it last.
