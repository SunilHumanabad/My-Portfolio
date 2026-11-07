/** Shared easing curve for every animation on the site. */
export const EASE = [0.22, 1, 0.36, 1];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2024-02' → 'Feb 2024' */
export function formatMonth(value) {
  if (!value) return '';
  const [y, m] = String(value).split('-');
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}

/** '2023-11-24' → '24 Nov 2023' */
export function formatDate(value) {
  const [y, m, d] = String(value).split('-');
  return [d ? Number(d) : '', m ? MONTHS[Number(m) - 1] : '', y].filter(Boolean).join(' ');
}

/** Formats a start/end pair, e.g. 'Feb 2024 — Present'. */
export function formatPeriod(start, end) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`;
}

/** Two-digit index: 1 → '01'. */
export const pad = (n) => String(n).padStart(2, '0');

/** Safe external link props. */
export const external = { target: '_blank', rel: 'noopener noreferrer' };

/** Extracts a YouTube video id from common URL shapes. */
export function youTubeId(url) {
  if (!url) return '';
  const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : '';
}
