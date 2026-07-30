# /pre-publish-check

Run **before committing or pushing** — a secrets / PII / local-leak scan for this **public** NS repository. Read-only: it reports risks and gives a go/no-go, it never commits, deletes, or "fixes" anything. Fix findings by hand, then re-run.

> Scope: this catches accidental *disclosure* (secrets, credentials, machine paths, internal contacts). For code-level vulnerabilities in the changes, use the built-in `/security-review` — they're complementary.

## Checks

### 1. Local-only files stay local
- **`.claude/settings.local.json`** must be untracked **and** ignored by the **repo's committed `.gitignore`** — not just a machine-global ignore, so every maintainer's clone is protected:
  - `git ls-files --error-unmatch .claude/settings.local.json` → must **fail** (untracked).
  - `git check-ignore -v .claude/settings.local.json` → source must be `.gitignore:<n>`, **not** `~/.config/git/ignore` or `.git/info/exclude`. If it resolves to a machine-global file, flag it: add the path to the repo `.gitignore`.
- None of these are tracked: `git ls-files | grep -inE 'bootstrap|\.env|\.pem$|\.key$|\.p12$|settings\.local\.json|sync-tokens\.md|\.claude/state'` → **empty**.

### 2. No secrets in tracked files or the staged diff
Scan both `git ls-files` content and `git diff --cached` for:
`ghp_`, `github_pat_`, `figd_` (Figma PAT), `xox[baprs]-` (Slack), `AKIA[0-9A-Z]{16}` (AWS), `-----BEGIN [A-Z ]*PRIVATE KEY-----`, and generic `api[_-]?key`, `bearer `, `authorization:`, `password\s*[=:]`, `token\s*[=:]\s*['"][^'"]+`.
- **False positives to ignore:** design **tokens** (`space.*`, `content.*`, `token name`), the **Password** input type, and a11y "content descriptions / state names" prose.

### 3. No machine / local info in tracked files
- `git ls-files -z | xargs -0 grep -nE '/Users/[a-z]+|/home/[a-z]+|C:\\\\Users'` → **empty** (absolute user paths belong only in the untracked `settings.local.json`).

### 4. Internal references — review, don't auto-block
- Flag emails, `atlassian.net` / Jira ticket URLs, `sharepoint.com`, Slack invite links (`slack.com/share`), internal IPs (`10.`/`192.168.`), and `*.ns.nl` hosts **other than `design.ns.nl`**.
- `design.ns.nl` ZeroHeight links are expected (source citations) — not a finding.
- For each flagged item decide: does an org contact / internal URL belong in a **public** repo? Genericize or remove if not needed.

### 5. Skim the staged diff
- `git diff --cached --stat`, then skim `git diff --cached` for anything sensitive newly added — pasted internal content, screenshots with real data, credentials, customer data.

## Output
One line per check: **✅ clear** / **⚠️ review** / **❌ block**, each with the offending `file:line`. End with a **GO / NO-GO** and the exact remediation for any ⚠️/❌ (e.g. "add `X` to `.gitignore`", "remove line N"). Never commit, push, or delete — the maintainer applies fixes and re-runs.
