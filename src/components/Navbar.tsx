'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu } from 'lucide-react';
import DemoButton from './DemoButton';
import { useState, useEffect } from 'react';

export default function Navbar({ withMarginTop }: { withMarginTop?: boolean }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for global SSO cookie session
    fetch('http://localhost:9080/api/v1/auth/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setIsAuthenticated(data.authenticated === true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <nav className={`fixed w-full z-50 glass-panel border-b border-white/5 ${withMarginTop ? 'mt-12' : ''}`}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Image
                src="/owltable-logo.jpg"
                alt="OwlTable Logo"
                width={32}
                height={32}
                className="rounded-lg shadow-glow"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">OwlMask</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#features" className="text-sm font-medium text-gray-400 hover:text-white hover:text-blue-400 transition-colors">
                Features
              </Link>
              <Link href="/#pricing" className="text-sm font-medium text-gray-400 hover:text-white hover:text-blue-400 transition-colors">
                Pricing
              </Link>
              <Link href="/docs/intro" className="text-sm font-medium text-gray-400 hover:text-white hover:text-blue-400 transition-colors">
                Documentation
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  Log in
                </Link>
                <Link href="/login" className="hidden md:block text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors shadow-glow-sm">
                  Sign up
                </Link>
              </>
            ) : (
              <Link href="https://app.owltable.net/dashboard" className="hidden md:block text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors shadow-glow-sm">
                Go to Dashboard
              </Link>
            )}
            <button className="text-gray-400 hover:text-blue-400 transition-colors">
              <Search size={18} />
            </button>

            <button className="md:hidden text-gray-300">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
