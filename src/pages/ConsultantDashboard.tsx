import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { 
  Briefcase, Users, Calendar, MessageSquare, Clock, ArrowRight, Check, CheckCircle, RefreshCw,
  Play, Plus, Search, AlertCircle, Trash2, Inbox, ChevronRight, TrendingUp, Send, FileText, Sparkles, LogOut, ShieldCheck,
  Menu, X
} from 'lucide-react';
import { ADVISORY_EXPERTS } from '../data';

interface ClientProfile {
  id: string;
  name: string;
  company: string;
  category: string;
  score: number;
  bottleneck: string;
  status: string;
  joinedDate: string;
  dimensions: Record<string, number>;
}

interface PendingSession {
  id: string;
  clientName: string;
  company: string;
  date: string;
  time: string;
  topic: string;
  status: 'Pending' | 'Approved';
}

export default function ConsultantDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'clients' | 'scheduler' | 'inbox'>('clients');

  // Active Clients Data
  const [clients, setClients] = useState<ClientProfile[]>([
    {
      id: 'c1',
      name: 'Yasmin Al-Maktoum',
      company: 'Maison de Fleur (Dubai Boutique)',
      category: 'Retail Business Owner',
      score: 42,
      bottleneck: 'Foot-traffic conversion and physical space layout optimizations',
      status: 'Active',
      joinedDate: 'Jan 15, 2026',
      dimensions: { brand: 5, retailOps: 3, marketplace: 4, amazon: 2, noon: 3, tiktok: 2, pricing: 5, cashflow: 4, marketing: 3, talent: 4 }
    },
    {
      id: 'c2',
      name: 'Dina H. Al-Ghurair',
      company: 'Zora Beauty',
      category: 'E-commerce Brand',
      score: 68,
      bottleneck: 'Noon FBN logistics badging and high PPC CAC metrics',
      status: 'Active',
      joinedDate: 'Mar 10, 2026',
      dimensions: { brand: 8, retailOps: 4, marketplace: 7, amazon: 6, noon: 8, tiktok: 7, pricing: 6, cashflow: 6, marketing: 7, talent: 6 }
    },
    {
      id: 'c3',
      name: 'Tareq Al-Jamil',
      company: 'Jamil Apparel',
      category: 'Growing Omnichannel Founder',
      score: 86,
      bottleneck: 'Working capital funding structures and manufacturing lead times',
      status: 'Active',
      joinedDate: 'Jun 02, 2026',
      dimensions: { brand: 9, retailOps: 8, marketplace: 8, amazon: 7, noon: 9, tiktok: 8, pricing: 9, cashflow: 8, marketing: 9, talent: 9 }
    }
  ]);

  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(clients[0]);

  // Session approvals state
  const [sessions, setSessions] = useState<PendingSession[]>([
    {
      id: 'ps1',
      clientName: 'Yasmin Al-Maktoum',
      company: 'Maison de Fleur',
      date: '2026-07-14',
      time: '11:00 AM',
      topic: 'Omnichannel Launch Strategy Audit',
      status: 'Pending'
    },
    {
      id: 'ps2',
      clientName: 'Dina H. Al-Ghurair',
      company: 'Zora Beauty',
      date: '2026-07-16',
      time: '02:00 PM',
      topic: 'PPC Ads & Catalog Indexing Review',
      status: 'Pending'
    }
  ]);

  const handleApproveSession = (id: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: 'Approved' } : s));
  };

  const handleRejectSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  // AI roadmap publishing state
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [customTasks, setCustomTasks] = useState<string>('1. Restructure seller profile listing descriptors\n2. Shift fulfillment metrics to 100% Noon FBN inventory badging\n3. Set Amazon PPC keyword margins to limit CPC rates under AED 1.50');

  const handlePublishRoadmap = () => {
    if (!selectedClient) return;
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    }, 1500);
  };

  // Dynamic AI roadmap generator helper
  const handleGenerateAiTasks = () => {
    if (!selectedClient) return;
    const dimensionsMap: Record<string, string> = {
      brand: 'Brand Positioning Narrative',
      retailOps: 'Storefront Operations Layout',
      marketplace: 'Omnichannel Expansion',
      amazon: 'Amazon PPC Keywords Ads & Indexing',
      noon: 'Noon FBN Logistics Badging',
      tiktok: 'TikTok Shop Commerce & Affiliates',
      pricing: 'Pricing Margin Restructuring',
      cashflow: 'Cash Conversion Sourcing Sizing',
      marketing: 'Retention Email & WhatsApp flow',
      talent: 'Staff Incentive KPI Frameworks'
    };

    const sortedDims = Object.entries(selectedClient.dimensions)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3); // 3 worst performing dimensions

    const generated = sortedDims.map((dim, idx) => {
      const label = dimensionsMap[dim[0]] || dim[0];
      if (dim[0] === 'amazon') return `${idx + 1}. Optimize Exact Match bids for Amazon UAE ads targeting regional high-intent searches (Current rate: ${dim[1]}/10)`;
      if (dim[0] === 'noon') return `${idx + 1}. Restructure FBN warehouse replenishment size split to secure Noon Express badging (Current rate: ${dim[1]}/10)`;
      if (dim[0] === 'brand') return `${idx + 1}. Audit visual communication rules and storyboards to appeal to premium GCC consumers (Current rate: ${dim[1]}/10)`;
      if (dim[0] === 'retailOps') return `${idx + 1}. Restructure staff roster targets and visual storefront pathing layout guidelines (Current rate: ${dim[1]}/10)`;
      if (dim[0] === 'cashflow') return `${idx + 1}. Request manufacturer contract shifts targeting a 30/70 production advance splits model (Current rate: ${dim[1]}/10)`;
      return `${idx + 1}. Build a comprehensive strategy for ${label} to resolve current scaling constraints (Current rate: ${dim[1]}/10)`;
    }).join('\n');

    setCustomTasks(generated);
  };

  // Meeting Notes Logger State
  interface MeetingNote {
    id: string;
    clientName: string;
    company: string;
    note: string;
    date: string;
  }

  const [meetingNotes, setMeetingNotes] = useState<Record<string, MeetingNote[]>>({
    c1: [
      { id: 'n1', clientName: 'Yasmin Al-Maktoum', company: 'Maison de Fleur', note: 'Discussed boutique design guidelines in Dubai. Reviewing Abu Dhabi storefront options next.', date: '2026-07-05' }
    ],
    c2: [
      { id: 'n2', clientName: 'Dina H. Al-Ghurair', company: 'Zora Beauty', note: 'Reviewed Noon FBN warehousing logistics guidelines. Shipment splitting looks solid.', date: '2026-07-09' }
    ],
    c3: [
      { id: 'n3', clientName: 'Tareq Al-Jamil', company: 'Jamil Apparel', note: 'Reviewed DED trade compliance registration forms and authorized Emirates ID details.', date: '2026-07-10' }
    ]
  });

  const [newNoteText, setNewNoteText] = useState('');
  const [noteSuccess, setNoteSuccess] = useState(false);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !newNoteText.trim()) return;

    const newNote: MeetingNote = {
      id: `n-${Date.now()}`,
      clientName: selectedClient.name,
      company: selectedClient.company,
      note: newNoteText,
      date: new Date().toISOString().split('T')[0]
    };

    setMeetingNotes(prev => ({
      ...prev,
      [selectedClient.id]: [newNote, ...(prev[selectedClient.id] || [])]
    }));
    setNewNoteText('');
    setNoteSuccess(true);
    setTimeout(() => setNoteSuccess(false), 3000);
  };

  // Availability Scheduler config state
  const [availabilityDays, setAvailabilityDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday']);
  const [workingHoursStart, setWorkingHoursStart] = useState('09:00 AM');
  const [workingHoursEnd, setWorkingHoursEnd] = useState('05:00 PM');
  const [availabilitySuccess, setAvailabilitySuccess] = useState(false);

  const handleSaveAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setAvailabilitySuccess(true);
    setTimeout(() => setAvailabilitySuccess(false), 3000);
  };

  // Inbox messaging simulation state
  const [chatInput, setChatInput] = useState('');
  const [inboxMessages, setInboxMessages] = useState<Record<string, { sender: 'advisor' | 'client'; text: string; time: string }[]>>({
    c1: [
      { sender: 'client', text: 'Hi, I updated my strategic score sliders on the dashboard. Could we review Jebel Ali supply options?', time: '09:12 AM' },
      { sender: 'advisor', text: 'Excellent, Yasmin. I see the updates. I will assemble a Jebel Ali customs preparation checklist before our call.', time: '09:30 AM' }
    ],
    c2: [
      { sender: 'client', text: 'Our Amazon RoAS hit 4.2x today! The PPC keyword tweaks worked.', time: 'Yesterday' },
      { sender: 'advisor', text: 'Fantastic results, Dina. Let us expand targeting to Noon.ae next.', time: 'Yesterday' }
    ],
    c3: [
      { sender: 'client', text: 'Marcus, could we discuss non-dilutive capital providers next week?', time: '2 days ago' }
    ]
  });

  const activeInboxClient = selectedClient || clients[0];
  const activeChatList = inboxMessages[activeInboxClient.id] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const newMsg = {
      sender: 'advisor' as const,
      text: chatInput,
      time: 'Just now'
    };

    setInboxMessages(prev => ({
      ...prev,
      [activeInboxClient.id]: [...(prev[activeInboxClient.id] || []), newMsg]
    }));
    setChatInput('');

    // Simulate auto client reply
    setTimeout(() => {
      const autoReply = {
        sender: 'client' as const,
        text: 'Thank you for the updates! Looking forward to reviewing this on our upcoming board call.',
        time: 'Just now'
      };
      setInboxMessages(prev => ({
        ...prev,
        [activeInboxClient.id]: [...(prev[activeInboxClient.id] || []), autoReply]
      }));
    }, 2000);
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-screen bg-[#F4FCF9] text-[#0F172A] w-full">
        
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
                <span className="text-[7.5px] font-mono tracking-widest text-gray-400 uppercase leading-none mt-0.5">Advisor Board</span>
              </div>
            </div>

            {/* Sidebar Links */}
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('clients')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                  activeTab === 'clients' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Clients Portfolio</span>
              </button>

              <button
                onClick={() => setActiveTab('scheduler')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                  activeTab === 'scheduler' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Scheduler</span>
              </button>

              <button
                onClick={() => setActiveTab('inbox')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                  activeTab === 'inbox' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inbox Workspace</span>
              </button>
            </nav>
          </div>

          {/* Profile & Logout Card */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-heading font-extrabold text-sm uppercase">
                F
              </div>
              <div className="truncate">
                <span className="block text-xs font-bold text-gray-900 leading-tight truncate">Fatima Al-Kamali</span>
                <span className="block text-[9.5px] text-gray-400 font-mono leading-none mt-0.5 truncate">Supply Chain Expert</span>
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
              className="p-1.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 focus:outline-none"
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
                      { id: 'clients', label: 'Clients Portfolio', icon: Users },
                      { id: 'scheduler', label: 'Scheduler', icon: Calendar },
                      { id: 'inbox', label: 'Inbox Workspace', icon: MessageSquare }
                    ].map(tab => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id as any);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none ${
                            activeTab === tab.id ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-55'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
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
                    <ShieldCheck className="w-4.5 h-4.5" />
                    <span>Advisor Portal System</span>
                  </div>
                  <h1 className="text-3xl font-heading font-extrabold text-gray-905 tracking-tight leading-tight">
                    Fatima Al-Kamali's Board Panel
                  </h1>
                </div>
              </div>

          {/* Tab contents */}
          {activeTab === 'clients' && (
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Clients side-list */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                    <h3 className="text-base font-heading font-bold text-gray-950">Active Accounts</h3>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {clients.length} Total
                    </span>
                  </div>

                  <div className="space-y-3">
                    {clients.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedClient(c)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex justify-between items-center cursor-pointer focus:outline-none ${
                          selectedClient?.id === c.id
                            ? 'bg-emerald-50/60 border-emerald-300 text-gray-950'
                            : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50 hover:border-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="min-w-0">
                          <h4 className="font-heading font-bold text-sm block truncate">{c.name}</h4>
                          <span className="text-[10px] text-gray-400 block truncate font-sans mt-0.5">{c.company}</span>
                          <span className="inline-block mt-2 text-[9px] font-mono bg-white px-2 py-0.5 rounded border border-gray-100 text-emerald-600">{c.category}</span>
                        </div>

                        <div className="text-right flex-shrink-0 ml-3">
                          <span className="text-lg font-heading font-extrabold text-gray-900 block">{c.score}%</span>
                          <span className="text-[9px] font-mono text-gray-400">INDEX</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Profile Details & Action Roadmap Builder */}
              <div className="lg:col-span-8">
                {selectedClient ? (
                  <div className="space-y-6">
                    
                    {/* Basic client profile */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-6 mb-6 gap-4">
                        <div>
                          <span className="inline-block text-[9px] font-mono bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-emerald-600 uppercase tracking-widest mb-2 font-bold">
                            FOUNDER PROFILE FILE
                          </span>
                          <h3 className="text-2xl font-heading font-extrabold text-gray-900">{selectedClient.name}</h3>
                          <p className="text-xs text-gray-400 font-sans mt-0.5">{selectedClient.company} • Matched on {selectedClient.joinedDate}</p>
                        </div>

                        <div className="flex items-center space-x-3 bg-emerald-500 text-white rounded-2xl px-5 py-3 shadow-md">
                          <div>
                            <span className="text-[9px] font-mono text-emerald-100 uppercase tracking-wider block">SCALING INDEX</span>
                            <span className="text-2xl font-heading font-extrabold">{selectedClient.score}%</span>
                          </div>
                          <TrendingUp className="w-6 h-6 text-emerald-100 flex-shrink-0" />
                        </div>
                      </div>

                      {/* Bottlenecks report */}
                      <div className="bg-red-50 border border-red-100 p-5 rounded-2xl mb-6">
                        <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest flex items-center space-x-1.5 mb-2">
                          <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
                          <span>Advisory Identified Bottleneck</span>
                        </h4>
                        <p className="text-sm text-red-800 font-sans leading-relaxed">
                          {selectedClient.bottleneck}
                        </p>
                      </div>

                      {/* Dimensions ratings */}
                      <h4 className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest mb-4">Strategic Vector Ratings</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {Object.entries(selectedClient.dimensions).map(([key, val]) => (
                          <div key={key} className="bg-gray-50/50 border border-gray-100 p-3 rounded-xl text-center">
                            <span className="text-[10px] text-gray-400 font-sans block truncate uppercase tracking-wider">{key}</span>
                            <span className="text-lg font-heading font-extrabold text-gray-900 mt-1 block">{val}/10</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Publish custom tasks to client's dashboard */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                        <div>
                          <h3 className="text-lg font-heading font-bold text-gray-900 flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-emerald-600" />
                            <span>Actionable Growth Planner</span>
                          </h3>
                          <p className="text-xs text-gray-500 font-sans mt-0.5">
                            Publish recommendations directly to the founder's growth roadmap checklist.
                          </p>
                        </div>
                        <button
                          onClick={handleGenerateAiTasks}
                          className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-250 px-3.5 py-2 rounded-xl font-bold transition-all flex items-center space-x-1.5 cursor-pointer focus:outline-none"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                          <span>Generate with Zyne AI</span>
                        </button>
                      </div>

                      {publishSuccess && (
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-3 text-emerald-700 mb-5">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 animate-pulse" />
                          <span className="text-xs font-sans font-medium">Strategic roadmap published successfully! Yasmin Al-Maktoum received the updates on her dashboard.</span>
                        </div>
                      )}

                      <div className="space-y-4">
                        <textarea
                          rows={4}
                          value={customTasks}
                          onChange={(e) => setCustomTasks(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all font-sans leading-relaxed"
                          placeholder="List custom milestones to push to client..."
                        />

                        <button
                          onClick={handlePublishRoadmap}
                          disabled={publishing}
                          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-100 disabled:text-gray-400 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
                        >
                          {publishing ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Publishing Milestones...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Publish Milestones to Client Dashboard</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Meeting Notes Logger */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center space-x-2.5 mb-4">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-lg font-heading font-bold text-gray-950 font-sans">Post-Call Advisor Logs</h3>
                      </div>
                      <p className="text-xs text-gray-500 font-sans mt-0.5 mb-5">
                        Log private summary notes for calls and milestones updates to maintain historical client records.
                      </p>

                      {noteSuccess && (
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-3 text-emerald-700 mb-5">
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="text-xs font-sans font-medium">Session notes cataloged successfully!</span>
                        </div>
                      )}

                      <form onSubmit={handleSaveNote} className="space-y-4 mb-6">
                        <textarea
                          rows={3}
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none transition-all font-sans leading-relaxed focus:outline-none"
                          placeholder="Type session summary notes..."
                        />
                        <button
                          type="submit"
                          disabled={!newNoteText.trim()}
                          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-100 disabled:text-gray-400 text-white font-heading text-xs font-bold rounded-xl transition-all cursor-pointer border border-transparent focus:outline-none"
                        >
                          Save Log Entry
                        </button>
                      </form>

                      {/* Notes list */}
                      <h4 className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest mb-3.5 font-bold">Advisor Notes History</h4>
                      <div className="space-y-3 font-sans">
                        {meetingNotes[selectedClient.id] && meetingNotes[selectedClient.id].length > 0 ? (
                          meetingNotes[selectedClient.id].map(n => (
                            <div key={n.id} className="p-4 border border-gray-100 bg-gray-50/50 rounded-xl">
                              <div className="flex justify-between items-center text-[10.5px] text-gray-400 font-mono mb-2">
                                <span>LOG ENTRY</span>
                                <span>{n.date}</span>
                              </div>
                              <p className="text-xs text-gray-650 font-sans leading-relaxed">{n.note}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-5 text-center text-gray-400 text-xs bg-gray-50 border border-gray-100 rounded-xl font-sans">
                            No logs registered for this client.
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="p-10 bg-white border border-gray-100 rounded-3xl text-center text-gray-400 text-sm">
                    Select a client to view profile details.
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === 'scheduler' && (
            <div className="space-y-6">
              
              {/* Vetting schedule requests panel */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center space-x-2.5 mb-6">
                  <Calendar className="w-5.5 h-5.5 text-emerald-600" />
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900">Board Session Authorization Queue</h3>
                    <p className="text-xs text-gray-500 mt-0.5 font-sans">Approve or reschedule incoming requests from matched clients.</p>
                  </div>
                </div>

                {sessions.length > 0 ? (
                  <div className="space-y-4 font-sans">
                    {sessions.map((s) => (
                      <div 
                        key={s.id}
                        className={`p-5 border rounded-2xl transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-5 ${
                          s.status === 'Approved'
                            ? 'bg-emerald-50 border-emerald-100'
                            : 'bg-gray-50/50 border-gray-100'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              s.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                            }`}>
                              {s.status}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">{s.company}</span>
                          </div>
                          
                          <h4 className="font-heading font-bold text-gray-950 text-base leading-tight">{s.topic}</h4>
                          
                          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
                            <p className="flex items-center"><Users className="w-3.5 h-3.5 text-emerald-600 mr-2" /> Founder: {s.clientName}</p>
                            <p className="flex items-center"><Clock className="w-3.5 h-3.5 text-emerald-600 mr-2" /> Date: {s.date} at {s.time}</p>
                          </div>
                        </div>

                        {s.status === 'Pending' ? (
                          <div className="flex space-x-2 w-full md:w-auto">
                            <button
                              onClick={() => handleApproveSession(s.id)}
                              className="flex-1 md:flex-none px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                            >
                              Approve Request
                            </button>
                            <button
                              onClick={() => handleRejectSession(s.id)}
                              className="flex-1 md:flex-none px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-red-500 font-heading text-xs font-bold rounded-xl transition-all cursor-pointer focus:outline-none"
                            >
                              Reschedule
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-emerald-600 text-xs font-bold font-mono">
                            <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                            <span>CONFIRMED ROOM</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 text-xs">
                    No active scheduling requests.
                  </div>
                )}
              </div>

              {/* Availability Configuration Panel */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center space-x-2.5 mb-5 border-b border-gray-100 pb-3">
                  <Clock className="w-5.5 h-5.5 text-emerald-600" />
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900 font-sans">Configure Weekly Advisory Hours</h3>
                    <p className="text-xs text-gray-500 mt-0.5 font-sans">Define your available days and timeframes for automatic booking proposals.</p>
                  </div>
                </div>

                {availabilitySuccess && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-3 text-emerald-700 mb-5">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 animate-pulse" />
                    <span className="text-xs font-sans font-medium">Availability parameters saved successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveAvailability} className="space-y-5 font-sans">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2.5">Available Days</label>
                    <div className="flex flex-wrap gap-2.5">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                        const isChecked = availabilityDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => {
                              if (isChecked) {
                                setAvailabilityDays(prev => prev.filter(d => d !== day));
                              } else {
                                setAvailabilityDays(prev => [...prev, day]);
                              }
                            }}
                            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                              isChecked 
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                                : 'bg-gray-55 border-gray-200 text-gray-550 hover:bg-gray-100'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1.5">Hours Start</label>
                      <select 
                        value={workingHoursStart}
                        onChange={(e) => setWorkingHoursStart(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 cursor-pointer focus:outline-none"
                      >
                        <option value="08:00 AM">08:00 AM</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1.5">Hours End</label>
                      <select 
                        value={workingHoursEnd}
                        onChange={(e) => setWorkingHoursEnd(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 cursor-pointer focus:outline-none"
                      >
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold rounded-xl transition-all cursor-pointer border border-transparent shadow-md shadow-emerald-500/20"
                  >
                    Commit Availability Rules
                  </button>
                </form>
              </div>

            </div>
          )}

          {activeTab === 'inbox' && (
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Inbox side-list */}
              <div className="lg:col-span-4 space-y-3">
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-base font-heading font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Advisory Dialogues</h3>
                  
                  <div className="space-y-2">
                    {clients.map(c => {
                      const chatHistory = inboxMessages[c.id] || [];
                      const lastMsg = chatHistory[chatHistory.length - 1];
                      return (
                        <button
                          key={c.id}
                          onClick={() => setSelectedClient(c)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all block cursor-pointer focus:outline-none ${
                            selectedClient?.id === c.id
                              ? 'bg-emerald-50 border-emerald-300 text-gray-950'
                              : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50 hover:border-gray-200 text-gray-700'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-heading font-bold text-xs truncate max-w-[150px]">{c.name}</h4>
                            <span className="text-[9px] font-mono text-gray-400">{lastMsg ? lastMsg.time : ''}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 truncate mt-1 leading-snug">{lastMsg ? lastMsg.text : 'Start dialogue...'}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Chat window */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm h-[550px] flex flex-col justify-between">
                  
                  {/* Chat header */}
                  <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-heading font-bold text-white text-xs">
                        {activeInboxClient.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-gray-950 text-sm">{activeInboxClient.name}</h4>
                        <span className="text-[9px] font-mono text-gray-400">{activeInboxClient.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message pane */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-sm bg-gray-50/30">
                    {activeChatList.map((m, idx) => (
                      <div key={idx} className={`flex ${m.sender === 'advisor' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-2xl p-4 leading-relaxed ${
                          m.sender === 'advisor'
                            ? 'bg-emerald-500 text-white rounded-br-none'
                            : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                        }`}>
                          <p>{m.text}</p>
                          <span className={`block text-[8.5px] text-right mt-1.5 font-mono ${m.sender === 'advisor' ? 'text-white/60' : 'text-gray-450'}`}>{m.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Send form */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white flex space-x-3">
                    <input
                      type="text"
                      placeholder={`Send reply message to ${activeInboxClient.name.split(' ')[0]}...`}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition-all font-sans"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="px-5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-xl flex items-center justify-center cursor-pointer transition-all focus:outline-none"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                </div>
              </div>

            </div>
          )}

            {/* Quick Actions Footer Bar */}
            <div className="mt-12 flex flex-wrap justify-between items-center bg-white border border-gray-100 rounded-2xl p-6 shadow-sm gap-4 w-full">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-gray-400">ENCRYPTED ADVISOR CONNECTION SECURED</span>
              </div>
              
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center space-x-1.5 text-xs text-red-500 hover:text-red-655 font-semibold cursor-pointer focus:outline-none"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out of Advisor System</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </>
);
}
