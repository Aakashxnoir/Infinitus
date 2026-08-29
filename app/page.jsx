import Loader from '@/components/layout/Loader';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import MembersGrid from '@/components/sections/MembersGrid';
import EventsSection from '@/components/sections/EventsSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';

/**
 * Single-page site map (official navigation order):
 *   #home     → Hero
 *   #about    → AboutUs
 *   #members  → MembersGrid (Core Team)
 *   #events   → EventsSection
 *   #gallery  → GallerySection
 *   #contact  → ContactSection
 */
export default function Home() {
  return (
    <>
      <Loader />
      <Nav />

      <main className="relative">
        <Hero />
        <AboutUs />
        <MembersGrid />
        <EventsSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
