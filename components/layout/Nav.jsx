'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import InfinitusLogo from '@/components/brand/InfinitusLogo';
import RitLogo from '@/components/brand/RitLogo';
import { useTheme } from '@/components/ui/ThemeProvider';
import { COPY, NAV_LINKS, sectionHref } from '@/lib/site';

const NAV_ICONS = {
  home: HomeIcon,
  members: MembersIcon,
  about: InfoIcon,
  events: CalendarIcon,
  gallery: GridIcon,
};

const MAIN_NAV = NAV_LINKS.filter((link) => link.navVariant !== 'button');
const CONTACT_LINK = NAV_LINKS.find((link) => link.id === 'contact');
const TRACKED_SECTIONS = [...MAIN_NAV.map((l) => l.id), ...(CONTACT_LINK ? ['contact'] : [])];

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

function MembersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" />
      <path
        d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM14.5 19.5c.3-2.2 2-3.5 4-3.5"
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
      <path d="M12 11v5.5M12 8v.01" stroke="currentColor" strokeLinecap="round" />
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
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
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

function BrandDivider({ isDark }) {
  return (
    <span
      aria-hidden="true"
      className={`mx-2 h-8 w-px shrink-0 ${isDark ? 'bg-brand-white/25' : 'bg-brand-ink/20'}`}
    />
  );
}

const NAV_OFFSET = 88;

export default function Nav() {
  const [activeId, setActiveId] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const sections = TRACKED_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const updateActiveFromScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0]?.id || 'home';
      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = section.id;
      }
      setActiveId(current);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll);
    return () => {
      window.removeEventListener('scroll', updateActiveFromScroll);
      window.removeEventListener('resize', updateActiveFromScroll);
    };
  }, []);

  const scrollToId = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleNavClick = (id) => (event) => {
    event.preventDefault();
    setActiveId(id);
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

  const contactActive = activeId === 'contact';

  const navItemClass = (isActive) =>
    `flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      isActive
        ? isDark
          ? 'bg-brand-white text-brand-navy shadow-sm'
          : 'bg-brand-sky text-brand-navy shadow-sm'
        : isDark
          ? 'interactive-nav-item text-brand-white/75 hover:bg-brand-white/10 hover:text-brand-white'
          : 'interactive-nav-item text-brand-ink/70 hover:bg-brand-sky/70 hover:text-brand-navy'
    }`;

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-40 border-b shadow-sm backdrop-blur-md transition-colors ${
        isDark
          ? 'border-brand-white/10 bg-brand-navy/90'
          : 'border-brand-skyDeep/60 bg-brand-offwhite/85'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <a
          href={sectionHref('home')}
          onClick={handleNavClick('home')}
          className="interactive-logo flex min-w-0 items-center gap-0.5 sm:gap-1"
          aria-label={COPY.brand.homeAriaLabel}
        >
          <InfinitusLogo size="nav" priority />
          <BrandDivider isDark={isDark} />
          <RitLogo size="nav" />
          <span className="sr-only">{COPY.brand.srOnly}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {MAIN_NAV.map((item) => {
            const Icon = NAV_ICONS[item.id];
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={sectionHref(item.id)}
                onClick={handleNavClick(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={navItemClass(isActive)}
              >
                <Icon className="h-4 w-4" />
                {item.navLabel}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className={`interactive-icon-btn flex h-10 w-10 items-center justify-center rounded-full ${
              isDark
                ? 'text-brand-white hover:bg-brand-white/10'
                : 'text-brand-navy hover:bg-brand-sky'
            }`}
          >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          {CONTACT_LINK && (
            <a
              href={sectionHref('contact')}
              onClick={handleNavClick('contact')}
              aria-current={contactActive ? 'true' : undefined}
              className={`interactive-btn hidden rounded-full px-5 py-2 text-sm font-semibold sm:inline-block ${
                isDark
                  ? 'bg-brand-white text-brand-navy hover:bg-brand-sky'
                  : 'bg-brand-navy text-brand-white hover:bg-brand-navyMid'
              }`}
            >
              {CONTACT_LINK.navLabel}
            </a>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`interactive-icon-btn flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
              isDark ? 'text-brand-white' : 'text-brand-navy'
            }`}
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
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
            className={`flex flex-col gap-1 border-t px-4 py-3 md:hidden ${
              isDark
                ? 'border-brand-white/10 bg-brand-navyDeep'
                : 'border-brand-skyDeep/60 bg-brand-offwhite'
            }`}
          >
            {MAIN_NAV.map((item) => {
              const Icon = NAV_ICONS[item.id];
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={sectionHref(item.id)}
                  onClick={handleNavClick(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? isDark
                        ? 'bg-brand-white text-brand-navy shadow-sm'
                        : 'bg-brand-sky text-brand-navy shadow-sm'
                      : isDark
                        ? 'text-brand-white/80'
                        : 'text-brand-ink/80'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.navLabel}
                </a>
              );
            })}
            {CONTACT_LINK && (
              <a
                href={sectionHref('contact')}
                onClick={handleNavClick('contact')}
                aria-current={contactActive ? 'true' : undefined}
                className={`mt-1 rounded-full px-3 py-2.5 text-center text-sm font-semibold ${
                  isDark
                    ? 'bg-brand-white text-brand-navy'
                    : 'bg-brand-navy text-brand-white'
                }`}
              >
                {CONTACT_LINK.navLabel}
              </a>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
