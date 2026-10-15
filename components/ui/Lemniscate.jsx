'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

// Lemniscate of Bernoulli, (x² + y²)² = a²(x² − y²), plotted with a = 100.
const A = 100;
const PATH = Array.from({ length: 241 }, (_, i) => {
  const t = (i / 240) * Math.PI * 2;
  const s = Math.sin(t);
  const c = Math.cos(t);
  const d = 1 + s * s;
  return `${i ? 'L' : 'M'}${((A * c) / d).toFixed(2)} ${((A * s * c) / d).toFixed(2)}`;
}).join('');

/**
 * The ∞ curve as a textbook figure. `axes` adds labelled axes, `dot` traces the curve,
 * `draw` sketches the curve in (after `drawDelay` seconds) when it mounts.
 */
export default function Lemniscate({ axes = false, dot = false, draw = false, drawDelay = 0, className = '' }) {
  return (
    <svg viewBox="-120 -50 240 100" fill="none" aria-hidden="true" className={className}>
      {axes && (
        <g className="stroke-fg/30" strokeWidth="0.5">
          <path d="M-116 0H116M0 -46V46" />
          {[-A, -A / 2, A / 2, A].map((x) => (
            <path key={x} d={`M${x} -2V2`} />
          ))}
        </g>
      )}
      {axes && (
        <g className="fill-muted font-serif italic" fontSize="8">
          <text x="112" y="-4">x</text>
          <text x="4" y="-41">y</text>
          <text x={A + 3} y="12">a</text>
          <text x={-A - 3} y="12" textAnchor="end">−a</text>
        </g>
      )}
      {draw ? (
        <motion.path
          d={PATH}
          className="stroke-accent"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: drawDelay, ease: EASE.inOut }}
        />
      ) : (
        <path d={PATH} pathLength="1" className="stroke-accent" strokeWidth="1.5" strokeLinejoin="round" />
      )}
      {dot && (
        <circle r="2.5" className="fill-fg motion-reduce:hidden">
          <animateMotion dur="9s" repeatCount="indefinite" path={PATH} />
        </circle>
      )}
    </svg>
  );
}
