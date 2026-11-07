---
name: web-audit
description: >
  Analyze any website URL for SEO, Performance, Accessibility, and Best Practices issues —
  the four core pillars that Google Lighthouse and search engines use for ranking. Use this skill
  whenever the user shares a URL and wants an audit, mentions improving their Google ranking,
  asks about SEO fixes, wants to optimize Core Web Vitals (LCP, CLS, INP), needs accessibility
  (a11y) compliance checks, or asks about web best practices and security headers. Also trigger
  when users mention Lighthouse scores, PageSpeed, WCAG compliance, meta tags, structured data,
  schema markup, or any request to "check", "audit", "review", "analyze", or "scan" a website.
  Even if the user only mentions one pillar (e.g., "fix my SEO"), run the full 4-pillar audit
  since the pillars are interconnected and affect each other.
---

# Web Audit Skill

Perform a comprehensive 4-pillar website audit (SEO, Performance, Accessibility, Best Practices) on any URL the user provides. Identify every issue, show the problematic code, explain what's wrong, and provide 2–3 ranked alternative fixes for each issue.

## Workflow

### Step 1: Fetch the Page

Use `web_fetch` to retrieve the full HTML of the target URL. If `web_fetch` is unavailable or fails, ask the user to paste the HTML source or use browser tools if available.

Also note the URL structure itself — it matters for SEO analysis.

### Step 2: Analyze All 4 Pillars

Read the checklist in `references/checklist.md` for the full list of checks per pillar. Run every applicable check against the fetched HTML. Organize findings by pillar.

### Step 3: Estimate Current Ratings

Before listing issues, calculate an estimated current score for each pillar (0–100) based on what you can observe in the HTML. Use this scoring methodology:

**Scoring Method — Deduction-Based:**
Start each pillar at 100 and deduct points based on issue severity:
- 🔴 High severity issue: **-10 to -15 points** each
- 🟡 Medium severity issue: **-5 to -8 points** each  
- 🟢 Low severity issue: **-1 to -3 points** each

Apply diminishing deductions if many issues exist in the same category (e.g., 20 images missing alt text counts as one High issue, not 20 separate deductions).

Cap the minimum at 0. Be transparent about the methodology — this is an HTML-based estimate, not a live Lighthouse run. Real Lighthouse scores also factor in runtime metrics (actual LCP timing, CLS shifts, JS execution) that can't be measured from static HTML alone.

Present the current rating prominently at the top of the report:

```
## 📊 Current Website Rating

| Pillar          | Estimated Score | Grade | Status      |
|-----------------|:--------------:|:-----:|:-----------:|
| SEO             |    XX/100      |   X   | 🔴/🟡/🟢   |
| Performance     |    XX/100      |   X   | 🔴/🟡/🟢   |
| Accessibility   |    XX/100      |   X   | 🔴/🟡/🟢   |
| Best Practices  |    XX/100      |   X   | 🔴/🟡/🟢   |
| **Overall**     |  **XX/100**    | **X** | 🔴/🟡/🟢   |

Grading: A (90-100) | B (80-89) | C (70-79) | D (50-69) | F (<50)
Status: 🟢 Good (90+) | 🟡 Needs Work (50-89) | 🔴 Poor (<50)
```

### Step 4: Generate the Audit Report

For **every issue found**, use this format:

```
### 🔴 [Issue Title] — [Pillar] | Severity: High/Medium/Low | Impact: +X to +Y points

**Problem:**
[Brief explanation of what's wrong and why it hurts ranking/UX]

**Current Code:**
```html
[The actual problematic code from the page]
```

**Fix Option 1 (Recommended) — Est. Impact: +X pts**
```html
[Best fix with code]
```
↳ Why: [1-line explanation of why this is the best option]

**Fix Option 2 — Est. Impact: +X pts**
```html
[Alternative fix]
```
↳ Why: [1-line explanation]

**Fix Option 3 — Est. Impact: +X pts**
```html
[Another alternative, if applicable]
```
↳ Why: [1-line explanation]
```

The **Impact** value represents how many points this fix would add back to the pillar's score. Different fix options may have slightly different impacts (e.g., a basic fix restores fewer points than an optimal one). Be realistic — don't inflate impact scores.

### Step 5: Before vs. After Projection

After all issues are listed, show the full impact projection — what the scores would be if all recommended fixes are applied:

```
## 📈 Projected Improvement (If All Recommended Fixes Applied)

| Pillar          | Current | Projected | Improvement | Grade Change |
|-----------------|:-------:|:---------:|:-----------:|:------------:|
| SEO             | XX/100  |  XX/100   |   +XX pts   |    D → A     |
| Performance     | XX/100  |  XX/100   |   +XX pts   |    C → A     |
| Accessibility   | XX/100  |  XX/100   |   +XX pts   |    C → B     |
| Best Practices  | XX/100  |  XX/100   |   +XX pts   |    B → A     |
| **Overall**     |**XX/100**|**XX/100**|  **+XX pts**| **X → X**    |
```

Then show a **phased improvement roadmap** — what the scores would look like if fixes are applied in stages:

```
## 🚀 Phased Improvement Roadmap

### Phase 1: Quick Wins (1-2 hours) — Overall: XX/100 → XX/100
| Fix | Pillar | Impact | Effort |
|-----|--------|:------:|--------|
| Add missing title tag | SEO | +12 | 2 min |
| Add defer to scripts | Perf | +10 | 5 min |
| ... | ... | ... | ... |

### Phase 2: Core Fixes (1-2 days) — Overall: XX/100 → XX/100
| Fix | Pillar | Impact | Effort |
|-----|--------|:------:|--------|
| Implement structured data | SEO | +8 | 1 hr |
| Convert images to WebP | Perf | +7 | 2 hrs |
| ... | ... | ... | ... |

### Phase 3: Architecture (1-2 weeks) — Overall: XX/100 → XX/100
| Fix | Pillar | Impact | Effort |
|-----|--------|:------:|--------|
| Enable SSR | Perf/SEO | +5 | 3 days |
| CDN setup | Perf | +3 | 1 day |
| ... | ... | ... | ... |
```

Each phase shows the **cumulative projected score** after completing that phase, so the user can see incremental progress.

### Step 6: Summary Scorecard

Provide a compact summary combining everything:

```
## 📊 Audit Summary

| Pillar          | Issues Found | Critical | Medium | Low | Current | Projected |
|-----------------|:-----------:|:--------:|:------:|:---:|:-------:|:---------:|
| SEO             | X           | X        | X      | X   | XX/100  | XX/100    |
| Performance     | X           | X        | X      | X   | XX/100  | XX/100    |
| Accessibility   | X           | X        | X      | X   | XX/100  | XX/100    |
| Best Practices  | X           | X        | X      | X   | XX/100  | XX/100    |
```

### Step 7: Top 10 Quick Wins

End with the fixes that deliver the biggest score boost for the least effort. For each, show the expected point gain:

```
## ⚡ Top 10 Quick Wins

| #  | Fix                          | Pillar(s)      | Impact  | Effort    | Score After |
|----|------------------------------|----------------|:-------:|-----------|:-----------:|
| 1  | Add missing <title> tag      | SEO            | +12 pts | 2 minutes | XX/100      |
| 2  | Add defer to 3 scripts       | Performance    | +10 pts | 5 minutes | XX/100      |
| ...| ...                          | ...            | ...     | ...       | ...         |
```

The "Score After" column is cumulative — it shows the overall score after applying that fix AND all fixes above it, giving the user a clear picture of compounding gains.

---

## Severity Classification

- **🔴 High**: Directly blocks indexing, causes major ranking penalty, or fails WCAG Level A. Examples: missing title tag, no HTTPS, missing alt on hero image, render-blocking JS.
- **🟡 Medium**: Hurts ranking or UX noticeably but doesn't block indexing. Examples: meta description too long, no lazy loading, poor heading hierarchy, missing ARIA labels.
- **🟢 Low**: Best practice improvement, minor ranking signal. Examples: missing twitter card, no preconnect hint, non-optimal image format.

---

## Analysis Guidelines

When analyzing, think like a senior web performance engineer and SEO specialist:

- **Be specific**: Don't just say "add alt text" — show exactly which `<img>` tag is missing it and write the alt text based on the image context.
- **Be practical**: Rank fixes by real-world impact. A missing `<title>` tag matters far more than a missing twitter card.
- **Consider the stack**: If you can detect the framework (Laravel, React, Next.js, WordPress, etc.), tailor advice to that stack. For example, suggest `next/image` for Next.js sites instead of generic `<img>` advice.
- **Check relationships**: Some issues compound. Missing semantic HTML hurts both Accessibility AND SEO — flag these cross-pillar impacts.
- **Don't invent issues**: Only report what you can actually verify from the HTML source. Don't assume server-side issues you can't see (like missing GZIP) unless there's evidence in the response.

### Score Estimation Guidelines

Since this is an HTML-based audit (not a live Lighthouse run), be honest about what you can and can't measure:

**What you CAN score accurately from HTML:**
- SEO: meta tags, headings, schema, canonical, OG tags, alt text — these are fully visible in HTML and account for most of the SEO pillar score
- Accessibility: semantic structure, ARIA, labels, lang attribute, alt text — the majority of a11y checks are HTML-based
- Best Practices: doctype, charset, deprecated elements, HTTPS links, viewport — mostly HTML-visible

**What you can PARTIALLY estimate:**
- Performance: you can see render-blocking scripts, missing defer/async, missing lazy loading, image formats, font loading — but you can't measure actual load times (LCP, CLS, INP)

**What you CANNOT measure:**
- Actual Core Web Vitals timing (LCP in seconds, CLS score, INP in ms)
- Server response time (TTFB)
- Compression (GZIP/Brotli) — server config
- Real security headers — server config
- JavaScript runtime errors
- Actual color contrast without rendering

When projecting scores, be conservative. Make it clear that:
- The projected score assumes the recommended fix option is implemented correctly
- Real Lighthouse scores depend on runtime factors too
- Server-side optimizations (compression, caching, CDN) can add another 5-15 points to Performance that aren't reflected in the HTML-based estimate
- Suggest the user run a real Lighthouse audit after applying fixes to see actual scores

---

## What to Check (Quick Reference)

The full detailed checklist is in `references/checklist.md`. Here's the high-level overview:

### SEO (On-Page + Technical)
- Title tag (exists, length, keywords, uniqueness)
- Meta description (exists, length, CTA, keywords)
- Heading hierarchy (single H1, proper nesting)
- Image alt attributes (descriptive, keyword-relevant)
- URL structure analysis
- Internal links
- Canonical tag
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card tags
- Structured data / Schema markup (JSON-LD)
- Robots meta / X-Robots-Tag
- Hreflang (for multi-language sites)
- Sitemap reference
- Mobile viewport meta tag

### Performance
- Render-blocking resources (CSS/JS without defer/async)
- Image optimization (format, dimensions, lazy loading)
- Font loading strategy (preconnect, font-display)
- Critical CSS / preload hints
- JavaScript defer/async usage
- Resource hints (preconnect, prefetch, preload)
- Third-party script impact
- Inline critical CSS presence
- Excessive DOM size

### Accessibility
- Image alt attributes (present and descriptive)
- Form labels and input associations
- ARIA roles and attributes (correct usage)
- Semantic HTML elements (header, nav, main, footer, etc.)
- Heading hierarchy for screen readers
- Color contrast (flag if inline styles suggest issues)
- Keyboard navigation (tabindex, focus management)
- Language attribute on `<html>`
- Skip navigation link
- Link text quality (no "click here")

### Best Practices
- HTTPS usage
- Doctype declaration
- Character encoding meta tag
- Deprecated HTML elements (`<font>`, `<center>`, etc.)
- Modern image formats (WebP/AVIF vs JPG/PNG)
- Console error indicators (inline error-prone patterns)
- Proper viewport meta tag
- No mixed content indicators
- Security-related meta tags (CSP, X-Frame-Options via meta)

---

## Output Format

Generate the report as a **Markdown file** saved to the outputs directory. The filename should be `audit-[domain].md` (e.g., `audit-example-com.md`).

The report structure:

1. **Header** — Site URL, audit date, detected framework/stack
2. **Current Website Rating** — Estimated scores per pillar with grades
3. **Executive Summary** — 2-3 sentence overview of the site's health
4. **Detailed Findings by Pillar** — Each issue with impact points and 2-3 fix options
5. **Projected Improvement** — Before vs. after comparison table
6. **Phased Improvement Roadmap** — Quick wins → Core fixes → Architecture changes, with cumulative score after each phase
7. **Summary Scorecard** — Compact table with issue counts and current vs. projected scores
8. **Top 10 Quick Wins** — Prioritized action list with cumulative score tracking
9. **Additional Recommendations** — Architecture-level suggestions (SSR, CDN, etc.)

If the report is very long (many issues), also generate a shorter `audit-[domain]-summary.md` with just the scorecard and top 10 quick wins.
