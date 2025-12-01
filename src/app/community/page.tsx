'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function CommunityPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        role: '',
        featureRequest: '',
        willingToPay: '',
        plan: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Create mailto link with form data
        const subject = encodeURIComponent(`Feature Request from ${formData.name}`);
        const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Role: ${formData.role}
Interested Plan: ${formData.plan}
Willing to Pay: ${formData.willingToPay}

Feature Request:
${formData.featureRequest}
    `);

        window.location.href = `mailto:yehoshua_sus@owltable.net?subject=${subject}&body=${body}`;

        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
                <Navbar />
                <section className="py-24 bg-[#080809]">
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-12"
                        >
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                            <p className="text-gray-400">
                                Your feedback is invaluable. We&apos;ll review your feature request and get back to you soon!
                            </p>
                        </motion.div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Navbar />
            <section className="py-24 bg-[#080809] border-t border-white/5">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Help Shape{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                OwlTable
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Tell us what features matter most to you. Your input will directly influence our roadmap.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8"
                    >
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="john@company.com"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Acme Inc"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Role
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="">Select role</option>
                                    <option value="dba">Database Administrator</option>
                                    <option value="developer">Backend Developer</option>
                                    <option value="analyst">Data Analyst</option>
                                    <option value="devops">DevOps Engineer</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Which plan interests you?
                            </label>
                            <select
                                value={formData.plan}
                                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="">Select plan</option>
                                <option value="starter">Starter ($19/user/month)</option>
                                <option value="pro">Pro ($79/user/month - up to 10 users + $15/additional user )</option>
                                <option value="enterprise">Enterprise (Coming soon)</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                What features are most important to you? *
                            </label>
                            <textarea
                                required
                                value={formData.featureRequest}
                                onChange={(e) => setFormData({ ...formData, featureRequest: e.target.value })}
                                rows={6}
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                placeholder="E.g., I need real-time collaboration, PostgreSQL replication monitoring, automated backup scheduling..."
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                What would you be willing to pay for this tool?
                            </label>
                            <input
                                type="text"
                                value={formData.willingToPay}
                                onChange={(e) => setFormData({ ...formData, willingToPay: e.target.value })}
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="$50/user/month, $500/year, etc."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                'Sending...'
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit Feedback
                                </>
                            )}
                        </button>
                    </motion.form>
                </div>
            </section>
        </div>
    );
}