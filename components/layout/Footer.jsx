import { COPY, SITE } from '@/lib/site';
import InfinitusLogo from '@/components/brand/InfinitusLogo';
import RitLogo from '@/components/brand/RitLogo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-skyDeep/60 bg-brand-offwhite px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          <div className="flex flex-col items-center gap-2">
            <InfinitusLogo size="footer" interactive />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-ink/50">
              {COPY.footer.clubLine}
            </p>
          </div>

          <div className="hidden h-16 w-px bg-brand-skyDeep/80 sm:block" aria-hidden="true" />

          <RitLogo size="md" showName interactive />
        </div>

        <p className="text-sm text-brand-ink/60">
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="interactive-link text-brand-ink/60 hover:text-brand-indigo"
          >
            {SITE.contactEmail}
          </a>
        </p>

        <p className="text-xs text-brand-ink/40">{COPY.footer.copyright(year)}</p>
      </div>
    </footer>
  );
}
