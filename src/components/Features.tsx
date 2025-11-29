'use client';

import { motion } from 'framer-motion';
import { Database, Zap, Shield, Code, GitBranch, BarChart3 } from 'lucide-react';

const features = [
    {
        icon: Database,
        title: 'Multi-Database Support',
        description: 'Connect to PostgreSQL, MySQL, SQL Server, and more. One powerful SQL client for all your database management needs.',
        keywords: ['PostgreSQL client', 'MySQL management', 'SQL Server tool']
    },
    {
        icon: Code,
        title: 'Advanced SQL Editor',
        description: 'Write and execute SQL queries with syntax highlighting, auto-completion, and intelligent suggestions. The ultimate database GUI for developers.',
        keywords: ['SQL editor', 'query builder', 'database GUI']
    },
    {
        icon: Zap,
        title: 'Lightning Fast Performance',
        description: 'Optimized for speed with efficient query execution and data visualization. Manage large datasets with ease.',
        keywords: ['fast database tool', 'performance']
    },
    {
        icon: Shield,
        title: 'Secure Connections',
        description: 'Enterprise-grade security with SSH tunneling, SSL/TLS encryption, and credential management.',
        keywords: ['secure database', 'SSH tunnel', 'SSL']
    },
    {
        icon: GitBranch,
        title: 'Version Control Integration',
        description: 'Track schema changes, manage migrations, and collaborate with your team seamlessly.',
        keywords: ['database migrations', 'schema management']
    },
    {
        icon: BarChart3,
        title: 'Data Visualization',
        description: 'Transform your data into insights with built-in charts, graphs, and export capabilities.',
        keywords: ['data visualization', 'database analytics']
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-[#0a0a0b] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
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
                        Powerful Features for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                            Database Management
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Everything you need in a modern database management tool and SQL client.
                        Built for developers, DBAs, and data analysts.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="h-full p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
