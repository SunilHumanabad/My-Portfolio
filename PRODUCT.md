# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A mixed audience with no single group first (confirmed by the owner):

- **Prospective clients** who want a website or web app built and are deciding whether to hire Sunil for it.
- **Recruiters and hiring managers** scanning for a full-stack developer.
- **Fellow developers** looking for collaborators, code and stack.

All of them skim: they decide in seconds from the hero, then dip into one or two projects.

## Product Purpose

The personal portfolio of Sunil Humanabad, a UI/UX designer and full stack developer in Bengaluru, India. It shows real projects and experience and turns interest into contact.

**Success (confirmed by the owner):** a visitor gets in touch, through email, the contact form or LinkedIn, for any of three reasons, all equally valued:

1. a **job**: a full-time role offer or interview;
2. a **freelance** or contract project;
3. a **collaboration** with a fellow developer.

## Positioning

One person who designs *and* builds: UI/UX design for real clients (Unique Food Express, Bioparticle, MountainGrid, Unplex), full-stack engineering (React/Next.js, Python with Django/Flask/FastAPI, Node.js), AI agents, RAG and n8n automation, and Odoo ERP. Academic work includes an IEEE-published ML paper (ICIICS 2023). The site itself is the proof of craft: the multiplayer-cursor "live build" shows the design-and-build process happening on the page.

## Operating Context

- Static Next.js site (`output: 'export'`), deployed to https://sunilhumanabad.vercel.app.
- Visitors arrive from GitHub, LinkedIn, résumé links and direct shares, on desktop and phone.
- No backend: the contact form opens the visitor's email app (`mailto:`) and never claims a message was sent.

## Capabilities and Constraints

- All personal content lives in `config/site.js` and `data/*.js`; components never hard-code names or contact details.
- Sections hide themselves when their data is empty; missing data must never produce placeholders, dummy stats or dead buttons.
- Motion is part of the brand: the live build auto-plays on load (`site.motion.autoBuild`). Visitors can skip it (Esc / Skip) or switch animations off, and that choice is remembered.
- Availability shown in the hero: "Open to freelance, full-time & collabs". Location: Bengaluru, India.
- **Undecided:** College Connect's tech stack is unknown. The tools listed on the UI/UX projects were detected from each live site's source and need the owner's confirmation.

## Brand Commitments

- Name: Sunil Humanabad. Wordmark "SUNIL" with the "S" in the accent red (owner's request, Nov 2026); the red S is also the app icon.
- Voice: first person, plain and direct, confident without hype.
- Assets: the cut-out portrait (`public/assets/portrait.webp`) and the project screenshots in `public/assets/projects/`.

## Evidence on Hand

- UI/UX design work (owner-confirmed, live): Unique Food Express (uniquefoodexpress.com, 2026), Bioparticle (bioparticle.com, 2026), MountainGrid Solutions (mountaingrid.in, 2026), Unplex Technologies (unplex.tech, 2025), Unplex Blueprints (unplex.io, 2025). Screenshots captured Nov 2026 in `public/assets/projects/`.
- Academic projects: Phishing Website Detection (published: "Phishing Website Detection Using Machine Learning Methods", IEEE ICIICS 2023, 24 Nov 2023, DOI 10.1109/ICIICS59993.2023.10420933), CIE Marks Entry System, College Connect, Diabetes Prediction.
- Verified numbers: Phishing Detection metrics from its README (0.975 accuracy, 7 models, 8,843/2,211 split).
- Skills: the owner's technical-skills list (languages, frontend, backend, databases, cloud & DevOps, Odoo/OAuth/RBAC/Google APIs/n8n) plus UI/UX design, AI agents and RAG applications.
- Experience: Unplex Technologies (Full Stack Developer, Feb 2024 to present); Utilinet Technologies Services (Software Development Intern, Mar to Sep 2023).
- Résumé: Google Drive link in `config/site.js`.
- **Absent, do not fabricate:** testimonials, client logos (client names are shown as text only), awards, education records, project-level outcomes beyond those listed, visitor or revenue numbers.

## Product Principles

1. **Real work only.** Every claim traces to a repo, a live site or the owner's own words.
2. **Hire-ready in one screen.** Who, what and how to reach out are visible without scrolling.
3. **Show the craft, then get out of the way.** Motion and personality frame the work but never block reading or contacting.
4. **Easy for the owner to keep current.** Content changes happen in data files, not components.

## Accessibility & Inclusion

WCAG 2.2 AA target. 44 px tap targets, visible focus, keyboard-operable dialog and menu, alt text on every image. Decorative motion must be skippable and switchable off, and content stays in the DOM for screen readers while the live build plays.
