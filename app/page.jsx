import Loader from '@/components/layout/Loader';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import MembersGrid from '@/components/sections/MembersGrid';
import AboutUs from '@/components/sections/AboutUs';
import EventsSection from '@/components/sections/EventsSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';

/**
 * Single-page site map (scroll sections):
 *   #home     → Hero
 *   #members  → MembersGrid
 *   #about    → AboutUs
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
