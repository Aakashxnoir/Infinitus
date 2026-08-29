import { COPY } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';

export default function AboutUs() {
  return (
    <section id="about" className="section-shell section-pad scroll-mt-24">
      <div className="section-inner">
        <Reveal>
          <div className="border-b border-brand-skyDeep/50 pb-10 dark:border-brand-white/10 lg:pb-12">
            <p className="page-eyebrow">{COPY.about.eyebrow}</p>
            <h2 className="page-heading mt-3">{COPY.about.heading}</h2>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-10 lg:mt-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <p className="font-heading text-[1.35rem] font-semibold leading-snug tracking-tight text-brand-navy dark:text-brand-white sm:text-2xl sm:leading-snug lg:col-span-7 lg:text-[1.65rem] lg:leading-[1.35]">
              {COPY.about.body}
            </p>
            <p className="text-base leading-relaxed text-brand-ink/65 dark:text-brand-white/65 sm:text-lg sm:leading-8 lg:col-span-5 lg:pt-1">
              {COPY.about.bodySecondary}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 lg:mt-16">
          <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div>
              <p className="page-eyebrow">{COPY.about.activitiesEyebrow}</p>
              <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-brand-navy dark:text-brand-white sm:text-[1.75rem]">
                {COPY.about.activitiesHeading}
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-brand-ink/50 dark:text-brand-white/50 sm:text-right">
              {COPY.about.activitiesIntro}
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {COPY.about.activities.map((item, index) => (
              <li
                key={item}
                className="flex min-h-[4.5rem] items-start gap-3 rounded-2xl border border-brand-skyDeep/40 bg-brand-white/55 px-4 py-4 dark:border-brand-white/10 dark:bg-brand-navy/35 sm:px-5"
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-sm font-bold tabular-nums text-brand-navy/35 dark:text-brand-white/35"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="pt-0.5 text-[15px] font-medium leading-snug text-brand-navy dark:text-brand-white sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.14} className="mt-14 lg:mt-16">
          <div className="grid gap-6 rounded-card border border-brand-skyDeep/45 bg-brand-white/70 p-6 dark:border-brand-white/10 dark:bg-brand-navy/40 sm:p-8 lg:grid-cols-[220px_1fr] lg:gap-12 lg:p-10">
            <div>
              <p className="page-eyebrow">{COPY.about.focusEyebrow}</p>
              <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-brand-navy dark:text-brand-white">
                {COPY.about.focusHeading}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-brand-ink/70 dark:text-brand-white/70 sm:text-lg sm:leading-8 lg:border-l lg:border-brand-skyDeep/50 lg:pl-10 dark:lg:border-brand-white/15">
              {COPY.about.focus}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
