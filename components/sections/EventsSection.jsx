import EventsConducted from '@/components/sections/EventsConducted';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import Reveal from '@/components/ui/Reveal';
import { COPY } from '@/lib/site';

export const revalidate = 60;

export default function EventsSection() {
  return (
    <section id="events" className="section-shell section-pad scroll-mt-20">
      <div className="section-inner">
        <Reveal className="text-center">
          <p className="page-eyebrow">{COPY.events.eyebrow}</p>
          <h2 className="page-heading mt-3">{COPY.events.heading}</h2>
        </Reveal>

        <div className="mt-12">
          <EventsConducted />
          <UpcomingEvents />
        </div>
      </div>
    </section>
  );
}
