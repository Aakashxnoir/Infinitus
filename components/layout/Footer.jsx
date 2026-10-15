import Link from 'next/link';
import { CLUB_SHORT, COPY, NAV_LINKS, SITE, SOCIAL } from '@/lib/site';
import InfinitusLogo from '@/components/brand/InfinitusLogo';
import RitLogo from '@/components/brand/RitLogo';
import SplitText from '@/components/ui/SplitText';

const linkClass = 'group inline-flex items-center gap-1 text-fg/80 transition-colors hover:text-accent';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-fg/15 bg-bg-2">
      <div className="container-x pt-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <InfinitusLogo size="footer" />
              <span aria-hidden="true" className="h-10 w-px bg-fg/15" />
              <RitLogo size="sm" />
            </div>
            <p className="mt-6 max-w-sm font-serif text-2xl italic text-fg">{COPY.footer.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className={linkClass}>
                    <span className="w-6 font-mono text-xs text-muted">§{link.index}</span>
                    {link.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Connect</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={SOCIAL.instagram} target="_blank" rel="noreferrer noopener" className={linkClass}>
                  Instagram <span aria-hidden="true" className="nudge nudge-ne">↗</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.contactEmail}`} className={`${linkClass} break-all`}>
                  {SITE.contactEmail}
                </a>
              </li>
              <li>
                <a href={SOCIAL.queriesForm} target="_blank" rel="noreferrer noopener" className={linkClass}>
                  Queries form <span aria-hidden="true" className="nudge nudge-ne">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-fg/15 pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>{COPY.footer.copyright(year)}</p>
          <p>{COPY.footer.credit}</p>
        </div>
      </div>

      {/* Edge-to-edge wordmark that rises in as the footer comes into view */}
      <div aria-hidden="true" className="select-none px-2 pt-6">
        <SplitText
          text={CLUB_SHORT}
          by="char"
          onView
          className="block text-center font-heading text-[18.5vw] font-semibold leading-[0.78] tracking-[-0.02em] text-fg/[0.07]"
        />
      </div>
    </footer>
  );
}
