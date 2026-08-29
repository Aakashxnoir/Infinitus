'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CLUB_NAME, COPY, sectionHref } from '@/lib/site';
import { IMAGES } from '@/lib/branding';
import InfinitusLogo from '@/components/brand/InfinitusLogo';
import RitLogo from '@/components/brand/RitLogo';
import { useTheme } from '@/components/ui/ThemeProvider';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();
  const initial = (y) => (prefersReducedMotion ? false : { opacity: 0, y });

  return (
    <section
      id="home"
      className={`section-shell relative flex min-h-screen scroll-mt-24 items-center justify-center pt-16`}
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className={`hero-bg-pan absolute inset-0 bg-cover bg-center ${
            isDark ? 'opacity-20' : 'opacity-40'
          }`}
          style={{ backgroundImage: `url('${IMAGES.heroBackground}')` }}
        />
        {isDark ? (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(0,32,96,0.45) 0%, rgba(0,27,72,0.82) 50%, rgba(0,15,46,0.96) 100%)',
              }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(234,244,255,0.92) 0%, rgba(234,244,255,0.6) 45%, rgba(234,244,255,0.18) 75%, rgba(234,244,255,0) 100%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-sky" />
          </>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.h1
          initial={initial(20)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto flex justify-center"
        >
          <InfinitusLogo size="hero" priority interactive />
          <span className="sr-only">{CLUB_NAME}</span>
        </motion.h1>

        <motion.p
          initial={initial(20)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`mt-4 font-heading text-xl font-semibold sm:text-2xl ${
            isDark ? 'text-brand-white' : 'text-brand-navy'
          }`}
        >
          {COPY.hero.tagline}
        </motion.p>

        <motion.p
          initial={initial(20)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-brand-white/75' : 'text-brand-ink/70'
          }`}
        >
          {COPY.hero.support}
        </motion.p>

        <motion.div
          initial={initial(16)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 flex justify-center"
        >
          <RitLogo size="sm" interactive />
        </motion.div>

        <motion.a
          href={sectionHref('members')}
          initial={initial(20)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className={`interactive-btn mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${
            isDark
              ? 'bg-brand-white text-brand-navy hover:bg-brand-sky'
              : 'bg-brand-navy text-brand-white hover:bg-brand-navyMid'
          }`}
        >
          {COPY.hero.cta}
        </motion.a>
      </div>

      <motion.div
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{
          opacity: 1,
          y: prefersReducedMotion ? 0 : [0, 8, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.8 },
          y: {
            duration: 1.8,
            delay: 0.8,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: 'easeInOut',
          },
        }}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${
          isDark ? 'text-brand-white/50' : 'text-brand-navy/50'
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.75">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
