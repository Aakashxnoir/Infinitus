'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SESSION_KEY = 'infinitus-loader-played';

export default function Loader({ onComplete }) {
  const overlayRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const logoRef = useRef(null);
  const timelineRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const finish = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch (err) {
        // sessionStorage unavailable (private mode etc.) — safe to ignore
      }
      document.body.style.overflow = '';
      setVisible(false);
      onComplete?.();
    };

    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (err) {
      alreadyPlayed = false;
    }

    if (alreadyPlayed) {
      finish();
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let tl;

    if (reduceMotion) {
      tl = gsap.timeline({ onComplete: finish });
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out',
        delay: 0.3,
      });
    } else {
      gsap.set(logoRef.current, { opacity: 0, scale: 0.85 });
      gsap.set([topRef.current, bottomRef.current], { yPercent: 0 });

      tl = gsap.timeline({ onComplete: finish });
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      });
      tl.to(logoRef.current, { duration: 0.4 }); // brief hold
      tl.to(
        logoRef.current,
        { opacity: 0, duration: 0.25, ease: 'power1.in' },
        '-=0.05'
      );
      tl.to(
        topRef.current,
        { yPercent: -100, duration: 0.8, ease: 'power2.inOut' },
        '<'
      );
      tl.to(
        bottomRef.current,
        { yPercent: 100, duration: 0.8, ease: 'power2.inOut' },
        '<'
      );
    }

    timelineRef.current = tl;

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const handleSkip = () => {
    const tl = timelineRef.current;
    if (!tl || tl.progress() === 1) return;
    tl.timeScale(8);
  };

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleSkip}
      role="presentation"
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
    >
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-brand-indigoDeep"
      />
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-indigoDeep"
      />
      <div
        ref={logoRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2"
      >
        <span className="text-5xl leading-none text-brand-amber">∞</span>
        <span className="font-heading text-2xl font-semibold tracking-[0.35em] text-white">
          INFINITUS
        </span>
      </div>
    </div>
  );
}
