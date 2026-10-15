/** Shared easing curves. `out` settles softly; `inOut` is for wipes and curtains. */
export const EASE = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.76, 0, 0.24, 1],
};

// The intro sheet (components/layout/Loader.jsx) lifts ~2s after navigation start.
const INTRO_END = 1.9;

/**
 * Seconds to hold entrance animations so they play once the intro has lifted, instead of
 * underneath it. 0 on the server, on repeat visits, for reduced motion, and after client navigation.
 */
export function introDelay() {
  if (typeof window === 'undefined') return 0;
  const root = document.documentElement;
  if (root.classList.contains('intro-seen') || matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
  return Math.max(0, INTRO_END - performance.now() / 1000);
}
