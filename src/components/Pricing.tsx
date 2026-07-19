'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Code, Zap, GitBranch, Database, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLATFORM_DATA = [
  {
    id: 'provisioning',
    name: 'OwlTable Data Provisioning Platform',
    icon: Database,
    price: '$499',
    period: '/ month',
    note: 'Per Installation, billed annually',
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-500/50',
    bgClass: 'bg-blue-600',
    badge: 'FLAGSHIP',
    whatItDoes: 'The operational home for data teams: plan Jobs, assess readiness, provision targets, mask sensitive values, subset relational data, and review validation evidence.',
    advantage: 'A complete Jobs-first workflow for dependable test data, without forcing teams to stitch together separate provisioning, masking, and verification tools.'
  },
  {
    id: 'ultimate',
    name: 'OwlMask Complete Suite',
    icon: Shield,
    price: '$649',
    period: '/ month',
    note: 'Per Installation, billed annually',
    colorClass: 'text-white',
    borderClass: 'border-white/20',
    bgClass: 'bg-white text-black',
    badge: 'COMPLETE ECOSYSTEM',
    whatItDoes: 'OwlTable for data operations, plus the headless SDKs, local AI masking capabilities, and engineering automation tools in the broader OwlMask ecosystem.',
    advantage: 'One consistent safety model for data platform teams, application engineers, and the automation that connects their workflows.'
  }
];

const DEVELOPER_DATA = [
  {
    id: 'sdk',
    name: 'OwlMask SDK',
    icon: Code,
    price: '$49',
    period: '/ month',
    note: 'Per Installation',
    colorClass: 'text-purple-400',
    borderClass: 'border-purple-500/30',
    btnClass: 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20',
    whatItDoes: 'Embeddable data-masking capabilities for teams that want to put privacy controls directly into their own services and pipelines.',
    advantage: 'Bring the same data-safety intent into code-driven workflows alongside the OwlTable operational platform.'
  },
  {
    id: 'ai',
    name: 'OwlMask LLM',
    icon: Zap,
    price: '$99',
    period: '/ month',
    note: 'Per Installation',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
    btnClass: 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20',
    whatItDoes: 'Core masking tools with local generative capabilities for sensitive, unstructured free-text data.',
    advantage: 'Extend structured-data controls into text-heavy systems while keeping the workflow close to your environment.'
  },
  {
    id: 'agent',
    name: 'OwlMask Code',
    icon: GitBranch,
    price: '$149',
    period: '/ month',
    note: 'Per Installation',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
    btnClass: 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20',
    whatItDoes: 'Automation to inspect schemas, identify sensitive-data candidates, and accelerate masking configuration work.',
    advantage: 'Reduce repetitive setup work while retaining review and control over the policy that reaches production-shaped data.'
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

    // Fetch the live catalog from the portal API when one is configured (e.g.
    // local dev with NEXT_PUBLIC_PORTAL_URL). Static fallback prices otherwise.
    // The portal's seed migration is the pricing source of truth; keep the
    // static values above in sync with it (V2__seed_catalog.sql).
    const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL;
    const productIdByCode: Record<string, string> = {
      'owltable': 'provisioning',
      'owlmask-complete': 'ultimate',
      'owlmask-sdk': 'sdk',
      'owlmask-llm': 'ai',
      'owlmask-code': 'agent',
    };
    const fetchPricing = async () => {
      if (!portalUrl) return;
      try {
        const response = await fetch(`${portalUrl}/api/v1/public/catalog`);
        if (!response.ok) return;
        const data = await response.json();
        const priceById: Record<string, string> = {};
        for (const product of data.products ?? []) {
          const standard = (product.plans ?? []).find((plan: { code: string }) => plan.code === 'standard');
          const id = productIdByCode[product.code];
          if (id && standard && standard.priceMonthlyCents != null) {
            priceById[id] = `$${Math.round(standard.priceMonthlyCents / 100)}`;
          }
        }
        setPlatformData(prev => prev.map(p => priceById[p.id] ? { ...p, price: priceById[p.id] } : p));
        setDeveloperData(prev => prev.map(p => priceById[p.id] ? { ...p, price: priceById[p.id] } : p));
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
            Start with OwlTable for governed data provisioning, then add the OwlMask capabilities your engineering workflow needs.
          </p>
        </div>

        {/* FEATURED: The Platforms */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-400" />
            Start with OwlTable
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
            Extend with OwlMask
            <span className="text-sm font-normal text-gray-500 ml-2">SDK, AI, and automation</span>
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
