# Sunil Humanabad: Portfolio

My personal portfolio site. It's built with **Next.js 16**, **React 19** and **Framer Motion 12**, styled with plain CSS, and exported as a fully static site.

Live: https://sunilhumanabad.vercel.app

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command         | What it does                                                    |
| --------------- | --------------------------------------------------------------- |
| `npm run dev`   | Development server with hot reload                              |
| `npm run build` | Static production build in `out/`                               |
| `npm start`     | Serves `out/` locally (run `npm run build` first)               |
| `npm run lint`  | ESLint (Next.js core-web-vitals rules)                          |
| `npm run check` | Lint + build. Run this before deploying                         |

Requires Node.js 20.9 or newer.

## Where to edit things

All personal content is in two places. UI components never hard-code names or contact details.

| File                    | Contents                                                                    |
| ----------------------- | --------------------------------------------------------------------------- |
| `config/site.js`        | Name, profession, bio, location, contact, socials, résumé link, SEO, colours, section toggles, UI labels |
| `data/projects.js`      | Projects (featured + archive). The schema is documented at the top of the file |
| `data/experience.js`    | Work experience and (optional) education                                    |
| `data/skills.js`        | Core stack with self-assessed levels, plus other tools                     |
| `public/assets/`        | Portrait, project images and the Open Graph image                          |
| `app/icon.svg`, `app/apple-icon.png` | Favicon and touch icon                                        |

If a value is empty, the matching UI is hidden. For example, leaving `contact.whatsapp` empty hides the WhatsApp link, and a project with no `liveUrl` shows no "Live site" button.

### Adding a project

1. Export a screenshot as WebP, about 1600 px wide, into `public/assets/projects/`.
2. Add an entry to `data/projects.js` with `cover: { src, width, height, alt }`.
3. Set `featured: true` to show it large in **Selected Work**. Every project appears in the **Project Archive**.

A project with no image gets a designed typographic cover automatically.

### Changing the name

The hero sets both name lines to the same width using the widths in `identity.nameLineWidthsEm`. If the name changes, update those numbers (or delete them to fall back to an estimate).

## Features

- Cinematic hero: oversized Anton name, a cut-out portrait layered between solid and outlined type, and restrained scroll parallax
- **Motion** button in the header plays a swarm intro: cursors labelled with my skills fly in and stamp out my name. It's original canvas code with no third-party scripts
- Animations on/off switch. The choice is saved under `sunil-humanabad:motion` and follows the OS "reduce motion" setting by default
- Selected Work rows plus a Project Archive with category filters, search, load-more and a cursor-following preview
- Project dialog with focus trap, Escape/backdrop/close, ←/→ to move between projects, and focus restored on close
- Expandable experience timeline, skills with self-assessed levels
- Contact form that validates and opens the visitor's email app (`mailto:`). It never claims a message was "sent"
- SEO: title/description, canonical URL, Open Graph/Twitter image, JSON-LD `Person`, `robots.txt`, `sitemap.xml`
- Accessibility: skip link, landmarks, a single `h1`, visible focus styles, 44 px tap targets, `inert` background behind dialogs and the mobile menu

## Deploying

`next.config.mjs` uses `output: 'export'`, so `npm run build` writes plain static files to `out/`.

- **Vercel**: import the repo. The defaults work.
- **Netlify / Cloudflare Pages / GitHub Pages**: build command `npm run build`, publish directory `out`.

If the domain changes, update `websiteUrl` in `config/site.js` so the canonical URL, Open Graph tags and sitemap stay correct.

## Content sources

Content comes from the original portfolio repo (`data/Data.tsx`), the project READMEs on GitHub, and the public GitHub profile (location). The Task Management screenshots are frames from the demo video in that repository.
