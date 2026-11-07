/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one place for personal details.
 *
 *  Header, hero, metadata / Open Graph, JSON-LD, contact and footer all read
 *  from this file. Projects, experience and skills live in /data.
 *
 *  Rule of thumb: only put real, verifiable information here. Leave a value
 *  empty ('' or []) and the matching UI disappears cleanly.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  // Used for canonical URL, Open Graph, sitemap and robots.txt. No trailing slash.
  websiteUrl: 'https://sunilhumanabad.vercel.app',
  language: 'en',

  identity: {
    fullName: 'Sunil Humanabad',
    // The hero prints these as two giant lines.
    nameLines: ['Sunil', 'Humanabad'],
    // Width of each line in the display font (Anton), in em. Used to set both lines to the
    // same width. If you change the name, update these (or delete them for an estimate).
    nameLineWidthsEm: [2.057, 4.645],
    // Header wordmark. Its first letter is drawn in the accent colour.
    wordmark: 'Sunil',
    profession: 'UI/UX Designer & Full Stack Developer',
    roleLine2: 'Design, full-stack development & AI',
    greeting: "hello, I'm",
    specialties: ['UI/UX Design', 'React', 'Next.js', 'Python', 'Django', 'FastAPI', 'AI Agents', 'Odoo'],
    location: { city: 'Bengaluru', country: 'India', countryCode: 'IN' },
    availability: 'Open to freelance, full-time & collabs', // '' hides the status pill
    intro:
      'I design and build websites and web apps end to end, from the first wireframe to the backend, AI agents and RAG applications.',
    // Big statement at the top of the About section. Specialties named here are highlighted.
    statement: 'I design interfaces people trust, then build everything that runs behind them.',
    about: [
      'I’m Sunil Humanabad, a UI/UX designer and full stack developer based in Bengaluru.',
      'Recently I’ve designed websites for an Indian food exporter, a nanoparticle-instrument partner, a deep-tech product consultancy and a technology and education firm.',
      'I work across the stack in Python and JavaScript (Node.js): Django, Flask and FastAPI behind React and Next.js. I build AI agents, RAG applications and n8n automations, and work with Odoo ERP. I thrive in dynamic environments, using that adaptability to drive successful outcomes.',
    ],
    portrait: {
      src: '/assets/portrait.webp',
      width: 972,
      height: 1500,
      alt: 'Sunil Humanabad in a blue blazer, holding a phone',
    },
    resume: 'https://drive.google.com/file/d/1WJLY0iKnWHoFWjWhm7Y7D0eqflNqe8Sy/view?usp=sharing', // '' hides résumé links
  },

  contact: {
    email: 'sunilhumanabad@gmail.com',
    phone: '', // optional; empty = hidden
    whatsapp: '', // optional, international digits only (e.g. 9198xxxxxxx); empty = hidden
    heading: ['Let’s', 'connect.'],
    // Contact form: what the visitor is getting in touch about (becomes the email subject).
    reasons: ['Freelance project', 'Full-time role', 'Collaboration'],
    blurb:
      'Have a project, a role or an idea? I’m open to freelance work, full-time roles and collaborations. Tell me what you’re building.',
    socials: [
      { label: 'GitHub', href: 'https://github.com/SunilHumanabad', icon: 'github', handle: '@SunilHumanabad' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sunilhumanabad/', icon: 'linkedin', handle: 'in/sunilhumanabad' },
    ],
  },

  // Design tokens. These become CSS custom properties on <html>.
  appearance: {
    background: '#090909',
    text: '#f2efeb',
    accent: '#e32b3c',
    muted: '#a09c9a',
  },

  seo: {
    title: 'Sunil Humanabad — UI/UX Designer & Full Stack Developer',
    description:
      'Portfolio of Sunil Humanabad, a UI/UX designer and full stack developer in Bengaluru, India: websites, web apps, AI agents and RAG applications built with React, Next.js, Python, Django and FastAPI.',
    ogImage: '/assets/og.jpg',
    ogImageAlt: 'Sunil Humanabad — UI/UX Designer & Full Stack Developer',
  },

  motion: {
    // Play the multiplayer-cursor "live build" automatically when the page loads.
    // Visitors can still skip it (Esc / Skip) or switch animations off (remembered).
    autoBuild: true,
    // true = visitors whose OS has "reduce motion" on start with animations off.
    respectReducedMotion: false,
  },

  // Turn sections on/off. Sections with no data hide themselves anyway.
  sections: {
    work: true,
    archive: true,
    about: true,
    experience: true,
    education: true,
    contact: true,
    contactForm: true,
  },

  // UI strings (translate here to change the site language).
  labels: {
    nav: { work: 'Work', about: 'About', experience: 'Experience', contact: 'Contact' },
    skipToContent: 'Skip to content',
    talk: 'Let’s talk',
    viewWork: 'View work',
    contact: 'Contact',
    resume: 'Résumé',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    motion: 'Motion',
    motionPlay: 'Watch this page get built live',
    motionToggle: 'Animations',
    workTitle: 'Selected Work',
    workNote: 'latest first',
    recentClients: 'Recent work for',
    archiveTitle: 'Project Archive',
    archiveAll: 'All',
    searchLabel: 'Search projects',
    searchPlaceholder: 'Search by name or tool…',
    loadMore: 'Load more',
    viewProject: 'View project',
    noResults: 'No projects match your filters.',
    clearFilters: 'Clear filters',
    noProjects: 'New projects are on the way.',
    aboutTitle: 'About',
    aboutNote: 'a little about me',
    capabilities: 'Capabilities',
    experienceTitle: 'Experience',
    experienceNote: 'where I’ve worked',
    educationTitle: 'Education',
    formName: 'Your name',
    formEmail: 'Your email',
    formMessage: 'Message',
    formSend: 'Open in email app',
    copyEmail: 'Copy email',
    copied: 'Copied',
    backToTop: 'Back to top',
    liveSite: 'Live site',
    sourceCode: 'Source code',
    watchDemo: 'Watch demo',
    close: 'Close',
    previous: 'Previous project',
    next: 'Next project',
  },
};

/** Lower-case, dash-separated version of the owner's name, e.g. "sunil-humanabad". */
export const brandSlug = site.identity.fullName
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

/** localStorage key for the Motion on/off preference — unique per site owner. */
export const motionStorageKey = `${brandSlug}:motion`;

export const locationLabel = [site.identity.location?.city, site.identity.location?.country]
  .filter(Boolean)
  .join(', ');
