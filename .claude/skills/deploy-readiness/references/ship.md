# SHIP mode — cutover runbook guidance

SHIP.md choreographs the deploy *event*. CHECKLIST.md already proved the code; SHIP.md never re-litigates it — it carries the evidence forward and adds the parts no grep can verify: sequencing, rollback, monitoring, humans.

## What SHIP.md is not

- Not a second audit. If you find yourself re-checking robots.txt here, stop — that's AUDIT's job and the gate already enforced it.
- Not self-reported. Verified rows cite the FIX run's actual command output ("`php artisan test --compact` — 23 passed, run <date>"). Anything not actually run is `[ ]` with the command, never a hopeful tick.
- Not a template of someone else's org. Every row must be executable by the person deploying. Solo founder ⇒ no on-call row, no stakeholder row, no canary row (unless the infra genuinely exists). Ticking boxes for people who don't exist trains the user to tick without reading.

## Rollback triggers — how to set thresholds with no monitoring stack

The plugin-era placeholder ("error rate exceeds X%") assumes dashboards. Most shared-hosting / small-VPS deploys have none. Derive triggers from what actually exists, in this order of preference:

1. **Uptime/health endpoint** exists → trigger: health check fails twice in a row, or any 5xx on the health route.
2. **Log access only** (typical shared hosting) → trigger: tail the production log for the monitoring window; any new exception class that didn't exist pre-deploy, or the same exception 3+ times, is a rollback signal. Give the exact tail command for the stack (`tail -f storage/logs/laravel-$(date +%F).log`).
3. **Nothing but the browser** → trigger: any of the named key user flows (see below) fails, or any page in the sitemap returns 5xx. List the 3–5 flows explicitly (e.g. "submit contact form", "login", "checkout") — "verify key flows" without names is an unexecutable step.

Always pair triggers with a **decision deadline**: "if any trigger fires within the monitoring window → roll back, don't debug live." Debugging in production while users hit errors is the default failure mode; the runbook's job is to pre-commit against it.

## Rollback procedure — must match the deploy mechanism

Write the actual commands, not "roll back":

- **Git-pull deploy** → `git log --oneline -3` before deploying, record the current SHA in SHIP.md, rollback = `git checkout <sha>` + re-run the cache/build steps.
- **Manual upload** → keep the previous release folder; rollback = swap folders back. If no previous folder exists, creating one *is* a pre-deploy step.
- **CI/CD** → the platform's redeploy-previous-release action, named.

**Migrations gate the rollback.** If the release includes migrations, state per migration whether `down()` exists and is safe. A destructive migration (dropped column, data transform) means code rollback alone leaves a broken schema — the runbook must say so and require the pre-migration DB backup as a hard pre-deploy step, with the restore command written out.

## Monitoring window

Default 30 minutes of active watching for a solo deploy (15 is fine for trivial releases, 60+ for migrations or first launches), then a follow-up log check at +24h. During the window: the log tail command running, plus one pass through the named key flows on the live domain. The post-deploy verification list from `references/general.md` (4 URL variants, real form submission, social preview, sitemap reachable, analytics realtime) belongs in this window, each as its own `[~]` row.

## Staging

Only include a staging section if staging exists. If it doesn't, do not invent one — instead the pre-deploy section gets a local production-mode rehearsal where possible (`npm run build`, production env flags, `composer install --no-dev` in a throwaway copy) and an honest note that first verification happens live, which raises the value of the rollback rows.

## Team rows (conditional)

Include only when the interview says a team exists: who is deploying, who is on standby, where deploy-start/deploy-done messages go, and who owns the rollback decision. One line each. Solo: omit the section entirely.

## Feature flags (conditional)

If the audit found a flag system: list flags shipping in this release and their intended prod state; verifying each flag's state is a `[~]` row. No flag system: omit.

## Ordering inside SHIP.md

Pre-deploy (backups, artifact readiness, `[~]` vendor items) → deploy commands (exact, in order, from the stack reference) → immediate verification (health, key flows) → monitoring window (triggers armed, tail running) → close-out (mark verdict SHIPPED/ROLLED BACK in SHIP.md, note anything for the backlog). The runbook ends with the release's actual outcome recorded — a runbook nobody fills in after the fact was theater.
