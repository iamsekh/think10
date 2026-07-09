import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Target, Users, TrendingUp } from 'lucide-react';

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  // Map the progress to color transition from light grey to dark slate
  const color = useTransform(progress, range, ["#CBD5E1", "#0B1220"]);
  return (
    <motion.span style={{ color }} className="inline">
      {children}
    </motion.span>
  );
};

export default function ShortAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 40%"]
  });

  const statement = "We are the architects of modern retail scale. Think10 was born from a simple observation: retail founders in the GCC face unique local challenges that generic global advice cannot solve.";
  const words = statement.split(" ");

  return (
    <section id="about" className="py-[50px] bg-white relative overflow-hidden">
      {/* Soft Green Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at center, #8FFFB0, transparent 60%)`,
        }}
      />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white border border-[#E2E8F0] px-4 py-1.5 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#0B1220] uppercase">The Think10 Thesis</span>
          </div>
        </div>

        {/* Cinematic Scroll Reveal Text */}
        <div className="mb-24" ref={containerRef}>
          <p className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[64px] leading-[1.2] tracking-tight text-justify hyphens-auto">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              return (
                <span key={i}>
                  <Word progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                  {i < words.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-[#E2E8F0]">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
              <Target className="w-6 h-6 text-[#059669]" />
            </div>
            <h4 className="font-heading font-bold text-xl text-[#0B1220]">Precision Execution</h4>
            <p className="font-sans text-[#475569] leading-relaxed">Data-driven frameworks powered by Zyne AI, completely replacing guesswork in your supply chain.</p>
          </div>
          
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
              <Users className="w-6 h-6 text-[#059669]" />
            </div>
            <h4 className="font-heading font-bold text-xl text-[#0B1220]">Vetted Operators</h4>
            <p className="font-sans text-[#475569] leading-relaxed">Your advisory board consists strictly of founders who have successfully scaled and exited businesses.</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#059669]" />
            </div>
            <h4 className="font-heading font-bold text-xl text-[#0B1220]">Exponential ROI</h4>
            <p className="font-sans text-[#475569] leading-relaxed">We focus on one metric: massive margin expansion through elite digital and offline optimization.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
