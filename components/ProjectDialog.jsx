'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { site } from '@/config/site';
import { EASE, external, formatDate, pad, youTubeId } from '@/lib/utils';
import { GithubIcon } from './Icons';
import ProjectCover from './ProjectCover';
import SiteFrame from './SiteFrame';

const L = site.labels;
const FOCUSABLE = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/** Privacy-friendly YouTube embed: nothing loads from YouTube until the visitor presses play. */
function YouTube({ id, title }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <div className="video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`${title} — video`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <button type="button" className="video video--facade" onClick={() => setPlaying(true)}>
      <Play size={28} aria-hidden="true" />
      <span>Play video</span>
      <span className="sr-only">: {title} (loads YouTube)</span>
    </button>
  );
}

export default function ProjectDialog({ project, index, total, onClose, onPrev, onNext, returnFocus }) {
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const closeRef = useRef(null);
  const videoId = youTubeId(project.videoUrl);

  // Focus, keyboard, scroll lock and inert background while the dialog is open.
  useEffect(() => {
    const root = document.documentElement;
    const outside = [
      document.getElementById('main'),
      document.querySelector('.site-header'),
      document.querySelector('.site-footer'),
    ].filter(Boolean);
    const restoreTo = returnFocus?.current;
    root.style.setProperty('--scrollbar-gap', `${window.innerWidth - root.clientWidth}px`);
    root.classList.add('dialog-open');
    outside.forEach((el) => el.setAttribute('inert', ''));
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && total > 1) {
        onPrev();
      } else if (e.key === 'ArrowRight' && total > 1) {
        onNext();
      } else if (e.key === 'Tab' && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll(FOCUSABLE)];
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      root.classList.remove('dialog-open');
      outside.forEach((el) => el.removeAttribute('inert'));
      // Put focus back on the control that opened the dialog.
      restoreTo?.focus?.({ preventScroll: true });
    };
  }, [onClose, onPrev, onNext, total, returnFocus]);

  // Back to the top when switching projects.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const pub = project.publication;
  const hasLinks = project.liveUrl || project.sourceUrl || project.demoUrl || pub?.url;

  return createPortal(
    <motion.div
      className="dialog"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dialog__backdrop" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="dialog__panel"
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="dialog__bar">
          <span className="dialog__count" aria-hidden="true">
            {pad(index + 1)} / {pad(total)}
          </span>
          <div className="dialog__controls">
            {total > 1 ? (
              <>
                <button type="button" className="icon-btn" onClick={onPrev}>
                  <ChevronLeft size={20} aria-hidden="true" />
                  <span className="sr-only">{L.previous}</span>
                </button>
                <button type="button" className="icon-btn" onClick={onNext}>
                  <ChevronRight size={20} aria-hidden="true" />
                  <span className="sr-only">{L.next}</span>
                </button>
              </>
            ) : null}
            <button ref={closeRef} type="button" className="icon-btn icon-btn--close" onClick={onClose}>
              <X size={20} aria-hidden="true" />
              <span className="sr-only">{L.close}</span>
            </button>
          </div>
        </div>

        <div className="dialog__scroll" ref={scrollRef}>
          <motion.article
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className="dialog__cover">
              <ProjectCover project={project} sizes="(max-width: 1180px) 100vw, 1100px" />
            </div>

            <header className="dialog__head">
              <h2 id="dialog-title" className="dialog__title">
                {project.title}
              </h2>
              <p className="meta-line">
                {project.category}
                {project.year ? ` · ${project.year}` : ''}
              </p>
              <p className="dialog__summary">{project.summary}</p>
            </header>

            {project.stats?.length ? (
              <dl className="stats">
                {project.stats.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="dialog__body">
              <div className="dialog__text">
                {project.description.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
                {project.highlights?.length ? (
                  <>
                    <h3 className="dialog__subhead">Highlights</h3>
                    <ul className="ticks">
                      {project.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>

              <aside className="dialog__aside" aria-label="Project details">
                <dl className="meta-list">
                  {project.role ? (
                    <div>
                      <dt>Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                  ) : null}
                  {project.year ? (
                    <div>
                      <dt>Year</dt>
                      <dd>{project.year}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>Category</dt>
                    <dd>{project.category}</dd>
                  </div>
                  {pub ? (
                    <div>
                      <dt>Published</dt>
                      <dd>
                        {pub.shortVenue}
                        {pub.date ? <span className="muted"> · {formatDate(pub.date)}</span> : null}
                        <span className="pub">
                          “{pub.title}”. {pub.venue}.{pub.doi ? ` DOI ${pub.doi}` : ''}
                        </span>
                      </dd>
                    </div>
                  ) : null}
                  {project.tools?.length ? (
                    <div>
                      <dt>Built with</dt>
                      <dd>
                        <ul className="chips">
                          {project.tools.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ) : null}
                </dl>

                {hasLinks ? (
                  <div className="dialog__links">
                    {project.liveUrl ? (
                      <a className="btn btn--primary" href={project.liveUrl} {...external}>
                        {L.liveSite} <ArrowUpRight size={17} aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : null}
                    {pub?.url ? (
                      <a className="btn btn--ghost" href={pub.url} {...external}>
                        <BookOpen size={17} aria-hidden="true" /> Read the paper
                        <span className="sr-only"> on IEEE Xplore (opens in a new tab)</span>
                      </a>
                    ) : null}
                    {project.sourceUrl ? (
                      <a className="btn btn--ghost" href={project.sourceUrl} {...external}>
                        <GithubIcon size={17} /> {L.sourceCode}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : null}
                    {project.demoUrl ? (
                      <a className="btn btn--ghost" href={project.demoUrl} {...external}>
                        <Play size={17} aria-hidden="true" /> {L.watchDemo}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </aside>
            </div>

            {videoId ? <YouTube id={videoId} title={project.title} /> : null}

            {project.screenshot ? (
              <figure className="dialog__page">
                <SiteFrame project={project} full sizes="(max-width: 1180px) 100vw, 1100px" />
                <figcaption>{project.screenshot.alt}</figcaption>
              </figure>
            ) : null}

            {project.gallery?.length ? (
              <div className="dialog__gallery">
                {project.gallery.map((img) => (
                  <figure key={img.src}>
                    <Image src={img.src} width={img.width} height={img.height} alt={img.alt} sizes="(max-width: 900px) 100vw, 540px" />
                    <figcaption>{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </motion.article>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
