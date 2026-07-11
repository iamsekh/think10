import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, KeyRound, UserPlus, LogIn, Eye, EyeOff, Info, AlertCircle, ArrowLeft } from 'lucide-react';

interface LocalUser {
  name: string;
  email: string;
  password?: string;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [clientMode, setClientMode] = useState<'signin' | 'signup'>('signin');
  
  // Client inputs
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');

  // UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Initialize a default client account if none exists
  useEffect(() => {
    const existing = localStorage.getItem('think10_registered_users');
    if (!existing) {
      const defaultUsers: LocalUser[] = [
        { name: 'Yasmin Al-Maktoum', email: 'client@think10.ae', password: 'client' }
      ];
      localStorage.setItem('think10_registered_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (clientMode === 'signup') {
      if (!clientName.trim() || !clientEmail.trim() || !clientPassword.trim()) {
        setErrorMsg('Please fill in all fields.');
        return;
      }
      
      const stored = localStorage.getItem('think10_registered_users');
      const users: LocalUser[] = stored ? JSON.parse(stored) : [];
      
      if (users.some(u => u.email.toLowerCase() === clientEmail.toLowerCase())) {
        setErrorMsg('An account with this email already exists.');
        return;
      }

      const newUser: LocalUser = {
        name: clientName,
        email: clientEmail,
        password: clientPassword
      };

      users.push(newUser);
      localStorage.setItem('think10_registered_users', JSON.stringify(users));

      login('user', { name: newUser.name, email: newUser.email }, rememberMe);
      navigate('/dashboard/user');
    } else {
      // Sign In mode
      if (!clientEmail.trim() || !clientPassword.trim()) {
        setErrorMsg('Please enter email and password.');
        return;
      }

      const stored = localStorage.getItem('think10_registered_users');
      const users: LocalUser[] = stored ? JSON.parse(stored) : [];
      
      const matched = users.find(
        u => u.email.toLowerCase() === clientEmail.toLowerCase() && u.password === clientPassword
      );

      if (matched) {
        login('user', { name: matched.name, email: matched.email }, rememberMe);
        navigate('/dashboard/user');
      } else {
        setErrorMsg('Invalid client credentials. For demo, use: client@think10.ae / client');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4FCF9] py-12 px-6 relative overflow-hidden">
      {/* Soft Ambient glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[450px] h-[450px] bg-emerald-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-emerald-300/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* 1. Desktop Sliding Layout (Hidden on Mobile) */}
      <div className="hidden md:flex relative w-full max-w-4xl h-[620px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 z-10">
        
        {/* Forms Slide Area */}
        <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ease-in-out z-10 ${
          clientMode === 'signup' ? 'translate-x-full' : 'translate-x-0'
        }`}>
          {/* Login Form */}
          <div className={`absolute inset-0 p-12 flex flex-col justify-center transition-all duration-550 ${
            clientMode === 'signup' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <h2 className="text-2xl font-heading font-extrabold text-gray-900 tracking-tight mb-2">Login</h2>
            <p className="text-gray-500 font-sans text-xs mb-6">Enter your email and password to login.</p>
            
            {errorMsg && (
              <div className="mb-4 p-3.5 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl flex items-start space-x-2 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleClientSubmit} className="space-y-4 font-sans text-xs text-gray-700">
              <div>
                <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-gray-55 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none transition-all"
                  />
                  <Mail className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest font-bold">Password</label>
                  <button
                    type="button"
                    onClick={() => setErrorMsg('Demo Mode: Please use email "client@think10.ae" and password "client" to login.')}
                    className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold focus:outline-none cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    className="w-full bg-gray-55 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 pl-11 pr-11 text-gray-900 focus:outline-none transition-all"
                  />
                  <KeyRound className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 py-1 select-none">
                <input
                  type="checkbox"
                  id="rememberMeDesktop"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="rememberMeDesktop" className="text-[11px] text-gray-500 cursor-pointer">
                  Remember me on this device
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>

              <div className="pt-4 flex items-center space-x-2 bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl text-[10.5px] text-emerald-700 leading-snug">
                <Info className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Demo account: <strong>client@think10.ae</strong> / <strong>client</strong></span>
              </div>
            </form>
          </div>

          {/* Sign Up Form */}
          <div className={`absolute inset-0 p-12 flex flex-col justify-center transition-all duration-550 ${
            clientMode === 'signup' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <h2 className="text-2xl font-heading font-extrabold text-gray-900 tracking-tight mb-2">Sign Up</h2>
            <p className="text-gray-500 font-sans text-xs mb-6">Enter your details to create an account.</p>
            
            {errorMsg && (
              <div className="mb-4 p-3.5 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl flex items-start space-x-2 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleClientSubmit} className="space-y-4 font-sans text-xs text-gray-700">
              <div>
                <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Yasmin Al-Maktoum"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-gray-55 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none transition-all"
                  />
                  <User className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="yasmin@company.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-gray-55 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none transition-all"
                  />
                  <Mail className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    className="w-full bg-gray-55 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 pl-11 pr-11 text-gray-900 focus:outline-none transition-all"
                  />
                  <KeyRound className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sliding Visual Banner Panel */}
        <div className={`absolute top-0 w-1/2 h-full transition-all duration-500 ease-in-out z-20 ${
          clientMode === 'signup' ? 'left-0' : 'left-1/2'
        }`}>
          <div className="w-full h-full bg-[linear-gradient(135deg,#047857_0%,#10B981_100%)] text-white p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient visual overlay elements */}
            <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white/5 border border-white/10" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5 border border-white/10" />
            
            <div className="relative z-10 flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-600" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-extrabold text-white text-sm leading-none">Think10</span>
                <span className="text-[7.5px] font-mono tracking-widest uppercase leading-none mt-0.5 text-emerald-200">Advisory Portal</span>
              </div>
            </div>

            <div className="relative z-10 space-y-4 my-auto">
              {clientMode === 'signin' ? (
                <>
                  <h3 className="text-2xl font-heading font-extrabold leading-tight">Grow Your Business</h3>
                  <p className="text-emerald-100 text-xs leading-relaxed">Meet local business consultants to grow your business operations.</p>
                  <button 
                    onClick={() => { setClientMode('signup'); setErrorMsg(''); }}
                    className="mt-4 px-6 py-2.5 bg-white text-emerald-700 font-heading text-xs font-bold rounded-xl hover:bg-emerald-55 transition-all cursor-pointer focus:outline-none"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-heading font-extrabold leading-tight">Welcome Back</h3>
                  <p className="text-emerald-100 text-xs leading-relaxed">Login to your dashboard to view your details and speak with consultants.</p>
                  <button 
                    onClick={() => { setClientMode('signin'); setErrorMsg(''); }}
                    className="mt-4 px-6 py-2.5 bg-white text-emerald-700 font-heading text-xs font-bold rounded-xl hover:bg-emerald-55 transition-all cursor-pointer focus:outline-none"
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            <div className="relative z-10 text-[9px] text-emerald-205/60 font-mono uppercase tracking-widest">
              GCC FOUNDERS COMMAND CENTER
            </div>
          </div>
        </div>

      </div>

      {/* 2. Mobile Layout (Hidden on Desktop) */}
      <div className="md:hidden w-full max-w-sm bg-white border border-gray-100 p-7 rounded-3xl shadow-xl z-10 relative">
        <div className="text-center mb-6">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center mx-auto mb-3">
            <div className="w-4 h-4 rounded-full bg-white" />
          </div>
          <h2 className="text-xl font-heading font-extrabold text-gray-900 tracking-tight">
            {clientMode === 'signin' ? 'Login' : 'Sign Up'}
          </h2>
          <p className="text-gray-500 font-sans text-xs mt-1">
            {clientMode === 'signin' ? 'Login to your client portal.' : 'Create an account on Think10.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-750 text-xs rounded-xl flex items-start space-x-2 leading-relaxed">
            <AlertCircle className="w-4.5 h-4.5 text-red-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleClientSubmit} className="space-y-4 font-sans text-xs text-gray-700">
          {clientMode === 'signup' && (
            <div>
              <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1 font-bold">Full Name</label>
              <input
                type="text"
                required
                placeholder="Yasmin Al-Maktoum"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-gray-55 border border-gray-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-gray-900"
              />
            </div>
          )}

          <div>
            <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1 font-bold">Email</label>
            <input
              type="email"
              required
              placeholder="yasmin@company.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full bg-gray-55 border border-gray-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-gray-900"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[9px] font-mono text-gray-400 uppercase tracking-widest font-bold">Password</label>
              <button
                type="button"
                onClick={() => setErrorMsg('Demo Mode: Please use email "client@think10.ae" and password "client" to login.')}
                className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold focus:outline-none cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={clientPassword}
                onChange={(e) => setClientPassword(e.target.value)}
                className="w-full bg-gray-55 border border-gray-200 focus:border-emerald-500 rounded-xl px-4 py-2.5 pr-11 text-gray-900 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 py-1 select-none">
            <input
              type="checkbox"
              id="rememberMeMobile"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="rememberMeMobile" className="text-[11px] text-gray-550 cursor-pointer">
              Remember me on this device
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all"
          >
            {clientMode === 'signin' ? 'Login' : 'Sign Up'}
          </button>

          <div className="text-center pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => { setClientMode(clientMode === 'signin' ? 'signup' : 'signin'); setErrorMsg(''); }}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold focus:outline-none"
            >
              {clientMode === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>

          {clientMode === 'signin' && (
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[10.5px] text-emerald-705 leading-snug flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Demo: <strong>client@think10.ae</strong> / <strong>client</strong></span>
            </div>
          )}
        </form>
      </div>

      {/* Elegant Return Link */}
      <button 
        onClick={() => navigate('/')}
        className="mt-6 text-xs text-gray-500 hover:text-emerald-600 transition-colors font-medium flex items-center space-x-1.5 cursor-pointer focus:outline-none relative z-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Go Back Home</span>
      </button>
    </div>
  );
}
