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
              : 'bg-black/10 text-black dark:bg-white/10 dark:text-white'
          }`}
        >
          {isUpcoming ? 'Upcoming' : 'Past'}
        </span>
        {event.eventType && (
          <span className="text-xs font-medium uppercase tracking-wide text-black/45 dark:text-white/45">
            {event.eventType}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-heading text-lg font-semibold text-black dark:text-white">
        {event.title}
      </h3>

      <p className="mt-1 text-sm text-black/55 dark:text-white/55">
        {formatDate(event.eventDate)}
        {event.venue ? ` · ${event.venue}` : ''}
      </p>

      {event.description && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-black/70 dark:text-white/70">
          {event.description}
        </p>
      )}

      {formUrl ? (
        <a
          href={formUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="interactive-btn cta-solid mt-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
        >
          {isUpcoming ? 'View details & register' : 'Open form'}
          <span aria-hidden="true">→</span>
        </a>
      ) : isUpcoming ? (
        <p className="mt-4 text-xs font-medium text-black/45 dark:text-white/45">
          Registration form will be posted here soon.
        </p>
      ) : null}
    </motion.div>
  );
}
