import { COPY, SITE, SOCIAL } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';

function ContactRow({ href, label, value, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className="group relative flex items-center justify-between gap-4 overflow-hidden border-t border-fg/15 py-6 sm:py-8"
    >
      {/* Fill sweeps up from below on hover */}
      <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-fg/[0.04] transition-transform duration-500 ease-out group-hover:scale-y-100" />
      <span className="relative transition-transform duration-500 ease-out group-hover:translate-x-3">
        <span className="block font-mono text-xs uppercase tracking-widest text-muted">{label}</span>
        <span className="mt-2 block break-all font-heading text-2xl text-fg transition-colors group-hover:text-accent sm:text-4xl xl:text-5xl">
          {value}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="relative mr-3 text-3xl text-muted transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-0 group-hover:text-accent sm:text-5xl"
      >
        ↗
      </span>
    </a>
  );
}

/** Body of the Contact page. */
export default function ContactSection() {
  const { contact } = COPY;

  return (
    <section className="section !pt-16">
      <div className="container-x grid gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal className="border-b border-fg/15">
          <ContactRow href={`mailto:${SITE.contactEmail}`} label="Email" value={SITE.contactEmail} />
          <ContactRow href={SOCIAL.instagram} label="Instagram" value={SOCIAL.instagramHandle} external />
          <ContactRow href={SOCIAL.queriesForm} label="Google Form" value={contact.formTitle} external />
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col gap-8">
          <div className="card p-7 sm:p-8">
            <p className="font-heading text-xl font-semibold text-fg">{contact.formTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{contact.formBody}</p>
            <a href={SOCIAL.queriesForm} target="_blank" rel="noreferrer noopener" className="btn-primary mt-6 w-full">
              {contact.formCta} <span aria-hidden="true" className="nudge">→</span>
            </a>
          </div>
          <address className="not-italic text-sm leading-relaxed text-muted">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Find us</p>
            <p className="mt-3 font-medium text-fg">{contact.orgLine}</p>
            {contact.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </Reveal>
      </div>
    </section>
  );
}
