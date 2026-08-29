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
    <section id="gallery" className="scroll-mt-24 bg-white/40 px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-brand-indigo/70">
            {COPY.gallery.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-ink sm:text-4xl">
            {COPY.gallery.heading}
          </h2>
        </Reveal>

        {photos.length === 0 ? (
          <p className="mt-8 text-center text-sm text-brand-ink/50">
            {COPY.gallery.empty}
          </p>
        ) : (
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {photos.map((photo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photo.url}
                src={photo.url}
                alt={photo.alt}
                loading="lazy"
                className="w-full rounded-xl object-cover shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-indigo/15"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
