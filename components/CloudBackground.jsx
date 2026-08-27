'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Layered, low-opacity cloud shapes for ambient drift/rise motion behind the hero.
const CLOUDS = [
  {
    id: 'back-1',
    top: '8%',
    left: '-8%',
    size: 'h-56 w-[28rem]',
    blur: 'blur-3xl',
    color: 'bg-brand-skyDeep/50',
    driftX: 70,
    driftDuration: 34,
    riseY: 18,
    riseDuration: 11,
  },
  {
    id: 'back-2',
    top: '16%',
    left: '55%',
    size: 'h-64 w-[32rem]',
    blur: 'blur-3xl',
    color: 'bg-white/40',
    driftX: -60,
    driftDuration: 40,
    riseY: 14,
    riseDuration: 13,
  },
  {
    id: 'mid-1',
    top: '38%',
    left: '5%',
    size: 'h-40 w-80',
    blur: 'blur-2xl',
    color: 'bg-brand-sky/70',
    driftX: 90,
    driftDuration: 26,
    riseY: 20,
    riseDuration: 9,
  },
  {
    id: 'mid-2',
    top: '52%',
    left: '58%',
    size: 'h-44 w-96',
    blur: 'blur-2xl',
    color: 'bg-white/50',
    driftX: -80,
    driftDuration: 30,
    riseY: 16,
    riseDuration: 10,
  },
  {
    id: 'front-1',
    top: '70%',
    left: '22%',
    size: 'h-28 w-64',
    blur: 'blur-xl',
    color: 'bg-brand-skyDeep/60',
    driftX: 50,
    driftDuration: 20,
    riseY: 10,
    riseDuration: 7,
  },
];

export default function CloudBackground() {
  const cloudRefs = useRef([]);
  cloudRefs.current = [];

  const registerRef = (el) => {
    if (el && !cloudRefs.current.includes(el)) {
      cloudRefs.current.push(el);
    }
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return undefined;

    const tweens = cloudRefs.current.flatMap((el, i) => {
      const config = CLOUDS[i];
      return [
        gsap.to(el, {
          x: config.driftX,
          duration: config.driftDuration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }),
        gsap.to(el, {
          y: -config.riseY,
          opacity: 0.85,
          duration: config.riseDuration,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }),
      ];
    });

    return () => tweens.forEach((tween) => tween.kill());
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {CLOUDS.map((cloud) => (
        <div
          key={cloud.id}
          ref={registerRef}
          className={`absolute rounded-full ${cloud.size} ${cloud.blur} ${cloud.color}`}
          style={{ top: cloud.top, left: cloud.left, opacity: 0.55 }}
        />
      ))}
    </div>
  );
}
