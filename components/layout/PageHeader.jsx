'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '@/components/ui/SplitText';
import { EASE, introDelay } from '@/lib/motion';

/**
 * Opening band for inner pages: breadcrumb, a headline that rises in word by word, an intro,
 * and the page's § number drifting behind it as you scroll away.
 */
export default function PageHeader({ index, label, title, intro, children }) {
  const ref = useRef(null);
  const [start] = useState(introDelay);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const numeralY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <header ref={ref} className="relative overflow-hidden border-b border-fg/15 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div aria-hidden="true" className="graph-paper pointer-events-none absolute inset-0" />
      <motion.span
        aria-hidden="true"
        style={{ y: numeralY }}
        className="pointer-events-none absolute -right-4 top-10 select-none font-heading text-[42vw] font-semibold leading-none text-fg/[0.04] sm:text-[30vw]"
      >
        {index}
      </motion.span>

      <motion.div style={{ opacity: contentOpacity }} className="container-x relative">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: start, ease: EASE.out }}
          className="flex items-center gap-2 font-mono text-sm text-muted"
        >
          <Link href="/" className="transition-colors hover:text-fg">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-accent">
            §{index} {label}
          </span>
        </motion.nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <SplitText
            as="h1"
            text={title}
            className="font-heading text-[clamp(2.75rem,7vw,7.5rem)] font-medium leading-[1] tracking-[-0.02em] text-fg"
          />
          {(intro || children) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: start + 0.35, ease: EASE.out }}
              className="max-w-xl"
            >
              {intro && <p className="lede">{intro}</p>}
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </header>
  );
}
