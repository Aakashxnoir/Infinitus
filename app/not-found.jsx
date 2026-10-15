import Link from 'next/link';
import Lemniscate from '@/components/ui/Lemniscate';
import { COPY } from '@/lib/site';

export const metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="graph-paper pointer-events-none absolute inset-0" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">404 · lim x→∞</p>
          <h1 className="h-display mt-6">{COPY.notFound.heading}</h1>
          <p className="lede mt-6 max-w-md">{COPY.notFound.body}</p>
          <Link href="/" className="btn-primary mt-10">
            <span aria-hidden="true">←</span> {COPY.notFound.cta}
          </Link>
        </div>
        <Lemniscate axes dot draw className="w-full" />
      </div>
    </section>
  );
}
