import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { 
  ShieldAlert, Users, Settings, Activity, Terminal, CheckCircle, RefreshCw, AlertCircle, ArrowRight,
  LogOut, DollarSign, Check, X, Shield, Plus, HeartPulse, Clock, Play, FileText, ShieldCheck, Menu
} from 'lucide-react';

interface Application {
  id: string;
  name: string;
  formerRole: string;
  specialty: string;
  appliedDate: string;
}

interface EventLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning';
  message: string;
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analytics' | 'approvals' | 'settings' | 'users' | 'kyc' | 'billing'>('analytics');

  // Interactive system variables
  const [stats, setStats] = useState({
    totalUsers: 1248,
    activeConsultants: 24,
    pendingApprovals: 3,
    systemStatus: 'Operational',
    revenue: 412500
  });

  // Pending applications queue
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'ap1',
      name: 'Layla Mansour',
      formerRole: 'Former Amazon UAE PPC Account Growth Lead',
      specialty: 'Amazon SEO & Bidding Systems',
      appliedDate: 'July 09, 2026'
    },
    {
      id: 'ap2',
      name: 'Tareq Al-Jamil',
      formerRole: 'Former Storefront Operations Director at Majid Al Futtaim',
      specialty: 'Omnichannel Physical Distribution',
      appliedDate: 'July 10, 2026'
    },
    {
      id: 'ap3',
      name: 'Dr. Karim Ghandour',
      formerRole: 'Former CFO at Gulf Retail Ventures',
      specialty: 'Sourcing Sizing & Trade Credit structures',
      appliedDate: 'July 11, 2026'
    }
  ]);

  // Live log stream
  const [logs, setLogs] = useState<EventLog[]>([
    { id: 'l1', timestamp: '10:14:02 AM', type: 'info', message: 'Admin dashboard initialized.' },
    { id: 'l2', timestamp: '10:11:15 AM', type: 'success', message: 'Dina H. Al-Ghurair matched with advisor Fatima Al-Kamali.' },
    { id: 'l3', timestamp: '10:08:42 AM', type: 'info', message: 'Yasmin Al-Maktoum updated strategic dimension scores.' },
    { id: 'l4', timestamp: '09:55:10 AM', type: 'warning', message: 'Zyne AI sandbox traffic spike detected (+15%).' }
  ]);

  // Handle application approval
  const handleApprove = (app: Application) => {
    // Remove from applications list
    setApplications(prev => prev.filter(a => a.id !== app.id));
    // Update stats
    setStats(prev => ({
      ...prev,
      activeConsultants: prev.activeConsultants + 1,
      pendingApprovals: prev.pendingApprovals - 1
    }));
    // Append to live logs
    const newLog: EventLog = {
      id: `l-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'success',
      message: `Approved application: ${app.name} registered as Advisor.`
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Handle application rejection
  const handleReject = (app: Application) => {
    setApplications(prev => prev.filter(a => a.id !== app.id));
    setStats(prev => ({
      ...prev,
      pendingApprovals: prev.pendingApprovals - 1
    }));
    const newLog: EventLog = {
      id: `l-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'warning',
      message: `Rejected application: ${app.name} profile archived.`
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Interactive CRM platform user logs
  interface PlatformUser {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'consultant' | 'admin';
    status: 'Active' | 'Suspended';
    plan?: 'Free Tier' | 'Growth Partner Tier' | 'Enterprise Scale Tier' | 'N/A';
    planEnd?: string;
    tokensUsed?: number;
    tokensLimit?: number;
    hoursUsed?: number;
    hoursLimit?: number;
  }

  const [usersList, setUsersList] = useState<PlatformUser[]>([
    { id: 'u1', name: 'Yasmin Al-Maktoum', email: 'yasmin@maisondefleur.ae', role: 'user', status: 'Active', plan: 'Growth Partner Tier', planEnd: 'Dec 12, 2026', tokensUsed: 18450, tokensLimit: 50000, hoursUsed: 3, hoursLimit: 10 },
    { id: 'u2', name: 'Dina H. Al-Ghurair', email: 'dina@zorabeauty.com', role: 'user', status: 'Active', plan: 'Enterprise Scale Tier', planEnd: 'Feb 15, 2027', tokensUsed: 30000, tokensLimit: 150000, hoursUsed: 12, hoursLimit: 30 },
    { id: 'u3', name: 'Tareq Al-Jamil', email: 'tareq@jamilapparel.com', role: 'user', status: 'Active', plan: 'Free Tier', planEnd: 'N/A', tokensUsed: 500, tokensLimit: 2000, hoursUsed: 0, hoursLimit: 0 },
    { id: 'u4', name: 'Fatima Al-Kamali', email: 'fatima@think10.ae', role: 'consultant', status: 'Active', plan: 'N/A', planEnd: 'N/A', tokensUsed: 0, tokensLimit: 0, hoursUsed: 0, hoursLimit: 0 },
    { id: 'u5', name: 'Amira Al-Mansoori', email: 'amira@think10.ae', role: 'consultant', status: 'Active', plan: 'N/A', planEnd: 'N/A', tokensUsed: 0, tokensLimit: 0, hoursUsed: 0, hoursLimit: 0 },
    { id: 'u6', name: 'System Root Admin', email: 'admin@think10.ae', role: 'admin', status: 'Active', plan: 'N/A', planEnd: 'N/A', tokensUsed: 0, tokensLimit: 0, hoursUsed: 0, hoursLimit: 0 }
  ]);

  const toggleUserStatus = (userId: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        const newLog: EventLog = {
          id: `l-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'warning',
          message: `User status updated: ${u.name} set to ${newStatus}.`
        };
        setLogs(logsPrev => [newLog, ...logsPrev]);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  // KYC compliance review vault state
  interface KycDocument {
    id: string;
    clientName: string;
    company: string;
    licenseFile: string;
    idFile: string;
    status: 'Verified' | 'Pending Review' | 'Revision Required';
  }

  const [kycDocs, setKycDocs] = useState<KycDocument[]>([
    { id: 'k1', clientName: 'Yasmin Al-Maktoum', company: 'Maison de Fleur', licenseFile: 'trade_license_ae_2026.pdf', idFile: 'authorized_signatory_id.jpg', status: 'Verified' },
    { id: 'k2', clientName: 'Dina H. Al-Ghurair', company: 'Zora Beauty', licenseFile: 'ded_beauty_license.pdf', idFile: 'emirates_id_dina.png', status: 'Verified' },
    { id: 'k3', clientName: 'Tareq Al-Jamil', company: 'Jamil Apparel', licenseFile: 'jamil_apparel_ded.pdf', idFile: 'tareq_passport_page.pdf', status: 'Pending Review' }
  ]);

  const handleVerifyKyc = (docId: string, action: 'approve' | 'reject') => {
    setKycDocs(prev => prev.map(doc => {
      if (doc.id === docId) {
        const newStatus = action === 'approve' ? 'Verified' : 'Revision Required';
        const newLog: EventLog = {
          id: `l-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: action === 'approve' ? 'success' : 'warning',
          message: `KYC documents verification status for ${doc.clientName} set to ${newStatus}.`
        };
        setLogs(logsPrev => [newLog, ...logsPrev]);
        return { ...doc, status: newStatus };
      }
      return doc;
    }));
  };

  // Invoices list State
  interface PlatformInvoice {
    id: string;
    clientName: string;
    company: string;
    tier: string;
    amount: number;
    date: string;
    status: 'Paid' | 'Unpaid';
  }

  const invoices: PlatformInvoice[] = [
    { id: 'inv-101', clientName: 'Yasmin Al-Maktoum', company: 'Maison de Fleur', tier: 'Elite Growth Package', amount: 8500, date: '2026-07-01', status: 'Paid' },
    { id: 'inv-102', clientName: 'Dina H. Al-Ghurair', company: 'Zora Beauty', tier: 'Elite Growth Package', amount: 8500, date: '2026-07-05', status: 'Paid' },
    { id: 'inv-103', clientName: 'Tareq Al-Jamil', company: 'Jamil Apparel', tier: 'Bespoke Scale Advisory', amount: 15000, date: '2026-07-10', status: 'Paid' }
  ];

  // Advisor Payouts state
  interface AdvisorPayout {
    id: string;
    advisorName: string;
    unpaidCommission: number;
    sessionsCount: number;
    status: 'Unpaid' | 'Paid';
  }

  const [payouts, setPayouts] = useState<AdvisorPayout[]>([
    { id: 'pay1', advisorName: 'Fatima Al-Kamali', unpaidCommission: 12800, sessionsCount: 16, status: 'Unpaid' },
    { id: 'pay2', advisorName: 'Amira Al-Mansoori', unpaidCommission: 8400, sessionsCount: 10, status: 'Unpaid' },
    { id: 'pay3', advisorName: 'Layla Mansour', unpaidCommission: 4400, sessionsCount: 5, status: 'Paid' }
  ]);

  // System Configurations State
  const [tokensLimit, setTokensLimit] = useState(1500);
  const [aiModel, setAiModel] = useState('zyne-core-v2.0-omni');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [configSuccess, setConfigSuccess] = useState(false);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSuccess(true);
    setTimeout(() => setConfigSuccess(false), 3000);
    const newLog: EventLog = {
      id: `l-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: `System configuration updated: model set to ${aiModel}, limits set to ${tokensLimit} tokens.`
    };
    setLogs(prev => [newLog, ...prev]);
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
                <span className="text-[7.5px] font-mono tracking-widest text-gray-400 uppercase leading-none mt-0.5">Admin Terminal</span>
              </div>
            </div>

            {/* Sidebar Links */}
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                  activeTab === 'analytics' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-55'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Diagnostics</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                  activeTab === 'users' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-55'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>CRM Users</span>
              </button>

              <button
                onClick={() => setActiveTab('kyc')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                  activeTab === 'kyc' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-55'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>KYC Vault</span>
              </button>

              <button
                onClick={() => setActiveTab('approvals')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                  activeTab === 'approvals' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-55'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Vetting Board</span>
              </button>

              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                  activeTab === 'billing' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-55'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Billing Node</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs font-bold font-heading rounded-xl transition-all text-left focus:outline-none cursor-pointer ${
                  activeTab === 'settings' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-emerald-700 hover:bg-gray-55'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Config Node</span>
              </button>
            </nav>
          </div>

          {/* Profile & Logout Card */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-650 font-heading font-extrabold text-sm uppercase">
                A
              </div>
              <div className="truncate">
                <span className="block text-xs font-bold text-gray-900 leading-tight truncate">System Root Admin</span>
                <span className="block text-[9.5px] text-gray-400 font-mono leading-none mt-0.5 truncate">Root Administrator</span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-semibold cursor-pointer focus:outline-none text-left"
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
                      { id: 'analytics', label: 'Diagnostics', icon: Activity },
                      { id: 'users', label: 'CRM Users', icon: Users },
                      { id: 'kyc', label: 'KYC Vault', icon: ShieldCheck },
                      { id: 'approvals', label: 'Vetting Board', icon: CheckCircle },
                      { id: 'billing', label: 'Billing Node', icon: DollarSign },
                      { id: 'settings', label: 'Config Node', icon: Settings }
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
                    <ShieldAlert className="w-4.5 h-4.5" />
                    <span>System Root Terminal</span>
                  </div>
                  <h1 className="text-3xl font-heading font-extrabold text-gray-905 tracking-tight leading-tight">
                    Admin Control Panel
                  </h1>
                </div>
              </div>

          {/* Active Tab Panel */}
          {activeTab === 'analytics' && (
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Analytics Summary Stats */}
              <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[9px] font-mono text-gray-550 block uppercase tracking-wider">PLATFORM USERS</span>
                  <p className="text-3xl font-heading font-extrabold text-gray-950 mt-1.5">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-600 font-sans mt-1">▲ +8% Growth from last week</p>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[9px] font-mono text-gray-550 block uppercase tracking-wider">ACTIVE CONSULTANTS</span>
                  <p className="text-3xl font-heading font-extrabold text-gray-950 mt-1.5">{stats.activeConsultants}</p>
                  <p className="text-[10px] text-gray-500 font-sans mt-1">Fully credentialed experts</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[9px] font-mono text-gray-550 block uppercase tracking-wider">PENDING APPROVALS</span>
                  <p className="text-3xl font-heading font-extrabold text-yellow-600 mt-1.5">{applications.length}</p>
                  <p className="text-[10px] text-gray-500 font-sans mt-1">Applications awaiting audit</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[9px] font-mono text-gray-550 block uppercase tracking-wider">TOTAL SALES REVENUE</span>
                  <p className="text-3xl font-heading font-extrabold text-emerald-600 mt-1.5">AED {(stats.revenue).toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-600 font-sans mt-1">▲ +12% Month-over-Month</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[9px] font-mono text-gray-550 block uppercase tracking-wider">SYSTEM STATUS</span>
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-mono font-bold text-emerald-600 uppercase tracking-widest">{stats.systemStatus}</span>
                  </div>
                  <p className="text-[10px] text-gray-550 font-sans mt-1.5">Ping latency: 45ms</p>
                </div>

              </div>

              {/* Terminal Logs & Event Feed */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center space-x-2 mb-4 border-b border-gray-100 pb-3">
                    <Terminal className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-heading font-bold text-gray-950">Live Event Log Stream</h3>
                  </div>

                  <div className="font-mono text-xs bg-slate-50 rounded-2xl p-5 border border-slate-200 h-[350px] overflow-y-auto space-y-3.5">
                    {logs.map((log) => (
                      <div key={log.id} className="flex items-start space-x-3.5 border-b border-slate-200/50 pb-2">
                        <span className="text-slate-400 flex-shrink-0">{log.timestamp}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold flex-shrink-0 ${
                          log.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          log.type === 'warning' ? 'bg-red-50 text-red-600 border border-red-100' :
                          'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {log.type.toUpperCase()}
                        </span>
                        <p className="text-slate-700 leading-relaxed font-sans">{log.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Server Diagnostics */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 uppercase tracking-widest mb-4">
                    <HeartPulse className="w-4 h-4" />
                    <span>System Nodes Health</span>
                  </div>

                  <div className="space-y-4 font-sans">
                    <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500">Database Core Load</span>
                        <span className="text-gray-900 font-mono font-semibold">12%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[12%]" />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500">Zyne AI Token Cache</span>
                        <span className="text-gray-900 font-mono font-semibold">68%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[68%]" />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500">Advisory Room Channels</span>
                        <span className="text-gray-900 font-mono font-semibold">4 / 20</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[20%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="space-y-6">
              
              {/* Vetting list */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center space-x-2.5 mb-6">
                  <Users className="w-5.5 h-5.5 text-emerald-600" />
                  <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900">Expert Network Applications</h3>
                    <p className="text-xs text-gray-500 mt-0.5 font-sans">Audit and approve candidates seeking advisory credential keys.</p>
                  </div>
                </div>

                {applications.length > 0 ? (
                  <div className="space-y-4 font-sans">
                    {applications.map((app) => (
                      <div key={app.id} className="p-5 border border-gray-100 bg-gray-50/50 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                        <div className="space-y-1.5">
                          <h4 className="font-heading font-bold text-gray-900 text-base leading-tight">{app.name}</h4>
                          <p className="text-xs text-emerald-600 font-mono">{app.specialty}</p>
                          <p className="text-xs text-gray-500">{app.formerRole}</p>
                          <span className="inline-block text-[9.5px] font-mono text-gray-400 uppercase tracking-widest pt-1">APPLIED ON {app.appliedDate}</span>
                        </div>

                        <div className="flex space-x-2 w-full md:w-auto">
                          <button
                            onClick={() => handleApprove(app)}
                            className="flex-1 md:flex-none px-4.5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold rounded-xl transition-all cursor-pointer focus:outline-none flex items-center justify-center space-x-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve Advisor</span>
                          </button>
                          <button
                            onClick={() => handleReject(app)}
                            className="flex-1 md:flex-none px-4.5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-red-500 font-heading text-xs font-bold rounded-xl transition-all cursor-pointer focus:outline-none flex items-center justify-center space-x-1.5"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject & Archive</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 text-xs">
                    All registration applications are fully processed. Excellent work.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* CRM Users Panel */}
          {activeTab === 'users' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-6 border-b border-gray-100 pb-4">
                <Users className="w-5.5 h-5.5 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-heading font-bold text-gray-900">CRM Platform User Directory</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Manage credentials, view platform roles, and activate/suspend account access keys.</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-mono uppercase text-[9.5px] tracking-wider pb-3">
                      <th className="pb-3 font-semibold">User Details</th>
                      <th className="pb-3 font-semibold">Security Role</th>
                      <th className="pb-3 font-semibold">Plan Subscription</th>
                      <th className="pb-3 font-semibold">Plan End Date</th>
                      <th className="pb-3 font-semibold">AI Tokens (Used/Limit)</th>
                      <th className="pb-3 font-semibold">Advisory Hours</th>
                      <th className="pb-3 font-semibold">Status Node</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {usersList.map((userItem) => (
                      <tr key={userItem.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4">
                          <span className="font-bold block text-gray-905">{userItem.name}</span>
                          <span className="text-[10px] text-gray-400 block mt-0.5 font-mono">{userItem.email}</span>
                        </td>
                        <td className="py-4">
                          <span className={`inline-block px-2 py-0.5 rounded font-mono font-semibold uppercase text-[9px] border ${
                            userItem.role === 'admin' 
                              ? 'bg-red-55 border-red-100 text-red-600'
                              : userItem.role === 'consultant'
                              ? 'bg-blue-50 border-blue-100 text-blue-600'
                              : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                          }`}>{userItem.role}</span>
                        </td>
                        <td className="py-4 font-semibold text-gray-800">
                          {userItem.role === 'user' ? userItem.plan : 'N/A'}
                        </td>
                        <td className="py-4 text-gray-500 font-mono">
                          {userItem.role === 'user' ? userItem.planEnd : 'N/A'}
                        </td>
                        <td className="py-4 text-gray-500 font-mono">
                          {userItem.role === 'user' ? (
                            <span>{userItem.tokensUsed?.toLocaleString()} / {userItem.tokensLimit?.toLocaleString()}</span>
                          ) : 'N/A'}
                        </td>
                        <td className="py-4 text-gray-500 font-mono">
                          {userItem.role === 'user' ? (
                            <span>{userItem.hoursUsed} / {userItem.hoursLimit} hrs</span>
                          ) : 'N/A'}
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center space-x-1 font-bold ${
                            userItem.status === 'Active' ? 'text-emerald-600' : 'text-red-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${userItem.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            <span>{userItem.status}</span>
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            {userItem.role === 'user' && (
                              <button
                                onClick={() => {
                                  setUsersList(prev => prev.map(u => {
                                    if (u.id === userItem.id) {
                                      const targetPlan = u.plan === 'Free Tier' ? 'Growth Partner Tier' : u.plan === 'Growth Partner Tier' ? 'Enterprise Scale Tier' : 'Free Tier';
                                      const lim = targetPlan === 'Free Tier' ? 2000 : targetPlan === 'Growth Partner Tier' ? 50000 : 150000;
                                      const h = targetPlan === 'Free Tier' ? 0 : targetPlan === 'Growth Partner Tier' ? 10 : 30;
                                      const end = targetPlan === 'Free Tier' ? 'N/A' : 'Dec 12, 2026';
                                      
                                      const newLog: EventLog = {
                                        id: `l-${Date.now()}`,
                                        timestamp: new Date().toLocaleTimeString(),
                                        type: 'info',
                                        message: `Admin updated subscription for ${u.name} to ${targetPlan}.`
                                      };
                                      setLogs(logsPrev => [newLog, ...logsPrev]);
                                      
                                      alert(`Updated plan for ${u.name} to ${targetPlan}. Limits reset.`);
                                      return { ...u, plan: targetPlan, tokensLimit: lim, hoursLimit: h, planEnd: end };
                                    }
                                    return u;
                                  }));
                                }}
                                className="px-2 py-1 text-[9.5px] font-bold rounded-lg border border-emerald-250 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-all cursor-pointer focus:outline-none"
                              >
                                Cycle Plan
                              </button>
                            )}
                            {userItem.role !== 'admin' && (
                              <button
                                onClick={() => toggleUserStatus(userItem.id)}
                                className={`px-2 py-1 text-[9.5px] font-bold rounded-lg border transition-all cursor-pointer ${
                                  userItem.status === 'Active'
                                    ? 'bg-white hover:bg-red-50 border-red-200 text-red-500'
                                    : 'bg-emerald-500 hover:bg-emerald-600 border-transparent text-white'
                                }`}
                              >
                                {userItem.status === 'Active' ? 'Suspend' : 'Activate'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* KYC Vault Panel */}
          {activeTab === 'kyc' && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-6 border-b border-gray-100 pb-4">
                <ShieldCheck className="w-5.5 h-5.5 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-heading font-bold text-gray-900">KYC Compliance Vetting Desk</h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-sans">Audit DED Trade license filings and authorized signatory Emirates IDs.</p>
                </div>
              </div>

              <div className="space-y-4">
                {kycDocs.map((doc) => (
                  <div key={doc.id} className="p-5 border border-gray-100 bg-gray-55/40 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                          doc.status === 'Verified' 
                            ? 'bg-emerald-55 border-emerald-100 text-emerald-700'
                            : doc.status === 'Pending Review'
                            ? 'bg-yellow-50 border-yellow-100 text-yellow-600'
                            : 'bg-red-50 border-red-100 text-red-500'
                        }`}>{doc.status}</span>
                        <span className="text-xs text-gray-450 font-mono">Vault ID: {doc.id}</span>
                      </div>
                      
                      <h4 className="font-heading font-bold text-gray-900 text-base leading-tight">{doc.clientName}</h4>
                      <p className="text-xs text-gray-500 font-sans">{doc.company}</p>

                      <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600 font-sans pt-2">
                        <div className="flex items-center space-x-1.5 p-2 bg-white border border-gray-150 rounded-lg">
                          <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="truncate max-w-[170px]">{doc.licenseFile}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 p-2 bg-white border border-gray-150 rounded-lg">
                          <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="truncate max-w-[170px]">{doc.idFile}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 w-full lg:w-auto">
                      {doc.status !== 'Verified' && (
                        <button
                          onClick={() => handleVerifyKyc(doc.id, 'approve')}
                          className="flex-1 lg:flex-none px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold rounded-xl transition-all cursor-pointer border border-transparent"
                        >
                          Approve KYC Documents
                        </button>
                      )}
                      {doc.status !== 'Revision Required' && (
                        <button
                          onClick={() => handleVerifyKyc(doc.id, 'reject')}
                          className="flex-1 lg:flex-none px-4 py-2 bg-white hover:bg-red-50 border border-gray-200 text-red-500 font-heading text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                          Flag Revisions
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing & Platform Commissions Panel */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Financial Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[9px] font-mono text-gray-550 block uppercase tracking-wider">TOTAL INVOICED REVENUE</span>
                  <p className="text-3xl font-heading font-extrabold text-gray-950 mt-2">AED 32,000</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">100% payments processed</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[9px] font-mono text-gray-550 block uppercase tracking-wider">ADVISOR PAYOUT SHARE (80%)</span>
                  <p className="text-3xl font-heading font-extrabold text-blue-600 mt-2">AED 25,600</p>
                  <p className="text-[10px] text-emerald-600 font-sans mt-1">▲ Paid to consultant board</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <span className="text-[9px] font-mono text-gray-550 block uppercase tracking-wider">PLATFORM COMMISSIONS (20%)</span>
                  <p className="text-3xl font-heading font-extrabold text-emerald-600 mt-2">AED 6,400</p>
                  <p className="text-[10px] text-emerald-600 font-sans mt-1">▲ Commission retained by platform</p>
                </div>
              </div>

              {/* Invoices List */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center space-x-2.5 mb-5 border-b border-gray-100 pb-3">
                  <DollarSign className="w-5.5 h-5.5 text-emerald-600" />
                  <h3 className="text-lg font-heading font-bold text-gray-900">Platform Invoices Audit</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 font-mono uppercase text-[9.5px] tracking-wider pb-3">
                        <th className="pb-3 font-semibold">Invoice ID</th>
                        <th className="pb-3 font-semibold">Client Founder</th>
                        <th className="pb-3 font-semibold">Billing Tier</th>
                        <th className="pb-3 font-semibold">Date</th>
                        <th className="pb-3 font-semibold">Gross Value</th>
                        <th className="pb-3 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 font-mono font-bold text-gray-900">{inv.id}</td>
                          <td className="py-4">
                            <span className="font-bold block text-gray-905">{inv.clientName}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">{inv.company}</span>
                          </td>
                          <td className="py-4 text-gray-500 font-medium">{inv.tier}</td>
                          <td className="py-4 font-mono text-gray-400">{inv.date}</td>
                          <td className="py-4 font-mono font-bold text-gray-900">AED {inv.amount.toLocaleString()}</td>
                          <td className="py-4 text-right">
                            <span className="inline-block px-2 py-0.5 font-bold font-mono text-[9px] bg-emerald-50 border border-emerald-100 rounded text-emerald-600 uppercase">
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Consultant Payouts Section */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <DollarSign className="w-5.5 h-5.5 text-emerald-600" />
                    <div>
                      <h3 className="text-lg font-heading font-bold text-gray-900">Consultant Commission Payouts</h3>
                      <p className="text-xs text-gray-500 mt-0.5 font-sans">Release the 80% revenue share to matched advisors for their sessions.</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 font-mono uppercase text-[9.5px] tracking-wider pb-3">
                        <th className="pb-3 font-semibold">Consultant / Advisor</th>
                        <th className="pb-3 font-semibold">Sessions Completed</th>
                        <th className="pb-3 font-semibold">Unpaid Accrued Share</th>
                        <th className="pb-3 font-semibold">Payout Status</th>
                        <th className="pb-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {payouts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 font-bold text-gray-905">{p.advisorName}</td>
                          <td className="py-4 font-mono text-gray-500">{p.sessionsCount} hours</td>
                          <td className="py-4 font-mono font-bold text-gray-900">AED {p.unpaidCommission.toLocaleString()}</td>
                          <td className="py-4">
                            <span className={`inline-block px-2 py-0.5 font-bold font-mono text-[9px] border rounded uppercase ${
                              p.status === 'Paid' 
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-650' 
                                : 'bg-yellow-50 border-yellow-100 text-yellow-600'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            {p.status === 'Unpaid' ? (
                              <button
                                onClick={() => {
                                  setPayouts(prev => prev.map(item => {
                                    if (item.id === p.id) {
                                      const newLog: EventLog = {
                                        id: `l-${Date.now()}`,
                                        timestamp: new Date().toLocaleTimeString(),
                                        type: 'success',
                                        message: `Released AED ${p.unpaidCommission.toLocaleString()} commission payment to advisor ${p.advisorName}.`
                                      };
                                      setLogs(logsPrev => [newLog, ...logsPrev]);
                                      alert(`Payout of AED ${p.unpaidCommission.toLocaleString()} released to ${p.advisorName} successfully.`);
                                      return { ...item, status: 'Paid' };
                                    }
                                    return item;
                                  }));
                                }}
                                className="px-3 py-1.5 text-[10.5px] font-bold rounded-lg border border-transparent bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer focus:outline-none"
                              >
                                Release Payout
                              </button>
                            ) : (
                              <span className="text-[10px] text-gray-400 italic">Fully Disbursed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-6">
                <Settings className="w-5.5 h-5.5 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-heading font-bold text-gray-900">System Config Parameters</h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-sans">Adjust platform settings nodes for AI models and limits.</p>
                </div>
              </div>

              {configSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-3 text-emerald-700 mb-5">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 animate-pulse" />
                  <span className="text-xs font-sans font-medium">Configurations saved to system server successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveConfig} className="space-y-5 font-sans">
                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1.5">Active AI Advisor Model</label>
                  <select 
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-250 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none cursor-pointer transition-all"
                  >
                    <option value="zyne-core-v2.0-omni">Zyne AI Core v2.0 (Omni Pipeline)</option>
                    <option value="zyne-core-v1.5-preview">Zyne AI Core v1.5 (Standard)</option>
                    <option value="zyne-lightweight-fast">Zyne Lightweight Fast Model</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-1.5">Free-tier Daily Tokens Cap</label>
                  <input 
                    type="number" 
                    value={tokensLimit}
                    onChange={(e) => setTokensLimit(parseInt(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-250 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none transition-all"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-150 rounded-2xl">
                  <div>
                    <span className="text-sm font-semibold text-gray-900 block">Platform Emergency Lockdown</span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Toggle maintenance mode to halt advisory rooms.</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none cursor-pointer ${
                      maintenanceMode ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' : 'bg-gray-100 border border-gray-200 text-gray-500'
                    }`}
                  >
                    {maintenanceMode ? 'Active Lockdown' : 'Inactive'}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 cursor-pointer focus:outline-none mt-6"
                >
                  <Check className="w-4 h-4" />
                  <span>Commit Config Adjustments</span>
                </button>
              </form>
            </div>
          )}

                  </div>

            {/* Quick Actions Footer Bar */}
            <div className="mt-12 flex flex-wrap justify-between items-center bg-white border border-gray-100 rounded-2xl p-6 shadow-sm gap-4 w-full font-sans">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-gray-400">ADMIN ENCRYPTED TRANSACTION TOKEN VERIFIED</span>
              </div>
              
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center space-x-1.5 text-xs text-red-500 hover:text-red-655 font-semibold cursor-pointer focus:outline-none"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out of System Root</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
