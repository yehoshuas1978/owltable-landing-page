'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Menu } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isDocsPage = pathname.startsWith('/docs');

  return (
    <nav className={`fixed w-full z-50 glass-panel border-b border-white/5 ${isDocsPage ? '' : 'mt-12'}`}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Image
                src="/owltable-logo.jpg"
                alt="OwlTable Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              OwlTable
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href={isDocsPage ? "/#features" : "#features"} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href={isDocsPage ? "/#pricing" : "#pricing"} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
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
              href={isDocsPage ? "/#download" : "#download"}
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
