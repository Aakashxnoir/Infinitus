'use client';

import { motion } from 'framer-motion';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventCard({ event }) {
  const isUpcoming = event.status === 'upcoming';
  const formUrl = event.registrationFormUrl || event.externalLink;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="interactive-card flex h-full flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
            isUpcoming
              ? 'bg-brand-amber/15 text-brand-amber'
              : 'bg-brand-navy/10 text-brand-navy dark:bg-brand-white/10 dark:text-brand-white'
          }`}
        >
          {isUpcoming ? 'Upcoming' : 'Past'}
        </span>
        {event.eventType && (
          <span className="text-xs font-medium uppercase tracking-wide text-brand-ink/40 dark:text-brand-white/40">
            {event.eventType}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-heading text-lg font-semibold text-brand-navy dark:text-brand-white">
        {event.title}
      </h3>

      <p className="mt-1 text-sm text-brand-ink/50 dark:text-brand-white/50">
        {formatDate(event.eventDate)}
        {event.venue ? ` · ${event.venue}` : ''}
      </p>

      {event.description && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-ink/70 dark:text-brand-white/70">
          {event.description}
        </p>
      )}

      {formUrl ? (
        <a
          href={formUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="interactive-btn mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-4 py-2.5 text-sm font-semibold text-brand-white hover:bg-brand-navyMid dark:bg-brand-white dark:text-brand-navy dark:hover:bg-brand-sky"
        >
          {isUpcoming ? 'View details & register' : 'Open form'}
          <span aria-hidden="true">→</span>
        </a>
      ) : isUpcoming ? (
        <p className="mt-4 text-xs font-medium text-brand-ink/40 dark:text-brand-white/40">
          Registration form will be posted here soon.
        </p>
      ) : null}
    </motion.div>
  );
}
