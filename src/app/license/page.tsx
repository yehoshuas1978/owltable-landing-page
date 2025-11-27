'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, LogOut, Download, Copy, Check } from 'lucide-react';
import { dataService, LicenseData } from '@/services/dataService';

export default function LicensePage() {
    const router = useRouter();
    const [license, setLicense] = useState<LicenseData | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Check auth
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        // Load data
        dataService.getLicenseData().then(setLicense);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        router.push('/');
    };

    const copyLicense = () => {
        if (license) {
            navigator.clipboard.writeText(license.licenseKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!license) {
        return (
            <div className="min-h-screen bg-[#19191c] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#3574f0] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#19191c]">
            <nav className="bg-[#2b2d30] border-b border-[#393b40]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="text-xl font-bold text-white">
                            OwlTable <span className="text-gray-500 font-normal text-sm ml-2">Account</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">My License</h1>
                    <p className="text-gray-400 mt-2">Manage your subscription and active licenses.</p>
                </div>

                <div className="bg-[#2b2d30] rounded border border-[#393b40] overflow-hidden">
                    <div className="p-6 border-b border-[#393b40] bg-[#323438] flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#3574f0]/10 rounded flex items-center justify-center text-[#3574f0]">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">{license.plan}</h2>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-green-400">{license.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-500 uppercase">Expires On</div>
                            <div className="text-white font-mono">{license.expiryDate}</div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                License Key
                            </label>
                            <div className="flex gap-2">
                                <code className="flex-1 bg-[#19191c] border border-[#393b40] rounded px-4 py-3 text-gray-300 font-mono text-sm">
                                    {license.licenseKey}
                                </code>
                                <button
                                    onClick={copyLicense}
                                    className="bg-[#3574f0] hover:bg-[#3065d2] text-white px-4 rounded flex items-center gap-2 transition-colors"
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Use this key to activate OwlTable on your desktop.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-[#393b40]">
                            <div>
                                <h3 className="text-white font-medium mb-4">Licensed To</h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                        {license.owner.charAt(0)}
                                    </div>
                                    <span className="text-gray-300">{license.owner}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-medium mb-4">Downloads</h3>
                                <div className="space-y-2">
                                    <a href="#" className="flex items-center justify-between p-3 bg-[#19191c] border border-[#393b40] rounded hover:border-gray-500 transition-colors group">
                                        <span className="text-gray-300 text-sm">OwlTable for Windows</span>
                                        <Download size={16} className="text-gray-500 group-hover:text-white" />
                                    </a>
                                    <a href="#" className="flex items-center justify-between p-3 bg-[#19191c] border border-[#393b40] rounded hover:border-gray-500 transition-colors group">
                                        <span className="text-gray-300 text-sm">OwlTable for macOS</span>
                                        <Download size={16} className="text-gray-500 group-hover:text-white" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
