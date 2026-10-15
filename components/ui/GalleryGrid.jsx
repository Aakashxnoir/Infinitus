'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

/** Masonry photo grid with a keyboard-friendly lightbox. */
export default function GalleryGrid({ photos }) {
  const [index, setIndex] = useState(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const current = open ? photos[index] : null;

  return (
    <>
      <div className="columns-2 gap-3 sm:gap-4 md:columns-3 xl:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -5% 0px' }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIndex(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-md border border-fg/15 bg-bg-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Open photo: ${photo.caption}`}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              unoptimized={photo.src.startsWith('http')}
              className="h-auto w-full transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-2 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-12 text-left opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <span className="text-sm font-medium text-white">{photo.caption}</span>
              {photo.date && <span className="shrink-0 font-mono text-[11px] text-white/70">{photo.date}</span>}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[80vh] w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.caption}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 900px, 100vw"
                unoptimized={current.src.startsWith('http')}
                className="mx-auto max-h-[80vh] w-auto rounded-md object-contain"
              />
            </motion.div>
            <div className="mt-4 flex w-full max-w-4xl items-center justify-between gap-4 text-white" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => step(-1)} className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10" aria-label="Previous photo">
                ←
              </button>
              <p className="text-center text-sm">
                {current.caption}
                {current.date && <span className="ml-2 font-mono text-xs text-white/60">{current.date}</span>}
                <span className="ml-3 font-mono text-xs text-white/40">
                  {index + 1}/{photos.length}
                </span>
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(1)} className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10" aria-label="Next photo">
                  →
                </button>
                <button type="button" autoFocus onClick={close} className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10" aria-label="Close">
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
