'use client';

import { useCallback, useRef, useState } from 'react';
import MemberCard, { MemberDialog } from '@/components/ui/MemberCard';
import { LEADERSHIP_ROLES, metaOf } from '@/lib/format';
import Reveal, { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { COPY } from '@/lib/site';

const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

/** Committee roster: faculty, office bearers, then every team as a list. Any name opens its role details. */
export default function TeamBrowser({ members }) {
  const [selected, setSelected] = useState(null);
  const triggerRef = useRef(null);

  const faculty = members.filter((m) => m.team === 'Faculty');
  const leaders = LEADERSHIP_ROLES.flatMap((role) => members.filter((m) => m.role === role));
  // Office bearers who head a team (e.g. Technical Head) are also listed under that team.
  const others = members.filter(
    (m) => !faculty.includes(m) && !(leaders.includes(m) && (!m.team || m.team === 'Leadership')),
  );
  const teams = [...new Set(others.map((m) => m.team || 'Members'))].map((team) => [
    team,
    others.filter((m) => (m.team || 'Members') === team),
  ]);

  const open = useCallback((member, trigger) => {
    triggerRef.current = trigger;
    setSelected(member);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      {faculty.map((member) => (
        <Reveal key={member.id}>
          <button
            type="button"
            onClick={(event) => open(member, event.currentTarget)}
            aria-haspopup="dialog"
            className={`group mt-6 flex w-full flex-col gap-2 border-y border-fg/15 py-8 text-left sm:flex-row sm:items-end sm:justify-between ${FOCUS_RING}`}
          >
            <span>
              <span className="block text-sm font-medium text-gold">{member.role}</span>
              <span className="mt-2 block font-heading text-3xl font-semibold text-fg transition-colors group-hover:text-accent sm:text-5xl">
                {member.name}
              </span>
            </span>
            {metaOf(member) && <span className="font-mono text-xs text-muted">{metaOf(member)}</span>}
          </button>
        </Reveal>
      ))}

      {leaders.length > 0 && (
        <div className="mt-16">
          <Reveal>
            <h3 className="font-heading text-2xl font-semibold text-fg">{COPY.members.leadershipLabel}</h3>
          </Reveal>
          <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {leaders.map((member) => (
              <StaggerItem key={member.id}>
                <MemberCard member={member} onOpen={open} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      )}

      <div className="mt-20 grid gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {teams.map(([team, list]) => (
          <Reveal as="section" key={team}>
            <h3 className="flex items-baseline justify-between border-b border-fg/30 pb-3 font-heading text-xl font-semibold text-fg">
              {team}
              <span className="font-mono text-xs font-normal text-muted">{list.length}</span>
            </h3>
            <ul>
              {list.map((member) => (
                <li key={member.id}>
                  <button
                    type="button"
                    onClick={(event) => open(member, event.currentTarget)}
                    aria-haspopup="dialog"
                    className={`group flex w-full items-baseline justify-between gap-4 border-b border-fg/10 py-3 text-left ${FOCUS_RING}`}
                  >
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                      <span className="block font-medium text-fg transition-colors group-hover:text-accent">{member.name}</span>
                      <span className="block text-sm text-muted">{member.role}</span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-muted">{metaOf(member)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <MemberDialog member={selected} onClose={close} />
    </>
  );
}
