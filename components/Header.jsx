'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import { site } from '@/config/site';
import { useMotionPref } from './Providers';

const L = site.labels;

function Wordmark() {
  const w = site.identity.wordmark;
  return (
    <a href="#top" className="wordmark" aria-label={`${site.identity.fullName}, back to top`}>
      <span className="wordmark__initial">{w.charAt(0)}</span>
      {w.slice(1)}
    </a>
  );
}

export default function Header({ nav }) {
  const { enabled, setEnabled, playSwarm } = useMotionPref();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const wasOpen = useRef(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    const top = document.getElementById('top');
    const topIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(''), {
      rootMargin: '0px 0px -60% 0px',
    });
    if (top) topIo.observe(top);
    return () => {
      io.disconnect();
      topIo.disconnect();
    };
  }, [nav]);

  // Mobile menu: lock scroll, make the page inert, Escape closes, restore focus.
  useEffect(() => {
    const root = document.documentElement;
    const outside = [document.getElementById('main'), document.querySelector('.site-footer')].filter(Boolean);
    if (open) {
      wasOpen.current = true;
      root.classList.add('menu-open');
      outside.forEach((el) => el.setAttribute('inert', ''));
      menuRef.current?.querySelector('a')?.focus();
      const onKey = (e) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('keydown', onKey);
        root.classList.remove('menu-open');
        outside.forEach((el) => el.removeAttribute('inert'));
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
    return undefined;
  }, [open]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const links = (desktop, onClick) =>
    nav.map((n) => (
      <li key={n.id}>
        <a href={`#${n.id}`} onClick={onClick} aria-current={active === n.id ? 'true' : undefined}>
          {n.label}
          {desktop && active === n.id ? (
            <motion.span layoutId="nav-indicator" className="nav__indicator" aria-hidden="true" />
          ) : null}
        </a>
      </li>
    ));

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="site-header__bar container">
        <Wordmark />

        <nav className="nav" aria-label="Primary">
          <ul>{links(true)}</ul>
        </nav>

        <div className="site-header__actions">
          <div className="motion-ctl" role="group" aria-label={L.motion}>
            <button type="button" className="motion-ctl__play" onClick={playSwarm} title={L.motionPlay}>
              <Sparkles size={15} aria-hidden="true" />
              <span className="motion-ctl__label">{L.motion}</span>
              <span className="sr-only">: {L.motionPlay}</span>
            </button>
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              className="motion-ctl__switch"
              onClick={() => setEnabled(!enabled)}
              title={`${L.motionToggle}: ${enabled ? 'on' : 'off'}`}
            >
              <span className="sr-only">{L.motionToggle}</span>
              <span className="motion-ctl__track" aria-hidden="true">
                <span className="motion-ctl__knob" />
              </span>
            </button>
          </div>

          <a href="#contact" className="btn btn--primary btn--sm site-header__cta">
            {L.talk}
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="sr-only">{open ? L.menuClose : L.menuOpen}</span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>{links(false, () => setOpen(false))}</ul>
        </nav>
        <div className="mobile-menu__foot">
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          {site.identity.resume ? (
            <a href={site.identity.resume} target="_blank" rel="noopener noreferrer">
              {L.resume} ↗
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
