import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import MembersGrid from '@/components/MembersGrid';
import AboutUs from '@/components/AboutUs';
import EventsSection from '@/components/EventsSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />

      <main className="relative">
        <Loader />
        <Hero />
        <MembersGrid />
        <AboutUs />
        <EventsSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
