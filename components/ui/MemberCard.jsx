'use client';

import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LEADERSHIP_ROLES = new Set([
  'Faculty Coordinator',
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
      className="flex h-full w-full items-center justify-center bg-brand-sky font-heading text-xl font-semibold text-black dark:bg-brand-navyMid dark:text-white sm:text-2xl"
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
            className="relative z-10 w-full max-w-lg rounded-card border border-brand-skyDeep/50 bg-white p-6 shadow-md dark:border-white/10 dark:bg-brand-navy sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="interactive-icon-btn absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-black/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-skyDeep/60 dark:ring-white/15 sm:h-24 sm:w-24">
                <Avatar name={member.name} photoUrl={member.photoUrl} />
              </div>

              <div className="mt-4 sm:ml-5 sm:mt-0 sm:flex-1">
                <h3 id={titleId} className="font-heading text-xl font-semibold text-black dark:text-white">
                  {member.name}
                </h3>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    isLeadership ? 'text-brand-amber' : 'text-black/70 dark:text-white/70'
                  }`}
                >
                  {member.role}
                </p>
                {member.team && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-black/55 dark:text-white/55">
                    {member.team}
                  </p>
                )}
                {meta && <p className="mt-1 text-xs text-black/45 dark:text-white/45">{meta}</p>}
              </div>
            </div>

            <div className="mt-6 border-t border-brand-skyDeep/40 pt-5 dark:border-white/10">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
                Role responsibilities
              </p>
              <p className="mt-3 text-sm leading-relaxed text-black/75 dark:text-white/75">
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
                    className="interactive-link flex h-11 w-11 items-center justify-center rounded-full text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
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
                    className="interactive-link flex h-11 w-11 items-center justify-center rounded-full text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
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
        className="interactive-card group w-full cursor-pointer p-3 text-center sm:p-4 md:p-5"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <div className="mx-auto h-16 w-16 overflow-hidden rounded-full ring-2 ring-brand-skyDeep/50 transition-all duration-300 group-hover:ring-black/25 dark:ring-white/15 dark:group-hover:ring-white/35 sm:h-20 sm:w-20 md:h-24 md:w-24">
          <Avatar name={member.name} photoUrl={member.photoUrl} />
        </div>

        <h3 className="mt-3 font-heading text-sm font-semibold leading-snug text-black dark:text-white sm:mt-4 sm:text-base">
          {member.name}
        </h3>

        <p
          className={`mt-1 text-xs font-medium leading-snug sm:text-sm ${
            isLeadership ? 'text-brand-amber' : 'text-black/65 dark:text-white/65'
          }`}
        >
          {member.role}
        </p>

        {meta && <p className="mt-1 text-[11px] text-black/50 dark:text-white/50 sm:text-xs">{meta}</p>}

        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-black/45 dark:text-white/45 sm:mt-3 sm:text-[11px] sm:tracking-[0.16em]">
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
