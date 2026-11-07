# Technical SEO — 78/100 (weight 22%)

## What works

- Static export: every section is in the server HTML (943 words readable without JavaScript)
- robots.txt allows all crawlers and points to the sitemap
- sitemap.xml present; canonical, meta robots index/follow, lang=en
- Unknown URLs return a real 404 (no soft-404 catch-all)
- Single H1, semantic landmarks, no redirect chains

## Findings

### [High] Auto-playing live build runs for search-engine crawlers

With a Googlebot smartphone user agent the multiplayer-cursor build starts on load; 9 s later 98 content blocks were still at opacity 0. Text stays in the DOM, but the rendered snapshot Google evaluates shows a mostly blank page and the LCP element appears late.

**Fix:** Skip the auto-build for bots and automation (user-agent regex for Googlebot/Bingbot/etc. plus navigator.webdriver) in the pre-paint boot script; never hide the hero.

### [Medium] No security headers configured for deployment

The static build ships no headers config. Vercel adds HSTS, but X-Content-Type-Options, Referrer-Policy, Permissions-Policy and a Content-Security-Policy are absent.

**Fix:** Add a vercel.json headers block (nosniff, strict-origin-when-cross-origin, a restrictive Permissions-Policy, and a CSP allowing self, Google Fonts' self-hosted files and youtube-nocookie frames).

### [Low] Canonical and sitemap disagree on the trailing slash

Canonical is https://sunilhumanabad.vercel.app (no slash); the sitemap and og:url use https://sunilhumanabad.vercel.app/.

**Fix:** Use one form everywhere (the trailing-slash root).

### [Info] Live URL still serves the previous site

https://sunilhumanabad.vercel.app is the old NextUI build; this audit ran on the new local production build.

**Fix:** Deploy, then verify the domain in Google Search Console and submit sitemap.xml.
