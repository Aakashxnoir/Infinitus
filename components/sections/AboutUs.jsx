import { COPY, SOCIAL } from '@/lib/site';
import Reveal, { Stagger, StaggerItem } from '@/components/ui/Reveal';
import SplitText from '@/components/ui/SplitText';
import Journey from '@/components/sections/Journey';

/** Body of the About page: mission statement, what we do, and the timeline. */
export default function AboutUs() {
  const { about } = COPY;

  return (
    <>
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-24">
          <h2 className="font-heading text-3xl font-medium leading-[1.2] text-fg sm:text-5xl xl:text-6xl">
            <SplitText text={about.statement} onView stagger={0.03} />{' '}
            <SplitText text={about.statementAccent} onView delay={0.4} className="italic text-accent" />
          </h2>
          <Reveal delay={0.2} className="space-y-5 self-end leading-relaxed text-muted">
            <p>{about.bodySecondary}</p>
            <p>{about.focus}</p>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-fg/15 bg-bg-2/50">
        <div className="container-x">
          <Reveal className="flex items-baseline justify-between gap-6">
            <h2 className="font-heading text-2xl font-semibold text-fg sm:text-4xl">What we do</h2>
            <span className="font-mono text-sm text-muted">{about.pillars.length} programmes</span>
          </Reveal>

          <Stagger as="ol" className="mt-12 grid overflow-hidden rounded-md border-l border-t border-fg/15 sm:grid-cols-2 lg:grid-cols-3">
            {about.pillars.map((pillar, i) => (
              <StaggerItem as="li" key={pillar.title} className="group relative border-b border-r border-fg/15 p-7 transition-colors duration-500 hover:bg-card sm:p-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <p className="font-mono text-sm text-accent">1.{i + 1}</p>
                <h3 className="mt-10 font-heading text-2xl font-semibold text-fg transition-transform duration-500 ease-out group-hover:translate-x-1">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{pillar.body}</p>
                {i === about.pillars.length - 1 && (
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    Listen on Instagram <span aria-hidden="true">↗</span>
                  </a>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Journey heading={about.journeyHeading} steps={about.journey} />
    </>
  );
}
