'use client';

import { motion } from 'framer-motion';
import { Database, Zap, Shield, Code, GitBranch, ArrowRight } from 'lucide-react';

const features = [
    {
        icon: Database,
        title: 'OwlTable Provisioning Platform',
        description: 'A Jobs-first workspace for teams to safely provision, subset, mask, and validate databases.',
        className: 'md:col-span-2 md:row-span-2 glass-card p-8 bg-gradient-to-br from-blue-900/40 to-black/40',
        iconBg: 'bg-blue-500/20 text-blue-400',
        large: true
    },
    {
        icon: Code,
        title: 'OwlMask SDK',
        description: 'Headless SDK capabilities for extending privacy controls into CI/CD and application workflows.',
        className: 'md:col-span-1 md:row-span-1 glass-card p-6 bg-black/40 hover:bg-[#1a1f2e]/60',
        iconBg: 'bg-purple-500/20 text-purple-400',
        large: false
    },
    {
        icon: Zap,
        title: 'OwlMask LLM',
        description: 'Local AI capabilities for applying data-safety controls to unstructured free-text columns — nothing leaves your network.',
        className: 'md:col-span-1 md:row-span-1 glass-card p-6 bg-black/40 hover:bg-[#1a1f2e]/60',
        iconBg: 'bg-amber-500/20 text-amber-400',
        large: false
    },
    {
        icon: GitBranch,
        title: 'OwlMask Code',
        description: 'An autonomous coding agent that inspects schemas and accelerates masking policy configuration.',
        className: 'md:col-span-1 md:row-span-1 glass-card p-6 bg-black/40 hover:bg-[#1a1f2e]/60',
        iconBg: 'bg-emerald-500/20 text-emerald-400',
        large: false
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Readiness, permissions, audit trails, and validation evidence designed for operational accountability.',
        className: 'md:col-span-2 md:row-span-1 glass-card p-6 bg-gradient-to-tr from-purple-900/20 to-black/40 hover:bg-[#1a1f2e]/80',
        iconBg: 'bg-rose-500/20 text-rose-400',
        large: false
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-purple-500/30 rounded-full bg-purple-500/10 backdrop-blur-sm">
                        <span className="text-xs font-semibold text-purple-300 tracking-wider uppercase">Platform Capabilities</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Powerful Features for <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 animate-gradient-x">
                            Data Provisioning
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Everything you need to deliver high-quality, privacy-compliant test environments. Built for data platform teams and developers.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`${feature.className} group relative overflow-hidden`}
                        >
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="flex flex-col h-full relative z-10">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-lg border border-white/5 ${feature.iconBg}`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>

                                <h3 className={`${feature.large ? 'text-3xl' : 'text-xl'} font-bold text-white mb-3 group-hover:text-blue-200 transition-colors`}>
                                    {feature.title}
                                </h3>

                                <p className={`text-gray-400 leading-relaxed ${feature.large ? 'text-lg max-w-md' : 'text-sm'}`}>
                                    {feature.description}
                                </p>

                                {feature.large && (
                                    <div className="mt-auto pt-8">
                                        <div className="inline-flex items-center text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                                            Explore Architecture <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
