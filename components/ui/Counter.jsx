'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/** A number that counts up from zero the first time it scrolls into view. */
export default function Counter({ value, duration = 1.6, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return undefined;
    if (reduce) {
      ref.current.textContent = String(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE.out,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  // Server-render the real value so the number is right without JS
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
