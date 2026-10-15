import Image from 'next/image';
import Link from 'next/link';
import { COPY, PAGES } from '@/lib/site';
import Marquee from '@/components/ui/Marquee';
import Reveal, { Stagger, StaggerItem } from '@/components/ui/Reveal';
import SplitText from '@/components/ui/SplitText';
import EventCard from '@/components/ui/EventCard';
import { metaOf } from '@/lib/format';
import { FeaturedEvent } from '@/components/sections/EventsSection';

/** Section heading row with a "see all" link on the right. */
function SectionHead({ index, heading, href, cta }) {
  return (
    <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow">§{index}</p>
        <h2 className="h-display mt-4">{heading}</h2>
      </div>
      {href && (
        <Link href={href} className="btn-ghost self-start sm:self-auto">
          {cta} <span aria-hidden="true" className="nudge">→</span>
        </Link>
      )}
    </Reveal>
  );
}

export function KeywordMarquee() {
  return (
    <div className="border-y border-fg/15 bg-bg-2/60 py-5">
      <Marquee duration={45}>
        {COPY.home.marquee.map((word) => (
          <span key={word} className="flex items-center whitespace-nowrap font-heading text-3xl italic text-fg sm:text-5xl">
            <span className="px-8">{word}</span>
            <span aria-hidden="true" className="font-serif not-italic text-accent">∞</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function HomeAbout() {
  const { about } = COPY;
  return (
    <section className="section">
      <div className="container-x grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <p className="eyebrow">{about.eyebrow}</p>
        </Reveal>
        <div>
          <h2 className="max-w-6xl font-heading text-3xl font-medium leading-[1.2] text-fg sm:text-5xl xl:text-6xl">
            <SplitText text={about.statement} onView stagger={0.03} />{' '}
            <SplitText text={about.statementAccent} onView delay={0.4} className="italic text-accent" />
          </h2>
          <Reveal delay={0.2} className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="lede max-w-2xl">{about.body}</p>
            <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-medium text-accent">
              <span className="border-b border-accent/40 pb-0.5 transition-colors group-hover:border-accent">Read our story</span>
              <span aria-hidden="true" className="nudge">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Index of the inner pages as large cards; a fill sweeps up behind each on hover. */
export function HomeExplore() {
  const pages = PAGES.filter((p) => COPY.home.explore[p.id]);
  return (
    <section className="section border-t border-fg/15 !py-20">
      <div className="container-x">
        <Reveal className="flex items-baseline justify-between gap-6">
          <h2 className="font-heading text-2xl font-semibold text-fg sm:text-3xl">{COPY.home.exploreHeading}</h2>
          <span className="font-mono text-sm text-muted">{COPY.home.exploreEyebrow}</span>
        </Reveal>
        <Stagger className="mt-10 grid overflow-hidden rounded-md border-l border-t border-fg/15 sm:grid-cols-2 xl:grid-cols-4">
          {pages.map((page) => (
            <StaggerItem key={page.id} className="border-b border-r border-fg/15">
              <Link href={page.href} className="group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden p-7 sm:p-9">
                <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
                <span className="relative flex items-start justify-between">
                  <span className="font-mono text-sm text-accent transition-colors duration-500 group-hover:text-bg">§{page.index}</span>
                  <span aria-hidden="true" className="text-2xl text-muted transition-all duration-500 group-hover:-rotate-45 group-hover:text-bg">
                    →
                  </span>
                </span>
                <span className="relative">
                  <span className="block font-heading text-4xl font-medium text-fg transition-colors duration-500 group-hover:text-bg sm:text-5xl">
                    {page.navLabel}
                  </span>
                  <span className="mt-3 block max-w-xs text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-bg/80">
                    {COPY.home.explore[page.id]}
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function HomeEvents({ events }) {
  const past = events.filter((e) => e.status !== 'upcoming');
  const upcoming = events.filter((e) => e.status === 'upcoming');
  const featured = past.find((e) => e.featured) ?? past[0];
  const latest = [...upcoming, ...past.filter((e) => e !== featured)].slice(0, 4);

  return (
    <section className="section bg-bg-2/50">
      <div className="container-x">
        <SectionHead index={2} heading={COPY.home.eventsHeading} href="/events" cta={COPY.home.eventsCta} />
        {featured && (
          <Reveal className="mt-12">
            <FeaturedEvent event={featured} />
          </Reveal>
        )}
        <Stagger className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {latest.map((event) => (
            <StaggerItem key={event.id}>
              <EventCard event={event} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// Roles featured on the home page, in order; the full roster lives on /team
const HOME_TEAM_ROLES = ['President', 'Vice President', 'Secretary', 'Joint Secretary', 'Technical Head'];

export function HomeTeam({ members }) {
  const leaders = HOME_TEAM_ROLES.flatMap((role) => members.filter((m) => m.role === role));
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead index={3} heading={COPY.home.teamHeading} href="/team" cta={COPY.home.teamCta} />
        <Stagger as="ul" className="mt-12 border-t border-fg/15">
          {leaders.map((member) => (
            <StaggerItem as="li" key={member.id} y={16}>
              <Link
                href="/team"
                className="group relative grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 overflow-hidden border-b border-fg/15 py-6 sm:grid-cols-[14rem_1fr_auto] sm:py-8"
              >
                <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-fg/[0.04] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative text-sm font-medium text-gold sm:order-none">{member.role}</span>
                <span className="relative col-span-2 font-heading text-3xl text-fg transition-transform duration-500 ease-out group-hover:translate-x-3 sm:col-span-1 sm:text-5xl">
                  {member.name}
                </span>
                <span className="relative hidden font-mono text-xs text-muted sm:block">{metaOf(member)}</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Two rows of photos drifting in opposite directions, edge to edge. */
export function HomeGallery({ photos }) {
  const half = Math.ceil(photos.length / 2);
  const rows = [photos.slice(0, half), photos.slice(half)];

  return (
    <section className="section overflow-hidden bg-bg-2/50">
      <div className="container-x">
        <SectionHead index={4} heading={COPY.home.galleryHeading} href="/gallery" cta={COPY.home.galleryCta} />
      </div>
      <div className="mt-12 space-y-4">
        {rows.map((row, r) => (
          <Marquee key={r} duration={60 + r * 10} reverse={r === 1}>
            {row.map((photo) => (
              <Link
                key={photo.src}
                href="/gallery"
                className="group relative mr-4 block h-56 shrink-0 overflow-hidden rounded-md border border-fg/15 bg-bg-2 sm:h-72 xl:h-80"
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="320px"
                  unoptimized={photo.src.startsWith('http')}
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </Link>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="section relative overflow-hidden border-t border-fg/15">
      <div aria-hidden="true" className="graph-paper pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <p className="eyebrow">{COPY.home.ctaEyebrow}</p>
        <h2 className="mt-6 max-w-6xl font-heading text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-fg sm:text-6xl xl:text-8xl">
          <SplitText text={COPY.home.ctaHeading} onView stagger={0.04} />
        </h2>
        <Reveal delay={0.3} className="mt-12">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 rounded-full bg-btn-bg py-4 pl-8 pr-4 text-lg font-medium text-btn-fg transition-transform duration-300 hover:scale-[1.03]"
          >
            {COPY.home.ctaButton}
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-bg transition-transform duration-500 ease-out group-hover:-rotate-45">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
