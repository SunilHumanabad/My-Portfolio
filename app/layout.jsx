import { Anton, Caveat, Manrope } from 'next/font/google';
import { site, motionStorageKey } from '@/config/site';
import { experience } from '@/data/experience';
import Providers from '@/components/Providers';
import { pendingBuildCss } from '@/lib/buildBlocks';
import './globals.css';

const display = Anton({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-display' });
const body = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
const hand = Caveat({ subsets: ['latin'], display: 'swap', variable: '--font-hand' });

const { identity, contact, seo, appearance } = site;

export const metadata = {
  metadataBase: new URL(site.websiteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: identity.fullName,
  authors: [{ name: identity.fullName, url: site.websiteUrl }],
  creator: identity.fullName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: identity.fullName,
    title: seo.title,
    description: seo.description,
    locale: 'en_US',
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.ogImageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: appearance.background,
  colorScheme: 'dark',
};

// Runs before first paint: decides whether animations are on and, if the live build
// will auto-play, marks the page "pending" so its blocks stay hidden until the cursors
// arrive. A timeout shows everything anyway if the app never takes over.
const motionBoot = `(function(){var d=document.documentElement,on=true;try{var v=localStorage.getItem(${JSON.stringify(
  motionStorageKey,
)});if(v){on=v==='on'}else if(${site.motion.respectReducedMotion ? 'true' : 'false'}){on=!matchMedia('(prefers-reduced-motion: reduce)').matches}}catch(e){}d.dataset.motion=on?'on':'off';if(on&&${
  site.motion.autoBuild ? 'true' : 'false'
}){d.dataset.build='pending';setTimeout(function(){if(d.dataset.build==='pending')delete d.dataset.build},8000)}})();`;

const current = experience.find((e) => !e.end);
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: identity.fullName,
  url: site.websiteUrl,
  image: `${site.websiteUrl}${identity.portrait.src}`,
  jobTitle: identity.profession,
  description: seo.description,
  email: `mailto:${contact.email}`,
  ...(identity.location?.city && {
    address: {
      '@type': 'PostalAddress',
      addressLocality: identity.location.city,
      addressCountry: identity.location.countryCode,
    },
  }),
  ...(current && { worksFor: { '@type': 'Organization', name: current.organization, url: current.url } }),
  knowsAbout: identity.specialties,
  sameAs: contact.socials.map((s) => s.href),
};

export default function RootLayout({ children }) {
  const tokens = {
    '--bg': appearance.background,
    '--fg': appearance.text,
    '--accent': appearance.accent,
    '--muted': appearance.muted,
  };
  return (
    <html
      lang={site.language}
      className={`${display.variable} ${body.variable} ${hand.variable}`}
      style={tokens}
      data-motion="on"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <style dangerouslySetInnerHTML={{ __html: pendingBuildCss }} />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<style>[data-reveal]{opacity:1!important;transform:none!important}html[data-build] *{opacity:1!important}</style>',
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {site.labels.skipToContent}
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
