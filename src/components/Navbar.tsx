'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/get-started', label: 'Get started' },
  { href: '/#videos', label: 'Videos' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/compare/delphix-alternative', label: 'Compare' },
  { href: '/blog', label: 'Blog' },
  { href: '/docs/intro', label: 'Documentation' },
];

// Portal endpoints only exist when a portal URL is configured (e.g. local dev
// with NEXT_PUBLIC_PORTAL_URL=http://localhost:9080). Never fetch otherwise.
const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL;

export default function Navbar({ withMarginTop }: { withMarginTop?: boolean }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!portalUrl) return;
    // Check for global SSO cookie session
    fetch(`${portalUrl}/api/v1/auth/status`, { credentials: 'include' })
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-violet-400">OwlMask</span>
              <span className="hidden rounded border border-blue-300/20 bg-blue-400/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-blue-200 sm:inline">OWLTABLE</span>
            </Link>
            <div className="hidden md:flex items-center space-x-7">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-400 hover:text-white hover:text-blue-400 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  Log in
                </Link>
                <a href="mailto:founder@owlmask.com?subject=OwlTable%20guided%20trial" className="hidden md:block text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors shadow-glow-sm">
                  Request trial
                </a>
              </>
            ) : (
              <Link href="https://app.owltable.net/dashboard" className="hidden md:block text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors shadow-glow-sm">
                Go to Dashboard
              </Link>
            )}
            <button
              className="md:hidden text-gray-300"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 pb-4">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-3 px-3">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 rounded-lg border border-white/15 px-4 py-2.5 text-center text-sm font-medium text-gray-200 transition-colors hover:bg-white/[0.06]">
                  Log in
                </Link>
                <a href="mailto:founder@owlmask.com?subject=OwlTable%20guided%20trial" onClick={() => setMobileOpen(false)} className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-500">
                  Request trial
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
