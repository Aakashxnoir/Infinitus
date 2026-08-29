import { getEvents } from '@/lib/events';
import { COPY } from '@/lib/site';
import EventCard from '@/components/ui/EventCard';
import Reveal from '@/components/ui/Reveal';

export default async function UpcomingEvents() {
  const events = await getEvents('upcoming');

  return (
    <div className="mt-16">
      <Reveal>
        <h3 className="font-heading text-xl font-semibold text-brand-ink">
          {COPY.events.upcomingHeading}
        </h3>
      </Reveal>

      {events.length === 0 ? (
        <p className="mt-4 text-sm text-brand-ink/50">{COPY.events.upcomingEmpty}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={Math.min(i * 0.05, 0.3)}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
