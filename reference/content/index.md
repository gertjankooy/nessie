---
area: Content (UX writing)
zeroheight_page_id: 5784474
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/241511-content
last_synced: 2026-07-22
related: [feedback-states, accessibility]
sources: [4492224, 5784475, 4449721, 4460300, 4460630, 4885927, 4492170]
gaps: [Products]
---

# Content — UX writing for NESSIE

How we write for web and app. This is **UX writing**, not copywriting: functional text that helps a traveller reach their goal, in the voice of NS. Wording rules referenced from patterns (e.g. `../patterns/feedback-states.md`) and components live here.

**Language & reading level:** every element is available in **Dutch and English**. Write at **B1** reading level — present tense, active voice, short sentences; avoid ambiguous words and abbreviations ("Huisnr.", "n.v.t."). Dutch compounds are written as one word or hyphenated (`NS-abonnement`, `pannenkoekenboot`).

## The six principles of content design
1. **User first** — serve the traveller's goal before the business's.
2. **Clear** — unambiguous; actions have predictable results.
3. **Concise** — as short as possible without losing relevant information.
4. **Useful** — every piece earns its place at this moment in the flow.
5. **On brand** — sounds like NS.
6. **Data driven** — validate with real user behaviour.

## Content scorecard — usability heuristics
Challenge every piece of content against these (score 0–10 each; it's a writing aid, not admin):

- **Accessible** — NL + EN, B1 level, correct compound spelling, and every element has text a screen reader can speak (button labels, image alt text, video subtitles). See `../accessibility.md`.
- **Purposeful** — the user can clearly reach their goal and the business goal is met.
- **Concise** — buttons **2–4 words**; error title **1–2 lines**, error body **1–3 lines**; the mobile (XS) viewport is leading. Only present information that's relevant right now.
- **Conversational** — familiar words and ideas, presented in logical order ("To allow location, go to Settings, then turn on Location" — not the reverse). Read it aloud; it should sound human, not robotic. Don't use NS jargon (e.g. *daluren*) without explaining it.
- **Clear** — actions have unambiguous results (never a bare "Next"), how-to info is easy to find, error messages say what the user can/can't do, and names/terms are consistent everywhere.

## Voice of NS — Sympathetic · Professional · Inspiring
- **Concepts:** friendly, ready to help, service-first; clear with instructions and advice; user-first — willing to take an extra step to improve the journey.
- **Vocabulary:** human, direct language. Use guiding words in the flow ("Ga naar [pagina]"). Prefer positive-vibe words (*samen, gezellig, succes, lekker, gelukt*); avoid negative ones (*helaas, druk, fout*). Use imaginative words (*bestemming* over *plaats*) and words with movement (*gaan, op weg, veranderen*). Cut unnecessary adjectives/adverbs (*mooie, leuke*) unless they aid success. Write "NS", never "the NS"; use "we" for ourselves; no opinion words (*gemakkelijk, eenvoudig, snel*); **no train jokes**.
- **Syntax:** present tense ("Met TIER rijden") unless it already happened. Follow official grammar (*Groene boekje* / woordenlijst.org).
- **Punctuation:** avoid exclamation points — the text should carry itself (exceptions: "Goede reis!", "Bestelling gelukt!"). No punctuation in bullet lists (users read it as an error code) or in headings. **No emoji.**
- **Capitalization:** never ALL CAPS for emphasis; sentence case. Capitalise NS product names (*NS Flex Dal Voordeel, Samenreiskorting, Reisplanner, Keuzehulp*); code names stay lowercase (*samenreiscode*).

## Component content
Component-specific writing guidance lives in its own file:

| Component | File | Covers |
| :--- | :--- | :--- |
| Button | `button.md` | Verb+noun, root-of-verb rule, guiding words, webshop step buttons, shared-mobility verbs |
| Link | `link.md` | Descriptive link text, internal/external/file links, WCAG link purpose |
| Error message | `error-message.md` | Observation→cause→solution structure, plus success & informative messages |
| Empty state | `empty-state.md` | Same structure as errors; when a branded joke is allowed |
| Breadcrumb | `breadcrumb.md` | Page vs step-in-flow wording, "Ga terug naar…" for screen readers |

## What this area does not cover
- Product terminology (Ticket, Season ticket, OV-pas). _ZeroHeight has these under CONTENT → Products (`5784480`); not mirrored yet — tracked in the `/sync-docs` registry._
- Component anatomy, variants, and tokens → `reference/components/`.
- Accessibility requirements → `../accessibility.md`.

## Source
- ZeroHeight: CONTENT (`5784474`) — Principles of content design (`4492224`), Content scorecard (`5784475`), and per-component content pages. Synced 2026-07-22.
