# Schema / Structured Data — 65/100 (weight 10%)

## What works

- Valid Person JSON-LD with jobTitle, image, address, worksFor, knowsAbout and sameAs (GitHub, LinkedIn)

## Findings

### [Medium] Missing ProfilePage and WebSite types

Google supports ProfilePage structured data for creator/profile pages; the page only declares a bare Person.

**Fix:** Wrap the Person as mainEntity of a ProfilePage and add a WebSite node.

### [Medium] IEEE paper and projects not described in schema

The publication (DOI 10.1109/ICIICS59993.2023.10420933) and the client projects are strong authority signals but appear only as text.

**Fix:** Add a ScholarlyArticle (author: the Person, sameAs the DOI URL) and an ItemList of CreativeWork for the projects (or CreativeWork on each project page).
