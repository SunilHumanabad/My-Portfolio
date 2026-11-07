---
name: Sunil Humanabad Portfolio
description: Cinematic, editorial dark portfolio where multiplayer cursors build the page live.
colors:
  projector-black: "#090909"
  bone: "#f2efeb"
  signal-red: "#e32b3c"
  ash: "#a09c9a"
  signal-red-text: "#f16c6b"
  signal-red-deep: "#ba212f"
  surface: "#101010"
  surface-raised: "#171717"
  status-green: "#4fd27c"
typography:
  display:
    fontFamily: "Anton, Impact, 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.8rem, 11vw, 9.5rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0em"
  title:
    fontFamily: "Anton, Impact, 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.1rem, 3.8vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.16em"
  hand:
    fontFamily: "Caveat, 'Segoe Script', cursive"
    fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(5rem, 11vw, 10rem)"
  max-width: "1440px"
  header: "72px"
components:
  button-primary:
    backgroundColor: "{colors.signal-red-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 1.45em"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.projector-black}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.pill}"
    padding: "0 1.45em"
    height: "48px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ash}"
    rounded: "{rounded.pill}"
    padding: "0.3em 0.8em"
  input:
    backgroundColor: "{colors.projector-black}"
    textColor: "{colors.bone}"
    rounded: "{rounded.md}"
    padding: "0.8rem 1rem"
    height: "48px"
---

# Design System: Sunil Humanabad Portfolio

## Overview

**Creative North Star: "The Late-Night Edit Suite"**

The site behaves like a cinema title sequence cut in a dark edit suite: near-black stage, oversized condensed type set like a film title, one red signal light, and the work itself in the spotlight. It is the owner's brief made concrete: *cinematic minimal, premium, editorial, refined typography*. Density is low and confident. Each section opens with a single huge headline, then lets real screenshots and plain copy carry the weight.

Personality comes from three hand-placed touches, never from decoration everywhere: the red "S" of the wordmark, the red handwritten Caveat asides ("hello, I'm", "things I've built"), and the live build, where skill-named multiplayer cursors draw boxes and type text as the visitor scrolls. That build is the site's one authored motion moment.

**Key Characteristics:**
- Dark stage (#090909) with warm bone text, never pure white on pure black.
- Anton for every headline, set huge, uppercase and tight; Manrope for everything you read.
- A single accent, Signal Red, used sparingly as a signal (CTA, active state, live cursor, rule lines).
- Thin 1px hairlines instead of boxes; cards are rare.
- Real artifacts: a cut-out portrait and real project screenshots, never stock or placeholder imagery.

## Colors

One warm neutral pair and one red signal. Everything else is a tint of those.

### Primary
- **Signal Red** (#e32b3c): the brand accent. Display-size accents ("CONNECT."), the wordmark's "S", list markers, nav underline, rule ticks, progress bar and the user's custom cursor dot. At 4.43:1 on black it is for large type and graphics only.
- **Signal Red Text** (#f16c6b, `color-mix(in oklab, accent, white 24%)`): the accent when it must carry small text (section indices, handwritten notes, errors, hovered links). 6.7:1 on black.
- **Signal Red Deep** (#ba212f, `color-mix(in oklab, accent, black 14%)`): filled buttons and switches carrying white text. 6.3:1 with white.

### Neutral
- **Projector Black** (#090909): page background and input fill.
- **Bone** (#f2efeb): primary text and headlines (17.4:1).
- **Ash** (#a09c9a): secondary text, labels, meta (7.3:1).
- **Surface** (#101010) / **Surface Raised** (#171717): the few raised areas (contact form, typographic covers, hovered archive rows).
- **Hairline** (bone at 13% / 24% alpha): dividers, outlines, ghost-button borders.

### Functional
- **Status Green** (#4fd27c): only the availability pulse and the "Building live" dot.
- **Collaborator palette** (live build only): #e32b3c, #7b61ff, #0fa958, #1abcfe, #f5a400, #ff7262, #a259ff, #00b5a3, #ff4fa3, #3d8bff. Each cursor gets one colour. They never appear outside the live build.

### Named Rules
**The One Signal Rule.** Red marks what matters right now: the next action, the active state, the live cursor. If more than one red thing competes on a screen, demote one.

**The Warm Dark Rule.** Never #000 or #fff. Background stays #090909 and text #f2efeb so the stage feels filmic, not like a terminal.

## Typography

**Display Font:** Anton (with Impact, Arial Narrow)
**Body Font:** Manrope (with system-ui)
**Accent Font:** Caveat, for handwritten asides only

**Character:** A condensed poster face shouting the headline, a calm humanist sans doing the explaining, and a pen note in the margin.

### Hierarchy
- **Hero name** (Anton 400, sized so "SUNIL" and "HUMANABAD" are exactly the same width, line-height 0.86): the only h1.
- **Section display** (Anton 400, `clamp(2.8rem, 11vw, 9.5rem)`, 0.88): one per section.
- **Title** (Anton 400, `clamp(2.1rem, 3.8vw, 3.5rem)`, 0.95): project titles, company names, skill names.
- **Statement** (Manrope 600, `clamp(1.6rem, 3.3vw, 2.85rem)`, 1.15, -0.02em): the About lead.
- **Body** (Manrope 400, 1rem to 1.1rem, 1.6, max 60 to 65ch): descriptions and bios, usually in Ash.
- **Label** (Manrope 700, 0.72 to 0.8rem, 0.14 to 0.16em, uppercase): meta rows, list headings, dt labels.
- **Hand** (Caveat 600, `clamp(1.4rem, 2.6vw, 2.1rem)`, rotated -3° to -6°, Signal Red Text): at most one per section.

### Named Rules
**The Equal Width Rule.** The two hero name lines are always set to the same measured width (`identity.nameLineWidthsEm` in `config/site.js`). Change the name, update the widths.

**The Display Is Anton Rule.** Never set a headline in the system fallback; next/font self-hosts Anton with `display: swap`.

## Layout

A 1440px max container with a fluid gutter (`clamp(16px, 4vw, 48px)`). Sections breathe with `clamp(5rem, 11vw, 10rem)` vertical padding and are divided by a single hairline. The hero fills the viewport. At ≥1200px it splits into name lockup (left), portrait (centre, overlapping the name) and copy column (right, `min(28vw, 380px)`). At 900 to 1199px the copy sits under the name with the portrait on the right. Below 900px everything stacks and the portrait overlaps the bottom of the name. Featured projects use a 12-column grid alternating image and text (7 + 4 columns); the archive is a full-width list. Breakpoints: 1200, 900, 800, 600, 480px. No horizontal scroll at 320px.

## Elevation & Depth

Flat by default. Depth comes from layering, not shadows: the portrait sits between a solid and an outlined copy of the name, a faint film grain (3.5% noise) and column guides sit behind the hero, and a soft radial red glow (14%) warms the hero's right side. Shadows appear only on floating things.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 30px 60px -20px rgb(0 0 0 / 0.75)`): the archive hover preview.
- **Sheet** (`box-shadow: 0 -30px 80px -30px rgb(0 0 0 / 0.7)`): the project dialog panel.
- **HUD** (`box-shadow: 0 16px 40px -16px rgb(0 0 0 / 0.7)`): the live-build status pill.

### Named Rules
**The Hairline Rule.** Separate with 1px Bone-at-13% lines, not boxes or shadows.

## Shapes

Pills for anything you press (buttons, chips, filters, switches, search). Small radii elsewhere: 4px on archive thumbnails, 6px on project media, 8px on inputs, 14 to 16px on the contact form and dialog sheet. Outlined Anton numerals and the outlined footer wordmark repeat the hero's outline-over-solid motif.

## Components

### Buttons
- **Shape:** pill (999px), min height 48px (44px small).
- **Primary:** Signal Red Deep fill, white 700 text. **Hover:** flips to Bone fill with Projector Black text.
- **Ghost:** 1px Hairline-24% border, Bone text; hover fills Bone.
- **Link arrow:** bold text plus a Lucide arrow; hover turns Signal Red Text.
- **Magnetic:** the hero "View work" CTA leans toward a fine pointer.

### Chips
- **Style:** transparent, 1px hairline, Ash text 0.78rem; the large variant uses Bone text.
- **Filters:** text buttons with a counter; the active one gets a 2px Signal Red underline that slides between filters (shared layout animation).

### Case study (browser frame)
- Featured projects sit in a quiet browser frame: 12px radius, 1px Hairline-24% border, Surface-Raised bar (38px) with three outline dots and a centred domain pill, soft Float shadow.
- The viewport is 16:10. With a full-page capture, hovering scrolls the whole page inside the frame (`--shift`/`--dur` computed from the image; fine pointers and motion on only). In the dialog the frame shows the full page at natural height.
- Info column: Anton title, meta line (category · year · role), summary, three highlights with red tick lines, then actions. Images and text alternate sides (8 + 4 columns).

### Capabilities (spec sheet)
- Full-width rows divided by hairlines: Anton group title (15rem column), Ash summary, then skills as bold words, each with a 5px red dot marker. No cards, no proficiency bars.

### Cards / Containers
- Used only for the contact form (Surface, 1px hairline, 14px radius) and project covers. Projects without a screenshot get a **typographic cover**: Surface fill, red radial glow, 25% hairline grid, giant outlined initial, Anton title.

### Inputs / Fields
- **Style:** Projector Black fill, 1px Hairline-24% border, 8px radius, 48px min height. Uppercase label above.
- **Focus:** border turns Bone with a 3px Bone-20% ring. **Error:** Signal Red Text border plus a message tied by `aria-describedby`.

### Navigation
- Fixed header, transparent over the hero, then 80% Projector Black with blur and a hairline once scrolled. Links are Ash and turn Bone when hovered or active, with a sliding red underline. A 2px red scroll-progress bar runs along the top. Below 900px a full-screen menu with Anton links replaces the nav.

### Live Build (signature component)
Multiplayer cursors labelled with the owner's skills rebuild the page as you scroll. Boxes are dragged out with a crosshair, a Figma-style selection frame and a W × H badge; text is typed behind an I-beam and caret. It auto-plays on load (`site.motion.autoBuild`). A bottom HUD shows the collaborators, progress and Skip, and Esc skips too. More cursors join when the backlog grows. Block list: `lib/buildBlocks.js`. Engine: `components/BuildSwarm.jsx`.

### Custom Cursor
A Signal Red dot with a trailing Bone ring. It grows into a red ring over links and a filled "View" badge over project images. Fine pointers only, and only while animations are on.

## Do's and Don'ts

### Do:
- **Do** keep headlines in Anton, uppercase, line-height 0.86 to 0.95.
- **Do** use Signal Red Text (#f16c6b) for any red under 24px; reserve #e32b3c for large type and graphics.
- **Do** put category and year *after* a title as a meta line, never above it.
- **Do** show client work inside the browser frame with a real capture; list clients as text, never as logos you don't have.
- **Do** add new blocks to `lib/buildBlocks.js` so the live build draws them.
- **Do** keep every tap target at least 44px tall.

### Don't:
- **Don't** add eyebrow or kicker labels above headings, or section numbers (01, 02…).
- **Don't** bring back self-rated skill bars or percentages.
- **Don't** use stock imagery, fake logos, testimonials or invented stats; omit the section instead.
- **Don't** add a second accent colour outside the live-build collaborator palette.
- **Don't** add new scroll effects or entrance animations; the live build is the motion moment.
- **Don't** use gradient text, glassmorphism as decoration, or hard offset shadows.
