'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Lock, Workflow } from 'lucide-react';

const useCases = [
    {
        icon: Users,
        title: 'Database Administrators',
        description: 'Streamline database management with powerful tools for monitoring, optimization, and maintenance. Manage multiple PostgreSQL and MySQL servers from one interface.',
        benefits: ['Multi-server management', 'Performance monitoring', 'Automated backups']
    },
    {
        icon: TrendingUp,
        title: 'Backend Developers',
        description: 'Speed up development with an intuitive SQL editor and query builder. Debug queries, test schemas, and manage migrations effortlessly.',
        benefits: ['Fast query execution', 'Schema visualization', 'Migration tools']
    },
    {
        icon: Lock,
        title: 'Data Analysts',
        description: 'Extract insights from your databases with advanced filtering, sorting, and export capabilities. Visualize data without writing complex SQL.',
        benefits: ['Visual query builder', 'Data export', 'Chart generation']
    },
    {
        icon: Workflow,
        title: 'DevOps Teams',
        description: 'Integrate database operations into your CI/CD pipeline. Track schema changes, manage environments, and ensure data consistency.',
        benefits: ['Version control', 'Environment management', 'Audit logs']
    }
];

export default function UseCases() {
    return (
        <section className="py-24 bg-[#080809] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Built for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                            Every Team
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Whether you're a DBA, developer, or analyst, OwlTable adapts to your workflow.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <useCase.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-white mb-2">
                                            {useCase.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-gray-400 leading-relaxed mb-6">
                                    {useCase.description}
                                </p>

                                <div className="space-y-2">
                                    {useCase.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            <span>{benefit}</span>
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
