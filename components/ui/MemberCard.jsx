'use client';

import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LEADERSHIP_ROLES = new Set([
  'President',
  'Vice President',
  'Secretary',
  'Joint Secretary',
  'Treasurer',
]);

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" />
      <path
        d="M8 10.5v5M8 8v.01M12 15.5v-3a1.8 1.8 0 0 1 3.6 0v3M12 12.2v3.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" />
      <circle cx="12" cy="12" r="3.3" stroke="currentColor" />
      <path d="M16.2 7.8h.01" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" {...props}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function Avatar({ name, photoUrl }) {
  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photoUrl} alt={name} className="h-full w-full object-cover" loading="lazy" />
    );
  }

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-brand-sky font-heading text-2xl font-semibold text-brand-navy dark:bg-brand-navyMid dark:text-brand-white"
    >
      {initials}
    </div>
  );
}

function MemberDetailModal({ member, open, onClose, titleId }) {
  const isLeadership = LEADERSHIP_ROLES.has(member.role);
  const meta = [member.department, member.year].filter(Boolean).join(' · ');

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close member details"
            className="absolute inset-0 bg-brand-navyDeep/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg rounded-card border border-brand-skyDeep/50 bg-brand-white p-6 shadow-md sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="interactive-icon-btn absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-brand-navy/60"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-skyDeep/60 sm:h-24 sm:w-24">
                <Avatar name={member.name} photoUrl={member.photoUrl} />
              </div>

              <div className="mt-4 sm:ml-5 sm:mt-0 sm:flex-1">
                <h3 id={titleId} className="font-heading text-xl font-semibold text-brand-navy dark:text-brand-navy">
                  {member.name}
                </h3>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    isLeadership ? 'text-brand-amber' : 'text-brand-navy/70'
                  }`}
                >
                  {member.role}
                </p>
                {member.team && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-brand-navy/55">
                    {member.team}
                  </p>
                )}
                {meta && <p className="mt-1 text-xs text-brand-ink/45">{meta}</p>}
              </div>
            </div>

            <div className="mt-6 border-t border-brand-skyDeep/40 pt-5">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy/50">
                Role responsibilities
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-ink/75">
                {member.responsibilities ||
                  'Role responsibilities for this member will be published soon.'}
              </p>
            </div>

            {(member.linkedinUrl || member.instagramUrl) && (
              <div className="mt-5 flex justify-center gap-3 sm:justify-start">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${member.name} on LinkedIn`}
                    className="interactive-link rounded-full p-1 text-brand-ink/50 hover:text-brand-navy"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                )}
                {member.instagramUrl && (
                  <a
                    href={member.instagramUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${member.name} on Instagram`}
                    className="interactive-link rounded-full p-1 text-brand-ink/50 hover:text-brand-navy"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function MemberCard({ member }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const isLeadership = LEADERSHIP_ROLES.has(member.role);
  const meta = [member.department, member.year].filter(Boolean).join(' · ');

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="interactive-card group w-full cursor-pointer p-5 text-center"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-brand-skyDeep/50 transition-all duration-300 group-hover:ring-brand-navy/30">
          <Avatar name={member.name} photoUrl={member.photoUrl} />
        </div>

        <h3 className="mt-4 font-heading text-base font-semibold text-brand-navy dark:text-brand-white">
          {member.name}
        </h3>

        <p
          className={`mt-1 text-sm font-medium ${
            isLeadership ? 'text-brand-amber' : 'text-brand-ink/60 dark:text-brand-white/60'
          }`}
        >
          {member.role}
        </p>

        {meta && <p className="mt-1 text-xs text-brand-ink/45 dark:text-brand-white/45">{meta}</p>}

        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-brand-navy/45 dark:text-brand-white/45">
          View role
        </p>
      </motion.button>

      <MemberDetailModal
        member={member}
        open={open}
        onClose={() => setOpen(false)}
        titleId={titleId}
      />
    </>
  );
}
