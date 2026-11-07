# SEO Action Plan — sunilhumanabad.vercel.app

Health score now: **70/100**. Fixing Critical + High items should move it into the mid-80s.

## Critical (fix immediately)
None. Nothing blocks indexing.

## High (within a week)
1. **Keep the hero visible on load.** Exclude the hero (name, intro, portrait, CTAs) from the live build, or start the build after LCP or on the first scroll/interaction. Target: mobile LCP under 2.5 s. *(`lib/buildBlocks.js`, `app/layout.jsx` boot script)*
2. **Don't auto-play for bots or slow connections.** In the pre-paint boot script, skip `data-build="pending"` when the user agent matches crawlers (Googlebot, Bingbot, DuckDuckBot, Applebot, GPTBot, ClaudeBot, PerplexityBot…), when `navigator.webdriver` is set, or when `navigator.connection.saveData` is on or `effectiveType` is 2g/3g.
3. **Make case studies indexable.** Build a static `/work/[slug]` page per project with `generateStaticParams`, containing the full description, highlights, the full-page screenshot and links. Link each one from its card and the dialog, add them to the sitemap, and mark them up as CreativeWork.

## Medium (within a month)
4. **Fix heading text.** Put a space between the hero name spans and between org/role in the Experience toggles. *(`components/Hero.jsx`, `components/Experience.jsx`)*
5. **Trim the meta description** to about 150 characters. *(`config/site.js` → `seo.description`)*
6. **Add schema:** ProfilePage (Person as mainEntity), WebSite, ScholarlyArticle for the IEEE paper, and an ItemList of projects. *(`app/layout.jsx`)*
7. **Lighten the main thread:** load BuildSwarm, Cursor and ProjectDialog with `next/dynamic`.
8. **Add security headers** in `vercel.json`: X-Content-Type-Options, Referrer-Policy, Permissions-Policy and a CSP.

## Low (backlog)
9. Add `public/llms.txt` with a summary, project links, the paper, profiles and contact.
10. Use one canonical form everywhere (`https://sunilhumanabad.vercel.app/`).
11. Add `lastModified` to the sitemap entry/entries.
12. Consider a custom domain and ask clients for a credit link to the portfolio.

## After deploy
- Verify in Google Search Console and submit `sitemap.xml`.
- Check Core Web Vitals in Search Console and CrUX after about 28 days of traffic.
- Capture a drift baseline (`/seo drift baseline https://sunilhumanabad.vercel.app/`) so future changes can be compared.
