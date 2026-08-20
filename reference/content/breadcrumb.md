---
content_for: Breadcrumb
zeroheight_page_id: 4492170
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/62f43b-breadcrumb
last_synced: 2026-07-22
related: [accessibility]
gaps: [App component]
---

# Content — Breadcrumb

Wording for breadcrumbs. Breadcrumbs are primarily a **web** pattern; on app, back navigation lives in `../fundamentals/layout.md` (Navigation region).

## Marking a page — `Label level 2 / Label level 3`
The breadcrumb names the page:
- "Abonnementen / NS Flex Dal Voordeel"
- "Reisinformatie / Situatie op het spoor"

## Marking a step in a flow — `← Label level 2`
The breadcrumb should:
1. Name the **direction** with "Ga terug naar…" / "Go back to…".
2. Name the **previous page**, or say "de vorige pagina" / "the previous page".

This lets screen readers announce the *action* of moving back, not just a location (WCAG / accessibility).

- **Do:** "Ga terug naar Besteloverzicht" — direction + page name.
- **Don't:** direction only ("Ga terug") — it's unclear where the user lands.

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/62f43b-breadcrumb (page `4492170`, synced 2026-07-22)
