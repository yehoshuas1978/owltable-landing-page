'use client';

import { motion } from 'framer-motion';
import { Terminal, Rocket } from 'lucide-react';
import Link from 'next/link';
import DemoButton from './DemoButton';

export default function Hero() {
    return (
        <section id="download" className="pt-32 pb-24 relative overflow-hidden min-h-[90vh] flex items-center justify-center">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/15 rounded-full blur-[150px] mix-blend-screen opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse" style={{ animationDuration: '10s' }} />
            </div>

            <div className="max-w-[1000px] mx-auto px-6 relative z-10 w-full text-center">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-blue-500/30 rounded-full bg-blue-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping absolute opacity-75" />
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 relative" />
                        <span className="text-sm font-semibold text-blue-200 tracking-wide">OwlTable 1.0 is Live</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        Secure Data <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 animate-gradient-x">
                            For the AI Era
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300/90 mb-12 max-w-3xl leading-relaxed font-light">
                        The complete ecosystem for generative data masking. From a powerful UI for DBAs to embeddable SDKs and Agents for Engineering teams.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <a href="/#pricing" className="relative group overflow-hidden rounded-xl bg-blue-600 text-white font-semibold text-lg px-8 py-4 transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] flex items-center justify-center gap-3">
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient-x" />
                            <Rocket className="relative z-10 w-5 h-5" />
                            <span className="relative z-10">See Pricing & Products</span>
                        </a>
                        <Link href="/docs/intro" className="glass-panel text-gray-300 font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:bg-white/10 hover:text-white flex items-center justify-center gap-3 hover:border-white/20">
                            <Terminal className="w-5 h-5" />
                            <span>Read the Docs</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
