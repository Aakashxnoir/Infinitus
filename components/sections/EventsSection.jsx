import { COPY, SOCIAL } from '@/lib/site';
import { formatEventDate } from '@/lib/format';
import Reveal from '@/components/ui/Reveal';
import Link from 'next/link';
import EventCard, { EventPoster, ExternalArrow, eventHref } from '@/components/ui/EventCard';
import EventsBrowser from '@/components/ui/EventsBrowser';

export function FeaturedEvent({ event }) {
  return (
    <article className="card group grid overflow-hidden md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)]">
      <Link
        href={eventHref(event)}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[4/5] overflow-hidden border-b border-fg/15 bg-bg-2 md:border-b-0 md:border-r"
      >
        <EventPoster
          event={event}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 40vw, 100vw"
          className="h-full w-full transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
        <div className="flex flex-wrap gap-2">
          <span className="chip border-gold/40 text-gold">{COPY.events.featuredLabel}</span>
          {event.eventType && <span className="chip">{event.eventType}</span>}
        </div>
        <h3 className="mt-6 font-heading text-3xl font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-5xl xl:text-6xl">
          <Link href={eventHref(event)} className="transition-colors hover:text-accent">
            {event.title}
          </Link>
        </h3>
        <p className="mt-4 font-mono text-sm text-accent">
          {formatEventDate(event.eventDate, event.endDate)}
          {event.venue ? ` · ${event.venue}` : ''}
        </p>
        {event.description && <p className="lede mt-5 max-w-2xl">{event.description}</p>}
        {event.highlights?.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {event.highlights.map((h) => (
              <li key={h} className="rounded-sm border border-fg/15 px-3 py-1.5 text-sm text-fg">
                {h}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={eventHref(event)} className="btn-primary">
            {COPY.events.details} <span aria-hidden="true" className="nudge">→</span>
          </Link>
          {event.externalLink && (
            <a href={event.externalLink} target="_blank" rel="noreferrer noopener" className="btn-ghost">
              {COPY.events.viewPost} <ExternalArrow />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function NextEventBanner() {
  return (
    <div className="card flex flex-col items-start justify-between gap-6 border-dashed p-7 sm:flex-row sm:items-center sm:p-8">
      <div>
        <p className="font-heading text-xl font-semibold text-fg">{COPY.events.nextEventTitle}</p>
        <p className="mt-1 max-w-xl text-sm text-muted">{COPY.events.nextEventBody}</p>
      </div>
      <a href={SOCIAL.instagram} target="_blank" rel="noreferrer noopener" className="btn-primary shrink-0">
        Follow {SOCIAL.instagramHandle} <ExternalArrow />
      </a>
    </div>
  );
}

/** Body of the Events page: upcoming, the latest event, then the full archive. */
export default function EventsSection({ events }) {
  const upcoming = events.filter((e) => e.status === 'upcoming');
  const past = events.filter((e) => e.status !== 'upcoming');
  const featured = past.find((e) => e.featured) ?? past[0];
  const rest = past.filter((e) => e !== featured);

  return (
    <section className="section !pt-16">
      <div className="container-x">
        {upcoming.length > 0 && (
          <div className="mb-14">
            <h3 className="font-heading text-xl font-semibold text-fg">{COPY.events.upcomingHeading}</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {upcoming.map((event) => (
                <Reveal key={event.id}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {featured && (
          <Reveal>
            <FeaturedEvent event={featured} />
          </Reveal>
        )}

        {rest.length > 0 && (
          <Reveal className="mt-16">
            <EventsBrowser events={rest} />
          </Reveal>
        )}

        {upcoming.length === 0 && (
          <Reveal className="mt-16">
            <NextEventBanner />
          </Reveal>
        )}
      </div>
    </section>
  );
}
