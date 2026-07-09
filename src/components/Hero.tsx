/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="pt-[146px] pb-[50px] relative bg-[#F4FCF9] overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Scroll-animated background soft orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left bubble */}
        <motion.div 
          style={{ y: y1 }} 
          className="absolute top-[5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-emerald-400/20 blur-[100px]" 
        />
        {/* Right side bubble (smaller than before to balance) */}
        <motion.div 
          style={{ y: y2 }} 
          className="absolute top-[20%] right-[5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-emerald-300/20 blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Side: Copy and CTAs */}
        <div className="flex flex-col items-start text-left">
          <div className="space-y-6 mb-10 max-w-xl">
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl lg:text-[64px] tracking-tight leading-[1.1]"
            >
              Build your retail and e-commerce business <span className="text-emerald-500">with confidence</span>.
            </motion.h1>

            <motion.p
              id="hero-paragraph"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed"
            >
              Think10 combines your personal AI Business Advisor (Zyne AI) with exit-vetted human consultants to solve inventory, marketing, and marketplace challenges in real-time.
            </motion.p>
          </div>

          {/* CTA Group */}
          <motion.div
            id="hero-ctas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <button
              id="btn-hero-cta-primary"
              onClick={() => onNavigate('pricing')}
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-sm font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center space-x-2 focus:outline-none cursor-pointer"
            >
              <span>Start Your Membership</span>
            </button>
          </motion.div>

          {/* Checklist items */}
          <motion.div
            id="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
               <CheckCircle2 className="w-5 h-5 text-emerald-500" />
               <p className="font-sans text-sm md:text-base text-gray-700 font-medium">AED 400M+ Founder Sales Advised</p>
            </div>
            <div className="flex items-center space-x-3">
               <CheckCircle2 className="w-5 h-5 text-emerald-500" />
               <p className="font-sans text-sm md:text-base text-gray-700 font-medium">24/7 Zyne AI Support. Always available when you need it.</p>
            </div>
            <div className="flex items-center space-x-3">
               <CheckCircle2 className="w-5 h-5 text-emerald-500" />
               <p className="font-sans text-sm md:text-base text-gray-700 font-medium">100% Confidential Advisory with vetted experts.</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Empty placeholder for future video */}
        <div className="relative z-10 hidden lg:block w-full h-[600px]">
          {/* Deliberately left empty per user request */}
        </div>
      </div>
    </section>
  );
}
