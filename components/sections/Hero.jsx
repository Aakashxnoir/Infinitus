'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CLUB_NAME, COPY, sectionHref } from '@/lib/site';
import { IMAGES } from '@/lib/branding';
import InfinitusLogo from '@/components/brand/InfinitusLogo';
import RitLogo from '@/components/brand/RitLogo';
import { useTheme } from '@/components/ui/ThemeProvider';

function BrandDivider() {
  return <span aria-hidden="true" className="brand-divider mx-2 h-10 sm:mx-3 sm:h-12 md:mx-4 md:h-14" />;
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();
  const initial = (y) => (prefersReducedMotion ? false : { opacity: 0, y });

  return (
    <section
      id="home"
      className="section-shell relative flex min-h-[100dvh] scroll-mt-20 items-center justify-center px-4 pb-14 pt-[4.5rem] sm:px-6 sm:pb-16 sm:pt-20 md:px-8"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className={`hero-bg-pan absolute inset-0 bg-cover bg-center ${
            isDark ? 'opacity-20' : 'opacity-40'
          }`}
          style={{ backgroundImage: `url('${IMAGES.heroBackground}')` }}
        />
        {isDark ? (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(0,43,96,0.45) 0%, rgba(10,39,79,0.88) 55%, rgba(10,39,79,1) 100%)',
            }}
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(234,244,255,0.92) 0%, rgba(234,244,255,0.6) 45%, rgba(234,244,255,0.18) 75%, rgba(234,244,255,0) 100%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-brand-sky sm:h-40" />
          </>
        )}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center md:max-w-2xl">
        {/* Single brand lockup — club + college together (no duplicate RIT below) */}
        <motion.h1
          initial={initial(16)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="flex items-center justify-center"
        >
          <InfinitusLogo size="hero" priority interactive />
          <BrandDivider />
          <RitLogo size="hero" interactive className="shrink-0" />
          <span className="sr-only">{CLUB_NAME}</span>
        </motion.h1>

        <motion.p
          initial={initial(14)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="mt-4 max-w-[20rem] font-heading text-lg font-semibold leading-snug text-black dark:text-white sm:mt-5 sm:max-w-md sm:text-xl md:mt-6 md:max-w-lg md:text-2xl"
        >
          {COPY.hero.tagline}
        </motion.p>

        <motion.p
          initial={initial(14)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-2 max-w-[19rem] text-sm leading-relaxed text-black/70 dark:text-white/75 sm:mt-3 sm:max-w-md sm:text-[0.95rem] sm:leading-7 md:max-w-lg md:text-base"
        >
          {COPY.hero.support}
        </motion.p>

        <motion.a
          href={sectionHref('members')}
          initial={initial(12)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="interactive-btn cta-solid mt-5 inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold sm:mt-6"
        >
          {COPY.hero.cta}
        </motion.a>
      </div>

      <motion.div
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{
          opacity: 1,
          y: prefersReducedMotion ? 0 : [0, 6, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.55 },
          y: {
            duration: 1.6,
            delay: 0.55,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: 'easeInOut',
          },
        }}
        className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-black/40 dark:text-white/45 landscape:hidden"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.75">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
