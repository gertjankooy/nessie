import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Instruction block asking the agent itself to check for updates. Used for every
 * tool EXCEPT Claude Code, which gets a deterministic SessionStart hook instead
 * (see STATUS_HOOK_* below) — a shell command that always runs, vs. this, which
 * relies on the agent choosing to follow it (the same reliability as every other
 * instruction in this entry file, including "read AGENTS.md before any UI work").
 */
const UPDATE_CHECK_BLOCK = [
  '**Staying current:** `.nessie/` is a vendored snapshot, not a live copy. At the start of a new session, run `npx nessie-skill status` to check for a newer version. If one is available, proactively offer to update it for the user — ask a direct yes/no question (e.g. "There\'s an update available for the NESSIE docs — want me to run it now?"), and if they say yes, run `npx nessie-skill update` yourself and report the result. If they say later, don\'t ask again this session.',
].join('\n');

/** Shared pointer body embedded in every Markdown entry file. */
export function pointerBody({ checkInstruction = false } = {}) {
  const lines = [
    '## NESSIE design system',
    '',
    'This project uses the **NESSIE** (NS Dutch Railways) design system agent skill, vendored in `.nessie/`.',
    '',
    '**Before designing or auditing any UI, read [`.nessie/AGENTS.md`](.nessie/AGENTS.md) and follow it.** It routes you to the task playbooks (`.nessie/skills/`) and the component / token / pattern / accessibility reference docs (`.nessie/reference/`). Design **iOS-first**; use only documented NESSIE components and semantic/applied **tokens** — never raw hex or off-scale values.',
    '',
    'To read an actual Figma design (audits, design-to-code), the **Figma MCP / Dev Mode MCP server** must be connected in your tool; otherwise work from a screenshot or exported code.',
  ];
  if (checkInstruction) lines.push('', UPDATE_CHECK_BLOCK);
  return lines.join('\n');
}

/** Cursor rule file (dedicated, nessie-owned — written wholesale). No SessionStart hook exists for Cursor, so it gets the check instruction. */
export function cursorRule() {
  return `---
description: NESSIE (NS) design system — read .nessie/AGENTS.md before any UI work
alwaysApply: true
---

${pointerBody({ checkInstruction: true })}
`;
}

/**
 * Each tool maps to the entry files it reads:
 *  - `md`    → Markdown files that get a managed block (shared with user content)
 *  - `files` → dedicated files nessie fully owns (overwritten)
 * Cursor and Codex both read a root AGENTS.md, so that target de-dupes across them.
 */
export const TOOLS = {
  claude: { label: 'Claude Code', md: ['CLAUDE.md'] },
  cursor: { label: 'Cursor', md: ['AGENTS.md'], files: ['.cursor/rules/nessie.mdc'] },
  codex: { label: 'Codex', md: ['AGENTS.md'] },
  copilot: { label: 'GitHub Copilot', md: ['.github/copilot-instructions.md'] },
};

export const TOOL_KEYS = Object.keys(TOOLS);

/**
 * Claude Code only: a SessionStart hook that checks (rate-limited, best-effort,
 * never blocking) whether a newer version of the vendored docs exists, and if so
 * tells the agent to nudge the user with the exact update command. This is
 * deterministic — the shell command always runs. Cursor, Codex, and Copilot have
 * no equivalent hook API this installer can target, so they instead get
 * UPDATE_CHECK_BLOCK baked into their always-loaded entry file: the agent is
 * *asked* to check each session, same reliability as every other instruction in
 * that file. Figma Agent users need neither — that bootstrap re-fetches AGENTS.md
 * live from GitHub every session.
 */
export const STATUS_HOOK_FILE = '.claude/settings.json';
export const STATUS_HOOK_COMMAND = 'npx --yes nessie-skill status --hook 2>/dev/null || true';

/** Best-effort detection of which tools a project already uses. */
export function detectTools(dir) {
  const found = new Set();
  if (existsSync(join(dir, 'CLAUDE.md')) || existsSync(join(dir, '.claude'))) found.add('claude');
  if (existsSync(join(dir, '.cursor'))) found.add('cursor');
  if (existsSync(join(dir, '.github'))) found.add('copilot');
  return [...found];
}
