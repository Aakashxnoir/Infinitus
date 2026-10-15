'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EventCard from '@/components/ui/EventCard';
import { COPY } from '@/lib/site';
import { eventYear } from '@/lib/format';

const INITIAL_COUNT = 8;

/** Past events with year filter tabs and a show-more toggle. */
export default function EventsBrowser({ events }) {
  const [year, setYear] = useState('All');
  const [expanded, setExpanded] = useState(false);

  const years = useMemo(
    () => ['All', ...[...new Set(events.map((e) => eventYear(e.eventDate)).filter(Boolean))].sort((a, b) => b - a)],
    [events]
  );

  const filtered = year === 'All' ? events : events.filter((e) => eventYear(e.eventDate) === year);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <div>
      <div role="tablist" aria-label="Filter events by year" className="flex flex-wrap gap-x-6 gap-y-2 border-b border-fg/15">
        {years.map((y) => {
          const active = y === year;
          return (
            <button
              key={y}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setYear(y)}
              className={`relative py-2 font-mono text-sm transition-colors ${
                active ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {y}
              {active && (
                <motion.span
                  layoutId="year-tab"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setExpanded((v) => !v)} className="btn-ghost">
            {expanded ? COPY.events.showLess : `${COPY.events.showAll} (${filtered.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
