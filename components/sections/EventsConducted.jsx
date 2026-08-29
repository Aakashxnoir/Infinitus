import { getEvents } from '@/lib/events';
import { COPY } from '@/lib/site';
import EventCard from '@/components/ui/EventCard';
import Reveal from '@/components/ui/Reveal';

export default async function EventsConducted() {
  const events = await getEvents('conducted');

  return (
    <div>
      <Reveal>
        <h3 className="page-subheading">
          {COPY.events.conductedHeading}
        </h3>
      </Reveal>

      {events.length === 0 ? (
        <div className="interactive-card mt-4 px-5 py-4 text-sm text-black/65 dark:text-white/65">
          {COPY.events.conductedEmpty}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
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
