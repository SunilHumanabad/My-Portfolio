/**
 * Blocks the live build (multiplayer cursors) rebuilds, in the order they appear.
 * 'box' = dragged out with a crosshair, 'text' = typed, 'wipe' = typed in one stroke (rotated text).
 * Shared by the build engine and the layout, which hides these before first paint when
 * the build is about to auto-play.
 */
export const BLOCKS = [
  ['.hero__meta li', 'text'],
  ['.hero__greet', 'wipe'],
  ['h1.hero__name .hero__line', 'text'],
  ['.hero__portrait', 'box'],
  ['.hero__intro', 'text'],
  ['.hero__tags', 'text'],
  ['.hero__actions > *', 'box'],
  ['.hero__metrics > div', 'box'],
  ['.section-head__title', 'text'],
  ['.section-head__note', 'wipe'],
  ['.clients__label', 'text'],
  ['.clients__list li', 'text'],
  ['.case__media', 'box'],
  ['.case__title', 'text'],
  ['.case .meta-line', 'text'],
  ['.case__summary', 'text'],
  ['.case__points li', 'text'],
  ['.case__actions > *', 'box'],
  ['.archive__title', 'text'],
  ['.filter', 'box'],
  ['.search', 'box'],
  ['.arow', 'box'],
  ['.about__statement', 'text'],
  ['.about__body p', 'text'],
  ['.facts > div', 'box'],
  ['.capabilities__title', 'text'],
  ['.capability', 'box'],
  ['.label-heading', 'text'],
  ['.xp', 'box'],
  ['.contact__big', 'text'],
  ['.contact__blurb', 'text'],
  ['.email-row', 'box'],
  ['.socials li', 'box'],
  ['.contact-form', 'box'],
  ['.site-footer__mark', 'text'],
  ['.site-footer__row', 'box'],
];

/** CSS that keeps every block invisible until the build takes over (no flash of content). */
export const pendingBuildCss =
  `html[data-build='pending'] :is(${[...BLOCKS.map(([s]) => s), '.hero__name--outline .hero__line'].join(', ')}){opacity:0!important}` +
  `html[data-build='pending'] :is(.hero .intro, .hero__line, .hero__portrait img){animation:none!important}`;
