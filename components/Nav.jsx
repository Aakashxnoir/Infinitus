'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'about', label: 'About', icon: InfoIcon },
  { id: 'events', label: 'Events', icon: CalendarIcon },
  { id: 'gallery', label: 'Gallery', icon: GridIcon },
];

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <path
        d="M4 11.5 12 4l8 7.5M6 9.5V20h12V9.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" />
      <path
        d="M12 11v5.5M12 8v.01"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" />
      <path d="M4 10h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" stroke="currentColor" />
      <rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" stroke="currentColor" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

const NAV_OFFSET = 88; // px — accounts for the sticky nav's own height

export default function Nav() {
  const [activeId, setActiveId] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToId = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const top =
      target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleNavClick = (id) => (event) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-brand-skyDeep/60 bg-brand-offwhite/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          onClick={handleNavClick('home')}
          className="flex items-center gap-1.5 font-heading text-lg font-semibold tracking-wide text-brand-ink"
        >
          <span className="text-brand-amber">∞</span>
          INFINITUS
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-sky text-brand-indigo'
                    : 'text-brand-ink/70 hover:text-brand-indigo'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={handleNavClick('contact')}
            className="hidden rounded-full bg-brand-indigo px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-indigoDeep sm:inline-block"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand-ink md:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav-menu"
            aria-label="Primary mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: 'easeOut' }}
            className="flex flex-col gap-1 border-t border-brand-skyDeep/60 bg-brand-offwhite px-4 py-3 md:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleNavClick(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-brand-sky text-brand-indigo'
                      : 'text-brand-ink/80'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={handleNavClick('contact')}
              className="mt-1 rounded-lg bg-brand-indigo px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Contact
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
