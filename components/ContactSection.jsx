import Reveal from './Reveal';
import ContactForm from './ContactForm';

const CONTACT_EMAIL = 'infinitus.club@example.edu';

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-lg">
        <Reveal className="text-center">
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-brand-indigo/70">
            Get in touch
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-ink sm:text-4xl">
            Contact
          </h2>
          <p className="mt-4 text-sm text-brand-ink/60">
            Questions, collaboration ideas, or want to join? Send us a message
            — or email us directly at{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-brand-indigo hover:text-brand-indigoDeep"
            >
              {CONTACT_EMAIL}
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
