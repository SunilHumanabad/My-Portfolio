# Sunil Humanabad — Portfolio

Static Next.js 16 + React 19 + Framer Motion 12 portfolio, plain CSS (no Tailwind/UI kit), exported to `out/` and deployed to https://sunilhumanabad.vercel.app.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run check` — ESLint + production build; run before saying a change is done
- `npm start` — serve the built `out/` folder locally

## Where things live

- `config/site.js` — every personal detail, SEO, colours, section toggles, UI labels, `motion` settings (auto-play live build, reduced-motion policy)
- `data/projects.js`, `data/experience.js`, `data/skills.js` — content
- `components/` — UI. `BuildSwarm.jsx` = multiplayer-cursor live build; `Cursor.jsx` = custom cursor; `Providers.jsx` = motion preference + build state
- `lib/buildBlocks.js` — which elements the live build draws (add new blocks here)
- `app/globals.css` — all styles and design tokens
- `PRODUCT.md` — who the site is for and what counts as success (Impeccable)
- `DESIGN.md` — the design system: tokens, type, components, do's and don'ts (Impeccable)

## Rules

- Never hard-code names, contacts or claims in components; read them from `config/site.js` / `data/`.
- Real content only: no invented projects, stats, testimonials, logos or employers. Empty data hides its section.
- Follow DESIGN.md: Anton headlines, one red accent (#f16c6b for small red text), hairlines over cards, no eyebrow labels above headings, 44px tap targets.
- Motion: the live build is the one authored motion moment; don't add more entrance/scroll effects. Every animation must stop when `data-motion="off"`.
- Images go in `public/assets/` as pre-optimised WebP (~1600px wide) — static export has no image optimiser.

## Skills in this project (`.claude/skills/`)

| Need | Use |
|---|---|
| Understand code, find where something lives, plan a change | **graphify** — `graphify query "<question>"` first (see section below); `/graphify` for a full rebuild |
| Any visual/UI work: design, redesign, polish, critique, audit, animate | **impeccable** — `/impeccable <command> [target]` (e.g. `audit`, `critique`, `polish`, `typeset`, `layout`). Reads PRODUCT.md + DESIGN.md |
| SEO / performance / accessibility check of the live URL | **web-audit** |
| Full SEO audit, technical SEO, schema, Core Web Vitals, AI-search readiness, sitemaps, content/E-E-A-T | **claude-seo** suite: `/seo audit <url>`, or the specific skill (`seo-page`, `seo-technical`, `seo-schema`, `seo-content`, `seo-geo`, `seo-agentic`…). Its scripts run via `".claude/skills/seo/scripts/claude-seo" run <script>.py` from the project root. To audit a local build, allow only that port: `CLAUDE_SEO_LOCAL_TARGETS=localhost:4173`. Latest report: `sunilhumanabad.vercel.app-audit/` |
| Before deploying, or "is it production ready?" | **deploy-readiness** (audit → fix → ship runbook) |
| Posters, OG images, social graphics | **canvas-design** (static) or **algorithmic-art** (generative) |
| Re-theme a page or artifact | **theme-factory** |
| Create or improve a skill for this repo | **skill-creator** |

Impeccable's helper binary (`.claude/skills/impeccable/scripts/impeccable`) is downloaded once and SHA-256-verified on first run. If it can't run, follow the skill's "Launcher unavailable" fallback and read PRODUCT.md / DESIGN.md directly.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
