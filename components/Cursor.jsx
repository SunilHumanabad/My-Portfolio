'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/lib/useMediaQuery';

const INTERACTIVE = 'a, button, [role="switch"], label, summary, [data-cursor]';
const TEXT = 'input, textarea, select, [contenteditable="true"]';

/**
 * Custom cursor: an accent dot that tracks the pointer exactly, plus a ring
 * that trails behind it. The ring grows over links and buttons, and turns into
 * a filled "View" badge over elements with data-cursor="view".
 * Mouse/trackpad only, and only while animations are on.
 */
export default function Cursor({ enabled }) {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const active = enabled && fine;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });
  const [state, setState] = useState({ mode: 'default', label: '', visible: false, down: false });

  useEffect(() => {
    if (!active) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    // Only re-render when something visible actually changes.
    const update = (patch) =>
      setState((prev) => {
        for (const key in patch) if (prev[key] !== patch[key]) return { ...prev, ...patch };
        return prev;
      });

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target instanceof Element ? e.target : null;
      let mode = 'default';
      let label = '';
      if (el?.closest(TEXT)) {
        mode = 'text';
      } else {
        const hit = el?.closest(INTERACTIVE);
        if (hit) {
          mode = hit.dataset.cursor || 'link';
          label = hit.dataset.cursorLabel || '';
        }
      }
      update({ mode, label, visible: true });
    };
    const onLeave = () => update({ visible: false });
    const onDown = () => update({ down: true });
    const onUp = () => update({ down: false });

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('blur', onLeave);
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('blur', onLeave);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [active, x, y]);

  if (!active) return null;

  const cls = `is-${state.mode}${state.visible ? '' : ' is-hidden'}${state.down ? ' is-down' : ''}`;
  return (
    <>
      <motion.div className={`cursor-ring ${cls}`} style={{ x: ringX, y: ringY }} aria-hidden="true">
        <span className="cursor-ring__label">{state.label}</span>
      </motion.div>
      <motion.div className={`cursor-dot ${cls}`} style={{ x, y }} aria-hidden="true" />
    </>
  );
}
