'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

export default function Reveal({ children, className, delay = 0, y = 24, as = 'div' }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // Trigger as soon as any part enters (minus a small bottom margin) so tall blocks never stay blank
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE.out }}
    >
      {children}
    </Component>
  );
}

/** A list whose items rise in one after another once the list scrolls into view. */
export function Stagger({ children, className, as = 'div', stagger = 0.08 }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = 'div', y = 28 }) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.out } },
      }}
    >
      {children}
    </Component>
  );
}

/** Uncovers its content like a print being pulled up from below. */
export function ClipReveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 1.1, delay, ease: EASE.inOut }}
    >
      {children}
    </motion.div>
  );
}
