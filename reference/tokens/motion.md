# NESSIE Motion Tokens

Duration & easing reference for NS app transitions and animations. Pick **semantic motion tokens** — never raw ms values, never invented curves.

## 3-tier model

| Tier | Example | Who uses it |
| :--- | :--- | :--- |
| Core / raw | `motion.duration.300` = 300ms, `motion.ease.out` = cubic-bezier(0.2, 0.9, 0.4, 1) | System only. **Never in designs.** |
| Base / semantic | `motion.duration.default`, `motion.ease.default` | **Designers pick these.** |

> **Web/CSS:** `--nes-base-motion-duration-*` / `--nes-base-motion-ease-*`. iOS/Android consume the same duration (ms) and bezier control points via platform animation APIs.

## Duration

| Token | Value | Usage |
| :--- | :--- | :--- |
| `motion.duration.faster` | 150ms | Micro-feedback — small state changes, hover/press. |
| `motion.duration.fast` | 200ms | Quick transitions — toggles, small reveals. |
| `motion.duration.default` | 300ms | **Default** — most UI transitions. |
| `motion.duration.slow` | 500ms | Larger surfaces — sheets, page transitions. |
| `motion.duration.slower` | 800ms | Deliberate / emphasis motion (sparingly). |

## Easing

| Token | Curve | Usage |
| :--- | :--- | :--- |
| `motion.ease.default` | `ease.out` (0.2, 0.9, 0.4, 1) | **Default** — entering/most motion, decelerating. |

Core curves available to the system (not picked directly): `ease.in` (1, 0.4, 0.9, 0.2), `ease.out`, `ease.in-out` (0.7, 0.27, 0.27, 1), `ease.in-out-quint` (0.7, 0.1, 0, 1), `ease.in-out-expo` (1, 0, 0, 1), `linear` (0, 0, 1, 1).

## Rules / Don'ts

- **Never raw `motion.duration.NNN` / raw bezier values** in a design — pick the semantic token.
- **Default to `duration.default` (300ms) + `ease.default`.** Faster for micro-interactions, slow/slower for large surfaces.
- **Don't invent durations** (e.g. 250/350ms ad hoc in a design) — use the named steps.
- **Respect reduced-motion** — animations should degrade gracefully when the OS requests reduced motion.
