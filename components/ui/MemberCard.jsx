'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { metaOf } from '@/lib/format';

/** Office-bearer tile: role, name, department · year. Opens the member dialog. */
export default function MemberCard({ member, onOpen }) {
  return (
    <button
      type="button"
      onClick={(event) => onOpen(member, event.currentTarget)}
      aria-haspopup="dialog"
      className="card card-hover group flex h-full w-full flex-col p-5 text-left transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgb(var(--fg)/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-6"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-gold">{member.role}</span>
        <span aria-hidden="true" className="text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100">
          +
        </span>
      </span>
      <h3 className="mt-10 font-heading text-xl font-semibold leading-snug text-fg xl:text-2xl">{member.name}</h3>
      {metaOf(member) && <p className="mt-1 font-mono text-xs text-muted">{metaOf(member)}</p>}
    </button>
  );
}

export function MemberDialog({ member, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!member) return undefined;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      // Keep keyboard focus inside the dialog
      const focusables = dialogRef.current.querySelectorAll('a[href], button');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close member details"
            className="absolute inset-0 bg-bg/80"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-dialog-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-md border border-fg/15 bg-card shadow-xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-md text-fg transition-colors hover:bg-fg/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              {member.team && <p className="chip">{member.team}</p>}
              <h3 id="member-dialog-title" className="mt-4 pr-10 font-heading text-2xl font-semibold text-fg">
                {member.name}
              </h3>
              <p className="mt-1 font-medium text-gold">{member.role}</p>
              {metaOf(member) && <p className="mt-1 font-mono text-xs text-muted">{metaOf(member)}</p>}

              <p className="mt-6 text-sm font-medium text-fg">Role responsibilities</p>
              <p className="mt-2 text-sm leading-relaxed text-fg/85">
                {member.responsibilities || 'Role responsibilities for this member will be published soon.'}
              </p>

              {(member.linkedinUrl || member.instagramUrl) && (
                <div className="mt-6 flex gap-4 text-sm">
                  {member.linkedinUrl && (
                    <a href={member.linkedinUrl} target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
                      LinkedIn ↗
                    </a>
                  )}
                  {member.instagramUrl && (
                    <a href={member.instagramUrl} target="_blank" rel="noreferrer noopener" className="text-accent hover:underline">
                      Instagram ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
