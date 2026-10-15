import PageHeader from '@/components/layout/PageHeader';
import ContactSection from '@/components/sections/ContactSection';
import { COPY, pageById } from '@/lib/site';

export const metadata = {
  title: COPY.pages.contact.title,
  description: COPY.pages.contact.description,
};

export default function ContactPage() {
  const page = pageById('contact');
  return (
    <>
      <PageHeader index={page.index} label={page.navLabel} title={COPY.contact.heading} intro={COPY.contact.intro} />
      <ContactSection />
    </>
  );
}
