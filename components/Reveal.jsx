'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/utils';
import { useMotionPref } from './Providers';

const TAGS = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  article: motion.article,
  header: motion.header,
};

/**
 * Fades content up as it scrolls into view. With motion off it appears instantly.
 * Without JavaScript a <noscript> rule in the layout keeps it visible.
 */
export default function Reveal({ as = 'div', delay = 0, y = 32, children, ...rest }) {
  const { enabled } = useMotionPref();
  const Tag = TAGS[as] || motion.div;
  return (
    <Tag
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={enabled ? { duration: 0.75, ease: EASE, delay } : { duration: 0 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
