import { COPY, SITE } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';
import ContactGoogleForm from '@/components/ui/ContactGoogleForm';

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell section-pad scroll-mt-20">
      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal className="text-center">
          <p className="page-eyebrow">{COPY.contact.eyebrow}</p>
          <h2 className="page-heading mt-3">{COPY.contact.heading}</h2>
          <div className="page-muted mt-4 space-y-1">
            <p className="font-medium text-black/80 dark:text-white/80">
              {COPY.contact.orgLine}
            </p>
            {COPY.contact.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="pt-2">{COPY.contact.intro}</p>
            <p className="pt-1">
              {COPY.contact.emailLine}{' '}
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="interactive-link font-medium text-black dark:text-white"
              >
                {SITE.contactEmail}
              </a>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ContactGoogleForm />
        </Reveal>
      </div>
    </section>
  );
}
