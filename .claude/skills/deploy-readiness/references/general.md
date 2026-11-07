# Stack-agnostic production checks

Apply to every web project. For non-Laravel stacks, translate each item to the framework's equivalent (Next.js, Django, Rails, Express, plain PHP all have analogues).

## Security

- Debug/development mode OFF in production config; framework error pages replaced with custom ones (verify a custom 404 AND a custom 500 exist and are wired into the error handler, not just present as files).
- No secrets committed: scan for `.env` in git history, hardcoded API keys, tokens in frontend bundles (frontend env vars are public — anything prefixed `VITE_`/`NEXT_PUBLIC_` ships to the browser).
- HTTPS enforced with a single-hop redirect covering all 4 variants (http/https × www/non-www); HSTS once stable.
- Auth-only areas (`/admin`, `/dashboard`, `/settings`) actually behind middleware — request them unauthenticated if testable.
- Directory listing off; VCS metadata (`.git/`), dependency manifests, and config files not web-reachable.
- Security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options`/CSP, `Referrer-Policy`. Nice-to-have, cheap to add.

## SEO & discoverability

- `robots.txt`: exists, is not the framework stub, disallows auth/admin routes, and ends with an absolute `Sitemap:` line pointing at the sitemap **file** (a bare domain is invalid).
- `sitemap.xml`: exists and lists only public pages. Generated from the route table, kept in sync with routes by construction (shared source of truth), not a hand-maintained static file.
- Per page: unique `<title>`, meta description, canonical URL (query/hash stripped, absolute, from the canonical domain).
- Social cards: `og:title/description/url/type/image` + `twitter:card`. `og:image` absolute URL, ~1200×630. Missing OG = broken-looking shares on LinkedIn/WhatsApp/Slack — high impact for B2B sites.
- Structured data: at minimum Organization or WebSite JSON-LD.
- Custom favicon (not the framework default).
- Optional AI-crawler files if the user wants them: `llms.txt`, `llms-full.txt`, markdown page variants.

## Analytics & tracking

- Verify what is *actually* installed by reading the code: gtag.js (GA4-direct) vs a GTM container (`GTM-XXXXXX`) are different products; users conflate them.
- SPA? Confirm client-side navigations are tracked (GA4 Enhanced measurement history events, or router-hook events). Flag as `[~]` — it's a vendor-dashboard setting.
- Tracking only on intended pages (marketing yes, admin usually no — confirm which is intended).

## Forms & third parties

- Validation exists on **both** sides; server errors render in the UI.
- Bot protection verified server-side, and the production domain allowlisted in the vendor dashboard (`[~]` user-verify).
- Outbound email: From-domain aligned with the sending relay (SPF/DKIM), else spam. Test a real submission post-deploy including attachments.
- Webhooks/callbacks (payments, OAuth): production URLs registered.

## Ops

- How do built assets reach the server? (The build dir is almost always gitignored.)
- Logging: production log level, rotation, and where to look on day one.
- Backups: database + user uploads, before first real traffic.
- Monitoring/uptime check on the health endpoint if one exists.
- Dependency install in production mode (`--no-dev` / `NODE_ENV=production`).

## Post-deploy verification (on the live domain)

1. All 4 URL variants redirect to one canonical origin, single hop.
2. Real submission through every public form (validation, captcha, email arrival, spam folder).
3. Social preview via LinkedIn Post Inspector / opengraph.xyz.
4. `robots.txt` + `sitemap.xml` reachable; submit sitemap to Google Search Console.
5. Analytics events arriving (Realtime view) including after client-side navigation.
6. Error log clean after the first day of traffic.
