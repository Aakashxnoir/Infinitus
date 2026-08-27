function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventCard({ event }) {
  const isUpcoming = event.status === 'upcoming';

  return (
    <div className="flex h-full flex-col rounded-2xl border border-brand-skyDeep/60 bg-white/70 p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
            isUpcoming ? 'bg-brand-amber/15 text-brand-amber' : 'bg-brand-indigo/10 text-brand-indigo'
          }`}
        >
          {isUpcoming ? 'Upcoming' : 'Past'}
        </span>
        {event.eventType && (
          <span className="text-xs font-medium uppercase tracking-wide text-brand-ink/40">
            {event.eventType}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-heading text-lg font-semibold text-brand-ink">{event.title}</h3>

      <p className="mt-1 text-sm text-brand-ink/50">
        {formatDate(event.eventDate)}
        {event.venue ? ` · ${event.venue}` : ''}
      </p>

      {event.description && (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-ink/70">{event.description}</p>
      )}

      {event.externalLink && (
        <a
          href={event.externalLink}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-indigo hover:text-brand-indigoDeep"
        >
          Learn more →
        </a>
      )}
    </div>
  );
}
