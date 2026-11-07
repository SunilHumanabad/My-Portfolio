'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { site, locationLabel } from '@/config/site';
import { external, pad } from '@/lib/utils';
import Magnetic from './Magnetic';
import { useMotionPref } from './Providers';

const { identity, labels: L } = site;

function NameLines() {
  return identity.nameLines.map((line, i) => (
    <span
      key={line}
      className={`hero__line hero__line--${i + 1}`}
      style={{ '--em': identity.nameLineWidthsEm?.[i] ?? line.length * 0.52 }}
    >
      {line}
    </span>
  ));
}

/**
 * metrics: computed from the data files, never typed in by hand.
 */
export default function Hero({ metrics = [] }) {
  const ref = useRef(null);
  const { enabled } = useMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, enabled ? -70 : 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, enabled ? 110 : 0]);

  return (
    <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__inner container">
        <ul className="hero__meta intro intro--1">
          <li>{identity.profession}</li>
          {identity.availability ? (
            <li className="hero__status">
              <span className="hero__pulse" aria-hidden="true" />
              {identity.availability}
            </li>
          ) : null}
          {locationLabel ? (
            <li>
              <MapPin size={14} aria-hidden="true" /> {locationLabel}
            </li>
          ) : null}
        </ul>

        <div className="hero__stage">
          <p className="hero__greet intro intro--2" aria-hidden="true">
            {identity.greeting}
          </p>

          <motion.h1 id="hero-title" className="hero__name" style={{ y: nameY }}>
            <NameLines />
            <span className="sr-only"> — {identity.profession}</span>
          </motion.h1>

          {identity.portrait?.src ? (
            <motion.div className="hero__portrait" style={{ y: portraitY }}>
              <Image
                src={identity.portrait.src}
                width={identity.portrait.width}
                height={identity.portrait.height}
                alt={identity.portrait.alt}
                preload
                sizes="(max-width: 900px) 80vw, 40vw"
              />
            </motion.div>
          ) : null}

          {/* Outline copy of the name drawn over the portrait (decorative). */}
          {identity.portrait?.src ? (
            <motion.div className="hero__name hero__name--outline" style={{ y: nameY }} aria-hidden="true">
              <NameLines />
            </motion.div>
          ) : null}
        </div>

        <div className="hero__bottom">
          <div className="hero__copy intro intro--3">
            <p className="hero__intro">{identity.intro}</p>
            <ul className="hero__tags" aria-label="Specialties">
              {identity.specialties.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="hero__actions intro intro--4">
            <Magnetic>
              <a href="#work" className="btn btn--primary">
                {L.viewWork} <ArrowDownRight size={18} aria-hidden="true" />
              </a>
            </Magnetic>
            <a href="#contact" className="btn btn--ghost">
              {L.contact}
            </a>
            {identity.resume ? (
              <a href={identity.resume} className="link-arrow" {...external}>
                {L.resume} <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>

          {metrics.length ? (
            <dl className="hero__metrics intro intro--5">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{typeof m.value === 'number' ? pad(m.value) : m.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}
