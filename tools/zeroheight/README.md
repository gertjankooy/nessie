# ZeroHeight push pipeline

Maintainer tooling for docs where **the repo is the source and ZeroHeight renders them**. Not part of the distributed skill (that is `tools/cli/`).

## Why this exists

Docs used to flow one way: author in ZeroHeight, pull into the repo with `/pull-from-zeroheight`. Authoring a new component meant writing here, copy-pasting into ZeroHeight, waiting on a full Figma file sync, then pulling back. This pipeline reverses the direction for docs that are authored here, so the loop becomes: write the markdown, run the build, push.

Both directions coexist. A doc's `sync:` frontmatter key decides which one applies, and an absent key means `pull`, so every pre-existing doc is untouched.

| `sync:` | Owner | Tooling |
| :--- | :--- | :--- |
| `pull` (default) | ZeroHeight | `/pull-from-zeroheight` pulls the page into the file |
| `push` | This repo | `zh.mjs build` generates `zeroheight/`, ZeroHeight syncs from git |

`/pull-from-zeroheight` hard rule 10 forbids writing to a `push` doc, which is what keeps the two from fighting.

## What to run when

In Claude Code use `/build-zeroheight`; everything below works the same from a terminal as `node tools/zeroheight/zh.mjs all …`.

| Situation | Run |
| :--- | :--- |
| Edited prose in one component's reference file | `/build-zeroheight <name> --skip-images` |
| Edited a Figma frame that a doc already declares | `/build-zeroheight <name>` |
| Added a new image (new `images:` entry + markdown) | `/build-zeroheight <name>` |
| Changed the doc standard, tab mapping, or the generator | `/build-zeroheight` |
| Merged to `main`, need image URLs restamped off the branch | `/build-zeroheight --skip-images` |
| Just want to know whether anything drifted | `node tools/zeroheight/zh.mjs check` |

`--skip-images` is the one worth remembering: it skips the Figma round trip, which is the only slow part. Reach for it whenever no Figma frame changed.

A bare `/build-zeroheight` does every push doc. That is the right call after a change to shared machinery and the wrong call for routine edits, where naming the component keeps it to a couple of seconds.

## Commands

```bash
node tools/zeroheight/zh.mjs all     [name]   # images + build + check (what /build-zeroheight runs)
node tools/zeroheight/zh.mjs build   [name]   # generate zeroheight/ tab files
node tools/zeroheight/zh.mjs images  [name]   # export Figma frames to PNG
node tools/zeroheight/zh.mjs check            # verify generated output is current
```

No dependencies; Node 18+ only.

### Cost

Re-exporting is cheap and safe to repeat. Node ids are batched into one Figma API call per document, downloads run six at a time, and Figma returns byte-identical renders for unchanged frames, so re-exports produce no git churn.

**Why there is no caching layer.** The obvious optimisation is to cache the Figma file's `lastModified` and skip the export when it has not changed, and it was deliberately not built. `lastModified` covers the whole file, and in an actively edited library something changes most days, so the cache would miss almost every run. Worse, a cache that wrongly reports "unchanged" publishes stale images with nothing to signal it, and the cache file itself either churns in git or goes stale per machine. Always fetching cannot be wrong.

The real cost was serial downloads, which is why they are parallel instead. That scales with image count, carries no correctness risk, and keeps no state. If a full rebuild ever does get slow, raise the concurrency before reaching for a cache.

### Setting up the Figma token

`images` needs a Figma personal access token. One-time setup: create a `.env` in the repo root containing

```
FIGMA_TOKEN="figd_..."
```

Create the token at **Figma > Settings > Security > Personal access tokens**. It needs `file_content:read` on the NES App Components file; `current_user:read` is not required. `zh.mjs` loads the repo-root `.env` itself, so no `--env-file` flag is needed, and a real environment variable always takes precedence so CI can set `FIGMA_TOKEN` without a file.

`.env` is gitignored, and the pre-commit gate blocks `figd_` tokens if one ever slips into a staged diff.

## How it works

**Canonical source** is `reference/components/<name>.md`, exactly as before. That single file is what agents read and what humans edit. It is never generated.

**Generated output** is `zeroheight/<name>/{examples,design-guidelines,a11y,content}.md`, one file per ZeroHeight tab. These are never hand-edited and carry no "generated" marker, because their whole content is published to ZeroHeight and a marker would show up there. `check` enforces this by regenerating and diffing.

**Images** live in `zeroheight/assets/<name>/<image>.png`, exported from the Figma node ids declared in the doc's `images:` frontmatter. Only the declared frames are fetched, not the whole file, which is why it is much faster than a full ZeroHeight Figma sync.

### Why the split is generated, not authored

Splitting the canonical docs into five files each would cost real agent performance. Component docs run 58 to 87 lines, so a five-way split produces files of a dozen lines, and any real task needs four of the five. That is four tool calls instead of one for the same 4 KB, and it separates sections that need to be read together. The touch-target finding on Section Heading (a 32px control against a 48 default) only surfaced because Configurations and Accessibility were in one file.

So the split happens on the way out. `reference/` keeps one editable copy per component; `zeroheight/` is disposable output.

## What the build strips

Repo-only scaffolding that would be meaningless to a reader on ZeroHeight:

- The frontmatter block in full.
- The `## Source` section.
- `Local guidance` marker lines, keeping the content beneath them.
- Gap markers, and any section left empty by their removal.
- The H1, since each ZeroHeight tab supplies its own title. Output starts at `##`.

When a tab holds exactly one section (A11y, Content), its `##` header is dropped and the contents promoted, so the tab does not repeat its own name.

### Link resolution

ZeroHeight does not resolve relative paths, so every relative link would be dead. The build rewrites same-directory component links to the target's `zeroheight_url` from its frontmatter. Targets containing a slash point outside `reference/components/` and are never resolved by basename, because `../content/link.md` and `link.md` are different files and must not collide.

Anything unresolvable keeps its label and loses the link, and the build reports which. **Write cross-link labels as human text in push docs** (`[the motion tokens](../tokens/motion.md)`, not `[../tokens/motion.md](../tokens/motion.md)`), or the flattened text renders as a raw path on ZeroHeight.

## Constraints ZeroHeight imposes

Established by a capability probe, not assumption:

- **Absolute image URLs only.** Relative paths do not resolve.
- **Raw HTML is escaped.** No iframes, no `<img width>`, no flexbox, no `<details>`. Interactive Figma embeds are impossible on a synced page.
- **No inline image sizing.** Neither `{width=300}` nor `=300x200` parses. Size images by layout: a two-column markdown table for a do/don't pair, a single-cell table to narrow one image, no table for full width.
- **A synced file wholly owns its page.** You cannot edit a synced page in ZeroHeight, so there is no mixed-authoring escape hatch. This is why the Dev tab is authored in ZeroHeight as its own page and never generated.
- **No H1.** It becomes the page title.

## Adding an image

There is no Figma link in the markdown body. The connection is made in two halves.

**1. Frontmatter holds the Figma node id.** Give the image a name; the value is the node id, taken from the Figma URL's `?node-id=20332-2425` with the dash changed to a colon:

```yaml
images:
  anatomy: "20300:26476"
  badge-placement: "20332:2425"
```

**2. The body references the exported PNG**, at the path the export writes to. The filename is the name from step 1:

```markdown
![Section Heading anatomy](https://raw.githubusercontent.com/gertjankooy/nessie/main/zeroheight/assets/section-heading/anatomy.png)

*Caption in italics, directly beneath.*
```

Then rebuild. `/build-zeroheight section-heading` in Claude Code, or the script directly:

```bash
node tools/zeroheight/zh.mjs all section-heading
```

Always write the URL against `main`. The build retargets it to the branch you are on, so testing from a branch needs no source edits.

## Adding a component to the pipeline

1. Set `sync: push` in the doc's frontmatter and drop `zeroheight_page_id` / `zeroheight_url`.
2. Declare `images:` as name to Figma node id, and `figma_file:` if it is not the default NES App Components file.
3. Run `/build-zeroheight <name>` (or `node tools/zeroheight/zh.mjs all <name>`).
4. Commit and **push the branch**. Image URLs are stamped with the checked-out branch, so they resolve as soon as GitHub has that branch; point ZeroHeight at the same one.
5. In ZeroHeight, create the four tab pages and point each at its generated file. Author the Dev tab there directly.

## Known gaps

- The image export is run by hand. A GitHub Action with manual dispatch is the next step.
- A branch name containing a slash produces a raw URL that GitHub has to disambiguate. If images 404 while testing from a branch, use a branch name with no slash.
- Exports carry whatever chrome the Figma frame has, including the component-set boundary. Point `images:` at purpose-built presentation frames rather than at component nodes.

## Enforcement

`.githooks/pre-commit` runs `zh.mjs check` whenever anything under `reference/components/`, `zeroheight/`, or `tools/zeroheight/` is staged, and blocks the commit when:

- generated output is missing, stale, or hand-edited, or
- `zeroheight/` has changes that were regenerated but left unstaged, which would commit a source change without its build.

Ordinary commits skip the check entirely, so they pay nothing. If `node` is not on PATH the check is skipped with a warning rather than blocking. Enable the hooks once per clone with `git config core.hooksPath .githooks`.
