'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', color: null },
    { href: '/motogp/', label: 'MotoGP', color: '#ef4444' },
    { href: '/moto2/', label: 'Moto2', color: '#FF6600' },
    { href: '/moto3/', label: 'Moto3', color: '#00CC00' },
    { href: '/wsbk/', label: 'WSBK', color: '#3b82f6' },
    { href: '/mxgp/', label: 'MXGP', color: '#8B4513' },
    { href: '/mx2/', label: 'MX2', color: '#228B22' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-[var(--border-section)]">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" aria-label="bikeos home" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-xl font-semibold text-white tracking-tight">BikeOS</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="border-t border-[var(--border-section)] bg-zinc-950/95 backdrop-blur-sm">
            <div className="px-4 py-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href.slice(0, -1));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors ${
                      isActive
                        ? 'text-white font-medium bg-white/[0.08]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.color && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: item.color,
                          opacity: isActive ? 1 : 0.6,
                        }}
                      />
                    )}
                    {!item.color && (
                      <span className="w-2 h-2 rounded-full flex-shrink-0 bg-zinc-500 opacity-50" />
                    )}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-sm">
        <header className="flex h-[60px] items-center border-b border-[var(--border-section)]">
          <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
            <Link
              href="/"
              aria-label="bikeos home"
              className="flex-shrink-0 hover:opacity-70 transition-opacity motion-reduce:transition-none"
            >
              <span className="text-xl font-semibold text-white tracking-tight">BikeOS</span>
            </Link>
            <nav className="flex items-center gap-1" aria-label="Series navigation">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href.slice(0, -1));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-4 min-h-[44px] text-[13px] rounded-md transition-colors motion-reduce:transition-none ${
                      isActive
                        ? 'text-white bg-white/[0.08] font-medium'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    {item.color && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: item.color,
                          opacity: isActive ? 1 : 0.4,
                        }}
                      />
                    )}
                    {!item.color && (
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-zinc-500 opacity-50" />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
