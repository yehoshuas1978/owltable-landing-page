import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 glass-panel border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-[#3574f0] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                O
              </div>
              OwlTable
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/docs/intro" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Search size={18} />
            </button>
            <Link
              href="/login"
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              Log In
            </Link>
            <Link
              href="#download"
              className="hidden md:block btn-primary text-sm"
            >
              Download
            </Link>
            <button className="md:hidden text-gray-300">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
