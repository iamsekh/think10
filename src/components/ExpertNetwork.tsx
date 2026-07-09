/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ADVISORY_EXPERTS } from '../data';
import { AdvisoryExpert } from '../types';
import { Users, Shield, Briefcase, FileText, CheckCircle2, X } from 'lucide-react';

export default function ExpertNetwork() {
  const [selectedExpert, setSelectedExpert] = useState<AdvisoryExpert | null>(null);

  // Mock Case Logs for interactive modal
  const caseLogs: Record<string, { company: string; challenge: string; solution: string; outcome: string }> = {
    amira: {
      company: 'Maison de Fleur (Dubai Boutique)',
      challenge: 'Expanding a physical Dubai boutique to a second Abu Dhabi location during retail rent rises.',
      solution: 'Amira audited the storefront traffic flow, restructured floor space efficiency, and trained local sales staff on upsell protocols.',
      outcome: 'Successfully launched the Abu Dhabi store and increased omnichannel sales by 180%.'
    },
    fatima: {
      company: 'Zora Beauty',
      challenge: 'High customer acquisition cost (CAC) and listing visibility limitations on Noon UAE and Amazon UAE.',
      solution: 'Fatima calibrated exact-match keyword search indexing and restructured FBN/FBA logistics inventory placement.',
      outcome: 'Cut customer acquisition costs by 35% and gained Noon Express/Amazon Prime delivery badging.'
    },
    sarah: {
      company: 'GCC Lifestyle Brand',
      challenge: 'Inconsistent visual brand messaging and low unboxing experience ratings, restricting repeat orders.',
      solution: 'Sarah redesigned the core brand narrative typography and constructed luxury packaging boxes tailored to GCC premium tastes.',
      outcome: 'Boosted customer repeat purchase rate by 25% within three months of brand update.'
    },
    marcus: {
      company: 'Home & Kitchen UAE',
      challenge: 'Cash flow constraints from factory manufacturers demanding 100% upfront deposits before peak Q4 holiday shipments.',
      solution: 'Marcus negotiated supplier payment splits (30/70 terms) and secured non-dilutive inventory advance lines.',
      outcome: 'Fully funded the holiday order schedule while preserving cash runway and founder equity control.'
    }
  };

  return (
    <section id="experts" className="py-[50px] bg-[#F4FCF9] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 rounded-full">
            <Users className="w-4 h-4 text-[#68E8C4]" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#0F172A] uppercase">Think10 Consultants</span>
          </div>
          <h2 className="font-heading font-extrabold text-[#0B1220] text-3xl md:text-4xl tracking-tight leading-tight">
            Vetted <span className="text-[#68E8C4]">UAE retail & e-commerce</span> experts.
          </h2>
          <p className="font-sans text-[#475569] text-base leading-relaxed">
            Think10 connects you with senior advisors who have built and run retail chains and e-commerce platforms in the Middle East. Book strategic sessions directly to resolve operations, margins, and marketing.
          </p>
        </div>

        {/* Experts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVISORY_EXPERTS.map((expert) => (
            <div
              key={expert.id}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-[#475569]/30"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="relative">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-16 h-16 rounded-xl object-cover grayscale border border-[#E2E8F0]"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white border border-[#E2E8F0] p-1 rounded-md text-[#68E8C4]">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Names */}
                <div className="space-y-1">
                  <h3 className="font-heading font-extrabold text-base text-[#0B1220]">
                    {expert.name}
                  </h3>
                  <p className="font-sans text-xs text-[#68E8C4] font-semibold">
                    {expert.role}
                  </p>
                  <p className="text-[10px] font-mono text-[#475569]/80 font-medium bg-[#E2E8F0]/50 py-1 px-2 rounded inline-block">
                    {expert.formerRole}
                  </p>
                </div>

                {/* Specialties */}
                <div className="space-y-2 pt-3 border-t border-[#E2E8F0]">
                  <p className="text-[10px] font-mono text-[#475569] uppercase font-bold tracking-wider">Specialization</p>
                  <p className="font-sans text-xs text-[#0B1220] font-semibold flex items-center space-x-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                    <span>{expert.specialty}</span>
                  </p>
                </div>

                {/* Bio snippet */}
                <p className="font-sans text-xs text-[#475569] leading-relaxed">
                  {expert.bio}
                </p>
              </div>

              {/* Case trigger button */}
              <button
                id={`btn-expert-case-log-${expert.id}`}
                onClick={() => setSelectedExpert(expert)}
                className="mt-6 w-full py-2 bg-white hover:bg-emerald-50 hover:text-emerald-700 text-[#0B1220] border border-[#E2E8F0] hover:border-emerald-200 font-sans text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer focus:outline-none"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Book Session & View Case Log</span>
              </button>
            </div>
          ))}
        </div>

        {/* Modal Case Log View */}
        <AnimatePresence>
          {selectedExpert && (
            <div id="expert-case-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                id="expert-case-modal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-[#E2E8F0] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
              >
                {/* Header */}
                <div className="bg-emerald-50 text-emerald-900 p-6 flex justify-between items-start border-b border-emerald-100">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest font-bold">Advisory Case Study</span>
                    <h3 className="font-heading font-extrabold text-lg leading-tight">{selectedExpert.name} Case Study</h3>
                    <p className="text-xs text-emerald-700/80 font-mono">{selectedExpert.formerRole}</p>
                  </div>
                  <button
                    id="btn-expert-modal-close"
                    onClick={() => setSelectedExpert(null)}
                    className="text-emerald-900/60 hover:text-emerald-900 p-1 hover:bg-emerald-200/50 rounded transition-colors focus:outline-none cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                  <div className="space-y-1 bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                    <span className="text-[9px] font-mono uppercase text-[#475569]/60 font-bold block">Advisory Client Entity</span>
                    <p className="font-heading font-bold text-sm text-[#0B1220]">
                      {caseLogs[selectedExpert.id]?.company || 'Enterprise Venture Client'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Challenge */}
                    <div className="space-y-1.5">
                      <h4 className="font-heading font-bold text-xs text-[#0B1220] uppercase tracking-wider">Identified Operational Challenge</h4>
                      <p className="font-sans text-xs text-[#475569] leading-relaxed">
                        {caseLogs[selectedExpert.id]?.challenge || 'Scale validation and capital modeling friction.'}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="space-y-1.5">
                      <h4 className="font-heading font-bold text-xs text-[#0B1220] uppercase tracking-wider">Think10 Partner Intervention</h4>
                      <p className="font-sans text-xs text-[#475569] leading-relaxed">
                        {caseLogs[selectedExpert.id]?.solution || 'Deploying automated ledger synchronization paired with direct legal contract audits.'}
                      </p>
                    </div>

                    {/* Outcome */}
                    <div className="pt-3 border-t border-[#E2E8F0] space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-[#68E8C4]">
                        <CheckCircle2 className="w-4 h-4" />
                        <h4 className="font-heading font-bold text-xs uppercase tracking-wider">Calibrated Scale Outcome</h4>
                      </div>
                      <p className="font-sans text-xs font-semibold text-[#0B1220] leading-relaxed">
                        {caseLogs[selectedExpert.id]?.outcome || 'Successful board syndication and runway optimization.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer close */}
                <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 flex justify-between items-center">
                  <button
                    id="btn-expert-modal-close-footer"
                    onClick={() => {
                      setSelectedExpert(null);
                      const briefingEl = document.getElementById('briefing');
                      if (briefingEl) briefingEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-xs font-semibold rounded-lg transition-colors cursor-pointer focus:outline-none"
                  >
                    Book Strategic Session
                  </button>
                  <button
                    id="btn-expert-modal-close-footer-secondary"
                    onClick={() => setSelectedExpert(null)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#0B1220] font-sans text-xs font-semibold rounded-lg transition-colors cursor-pointer focus:outline-none"
                  >
                    Close Log
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
