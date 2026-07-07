/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBrands from './components/TrustBrands';
import ShortAbout from './components/ShortAbout';
import ExplainerVideo from './components/ExplainerVideo';
import TheTenDimensions from './components/TheTenDimensions';
import ConsultationSimulator from './components/ConsultationSimulator';
import ScalingAssessment from './components/ScalingAssessment';
import ExpertNetwork from './components/ExpertNetwork';
import Testimonials from './components/Testimonials';
import Blogs from './components/Blogs';
import PricingRoi from './components/PricingRoi';
import BespokeCTA from './components/BespokeCTA';
import Footer from './components/Footer';
import ZyneChatWidget from './components/ZyneChatWidget';

export default function App() {
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
    <div id="think10-app" className="min-h-screen bg-white text-[#0F172A] font-sans selection:bg-[#68E8C4]/20 selection:text-[#0B1220]">
      {/* Executive Header */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Hero Boardroom Section */}
      <Hero onNavigate={handleNavigate} />

      {/* Trust & Client Logos */}
      <TrustBrands />

      {/* Short About Section */}
      <ShortAbout />

      {/* Explainer Video */}
      <ExplainerVideo />

      {/* Proprietary 10 Dimensions */}
      <TheTenDimensions />

      {/* Interactive Boardroom Simulator */}
      <ConsultationSimulator />

      {/* Enterprise Scorecard Self-Assessment */}
      <ScalingAssessment />

      {/* Elite Advisory Board Network */}
      <ExpertNetwork />

      {/* Testimonials */}
      <Testimonials />

      {/* Blogs & Insights */}
      <Blogs />

      {/* Investment Tiers & ROI Calculator */}
      <PricingRoi />

      {/* Confidential Application Form */}
      <BespokeCTA />

      {/* Premium Executive Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Zyne AI Chat Widget */}
      <ZyneChatWidget />
    </div>
  );
}

