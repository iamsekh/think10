import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';

export default function ExplainerVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-[#F4FCF9] border-y border-[#E2E8F0] relative overflow-hidden">
      {/* Background visual flair */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#68E8C4]/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-heading font-extrabold text-[#0B1220] text-3xl md:text-5xl tracking-tight leading-tight">
            See how the <span className="text-[#059669]">Think10 Engine</span> works.
          </h2>
          <p className="font-sans text-[#475569] text-lg leading-relaxed">
            Watch our short explainer on how Zyne AI and our elite human advisors integrate seamlessly to solve your most complex retail bottlenecks.
          </p>
        </div>

        {/* Video Thumbnail / Container */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-[#68E8C4]/10 border border-white/10 aspect-video group cursor-pointer bg-[#1E293B]" onClick={() => setIsPlaying(true)}>
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600" 
            alt="Think10 Explainer Video" 
            className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent"></div>
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 md:w-24 md:h-24 bg-[#68E8C4] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(104,232,196,0.4)] transition-all"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 text-[#0B1220] ml-2" fill="currentColor" />
            </motion.div>
          </div>
          
          <div className="absolute bottom-8 left-8 right-8 flex items-center space-x-3">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-mono font-bold text-white uppercase tracking-wider">
              Play Video
            </span>
            <span className="text-white/80 font-sans text-sm font-medium">02:15</span>
          </div>
        </div>

      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4 md:p-12"
          >
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <button 
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Placeholder for actual video iframe */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-4">
                <Play className="w-16 h-16 opacity-20" />
                <p className="font-mono text-sm uppercase tracking-widest">Video Embed Placeholder</p>
                <p className="font-sans text-xs">Replace with YouTube / Vimeo iframe</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
