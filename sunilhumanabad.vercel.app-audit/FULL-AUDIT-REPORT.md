# SEO Audit — sunilhumanabad.vercel.app

**Date:** 7 Nov 2026 · **Tool:** claude-seo v2.5.0 (`seo-audit`), run inline · **Audited:** local production build (`npm run build`, served at localhost:4173). The live URL still serves the previous site, so deploy before re-checking it.

## Executive summary

**SEO Health Score: 70 / 100**

**Business type:** personal portfolio of a freelance UI/UX designer and full stack developer in Bengaluru. It's a service provider with no storefront, so local-pack SEO doesn't apply.

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 78 |
| Content Quality | 23% | 70 |
| On-Page SEO | 20% | 75 |
| Schema / Structured Data | 10% | 65 |
| Performance (CWV) | 10% | 45 |
| AI Search Readiness | 10% | 60 |
| Images | 5% | 92 |

The foundations are solid: the page is server-rendered, crawlable and indexable, with clean metadata, valid Person schema and strong trust signals. Score is lost to two things: **the auto-playing live build** (late LCP, and crawlers see a mostly blank render) and **a single page where the case-study detail can't be indexed**.

### Top issues
1. **[High] Live build delays mobile LCP from 2.0 s to 7.9 s.** The hero name stays hidden until a cursor types it.
2. **[High] The live build also runs for crawlers.** With a Googlebot user agent, 98 blocks were still hidden 9 s after load.
3. **[High] Case-study detail is only in a click-to-open dialog**, so it isn't indexable and there are no long-tail pages.
4. **[Medium] The H1 reads "SunilHumanabad"** (no space between the two name lines).
5. **[Medium] The meta description is 197 characters**, so it gets truncated in search results.

### Quick wins
1. Add a space between the H1 name lines and between org/role in the Experience headings.
2. Trim the meta description to about 150 characters.
3. Skip the auto-build for bots, Save-Data and slow connections; never hide the hero.
4. Add ProfilePage, WebSite and ScholarlyArticle JSON-LD.
5. Add `public/llms.txt`; use one canonical form (trailing slash).

## Technical SEO: 78
- ✅ Static HTML with all sections (943 words without JS); robots.txt allows all and lists the sitemap; sitemap.xml, canonical, `index, follow`, `lang="en"`; real 404s.
- ⚠️ **High:** auto-build runs for crawlers (see Performance).
- ⚠️ **Medium:** no security headers in the deploy config. Add `vercel.json` headers: nosniff, Referrer-Policy, Permissions-Policy, CSP.
- ⚠️ **Low:** canonical has no trailing slash, while the sitemap and og:url do.

## Content Quality: 70
- ✅ Strong E-E-A-T: real name and photo, live client sites, dated roles, an IEEE paper with DOI, and no invented claims.
- ⚠️ **High:** full case studies live only in the dialog. Fix with a static `/work/[slug]` page per project, linked and in the sitemap.
- ⚠️ **Medium:** 879 words in total for a site that has to rank for name, role, location and every project.

## On-Page SEO: 75
- ✅ Title is 55 characters (name + role). OG and Twitter large-image card are set up with a 1200×630 image. Heading outline is H1 → H2 → H3.
- ⚠️ **Medium:** the H1's text content is "SunilHumanabad", and the Experience headings run together the same way.
- ⚠️ **Medium:** the meta description is 197 characters. Suggested replacement: "UI/UX designer and full stack developer in Bengaluru. Websites, web apps, AI agents and RAG apps built with React, Next.js, Python and Django."

## Schema / Structured Data: 65
- ✅ Valid Person JSON-LD: jobTitle, image, address, worksFor, knowsAbout and sameAs.
- ⚠️ **Medium:** add a **ProfilePage** (with the Person as mainEntity) and a **WebSite** node.
- ⚠️ **Medium:** describe the **IEEE paper** as a ScholarlyArticle (DOI 10.1109/ICIICS59993.2023.10420933), and the projects as CreativeWork.

## Performance (lab): 45

| Profile | LCP | CLS | TBT |
|---|---|---|---|
| Desktop 1440, build on | 1.9–2.5 s | 0.007 | 125–291 ms |
| Mobile 390, slow 4G + 4× CPU, build on | **7.9 s** | 0.008 | 763 ms |
| Mobile 390, same throttling, animations off | **2.0 s** | 0 | 844 ms |
| Googlebot smartphone UA, build on | 7.9 s | 0.009 | 772 ms |

- ⚠️ **High:** render the hero immediately and start the build below it, or after LCP or the first interaction. Skip it on Save-Data and slow connections.
- ⚠️ **Medium:** TBT is high under throttling (about 816 KB of JS uncompressed, about 200 KB gzipped). Lazy-load BuildSwarm, Cursor and ProjectDialog with `next/dynamic`.
- These are lab numbers. After deploy, confirm with real-user field data in CrUX or Search Console.

## AI Search Readiness: 60
- ✅ AI crawlers are allowed and the content is server-rendered. The agentic check found no P0 failures.
- ⚠️ **Medium:** the most quotable facts (client, what was designed, publication) are only in the dialog.
- ⚠️ **Low:** no `llms.txt`. Google ignores it, but Lighthouse and some assistants read it.

## Images: 92
- ✅ 13 images, all with dimensions; WebP throughout; 12 lazy-loaded; descriptive alt text on content images.
- ℹ️ The 8 archive thumbnails have empty alt text. That's deliberate: they're decorative next to visible titles.

## Method and limits
- claude-seo scripts used: `render_page.py` (raw mode; its headless render is sandboxed off localhost), `parse_html.py` and `agentic_check.py`. The local target was allowed only via `CLAUDE_SEO_LOCAL_TARGETS=localhost:4173`.
- Lab vitals came from headless Chrome with throttling, not Lighthouse or PageSpeed, which need a public URL. There's no field data until the site is deployed and has traffic.
- Not run: backlinks, Google APIs (GSC/GA4/CrUX) and DataForSEO, because no credentials are configured. Not applicable: local, maps, ecommerce, hreflang.

Per-category details are in `findings/`. Structured data for a PDF report is in `audit-data.json`.
