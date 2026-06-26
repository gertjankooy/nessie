# NESSIE Typography Tokens

Type-style reference for NS app screens. Pick a **semantic preset** (heading/body/label/…) — never raw font sizes, never hardcoded weights. Font is **NS Sans** (Regular 400, Demi 550, Bold 700).

## 3-tier model

| Tier | Example | Who uses it |
| :--- | :--- | :--- |
| Core / raw | `font.size.800` = 32, `font.weight.bold` = 700, `font.leading.normal` = 150% | System only. **Never in designs.** |
| Base / semantic | `font.heading.size.1`, `font.body.size.default`, `font.label.size.sm` | **Designers pick these.** |

> **iOS:** `NesTextStyle` presets (target API) — e.g. `.heading1`, `.bodyDefault`, `.labelSm`. Old `NesTypography.TextStyle` factories are deprecated but still in production components. `NesTypography.loadAllFonts()` must run at launch. **Android:** matching preset vocabulary (21 presets). **Web/CSS:** `--nes-base-font-*` / Tailwind `nes:heading nes:body nes:label nes:label--lg nes:caption`.

## Headings — all Bold (700)

| Preset (iOS) | Size | Line-height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `heading1` | 32 (`font.size.800`) | 40 | -0.37 | Page title. |
| `heading2` | 24 (`font.size.600`) | 32 | -0.20 | Section header. |
| `heading3` | 20 (`font.size.500`) | 27 | -0.11 | Subsection. |
| `heading4` | 18 (`font.size.450`) | 25 | -0.07 | Card title. |

## Eyebrow

| Preset | Size | Weight | Leading | Tracking | Transform | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `eyebrow` | 12 | Demi 550 | tight 125% | widest 8% | UPPERCASE | Small tracked lead-in above a section title. |

## Body — Regular (400), `-strong` = Bold

| Preset | Size | Leading | Usage |
| :--- | :--- | :--- | :--- |
| `bodyDefault` / `bodyDefaultStrong` | 16 (`font.size.400`) | normal 150% | Default prose / paragraphs. |
| `bodyArticle` / `bodyArticleStrong` | 16 | normal 150% | Long-form article copy (wider max-width: prose.lg / 75ch). |

Body default max-width = prose 65ch; article = 75ch.

## Link

| Preset | Basis | Weight | Decoration | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `link` | body size | Demi 550 | underline, 3px offset | Inline text links / active. |

## Caption & Footnote — Regular (400)

| Preset | Size | Leading | Usage |
| :--- | :--- | :--- | :--- |
| `caption` / `captionStrong` | 14 (`font.size.350`) | normal 150% | Subtitle, metadata, secondary info. `Strong` = Bold. |
| `footnote` | 12 (`font.size.300`) | normal 150% | Legal / fine print. |

## Labels — Demi (550) default, `-strong` = Bold; tighter, single-line

| Preset | Size | Usage |
| :--- | :--- | :--- |
| `labelLg` / `labelLgStrong` | 18 (`font.size.450`) | Prominent control / large list item title. |
| `labelDefault` / `labelDefaultStrong` | 16 (`font.size.400`) | List item title, button text. |
| `labelSm` / `labelSmStrong` | 14 (`font.size.350`) | Form label, compact control. |
| `labelXs` / `labelXsStrong` | 12 (`font.size.300`) | Chip / badge / dense label. |

Labels use `font.label.leading` (normal) or `leading-tight` for single-line controls; tracking normal.

## Picking guide

| Need | Preset |
| :--- | :--- |
| Page title | `heading1` (or `heading2` if compact) |
| Section header | `heading2` / `heading3` |
| Card title | `heading4` |
| Prose / paragraph | `bodyDefault` |
| Long article | `bodyArticle` |
| List item title | `labelDefault` |
| Button text | `labelDefault` |
| Form field label | `labelSm` |
| Subtitle / metadata | `caption` |
| Legal / fine print | `footnote` |
| Inline link | `link` |
| Category lead-in | `eyebrow` |

## Rules / Don'ts

- **Never raw `font.size.*` / `font.weight.*`** in a design — pick a preset; the preset carries size + weight + leading + tracking together.
- **Don't recombine** a size with a different weight/leading — use the matched preset.
- **NS Sans only** — Regular 400 / Demi 550 / Bold 700. No other weights.
- **iOS:** target `NesTextStyle` presets; don't introduce new uses of the deprecated `NesTypography.TextStyle` factories.
- **Type color** comes from `content.text.*` (see color.md), never baked into the type style.
