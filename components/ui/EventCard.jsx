import Image from 'next/image';
import Link from 'next/link';
import { COPY } from '@/lib/site';
import { eventHref, formatEventDate } from '@/lib/format';

export { eventHref };

export function ExternalArrow() {
  return (
    <span aria-hidden="true" className="nudge nudge-ne">
      ↗
    </span>
  );
}

export function EventPoster({ event, sizes, priority = false, className = '' }) {
  if (!event.coverImageUrl) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span aria-hidden="true" className="font-serif text-7xl text-accent/60">∞</span>
      </div>
    );
  }

  return (
    <Image
      src={event.coverImageUrl}
      alt={`${event.title} poster`}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={event.coverImageUrl.startsWith('http')}
      className={`object-cover ${className}`}
    />
  );
}

/** Poster card. The title links to the event page and stretches over the whole card. */
export default function EventCard({ event }) {
  const isUpcoming = event.status === 'upcoming';

  return (
    <article className="card card-hover group relative flex h-full flex-col transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgb(var(--fg)/0.35)]">
      <div className="relative aspect-[4/5] overflow-hidden border-b border-fg/15 bg-bg-2">
        <EventPoster
          event={event}
          sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="chip absolute left-3 top-3 bg-bg text-fg">
          {formatEventDate(event.eventDate, event.endDate)}
        </span>
        {isUpcoming && (
          <span className="chip absolute right-3 top-3 border-gold/40 bg-bg text-gold">
            Upcoming
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-bg text-fg opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        >
          →
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {event.eventType && (
          <p className="font-mono text-xs text-accent">{event.eventType}</p>
        )}
        <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-fg">
          <Link
            href={eventHref(event)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-md focus-visible:after:ring-2 focus-visible:after:ring-accent"
          >
            {event.title}
          </Link>
        </h3>
        {event.venue && <p className="mt-1 text-xs text-muted">{event.venue}</p>}
        {event.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{event.description}</p>
        )}

        <div className="relative z-10 mt-auto pt-5">
          {isUpcoming && event.registrationFormUrl ? (
            <a href={event.registrationFormUrl} target="_blank" rel="noreferrer noopener" className="btn-primary w-full">
              {COPY.events.registerCta} <ExternalArrow />
            </a>
          ) : event.externalLink ? (
            <a
              href={event.externalLink}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-sm font-medium text-fg/80 transition-colors hover:text-accent"
            >
              {COPY.events.viewPost} <ExternalArrow />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
