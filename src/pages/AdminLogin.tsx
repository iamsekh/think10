import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, KeyRound, Terminal, AlertCircle, ArrowLeft, LogIn, Eye, EyeOff, Info } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setForgotMsg('');
    setLoading(true);

    setTimeout(() => {
      if (username.trim().toLowerCase() === 'admin' && password.trim() === 'admin') {
        login('admin', undefined, rememberMe);
        navigate('/dashboard/admin');
      } else {
        setErrorMsg('Invalid login credentials.');
        setLoading(false);
      }
    }, 800);
  };

  const handleForgotPassword = () => {
    setForgotMsg('Demo Mode: Please use username "admin" and password "admin" to login.');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4FCF9] py-12 px-6 relative overflow-hidden">
      {/* Ambient gradient background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-xl relative z-10">
        
        {/* Admin Header */}
        <div className="flex items-center space-x-2.5 mb-8 border-b border-gray-100 pb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-extrabold text-gray-900 tracking-tight">Admin Login</h1>
            <p className="text-xs text-gray-400 font-sans mt-0.5">Access your admin account</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-2.5 text-red-750 text-xs leading-relaxed font-sans">
            <AlertCircle className="w-4.5 h-4.5 text-red-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {forgotMsg && (
          <div className="mb-6 p-4 bg-emerald-55 border border-emerald-100 rounded-xl flex items-start space-x-2.5 text-emerald-700 text-xs leading-relaxed font-sans">
            <Info className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
            <span>{forgotMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs text-gray-700">
          <div>
            <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5 font-bold">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-3 pl-11 text-gray-900 focus:outline-none transition-all"
              />
              <Terminal className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold focus:outline-none cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              id="rememberMeAdmin"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="rememberMeAdmin" className="text-[11px] text-gray-550 cursor-pointer">
              Remember me on this device
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-100 disabled:text-gray-400 text-white font-heading text-xs font-bold tracking-wide uppercase rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 cursor-pointer focus:outline-none mt-6 border border-transparent"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Logging in...' : 'Login'}</span>
          </button>
        </form>

        {/* Demo instructions */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
          <span>Demo Account:</span>
          <span className="font-bold text-gray-600">admin / admin</span>
        </div>

      </div>

      <button 
        onClick={() => navigate('/')}
        className="mt-8 text-xs text-gray-500 hover:text-emerald-600 transition-colors font-medium flex items-center space-x-1.5 cursor-pointer focus:outline-none relative z-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Go Back Home</span>
      </button>
    </div>
  );
}
