'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Here you would typically handle authentication.
        // For demo purposes, we'll simulate a login.
        setTimeout(() => {
            setLoading(false);
            alert('Login successful (demo mode). Redirecting to dashboard...');
            router.push('/dashboard'); // Simulate redirect
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#19191c] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-bold text-white tracking-tight">
                        OwlTable
                    </Link>
                    <p className="text-gray-400 mt-2">Sign in to your account</p>
                </div>

                <div className="bg-[#2b2d30] p-8 rounded border border-[#393b40] shadow-xl">
                    <p className="text-sm text-center text-gray-400 mb-6">
                        This is a demo site. Login functionality is enabled for demonstration purposes.
                    </p>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email or Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#19191c] border border-[#393b40] rounded pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#3574f0] transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-[#19191c] border border-[#393b40] rounded pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#3574f0] transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#3574f0] hover:bg-[#3065d2] text-white font-medium py-2 rounded transition-colors disabled:opacity-50 flex justify-center items-center"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-300">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
