import Lemniscate from '@/components/ui/Lemniscate';
import { CLUB_SHORT } from '@/lib/site';

/**
 * Intro: the ∞ curve draws itself, then the sheet lifts. Pure CSS (.intro in globals.css), so it
 * covers the page from first paint. Skipped on repeat visits in a session (see app/layout.jsx)
 * and for reduced motion.
 */
export default function Loader() {
  return (
    <div aria-hidden="true" className="intro fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg">
      <Lemniscate className="w-64 sm:w-80" />
      <p className="mt-8 font-heading text-2xl font-semibold tracking-[0.18em] text-fg">{CLUB_SHORT}</p>
      <p className="mt-2 font-serif text-base italic text-muted">(x² + y²)² = a²(x² − y²)</p>
    </div>
  );
}
