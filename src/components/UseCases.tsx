'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Lock, Workflow } from 'lucide-react';

const useCases = [
    {
        icon: Users,
        title: 'DBAs & Platform Teams',
        description: 'Provide self-serve, safe data environments to development teams. Enforce security standards across all environments using the OwlTable Provisioning UI.',
        benefits: ['Visual cloning workflow', 'RBAC enforcement', 'Compliance'],
        color: 'from-blue-500 to-indigo-600',
        dotColor: 'bg-blue-400'
    },
    {
        icon: TrendingUp,
        title: 'Software Engineers',
        description: 'Embed the OwlMask SDK directly into your data pipelines and Java/Next.js applications for headless, programmatic data masking.',
        benefits: ['Headless API access', 'Custom integrations', 'High throughput'],
        color: 'from-purple-500 to-pink-600',
        dotColor: 'bg-purple-400'
    },
    {
        icon: Lock,
        title: 'Security & AI Teams',
        description: 'Leverage OwlMask LLM — fine-tuned local models — for generative masking of unstructured free-text columns without sending data to any external AI API.',
        benefits: ['Local execution', 'Generative context', 'PHI/PII detection'],
        color: 'from-emerald-500 to-teal-600',
        dotColor: 'bg-emerald-400'
    },
    {
        icon: Workflow,
        title: 'DevOps & Automation',
        description: 'Let OwlMask Code — the autonomous coding agent — scan your CI/CD databases and automatically generate and test the YAML masking configuration files.',
        benefits: ['Zero-touch config', 'Schema discovery', 'Automated testing'],
        color: 'from-amber-500 to-orange-600',
        dotColor: 'bg-amber-400'
    }
];

export default function UseCases() {
    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Built for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                            Every Team
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
                        Whether you want the full OwlTable UI experience or prefer embedding the headless OwlMask SDKs, we adapt to your workflow.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="glass-card h-full flex flex-col p-8 group-hover:bg-white/[0.03] transition-colors relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none group-hover:scale-110 duration-500">
                                    <useCase.icon className="w-32 h-32" />
                                </div>
                                <div className="flex items-start gap-5 mb-6 relative z-10">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg border border-white/10`}>
                                        <useCase.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="pt-2">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors tracking-tight">
                                            {useCase.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-gray-400 leading-relaxed mb-8 text-lg font-light relative z-10">
                                    {useCase.description}
                                </p>

                                <div className="space-y-3 mt-auto relative z-10 bg-black/20 p-4 rounded-lg border border-white/5">
                                    {useCase.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className={`w-2 h-2 rounded-full ${useCase.dotColor} shadow-[0_0_8px_currentColor]`} />
                                            <span className="font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
