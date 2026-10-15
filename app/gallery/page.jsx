import PageHeader from '@/components/layout/PageHeader';
import GallerySection from '@/components/sections/GallerySection';
import { getEvents } from '@/lib/events';
import { COPY, SOCIAL, pageById } from '@/lib/site';

export const revalidate = 60;

export const metadata = {
  title: COPY.pages.gallery.title,
  description: COPY.pages.gallery.description,
};

export default async function GalleryPage() {
  const events = await getEvents();
  const page = pageById('gallery');
  return (
    <>
      <PageHeader index={page.index} label={page.navLabel} title={COPY.gallery.heading} intro={COPY.gallery.intro}>
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          More on {SOCIAL.instagramHandle}{' '}
          <span aria-hidden="true" className="nudge nudge-ne">
            ↗
          </span>
        </a>
      </PageHeader>
      <GallerySection events={events} />
    </>
  );
}
