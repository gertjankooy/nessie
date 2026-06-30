---
component: Feature Tip
category: feedback
status: stable
aliases: [Coachmark, Tooltip]
zeroheight_page_id: 2151947
zeroheight_url: https://design.ns.nl/4a05a30ad/v/latest/p/712e2a-feature-tip
figma_node: "1763:44065"
last_synced: 2026-06-30
related: [highlight-box, message-inline]
gaps: [Accessibility]
---

# Feature Tip

## Usage
### Use when
- Guiding user interaction — teaching new features or helping navigate complex tasks.
- Onboarding new users to key features and functionalities.
### Don't use when
- It would interrupt critical moments or interactions.
- The tip isn't contextually relevant to the user's current task.

## Anatomy
- **Tip content**: a short informative message.
- **Pointer**: connects the tip to the anchored interface element.

## Configurations
### Position
Positioned above the anchor by default, vertically aligned to its left or right depending on available space. It can point in almost any direction and adjusts itself when space is lacking.

## Placement
- Position so the tip avoids covering essential interface elements; sequence multiple tips so the user always has access to the actions they need.
- Keep a 4px (`nesSpacing1`) gap between the tip and the highlighted element.

## Behavior
- For a sequence of actions, show the tip for the next action only after the previous one is completed or dismissed, to avoid overwhelming the user.

## Best practices
- Show tips only when relevant to the user's current context.
- Introduce tips at the right moment — when a user first encounters a feature or is about to perform an action for the first time.

## Content guidelines
- Keep text short — no more than three short sentences.
- Make it informative; don't repeat what's already on screen.
- Don't end the content with a period.

## Accessibility
_Not available in ZeroHeight — to review._

## Source
- ZeroHeight: https://design.ns.nl/4a05a30ad/v/latest/p/712e2a-feature-tip (page `2151947`, synced 2026-06-30)
- Figma: `1763:44065`
