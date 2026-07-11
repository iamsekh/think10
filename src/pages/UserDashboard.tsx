import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { 
  TrendingUp, Calendar, Sparkles, CheckSquare, LayoutDashboard, Play, ArrowRight, Shield, Clock, Send, 
  ChevronRight, BarChart2, Star, User, BookOpen, Settings, LogOut, CheckCircle, RefreshCw, MessageSquare, AlertCircle,
  Sliders, UserCheck, Check, Sparkle, Rocket, Store, Globe, HelpCircle, Activity, Cpu, Terminal,
  Building2, FileText, UploadCloud, Lock, CheckCircle2, ShieldCheck, FileCheck,
  Download, Link, Link2, ExternalLink, FileSpreadsheet, LifeBuoy, PlusCircle, Menu, X, ArrowLeft
} from 'lucide-react';
import { STRATEGIC_DIMENSIONS, ADVISORY_EXPERTS, SIMULATOR_PRESETS } from '../data';

interface Session {
  id: string;
  date: string;
  time: string;
  topic: string;
  status: 'Approved' | 'Pending Approval';
}

interface SupportTicket {
  id: string;
  category: string;
  subject: string;
  description: string;
  status: 'Open' | 'Resolved';
  date: string;
}

export default function UserDashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Onboarding States
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem(`think10_onboarded_${user?.email || 'guest'}`) === 'true';
  });
  const [onboardingJourneyStep, setOnboardingJourneyStep] = useState(0);

  // Step 0: Quiz answers
  const [quizAnswers, setQuizAnswers] = useState({
    stage: 'Planning / Launching first product',
    channel: 'Active online e-commerce storefront',
    bottleneck: 'Customer Acquisition & ROAS margins',
    turnover: 'Under AED 50,000 / month'
  });

  // Step 1: Profile fields
  const [brandName, setBrandName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Fashion & Apparel');
  const [tradeLicenseNum, setTradeLicenseNum] = useState('');

  // Step 2: KYC simulated uploads
  const [licenseFile, setLicenseFile] = useState<string | null>(null);
  const [licenseUploading, setLicenseUploading] = useState(false);
  const [licenseProgress, setLicenseProgress] = useState(0);

  const [idFile, setIdFile] = useState<string | null>(null);
  const [idUploading, setIdUploading] = useState(false);
  const [idProgress, setIdProgress] = useState(0);

  // Main Dashboard States
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'zyne-ai' | 'bookings' | 'resources' | 'profile'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Subscription Plan & Credit States
  const [activePlan, setActivePlan] = useState<'free' | 'growth' | 'enterprise'>('free');
  
  const getPlanDetails = () => {
    switch (activePlan) {
      case 'free':
        return {
          name: 'Free Tier',
          tokensLimit: 2000,
          tokensUsed: 500,
          hoursLimit: 0,
          hoursUsed: 0,
          price: 'AED 0'
        };
      case 'growth':
        return {
          name: 'Growth Tier',
          tokensLimit: 50000,
          tokensUsed: 18450,
          hoursLimit: 10,
          hoursUsed: 3,
          price: 'AED 499/mo'
        };
      case 'enterprise':
        return {
          name: 'Enterprise Tier',
          tokensLimit: 150000,
          tokensUsed: 30000,
          hoursLimit: 30,
          hoursUsed: 12,
          price: 'AED 1,499/mo'
        };
    }
  };
  const planDetails = getPlanDetails();

  // Connected integrations (Shopify, Noon, Amazon)
  const [connectedStore, setConnectedStore] = useState<Record<string, boolean>>({
    shopify: false,
    noon: false,
    amazon: false
  });

  // Dimension Slider Scores
  const [dimensionScores, setDimensionScores] = useState<Record<string, number>>({
    brand: 4,
    'retail-ops': 3,
    marketplace: 5,
    amazon: 3,
    noon: 6,
    tiktok: 2,
    pricing: 5,
    cashflow: 4,
    marketing: 3,
    talent: 5
  });

  // Checklist tasks
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Advisory Booking Calendar
  const [sessions, setSessions] = useState<Session[]>([
    { id: 's1', date: '2026-07-14', time: '11:00 AM', topic: 'Omnichannel Launch Strategy Audit', status: 'Approved' }
  ]);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newTopic, setNewTopic] = useState('Strategic Performance Metrics');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Zyne AI Sandbox chat
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'zyne'; text: string; steps?: string[] }[]>([
    { sender: 'zyne', text: `Greetings. I am Zyne AI, your advisory copilot. How can I help optimize your retail or e-commerce operations in the UAE today?` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [zyneTyping, setZyneTyping] = useState(false);

  // Support Tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    { id: 'TKT-1082', category: 'Compliance / DED KYC', subject: 'Emirates ID review confirmation', description: 'Requesting confirmation that uploaded Emirates ID copy matches signatory guidelines.', status: 'Open', date: '2026-07-11' }
  ]);
  const [ticketCategory, setTicketCategory] = useState('Billing & Subscription');
  const [ticketSubject, setBrandSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Playbook Downloads
  const [downloadingPlaybook, setDownloadingPlaybook] = useState<string | null>(null);

  // Handle score adjustments
  const handleScoreChange = (dimId: string, val: number) => {
    setDimensionScores(prev => ({ ...prev, [dimId]: val }));
  };

  const totalScorePoints = (Object.values(dimensionScores) as number[]).reduce((a, b) => a + b, 0);
  const overallPercentage = Math.round((totalScorePoints / (Object.keys(dimensionScores).length * 10)) * 100);

  // Dynamic persona based on overall index
  const getDynamicPersona = () => {
    if (overallPercentage <= 40) {
      return {
        name: 'New GCC Founder',
        desc: 'Your venture is in the setup and launch phase. Focus on legal structure, initial branding, and UAE market entry routes.',
        advisorId: 'sarah',
        tasks: [
          { id: 't1', text: 'Register DED seller license & trade mark registration briefs', defaultChecked: false },
          { id: 't2', text: 'Audit visual brand guidelines & typography layouts', defaultChecked: false },
          { id: 't3', text: 'Configure basic Shopify checkout gateways & shipping methods', defaultChecked: false }
        ]
      };
    } else if (overallPercentage <= 65) {
      return {
        name: 'UAE E-Commerce Storefront',
        desc: 'Active digital merchant looking to improve acquisition ROAS, organic search prominence, and margin profiles.',
        advisorId: 'fatima',
        tasks: [
          { id: 't1', text: 'Optimize product page metadata and high-definition photography', defaultChecked: true },
          { id: 't2', text: 'Setup exact-match CPC ad campaigns on Noon & Amazon UAE', defaultChecked: false },
          { id: 't3', text: 'Map margin structures and dynamic competitor pricing indices', defaultChecked: false }
        ]
      };
    } else {
      return {
        name: 'Omnichannel Scale Leader',
        desc: 'High velocity business scaling through warehouse optimization, staff development, and unified physical boutiques.',
        advisorId: 'amira',
        tasks: [
          { id: 't1', text: 'Integrate multi-warehouse FBN/FBA logistics inventory trackers', defaultChecked: true },
          { id: 't2', text: 'Conduct store checkout flow audit and sales associate KPI planning', defaultChecked: true },
          { id: 't3', text: 'Run cash runway forecasting and manufacturer payment negotiations', defaultChecked: false }
        ]
      };
    }
  };

  const currentPersona = getDynamicPersona();
  const matchedAdvisor = ADVISORY_EXPERTS.find(exp => exp.id === currentPersona.advisorId) || ADVISORY_EXPERTS[0];

  // KYC document simulated uploads
  const simulateUpload = (type: 'license' | 'id') => {
    if (type === 'license') {
      if (licenseUploading) return;
      setLicenseUploading(true);
      setLicenseProgress(0);
      const interval = setInterval(() => {
        setLicenseProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setLicenseUploading(false);
            setLicenseFile('Trade_License_Draft_DED.pdf');
            return 100;
          }
          return prev + 25;
        });
      }, 150);
    } else {
      if (idUploading) return;
      setIdUploading(true);
      setIdProgress(0);
      const interval = setInterval(() => {
        setIdProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIdUploading(false);
            setIdFile('Emirates_ID_Signatory_Copy.pdf');
            return 100;
          }
          return prev + 25;
        });
      }, 150);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'license' | 'id') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'license') {
        if (licenseUploading) return;
        setLicenseUploading(true);
        setLicenseProgress(0);
        const interval = setInterval(() => {
          setLicenseProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setLicenseUploading(false);
              setLicenseFile(file.name);
              return 100;
            }
            return prev + 25;
          });
        }, 150);
      } else {
        if (idUploading) return;
        setIdUploading(true);
        setIdProgress(0);
        const interval = setInterval(() => {
          setIdProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setIdUploading(false);
              setIdFile(file.name);
              return 100;
            }
            return prev + 25;
          });
        }, 150);
      }
    }
  };

  const handleKycSubmit = () => {
    setOnboardingJourneyStep(3);
  };

  const completeOnboarding = () => {
    localStorage.setItem(`think10_onboarded_${user?.email || 'guest'}`, 'true');
    setIsOnboarded(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(`think10_onboarded_${user?.email || 'guest'}`);
    setIsOnboarded(false);
    setOnboardingJourneyStep(0);
    setLicenseFile(null);
    setIdFile(null);
  };

  // Chat message submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user' as const, text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    const query = chatInput.toLowerCase();
    setChatInput('');
    setZyneTyping(true);

    setTimeout(() => {
      let replyText = "I have analyzed your request. Let's look at the strategic solutions available.";
      let steps: string[] = [];

      if (query.includes('noon') || query.includes('amazon') || query.includes('marketplace')) {
        replyText = "Launching on Noon and Amazon UAE requires strict adherence to Prime and Express Delivery Badging to capture search rankings.";
        steps = [
          "Establish active Seller Registry profiles on both platforms",
          "Map initial inventory batches to Fulfilled by Noon (FBN) and FBA warehouses",
          "Conduct detailed Arabic/English keyword indexing for GCC regional buyers",
          "Initiate exact-match keyword search campaigns with strict target bids"
        ];
      } else if (query.includes('cash') || query.includes('finance') || query.includes('capital')) {
        replyText = "To optimize your inventory cash conversion cycles during high-demand shopping quarters, focus on payment structures and local non-dilutive credit lines.";
        steps = [
          "Model sales velocity buffers for next quarter safety stock levels",
          "Renegotiate supplier manufacturing payments to 30/70 milestones",
          "Sync store records with non-dilutive inventory advance platforms",
          "Book a strategic margin review with financial expert Marcus Vance"
        ];
      } else if (query.includes('brand') || query.includes('story') || query.includes('storytelling')) {
        replyText = "GCC luxury and lifestyle shoppers expect an elevated brand story and visual consistency across all touchpoints.";
        steps = [
          "Audit digital assets and social grids for brand narrative continuity",
          "Draft customized VIP packaging designs and unboxing instructions",
          "Configure email and WhatsApp retention welcome flows for boutique visitors",
          "Schedule a brand guidelines review session with Sarah Jenkins"
        ];
      }

      setChatMessages(prev => [...prev, { sender: 'zyne', text: replyText, steps }]);
      setZyneTyping(false);
    }, 1200);
  };

  const handlePresetTrigger = (presetQuestion: string, presetBrief: string, steps: string[]) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: presetQuestion }]);
    setZyneTyping(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'zyne', text: presetBrief, steps }]);
      setZyneTyping(false);
    }, 1000);
  };

  // Booking Advisor call
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;

    const newSession: Session = {
      id: `s-${Date.now()}`,
      date: newDate,
      time: newTime,
      topic: newTopic,
      status: 'Pending Approval'
    };

    setSessions(prev => [newSession, ...prev]);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
    setNewDate('');
  };

  // Support ticket creation
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDesc.trim()) return;

    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      category: ticketCategory,
      subject: ticketSubject,
      description: ticketDesc,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };

    setTickets(prev => [newTicket, ...prev]);
    setTicketSuccess(true);
    setTimeout(() => setTicketSuccess(false), 3000);
    setBrandSubject('');
    setTicketDesc('');
  };

  // Playbook download simulation
  const simulateDownload = (playbookName: string) => {
    setDownloadingPlaybook(playbookName);
    setTimeout(() => {
      setDownloadingPlaybook(null);
      alert(`Successfully downloaded "${playbookName}" premium playbook resource bundle!`);
    }, 1500);
  };

  const handleNavigate = (id: string) => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {!isOnboarded ? (
        <>
          <Header onNavigate={handleNavigate} activeSection="" />
          
          <div className="min-h-screen bg-[#F4FCF9] text-[#0F172A] pt-32 pb-20 px-6 md:px-12 relative overflow-hidden font-sans">
            {/* Soft Grid & Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-emerald-400/10 blur-[150px] rounded-full" />
              <div className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] bg-emerald-300/10 blur-[150px] rounded-full" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
              
              {/* Stepper Header */}
              <div className="mb-10 text-center">
                <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-widest text-emerald-600 uppercase mb-2">
                  <UserCheck className="w-4.5 h-4.5" />
                  <span>Onboarding & Strategic Setup</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-905 tracking-tight">
                  Complete Your Advisory Profile
                </h1>
                
                {/* Stepper indicators */}
                <div className="flex items-center justify-center space-x-3 mt-8 max-w-md mx-auto">
                  {[
                    { label: 'Quiz', step: 0 },
                    { label: 'Profile', step: 1 },
                    { label: 'KYC', step: 2 },
                    { label: 'Ready', step: 3 }
                  ].map(step => (
                    <React.Fragment key={step.step}>
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
                          onboardingJourneyStep === step.step
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20'
                            : onboardingJourneyStep > step.step
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                            : 'bg-white border-gray-200 text-gray-400'
                        }`}>
                          {onboardingJourneyStep > step.step ? <Check className="w-4 h-4" /> : step.step + 1}
                        </div>
                        <span className="hidden sm:inline text-xs font-medium text-gray-500 ml-1.5">{step.label}</span>
                      </div>
                      {step.step < 3 && <div className={`flex-1 h-0.5 max-w-[40px] ${onboardingJourneyStep > step.step ? 'bg-emerald-300' : 'bg-gray-200'}`} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              {onboardingJourneyStep === 0 && (
                <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-lg space-y-6">
                  <h3 className="text-xl font-heading font-bold text-gray-900 border-b border-gray-100 pb-4">
                    Step 1: Diagnostics Capacity Quiz
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Business Stage</label>
                      <select 
                        value={quizAnswers.stage}
                        onChange={(e) => setQuizAnswers(prev => ({ ...prev, stage: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Planning / Launching first product">Planning / Launching first product</option>
                        <option value="Physical boutique storefront">Physical boutique storefront</option>
                        <option value="Active online e-commerce storefront">Active online e-commerce storefront</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Primary Sales Channel</label>
                      <select 
                        value={quizAnswers.channel}
                        onChange={(e) => setQuizAnswers(prev => ({ ...prev, channel: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Shopify Store">Shopify Store</option>
                        <option value="Noon FBN / Marketplace">Noon FBN / Marketplace</option>
                        <option value="Amazon Seller Central">Amazon Seller Central</option>
                        <option value="Social Live Commerce (TikTok)">Social Live Commerce (TikTok)</option>
                        <option value="Active online e-commerce storefront">Omnichannel (Multi-channel setup)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Operational Bottleneck</label>
                      <select 
                        value={quizAnswers.bottleneck}
                        onChange={(e) => setQuizAnswers(prev => ({ ...prev, bottleneck: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Brand Identity & Premium perception">Brand Identity & Premium perception</option>
                        <option value="Customer Acquisition & ROAS margins">Customer Acquisition & ROAS margins</option>
                        <option value="Warehouse / Noon FBN logistics">Warehouse / Noon FBN logistics</option>
                        <option value="Supplier purchase orders & cash flow">Supplier purchase orders & cash flow</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Monthly Business Turnover</label>
                      <select 
                        value={quizAnswers.turnover}
                        onChange={(e) => setQuizAnswers(prev => ({ ...prev, turnover: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Under AED 50,000 / month">Under AED 50,000 / month</option>
                        <option value="AED 50,000 - 200,000 / month">AED 50,000 - 200,000 / month</option>
                        <option value="Over AED 200,000 / month">Over AED 200,000 / month</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setOnboardingJourneyStep(1)}
                      className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-md shadow-emerald-500/25 flex items-center space-x-2 cursor-pointer focus:outline-none"
                    >
                      <span>Next: Business Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {onboardingJourneyStep === 1 && (
                <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-lg space-y-6">
                  <h3 className="text-xl font-heading font-bold text-gray-900 border-b border-gray-100 pb-4">
                    Step 2: Business Profile Setup
                  </h3>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1.5">Brand / Company Name</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Maison de Fleur"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1.5">Storefront Website URL (Optional)</label>
                      <input 
                        type="url"
                        placeholder="e.g. https://maisonfleur.ae"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1.5">Business Industry Category</label>
                      <select 
                        value={businessCategory}
                        onChange={(e) => setBusinessCategory(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-950 focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="Fashion & Apparel">Fashion & Apparel</option>
                        <option value="Cosmetics & Beauty">Cosmetics & Beauty</option>
                        <option value="Home & Interior Decor">Home & Interior Decor</option>
                        <option value="Luxury Lifestyle Goods">Luxury Lifestyle Goods</option>
                        <option value="E-commerce Retail">General Retail</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1.5">DED Trade License Number (Optional)</label>
                      <input 
                        type="text"
                        placeholder="e.g. DED-189240"
                        value={tradeLicenseNum}
                        onChange={(e) => setTradeLicenseNum(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <button
                      onClick={() => setOnboardingJourneyStep(0)}
                      className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors focus:outline-none flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Quiz</span>
                    </button>

                    <button
                      onClick={() => setOnboardingJourneyStep(2)}
                      className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-md shadow-emerald-500/25 flex items-center space-x-2 cursor-pointer focus:outline-none"
                    >
                      <span>Next: KYC Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {onboardingJourneyStep === 2 && (
                <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-lg space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-heading font-bold text-gray-900">
                      Step 3: Identity & DED KYC Uploads (Optional)
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setLicenseFile('Trade_License_Draft_DED.pdf');
                        setIdFile('Emirates_ID_Signatory_Copy.pdf');
                      }}
                      className="text-xs text-emerald-650 hover:text-emerald-700 font-bold border border-emerald-200 bg-emerald-50 px-3 py-1.5 rounded-xl cursor-pointer transition-all"
                    >
                      Auto-Fill Mock Docs
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Trade License Upload */}
                    <div className="border border-dashed border-gray-200 bg-gray-50/50 rounded-2xl p-6 text-center space-y-4 flex flex-col justify-between h-[220px]">
                      <div>
                        <div className="w-10 h-10 rounded-full bg-emerald-55 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                          <Building2 className="w-5.5 h-5.5" />
                        </div>
                        <h4 className="font-heading font-bold text-xs text-gray-900">UAE Trade License Copy (Optional)</h4>
                        <p className="text-[10px] text-gray-400 mt-1 max-w-[200px] mx-auto">Upload DED active commercial trade license copy (.pdf, .jpg)</p>
                      </div>

                      <div>
                        {licenseUploading ? (
                          <div className="w-full space-y-1">
                            <div className="flex justify-between text-[9px] font-mono text-gray-500">
                              <span>Uploading...</span>
                              <span>{licenseProgress}%</span>
                            </div>
                            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${licenseProgress}%` }} />
                            </div>
                          </div>
                        ) : licenseFile ? (
                          <div className="bg-emerald-50 text-emerald-700 text-xs py-2 px-3.5 rounded-xl border border-emerald-100 inline-flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="font-mono text-[10px] truncate max-w-[120px]">{licenseFile}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <input 
                              type="file"
                              id="license-upload-input"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, 'license')}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById('license-upload-input')?.click()}
                              className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600 rounded-xl text-xs font-bold transition-all inline-flex items-center space-x-1.5 cursor-pointer focus:outline-none"
                            >
                              <UploadCloud className="w-4 h-4" />
                              <span>Select Document</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => simulateUpload('license')}
                              className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold mt-2 focus:outline-none cursor-pointer"
                            >
                              Auto-Generate Mock File
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Emirates ID Upload */}
                    <div className="border border-dashed border-gray-200 bg-gray-50/50 rounded-2xl p-6 text-center space-y-4 flex flex-col justify-between h-[220px]">
                      <div>
                        <div className="w-10 h-10 rounded-full bg-emerald-55 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                          <User className="w-5.5 h-5.5" />
                        </div>
                        <h4 className="font-heading font-bold text-xs text-gray-900">Authorized Signatory ID (Optional)</h4>
                        <p className="text-[10px] text-gray-400 mt-1 max-w-[200px] mx-auto">Upload front/back copy of Emirates ID or Passport (.pdf, .jpg)</p>
                      </div>

                      <div>
                        {idUploading ? (
                          <div className="w-full space-y-1">
                            <div className="flex justify-between text-[9px] font-mono text-gray-500">
                              <span>Uploading...</span>
                              <span>{idProgress}%</span>
                            </div>
                            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${idProgress}%` }} />
                            </div>
                          </div>
                        ) : idFile ? (
                          <div className="bg-emerald-50 text-emerald-700 text-xs py-2 px-3.5 rounded-xl border border-emerald-100 inline-flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="font-mono text-[10px] truncate max-w-[120px]">{idFile}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <input 
                              type="file"
                              id="id-upload-input"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, 'id')}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById('id-upload-input')?.click()}
                              className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600 rounded-xl text-xs font-bold transition-all inline-flex items-center space-x-1.5 cursor-pointer focus:outline-none"
                            >
                              <UploadCloud className="w-4 h-4" />
                              <span>Select Document</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => simulateUpload('id')}
                              className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold mt-2 focus:outline-none cursor-pointer"
                            >
                              Auto-Generate Mock File
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <button
                      onClick={() => setOnboardingJourneyStep(1)}
                      className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors focus:outline-none flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Profile</span>
                    </button>

                    <button
                      onClick={handleKycSubmit}
                      className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-md shadow-emerald-500/25 flex items-center space-x-2 cursor-pointer focus:outline-none"
                    >
                      <span>Submit Documents</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {onboardingJourneyStep === 3 && (
                <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden mb-8 font-sans">
                  <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-gray-400">ONBOARDING_INITIALIZATION_COMPLETE</span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase">Ready State</span>
                  </div>

                  <div className="p-8 md:p-10 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                      <ShieldCheck className="w-9 h-9" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-heading font-extrabold text-gray-900 text-3xl">Corporate Profile Complete</h3>
                      <p className="text-xs text-gray-500 max-w-md mx-auto">
                        Your identity documents are submitted. Compliance status: <strong className="text-yellow-600 font-semibold">Pending DED Compliance Review (Sandbox Active)</strong>.
                      </p>
                    </div>

                    {/* Matched Advisor preview */}
                    <div className="max-w-md mx-auto bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left flex items-start space-x-4">
                      <img 
                        src={matchedAdvisor.avatar} 
                        alt={matchedAdvisor.name}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                      />
                      <div>
                        <span className="block text-[8.5px] font-mono text-emerald-600 uppercase tracking-widest font-bold">Your Matched Strategist</span>
                        <h4 className="font-heading font-extrabold text-gray-900 text-sm mt-0.5">{matchedAdvisor.name}</h4>
                        <p className="text-[10.5px] text-gray-500 leading-tight mt-0.5">{matchedAdvisor.role}</p>
                        <span className="inline-block mt-2 text-[9px] font-mono bg-white px-2 py-0.5 rounded border text-emerald-600 font-bold">{matchedAdvisor.specialty}</span>
                      </div>
                    </div>

                    <button
                      onClick={completeOnboarding}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Enter Client Command Center</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </>
      ) : (
        /* ========================================================================= */
        /* MAIN CLIENT COMMAND CENTER DASHBOARD (LEFT SIDEBAR LAYOUT)                */
        /* ========================================================================= */
        <div className="flex min-h-screen bg-[#F4FCF9] text-[#0F172A] w-full font-sans">
          
          {/* Desktop Left Sidebar */}
          <div className="w-64 bg-white border-r border-gray-150 flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen p-6 font-sans">
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-2.5 pb-4 border-b border-gray-100">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-heading font-extrabold text-gray-905 text-sm leading-none">Think10</span>
                  <span className="text-[7.5px] font-mono tracking-widest text-gray-400 uppercase leading-none mt-0.5">Command Center</span>
                </div>
              </div>

              {/* Sidebar Links */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                    activeTab === 'overview' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                    activeTab === 'analytics' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <BarChart2 className="w-4 h-4" />
                    <span>Analytics Hub</span>
                  </div>
                  {activePlan === 'free' && <Lock className="w-3 h-3 text-amber-500" />}
                </button>

                <button
                  onClick={() => setActiveTab('zyne-ai')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                    activeTab === 'zyne-ai' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Cpu className="w-4 h-4" />
                    <span>Zyne AI Sandbox</span>
                  </div>
                  {activePlan === 'free' && <Lock className="w-3 h-3 text-amber-500" />}
                </button>

                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                    activeTab === 'bookings' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Calendar className="w-4 h-4" />
                    <span>Advisory Match</span>
                  </div>
                  {activePlan === 'free' && <Lock className="w-3 h-3 text-amber-500" />}
                </button>

                <button
                  onClick={() => setActiveTab('resources')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                    activeTab === 'resources' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Playbooks Library</span>
                  </div>
                  {activePlan === 'free' && <Lock className="w-3 h-3 text-amber-500" />}
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                    activeTab === 'profile' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Plan & Support</span>
                </button>
              </nav>
            </div>

            {/* Profile & Logout Card */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-heading font-extrabold text-sm uppercase">
                  {user?.name ? user.name[0] : 'Y'}
                </div>
                <div className="truncate text-left">
                  <span className="block text-xs font-bold text-gray-905 leading-tight truncate">{user?.name || 'Yasmin Al-Maktoum'}</span>
                  <span className="block text-[9.5px] text-gray-400 font-mono leading-none mt-0.5 truncate">{tradeLicenseNum || 'DED-189240'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-red-500 hover:text-red-655 hover:bg-red-50 rounded-xl transition-all font-semibold cursor-pointer focus:outline-none text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Right Area (Header + Main Contents) */}
          <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto relative">
            
            {/* Mobile Top Header */}
            <div className="md:hidden flex justify-between items-center bg-white border-b border-gray-150 p-4 sticky top-0 z-40">
              <div className="flex items-center space-x-2">
                <div className="w-6.5 h-6.5 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
                <span className="font-heading font-extrabold text-gray-900 text-sm">Think10</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 border border-gray-200 rounded-xl text-gray-650 hover:bg-gray-50 focus:outline-none"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Backdrop & Drawer */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 md:hidden flex">
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                <div className="relative w-64 bg-white h-full flex flex-col justify-between p-6 z-10 transition-transform duration-300">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <span className="font-heading font-extrabold text-gray-955 text-sm">Command Menu</span>
                      <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <nav className="space-y-1">
                      {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'analytics', label: 'Analytics Hub', icon: BarChart2, premium: true },
                        { id: 'zyne-ai', label: 'Zyne AI Sandbox', icon: Cpu, premium: true },
                        { id: 'bookings', label: 'Advisory Match', icon: Calendar, premium: true },
                        { id: 'resources', label: 'Playbooks Library', icon: BookOpen, premium: true },
                        { id: 'profile', label: 'Plan & Support', icon: ShieldCheck }
                      ].map(tab => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id as any);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none ${
                              activeTab === tab.id ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-55'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <Icon className="w-4 h-4" />
                              <span>{tab.label}</span>
                            </div>
                            {tab.premium && activePlan === 'free' && <Lock className="w-3 h-3 text-amber-500" />}
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-4">
                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-red-500 font-semibold focus:outline-none"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Content Container */}
            <div className="p-6 md:p-10 w-full mx-auto space-y-8 relative z-10 max-w-7xl flex-1 flex flex-col justify-between">
              
              <div className="space-y-8 w-full">
                {/* Header Box */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-gray-200/50">
                  <div>
                    <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-emerald-600 uppercase mb-1.5">
                      <Shield className="w-4 h-4" />
                      <span>Client Command Center</span>
                    </div>
                    <h1 className="text-3xl font-heading font-extrabold text-gray-905 tracking-tight leading-tight text-left">
                      {brandName ? `${brandName} Dashboard` : "Maison de Fleur Dashboard"}
                    </h1>
                  </div>

                  <button
                    onClick={resetOnboarding}
                    className="py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-600 flex items-center space-x-1.5 focus:outline-none transition-all cursor-pointer shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Onboarding Diagnostic</span>
                  </button>
                </div>

                {/* ========================================== */}
                {/* TAB 1: OVERVIEW TAB                        */}
                {/* ========================================== */}
                {activeTab === 'overview' && (
                  <div className="grid lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Sliders & Overall index */}
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* Strategic Index Card */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-2 text-left">
                          <h3 className="text-lg font-heading font-bold text-gray-900">Strategic Scale Index</h3>
                          <p className="text-xs text-gray-400 max-w-sm">
                            Your performance average calculated dynamically across the 10 core dimensions. Adjust sliders below to refine scores.
                          </p>
                        </div>

                        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="72" cy="72" r="62" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
                            <circle 
                              cx="72" cy="72" r="62" stroke="#10B981" strokeWidth="12" fill="transparent"
                              strokeDasharray={389.5}
                              strokeDashoffset={389.5 - (389.5 * overallPercentage) / 100}
                              strokeLinecap="round"
                              className="transition-all duration-505"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-heading font-extrabold text-gray-900">{overallPercentage}%</span>
                            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Score Index</span>
                          </div>
                        </div>
                      </div>

                      {/* Sliders Grid */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
                        <h4 className="text-sm font-mono font-bold text-emerald-600 uppercase tracking-widest border-b border-gray-100 pb-3">Strategic Dimension Audit</h4>
                        
                        <div className="space-y-4.5">
                          {STRATEGIC_DIMENSIONS.map(dim => {
                            const val = dimensionScores[dim.id] || 5;
                            return (
                              <div key={dim.id} className="space-y-1 text-left">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-heading font-bold text-gray-800">{dim.name}</span>
                                  <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{val}/10</span>
                                </div>

                                <div className="flex items-center space-x-4">
                                  <input 
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={val}
                                    onChange={(e) => handleScoreChange(dim.id, parseInt(e.target.value))}
                                    className="flex-1 accent-emerald-500 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Persona, Matched Advisor, Checklist */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Persona Card */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left space-y-3.5">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <TrendingUp className="w-4.5 h-4.5" />
                          </div>
                          <h3 className="font-heading font-extrabold text-gray-900 text-base">Matched Persona</h3>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded">{currentPersona.name}</span>
                          <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">{currentPersona.desc}</p>
                        </div>
                      </div>

                      {/* Advisor card */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left space-y-4">
                        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Your Strategic Partner</h4>
                        <div className="flex items-center space-x-3.5">
                          <img 
                            src={matchedAdvisor.avatar} 
                            alt={matchedAdvisor.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                          />
                          <div>
                            <h4 className="font-heading font-extrabold text-gray-905 text-sm">{matchedAdvisor.name}</h4>
                            <p className="text-[10.5px] text-gray-400 mt-0.5 leading-none">{matchedAdvisor.role}</p>
                            <span className="text-[9px] text-gray-400 font-mono block mt-1">{matchedAdvisor.formerRole}</span>
                          </div>
                        </div>
                      </div>

                      {/* Growth Checklist */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm text-left space-y-4">
                        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Advisor Recommended Tasks</h4>
                        
                        <div className="space-y-3">
                          {currentPersona.tasks.map(task => {
                            const isChecked = completedTasks.includes(task.id);
                            return (
                              <button
                                key={task.id}
                                onClick={() => {
                                  if (isChecked) {
                                    setCompletedTasks(prev => prev.filter(id => id !== task.id));
                                  } else {
                                    setCompletedTasks(prev => [...prev, task.id]);
                                  }
                                }}
                                className="w-full flex items-start space-x-3 text-left focus:outline-none cursor-pointer hover:bg-gray-50/50 p-1.5 rounded-lg transition-all"
                              >
                                <div className={`w-4.5 h-4.5 border rounded flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                  isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 bg-white'
                                }`}>
                                  {isChecked && <Check className="w-3 h-3" />}
                                </div>
                                <span className={`text-[11.5px] leading-tight ${isChecked ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.text}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ========================================== */}
                {/* TAB 2: ANALYTICS HUB TAB                   */}
                {/* ========================================== */}
                {activeTab === 'analytics' && (
                  <div className="relative min-h-[400px]">
                    {activePlan === 'free' && (
                      <LockedTabOverlay tabName="Analytics Hub" onUpgrade={() => setActiveTab('profile')} />
                    )}
                    <div className={`space-y-8 ${activePlan === 'free' ? 'filter blur-[4px] pointer-events-none select-none' : ''}`}>
                      
                      {/* Integration Connections Panel */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm text-left">
                        <h3 className="text-base font-heading font-extrabold text-gray-900 mb-4 border-b border-gray-100 pb-3">Omichannel Gateway Integrations</h3>
                        <p className="text-xs text-gray-500 mb-6 max-w-2xl leading-relaxed">
                          Connect your active storefront endpoints to feed real-time sales metrics directly into the diagnostic assessment engine.
                        </p>

                        <div className="grid sm:grid-cols-3 gap-4.5">
                          {[
                            { id: 'shopify', label: 'Shopify Storefront', color: 'indigo' },
                            { id: 'noon', label: 'Noon UAE FBN Platform', color: 'yellow' },
                            { id: 'amazon', label: 'Amazon Seller GCC', color: 'amber' }
                          ].map(store => {
                            const isConnected = connectedStore[store.id];
                            return (
                              <div 
                                key={store.id} 
                                className={`border rounded-2xl p-5 text-left flex flex-col justify-between h-[150px] transition-all ${
                                  isConnected 
                                    ? 'bg-emerald-50/20 border-emerald-250 shadow-sm' 
                                    : 'bg-white border-gray-150 hover:border-gray-300'
                                }`}
                              >
                                <div>
                                  <span className="block text-xs font-bold text-gray-900">{store.label}</span>
                                  <span className="block text-[10px] text-gray-400 mt-1">
                                    {isConnected ? 'Status: Sync Active' : 'Status: Disconnected'}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setConnectedStore(prev => ({ ...prev, [store.id]: !isConnected }))}
                                  className={`py-2 px-3.5 rounded-xl text-[10px] font-bold transition-all w-full text-center ${
                                    isConnected 
                                      ? 'bg-red-50 text-red-650 hover:bg-red-100 border border-red-200' 
                                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                  }`}
                                >
                                  {isConnected ? 'Disconnect Node' : 'Initialize Sync'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* E-commerce KPIs */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { label: 'Turnover (Monthly)', val: 'AED 148,920', icon: TrendingUp, detail: '+12.4% vs last month', detailColor: 'text-emerald-600' },
                          { label: 'PPC Campaign ROAS', val: '4.82x', icon: Cpu, detail: 'Amazon Ads Target 4.0x', detailColor: 'text-gray-400 font-mono' },
                          { label: 'Shopify Conv. Rate', val: '3.42%', icon: BarChart2, detail: 'Category average 2.1%', detailColor: 'text-emerald-600' },
                          { label: 'FBN Warehouse Health', val: '98%', icon: ShieldCheck, detail: 'Express badging active', detailColor: 'text-emerald-600' }
                        ].map((kpi, idx) => (
                          <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm text-left space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{kpi.label}</span>
                              <kpi.icon className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                              <h4 className="text-xl font-heading font-extrabold text-gray-900">{kpi.val}</h4>
                              <span className={`text-[10px] mt-1 block ${kpi.detailColor}`}>{kpi.detail}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Sales Charts Visual */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm text-left space-y-4">
                        <h3 className="text-base font-heading font-extrabold text-gray-900 border-b border-gray-100 pb-3">Omnichannel Weekly Sales Performance</h3>
                        
                        <div className="space-y-4 pt-3 font-mono text-xs">
                          {[
                            { channel: 'Shopify Storefront', pct: 60, val: 'AED 89,352', color: 'bg-emerald-500' },
                            { channel: 'Noon UAE FBN Marketplace', pct: 25, val: 'AED 37,230', color: 'bg-emerald-400' },
                            { channel: 'Amazon Seller GCC', pct: 15, val: 'AED 22,338', color: 'bg-emerald-300' }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between">
                                <span className="font-sans font-semibold text-gray-700">{item.channel}</span>
                                <span className="font-mono text-gray-500">{item.val} ({item.pct}%)</span>
                              </div>
                              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ========================================== */}
                {/* TAB 3: ZYNE AI SANDBOX                     */}
                {/* ========================================== */}
                {activeTab === 'zyne-ai' && (
                  <div className="relative min-h-[400px]">
                    {activePlan === 'free' && (
                      <LockedTabOverlay tabName="Zyne AI Sandbox" onUpgrade={() => setActiveTab('profile')} />
                    )}
                    <div className={`grid lg:grid-cols-12 gap-8 font-sans ${activePlan === 'free' ? 'filter blur-[4px] pointer-events-none select-none' : ''}`}>
                      
                      {/* Left Column: Preset triggers */}
                      <div className="lg:col-span-4 space-y-4 text-left">
                        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                          <h3 className="text-base font-heading font-extrabold text-gray-900 mb-3 border-b border-gray-100 pb-2">Suggested Vectors</h3>
                          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                            Trigger pre-configured diagnostic vector templates to review strategy checklists instantly.
                          </p>

                          <div className="space-y-2">
                            {SIMULATOR_PRESETS.map(preset => (
                              <button
                                key={preset.id}
                                onClick={() => handlePresetTrigger(preset.question, preset.aiBrief, preset.advisorySteps)}
                                className="w-full text-left p-3 border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-all block cursor-pointer focus:outline-none"
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-mono text-[9px] text-emerald-600 font-bold uppercase tracking-wider">{preset.category}</span>
                                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                                </div>
                                <p className="truncate text-gray-600 leading-snug">{preset.question}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Chat sandbox window */}
                      <div className="lg:col-span-8">
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm h-[560px] overflow-hidden flex flex-col justify-between">
                          
                          {/* Box Header */}
                          <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                                <Cpu className="w-5 h-5" />
                              </div>
                              <div className="text-left">
                                <h4 className="font-heading font-extrabold text-gray-950 text-sm">Zyne AI Core Sandbox</h4>
                                <span className="text-[9.5px] font-mono text-emerald-600 uppercase tracking-widest leading-none font-bold">Vector Version v4.1</span>
                              </div>
                            </div>
                          </div>

                          {/* Message Pane */}
                          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gray-50/30 text-left text-sm leading-relaxed">
                            {chatMessages.map((msg, idx) => (
                              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                                  msg.sender === 'user'
                                    ? 'bg-emerald-500 text-white rounded-br-none'
                                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                                }`}>
                                  <p>{msg.text}</p>
                                  
                                  {msg.steps && msg.steps.length > 0 && (
                                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                                      <span className="block text-[9.5px] font-mono uppercase font-bold tracking-wider text-emerald-600">Strategic Resolution Checklist:</span>
                                      <ul className="space-y-1.5 pl-4 list-decimal text-xs text-gray-600 font-sans">
                                        {msg.steps.map((st, sIdx) => (
                                          <li key={sIdx}>{st}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}

                            {zyneTyping && (
                              <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-3.5 flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Send Form */}
                          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white flex space-x-3">
                            <input 
                              type="text"
                              placeholder="Ask Zyne AI about UAE sales tax, Noon FBN warehouse rules, or branding..."
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              className="flex-1 bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder-gray-400"
                            />
                            <button
                              type="submit"
                              className="px-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center transition-all focus:outline-none cursor-pointer"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </form>

                      </div>
                    </div>
                  </div>
                </div>
              )}

                {/* ========================================== */}
                {/* TAB 4: ADVISORY BOOKINGS                   */}
                {/* ========================================== */}
                {activeTab === 'bookings' && (
                  <div className="relative min-h-[400px]">
                    {activePlan === 'free' && (
                      <LockedTabOverlay tabName="Advisory Match" onUpgrade={() => setActiveTab('profile')} />
                    )}
                    <div className={`grid lg:grid-cols-12 gap-8 font-sans text-left ${activePlan === 'free' ? 'filter blur-[4px] pointer-events-none select-none' : ''}`}>
                      
                      {/* Left Column: Advisor Details & Booking */}
                      <div className="lg:col-span-7 space-y-6">
                        
                        {/* Advisor Info Box */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
                          <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest font-bold">Your Matched Board Member</span>
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                            <img 
                              src={matchedAdvisor.avatar} 
                              alt={matchedAdvisor.name} 
                              className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
                            />
                            <div>
                              <h3 className="font-heading font-extrabold text-gray-905 text-lg">{matchedAdvisor.name}</h3>
                              <p className="text-xs text-gray-500 font-semibold">{matchedAdvisor.role}</p>
                              <span className="text-[11px] font-mono text-emerald-600 mt-1 block">{matchedAdvisor.formerRole}</span>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 leading-relaxed pt-2 border-t border-gray-100">
                            {matchedAdvisor.bio}
                          </p>
                        </div>

                        {/* Scheduling Form */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
                          <h3 className="text-base font-heading font-extrabold text-gray-900 border-b border-gray-100 pb-3">Request Strategic Consultation</h3>

                          {bookingSuccess && (
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-3 text-emerald-700">
                              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 animate-bounce" />
                              <span className="text-xs font-semibold">Consultation request registered. Check matching status below!</span>
                            </div>
                          )}

                          <form onSubmit={handleBooking} className="grid sm:grid-cols-2 gap-4 text-xs">
                            <div>
                              <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Date</label>
                              <input 
                                type="date"
                                required
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 focus:outline-none transition-all cursor-pointer text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Preferred Time</label>
                              <select 
                                value={newTime}
                                onChange={(e) => setNewTime(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 focus:outline-none transition-all cursor-pointer text-sm text-gray-950"
                              >
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:30 AM">11:30 AM</option>
                                <option value="02:00 PM">02:00 PM</option>
                                <option value="03:30 PM">03:30 PM</option>
                              </select>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Advisory Topic</label>
                              <select 
                                value={newTopic}
                                onChange={(e) => setNewTopic(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 focus:outline-none transition-all cursor-pointer text-sm text-gray-955"
                              >
                                <option value="Strategic Performance Metrics">Strategic Performance Metrics</option>
                                <option value="Shopify Checkout & Conversion Optimization">Shopify Checkout & Conversion Optimization</option>
                                <option value="Amazon UAE Campaign Restructuring">Amazon UAE Campaign Restructuring</option>
                                <option value="Supplier Milestone & Cash Runway Audits">Supplier Milestone & Cash Runway Audits</option>
                              </select>
                            </div>

                            <button
                              type="submit"
                              className="sm:col-span-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer focus:outline-none mt-2"
                            >
                              Submit Consultation Request
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Right Column: Sessions list */}
                      <div className="lg:col-span-5">
                        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                          <h3 className="text-base font-heading font-extrabold text-gray-900 border-b border-gray-100 pb-3">Consultation Schedule</h3>
                          
                          <div className="space-y-3">
                            {sessions.map(s => (
                              <div key={s.id} className="p-4 border border-gray-100 bg-gray-55/40 rounded-xl relative overflow-hidden flex flex-col justify-between h-[120px]">
                                <div>
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-heading font-bold text-xs text-gray-900 max-w-[200px] truncate">{s.topic}</h4>
                                    <span className={`text-[8.5px] font-mono uppercase font-bold px-1.5 py-0.5 rounded border ${
                                      s.status === 'Approved'
                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                        : 'bg-yellow-50 border-yellow-100 text-yellow-600'
                                    }`}>{s.status}</span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-4 border-t border-gray-100 pt-3 text-[10.5px] text-gray-400 font-mono">
                                  <div className="flex items-center">
                                    <Calendar className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                                    <span>{s.date}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                                    <span>{s.time}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ========================================== */}
                {/* TAB 5: RESOURCES PLAYBOOKS                 */}
                {/* ========================================== */}
                {activeTab === 'resources' && (
                  <div className="relative min-h-[400px]">
                    {activePlan === 'free' && (
                      <LockedTabOverlay tabName="Playbooks Library" onUpgrade={() => setActiveTab('profile')} />
                    )}
                    <div className={`space-y-6 text-left font-sans ${activePlan === 'free' ? 'filter blur-[4px] pointer-events-none select-none' : ''}`}>
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-base font-heading font-extrabold text-gray-900 border-b border-gray-100 pb-3 mb-4">Advisory Document Library</h3>
                        <p className="text-xs text-gray-500 mb-6 max-w-2xl leading-relaxed">
                          Download verified templates and strategic briefs written by Think10 advisers mapping GCC shipping and brand operations.
                        </p>

                        <div className="grid sm:grid-cols-3 gap-5">
                          {[
                            { title: 'Jebel Ali Customs Guide', desc: 'Dubai custom imports filing and tariff clearance checklists.', name: 'jebel_ali_customs.pdf' },
                            { title: 'Noon FBN Logistics Blueprint', desc: 'Step-by-step warehouse staging plan for Express Delivery tags.', name: 'noon_fbn_staging.pdf' },
                            { title: 'Amazon Ads Campaign Template', desc: 'Pre-load keyword matrices for UAE specific PPC search campaigns.', name: 'amazon_ppc_keywords.xlsx' }
                          ].map((book, idx) => (
                            <div key={idx} className="border border-gray-100 bg-gray-50/50 rounded-2xl p-5 flex flex-col justify-between h-[200px] text-left">
                              <div>
                                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 font-bold px-2 py-0.5 rounded uppercase">Premium Brief</span>
                                <h4 className="font-heading font-bold text-xs text-gray-900 mt-2">{book.title}</h4>
                                <p className="text-[10.5px] text-gray-400 mt-1">{book.desc}</p>
                              </div>

                              <button
                                onClick={() => simulateDownload(book.title)}
                                disabled={downloadingPlaybook !== null}
                                className="w-full mt-4 py-2 px-3 bg-emerald-500 hover:bg-emerald-650 text-white font-heading font-bold text-[10px] rounded-xl flex items-center justify-center space-x-1.5 focus:outline-none transition-all cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>{downloadingPlaybook === book.title ? 'Downloading...' : 'Download Resource'}</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================== */}
                {/* TAB 6: KYC & SUPPORT                       */}
                {/* ========================================== */}
                {activeTab === 'profile' && (
                  <div className="space-y-8 text-left font-sans">
                    
                    {/* Subscription & Limits Panel */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                      <div className="flex items-center space-x-2.5 border-b border-gray-100 pb-4">
                        <Sparkles className="w-5.5 h-5.5 text-emerald-600" />
                        <div>
                          <h3 className="text-base font-heading font-extrabold text-gray-900">Subscription & Usage Limits</h3>
                          <p className="text-xs text-gray-500 mt-0.5">Manage your service tier, monitor AI tokens, and book consultant hours.</p>
                        </div>
                      </div>

                      {/* Usage meters */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Plan Badge */}
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Active Service Plan</span>
                            <span className="text-lg font-heading font-bold text-gray-900 mt-1 block">{planDetails.name}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg mt-3 inline-block self-start">
                            {planDetails.price}
                          </span>
                        </div>

                        {/* AI Tokens Remaining */}
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Zyne AI Token Balance</span>
                            <span className="text-xs font-bold text-gray-900">
                              {activePlan === 'enterprise' ? 'Unlimited' : `${(planDetails.tokensLimit - planDetails.tokensUsed).toLocaleString()} remaining`}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Used: {planDetails.tokensUsed.toLocaleString()} / {activePlan === 'enterprise' ? 'Unlimited' : planDetails.tokensLimit.toLocaleString()} tokens
                          </div>
                          {activePlan !== 'enterprise' ? (
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all duration-505" style={{ width: `${(planDetails.tokensUsed / planDetails.tokensLimit) * 100}%` }} />
                            </div>
                          ) : (
                            <div className="w-full h-2 bg-emerald-500 rounded-full" />
                          )}
                        </div>

                        {/* Consultant Hours Remaining */}
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Advisory Sessions</span>
                            <span className="text-xs font-bold text-gray-900">
                              {activePlan === 'free' ? '0 hours' : `${planDetails.hoursLimit - planDetails.hoursUsed} hours left`}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Used: {planDetails.hoursUsed} / {planDetails.hoursLimit} session hours
                          </div>
                          {planDetails.hoursLimit > 0 ? (
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all duration-505" style={{ width: `${(planDetails.hoursUsed / planDetails.hoursLimit) * 100}%` }} />
                            </div>
                          ) : (
                            <div className="w-full h-2 bg-gray-200 rounded-full" />
                          )}
                        </div>
                      </div>

                      {/* Interactive Upgrade Cards */}
                      <div className="pt-4 border-t border-gray-100 space-y-4">
                        <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Available Upgrade Paths</h4>
                        
                        <div className="grid md:grid-cols-3 gap-5">
                          {/* Free Card */}
                          <div className={`border rounded-2xl p-5 space-y-3 relative text-left ${activePlan === 'free' ? 'border-emerald-500 bg-emerald-50/10 shadow-sm' : 'border-gray-150'}`}>
                            {activePlan === 'free' && <span className="absolute top-3 right-3 text-[9px] font-mono font-bold text-emerald-600 bg-emerald-105 border border-emerald-200 px-1.5 py-0.5 rounded">Active Plan</span>}
                            <h5 className="font-heading font-extrabold text-sm text-gray-900">Free Starter Tier</h5>
                            <p className="text-[11px] text-gray-450 leading-relaxed">Basic overview metrics and UAE trade license setup quiz tools.</p>
                            <button
                              type="button"
                              disabled
                              className="w-full py-2 bg-gray-100 text-gray-400 font-heading text-[10px] font-bold uppercase rounded-xl cursor-default"
                            >
                              {activePlan === 'free' ? 'Current Tier' : 'Downgrade Disabled'}
                            </button>
                          </div>

                          {/* Growth Card */}
                          <div className={`border rounded-2xl p-5 space-y-3 relative text-left ${activePlan === 'growth' ? 'border-emerald-500 bg-emerald-50/10 shadow-sm' : 'border-gray-150 hover:border-gray-300'}`}>
                            {activePlan === 'growth' && <span className="absolute top-3 right-3 text-[9px] font-mono font-bold text-emerald-600 bg-emerald-105 border border-emerald-200 px-1.5 py-0.5 rounded">Active Plan</span>}
                            <h5 className="font-heading font-extrabold text-sm text-gray-900">Growth Partner Tier</h5>
                            <p className="text-[11px] text-gray-450 leading-relaxed">Unlocks Analytics Hub, Zyne AI, 50k tokens, and 10 hours matches.</p>
                            <button
                              type="button"
                              onClick={() => {
                                setActivePlan('growth');
                                alert('Successfully upgraded to Growth Partner tier! Analytics Hub and Zyne AI Sandbox are now unlocked.');
                              }}
                              className={`w-full py-2 font-heading text-[10px] font-bold uppercase rounded-xl transition-all cursor-pointer ${
                                activePlan === 'growth' 
                                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-250' 
                                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                              }`}
                            >
                              {activePlan === 'growth' ? 'Current Plan' : 'Upgrade Plan (AED 499)'}
                            </button>
                          </div>

                          {/* Enterprise Card */}
                          <div className={`border rounded-2xl p-5 space-y-3 relative text-left ${activePlan === 'enterprise' ? 'border-emerald-500 bg-emerald-50/10 shadow-sm' : 'border-gray-150 hover:border-gray-300'}`}>
                            {activePlan === 'enterprise' && <span className="absolute top-3 right-3 text-[9px] font-mono font-bold text-emerald-600 bg-emerald-105 border border-emerald-200 px-1.5 py-0.5 rounded">Active Plan</span>}
                            <h5 className="font-heading font-extrabold text-sm text-gray-900">Enterprise Scale Tier</h5>
                            <p className="text-[11px] text-gray-450 leading-relaxed">Full premium playbooks, 150k AI tokens, and 30 hours consultation sessions.</p>
                            <button
                              type="button"
                              onClick={() => {
                                setActivePlan('enterprise');
                                alert('Successfully upgraded to Enterprise Scale tier! Full premium playbooks and unlimited advisory metrics are unlocked.');
                              }}
                              className={`w-full py-2 font-heading text-[10px] font-bold uppercase rounded-xl transition-all cursor-pointer ${
                                activePlan === 'enterprise' 
                                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-250' 
                                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                              }`}
                            >
                              {activePlan === 'enterprise' ? 'Current Plan' : 'Upgrade Plan (AED 1,499)'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* KYC & Support Columns split */}
                    <div className="grid lg:grid-cols-12 gap-8">
                      
                      {/* Left Column: KYC Vault docs */}
                      <div className="lg:col-span-6 space-y-6">
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                        <div className="flex items-center space-x-2.5 border-b border-gray-100 pb-3.5">
                          <ShieldCheck className="w-5.5 h-5.5 text-emerald-600" />
                          <div>
                            <h3 className="text-lg font-heading font-bold text-gray-900">UAE Compliance Verification</h3>
                            <p className="text-xs text-gray-550 mt-0.5">Commercial registration records filed for DED auditing.</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3.5 border border-gray-100 bg-gray-50/50 rounded-xl">
                            <div>
                              <span className="block text-xs font-bold text-gray-900">Commercial Trade License</span>
                              <span className="block text-[9px] font-mono text-gray-450 mt-0.5">{licenseFile || 'Trade_License_Draft_DED.pdf'}</span>
                            </div>
                            <span className="text-[9.5px] font-mono bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold px-2 py-0.5 rounded">Verified</span>
                          </div>

                          <div className="flex justify-between items-center p-3.5 border border-gray-100 bg-gray-50/50 rounded-xl">
                            <div>
                              <span className="block text-xs font-bold text-gray-900">Authorized Signatory ID</span>
                              <span className="block text-[9px] font-mono text-gray-450 mt-0.5">{idFile || 'Emirates_ID_Signatory_Copy.pdf'}</span>
                            </div>
                            <span className="text-[9.5px] font-mono bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold px-2 py-0.5 rounded">Verified</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-emerald-700 text-xs leading-relaxed">
                          <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span>All documents are encrypted with SHA-256 and stored on localized GCC servers. Document verification meets all DED guidelines.</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Support Tickets */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
                        <div className="flex items-center space-x-2.5 border-b border-gray-100 pb-3">
                          <LifeBuoy className="w-5.5 h-5.5 text-emerald-600" />
                          <div>
                            <h3 className="text-base font-heading font-extrabold text-gray-900">Help Desk Support</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Submit platform tickets directly to Think10 admin specialists.</p>
                          </div>
                        </div>

                        {ticketSuccess && (
                          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-3 text-emerald-700">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                            <span className="text-xs font-semibold">Support ticket created successfully! Admin will respond shortly.</span>
                          </div>
                        )}

                        <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Category</label>
                              <select 
                                value={ticketCategory}
                                onChange={(e) => setTicketCategory(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-gray-950 focus:outline-none transition-all cursor-pointer"
                              >
                                <option value="Billing & Subscription">Billing & Subscription</option>
                                <option value="Advisory Matching">Advisory Matching</option>
                                <option value="Compliance / DED KYC">Compliance / DED KYC</option>
                                <option value="Technical Bug">Technical Bug</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Subject</label>
                              <input 
                                type="text"
                                required
                                placeholder="Short subject summary"
                                value={ticketSubject}
                                onChange={(e) => setBrandSubject(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Description</label>
                            <textarea 
                              rows={3}
                              required
                              placeholder="Detail your request..."
                              value={ticketDesc}
                              onChange={(e) => setTicketDesc(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3 py-3 text-xs focus:outline-none transition-all"
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer flex items-center justify-center space-x-1.5 focus:outline-none"
                          >
                            <PlusCircle className="w-4 h-4" />
                            <span>Create Support Ticket</span>
                          </button>
                        </form>

                        <div className="space-y-2.5 pt-4 border-t border-gray-100">
                          <h4 className="text-xs font-mono font-bold text-gray-450 uppercase tracking-widest">Support History Log</h4>
                          
                          {tickets.map(t => (
                            <div key={t.id} className="p-3.5 border border-gray-100 bg-gray-55/30 rounded-xl">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-mono text-[9px] text-gray-450 font-bold">ID: {t.id}</span>
                                <span className="text-[8.5px] font-mono uppercase bg-yellow-50 text-yellow-600 border border-yellow-100 font-bold px-1.5 py-0.5 rounded">{t.status}</span>
                              </div>
                              <h5 className="font-heading font-bold text-xs text-gray-900">{t.subject}</h5>
                              <p className="text-[10.5px] text-gray-500 mt-1 leading-snug">{t.description}</p>
                              <span className="text-[9px] font-mono text-emerald-600 bg-white px-2 py-0.5 rounded border border-gray-150 inline-block mt-2">CAT: {t.category}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Quick Actions Footer Bar */}
              <div className="mt-12 flex flex-wrap justify-between items-center bg-white border border-gray-100 rounded-2xl p-6 shadow-sm gap-4 w-full">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-gray-400">SECURE SHELL CONNECTION ESTABLISHED</span>
                </div>
                
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center space-x-1.5 text-xs text-red-500 hover:text-red-655 font-semibold cursor-pointer focus:outline-none"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out of Command Center</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface LockedTabOverlayProps {
  tabName: string;
  onUpgrade: () => void;
}

function LockedTabOverlay({ tabName, onUpgrade }: LockedTabOverlayProps) {
  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-30 flex flex-col items-center justify-center rounded-3xl p-6 text-center">
      <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center shadow-sm mb-4">
        <Lock className="w-6 h-6 text-amber-600 animate-bounce" />
      </div>
      <h3 className="text-lg font-heading font-bold text-gray-900">{tabName} is Locked</h3>
      <p className="text-xs text-gray-500 max-w-sm mt-1.5 font-sans leading-relaxed">
        This panel is reserved for premium growth and enterprise subscribers. Upgrade your plan to unlock real-time market data nodes and direct consultant bookings.
      </p>
      <button
        onClick={onUpgrade}
        className="mt-5 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/25 cursor-pointer focus:outline-none"
      >
        Upgrade Plan to Unlock
      </button>
    </div>
  );
}
