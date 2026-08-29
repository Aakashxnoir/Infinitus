import { COPY, SITE } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/ui/ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-lg">
        <Reveal className="text-center">
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-brand-indigo/70">
            {COPY.contact.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-ink sm:text-4xl">
            {COPY.contact.heading}
          </h2>
          <p className="mt-4 text-sm text-brand-ink/60">
            {COPY.contact.intro}{' '}
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="interactive-link font-medium text-brand-indigo"
            >
              {SITE.contactEmail}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
