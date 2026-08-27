'use client';

import { motion } from 'framer-motion';

const LEADERSHIP_ROLES = new Set(['Chair', 'Vice Chair', 'Faculty Advisor']);

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
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-brand-sky font-heading text-2xl font-semibold text-brand-indigo"
    >
      {initials}
    </div>
  );
}

export default function MemberCard({ member }) {
  const isLeadership = LEADERSHIP_ROLES.has(member.role);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl border border-brand-skyDeep/60 bg-white/70 p-5 text-center shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-brand-skyDeep/50">
        <Avatar name={member.name} photoUrl={member.photoUrl} />
      </div>

      <h3 className="mt-4 font-heading text-base font-semibold text-brand-ink">{member.name}</h3>

      <p
        className={`mt-1 text-sm font-medium ${
          isLeadership ? 'text-brand-amber' : 'text-brand-ink/60'
        }`}
      >
        {member.role}
      </p>

      {member.bio && <p className="mt-2 text-xs leading-relaxed text-brand-ink/50">{member.bio}</p>}

      {(member.linkedinUrl || member.instagramUrl) && (
        <div className="mt-3 flex justify-center gap-3 text-brand-ink/50">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${member.name} on LinkedIn`}
              className="transition-colors hover:text-brand-indigo"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          )}
          {member.instagramUrl && (
            <a
              href={member.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${member.name} on Instagram`}
              className="transition-colors hover:text-brand-indigo"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
