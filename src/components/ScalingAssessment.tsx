/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, AlertTriangle, ArrowRight, CheckCircle2, UserCheck, Rocket, Store, Globe, TrendingUp, HelpCircle, Activity, Terminal, Cpu, BarChart2, RefreshCw } from 'lucide-react';
import { ADVISORY_EXPERTS } from '../data';

const ASSESSMENT_QUESTIONS = [
  {
    id: 'stage',
    text: 'What is the current operational stage of your business?',
    dimension: 'Business Stage',
    options: [
      { label: 'Planning / Launching first product', points: 2, icon: Rocket, description: 'Focused on legal setup, sourcing, and initial brand identity.' },
      { label: 'Physical brick-and-mortar boutique', points: 4, icon: Store, description: 'Focused on retail foot traffic, offline operations, and inventory.' },
      { label: 'Active online e-commerce storefront', points: 6, icon: Globe, description: 'Focused on digital acquisition, marketplace listings, and ad spend.' },
      { label: 'Scaling established retail & e-commerce', points: 8, icon: TrendingUp, description: 'Focused on high-level omnichannel strategy and team building.' }
    ]
  },
  {
    id: 'channel',
    text: 'What is your primary sales and distribution channel?',
    dimension: 'Sales Channels',
    options: [
      { label: 'No active channel / Social media selling', points: 2, icon: HelpCircle, description: 'Building initial brand foundations and early GCC audience traction.' },
      { label: 'Physical storefront boutique locations', points: 4, icon: Store, description: 'Managing boutique rent, store layouts, and floor sales staff.' },
      { label: 'E-commerce marketplaces (Amazon, Noon, TikTok)', points: 6, icon: Globe, description: 'Optimizing product catalog, seller dashboard, and FBN/FBA logistics.' },
      { label: 'Omnichannel (physical + online combined)', points: 8, icon: TrendingUp, description: 'Aligning stock inventory, pricing profiles, and unified brand positioning.' }
    ]
  },
  {
    id: 'bottleneck',
    text: 'What is your biggest operational bottleneck today?',
    dimension: 'Operational Bottleneck',
    options: [
      { label: 'Sourcing manufacturers & DED licensing', points: 2, icon: HelpCircle, description: 'Seeking clear steps to launch legally without building alone.' },
      { label: 'Store rent & staff conversion metrics', points: 4, icon: Store, description: 'Seeking store layout efficiency and local staff training.' },
      { label: 'High customer acquisition cost (CAC)', points: 6, icon: Globe, description: 'Seeking keyword indexing prominence and ad budget efficiency.' },
      { label: 'Funding inventory orders & team scaling', points: 8, icon: TrendingUp, description: 'Seeking inventory credit lines and senior retail advisors.' }
    ]
  },
  {
    id: 'turnover',
    text: 'What is your average monthly sales turnover?',
    dimension: 'Monthly Sales',
    options: [
      { label: 'Under AED 10,000 / Seed stage', points: 2, icon: Rocket, description: 'Early-stage launching; focusing on brand and product setup.' },
      { label: 'AED 10,000 to AED 50,000', points: 4, icon: Store, description: 'Stable storefront; seeking consistent local GCC consumer flow.' },
      { label: 'AED 50,000 to AED 200,000', points: 6, icon: Globe, description: 'E-commerce growth; seeking logistics badging and PPC optimizations.' },
      { label: 'Over AED 200,000', points: 8, icon: TrendingUp, description: 'Omnichannel scale; seeking capital optimization and high-level council.' }
    ]
  }
];

const STATUS_INDICATORS = [
  { label: 'SYS STATUS', value: 'ONLINE', color: 'text-emerald-400' },
  { label: 'DIAGNOSTIC', value: 'READY', color: 'text-blue-400' },
  { label: 'ADVISORS', value: '4 ACTIVE', color: 'text-emerald-400' },
];

export default function ScalingAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { points: number; label: string }>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleSelectOption = (questionId: string, points: number, label: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: { points, label } }));
    if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 350);
    }
  };

  const resetScorecard = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCalculated(false);
  };

  const totalScore = Object.values(answers).reduce((acc: number, curr: any) => acc + curr.points, 0) as number;
  const progress = ((currentStep + (answers[ASSESSMENT_QUESTIONS[currentStep]?.id] ? 1 : 0)) / ASSESSMENT_QUESTIONS.length) * 100;

  const getFounderPersona = () => {
    let personaName = 'New Founder';
    let painPoints = 'Sourcing manufacturers, DED licensing setup, and lack of guidance.';
    let recommendedAdvisorId = 'sarah';

    if (totalScore <= 12) {
      personaName = 'New Founder';
      painPoints = 'Sourcing manufacturers, DED licensing setup, initial brand positioning, and the fear of launching alone.';
      recommendedAdvisorId = 'sarah';
    } else if (totalScore > 12 && totalScore <= 18) {
      personaName = 'Retail Business Owner';
      painPoints = 'Physical storefront rent overheads, retail conversions, layout optimizations, and boutique staff hiring.';
      recommendedAdvisorId = 'amira';
    } else if (totalScore > 18 && totalScore <= 25) {
      personaName = 'E-commerce Brand';
      painPoints = 'High customer acquisition cost (CAC), Noon FBN/FBA logistics badging, and marketplace advertising (Amazon AMS).';
      recommendedAdvisorId = 'fatima';
    } else {
      personaName = 'Growing Omnichannel Founder';
      painPoints = 'Omnichannel stock integration, cash conversion loops, supplier payment negotiations, and key team management.';
      recommendedAdvisorId = 'marcus';
    }

    const advisor = ADVISORY_EXPERTS.find((exp) => exp.id === recommendedAdvisorId) || ADVISORY_EXPERTS[0];
    return { personaName, painPoints, advisor };
  };

  const personaInfo = isCalculated ? getFounderPersona() : null;
  const allAnswered = Object.keys(answers).length === ASSESSMENT_QUESTIONS.length;

  return (
    <section id="scorecard" className="py-28 bg-[#0F1A2E] relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-400/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-300/8 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full shadow-sm">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">Diagnostics</span>
            </div>
            <h2 className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              Command<br />
              <span className="text-emerald-400">Center.</span>
            </h2>
          </div>
          <p className="font-sans text-white/50 text-base leading-relaxed max-w-sm lg:text-right">
            A 2-minute operational diagnostic to match your brand's footprint with your dedicated advisory partner.
          </p>
        </motion.div>

        {/* Main Command Center Interface */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left: System Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Terminal Header Card */}
            <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow-xl">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">System Panel</span>
              </div>
              <div className="space-y-3">
                {STATUS_INDICATORS.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500">{s.label}</span>
                    <span className={`text-[10px] font-mono font-bold ${s.color}`}>{s.value}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-gray-500">COMPLETION</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">{Math.round(isCalculated ? 100 : progress)}%</span>
                  </div>
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${isCalculated ? 100 : progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension Tracker */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Dimensions</span>
              </div>
              <div className="space-y-2.5">
                {ASSESSMENT_QUESTIONS.map((q, i) => {
                  const answered = !!answers[q.id];
                  const isCurrent = i === currentStep && !isCalculated;
                  return (
                    <div key={q.id} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                        answered ? 'bg-emerald-500' : isCurrent ? 'bg-emerald-300 animate-pulse' : 'bg-gray-200'
                      }`} />
                      <span className={`text-xs font-mono leading-tight transition-colors ${
                        answered ? 'text-emerald-600 font-semibold' : isCurrent ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {q.dimension}
                      </span>
                      {answered && <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metric box */}
            <div className="bg-emerald-500 rounded-2xl p-5 shadow-lg shadow-emerald-500/20">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart2 className="w-4 h-4 text-white/70" />
                <span className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest">Advisory Score</span>
              </div>
              <div className="font-heading font-extrabold text-white text-4xl mb-1">
                {isCalculated ? totalScore : Object.values(answers).reduce((a: number, c: any) => a + c.points, 0)}
                <span className="text-white/50 text-lg font-normal"> / 32</span>
              </div>
              <p className="text-[11px] font-sans text-white/70">
                {isCalculated ? 'Profile matched.' : 'Score accumulates as you answer.'}
              </p>
            </div>
          </motion.div>

          {/* Right: Main Diagnostic / Results */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {!isCalculated ? (
                <motion.div
                  key="quiz-screen"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
                >
                  {/* Top bar */}
                  <div className="bg-gray-900 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 ml-3">FOUNDER_DIAGNOSTIC_v2.0</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Q_{String(currentStep + 1).padStart(2, '0')} OF 04
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-[3px] bg-gray-100">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                      animate={{ width: `${((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="p-8 md:p-10">
                    {/* Question */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-8">
                          <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-4">
                            {ASSESSMENT_QUESTIONS[currentStep].dimension}
                          </span>
                          <h3 className="font-heading font-extrabold text-white text-2xl md:text-3xl tracking-tight leading-snug">
                            {ASSESSMENT_QUESTIONS[currentStep].text}
                          </h3>
                        </div>

                        {/* Option Grid */}
                        <div className="grid sm:grid-cols-2 gap-3">
                          {ASSESSMENT_QUESTIONS[currentStep].options.map((opt) => {
                            const OptIcon = opt.icon;
                            const isSelected = answers[ASSESSMENT_QUESTIONS[currentStep].id]?.label === opt.label;
                            return (
                              <button
                                key={opt.label}
                                onClick={() => handleSelectOption(ASSESSMENT_QUESTIONS[currentStep].id, opt.points, opt.label)}
                                className={`group text-left p-5 rounded-2xl border transition-all duration-200 focus:outline-none cursor-pointer relative overflow-hidden ${
                                  isSelected
                                    ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20'
                                    : 'bg-gray-900 border-gray-700 hover:border-emerald-500 hover:bg-gray-800'
                                }`}
                              >
                                <div className="flex items-start space-x-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isSelected ? 'bg-white/20' : 'bg-gray-800 border border-gray-600 group-hover:border-emerald-500/50'
                                  }`}>
                                    <OptIcon className={`w-5 h-5 transition-colors ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className={`font-heading font-bold text-sm block mb-1 leading-tight transition-colors ${isSelected ? 'text-white' : 'text-gray-100'}`}>
                                      {opt.label}
                                    </span>
                                    <span className={`text-xs leading-relaxed block transition-colors ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                                      {opt.description}
                                    </span>
                                  </div>
                                  {isSelected && (
                                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Nav */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                      <button
                        disabled={currentStep === 0}
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        className="text-sm font-semibold text-gray-500 hover:text-gray-200 transition-colors disabled:opacity-0 cursor-pointer focus:outline-none"
                      >
                        ← Back
                      </button>

                      <div className="flex items-center space-x-3">
                        {currentStep < ASSESSMENT_QUESTIONS.length - 1 && answers[ASSESSMENT_QUESTIONS[currentStep].id] && (
                          <button
                            onClick={() => setCurrentStep((prev) => prev + 1)}
                            className="px-6 py-2.5 bg-gray-700 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all hover:bg-gray-600 flex items-center space-x-2 cursor-pointer focus:outline-none"
                          >
                            <span>Next</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {allAnswered && (
                          <button
                            onClick={() => setIsCalculated(true)}
                            className="px-8 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-lg shadow-emerald-500/30 flex items-center space-x-2 cursor-pointer focus:outline-none"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Run Analysis</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Results */
                <motion.div
                  key="results-screen"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Result Hero Card */}
                  <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                    {/* Top bar */}
                    <div className="px-8 py-4 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Analysis Complete — Profile Matched</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-600">CONFIDENCE: 100%</span>
                    </div>

                    <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-full mb-4">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">Founder Profile</span>
                        </div>
                        <h3 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight leading-tight mb-4">
                          {personaInfo?.personaName}
                        </h3>
                        <p className="font-sans text-gray-400 text-sm leading-relaxed">
                          {personaInfo?.personaName === 'New Founder'
                            ? 'Your venture is in the launch phase. Setting clean foundations will unlock premium e-commerce growth.'
                            : personaInfo?.personaName === 'Retail Business Owner'
                            ? 'Your storefront is active. Optimization of foot-traffic metrics and retail staff will accelerate sales.'
                            : personaInfo?.personaName === 'E-commerce Brand'
                            ? 'Your digital store is scaling. Logistical badging and PPC audits will lower acquisition costs significantly.'
                            : 'Your brand is ready for GCC omnichannel expansion. Sourcing term splitting and team building are priorities.'}
                        </p>
                      </div>

                      {/* Score Ring */}
                      <div className="flex justify-center md:justify-end">
                        <div className="relative w-36 h-36">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2937" strokeWidth="8" />
                            <motion.circle
                              cx="50" cy="50" r="42" fill="none"
                              stroke="#10b981" strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 42}`}
                              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - totalScore / 32) }}
                              transition={{ duration: 1.2, ease: 'easeOut' }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-heading font-extrabold text-white text-3xl">{totalScore}</span>
                            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">/ 32</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Result Panels */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Friction Panel */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
                      <div className="flex items-center space-x-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-red-500">Identified Friction</span>
                          <p className="text-xs text-gray-400 font-sans">Critical operational blocks</p>
                        </div>
                      </div>
                      <p className="font-sans text-gray-700 text-sm leading-relaxed mb-5">
                        {personaInfo?.painPoints}
                      </p>
                      <div className="flex items-start space-x-2.5 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs font-sans text-emerald-700 leading-relaxed">
                          Zyne AI recommends connecting with a dedicated advisor to resolve these immediately.
                        </p>
                      </div>
                    </div>

                    {/* Advisor Match Panel */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-5">
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                            <UserCheck className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-600">Partner Match</span>
                            <p className="text-xs text-gray-400 font-sans">Your dedicated advisor</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <img
                            src={personaInfo?.advisor.avatar}
                            alt={personaInfo?.advisor.name}
                            className="w-14 h-14 rounded-xl object-cover border border-gray-200 shadow-sm"
                          />
                          <div>
                            <p className="font-heading font-bold text-gray-900 text-base leading-tight">{personaInfo?.advisor.name}</p>
                            <p className="text-xs text-emerald-600 font-mono mt-0.5">{personaInfo?.advisor.specialty}</p>
                          </div>
                        </div>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed italic">
                          "{personaInfo?.advisor.bio}"
                        </p>
                      </div>

                      <div className="mt-5 space-y-2.5">
                        <button
                          onClick={() => {
                            const el = document.getElementById('briefing');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
                        >
                          <span>Connect with {personaInfo?.advisor.name.split(' ')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={resetScorecard}
                          className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700 font-sans text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Restart Diagnostic</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
