'use client';

import { motion, useReducedMotion } from 'framer-motion';
import CloudBackground from './CloudBackground';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const initial = (y) => (prefersReducedMotion ? false : { opacity: 0, y });

  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-24 items-center justify-center overflow-hidden bg-brand-sky pt-16"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className="hero-bg-pan absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/assets/hero-blackboard.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(234,244,255,0.92) 0%, rgba(234,244,255,0.6) 45%, rgba(234,244,255,0.18) 75%, rgba(234,244,255,0) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-sky" />
      </div>

      <CloudBackground />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.p
          initial={initial(16)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-sm uppercase tracking-[0.3em] text-brand-indigo/70"
        >
          Math Club
        </motion.p>

        <motion.h1
          initial={initial(20)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-4 font-heading text-4xl font-semibold text-brand-ink sm:text-6xl"
        >
          <span className="text-brand-amber">∞</span> INFINITUS
        </motion.h1>

        <motion.p
          initial={initial(20)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 text-base text-brand-ink/70 sm:text-lg"
        >
          Where curiosity meets calculation — a college math club for anyone
          who wants to explore, compete, and build with numbers.
        </motion.p>

        <motion.a
          href="#members"
          initial={initial(20)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-indigo px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-indigoDeep"
        >
          Meet the team
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
          y: { duration: 1.8, delay: 0.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-indigo/50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.75">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
