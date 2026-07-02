import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** Shared pointer body embedded in every Markdown entry file. */
export function pointerBody() {
  return [
    '## NESSIE design system',
    '',
    'This project uses the **NESSIE** (NS Dutch Railways) design system agent skill, vendored in `.nessie/`.',
    '',
    '**Before designing or auditing any UI, read [`.nessie/AGENTS.md`](.nessie/AGENTS.md) and follow it.** It routes you to the task playbooks (`.nessie/skills/`) and the component / token / pattern / accessibility reference docs (`.nessie/reference/`). Design **iOS-first**; use only documented NESSIE components and semantic/applied **tokens** — never raw hex or off-scale values.',
    '',
    'To read an actual Figma design (audits, design-to-code), the **Figma MCP / Dev Mode MCP server** must be connected in your tool; otherwise work from a screenshot or exported code.',
  ].join('\n');
}

/** Cursor rule file (dedicated, nessie-owned — written wholesale). */
export function cursorRule() {
  return `---
description: NESSIE (NS) design system — read .nessie/AGENTS.md before any UI work
alwaysApply: true
---

${pointerBody()}
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

/** Best-effort detection of which tools a project already uses. */
export function detectTools(dir) {
  const found = new Set();
  if (existsSync(join(dir, 'CLAUDE.md')) || existsSync(join(dir, '.claude'))) found.add('claude');
  if (existsSync(join(dir, '.cursor'))) found.add('cursor');
  if (existsSync(join(dir, '.github'))) found.add('copilot');
  return [...found];
}
