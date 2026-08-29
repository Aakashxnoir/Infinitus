import { getEvents } from '@/lib/events';
import { COPY } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';

export const revalidate = 60;

export default async function GallerySection() {
  const events = await getEvents('conducted');
  const photos = events.flatMap((event) =>
    [event.coverImageUrl, ...(event.images || [])]
      .filter(Boolean)
      .map((url, i) => ({ url, alt: `${event.title} — photo ${i + 1}` }))
  );

  return (
    <section id="gallery" className="section-shell section-pad scroll-mt-24">
      <div className="section-inner">
        <Reveal className="text-center">
          <p className="page-eyebrow">{COPY.gallery.eyebrow}</p>
          <h2 className="page-heading mt-3">{COPY.gallery.heading}</h2>
        </Reveal>

        {photos.length === 0 ? (
          <div className="interactive-card mx-auto mt-8 max-w-md px-5 py-4 text-center text-sm text-brand-ink/60 dark:text-brand-white/60">
            {COPY.gallery.empty}
          </div>
        ) : (
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {photos.map((photo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photo.url}
                src={photo.url}
                alt={photo.alt}
                loading="lazy"
                className="interactive-card w-full object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
