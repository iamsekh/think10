/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Zap, Clock, Shield, Brain, TrendingUp, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Brain,
    title: 'Retail Strategy Intelligence',
    desc: 'Get instant, expert-level answers on GCC retail operations, sourcing strategies, and brand positioning — powered by advisor-trained AI.',
    color: 'bg-emerald-50 border-emerald-100',
    iconColor: 'text-emerald-600 bg-emerald-100',
  },
  {
    icon: TrendingUp,
    title: 'Marketplace Optimization',
    desc: 'Diagnose Amazon UAE & Noon listing performance, FBN/FBA logistics gaps, and ad spend efficiency in real time.',
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600 bg-blue-100',
  },
  {
    icon: Shield,
    title: 'UAE Regulatory Guidance',
    desc: 'Navigate DED licensing, customs, and VAT compliance with precise, jurisdiction-specific answers — no ambiguity.',
    color: 'bg-purple-50 border-purple-100',
    iconColor: 'text-purple-600 bg-purple-100',
  },
  {
    icon: Zap,
    title: 'Cash Flow & Margin Modeling',
    desc: 'Stress-test your inventory finances, supplier payment terms, and price margins with AI-driven scenario modeling.',
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-600 bg-amber-100',
  },
];

const SAMPLE_PROMPTS = [
  'How do I get Prime delivery badge on Amazon UAE?',
  'Best way to split supplier deposits for cash flow?',
  'What DED license do I need for a Dubai boutique?',
  'How to lower my CAC on Noon marketplace?',
  'Should I use FBN or FBA for my product category?',
];

const STATS = [
  { value: '24/7', label: 'Always available' },
  { value: '<3s', label: 'Response time' },
  { value: '400M+', label: 'AED advised' },
  { value: '100%', label: 'Confidential' },
];

export default function ConsultationSimulator() {
  return (
    <section id="simulator" className="py-28 bg-[#F4FCF9] relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-emerald-400/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-300/8 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white border border-emerald-100 px-4 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase">24/7 AI Business Advisor</span>
            </div>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              Meet<br />
              <span className="text-emerald-500">Zyne AI.</span>
            </h2>
          </div>
          <p className="font-sans text-gray-500 text-base leading-relaxed max-w-sm lg:text-right">
            Your always-on AI retail advisor — trained on GCC market expertise and elite human consultant knowledge.
          </p>
        </motion.div>

        {/* Main Grid - Full width capabilities */}
        <div className="space-y-6">

          {/* Capabilities Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-6 rounded-2xl border ${cap.color} hover:shadow-md transition-all duration-300 group`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${cap.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-base mb-2 leading-tight">
                    {cap.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-500 leading-relaxed">
                    {cap.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-4 gap-4"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
                <div className="font-heading font-extrabold text-3xl text-emerald-500 mb-1">{stat.value}</div>
                <div className="font-sans text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
