import { COPY, SITE } from '@/lib/site';
import InfinitusLogo from '@/components/brand/InfinitusLogo';
import RitLogo from '@/components/brand/RitLogo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-brand-skyDeep/60 bg-brand-offwhite px-6 py-12 sm:px-10 dark:border-brand-white/10 dark:bg-brand-navy">
      <div className="section-inner flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          <div className="flex flex-col items-center gap-2">
            <InfinitusLogo size="footer" interactive />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-ink/50 dark:text-brand-white/60">
              {COPY.footer.clubLine}
            </p>
          </div>

          <div
            className="hidden h-16 w-px bg-brand-skyDeep/80 dark:bg-brand-white/20 sm:block"
            aria-hidden="true"
          />

          <RitLogo size="md" interactive />
        </div>

        <p className="text-sm text-brand-ink/60 dark:text-brand-white/70">
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="interactive-link text-brand-ink/60 hover:text-brand-navy dark:text-brand-white/80 dark:hover:text-brand-white"
          >
            {SITE.contactEmail}
          </a>
        </p>

        <p className="text-xs text-brand-ink/40 dark:text-brand-white/40">
          {COPY.footer.copyright(year)}
        </p>
      </div>
    </footer>
  );
}
