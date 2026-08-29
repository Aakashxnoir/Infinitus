import { COPY, SITE } from '@/lib/site';
import InfinitusLogo from '@/components/brand/InfinitusLogo';
import RitLogo from '@/components/brand/RitLogo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="safe-pb relative overflow-hidden border-t border-brand-skyDeep/60 bg-brand-offwhite px-4 py-6 sm:px-8 dark:border-brand-white/10 dark:bg-brand-navyDeep">
      <div className="section-inner flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <InfinitusLogo size="nav" interactive />
          <div
            className="h-8 w-px bg-brand-skyDeep/80 dark:bg-brand-white/20"
            aria-hidden="true"
          />
          <RitLogo size="nav" interactive />
        </div>

        <div className="flex flex-col items-center gap-1 text-center sm:items-end sm:text-right">
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="interactive-link inline-flex min-h-11 items-center px-2 text-sm text-black/65 hover:text-black dark:text-white/70 dark:hover:text-white"
          >
            {SITE.contactEmail}
          </a>
          <p className="text-[11px] text-black/45 dark:text-white/45 sm:text-xs">
            {COPY.footer.copyright(year)}
          </p>
        </div>
      </div>
    </footer>
  );
}
