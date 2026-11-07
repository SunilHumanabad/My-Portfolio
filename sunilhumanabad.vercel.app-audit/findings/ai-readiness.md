# AI Search Readiness — 60/100 (weight 10%)

## What works

- AI crawlers are not blocked; primary content is server-rendered
- Person JSON-LD with sameAs gives a clean entity
- Agentic check: no P0 failures (robots reachable, real 404, server-rendered)

## Findings

### [Low] No llms.txt

/llms.txt and /llms-full.txt return 404. Google Search ignores it; Lighthouse's agentic checks and some assistants read it.

**Fix:** Add public/llms.txt: one-paragraph summary, links to projects, the IEEE paper, LinkedIn/GitHub and contact.

### [Medium] Project facts hidden behind JavaScript

Answer engines quote passages; the most quotable facts (client, what was designed, results, publication details) are dialog-only.

**Fix:** Per-project pages with short, factual passages (who, what, when, link).
