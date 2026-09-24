import React, { useState } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { TacLogo } from '@/src/components/brand/TacLogo';
import { GlobalRibbon } from '@/src/components/layout/GlobalRibbon';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, openServiceModal } = useAppNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Disciplines', href: '/studios' },
    { label: 'Solutions', href: '/packages' },
    { label: 'Work', href: '/portfolio' },
    { label: 'Join TACO', href: '/opportunities' },
    { label: 'Investors', href: '/investors', badge: 'DECK' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <div className="sticky top-0 z-40 w-full select-none">
      {/* Global Clocks & Hotline Ribbon */}
      <GlobalRibbon />

      {/* Primary Architectural Header */}
      <header className="w-full border-b border-[#D4AF37]/20 bg-[#03060e]/95 backdrop-blur-2xl transition-all shadow-xl shadow-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Brand Zone */}
          <button
            onClick={() => handleNavClick('/')}
            className="text-left cursor-pointer group focus:outline-none transition-transform active:scale-[0.99] flex items-center gap-3"
            aria-label="TACO GLOBAL Home"
          >
            <TacLogo size="sm" showMotto={false} />
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative py-1 text-[11px] tracking-[0.16em] uppercase font-medium transition-all cursor-pointer whitespace-nowrap focus:outline-none flex items-center gap-1.5 ${
                    active
                      ? 'text-[#FDF0CD] font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-mono font-bold tracking-tight">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2.5px] w-4 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openServiceModal()}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] rounded hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#D4AF37]/20 whitespace-nowrap cursor-pointer border border-[#FFF0B3]/40"
            >
              <span>Work with TACO</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-[#D4AF37]" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#D4AF37]/20 bg-[#040813] px-6 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`flex items-center justify-between w-full text-left py-2.5 px-3 rounded text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#D4AF37]/15 text-[#FDF0CD] border-l-2 border-[#D4AF37]'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-mono">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openServiceModal();
                }}
                className="w-full py-3 px-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] rounded shadow-sm cursor-pointer"
              >
                Work with TACO GLOBAL
              </button>
              <a
                href="tel:+2332055517659"
                className="block text-center text-xs font-mono text-[#D4AF37] py-2"
              >
                Executive Desk: +233 20 5551 7659
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
