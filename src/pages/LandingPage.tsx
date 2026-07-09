import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBrands from '../components/TrustBrands';
import ShortAbout from '../components/ShortAbout';
import ExplainerVideo from '../components/ExplainerVideo';
import TheTenDimensions from '../components/TheTenDimensions';
import ConsultationSimulator from '../components/ConsultationSimulator';
import ScalingAssessment from '../components/ScalingAssessment';
import ExpertNetwork from '../components/ExpertNetwork';
import Testimonials from '../components/Testimonials';
import Blogs from '../components/Blogs';
import PricingRoi from '../components/PricingRoi';
import BespokeCTA from '../components/BespokeCTA';
import Footer from '../components/Footer';
import ZyneChatWidget from '../components/ZyneChatWidget';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll routing function
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Active section tracking scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'dimensions', 'simulator', 'scorecard', 'experts', 'testimonials', 'insights', 'pricing', 'briefing'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header onNavigate={handleNavigate} activeSection={activeSection} />
      <Hero onNavigate={handleNavigate} />
      <TrustBrands />
      <ShortAbout />
      <ExplainerVideo />
      <TheTenDimensions />
      <ConsultationSimulator />
      <ScalingAssessment />
      <ExpertNetwork />
      <Testimonials />
      <Blogs />
      <PricingRoi />
      <BespokeCTA />
      <Footer onNavigate={handleNavigate} />
      <ZyneChatWidget />
    </>
  );
}
