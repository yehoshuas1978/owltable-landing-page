import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#080809] border-t border-[#27272a] pt-16 pb-8">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</Link></li>
                            <li><Link href="#download" className="text-gray-400 hover:text-white text-sm transition-colors">Download</Link></li>
                            <li><Link href="/docs/intro" className="text-gray-400 hover:text-white text-sm transition-colors">Documentation</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Community</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Status</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#27272a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white tracking-tight">OwlTable</span>
                        <span className="text-gray-500 text-sm">© {new Date().getFullYear()}</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Manage your data with ease
                    </p>
                </div>
            </div>
        </footer>
    );
}
