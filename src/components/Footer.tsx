import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ShieldCheck, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'Advisory Areas', id: 'dimensions' },
    { name: 'Meet Zyne AI', id: 'simulator' },
    { name: 'Who Is It For', id: 'scorecard' },
    { name: 'Our Consultants', id: 'experts' },
    { name: 'Membership Plans', id: 'pricing' }
  ];

  const frameworkDimensions = [
    '01. Brand Development & Positioning',
    '02. Retail Storefront Operations',
    '03. Marketplace Strategy',
    '04. Amazon UAE Strategy & Ads',
    '05. Noon FBN Optimization'
  ];

  const complianceStandards = [
    'DED Dubai Registered',
    'ADGM Trade Compliance',
    'Mutual NDA Pre-Authorized',
    'Confidential Brand Portals',
    'Secure Client Encryption'
  ];

  useGSAP(() => {
    if (!footerRef.current) return;

    // 1. Reveal Grid Elements on Scroll
    gsap.from('.gsap-footer-col', {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // 2. Parallax Huge Text at the bottom
    gsap.from('.gsap-huge-text', {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
      },
      y: 100,
      scale: 0.9,
      opacity: 0,
      ease: 'none',
    });

    // 3. Subtle background gradient pan
    gsap.to(footerRef.current, {
      backgroundPosition: '100% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

  }, { scope: footerRef });

  return (
    <footer 
      ref={footerRef}
      id="footer" 
      className="bg-[#0B1220] text-white pt-24 pb-8 overflow-hidden relative"
      style={{
        backgroundImage: 'radial-gradient(circle at 0% 0%, #0f172a 0%, #0B1220 50%, #050a14 100%)',
        backgroundSize: '200% 200%'
      }}
    >
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#68E8C4]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Upper Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Logo Brand Panel (4 Columns) */}
          <div className="lg:col-span-4 space-y-8 gsap-footer-col">
            <button
              onClick={() => onNavigate('hero')}
              className="flex items-center space-x-3 text-left focus:outline-none cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#68E8C4] flex items-center justify-center text-[#0B1220] font-bold text-xl font-heading tracking-tight group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-white tracking-tight text-xl leading-none group-hover:text-[#68E8C4] transition-colors">
                  Think10
                </span>
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase leading-none mt-1 font-bold">
                  Premium Advisory
                </span>
              </div>
            </button>

            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-sm">
              Think10 combines your personal AI Business Advisor with exit-vetted human consultants to solve inventory, marketing, and marketplace challenges in real-time.
            </p>

            <div className="space-y-3 text-sm font-sans text-white/50">
              <div className="flex items-center space-x-3 group cursor-default">
                <MapPin className="w-4 h-4 text-[#68E8C4] group-hover:animate-bounce" />
                <span className="group-hover:text-white transition-colors">Marina Plaza, Dubai Marina, UAE</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-default">
                <Mail className="w-4 h-4 text-[#68E8C4] group-hover:animate-bounce" />
                <span className="group-hover:text-white transition-colors">advisory@think10.ae</span>
              </div>
            </div>
          </div>

          {/* Quick Links (2 Columns) */}
          <div className="lg:col-span-2 space-y-6 gsap-footer-col">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#68E8C4]">Platform</h4>
            <div className="flex flex-col space-y-4">
              {companyLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-left font-sans text-sm text-white/70 hover:text-white transition-colors focus:outline-none cursor-pointer hover:translate-x-1 transform duration-300 w-max"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Core Dimensions (3 Columns) */}
          <div className="lg:col-span-3 space-y-6 gsap-footer-col">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#68E8C4]">Framework Core</h4>
            <div className="flex flex-col space-y-4 text-sm text-white/70">
              {frameworkDimensions.map((dim) => (
                <span key={dim} className="font-sans leading-relaxed">{dim}</span>
              ))}
              <span className="font-mono text-[11px] text-[#68E8C4] font-semibold flex items-center space-x-1 cursor-pointer hover:text-white transition-colors w-max mt-2">
                <span>View remaining areas</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Compliance & Security (3 Columns) */}
          <div className="lg:col-span-3 space-y-6 gsap-footer-col">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#68E8C4]">Security Posture</h4>
            <div className="flex flex-col space-y-4">
              {complianceStandards.map((std) => (
                <div key={std} className="flex items-center space-x-3 text-sm text-white/70 group">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-sans leading-relaxed">{std}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Massive GSAP Animated Brand Text */}
        <div className="w-full flex justify-center items-center py-8 border-y border-white/5 mb-8 overflow-hidden">
          <h1 className="gsap-huge-text font-heading font-black text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none">
            THINK10
          </h1>
        </div>

        {/* Lower Disclaimer Notice */}
        <div className="text-xs font-sans text-white/40 leading-relaxed space-y-6 gsap-footer-col">
          <p className="max-w-5xl">
            <strong className="text-white/60">Advisory & Confidentiality Notice:</strong> Think10 is a private advisory membership platform and does not offer formal DED legal registration representation or financial banking brokerage. All strategic forecasts, inventory simulations, and marketplace compliance templates are synthesized for operational modeling, intended solely for internal strategic planning under executed Mutual NDAs.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-[11px] font-mono tracking-wide">
            <span>© {currentYear} Think10 Advisory UAE. All rights reserved.</span>
            <div className="flex space-x-6">
              <a href="#footer" className="hover:text-[#68E8C4] transition-colors">Confidentiality Protocol</a>
              <a href="#footer" className="hover:text-[#68E8C4] transition-colors">NDA Terms of Service</a>
              <a href="#footer" className="hover:text-[#68E8C4] transition-colors">Vault Security</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
