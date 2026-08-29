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

/** Approx fixed bar height (h-16) + small buffer for safe area / scroll spy. */
const NAV_OFFSET = 72;

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

function BrandDivider() {
  return <span aria-hidden="true" className="brand-divider mx-1.5 h-7 sm:mx-2 sm:h-8" />;
}

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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const contactActive = activeId === 'contact';

  const iconBtnClass = `interactive-icon-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
    isDark
      ? 'text-white hover:bg-white/10'
      : 'text-black hover:bg-black/5'
  }`;

  const navItemClass = (isActive) =>
    `flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      isActive
        ? isDark
          ? 'bg-white text-black shadow-sm'
          : 'bg-black text-white shadow-sm'
        : isDark
          ? 'interactive-nav-item text-white/75 hover:bg-white/10 hover:text-white'
          : 'interactive-nav-item text-black/70 hover:bg-black/5 hover:text-black'
    }`;

  const drawerItemClass = (isActive) =>
    `flex min-h-11 items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium ${
      isActive
        ? isDark
          ? 'bg-white text-black shadow-sm'
          : 'bg-black text-white shadow-sm'
        : isDark
          ? 'text-white/85 hover:bg-white/10'
          : 'text-black/85 hover:bg-black/5'
    }`;

  return (
    <>
      <header
        ref={navRef}
        className={`safe-pt safe-px fixed inset-x-0 top-0 z-40 border-b shadow-sm backdrop-blur-md transition-colors ${
          isDark
            ? 'border-white/10 bg-brand-navyDeep/95'
            : 'border-brand-skyDeep/60 bg-brand-offwhite/85'
        }`}
      >
        <div className="relative mx-auto flex h-16 max-w-[1180px] items-center gap-2 px-3 sm:gap-3 sm:px-6">
          {/* Mobile / tablet: hamburger top-left */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`${iconBtnClass} lg:hidden`}
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>

          <a
            href={sectionHref('home')}
            onClick={handleNavClick('home')}
            className="interactive-logo flex min-w-0 items-center gap-0 sm:gap-0.5"
            aria-label={COPY.brand.homeAriaLabel}
          >
            <InfinitusLogo size="nav" priority />
            <BrandDivider />
            <RitLogo size="nav" className="max-w-[88px] sm:max-w-none" />
            <span className="sr-only">{COPY.brand.srOnly}</span>
          </a>

          <nav
            aria-label="Primary"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex"
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
                  className={navItemClass(isActive)}
                >
                  <Icon className="h-4 w-4" />
                  {item.navLabel}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
              className={iconBtnClass}
            >
              {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>

            {CONTACT_LINK && (
              <a
                href={sectionHref('contact')}
                onClick={handleNavClick('contact')}
                aria-current={contactActive ? 'true' : undefined}
                className="interactive-btn cta-solid hidden rounded-full px-5 py-2.5 text-sm font-semibold lg:inline-block"
              >
                {CONTACT_LINK.navLabel}
              </a>
            )}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="absolute inset-0 bg-brand-navyDeep/50 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              id="mobile-nav-drawer"
              aria-label="Primary mobile"
              initial={{ x: prefersReducedMotion ? 0 : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: prefersReducedMotion ? 0 : '-100%' }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={`safe-pt safe-pb absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col border-r shadow-lg ${
                isDark
                  ? 'border-white/10 bg-brand-navyDeep'
                  : 'border-brand-skyDeep/60 bg-brand-offwhite'
              }`}
            >
              <div className="flex h-16 items-center justify-between border-b border-brand-skyDeep/40 px-3 dark:border-white/10">
                <p
                  className={`font-heading text-sm font-semibold tracking-wide ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  Menu
                </p>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className={iconBtnClass}
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {MAIN_NAV.map((item) => {
                  const Icon = NAV_ICONS[item.id];
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={sectionHref(item.id)}
                      onClick={handleNavClick(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={drawerItemClass(isActive)}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {item.navLabel}
                    </a>
                  );
                })}
              </div>

              <div className="mt-auto space-y-4 border-t border-brand-skyDeep/40 px-3 py-4 dark:border-white/10">
                {CONTACT_LINK && (
                  <a
                    href={sectionHref('contact')}
                    onClick={handleNavClick('contact')}
                    aria-current={contactActive ? 'true' : undefined}
                    className="interactive-btn cta-solid flex min-h-11 items-center justify-center rounded-full px-4 text-base font-semibold"
                  >
                    {CONTACT_LINK.navLabel}
                  </a>
                )}
                <div className="flex justify-center pb-1">
                  <RitLogo size="sm" />
                </div>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
