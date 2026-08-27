import { getEvents } from '@/lib/events';
import EventCard from './EventCard';
import Reveal from './Reveal';

export default async function EventsConducted() {
  const events = await getEvents('conducted');

  return (
    <div>
      <Reveal>
        <h3 className="font-heading text-xl font-semibold text-brand-ink">Events Conducted</h3>
      </Reveal>

      {events.length === 0 ? (
        <p className="mt-4 text-sm text-brand-ink/50">No past events recorded yet.</p>
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
