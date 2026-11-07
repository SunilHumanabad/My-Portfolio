'use client';

import { useCallback, useDeferredValue, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Search } from 'lucide-react';
import { site } from '@/config/site';
import { featuredProjects, projectCategories, projectsByYear, recentClients } from '@/data/projects';
import { external, pad } from '@/lib/utils';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { GithubIcon } from './Icons';
import ProjectCover from './ProjectCover';
import ProjectDialog from './ProjectDialog';
import { useMotionPref } from './Providers';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import SiteFrame from './SiteFrame';

const L = site.labels;
const PAGE_SIZE = 10;

const matches = (p, q) =>
  !q ||
  [p.title, p.category, p.summary, p.client, ...(p.tools || [])].some((field) => field?.toLowerCase().includes(q));

const metaOf = (p) =>
  [p.category, p.year, p.role && p.role.toLowerCase() !== p.category.toLowerCase() ? p.role : '']
    .filter(Boolean)
    .join(' · ');

function ArchiveThumb({ project }) {
  if (project.cover?.src) {
    return <Image src={project.cover.src} width={project.cover.width} height={project.cover.height} alt="" sizes="96px" />;
  }
  return <span className="arow__mark">{project.title.charAt(0)}</span>;
}

export default function WorkSection({ showArchive = true }) {
  const { enabled } = useMotionPref();
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  // ── Dialog state ──────────────────────────────────────────
  const [openId, setOpenId] = useState(null);
  const [list, setList] = useState(projectsByYear);
  const returnFocus = useRef(null);

  const openProject = (id, fromList, el) => {
    returnFocus.current = el;
    setList(fromList);
    setOpenId(id);
  };
  const close = useCallback(() => setOpenId(null), []);
  const step = useCallback(
    (dir) =>
      setOpenId((id) => {
        const i = list.findIndex((p) => p.id === id);
        return list[(i + dir + list.length) % list.length].id;
      }),
    [list],
  );
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);
  const currentIndex = list.findIndex((p) => p.id === openId);
  const current = currentIndex >= 0 ? list[currentIndex] : null;

  // ── Archive filters ───────────────────────────────────────
  const [category, setCategory] = useState(L.archiveAll);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(
    () =>
      projectsByYear.filter((p) => (category === L.archiveAll || p.category === category) && matches(p, deferredQuery)),
    [category, deferredQuery],
  );
  const counts = useMemo(() => {
    const c = { [L.archiveAll]: projectsByYear.length };
    projectsByYear.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1;
    });
    return c;
  }, []);
  const clearFilters = () => {
    setCategory(L.archiveAll);
    setQuery('');
    setVisible(PAGE_SIZE);
  };

  // ── Cursor-following preview (fine pointers, motion on) ───
  const [hoverId, setHoverId] = useState(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 320, damping: 32, mass: 0.5 });
  const py = useSpring(my, { stiffness: 320, damping: 32, mass: 0.5 });
  const showPreview = enabled && finePointer && !current;
  const hovered = showPreview ? projectsByYear.find((p) => p.id === hoverId) : null;

  const onListMove = (e) => {
    mx.set(e.clientX > window.innerWidth - 420 ? e.clientX - 396 : e.clientX);
    my.set(e.clientY);
  };

  if (!projectsByYear.length) {
    return (
      <section id="work" className="section work" aria-labelledby="work-title">
        <div className="container">
          <SectionHead id="work" title={L.workTitle} note={L.workNote} />
          <p className="empty">{L.noProjects}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work" title={L.workTitle} note={L.workNote} count={pad(projectsByYear.length)} />

        {recentClients.length ? (
          <Reveal className="clients">
            <p className="clients__label">{L.recentClients}</p>
            <ul className="clients__list">
              {recentClients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {featuredProjects.length ? (
          <ol className="cases">
            {featuredProjects.map((p, i) => (
              <Reveal as="li" key={p.id} className={`case${i % 2 ? ' case--flip' : ''}`}>
                {/* Mouse convenience — the "View project" button is the accessible control. */}
                <div
                  className="case__media"
                  data-cursor="view"
                  data-cursor-label="View"
                  onClick={(e) =>
                    openProject(p.id, featuredProjects, e.currentTarget.parentElement.querySelector('.case__actions button'))
                  }
                >
                  <SiteFrame project={p} />
                </div>
                <div className="case__info">
                  <h3 className="case__title">{p.title}</h3>
                  <p className="meta-line">{metaOf(p)}</p>
                  <p className="case__summary">{p.summary}</p>
                  {p.highlights?.length ? (
                    <ul className="case__points">
                      {p.highlights.slice(0, 3).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="case__actions">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      aria-haspopup="dialog"
                      onClick={(e) => openProject(p.id, featuredProjects, e.currentTarget)}
                    >
                      {L.viewProject}
                      <span className="sr-only">: {p.title}</span>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </button>
                    {p.liveUrl ? (
                      <a className="link-arrow" href={p.liveUrl} {...external}>
                        {L.liveSite} <ArrowUpRight size={15} aria-hidden="true" />
                        <span className="sr-only"> for {p.title} (opens in a new tab)</span>
                      </a>
                    ) : null}
                    {p.sourceUrl ? (
                      <a className="link-arrow" href={p.sourceUrl} {...external}>
                        <GithubIcon size={15} /> {L.sourceCode}
                        <span className="sr-only"> for {p.title} (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        ) : null}

        {showArchive ? (
          <div className="archive" id="archive">
            <Reveal className="archive__head">
              <h3 className="archive__title" id="archive-title">
                {L.archiveTitle}
              </h3>
              <div className="archive__tools">
                {projectCategories.length > 1 ? (
                  <div className="filters" role="group" aria-label="Filter projects by category">
                    {[L.archiveAll, ...projectCategories].map((c) => (
                      <button
                        key={c}
                        type="button"
                        className="filter"
                        aria-pressed={category === c}
                        onClick={() => {
                          setCategory(c);
                          setVisible(PAGE_SIZE);
                        }}
                      >
                        {c}
                        <span className="filter__n" aria-hidden="true">
                          {counts[c]}
                        </span>
                        {category === c ? (
                          <motion.span layoutId="filter-line" className="filter__line" aria-hidden="true" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
                <label className="search">
                  <Search size={17} aria-hidden="true" />
                  <span className="sr-only">{L.searchLabel}</span>
                  <input
                    type="search"
                    value={query}
                    placeholder={L.searchPlaceholder}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setVisible(PAGE_SIZE);
                    }}
                  />
                </label>
              </div>
            </Reveal>

            <p className="sr-only" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} shown
            </p>

            {filtered.length ? (
              <ul
                className="archive__list"
                aria-labelledby="archive-title"
                onPointerMove={onListMove}
                onPointerLeave={() => setHoverId(null)}
              >
                {filtered.slice(0, visible).map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className="arow"
                      aria-haspopup="dialog"
                      onClick={(e) => openProject(p.id, filtered, e.currentTarget)}
                      onPointerEnter={() => setHoverId(p.id)}
                    >
                      <span className="arow__year">{p.year}</span>
                      <span className="arow__thumb" aria-hidden="true">
                        <ArchiveThumb project={p} />
                      </span>
                      <span className="arow__title">
                        {p.title}
                        {p.publication ? <span className="arow__badge">IEEE paper</span> : null}
                      </span>
                      <span className="arow__cat">{p.category}</span>
                      <span className="arow__tools">{(p.client || p.tools.slice(0, 3).join(' · ')) || '—'}</span>
                      <ArrowUpRight className="arow__icon" size={20} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty">
                <p>{L.noResults}</p>
                <button type="button" className="btn btn--ghost btn--sm" onClick={clearFilters}>
                  {L.clearFilters}
                </button>
              </div>
            )}

            {filtered.length > visible ? (
              <div className="load-more">
                <button type="button" className="btn btn--ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  {L.loadMore} <span className="muted">({filtered.length - visible})</span>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {hovered ? (
          <motion.div
            key="preview"
            className="preview"
            style={{ x: px, y: py }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            <ProjectCover project={hovered} sizes="340px" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {current ? (
          <ProjectDialog
            key="project-dialog"
            project={current}
            index={currentIndex}
            total={list.length}
            onClose={close}
            onPrev={prev}
            onNext={next}
            returnFocus={returnFocus}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
