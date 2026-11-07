---
name: deploy-readiness
description: Production-readiness audit, auto-fix, and deploy runbook for web projects — one pipeline, three modes. AUDIT greps the repo and writes a graded CHECKLIST.md from file evidence only; FIX applies every repo-fixable item, re-runs the full audit, and regenerates the checklist; SHIP is gated on a READY verdict and produces SHIP.md — deploy commands in order, rollback triggers, post-deploy monitoring and verification — pre-filled from audit evidence. Use for ANY deploy-related request — "is it production ready", "production check", "pre-deploy check", "audit before launch", "fix the checklist", "fix all", "make it production ready", "deploy checklist", "rollback plan", "ship it", "go live", "launch", "release", or verifying SEO files, .env safety, build assets, or server config. Works on any web stack, deep checks for Laravel + Inertia/React. Supersedes any separate deploy-checklist skill — prefer this for every deploy workflow including cutover planning.
---

# Deploy Readiness — Audit, Fix & Ship

Three modes, one pipeline. Pick by what the user said:

- **AUDIT** — "check for production ready", "is it ready?", "audit before deploy" → run checks, write `CHECKLIST.md` report, change nothing else.
- **FIX** — "fix", "fix all", "make it production ready", "fix the checklist items" → run (or reuse) the audit, apply fixes from `references/fixes.md`, **re-run every check**, regenerate `CHECKLIST.md` with a Fixed-this-run section.
- **SHIP** — "deploy plan", "deploy checklist", "ship it", "let's go live", "cutover", "rollback plan" → gated on a fresh READY audit; produce `SHIP.md`, the cutover runbook, pre-filled from audit evidence. Read `references/ship.md` first.

Full-pipeline phrasings ("audit and fix everything, then give me the deploy plan") run FIX to completion, then SHIP if the verdict is READY — otherwise stop and report what blocks it.

The core principle in every mode: **verify with evidence, never assume**. Every status must be proven by reading actual files. A feature "having been added" is not the same as it working (classic case: "we added Google Tag Manager" when only gtag.js/GA4 is installed — different products).

## Status vocabulary (all modes, both reports)

- `[x]` verified working — name the file/line (or command output) that proves it
- `[ ]` missing or broken — say exactly what's wrong
- `[~]` only the user can verify or execute — production server `.env`, DNS, vendor dashboards (GA admin, captcha domain allowlist, Search Console), and every human ops step in SHIP.md. State precisely what to check/do and where.

Never mark `[x]` from documentation, commit messages, or the user's word. Grep for it, or run it. Ops steps in SHIP.md (backup taken, deploy executed, monitoring watched) are `[~]` by definition — no skill can grep the future.

## AUDIT mode

### 1. Detect the stack

Read manifests first: `composer.json`, `package.json`, lock files, config dirs. Identify framework, rendering model (SSR vs client-side SPA — changes several checks), database, deploy target (`.htaccess` at repo root implies shared hosting/Apache).

- Laravel → read `references/laravel.md` AND `references/general.md`.
- Anything else → `references/general.md`, translating items to the framework's equivalents.

### 2. Run every check, evidence first

Record one of the three statuses per item, per the vocabulary above.

### 3. Write the report

`CHECKLIST.md` in the project root, exactly this structure (start from `assets/checklist-template.md`):

```markdown
# <Project> — Production Readiness Report (<date>)
Verdict: READY / NOT READY — <one line why>
`[x]` verified · `[ ]` open · `[~]` needs user

## 1. Blockers — will break the site if skipped
## 2. Security & server config
## 3. Production env/config fixes
## 4. SEO & analytics
## 5. Deploy commands (in order)
## 6. Verify before shipping (tests, lint, build)
## 7. Post-deploy verification
## 8. Backlog / nice-to-have
```

Every open item gets a concrete action ("add `Disallow: /dashboard` to robots.txt"), never a vague goal. AUDIT mode is read-only except for this one file. End by offering FIX mode (or SHIP, if already READY).

## FIX mode

1. Run the audit first if no fresh `CHECKLIST.md` exists (or if the code changed since it was written).
2. Fix every `[ ]` item that is fixable inside the repo, using the recipes in `references/fixes.md`. Work down by severity: blockers, security, env, SEO.
3. **Do not touch:**
   - `[~]` items — they live in vendor dashboards, DNS, or the production server; list them as remaining user actions instead
   - secrets and credentials (flag, never rewrite values)
   - anything explicitly marked backlog/nice-to-have, unless asked
4. Follow the project's conventions: match existing code style, and if the project has a test suite, add/update tests for behavior you add (e.g. a sitemap route gets a feature test). Run the project's formatter if configured.
5. **Re-run the full audit** on the modified project — not from memory, re-grep everything. A fix that didn't verify stays `[ ]`.
6. Regenerate `CHECKLIST.md` with two extra parts at the top:
   - **Fixed in this run** — each item, one line, what changed and in which file
   - **Remaining — needs you** — the `[~]` items and anything unfixable from the repo
7. Run the verification commands yourself if a runtime is available (test suite, linter, production build) and record the actual results — these feed SHIP.md verbatim. Otherwise tell the user which commands to run.
8. If the verdict is now READY, offer SHIP mode.

### Use the project's development skills for every fix

Before writing any code in FIX mode, check for project-local skills (`.claude/skills/`, `**/skills/**`) and any development skills in the available-skills list. If they exist, they define how code in this project must be written — activate the relevant one per fix rather than relying on generic patterns. Typical mapping in a Laravel + Inertia project:

- Backend fixes (routes, controllers, FormRequests, sitemap route, error handler, rate limiting) → the Laravel best-practices skill
- Tests for anything you add or change → the Pest testing skill (feature tests preferred)
- Meta tags, `<Head>`, layouts, forms, navigation in React → the Inertia React development skill
- Any markup/styling you touch → the Tailwind CSS skill

The audit checklist decides **what** to fix; the development skills decide **how**. If a fix recipe in `references/fixes.md` conflicts with a project skill's convention, the project skill wins — adapt the recipe.

## SHIP mode

Read `references/ship.md` before generating anything. Then:

1. **Enforce the gate.** Require a `CHECKLIST.md` with verdict READY that is fresh — no code changes since it was written (check file mtimes / git status against the report date). If it's missing, stale, or NOT READY: say so, name the blockers, and offer to run AUDIT/FIX first. Only proceed anyway on an explicit user override, and stamp SHIP.md with `GATE OVERRIDDEN — shipped against a non-READY audit` at the top.
2. **Interview only for what the repo can't tell you** (skip anything already answered in conversation): deploy mechanism (git pull / CI / manual upload), whether a staging environment exists, team or solo, any monitoring/uptime tooling, and the deploy window if relevant. Do not ask about things the audit already proved.
3. **Generate `SHIP.md`** in the project root from `assets/ship-template.md`, pre-filled from evidence:
   - Test/lint/build results copied from the FIX run's actual output — never re-ticked from memory. If FIX didn't run them, they appear as `[ ]` with the exact command to run.
   - Deploy command sequence from the stack reference (e.g. the Laravel sequence, minus `route:cache` if closure routes were found).
   - The audit's `[~]` items reproduced as the **Before you press go** section.
   - Rollback triggers with concrete thresholds and a rollback procedure that matches the deploy mechanism (see ship.md for how to set these without monitoring infra).
   - A post-deploy monitoring window and the live-domain verification steps from `references/general.md`.
   - Team-only rows (on-call notification, stakeholder comms, canary) included **only if** the interview says a team exists. Solo deploys get a lean runbook, not theater.
4. Every human-executed step is `[~]`. SHIP.md never contains a pre-ticked ops step.

## Cross-stack traps worth flagging everywhere

1. **Build artifacts are usually gitignored.** Git-pull deploys ship no CSS/JS. Confirm how built assets reach the server.
2. **SPA without SSR breaks naive crawling.** Crawler-based sitemap generators and social scrapers see an empty shell; sitemaps must come from the route table, meta tags from whatever the crawler actually receives.
3. **Third-party keys are domain-bound.** Captcha, OAuth redirects, payment webhooks work locally and fail live if the domain isn't allowlisted.
4. **SPA analytics undercounts** without history-change tracking (GA4 "Enhanced measurement → page changes").
5. **Email deliverability ≠ email sending.** Personal-account SMTP relay + custom-domain From = SPF/DKIM failure = spam.
6. **Re-test at the real URL**: all 4 http/https × www variants, real form submissions, social-share previews.
7. **Migrations are the least reversible step.** Backup before `migrate --force`; destructive migrations (drops, renames) get called out by name in SHIP.md with their down-path or lack of one.

## Report tone

Findings are graded claims, not compliments. If the user believes items are done, verify each and state plainly which are false — a wrong "done" before deploy costs far more than a blunt correction. The same applies to SHIP.md: a runbook that flatters the deploy is worse than no runbook.
