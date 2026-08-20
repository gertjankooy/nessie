# Changelog

Designer-facing updates to the NESSIE skill — what's new for you when using it to design and audit screens.

## 2026-08-20

**🎬 Know which transition to use when navigating.** A new **Motion** page under Fundamentals answers a question the skill had no answer for before: what should move, and in which direction, when the user goes somewhere. Tabs are instant, moving deeper into a hierarchy is horizontal, temporary content is vertical, and a focused flow is vertical and full screen. One rule underneath it all: parallel destinations get no motion, hierarchy gets horizontal motion, temporary content gets vertical motion.

**📱 iOS and Android transitions are spelled out separately.** They genuinely differ, so designing one behaviour and shipping the other is easy to do by accident. iOS pushes a page in from the trailing edge at full width and parallaxes the page behind it; Android moves both pages a short distance while cross-fading (shared axis X), and back is owned by the system's predictive back. Sheets are the one case where both platforms agree. The guidance stays deliberately close to native on each platform.

**🚦 What isn't decided yet says so.** Timing and easing are being researched separately, so the page tells you to let the platform supply them rather than picking a duration. Four open questions are flagged too, including whether the bottom nav stays put during a page push and what each transition becomes under reduced motion. If you ask the skill about one of these, it will tell you it's open instead of inventing an answer.

**🔄 Guidance written in the skill can now be published to ZeroHeight.** Docs used to travel one way only: ZeroHeight was the source and the skill copied from it, so anything drafted in the skill first stayed there. It works in both directions now, which is what put **Using Motion** and **Layout for App** on ZeroHeight instead of leaving them inside the skill. It stays one single source either way, so what you read on ZeroHeight and what the skill tells you while auditing a screen cannot drift apart.

**🎯 "Which one do I pick?" now has its own pages.** Choosing guidance sits next to, but apart from, the token lists: **Using Color** (which background suits which screen job), **Using Typography** (which preset for which text role), **Using Shape & Style** (which radius for which surface), and **Using Motion**. Look up a value in the token pages; look up the decision in these.

**📐 App-only scope is now explicit.** The Motion and Layout pages state up front that they cover the NS app on iOS and Android and not web. The underlying tokens are shared across platforms, including web, but how they are applied to app navigation and app layout is not. Worth knowing before you reach for either page on a web screen.

## 2026-07-30

**✍️ Write better copy, in-skill.** A new **Content** area brings UX-writing guidance right into the skill: the content scorecard, the NS voice (Sympathetic · Professional · Inspiring), and per-component copy rules for **Buttons, Links, Error messages, Empty states, and Breadcrumbs** — so your labels and messages follow NS tone without guessing.

**🫙 Know what to show when there's nothing to show.** A new **Feedback & States** pattern gives you a clear decision for empty / loading / error / offline screens: when to use an **Empty State vs Message Inline vs Toast vs Skeleton**, plus the rules for handling failures (keep the user's content, always offer a way forward — placement follows *scope*, not severity).

**🎨 Top Bar: branded vs plain.** New guidance on when to use the **yellow branded** top bar (main navigation) vs the **plain white/transparent** one (tasks, sheets, flows) — including the dark-mode tip (pair a branded bar with `base-alt` so it separates) and the scrolled-state behavior. *(Still evolving as the Android / iOS 26 variants land.)*

**♿ Sharper accessibility labels.** Expanded rules for writing a11y labels — describe the *action*, not the element ("Add", not "Add button"), drop instructions like "Tap", keep it concise, capitalise the first character, and know when to use a **hint vs a label**. Also clears up a common mix-up: a **heading is a type style + heading role, not a component** to pull from the app library.

**🧭 Easier to find things.** Reference docs were reorganized to mirror ZeroHeight — **layout** now lives under Fundamentals and **accessibility** is its own top-level guide — so things are where you'd expect.
