/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ArrowRight, CheckCircle2, Lock, Send, Loader2 } from 'lucide-react';

export default function BespokeCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    stage: 'Planning & Sourcing Phase',
    bottleneck: 'brand',
    narrative: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const bottleneckOptions = [
    { value: 'brand', label: 'Brand Development & Positioning' },
    { value: 'retail-ops', label: 'Retail Storefront Operations' },
    { value: 'marketplace', label: 'Noon, Amazon & Marketplace Strategy' },
    { value: 'pricing', label: 'Pricing & Margin Optimization' },
    { value: 'cashflow', label: 'Cash Flow & Sourcing Management' },
    { value: 'marketing', label: 'Omnichannel Marketing & Growth' }
  ];

  const fundingStages = [
    'Planning & Sourcing Phase',
    'Launched Online Store (Shopify/Noon/Amazon)',
    'Physical Boutique Storefront',
    'Omnichannel Scale-up'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    setIsSubmitting(true);

    // Simulate elite board review processing and generation of security ticket
    setTimeout(() => {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      setTicketNumber(`T10-2026-${randNum}`);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="briefing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Vetting Vibe Column (Left 5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center space-x-2 bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-1.5 rounded-full shadow-xs">
              <Lock className="w-3.5 h-3.5 text-[#68E8C4]" />
              <span className="text-xs font-mono font-semibold tracking-tight text-[#0F172A]">
                Advisory Onboarding System
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading font-extrabold text-[#0B1220] text-3xl md:text-4xl tracking-tight leading-tight">
                Ready to build your business <span className="text-[#68E8C4]">with confidence</span>?
              </h2>
              <p className="font-sans text-sm md:text-base text-[#475569] leading-relaxed">
                Join Think10 today or schedule a discovery call with one of our lead consultants to find the perfect strategy for your brand.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0B1220]">Advisory Protocols</h4>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#68E8C4] mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="font-sans text-xs text-[#475569] leading-relaxed">
                    <strong>Secure brand data:</strong> Your storefront statistics, margins, and supplier terms are completely private and never shared with secondary platforms.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#68E8C4] mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="font-sans text-xs text-[#475569] leading-relaxed">
                    <strong>Consultant review:</strong> Your onboarding details are reviewed by our lead consultants before your first session to ensure immediate value.
                  </p>
                </div>
              </div>
            </div>

            {/* Shield seal badge */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex items-center space-x-3.5 max-w-sm">
              <ShieldAlert className="w-8 h-8 text-[#68E8C4] shrink-0" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#0B1220] font-bold">Pre-Session NDA Authorization</p>
                <p className="text-[11px] text-[#475569] leading-normal font-sans">
                  We secure mutual NDAs to protect your margins, sourcing paths, and business data.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Form Panel (Right 7 Columns) */}
          <div className="lg:col-span-7">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 md:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    id="confidential-apply-form"
                    key="application-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Grid Name and Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="input-founder-name" className="text-[10px] font-mono text-[#0B1220] uppercase font-bold tracking-wider">
                          Founder Full Name
                        </label>
                        <input
                          id="input-founder-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Yasmin Al-Maktoum"
                          className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#68E8C4]"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="input-founder-email" className="text-[10px] font-mono text-[#0B1220] uppercase font-bold tracking-wider">
                          Contact Email
                        </label>
                        <input
                          id="input-founder-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="yasmin@maisonfleur.ae"
                          className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#68E8C4]"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Company and Funding Stage */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="input-company-name" className="text-[10px] font-mono text-[#0B1220] uppercase font-bold tracking-wider">
                          Brand / Company Name
                        </label>
                        <input
                          id="input-company-name"
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Maison de Fleur Boutique"
                          className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#68E8C4]"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="select-funding-stage" className="text-[10px] font-mono text-[#0B1220] uppercase font-bold tracking-wider">
                          Business Stage
                        </label>
                        <select
                          id="select-funding-stage"
                          value={formData.stage}
                          onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                          className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#68E8C4] cursor-pointer"
                          disabled={isSubmitting}
                        >
                          {fundingStages.map((stg) => (
                            <option key={stg} value={stg}>{stg}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Bottleneck Dimension */}
                    <div className="space-y-1.5">
                      <label htmlFor="select-bottleneck-dimension" className="text-[10px] font-mono text-[#0B1220] uppercase font-bold tracking-wider">
                        Primary Growth Challenge
                      </label>
                      <select
                        id="select-bottleneck-dimension"
                        value={formData.bottleneck}
                        onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                        className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#68E8C4] cursor-pointer"
                        disabled={isSubmitting}
                      >
                        {bottleneckOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Operational Narrative */}
                    <div className="space-y-1.5">
                      <label htmlFor="textarea-operational-narrative" className="text-[10px] font-mono text-[#0B1220] uppercase font-bold tracking-wider">
                        Tell us about your brand (Optional)
                      </label>
                      <textarea
                        id="textarea-operational-narrative"
                        value={formData.narrative}
                        onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
                        placeholder="Briefly describe your products, current channels, and what you aim to scale..."
                        className="w-full h-24 p-3 bg-white border border-[#E2E8F0] rounded-lg text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#68E8C4] resize-none"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Button */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        id="btn-confidential-submit"
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.email || !formData.company}
                        className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-sans text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-2 focus:outline-none cursor-pointer shadow-xs"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#68E8C4]" />
                            <span>Securing Details...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Join Think10</span>
                          </>
                        )}
                      </button>
                      <button
                        id="btn-discovery-call"
                        type="button"
                        onClick={() => {
                          window.open('https://calendly.com', '_blank');
                        }}
                        className="w-full py-3.5 bg-white border border-[#E2E8F0] hover:border-emerald-500 text-gray-900 font-sans text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-2 focus:outline-none cursor-pointer"
                      >
                        <span>Book Discovery Call</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  /* Success Screen */
                  <motion.div
                    id="cta-success-screen"
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#68E8C4]/10 flex items-center justify-center text-[#68E8C4] border border-[#68E8C4]/25">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase bg-[#68E8C4]/10 text-[#68E8C4] tracking-widest px-3 py-1 rounded-full font-bold border border-[#68E8C4]/10">
                        Request Confirmed
                      </span>
                      <h3 className="font-heading font-extrabold text-[#0B1220] text-xl">
                        Discovery Call Queued
                      </h3>
                      <p className="font-sans text-xs text-[#475569] leading-relaxed max-w-sm">
                        Thank you, <strong className="text-[#0B1220]">{formData.name}</strong>. Your brand details are secured, and we have queued your discovery call registration. A consultant will contact you shortly.
                      </p>
                    </div>

                    {/* Ticket receipt info */}
                    <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-xl p-4 space-y-3 text-left">
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#475569]/80">
                        <span>Transmission Ticket</span>
                        <span className="font-bold text-[#0B1220]">{ticketNumber}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#475569]/80">
                        <span>Response Protocol</span>
                        <span className="font-bold text-[#68E8C4]">SLA Confirmation (&lt; 12 Hours)</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#475569]/80">
                        <span>Email Target</span>
                        <span className="font-bold text-[#0B1220]">{formData.email}</span>
                      </div>
                    </div>

                    <p className="text-[10px] font-mono text-[#475569]/60">
                      🔒 All data is completely secure and protected under mutual NDAs.
                    </p>

                    <button
                      id="btn-success-reset"
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-emerald-500 text-[10px] font-sans font-bold text-gray-900 rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
