/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SIMULATOR_PRESETS, ADVISORY_EXPERTS } from '../data';
import { SimulatorPreset, AdvisoryExpert } from '../types';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  items?: string[];
  footer?: string;
}

const QUICK_PROMPTS = [
  'How do I get Prime badge on Amazon UAE?',
  'Best way to split supplier deposits?',
  'What DED license for a Dubai boutique?',
  'How to lower my CAC on Noon?',
];

function generateAIResponse(q: string): { text: string; items?: string[]; footer?: string } {
  const query = q.toLowerCase();

  if (query.includes('fbn') || query.includes('fba') || query.includes('noon') || query.includes('amazon') || query.includes('prime') || query.includes('badge') || query.includes('marketplace') || query.includes('listing')) {
    return {
      text: 'To qualify for the Noon Express (FBN) or Amazon Prime badge:',
      items: ['Ship inventory directly to the Noon/Amazon UAE warehouse', 'Maintain a 95%+ seller performance rating', 'Enable FBN/FBA in your seller central dashboard', 'Ensure items meet size & weight requirements'],
      footer: 'A human advisor can run a full listing audit for your catalog.',
    };
  }
  if (query.includes('ded') || query.includes('license') || query.includes('dubai') || query.includes('uae') || query.includes('legal') || query.includes('freezone')) {
    return {
      text: 'For a Dubai retail or e-commerce business, you\'ll typically need:',
      items: ['DED Commercial License (for Mainland trading)', 'Or a Freezone License (e.g., IFZA, SHAMS) for online-first brands', 'E-trader permit if selling only via social media', 'Import/Export code from Dubai Customs'],
      footer: 'Our advisors can guide you through the exact license type for your model.',
    };
  }
  if (query.includes('cac') || query.includes('acquisition') || query.includes('ads') || query.includes('ppc') || query.includes('marketing') || query.includes('spend')) {
    return {
      text: 'To reduce Customer Acquisition Cost (CAC) on GCC marketplaces:',
      items: ['Switch from Broad to Exact-Match keyword PPC campaigns', 'Use Arabic localized keywords — not direct translations', 'Optimize listing images to improve organic CTR', 'Run sponsored ads only on your top 20% performing SKUs'],
      footer: 'Fatima (Marketplace Specialist) can run a full PPC audit for you.',
    };
  }
  if (query.includes('supplier') || query.includes('deposit') || query.includes('cash') || query.includes('margin') || query.includes('payment') || query.includes('inventory')) {
    return {
      text: 'To optimize cash flow with your suppliers:',
      items: ['Propose a 30/70 split (30% deposit, 70% on proof of shipment)', 'Use non-dilutive inventory financing from Tamara or Tabby for retailers', 'Order in smaller batches until you have 90-day sales data', 'Negotiate 60-day payment terms once you hit consistent reorder volumes'],
      footer: 'Marcus (Finance Advisor) specializes in GCC supplier negotiations.',
    };
  }
  if (query.includes('brand') || query.includes('packaging') || query.includes('logo') || query.includes('identity') || query.includes('story')) {
    return {
      text: 'To build a premium brand identity in the UAE:',
      items: ['Define a single core story rooted in quality and community', 'Standardize fonts, colors, and imagery across all platforms', 'Invest in custom unboxing (handwritten notes, branded tissue)', 'Position for aspiration — GCC buyers respond to perceived luxury'],
      footer: 'Sarah (Brand Strategist) can audit your full visual identity.',
    };
  }

  // Default
  const preset = SIMULATOR_PRESETS[Math.floor(Math.random() * SIMULATOR_PRESETS.length)];
  return {
    text: preset.aiBrief.split('\n\n')[0] || 'Great question! Here\'s what I recommend for your retail strategy:',
    items: preset.advisorySteps.slice(0, 3),
    footer: `${preset.advisorName} (${preset.advisorTitle}) can assist further.`,
  };
}

export default function ZyneChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      role: 'ai',
      text: 'Hi! I\'m Zyne AI, your 24/7 GCC retail advisor. Ask me anything about e-commerce, licensing, sourcing, or marketplace strategy.',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: response.text,
        items: response.items,
        footer: response.footer,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1400);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const resetChat = () => {
    setMessages([{
      id: 'greeting',
      role: 'ai',
      text: 'Hi! I\'m Zyne AI, your 24/7 GCC retail advisor. Ask me anything about e-commerce, licensing, sourcing, or marketplace strategy.',
    }]);
    setInput('');
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">

        {/* WhatsApp-style typing bubble */}
        <AnimatePresence>
          {!isOpen && hasUnread && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {/* Chat bubble card */}
              <div className="bg-white rounded-2xl rounded-br-sm shadow-2xl border border-gray-100 px-4 py-3 max-w-[230px] relative">
                {/* Avatar row */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-700">Zyne AI</span>
                  <div className="flex items-center space-x-1 ml-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-500">online</span>
                  </div>
                </div>
                {/* Typing dots animation */}
                <div className="flex items-center space-x-1.5 bg-gray-50 rounded-xl px-3 py-2.5 w-fit">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
                    />
                  ))}
                  <span className="text-[10px] font-sans text-gray-400 ml-1">Ask me anything...</span>
                </div>
                {/* Tail */}
                <div className="absolute -bottom-2 right-3 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45 shadow-sm" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB button — aqua/emerald with ring pulse */}
        <div className="relative">
          {/* Pulse ring */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-2xl shadow-emerald-500/50 flex items-center justify-center focus:outline-none cursor-pointer"
            aria-label="Open Zyne AI Chat"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <MessageCircle className="w-6 h-6" fill="white" />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Unread badge */}
            {!isOpen && hasUnread && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
              >1</motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
            style={{ height: '540px' }}
          >
            {/* Header */}
            <div className="bg-gray-900 px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-heading font-bold text-sm leading-none">Zyne AI</p>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400">Online — Instant Response</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={resetChat}
                  className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/10 cursor-pointer focus:outline-none"
                  title="Reset chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/10 cursor-pointer focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mb-0.5 shadow">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mb-0.5 text-[10px] font-bold text-gray-600">
                      U
                    </div>
                  )}
                  <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`px-4 py-3 rounded-2xl text-xs font-sans leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-500 text-white rounded-br-sm'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                    }`}>
                      {msg.text}
                      {msg.items && (
                        <ul className="mt-2 space-y-1.5">
                          {msg.items.map((item) => (
                            <li key={item} className="flex items-start space-x-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {msg.footer && (
                        <p className="mt-2 text-gray-400 text-[10px] border-t border-gray-100 pt-2">{msg.footer}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end space-x-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-gray-300"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pt-3 pb-1 bg-white border-t border-gray-100 flex-shrink-0">
                <p className="text-[10px] font-mono text-gray-400 mb-2 uppercase tracking-wider">Quick questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-[11px] font-sans text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer focus:outline-none"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 py-4 bg-white border-t border-gray-100 flex items-center space-x-2 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Zyne AI anything..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-sans text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
