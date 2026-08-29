import EventsConducted from '@/components/sections/EventsConducted';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import Reveal from '@/components/ui/Reveal';
import { COPY } from '@/lib/site';

export const revalidate = 60;

export default function EventsSection() {
  return (
    <section id="events" className="scroll-mt-24 px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-brand-indigo/70">
            {COPY.events.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-ink sm:text-4xl">
            {COPY.events.heading}
          </h2>
        </Reveal>

        <div className="mt-12">
          <EventsConducted />
          <UpcomingEvents />
        </div>
      </div>
    </section>
  );
}
