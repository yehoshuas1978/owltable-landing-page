import React from 'react';
import Link from 'next/link';
import { Shield, Zap, DollarSign, CheckCircle2, XCircle } from 'lucide-react';
import type { Metadata } from 'next';
import CompareLinks from '@/components/CompareLinks';

export const metadata: Metadata = {
    title: 'OwlTable vs. Delphix | The Modern Data Masking Alternative',
    description: 'Looking for a Delphix alternative? See how OwlTable provides faster, cheaper, and more secure database subsetting and masking without heavy VMs.',
};

export default function CompareDelphix() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-16">
            {/* Ambient Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
                <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20 pt-12">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        The Modern <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            Delphix Alternative
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        Stop paying for heavy enterprise VMs. OwlTable provides native SDKs and lightweight UIs for database masking, cloning, and synthetic data generation at a fraction of the cost.
                    </p>
                </div>

                {/* Comparison Table Section */}
                <div className="mb-24">
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-6 border-b border-zinc-800 text-xl font-semibold text-gray-300 w-1/3">Feature</th>
                                    <th className="p-6 border-b border-zinc-800 bg-blue-900/20 w-1/3 border-l border-zinc-800">
                                        <div className="text-2xl font-bold text-blue-400">OwlTable</div>
                                    </th>
                                    <th className="p-6 border-b border-zinc-800 text-xl font-semibold text-gray-400 w-1/3 border-l border-zinc-800">Legacy Competitors</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                <tr>
                                    <td className="p-6 text-gray-300 font-medium">Infrastructure Required</td>
                                    <td className="p-6 bg-blue-900/10 border-l border-zinc-800">
                                        <span className="flex items-center gap-2 text-blue-300">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            Native SDK / Docker Container
                                        </span>
                                    </td>
                                    <td className="p-6 border-l border-zinc-800 text-gray-400">
                                        <span className="flex items-center gap-2">
                                            <XCircle className="w-5 h-5 text-red-400" />
                                            Heavy Dedicated VMs
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-300 font-medium">Developer Experience</td>
                                    <td className="p-6 bg-blue-900/10 border-l border-zinc-800">
                                        <span className="flex items-center gap-2 text-blue-300">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            Embeddable Node/Python SDKs
                                        </span>
                                    </td>
                                    <td className="p-6 border-l border-zinc-800 text-gray-400">
                                        <span className="flex items-center gap-2">
                                            <XCircle className="w-5 h-5 text-red-400" />
                                            Proprietary UI / Slow APIs
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-300 font-medium">Unstructured Text Masking</td>
                                    <td className="p-6 bg-blue-900/10 border-l border-zinc-800">
                                        <span className="flex items-center gap-2 text-blue-300">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            Local Fine-Tuned LLM
                                        </span>
                                    </td>
                                    <td className="p-6 border-l border-zinc-800 text-gray-400">
                                        <span className="flex items-center gap-2">
                                            <XCircle className="w-5 h-5 text-red-400" />
                                            Regex / Manual Rules
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-300 font-medium">Pricing Model</td>
                                    <td className="p-6 bg-blue-900/10 border-l border-zinc-800">
                                        <span className="flex items-center gap-2 text-blue-300">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            Transparent, Flat Monthly
                                        </span>
                                    </td>
                                    <td className="p-6 border-l border-zinc-800 text-gray-400">
                                        <span className="flex items-center gap-2">
                                            <XCircle className="w-5 h-5 text-red-400" />
                                            Opaque Capacity / Storage Pricing
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                        <Zap className="w-10 h-10 text-yellow-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Zero Overhead</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Stop provisioning massive virtual machines just to mask data. OwlTable runs as a lightweight native process or Docker container alongside your existing CI/CD pipelines.
                        </p>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                        <Shield className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">SOC2 & HIPAA Ready</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Because the engine runs entirely within your VPC—including our local LLM for unstructured text—your sensitive PII never leaves your network. Total data sovereignty.
                        </p>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                        <DollarSign className="w-10 h-10 text-blue-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">A Price You Can Read</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Legacy tools charge by the terabyte, punishing you for scaling. OwlTable is a flat, published monthly rate per installation — $499 for the platform, on the pricing page, no sales call required.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center bg-gradient-to-b from-blue-900/20 to-transparent border border-blue-500/20 rounded-3xl p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-6">Ready to make the switch?</h2>
                        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                            See the whole workflow run on your own machine in 15 minutes — masking, integrity checks, and an auditor-ready evidence pack — before you talk to anyone.
                        </p>
                        <Link href="/get-started" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            Get started in 15 minutes
                        </Link>
                    </div>
                </div>

                <CompareLinks current="delphix-alternative" />
            </div>
        </main>
    );
}
