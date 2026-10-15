import Hero from '@/components/sections/Hero';
import {
  CtaBand,
  HomeAbout,
  HomeEvents,
  HomeExplore,
  HomeGallery,
  HomeTeam,
  KeywordMarquee,
} from '@/components/sections/home/HomeSections';
import { galleryPhotos } from '@/components/sections/GallerySection';
import { getMembers } from '@/lib/members';
import { getEvents } from '@/lib/events';

export const revalidate = 60;

/** Home: a tour of the club, with each section leading to its own page. */
export default async function Home() {
  const [members, events] = await Promise.all([getMembers(), getEvents()]);
  const pastEvents = events.filter((e) => e.status !== 'upcoming');

  const stats = [
    { value: pastEvents.length, label: 'Events hosted' },
    { value: members.length, label: 'Core members' },
    { value: new Set(members.map((m) => m.department).filter(Boolean)).size, label: 'Departments' },
  ];

  return (
    <>
      <Hero stats={stats} />
      <KeywordMarquee />
      <HomeAbout />
      <HomeExplore />
      <HomeEvents events={events} />
      <HomeTeam members={members} />
      <HomeGallery photos={galleryPhotos(events)} />
      <CtaBand />
    </>
  );
}
