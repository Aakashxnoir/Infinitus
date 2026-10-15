'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CLUB_SHORT, COPY } from '@/lib/site';
import { EASE, introDelay } from '@/lib/motion';
import RitLogo from '@/components/brand/RitLogo';
import Lemniscate from '@/components/ui/Lemniscate';
import SplitText from '@/components/ui/SplitText';
import Counter from '@/components/ui/Counter';

export default function Hero({ stats = [] }) {
  const ref = useRef(null);
  const [start] = useState(introDelay);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const figureY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const figureRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);

  const rise = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: start + delay, ease: EASE.out },
  });

  return (
    <section ref={ref} className="relative overflow-hidden pb-10 pt-28 sm:pt-32">
      <div aria-hidden="true" className="graph-paper pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        <motion.div {...rise(0)} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <RitLogo size="xs" />
          <span aria-hidden="true" className="h-4 w-px bg-fg/20" />
          <span>{COPY.hero.badge}</span>
        </motion.div>

        <motion.div style={{ y: titleY }}>
          <SplitText
            as="h1"
            text={CLUB_SHORT}
            by="char"
            stagger={0.05}
            delay={0.1}
            className="mt-6 block whitespace-nowrap font-heading text-[clamp(3.25rem,17.6vw,26rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-fg"
          />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: start + 0.5, ease: EASE.inOut }}
          className="mt-8 h-px origin-left bg-fg/20"
        />

        <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-20">
          <div>
            <motion.p {...rise(0.6)} className="font-heading text-2xl italic text-fg sm:text-4xl">
              {COPY.hero.tagline}.
            </motion.p>
            <motion.p {...rise(0.7)} className="lede mt-5 max-w-lg">
              {COPY.hero.support}
            </motion.p>
            <motion.div {...rise(0.8)} className="mt-8 flex flex-wrap gap-3">
              <Link href="/events" className="btn-primary">
                {COPY.hero.primaryCta} <span aria-hidden="true" className="nudge">→</span>
              </Link>
              <Link href="/team" className="btn-ghost">
                {COPY.hero.secondaryCta}
              </Link>
            </motion.div>
          </div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: start + 0.4, ease: EASE.out }}
            style={{ y: figureY, rotate: figureRotate }}
          >
            <Lemniscate axes dot draw drawDelay={start + 0.5} className="w-full" />
            <figcaption className="mt-4 text-sm leading-relaxed text-muted">
              <span className="font-medium text-fg">Fig. 1.</span> The lemniscate of Bernoulli,{' '}
              <span className="font-serif italic">(x² + y²)² = a²(x² − y²)</span> — the curve behind our name.
            </figcaption>
          </motion.figure>
        </div>

        {stats.length > 0 && (
          <motion.dl {...rise(1)} className="mt-16 grid grid-cols-3 border-y border-fg/15">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col-reverse py-6 ${i ? 'border-l border-fg/15 pl-4 sm:pl-8' : ''}`}>
                <dt className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</dt>
                <dd className="font-heading text-4xl font-medium text-fg sm:text-6xl lg:text-7xl">
                  <Counter value={stat.value} />
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}
