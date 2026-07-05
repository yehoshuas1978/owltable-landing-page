'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Code, Zap, GitBranch, Database, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLATFORM_DATA = [
  {
    id: 'provisioning',
    name: 'OwlTable Provisioning UI',
    icon: Database,
    price: '$299',
    period: '/ month',
    note: 'Per Installation',
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-500/50',
    bgClass: 'bg-blue-600',
    badge: 'MOST POPULAR',
    whatItDoes: 'A beautiful, enterprise-grade web UI allowing DBAs to safely clone, subset, and mask databases without writing a single line of code. Includes the Core SDK engine under the hood.',
    advantage: 'Combines advanced relational subsetting with masking in a single, easy-to-use platform that costs 80% less than legacy enterprise tools.'
  },
  {
    id: 'ultimate',
    name: 'OwlMask Ultimate Suite',
    icon: Shield,
    price: '$399',
    period: '/ month',
    note: 'Per Installation',
    colorClass: 'text-white',
    borderClass: 'border-white/20',
    bgClass: 'bg-white text-black',
    badge: 'COMPLETE ECOSYSTEM',
    whatItDoes: 'The entire ecosystem. You get the OwlTable Platform UI for your DBAs, plus the headless SDKs, local LLMs, and Autonomous Agents for your Engineering teams.',
    advantage: 'One unified platform. Gives Data Platform teams a powerful provisioning UI, while simultaneously giving Engineering teams total automation autonomy.'
  }
];

const DEVELOPER_DATA = [
  {
    id: 'sdk',
    name: 'Core SDK',
    icon: Code,
    price: '$49',
    period: '/ month',
    note: 'Per Installation',
    colorClass: 'text-purple-400',
    borderClass: 'border-purple-500/30',
    btnClass: 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20',
    whatItDoes: 'The core data masking engine, available as an embeddable SDK or via its built-in standalone UI. It includes 100+ deterministic masking algorithms.',
    advantage: 'Legacy competitors (like Delphix) require deploying heavy, expensive VMs. Our SDK runs instantly inside your environment with zero infrastructure overhead.'
  },
  {
    id: 'ai',
    name: 'AI SDK Suite',
    icon: Zap,
    price: '$99',
    period: '/ month',
    note: 'Per Installation',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
    btnClass: 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20',
    whatItDoes: 'The Core SDK bundled with our fine-tuned, local generative LLMs for intelligently masking unstructured free-text columns.',
    advantage: 'Competing AI masking tools send your sensitive data to OpenAI. Our LLM runs 100% locally on your hardware. Your PII never leaves your VPC.'
  },
  {
    id: 'agent',
    name: 'Coding Agent',
    icon: GitBranch,
    price: '$149',
    period: '/ month',
    note: 'Per Installation',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
    btnClass: 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20',
    whatItDoes: 'An AI agent that automatically scans your database schemas, detects sensitive columns, and writes the YAML masking configurations for you.',
    advantage: 'Eliminates the hundreds of hours DBAs spend manually mapping columns. It does the mapping in minutes, completely autonomously.'
  }
];

const ProductsAndPricing = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof DEVELOPER_DATA[0] | null>(null);

  const [platformData, setPlatformData] = useState(PLATFORM_DATA);
  const [developerData, setDeveloperData] = useState(DEVELOPER_DATA);

  // Sync modal state with browser history (Back button support)
  useEffect(() => {
    const handlePopState = () => {
      setSelectedProduct(null);
    };
    window.addEventListener('popstate', handlePopState);

    // Fetch live pricing from portal API
    const fetchPricing = async () => {
      try {
        const response = await fetch('http://localhost:9080/api/v1/public/pricing');
        if (response.ok) {
          const data = await response.json();
          if (data.platform) {
            setPlatformData(prev => prev.map(p => 
              p.id === 'provisioning' ? { ...p, price: `$${data.platform.price}` } : p
            ));
          }
          if (data.developer) {
            setDeveloperData(prev => prev.map(p => 
              p.id === 'sdk' ? { ...p, price: `$${data.developer.price}` } : p
            ));
          }
        }
      } catch (err) {
        console.error('Failed to fetch live pricing:', err);
      }
    };
    fetchPricing();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenDetails = (product: typeof DEVELOPER_DATA[0]) => {
    window.history.pushState({ modalOpen: true }, '');
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    if (window.history.state?.modalOpen) {
      window.history.back();
    }
    setSelectedProduct(null);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
            The OwlMask Ecosystem
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Brutally honest, transparent startup pricing. Find the exact package you need, request a trial, and test it on your own hardware before paying a dime.
          </p>
        </div>

        {/* FEATURED: The Platforms */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-400" />
            The Core Platforms
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {platformData.map((platform) => (
              <div key={platform.id} className={`bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border ${platform.borderClass} flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1`}>
                <div className={`absolute top-0 right-0 ${platform.id === 'provisioning' ? 'bg-blue-500' : 'bg-white'} ${platform.id === 'provisioning' ? 'text-white' : 'text-black'} text-xs font-bold px-4 py-1.5 rounded-bl-lg`}>
                  {platform.badge}
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <platform.icon className={`w-10 h-10 ${platform.colorClass}`} />
                  <h3 className="text-3xl font-bold text-white">{platform.name}</h3>
                </div>

                <div className="flex-grow space-y-6 mb-8">
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">What it does</h4>
                    <p className="text-gray-300 text-lg">{platform.whatItDoes}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${platform.colorClass}`}>The Advantage</h4>
                    <p className="text-gray-400 text-lg">{platform.advantage}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-zinc-800 flex items-end justify-between">
                  <div>
                    <span className="text-5xl font-extrabold text-white">{platform.price}</span>
                    <span className="text-gray-500 font-medium ml-2">{platform.period}</span>
                    <div className="text-gray-500 text-sm mt-1">{platform.note}</div>
                  </div>
                  <a 
                    href={`mailto:founder@owlmask.com?subject=${encodeURIComponent(platform.name)}%20Trial`} 
                    className={`px-8 py-4 rounded-xl font-bold transition-all hover:scale-[1.02] ${platform.id === 'provisioning' ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-white hover:bg-gray-200 text-black'}`}
                  >
                    Request Trial
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECONDARY: Developer Tools Grid */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Code className="w-6 h-6 text-purple-400" />
            Developer & AI Tools
            <span className="text-sm font-normal text-gray-500 ml-2">(Standalone Add-ons)</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {developerData.map((product) => (
              <div key={product.id} className={`bg-zinc-900/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border ${product.borderClass} flex flex-col relative transition-colors hover:bg-zinc-900/80`}>
                <div className="flex items-center gap-3 mb-4">
                  <product.icon className={`w-6 h-6 ${product.colorClass}`} />
                  <h4 className="text-xl font-semibold text-white">{product.name}</h4>
                </div>
                
                <div className="mb-6 flex-grow">
                  <p className="text-gray-400 line-clamp-2 mb-3 text-sm">{product.whatItDoes}</p>
                  <button 
                    onClick={() => handleOpenDetails(product)}
                    className={`text-sm font-semibold hover:underline ${product.colorClass}`}
                  >
                    View details &rarr;
                  </button>
                </div>

                <div className="mt-auto pt-5 border-t border-zinc-800/50 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">{product.price}</span>
                    <span className="text-gray-500 text-xs ml-1">{product.period}</span>
                  </div>
                  <a 
                    href={`mailto:founder@owlmask.com?subject=${encodeURIComponent(product.name)}%20Trial`} 
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-transparent ${product.btnClass}`}
                  >
                    Trial
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Footer */}
        <div className="mt-24 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-white mb-8">How Buying Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
                <div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl mx-auto mb-4 border border-blue-500/30">1</div>
                    <h4 className="text-lg font-semibold text-white mb-2">Request Trial</h4>
                    <p className="text-gray-400 text-sm">Click request on any package. We manually generate and email you a secure 30-Day API Key.</p>
                </div>
                <div>
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl mx-auto mb-4 border border-purple-500/30">2</div>
                    <h4 className="text-lg font-semibold text-white mb-2">Validate Locally</h4>
                    <p className="text-gray-400 text-sm">Install the software on your own servers. Validate it securely against your real production data.</p>
                </div>
                <div>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl mx-auto mb-4 border border-emerald-500/30">3</div>
                    <h4 className="text-lg font-semibold text-white mb-2">Purchase</h4>
                    <p className="text-gray-400 text-sm">If you love it, we issue a standard invoice via Stripe. No auto-renewals.</p>
                </div>
            </div>
        </div>
      </div>

      {/* Details Modal (Only for Developer Tools now) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleCloseDetails}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 z-10"
            >
              <button 
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className={`flex items-center gap-4 mb-6 ${selectedProduct.colorClass}`}>
                <selectedProduct.icon className="w-10 h-10" />
                <h3 className="text-3xl font-bold text-white">{selectedProduct.name}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">What it does</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedProduct.whatItDoes}</p>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold mb-2 ${selectedProduct.colorClass}`}>The Advantage</h4>
                  <p className="text-gray-400 text-lg leading-relaxed">{selectedProduct.advantage}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-white">{selectedProduct.price}</span>
                  <span className="text-gray-500 font-medium ml-2">{selectedProduct.period}</span>
                </div>
                <a 
                  href={`mailto:founder@owlmask.com?subject=${encodeURIComponent(selectedProduct.name)}%20Trial`} 
                  className={`px-6 py-3 rounded-lg font-bold transition-colors ${selectedProduct.colorClass} border ${selectedProduct.borderClass} ${selectedProduct.btnClass.replace('text-', '')} hover:bg-white hover:text-black`}
                >
                  Request 30-Day Trial
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductsAndPricing;
