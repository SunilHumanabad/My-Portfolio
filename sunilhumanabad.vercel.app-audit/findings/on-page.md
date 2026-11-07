# On-Page SEO — 75/100 (weight 20%)

## What works

- Title is 55 characters, leads with the name and role
- Open Graph + Twitter large-image card with a 1200×630 image
- Logical heading outline: H1 name, H2 sections, H3 projects

## Findings

### [Medium] H1 text runs the name together: "SunilHumanabad"

The hero name lines are adjacent block spans with no whitespace between them, so the heading's text content (what crawlers and some assistive tech read) is "SunilHumanabad". Experience headings have the same issue ("Unplex TechnologiesFull Stack Developer").

**Fix:** Insert a space between the line spans (and between organisation and role in the experience toggles).

### [Medium] Meta description is 197 characters

Google truncates around 155–160 characters, cutting off the stack list.

**Fix:** Trim to ~150, e.g. "UI/UX designer and full stack developer in Bengaluru. Websites, web apps, AI agents and RAG apps built with React, Next.js, Python and Django."

### [Low] No internal pages to link to

All internal links are in-page anchors.

**Fix:** Comes free with per-project pages.
