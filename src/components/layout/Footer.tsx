import React from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { TacLogo } from '@/src/components/brand/TacLogo';
import servicesData from '@/src/data/services.json';
import { Mail, Phone, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, openServiceModal, toggleAiAssistant } = useAppNavigation();

  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#03060e] text-slate-400 select-none">
      {/* Upper Footer: Value & Ecosystem */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <TacLogo size="md" showMotto={true} />
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-sm font-light">
              Ghana-rooted. Globally minded. A purpose-driven creative, business and development ecosystem helping individuals, organisations and businesses transform ideas into enduring impact.
            </p>

            {/* Direct Executive Contacts */}
            <div className="pt-2 space-y-2.5 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+2332055517659" className="hover:text-white transition-colors">
                  +233 20 5551 7659
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${servicesData.company.whatsapp}?text=Hello%20TACO%20GLOBAL,%20I%20would%20like%20to%20connect%20regarding%20an%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: +233 20 5551 7659
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${servicesData.company.email}`} className="hover:text-white transition-colors">
                  {servicesData.company.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#D4AF37]/20 bg-[#070D1D] text-[11px] text-[#FDF0CD] font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Escrow Protected &middot; Paystack &middot; Mobile Money</span>
              </div>
            </div>
          </div>

          {/* Column 1: COMPANY */}
          <div className="space-y-4">
            <h4 className="font-serif-brand text-[11px] uppercase tracking-[0.25em] text-[#FDF0CD] font-semibold">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#D4AF37] transition-colors text-left">
                  About TACO GLOBAL
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/packages')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Solutions &amp; Packages
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/portfolio')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Work &amp; Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/investors')} className="hover:text-[#D4AF37] transition-colors text-left flex items-center gap-1 text-[#FDF0CD]">
                  <span>Investor Room</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-mono">READY</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Executive Desk &amp; FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: SERVICES */}
          <div className="space-y-4">
            <h4 className="font-serif-brand text-[11px] uppercase tracking-[0.25em] text-[#FDF0CD] font-semibold">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <button onClick={() => navigate('/studios/creative-digital')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Creative &amp; Digital
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/studios/writing-communication')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Writing &amp; Communication
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/studios/business-strategy')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Business &amp; Strategy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/studios/social-marketing')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Social &amp; Marketing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/studios/research-intel')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Research &amp; Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/opportunities')} className="hover:text-[#D4AF37] transition-colors text-left">
                  People &amp; Opportunities
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: GET INVOLVED */}
          <div className="space-y-4">
            <h4 className="font-serif-brand text-[11px] uppercase tracking-[0.25em] text-[#FDF0CD] font-semibold">
              Get Involved
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li>
                <button
                  onClick={() => openServiceModal()}
                  className="hover:text-[#D4AF37] transition-colors text-left font-medium text-white flex items-center gap-1"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="h-3 w-3 text-[#D4AF37]" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/opportunities')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Join TACO (Talent &amp; Fellows)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/opportunities')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Campus Ambassador Network
                </button>
              </li>
              <li>
                <button onClick={() => toggleAiAssistant()} className="hover:text-[#D4AF37] transition-colors text-left">
                  Ask TACO AI Concierge
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/investors')} className="hover:text-[#D4AF37] transition-colors text-left">
                  Institutional Capital &amp; Deck
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Legal & Motto */}
      <div className="border-t border-[#D4AF37]/15 bg-[#02040a] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} TACO GLOBAL. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[#D4AF37]/80 uppercase tracking-widest text-[10px]">
            <span>IDEAS</span>
            <span>&middot;</span>
            <span>PEOPLE</span>
            <span>&middot;</span>
            <span>BUSINESSES</span>
            <span>&middot;</span>
            <span>IMPACT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
