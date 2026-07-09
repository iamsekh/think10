import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  // Duplicate testimonials enough times to ensure it covers ultra-wide screens
  const carouselItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-[50px] bg-[#F8FAFC] border-y border-[#E2E8F0] overflow-hidden relative">
      
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#d5c5ff]/20 blur-[120px] rounded-full pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20 space-y-6"
        >
          <h2 className="font-heading font-extrabold text-[#0B1220] text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            Trusted by the top <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-emerald-400">GCC founders</span>.
          </h2>
          <p className="font-sans text-[#475569] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Hear directly from the retail leaders and e-commerce pioneers who use Think10's hybrid advisory to scale profitably across the region.
          </p>
        </motion.div>
      </div>

      {/* Pure CSS Infinite Marquee */}
      <div className="relative flex overflow-hidden group">
        <style>{`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
            width: max-content;
          }
          .group:hover .animate-infinite-scroll {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="flex animate-infinite-scroll space-x-6 px-3">
          {carouselItems.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-[#059669]/30 hover:shadow-xl transition-all duration-300 w-[380px] md:w-[480px] flex-shrink-0 flex flex-col group/card cursor-grab active:cursor-grabbing"
            >
              {/* Large background quote icon */}
              <Quote className="absolute top-6 right-6 w-20 h-20 text-[#059669]/5 -rotate-12 group-hover/card:scale-110 transition-transform duration-500" />
              
              <div className="flex items-center space-x-1 mb-6 text-[#F59E0B] relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="font-sans text-[#1E293B] text-lg md:text-xl leading-relaxed mb-10 font-medium relative z-10 flex-1">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center space-x-4 pt-5 border-t border-[#F1F5F9] relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#059669] to-[#68E8C4] rounded-full blur-sm opacity-50 group-hover/card:opacity-100 transition-opacity"></div>
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.author} 
                    className="relative w-14 h-14 rounded-full object-cover border-2 border-white"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-[#0B1220] text-sm md:text-base">{testimonial.author}</h4>
                  <p className="font-sans text-xs md:text-sm text-[#64748B] font-medium">{testimonial.title}</p>
                  <p className="font-sans text-[10px] md:text-xs font-bold text-[#059669] mt-0.5 uppercase tracking-widest">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
