'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import InfinitusLogo from '@/components/brand/InfinitusLogo';

/** Logo sinks into the page as the curtains open. */
const LOGO_EXIT_DURATION = 0.1;
/** Curtain split — snappy theater open. */
const SPLIT_DURATION = 0.55;

export default function Loader() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const logoRef = useRef(null);
  const timelineRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return undefined;

    document.body.style.overflow = 'hidden';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const finish = () => {
      document.body.style.overflow = '';
      setActive(false);
    };

    let tl;

    const frame = requestAnimationFrame(() => {
      if (!topRef.current || !bottomRef.current || !logoRef.current) {
        finish();
        return;
      }

      if (reduceMotion) {
        tl = gsap.timeline({ onComplete: finish });
        tl.to([topRef.current, bottomRef.current, logoRef.current], {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
          delay: 0.2,
        });
      } else {
        gsap.set(logoRef.current, {
          opacity: 0,
          scale: 0.9,
          transformOrigin: '50% 50%',
        });
        // Pure slide — no scaleY, so the blue stays solid until the gap opens
        gsap.set(topRef.current, { yPercent: 0 });
        gsap.set(bottomRef.current, { yPercent: 0 });

        tl = gsap.timeline({ onComplete: finish });

        tl.to(logoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
        });

        // Short hold — keep the beat tight
        tl.to({}, { duration: 0.35 });

        tl.add('open');

        // Logo dives into the site (0.1s, smooth)
        tl.to(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.4,
            duration: LOGO_EXIT_DURATION,
            ease: 'power2.inOut',
          },
          'open'
        );

        // Curtains pull apart from the centre — seamless, fast open
        tl.to(
          topRef.current,
          {
            yPercent: -100,
            duration: SPLIT_DURATION,
            ease: 'power3.inOut',
          },
          'open'
        );

        tl.to(
          bottomRef.current,
          {
            yPercent: 100,
            duration: SPLIT_DURATION,
            ease: 'power3.inOut',
          },
          'open'
        );
      }

      timelineRef.current = tl;
    });

    return () => {
      cancelAnimationFrame(frame);
      timelineRef.current?.kill();
      document.body.style.overflow = '';
    };
  }, [active]);

  const handleSkip = () => {
    const tl = timelineRef.current;
    if (!tl || tl.progress() === 1) return;
    tl.timeScale(14);
  };

  if (!active) return null;

  return (
    <div
      onClick={handleSkip}
      role="presentation"
      aria-hidden="true"
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
    >
      {/*
        Panels overlap by 2px at the centre so there is no visible seam
        before the open. Same solid color, no shadows — reads as one screen.
      */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 z-10 h-[calc(50%+2px)] bg-brand-indigoDeep will-change-transform"
      />
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 z-10 h-[calc(50%+2px)] bg-brand-indigoDeep will-change-transform"
      />

      <div
        ref={logoRef}
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center will-change-transform"
      >
        <InfinitusLogo size="loader" priority />
      </div>
    </div>
  );
}
