'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

const DRAW = 1.8;
const inView = { once: true, margin: '0px 0px -15% 0px' };

/**
 * Timeline whose rule draws itself when it comes into view — across the top on wide screens,
 * down the side on narrow ones — with each year landing as the line reaches it.
 */
export default function Journey({ heading, steps }) {
  const at = (i) => 0.2 + (DRAW * i) / steps.length;

  return (
    <section className="section border-t border-fg/15 bg-bg-2/50">
      <div className="container-x">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE.out }}
          className="font-heading text-2xl font-semibold text-fg sm:text-4xl"
        >
          {heading}
        </motion.h2>

        <div className="relative mt-14">
          {/* Track + drawn line: vertical below lg, horizontal from lg */}
          <div aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-px bg-fg/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto" />
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={inView}
            transition={{ duration: DRAW, delay: 0.2, ease: EASE.inOut }}
            className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent lg:hidden"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: DRAW, delay: 0.2, ease: EASE.inOut }}
            className="absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-accent lg:block"
          />

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-10">
            {steps.map((step, i) => (
              <motion.li
                key={step.year}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.8, delay: at(i), ease: EASE.out }}
                className="relative pl-10 lg:pl-0 lg:pt-12"
              >
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={inView}
                  transition={{ type: 'spring', stiffness: 400, damping: 18, delay: at(i) }}
                  className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg lg:top-0"
                />
                <p className="font-heading text-6xl font-medium leading-none text-fg/90 xl:text-7xl">{step.year}</p>
                <p className="mt-5 font-heading text-xl font-semibold text-fg">{step.title}</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
