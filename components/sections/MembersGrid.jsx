import { getMembers } from '@/lib/members';
import { COPY } from '@/lib/site';
import MemberCard from '@/components/ui/MemberCard';
import Reveal from '@/components/ui/Reveal';

export const revalidate = 60;

export default async function MembersGrid() {
  const members = await getMembers();

  return (
    <section id="members" className="scroll-mt-24 px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-brand-indigo/70">
            {COPY.members.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-ink sm:text-4xl">
            {COPY.members.heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => (
            <Reveal key={member.id} delay={Math.min(i * 0.05, 0.3)}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
