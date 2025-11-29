'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { dataService, PricingPlan } from '@/services/dataService';

export default function PaymentDemo() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dataService.getPricingData().then((data) => {
            setPlans(data);
            setLoading(false);
        });
    }, []);

    return (
        <section id="pricing" className="py-24 bg-[#19191c] border-t border-[#393b40]">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Transparent Pricing</h2>
                    <p className="text-gray-400">Choose the plan that fits your team size and needs.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {loading ? (
                        // Loading Skeletons
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-[#2b2d30] p-8 rounded border border-[#393b40] animate-pulse">
                                <div className="h-8 bg-[#393b40] rounded w-1/3 mb-4" />
                                <div className="h-12 bg-[#393b40] rounded w-1/2 mb-8" />
                                <div className="space-y-4">
                                    <div className="h-4 bg-[#393b40] rounded w-full" />
                                    <div className="h-4 bg-[#393b40] rounded w-full" />
                                    <div className="h-4 bg-[#393b40] rounded w-2/3" />
                                </div>
                            </div>
                        ))
                    ) : (
                        plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative bg-[#2b2d30] p-8 rounded border transition-all duration-300 flex flex-col ${plan.highlight
                                    ? 'border-[#3574f0] shadow-[0_0_30px_rgba(53,116,240,0.15)] scale-105 z-10'
                                    : 'border-[#393b40] hover:border-gray-500'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3574f0] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-sm text-gray-400 h-10">{plan.target}</p>
                                </div>

                                <div className="flex items-baseline mb-8">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400 ml-2 text-sm">{plan.period}</span>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-gray-300 text-sm">
                                            <Check className="w-4 h-4 text-[#3574f0] mr-3 mt-0.5 flex-shrink-0" />
                                            <span title={feature.description}>{feature.name}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full py-3 font-medium rounded transition-colors ${plan.highlight
                                        ? 'bg-[#3574f0] hover:bg-[#3065d2] text-white'
                                        : 'bg-transparent border border-[#6e6e6e] hover:border-[#8c8c8c] text-white'
                                        }`}
                                >
                                    Get Started
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>

                <div className="mt-12 text-center text-sm text-gray-500">
                    <p>Enterprise plan also available at $30k–$80k/year per company. Contact sales for details.</p>
                </div>
            </div>
        </section>
    );
}
