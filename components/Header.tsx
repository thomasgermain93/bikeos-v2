'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', color: null },
    { href: '/motogp/', label: 'MotoGP', color: '#ef4444' },
    { href: '/wsbk/', label: 'WSBK', color: '#3b82f6' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-sm h-16 flex items-center justify-between px-4 border-b border-[var(--border-section)]">
        <Link href="/" aria-label="bikeos home">
          <span className="text-xl font-semibold text-white tracking-tight">BikeOS</span>
        </Link>
        <nav className="flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href.slice(0, -1));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-4 min-h-[44px] text-[13px] rounded-md transition-colors motion-reduce:transition-none ${
                  isActive
                    ? 'text-white font-medium bg-white/[0.08]'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              >
                {item.color && (
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ 
                      backgroundColor: item.color, 
                      opacity: isActive ? 1 : 0.4 
                    }}
                  />
                )}
                {!item.color && isActive && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-zinc-500 opacity-50" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>
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
                          opacity: isActive ? 1 : 0.4 
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
