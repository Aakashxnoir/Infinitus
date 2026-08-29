import { getMembers } from '@/lib/members';
import { COPY } from '@/lib/site';
import MemberCard from '@/components/ui/MemberCard';
import Reveal from '@/components/ui/Reveal';

export const revalidate = 60;

export default async function MembersGrid() {
  const members = await getMembers();

  return (
    <section id="members" className="section-shell section-pad scroll-mt-20">
      <div className="section-inner">
        <Reveal className="text-center">
          <p className="page-eyebrow">{COPY.members.eyebrow}</p>
          <h2 className="page-heading mt-3">{COPY.members.heading}</h2>
          <p className="page-muted mt-3">
            <span className="md:hidden">Tap a member to view their role responsibilities.</span>
            <span className="hidden md:inline">
              Click a member to view their role responsibilities.
            </span>
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
          {members.map((member, i) => (
            <Reveal key={member.id} delay={Math.min(i * 0.03, 0.25)}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
