import TeamBrowser from '@/components/ui/TeamBrowser';

/** Body of the Team page. */
export default function MembersGrid({ members }) {
  return (
    <section className="section !pt-10">
      <div className="container-x">
        <TeamBrowser members={members} />
      </div>
    </section>
  );
}
