import Reveal from './Reveal';

export default function AboutUs() {
  return (
    <section id="about" className="scroll-mt-24 bg-white/40 px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-brand-indigo/70">
            About Us
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-ink sm:text-4xl">
            Curiosity, structured.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-ink/70 sm:text-lg">
            INFINITUS is our college&apos;s math club — a space for students who
            want to go beyond the syllabus: problem-solving circles, guest
            talks, competitive-math prep, and workshops that turn abstract
            ideas into things you can build and present. Whether you&apos;re
            chasing olympiad-style problems or just curious what math looks
            like outside a textbook, there&apos;s a seat for you here.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
