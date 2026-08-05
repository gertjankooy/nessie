# H1 test: this heading should NOT appear twice

Throwaway probe for the ZeroHeight markdown sync. Sync this file to a scratch ZeroHeight page and record what renders in the results table at the bottom. Delete the whole `zeroheight-sync-test/` folder once the answers are captured.

**First thing to check:** ZeroHeight's docs say H1 becomes the page title and H2 is the largest in-page heading. If the H1 above appears as both the page title and a heading in the body, then pushed docs must start at H2, which conflicts with the current component standard (section 1 is `# <Component>`).

## Test 1: Figma iframe embed (the decider)

If this renders as an interactive Figma frame, the whole repo-to-ZeroHeight idea is viable. If it renders as escaped text, or vanishes, image-heavy component pages have to stay editor-authored.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/KsSrdx1GQvt1kRfXhsPiT6/%F0%9F%9A%84-NES-App-Components?m=auto&node-id=20332-2425&embed-host=share" allowfullscreen></iframe>

## Test 2: Plain markdown image, absolute URL

Baseline. If this fails, nothing else about images matters.

![Do example](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/do.png)

## Test 3: Relative image path (expected to fail)

ZeroHeight documents that relative URLs are not supported. Confirming it here so the rule is proven rather than assumed.

![Relative path](img/do.png)

## Test 4: Raw HTML image with a set width

If this works, image sizing is solved.

<img src="https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/do.png" width="300" alt="Width-constrained image">

## Test 5: Two images side by side, HTML table

The do/don't layout. Gives sizing and captions together.

<table>
<tr>
<td width="50%"><img src="https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/do.png" width="100%" alt="Do"></td>
<td width="50%"><img src="https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/dont.png" width="100%" alt="Don't"></td>
</tr>
<tr>
<td><strong>Do.</strong> Caption sits under the image.</td>
<td><strong>Don't.</strong> Caption sits under the image.</td>
</tr>
</table>

## Test 6: Two images side by side, markdown table

The portable fallback. Needs no raw HTML, so it survives even if HTML is stripped. Columns split the width evenly, which sizes the images indirectly.

| Do | Don't |
| :--- | :--- |
| ![Do](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/do.png) | ![Don't](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/dont.png) |
| **Do.** Caption in the cell below. | **Don't.** Caption in the cell below. |

## Test 7: Two images side by side, HTML flexbox

Better control than a table if inline styles survive.

<div style="display:flex; gap:16px;">
  <figure style="flex:1; margin:0;">
    <img src="https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/do.png" width="100%" alt="Do">
    <figcaption><strong>Do.</strong> Native caption element.</figcaption>
  </figure>
  <figure style="flex:1; margin:0;">
    <img src="https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/dont.png" width="100%" alt="Don't">
    <figcaption><strong>Don't.</strong> Native caption element.</figcaption>
  </figure>
</div>

## Test 8: Image attribute syntax variants

Non-standard extensions. If either works, sizing is possible without raw HTML.

Pandoc/kramdown style:

![Sized image](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/do.png){width=300}

markdown-it style:

![Sized image](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight-sync-test/img/do.png =300x200)

## Test 9: House-style scaffolding that must survive

These already appear across the reference docs. If any break, the standard needs adjusting before anything is pushed.

> **Android:** blockquote callout, used for platform divergence throughout the docs.

Inline `code`, a [cross-link](https://design.ns.nl), and machine-readable tags such as `variant: chev-down` and `pattern: sheet`.

| Token | Value | Usage |
| :--- | :--- | :--- |
| `space.app.stack.default` | 24 | Default between containers. |
| `motion.duration.default` | 300ms | Most UI transitions. |

```yaml
component: Section Heading
category: content
```

## Test 10: Collapsible section

Useful for long variant lists if it survives.

<details>
<summary>Click to expand</summary>

Hidden content that renders when opened.

</details>

## Test 11: Does the file wholly own the page?

After syncing, try editing this paragraph directly in the ZeroHeight editor, then re-sync. If the edit is overwritten, the file owns the page and everything must be expressible in markdown. If the edit survives alongside synced content, mixed authoring is possible and image blocks could be added natively in ZeroHeight.

## Results

Fill this in after syncing.

| # | Test | Renders? | Notes |
| :--- | :--- | :--- | :--- |
| 0 | H1 duplicated as title and heading | | |
| 1 | **Figma iframe embed** | | **Decider** |
| 2 | Markdown image, absolute URL | | |
| 3 | Relative image path | | Expected to fail |
| 4 | HTML `img` with width | | |
| 5 | Side by side, HTML table | | |
| 6 | Side by side, markdown table | | Portable fallback |
| 7 | Side by side, flexbox + figcaption | | |
| 8 | Attribute syntax `{width=}` / `=300x200` | | |
| 9 | Blockquote, table, code block, inline tags | | Must survive |
| 10 | `details`/`summary` | | |
| 11 | File wholly owns the page | | Decides mixed authoring |

### What each answer decides

- **Test 1 fails:** markdown sync suits prose docs only; component pages stay editor-authored.
- **Tests 4, 5, 7 all fail but 6 passes:** raw HTML is stripped; do/don't layouts use markdown tables and captions go in the cell below.
- **Test 9 fails anywhere:** the component doc standard needs changing before any doc is pushed.
- **Test 11 shows the file owns the page:** every page element must be expressible in markdown, so Figma embeds have to work via Test 1 or not at all.
