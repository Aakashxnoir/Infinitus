'use client';

import { COPY, SITE } from '@/lib/site';

const GOOGLE_FORM_RE =
  /^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/i;

function toEmbedUrl(url) {
  if (!url) return null;
  // Short links rarely allow iframe embed — only embed full docs URLs.
  if (url.includes('docs.google.com/forms') && url.includes('/viewform')) {
    const joiner = url.includes('?') ? '&' : '?';
    return `${url}${joiner}embedded=true`;
  }
  return null;
}

export default function ContactGoogleForm() {
  const rawUrl = SITE.contactFormUrl?.trim() || '';
  const isValid = Boolean(rawUrl) && GOOGLE_FORM_RE.test(rawUrl);
  const embedUrl = isValid ? toEmbedUrl(rawUrl) : null;

  if (!isValid) {
    return (
      <div
        role="status"
        className="surface-panel px-5 py-8 text-center sm:px-8 sm:py-12"
      >
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-black/50 dark:text-white/50">
          {COPY.contact.formPlaceholderEyebrow}
        </p>
        <h3 className="mt-3 font-heading text-xl font-semibold text-black dark:text-white sm:text-2xl">
          {COPY.contact.formTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-black/70 dark:text-white/70 sm:text-base">
          {COPY.contact.formPlaceholderBody}
        </p>
      </div>
    );
  }

  return (
    <div className="surface-panel overflow-hidden p-5 text-center sm:p-8">
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-black/50 dark:text-white/50">
        Google Form
      </p>
      <h3 className="mt-3 font-heading text-xl font-semibold text-black dark:text-white sm:text-2xl">
        {COPY.contact.formTitle}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-black/70 dark:text-white/70 sm:text-base">
        {COPY.contact.formActiveBody}
      </p>

      <a
        href={rawUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="interactive-btn cta-solid mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
      >
        {COPY.contact.formCta}
        <span aria-hidden="true">→</span>
      </a>

      {embedUrl && (
        <iframe
          title={COPY.contact.formTitle}
          src={embedUrl}
          className="mt-8 hidden h-[min(70dvh,480px)] w-full rounded-2xl border-0 bg-white ring-1 ring-black/5 dark:ring-white/10 md:block md:h-[560px] lg:h-[640px]"
          loading="lazy"
        />
      )}
    </div>
  );
}
