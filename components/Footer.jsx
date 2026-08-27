const CONTACT_EMAIL = 'infinitus.club@example.edu';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-skyDeep/60 bg-brand-offwhite px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-1.5 font-heading text-base font-semibold text-brand-ink">
          <span className="text-brand-amber">∞</span>
          INFINITUS
        </div>

        <p className="text-sm text-brand-ink/60">
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-indigo">
            {CONTACT_EMAIL}
          </a>
        </p>

        <p className="text-xs text-brand-ink/40">© {year} INFINITUS Math Club. All rights reserved.</p>
      </div>
    </footer>
  );
}
