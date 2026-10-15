'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import InfinitusLogo from '@/components/brand/InfinitusLogo';
import { useTheme } from '@/components/ui/ThemeProvider';
import { EASE } from '@/lib/motion';
import { CLUB_SHORT, COPY, NAV_LINKS } from '@/lib/site';

const MAIN_NAV = NAV_LINKS.filter((link) => link.navVariant !== 'button' && link.id !== 'home');
const CONTACT_LINK = NAV_LINKS.find((link) => link.id === 'contact');

function isActive(pathname, href) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <path
        d="M19.5 13.2A7.5 7.5 0 1 1 10.8 4.5 6 6 0 0 0 19.5 13.2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();
  const { isDark, toggleTheme } = useTheme();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Solid once the page moves; tucks away while scrolling down, returns on any upward scroll
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 160 && y > prev);
  });

  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          solid ? 'border-fg/15 bg-bg/85 backdrop-blur-md' : 'border-transparent'
        }`}
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: EASE.out }}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3" aria-label={COPY.brand.homeAriaLabel}>
            <span className="transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
              <InfinitusLogo size="nav" priority />
            </span>
            <span className="font-heading text-lg font-semibold tracking-[0.12em] text-fg">{CLUB_SHORT}</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {MAIN_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-md px-4 py-2 text-sm transition-colors ${
                    active ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-md bg-fg/[0.07]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.navLabel}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md text-fg transition-colors hover:bg-fg/10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ y: 20, rotate: -90, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -20, rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE.out }}
                >
                  {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>

            {CONTACT_LINK && (
              <Link
                href={CONTACT_LINK.href}
                aria-current={isActive(pathname, CONTACT_LINK.href) ? 'page' : undefined}
                className="btn-primary hidden !px-5 !py-2 sm:inline-flex"
              >
                {CONTACT_LINK.navLabel} <span aria-hidden="true" className="nudge">→</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-md text-fg transition-colors hover:bg-fg/10 md:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
                <motion.path
                  stroke="currentColor"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ d: menuOpen ? 'M6 6L18 18' : 'M4 8L20 8' }}
                  transition={{ duration: 0.25 }}
                />
                <motion.path
                  stroke="currentColor"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ d: menuOpen ? 'M6 18L18 6' : 'M4 16L20 16' }}
                  transition={{ duration: 0.25 }}
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Sibling of <header> so the overlay stacks independently of the header */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav-menu"
            aria-label="Primary mobile"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE.inOut }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-bg md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pt-8">
              {NAV_LINKS.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + 0.05 * i, duration: 0.5, ease: EASE.out }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-baseline gap-4 border-b border-fg/10 py-4 font-heading text-3xl ${
                        active ? 'text-accent' : 'text-fg'
                      }`}
                    >
                      <span className="font-mono text-xs text-muted">§{item.index}</span>
                      {item.navLabel}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
