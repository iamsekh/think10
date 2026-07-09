/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export default function TrustBrands() {
  const brands = [
    { name: 'DED DUBAI', subtitle: 'Trade licensed' },
    { name: 'ADGM', subtitle: 'Asset security' },
    { name: 'DIFC', subtitle: 'Regulatory compliance' },
    { name: 'DUBAI CHAMBER', subtitle: 'Chamber registry' },
    { name: 'NOON PARTNER', subtitle: 'Marketplace scale' },
    { name: 'AMAZON UAE', subtitle: 'Global reach' }
  ];

  const tripleBrands = [...brands, ...brands, ...brands];

  return (
    <section id="trust-brands" className="py-[50px] bg-[#F8FAFC] border-y border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-2 bg-white rounded-full shadow-sm border border-[#E2E8F0] mb-2">
            <ShieldCheck className="w-5 h-5 text-[#059669]" />
          </div>
          <h3 className="text-sm font-heading font-bold uppercase tracking-[0.2em] text-[#475569] text-center">
            Trust & Compliance Anchored In
          </h3>
        </div>
      </div>

      <div className="relative w-full flex overflow-hidden group">
        {/* Left/Right Fade out masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none"></div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center space-x-16 md:space-x-32 w-max px-8"
        >
          {tripleBrands.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              <span className="font-heading font-extrabold text-[#0B1220] text-xl md:text-3xl tracking-widest uppercase">
                {brand.name}
              </span>
              <span className="text-[10px] md:text-xs font-mono tracking-widest text-[#059669] uppercase mt-2">
                {brand.subtitle}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
