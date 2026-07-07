import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, Sparkles, Shield, Zap, Building2, Star } from 'lucide-react';

const PRICING_TIERS = [
  {
    id: 'zyne-ai',
    index: 0,
    name: 'Zyne AI',
    subtitle: 'Membership',
    price: 'AED 950',
    period: '/ month',
    tag: 'Starter',
    tagColor: 'bg-gray-100 text-gray-600',
    accentColor: 'emerald',
    icon: Sparkles,
    shortDesc: '24/7 AI-driven retail insights and tactical precision for new founders.',
    description: 'Designed for new founders launching their brand who need 24/7 AI-driven retail insights and tactical precision. Get instant answers on DED licensing, sourcing, and automated listing audits directly from the Zyne AI engine.',
    features: [
      '24/7 access to Zyne AI Business Advisor',
      'Instant answers on UAE DED licensing & sourcing',
      'E-commerce listing and pricing audit tools',
      'Access to Think10 Founder Community',
      'Library of GCC retail strategy resources',
    ],
    ctaText: 'Start with Zyne AI',
    popular: false,
    highlight: 'Best for new founders',
  },
  {
    id: 'human-consultant',
    index: 1,
    name: 'Human',
    subtitle: 'Consultant',
    price: 'AED 3,200',
    period: '/ month',
    tag: 'Most Popular',
    tagColor: 'bg-emerald-500 text-white',
    accentColor: 'emerald',
    icon: Shield,
    shortDesc: 'Hybrid AI power with elite live consultant support for active brands.',
    description: 'For active retail & e-commerce brands seeking hybrid AI power integrated with elite live consultant support. Get direct WhatsApp access and custom margin modeling from vetted founders.',
    features: [
      'Full Zyne AI Business Advisor access',
      '4 hours of 1-on-1 live consulting per month',
      'Direct WhatsApp access to your designated advisor',
      'Amazon UAE & Noon listing performance audits',
      'Custom cash flow & margin modeling dashboards',
      'Priority support SLA (under 24 hours)',
    ],
    ctaText: 'Talk to a Consultant',
    popular: true,
    highlight: 'Best for scaling brands',
  },
  {
    id: 'premium-advisory',
    index: 2,
    name: 'Premium',
    subtitle: 'Advisory',
    price: 'AED 7,500',
    period: '/ month',
    tag: 'Bespoke',
    tagColor: 'bg-gray-900 text-white',
    accentColor: 'emerald',
    icon: Zap,
    shortDesc: 'Dedicated board representation and aggressive negotiation for GCC brands.',
    description: 'For scaling GCC brands requiring dedicated board representation, aggressive negotiation, and high-touch audits. We act as your shadow executive board.',
    features: [
      'Unlimited Zyne AI + Priority escalations',
      '12 hours of 1-on-1 private advisory per month',
      'Bi-weekly operational strategy & cash flow audits',
      'Supplier and factory payment term negotiations',
      'Introduction logs with GCC distributor networks',
      'Emergency on-demand advisory support (24/7 SLA)',
    ],
    ctaText: 'Become Premium',
    popular: false,
    highlight: 'Best for board-level needs',
  },
  {
    id: 'enterprise',
    index: 3,
    name: 'Enterprise',
    subtitle: 'Matrix',
    price: 'Custom',
    period: 'pricing',
    tag: 'Enterprise',
    tagColor: 'bg-gray-900 text-emerald-400',
    accentColor: 'emerald',
    icon: Building2,
    shortDesc: 'Full M&A, exit planning, and complete omnichannel takeover for mature brands.',
    description: 'For mature GCC brands aiming for acquisition, international expansion, or complete omnichannel restructuring. Full shadow executive team deployment.',
    features: [
      'Everything in Premium Advisory',
      'M&A and exit strategy planning',
      'Global supply chain restructuring',
      'Dedicated on-site operational teams',
      'Custom API integrations with Zyne AI',
      'Board-level investor introduction network',
    ],
    ctaText: 'Contact Our Partners',
    popular: false,
    highlight: 'Best for M&A & exit',
  },
];

export default function PricingRoi() {
  const [activeId, setActiveId] = useState('human-consultant');

  const activeTier = PRICING_TIERS.find(t => t.id === activeId)!;
  const ActiveIcon = activeTier.icon;

  return (
    <section id="pricing" className="py-28 relative bg-[#F4FCF9] overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-400/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-300/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white border border-emerald-100 px-4 py-1.5 rounded-full shadow-sm">
                <Star className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" />
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase">Membership Access</span>
              </div>
              <h2 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
                Choose your<br />
                <span className="text-emerald-500">growth tier.</span>
              </h2>
            </div>
            <p className="font-sans text-gray-500 text-base leading-relaxed max-w-sm lg:text-right">
              Select the operational level that matches where your brand is — and where it needs to go.
            </p>
          </div>
        </motion.div>

        {/* Main Pricing Interface */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left: Tier Selector */}
          <div className="lg:col-span-4 space-y-3">
            {PRICING_TIERS.map((tier, i) => {
              const TierIcon = tier.icon;
              const isActive = tier.id === activeId;
              return (
                <motion.button
                  key={tier.id}
                  onClick={() => setActiveId(tier.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer focus:outline-none group relative overflow-hidden ${
                    isActive
                      ? 'bg-white border-emerald-300 shadow-[0_4px_30px_rgba(16,185,129,0.12)]'
                      : 'bg-white/60 border-gray-200 hover:border-emerald-200 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {/* Active left border accent */}
                  {isActive && (
                    <motion.div
                      layoutId="active-accent"
                      className="absolute left-0 top-4 bottom-4 w-[3px] bg-emerald-500 rounded-full"
                    />
                  )}

                  <div className="flex items-center justify-between pl-2">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-emerald-50 group-hover:text-emerald-500'
                      }`}>
                        <TierIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`font-heading font-bold text-base leading-tight ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                            {tier.name} <span className="font-medium text-gray-500">{tier.subtitle}</span>
                          </span>
                        </div>
                        <span className={`font-heading font-bold text-sm ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {tier.price}
                          {tier.price !== 'Custom' && <span className="font-normal text-xs ml-1">/mo</span>}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {tier.popular && (
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-500 text-white px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                        isActive ? 'text-emerald-500 translate-x-0.5' : 'text-gray-300 group-hover:text-emerald-400'
                      }`} />
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* Social proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {['bg-emerald-400', 'bg-blue-400', 'bg-purple-400', 'bg-amber-400'].map((c, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center`}>
                      <span className="text-white text-[8px] font-bold">{['A','F','S','M'][i]}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-sans text-gray-500 leading-tight">
                    <span className="font-bold text-gray-900">120+ GCC founders</span> trusted Think10 last quarter.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Detail Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden"
              >
                {/* Top Header Bar */}
                <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 md:p-10 overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-[-40px] right-[-40px] w-[220px] h-[220px] rounded-full bg-white/10" />
                  <div className="absolute bottom-[-60px] right-[60px] w-[160px] h-[160px] rounded-full bg-white/5" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ActiveIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className={`inline-block text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1 ${activeTier.tagColor}`}>
                            {activeTier.tag}
                          </span>
                          <p className="text-xs font-mono text-white/70">{activeTier.highlight}</p>
                        </div>
                      </div>

                      {activeTier.popular && (
                        <div className="flex items-center space-x-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">Most Popular</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight mb-3">
                      {activeTier.name} <span className="font-light opacity-80">{activeTier.subtitle}</span>
                    </h3>
                    <p className="font-sans text-white/80 text-sm leading-relaxed max-w-xl">
                      {activeTier.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-white/20 flex items-baseline space-x-2">
                      <span className="font-heading font-extrabold text-white text-4xl tracking-tight">
                        {activeTier.price}
                      </span>
                      <span className="font-sans text-white/70 text-sm">{activeTier.period}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Features */}
                <div className="p-8 md:p-10">
                  <div className="mb-6">
                    <h4 className="font-heading font-bold text-gray-900 text-sm uppercase tracking-wider mb-1">
                      What's included
                    </h4>
                    <p className="text-xs font-sans text-gray-400">Everything in this tier, unlocked from day one.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {activeTier.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-colors"
                      >
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="font-sans text-sm text-gray-700 leading-snug">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-sm uppercase tracking-wide rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.01] flex items-center justify-center space-x-2 cursor-pointer focus:outline-none">
                      <span>{activeTier.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-6 py-4 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 font-heading font-semibold text-sm rounded-xl transition-all bg-white hover:bg-gray-50 cursor-pointer focus:outline-none">
                      Book a Discovery Call
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom guarantee strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { label: 'Cancel anytime', icon: '↩' },
            { label: 'No hidden fees', icon: '✓' },
            { label: '100% confidential', icon: '🔒' },
            { label: 'UAE-vetted advisors', icon: '⭐' },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2 text-gray-500">
              <span className="text-base">{item.icon}</span>
              <span className="font-sans text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
