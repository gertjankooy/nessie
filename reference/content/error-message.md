---
content_for: Error message
zeroheight_page_id: 4460630
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/563e7c-error-message
last_synced: 2026-07-22
related: [error-message, message-inline, message-toast, message-bar, feedback-states]
---

# Content — Error message

Wording for errors that surface in Message Inline, Message Toast, or Message Bar. For *which surface* to use, see `reference/patterns/feedback-states.md`; for the components, see `reference/components/`.

**Length:** title **1–2 lines**, body **1–3 lines**. Mobile design is leading.

## How to write errors
- **Avoid negative words** — *helaas, oeps, fout, incorrect, verboden* — so the user never feels blamed.
- Write **active**, with preferably one verb per sentence.
- **No technical jargon** ("Niet gespecificeerde fout (0x0000000643)").
- **Function over personality** — guide, don't entertain.
- **Give a concrete suggestion** on what/how to fill in (e.g. "januari, februari" instead of expecting "12").
- An **error code** is acceptable only when it helps the user relay the problem to customer service.

## Structure — up to three parts
Never leave a "you got it totally wrong" feeling. Build each message from two or three parts; if space is tight, keep only the third (Solution).

| First: Observation | Second: Cause *(only when it's clear)* | Third: Solution |
| :--- | :--- | :--- |
| Explain why the message appears | Tell why (our system) it's like that | Guide how to solve it |

- **Do:** lead the user to the fix and suggest what to enter.
- **Don't:** state only the observation ("something is wrong") without a way forward — even when space is tight.

## Success message
One of the few places for a little personality without losing function — it's the last thing seen when completing a funnel.
- **Manage expectations / say what's next:** "Je ontvangt je OV-chipkaart binnen 3 werkdagen."
- Be polite or raise a smile: "Veel reisplezier."

## Informative message
When the user hasn't done anything wrong but still needs to act.
- Explain what information or action is needed.
- Tell them what to do (and, when needed, how).
- Stay positive.

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/563e7c-error-message (page `4460630`, synced 2026-07-22)
