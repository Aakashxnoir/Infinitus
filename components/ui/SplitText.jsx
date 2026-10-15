'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EASE, introDelay } from '@/lib/motion';

const container = (stagger, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const piece = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE.out } },
};

/**
 * Text that rises into place from below a mask, one word (or letter) at a time.
 * `onView` waits until it scrolls into view; otherwise it plays on mount, after the intro.
 * Screen readers get the plain text once; the animated pieces are hidden from them.
 */
export default function SplitText({
  text,
  as = 'span',
  by = 'word',
  className = '',
  pieceClassName = '',
  stagger,
  delay = 0,
  onView = false,
}) {
  const [start] = useState(() => delay + (onView ? 0 : introDelay()));
  const Component = motion[as] ?? motion.span;
  const pieces = by === 'char' ? [...text] : text.split(' ');
  const trigger = onView
    ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
    : { animate: 'show' };

  return (
    <Component
      className={className}
      variants={container(stagger ?? (by === 'char' ? 0.045 : 0.06), start)}
      initial="hidden"
      {...trigger}
    >
      <span className="sr-only">{text}</span>
      {pieces.map((p, i) => (
        <span key={i} aria-hidden="true" className="-my-[0.15em] inline-block overflow-hidden py-[0.15em] align-bottom">
          <motion.span variants={piece} className={`inline-block ${pieceClassName}`}>
            {p}
          </motion.span>
          {by === 'word' && i < pieces.length - 1 && ' '}
        </span>
      ))}
    </Component>
  );
}
