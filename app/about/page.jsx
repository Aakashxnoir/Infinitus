import PageHeader from '@/components/layout/PageHeader';
import AboutUs from '@/components/sections/AboutUs';
import { COPY, pageById } from '@/lib/site';

export const metadata = {
  title: COPY.pages.about.title,
  description: COPY.pages.about.description,
};

export default function AboutPage() {
  const page = pageById('about');
  return (
    <>
      <PageHeader index={page.index} label={page.navLabel} title={COPY.about.focusQuote} intro={COPY.about.body} />
      <AboutUs />
    </>
  );
}
