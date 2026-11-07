# <Project> — Deploy Runbook (<date>)

Gate: CHECKLIST.md verdict READY, <audit date>, no code changes since <!-- or: GATE OVERRIDDEN — shipped against a non-READY audit -->
Deploy mechanism: <git pull / CI / manual upload> · Deployer: <name> · Rollback SHA/artifact: <sha or folder>
`[x]` evidence-verified (cite the run) · `[ ]` not yet run (command given) · `[~]` human-executed step

## 1. Pre-deploy
- [~] Database backup taken — <exact command> — restore path: <exact command>
- [~] Previous release recoverable — <sha recorded above / previous folder path>
- <verified rows carried from FIX run, each citing its evidence, e.g.:>
- [x] Tests passing — `<command>` — <result, date of run>
- [x] Production build succeeds — `<command>` — <result, date of run>
- [ ] <anything not actually run — exact command>

## 2. Before you press go — needs you (from audit `[~]` items)
- [~] <vendor dashboard / DNS / production .env item, verbatim from CHECKLIST.md, with where and what to check>

## 3. Deploy — commands in order
```bash
# exact sequence for this stack, adapted from the audit
```
- Migrations in this release: <none / list each, with down() safety noted>

## 4. Immediate verification (live domain)
- [~] Health endpoint / homepage 200
- [~] Key flow: <named flow 1>
- [~] Key flow: <named flow 2>
- [~] Key flow: <named flow 3>

## 5. Monitoring window — <N> minutes
- [~] Log tail running: `<exact command>`
- Rollback triggers (any fires → roll back, don't debug live):
  - <trigger 1, concrete>
  - <trigger 2, concrete>
- Rollback procedure: <exact commands, including migration/DB restore path if applicable>
- [~] Post-deploy verification pass: 4 URL variants · real form submission · social preview · robots+sitemap reachable · analytics realtime
- [~] +24h: log check clean

## 6. Team & flags <!-- omit section entirely if solo / no flag system -->
- Deploying: <name> · Standby: <name> · Rollback decision: <name>
- Flags shipping: <flag → intended prod state, each a [~] verify row>

## 7. Close-out
- Outcome: SHIPPED / ROLLED BACK — <one line>
- Follow-ups for backlog: <items>
