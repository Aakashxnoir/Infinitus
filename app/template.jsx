'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * Re-mounts on every route change: a curtain wipes up off the new page while its content rises in.
 * The curtain is a transform, so visitors who prefer reduced motion get the plain fade only.
 */
export default function Template({ children }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: EASE.inOut }}
      />
      <motion.main
        id="main"
        className="relative"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: EASE.out }}
      >
        {children}
      </motion.main>
    </>
  );
}
