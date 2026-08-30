import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import TickerSection from '@/components/home/TickerSection';
import ServicesTeaser from '@/components/home/ServicesTeaser';
import ManifestoSection from '@/components/home/ManifestoSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export const metadata = {
  title: 'The Story Circuit | Creative Media Agency',
  description: 'We craft cinematic stories that sell. Premium video production, brand reels, and creative direction.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TickerSection />
        <ManifestoSection />
        <ServicesTeaser />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
