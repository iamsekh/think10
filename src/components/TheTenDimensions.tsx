/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STRATEGIC_DIMENSIONS } from '../data';
import { StrategicDimension } from '../types';
import { Sparkles, Users, Target, Compass, ArrowRight } from 'lucide-react';

export default function TheTenDimensions() {
  const [selectedDimension, setSelectedDimension] = useState<StrategicDimension>(STRATEGIC_DIMENSIONS[0]);

  return (
    <section id="dimensions" className="py-28 relative overflow-hidden bg-[#0A1628]">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/8 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full shadow-sm">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">Advisory Areas</span>
            </div>
            <h2 className="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              Think10<br />
              <span className="text-emerald-400">Advisory Areas.</span>
            </h2>
          </div>
          <p className="font-sans text-white/40 text-base leading-relaxed max-w-sm lg:text-right">
            Select an operational vector to initialize the hybrid advisory protocols deployed for your brand.
          </p>
        </motion.div>

        {/* Tab Navigation — Premium numbered pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {STRATEGIC_DIMENSIONS.map((dim) => {
            const isSelected = selectedDimension.id === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => setSelectedDimension(dim)}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-heading font-bold tracking-wide transition-all duration-200 focus:outline-none cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className={`font-mono text-[10px] w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40'
                }`}>
                  {dim.number}
                </span>
                <span>{dim.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Main Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDimension.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ minHeight: '520px' }}
          >
            <div className="flex flex-col lg:flex-row min-h-[520px]">

              {/* Left: Image panel */}
              <div className="lg:w-5/12 relative min-h-[300px] lg:min-h-full overflow-hidden">
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 hover:scale-110 transition-transform duration-[3000ms]"
                  style={{ backgroundImage: `url(${selectedDimension.imageUrl})` }}
                />
                {/* Strong dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/30 to-gray-900/10 lg:hidden" />
                <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-gray-900/20 to-gray-900/95" />

                {/* Number badge over image */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-mono text-white/50 uppercase">No.</span>
                    <span className="font-heading font-extrabold text-white text-lg leading-none">{selectedDimension.number}</span>
                  </div>
                </div>

                {/* Category label at bottom */}
                <div className="absolute bottom-6 left-6 z-10 lg:hidden">
                  <span className="inline-flex items-center space-x-1.5 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Protocol Active</span>
                  </span>
                </div>
              </div>

              {/* Right: Content */}
              <div className="lg:w-7/12 p-8 lg:p-12 xl:p-14 flex flex-col justify-center bg-[#0D1B30]">

                {/* Active badge */}
                <div className="hidden lg:flex items-center space-x-2 mb-6">
                  <span className="inline-flex items-center space-x-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Protocol Active</span>
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-white text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight">
                  {selectedDimension.name}
                </h3>

                <p className="font-sans text-white/60 text-base leading-relaxed mb-8 max-w-xl">
                  {selectedDimension.description}
                </p>

                {/* AI + Human capability cards */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {/* AI Card */}
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors group">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Zyne AI System</h4>
                    </div>
                    <p className="font-sans text-sm text-white/50 leading-relaxed">
                      {selectedDimension.aiCapability}
                    </p>
                  </div>

                  {/* Human Card */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/60 group-hover:bg-white/15 transition-colors">
                        <Users className="w-4 h-4" />
                      </div>
                      <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Human Advisor</h4>
                    </div>
                    <p className="font-sans text-sm text-white/50 leading-relaxed">
                      {selectedDimension.humanCuration}
                    </p>
                  </div>
                </div>

                {/* Metric Row */}
                <div className="flex items-center space-x-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-0.5">
                      Primary Focus Metric
                    </span>
                    <span className="block font-heading font-bold text-white text-xl leading-tight">
                      {selectedDimension.exampleMetric}
                    </span>
                    <span className="block font-sans text-xs text-white/40 mt-0.5 leading-snug">
                      {selectedDimension.metricLabel}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 flex-shrink-0" />
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
