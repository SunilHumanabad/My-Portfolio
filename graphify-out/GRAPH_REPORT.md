# Graph Report - My Portfolio  (2026-11-07)

## Corpus Check
- 40 files · ~20,415 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 257 nodes · 485 edges · 16 communities (14 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UNIVERSAL PREMIUM PORTFOLIO WEBSITE BUILDER
- site.js
- package.json
- page.jsx
- Providers.jsx
- WorkSection.jsx
- BuildSwarm.jsx
- Design System: Sunil Humanabad Portfolio
- Sunil Humanabad: Portfolio
- serve.mjs
- compilerOptions
- next.config.mjs
- Sunil Humanabad — Portfolio
- Product
- layout.jsx
- Impeccable audit — 2026-11-06

## God Nodes (most connected - your core abstractions)
1. `site` - 16 edges
2. `WorkSection()` - 15 edges
3. `useMotionPref()` - 13 edges
4. `UNIVERSAL PREMIUM PORTFOLIO WEBSITE BUILDER` - 13 edges
5. `react` - 13 edges
6. `Product` - 11 edges
7. `framer-motion` - 11 edges
8. `BuildSwarm()` - 10 edges
9. `ProjectDialog()` - 10 edges
10. `Components` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Typography` --references--> `clamp()`  [INFERRED]
  Website_portfolio_details.md → components/BuildSwarm.jsx
- `RootLayout()` --calls--> `Providers()`  [EXTRACTED]
  app/layout.jsx → components/Providers.jsx
- `Home()` --calls--> `Footer()`  [EXTRACTED]
  app/page.jsx → components/Footer.jsx
- `Home()` --calls--> `Header()`  [EXTRACTED]
  app/page.jsx → components/Header.jsx
- `Home()` --calls--> `Hero()`  [EXTRACTED]
  app/page.jsx → components/Hero.jsx

## Import Cycles
- None detected.

## Communities (16 total, 2 thin omitted)

### Community 0 - "UNIVERSAL PREMIUM PORTFOLIO WEBSITE BUILDER"
Cohesion: 0.08
Nodes (23): 0\. START HERE — USER CONFIGURATION (EDIT THIS FIRST), 10\. FINAL INSTRUCTION TO THE BUILD ASSISTANT, 1\. YOUR ROLE AND MAIN TASK, 2\. TECHNOLOGY AND PROJECT STRUCTURE, 4\. PAGE STRUCTURE AND FEATURES, 5\. INTERACTION AND MOTION SYSTEM, 6\. CONTENT, ASSETS, AND PERSONALIZATION RULES, 7\. SEO, ACCESSIBILITY, AND PERFORMANCE (+15 more)

### Community 1 - "site.js"
Cohesion: 0.14
Nodes (12): metadata, dynamic, dynamic, ContactForm(), validate(), Footer(), YEAR, GithubIcon() (+4 more)

### Community 2 - "package.json"
Cohesion: 0.09
Nodes (24): dependencies, framer-motion@^12.43.0, lucide-react@^1.70.0, react@^19.3.1, react-dom@^19.3.1, description, devDependencies, eslint@^9.39.0 (+16 more)

### Community 3 - "page.jsx"
Cohesion: 0.16
Nodes (19): has(), Home(), metrics, order, About(), Statement(), Contact(), Experience() (+11 more)

### Community 4 - "Providers.jsx"
Cohesion: 0.23
Nodes (16): Cursor(), Header(), Wordmark(), Hero(), NameLines(), Magnetic(), getServerSnapshot(), getSnapshot() (+8 more)

### Community 5 - "WorkSection.jsx"
Cohesion: 0.14
Nodes (24): ProjectCover(), ProjectDialog(), YouTube(), hostOf(), SiteFrame(), ArchiveThumb(), matches(), metaOf() (+16 more)

### Community 6 - "BuildSwarm.jsx"
Cohesion: 0.20
Nodes (14): BuildSwarm(), clamp(), COLORS, createAgent(), easeInOut(), easeOut(), lerp(), NAMES (+6 more)

### Community 7 - "Design System: Sunil Humanabad Portfolio"
Cohesion: 0.07
Nodes (28): Buttons, Capabilities (spec sheet), Cards / Containers, Case study (browser frame), Chips, Colors, Components, Custom Cursor (+20 more)

### Community 8 - "Sunil Humanabad: Portfolio"
Cohesion: 0.22
Nodes (8): Adding a project, Changing the name, Content sources, Deploying, Features, Quick start, Sunil Humanabad: Portfolio, Where to edit things

### Community 10 - "compilerOptions"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, paths, exclude

### Community 12 - "Sunil Humanabad — Portfolio"
Cohesion: 0.29
Nodes (6): Commands, graphify, Rules, Skills in this project (`.claude/skills/`), Sunil Humanabad — Portfolio, Where things live

### Community 13 - "Product"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+3 more)

### Community 14 - "layout.jsx"
Cohesion: 0.15
Nodes (11): body, current, display, hand, jsonLd, metadata, RootLayout(), viewport (+3 more)

### Community 15 - "Impeccable audit — 2026-11-06"
Cohesion: 0.40
Nodes (4): Fixed in this pass, Impeccable audit — 2026-11-06, Open findings, Positive findings

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `3\. CREATIVE DIRECTION` connect `BuildSwarm.jsx` to `UNIVERSAL PREMIUM PORTFOLIO WEBSITE BUILDER`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `UNIVERSAL PREMIUM PORTFOLIO WEBSITE BUILDER` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `site.js` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09230769230769231 - nodes in this community are weakly interconnected._
- **Should `WorkSection.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1350806451612903 - nodes in this community are weakly interconnected._
- **Should `Design System: Sunil Humanabad Portfolio` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._