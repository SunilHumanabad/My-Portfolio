'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { site } from '@/config/site';
import { education, experience } from '@/data/experience';
import { EASE, external, formatPeriod } from '@/lib/utils';
import { useMotionPref } from './Providers';
import Reveal from './Reveal';
import SectionHead from './SectionHead';

const L = site.labels;

function TimelineItem({ item, open, onToggle, enabled }) {
  const panelId = `xp-${item.id}`;
  const current = !item.end;
  return (
    <Reveal as="li" className={`xp${open ? ' is-open' : ''}${current ? ' is-current' : ''}`}>
      <span className="xp__dot" aria-hidden="true" />
      <p className="xp__period">
        {formatPeriod(item.start, item.end)}
        {current ? <span className="xp__now">Now</span> : null}
      </p>
      <h3 className="xp__heading">
        <button type="button" className="xp__toggle" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span className="xp__org">{item.organization}</span>
          <span className="xp__role">
            {item.role}
            {item.type ? <span className="muted"> · {item.type}</span> : null}
          </span>
          <Plus className="xp__icon" size={22} aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            className="xp__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={enabled ? { duration: 0.45, ease: EASE } : { duration: 0 }}
          >
            <div className="xp__content">
              {item.summary ? <p className="xp__summary">{item.summary}</p> : null}
              {item.points?.length ? (
                <ul className="ticks">
                  {item.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              ) : null}
              <div className="xp__foot">
                {item.tags?.length ? (
                  <ul className="chips">
                    {item.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
                {item.url ? (
                  <a className="link-arrow" href={item.url} {...external}>
                    {item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ArrowUpRight size={15} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Reveal>
  );
}

export default function Experience() {
  const { enabled } = useMotionPref();
  const [open, setOpen] = useState(() => new Set(experience[0] ? [experience[0].id] : []));
  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const showEducation = site.sections.education && education.length > 0;

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead id="experience" title={L.experienceTitle} note={L.experienceNote} />
        <ol className="timeline">
          {experience.map((item) => (
            <TimelineItem key={item.id} item={item} open={open.has(item.id)} onToggle={() => toggle(item.id)} enabled={enabled} />
          ))}
        </ol>

        {showEducation ? (
          <div className="education">
            <h3 className="label-heading">{L.educationTitle}</h3>
            <ul className="edu-list">
              {education.map((e) => (
                <li key={e.id}>
                  <span className="xp__period">{formatPeriod(e.start, e.end)}</span>
                  <span className="edu-list__q">{e.qualification}</span>
                  <span className="muted">{e.institution}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
