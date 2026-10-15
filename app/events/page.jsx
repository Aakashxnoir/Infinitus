import PageHeader from '@/components/layout/PageHeader';
import EventsSection from '@/components/sections/EventsSection';
import { getEvents } from '@/lib/events';
import { COPY, pageById } from '@/lib/site';

export const revalidate = 60;

export const metadata = {
  title: COPY.pages.events.title,
  description: COPY.pages.events.description,
};

export default async function EventsPage() {
  const events = await getEvents();
  const page = pageById('events');
  return (
    <>
      <PageHeader index={page.index} label={page.navLabel} title={COPY.events.heading} intro={COPY.events.intro} />
      <EventsSection events={events} />
    </>
  );
}
