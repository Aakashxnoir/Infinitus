import { GALLERY } from '@/lib/data';
import GalleryGrid from '@/components/ui/GalleryGrid';

/** Event photos used on the Gallery page and the home-page strip. */
export function galleryPhotos(events) {
  // Bundled photos first, then any photos attached to events in Supabase
  const eventPhotos = events.flatMap((event) =>
    (event.images || []).map((src, i) => ({
      src,
      width: 1080,
      height: 1350,
      caption: `${event.title} — photo ${i + 1}`,
    }))
  );
  return [...GALLERY, ...eventPhotos];
}

/** Body of the Gallery page. */
export default function GallerySection({ events }) {
  const photos = galleryPhotos(events);

  return (
    <section className="section !pt-16">
      <div className="container-x">
        <GalleryGrid photos={photos} />
      </div>
    </section>
  );
}
