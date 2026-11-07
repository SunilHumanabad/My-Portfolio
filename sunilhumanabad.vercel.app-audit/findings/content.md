# Content Quality — 70/100 (weight 23%)

## What works

- Strong E-E-A-T: real name and photo, live client sites, dated experience, IEEE paper with DOI
- Specific, verifiable copy (no filler stats or invented testimonials)
- Clear positioning: UI/UX design + full-stack + AI

## Findings

### [High] Case-study detail is not indexable

Full descriptions, highlights and screenshots for each project exist only inside a client-side dialog that renders on click. Crawlers see a title, a one-line summary and three bullets per featured project, and only a title row for the academic projects.

**Fix:** Generate a static page per project (/work/[slug] via generateStaticParams) with the full case study, link it from each card and the dialog, add it to the sitemap, and mark it up as CreativeWork.

### [Medium] Thin page text for a single-page site

879 words in the HTML across the whole site. One page has to rank for the name, the role, the location and every project.

**Fix:** Project pages (above) fix most of this; a short paragraph per capability group and a one-line description per academic project in the archive add depth to the home page.
