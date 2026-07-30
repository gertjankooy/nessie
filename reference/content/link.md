---
content_for: Link
zeroheight_page_id: 4460300
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/185974-link
last_synced: 2026-07-22
related: [link, button, accessibility]
---

# Content — Link

Link text must convey what appears once it's followed. See the component in `reference/components/link.md`.

## Writing good link text
- The text says what the destination is — e.g. "Bekijk alle veelgestelde vragen over OVpay", not a bare "Lees meer".
- Keep it to **four words or fewer**; don't link whole sentences.
- **Not device-specific:** avoid "Klik hier" / "Tap hier" — it's meaningless to a screen-reader or non-mouse user.
- Avoid the non-guiding words listed in `button.md` (*Volgende, OK, Hier, Klik hier*).

> **WCAG (2.4.4 Link Purpose in Context):** the purpose of each link must be clear from the link text alone, or from the link text plus its surrounding context. See `reference/accessibility.md`.

## Internal links
Link text should match the **topic** of the target page (a summary, not necessarily its exact title).
- **Do:** "…parkeren op een P+R met een NS Flex-abonnement. Lees meer over P+R en NS Flex."
- **Don't:** end with a bare statement, or tack on "Klik hier voor meer informatie".

## External links
Signal that the user is leaving the site — name the destination and the topic.
- Mention the **URL/site name + topic**: "Lees meer over autokosten op Nibud.nl" or "…op de website van Nibud".
- **Don't:** "Lees meer over autokosten" (no destination), or paste a raw long URL as the link text.

## File links
Always warn before a download and state what it is, so users can decide.
- Include the **file type and size**: "Actievoorwaarden Meereisretour (pdf, 80kB)", "Podcast NS Dagje Uit (mp3, 4Gb)".
- Prefer solving this in the CMS/front-end; if not possible, put type + size in the link text.

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/185974-link (page `4460300`, synced 2026-07-22)
