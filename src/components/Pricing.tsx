'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Code, Zap, GitBranch, Database, X, type LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FALLBACK_CATALOG,
  formatBillingTerms,
  formatMonthlyPrice,
  formatPricePeriod,
  getCatalogProduct,
  normalizePortalOrigin,
  resolveCatalog,
  type CatalogProduct,
  type ProductCode,
} from '@/lib/catalog';

interface ProductPresentation {
  code: ProductCode;
  icon: LucideIcon;
  colorClass: string;
  borderClass: string;
  btnClass: string;
  advantage: string;
  badge?: string;
}

type PresentedProduct = ProductPresentation & CatalogProduct;

const PLATFORM_PRESENTATION: readonly ProductPresentation[] = [
  {
    code: 'owltable',
    icon: Database,
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-500/50',
    btnClass: 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]',
    badge: 'FLAGSHIP',
    advantage: 'A complete Jobs-first workflow for dependable test data, without forcing teams to stitch together separate provisioning, masking, and verification tools.'
  },
  {
    code: 'owlmask-complete',
    icon: Shield,
    colorClass: 'text-white',
    borderClass: 'border-white/20',
    btnClass: 'bg-white hover:bg-gray-200 text-black',
    badge: 'COMPLETE ECOSYSTEM',
    advantage: 'One consistent safety model for data platform teams, application engineers, and the automation that connects their workflows.'
  }
];

const DEVELOPER_PRESENTATION: readonly ProductPresentation[] = [
  {
    code: 'owlmask-sdk',
    icon: Code,
    colorClass: 'text-purple-400',
    borderClass: 'border-purple-500/30',
    btnClass: 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20',
    advantage: 'Bring the same data-safety intent into code-driven workflows alongside the OwlTable operational platform.'
  },
  {
    code: 'owlmask-llm',
    icon: Zap,
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
    btnClass: 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20',
    advantage: 'Extend structured-data controls into text-heavy systems while keeping the workflow close to your environment.'
  },
  {
    code: 'owlmask-code',
    icon: GitBranch,
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
    btnClass: 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20',
    advantage: 'Reduce repetitive setup work while retaining review and control over the policy that reaches production-shaped data.'
  }
];

const ProductsAndPricing = () => {
  const [selectedProductCode, setSelectedProductCode] = useState<ProductCode | null>(null);
  const [catalog, setCatalog] = useState<readonly CatalogProduct[]>(FALLBACK_CATALOG);

  const present = (presentation: ProductPresentation): PresentedProduct => ({
    ...presentation,
    ...getCatalogProduct(catalog, presentation.code),
  });
  const platformData = PLATFORM_PRESENTATION.map(present);
  const developerData = DEVELOPER_PRESENTATION.map(present);
  const selectedProduct = selectedProductCode
    ? developerData.find((product) => product.code === selectedProductCode) ?? null
    : null;

  // Sync modal state with browser history (Back button support)
  useEffect(() => {
    const handlePopState = () => {
      setSelectedProductCode(null);
    };
    window.addEventListener('popstate', handlePopState);

    const portalOrigin = normalizePortalOrigin(process.env.NEXT_PUBLIC_PORTAL_URL);
    const fetchCatalog = async () => {
      if (!portalOrigin) return;
      try {
        const response = await fetch(`${portalOrigin}/api/v1/public/catalog`);
        if (!response.ok) return;
        setCatalog(resolveCatalog(await response.json()));
      } catch {
        // The static catalog remains available when the optional portal is down.
      }
    };
    fetchCatalog();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenDetails = (code: ProductCode) => {
    window.history.pushState({ modalOpen: true }, '');
    setSelectedProductCode(code);
  };

  const handleCloseDetails = () => {
    if (window.history.state?.modalOpen) {
      window.history.back();
    }
    setSelectedProductCode(null);
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
              <div key={platform.code} className={`bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border ${platform.borderClass} flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1`}>
                <div className={`absolute top-0 right-0 ${platform.code === 'owltable' ? 'bg-blue-500 text-white' : 'bg-white text-black'} text-xs font-bold px-4 py-1.5 rounded-bl-lg`}>
                  {platform.badge}
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <platform.icon className={`w-10 h-10 ${platform.colorClass}`} />
                  <h3 className="text-3xl font-bold text-white">{platform.name}</h3>
                </div>

                <div className="flex-grow space-y-6 mb-8">
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">What it does</h4>
                    <p className="text-gray-300 text-lg">{platform.description}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${platform.colorClass}`}>The Advantage</h4>
                    <p className="text-gray-400 text-lg">{platform.advantage}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-zinc-800 flex items-end justify-between">
                  <div>
                    <span className="text-5xl font-extrabold text-white">{formatMonthlyPrice(platform.priceMonthlyCents)}</span>
                    <span className="text-gray-500 font-medium ml-2">{formatPricePeriod(platform.billingPeriod)}</span>
                    <div className="text-gray-500 text-sm mt-1">{formatBillingTerms(platform.billingPeriod)}</div>
                  </div>
                  <a 
                    href={`mailto:founder@owlmask.com?subject=${encodeURIComponent(platform.name)}%20Trial`} 
                    className={`px-8 py-4 rounded-xl font-bold transition-all hover:scale-[1.02] ${platform.btnClass}`}
                  >
                    Request {platform.trialDays}-Day Trial
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
              <div key={product.code} className={`bg-zinc-900/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border ${product.borderClass} flex flex-col relative transition-colors hover:bg-zinc-900/80`}>
                <div className="flex items-center gap-3 mb-4">
                  <product.icon className={`w-6 h-6 ${product.colorClass}`} />
                  <h4 className="text-xl font-semibold text-white">{product.name}</h4>
                </div>
                
                <div className="mb-6 flex-grow">
                  <p className="text-gray-400 line-clamp-2 mb-3 text-sm">{product.description}</p>
                  <button 
                    onClick={() => handleOpenDetails(product.code)}
                    className={`text-sm font-semibold hover:underline ${product.colorClass}`}
                  >
                    View details &rarr;
                  </button>
                </div>

                <div className="mt-auto pt-5 border-t border-zinc-800/50 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">{formatMonthlyPrice(product.priceMonthlyCents)}</span>
                    <span className="text-gray-500 text-xs ml-1">{formatPricePeriod(product.billingPeriod)}</span>
                    <div className="mt-1 max-w-44 text-xs text-gray-500">{formatBillingTerms(product.billingPeriod)}</div>
                  </div>
                  <a 
                    href={`mailto:founder@owlmask.com?subject=${encodeURIComponent(product.name)}%20Trial`} 
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-transparent ${product.btnClass}`}
                  >
                    {product.trialDays}-Day Trial
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
                    <p className="text-gray-400 text-sm">Click request on any package. We manually generate and email you a secure {catalog[0].trialDays}-day trial key.</p>
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
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedProduct.description}</p>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold mb-2 ${selectedProduct.colorClass}`}>The Advantage</h4>
                  <p className="text-gray-400 text-lg leading-relaxed">{selectedProduct.advantage}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-white">{formatMonthlyPrice(selectedProduct.priceMonthlyCents)}</span>
                  <span className="text-gray-500 font-medium ml-2">{formatPricePeriod(selectedProduct.billingPeriod)}</span>
                  <div className="mt-1 text-sm text-gray-500">{formatBillingTerms(selectedProduct.billingPeriod)}</div>
                </div>
                <a 
                  href={`mailto:founder@owlmask.com?subject=${encodeURIComponent(selectedProduct.name)}%20Trial`} 
                  className={`px-6 py-3 rounded-lg font-bold transition-colors border ${selectedProduct.borderClass} ${selectedProduct.btnClass} hover:bg-white hover:text-black`}
                >
                  Request {selectedProduct.trialDays}-Day Trial
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
