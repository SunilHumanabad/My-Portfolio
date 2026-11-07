'use client';

import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { useMotionPref } from './Providers';

/** Gently pulls its child toward the pointer. Fine pointers only; purely decorative. */
export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null);
  const { enabled } = useMotionPref();
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const x = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 260, damping: 18, mass: 0.5 });
  const active = enabled && fine;

  const onMove = (e) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className}`}
      style={active ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
