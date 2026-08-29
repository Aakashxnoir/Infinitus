import { COPY } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';
import RitLogo from '@/components/brand/RitLogo';

export default function AboutUs() {
  return (
    <section id="about" className="scroll-mt-24 bg-white/40 px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-brand-indigo/70">
            {COPY.about.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-ink sm:text-4xl">
            {COPY.about.heading}
          </h2>
          <div className="mt-8 flex justify-center">
            <RitLogo size="lg" showName interactive />
          </div>
          <p className="mt-6 text-base leading-relaxed text-brand-ink/70 sm:text-lg">
            {COPY.about.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
