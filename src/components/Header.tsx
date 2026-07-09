/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Advisory Areas', id: 'dimensions' },
    { name: 'Meet Zyne AI', id: 'simulator' },
    { name: 'Who Is It For', id: 'scorecard' },
    { name: 'Our Consultants', id: 'experts' },
    { name: 'Membership Plans', id: 'pricing' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]/80 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          id="btn-logo"
          onClick={() => handleItemClick('hero')}
          className="flex items-center space-x-2 group cursor-pointer text-left focus:outline-none"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-emerald-500 group-hover:scale-105`}>
            <div className={`w-3.5 h-3.5 rounded-full bg-white`}></div>
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-bold tracking-tight text-lg leading-none transition-colors text-emerald-900`}>
              Think10
            </span>
            <span className={`text-[9px] font-mono tracking-widest uppercase leading-none mt-0.5 transition-colors text-gray-500`}>
              Premium Advisory
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`font-sans text-sm font-medium transition-colors cursor-pointer focus:outline-none ${
                activeSection === item.id 
                  ? 'text-emerald-900 font-semibold'
                  : 'text-gray-600 hover:text-emerald-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          {!role ? (
            <button
              onClick={() => navigate('/login')}
              className="font-sans text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors cursor-pointer focus:outline-none"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate(`/dashboard/${role}`)}
                className="font-sans text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors cursor-pointer focus:outline-none"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="font-sans text-sm font-medium text-red-500 hover:text-red-700 transition-colors cursor-pointer focus:outline-none"
              >
                Logout
              </button>
            </>
          )}

          <button
            id="btn-nav-briefing"
            onClick={() => handleItemClick('briefing')}
            className={`flex items-center space-x-1.5 px-5 py-2 font-sans text-xs font-semibold rounded-full transition-all duration-200 hover:shadow-lg focus:outline-none cursor-pointer bg-emerald-500 text-white hover:bg-emerald-600`}
          >
            <span>Book Discovery Call</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          id="btn-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer focus:outline-none text-emerald-900 hover:bg-emerald-50`}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5.5 h-5.5 text-emerald-900" /> : <Menu className="w-5.5 h-5.5 text-emerald-900" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border-b border-[#E2E8F0] shadow-xl lg:hidden px-6 py-8"
          >
            <div className="flex flex-col space-y-5">
              {navItems.map((item) => (
                <button
                  id={`nav-mobile-${item.id}`}
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`text-left font-sans text-base font-medium py-1 focus:outline-none cursor-pointer ${
                    activeSection === item.id ? 'text-[#68E8C4]' : 'text-[#0F172A]'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-center mb-4 text-xs font-mono text-[#475569]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#68E8C4] animate-pulse mr-2"></span>
                  Advisors Online
                </div>
                <button
                  id="btn-mobile-briefing"
                  onClick={() => handleItemClick('briefing')}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-500 text-white font-sans text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>Book Discovery Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
