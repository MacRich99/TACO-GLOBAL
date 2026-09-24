import React from 'react';
import { InvestorDataRoom } from '@/src/components/investor/InvestorDataRoom';
import { TacLogo } from '@/src/components/brand/TacLogo';
import { useAppNavigation } from '@/src/context/RouteContext';
import { ShieldCheck, ArrowRight, Phone, MessageSquare, Mail, Award, CheckCircle2 } from 'lucide-react';

export const InvestorsPage: React.FC = () => {
  const { navigate, openServiceModal } = useAppNavigation();

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fadeIn">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/35 bg-[#060B18] text-[#FDF0CD] text-[11px] font-mono tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>INVESTOR RELATIONS &middot; TACO GLOBAL</span>
        </div>
        <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight">
          Invest in High-Standard African &amp; Diaspora Growth
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
          TACO GLOBAL coordinates profitable, cashflow-positive knowledge services and incubates high-upside commercial ventures under an unyielding standard of excellence.
        </p>
      </div>

      {/* Main Investor Data Room Component */}
      <InvestorDataRoom />

      {/* Key Governance & Assurance Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#040813] space-y-3">
          <ShieldCheck className="h-6 w-6 text-[#D4AF37]" />
          <h3 className="font-serif-brand text-lg text-white font-semibold">Strict Escrow Governance</h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            All client transactions clear through institutional-grade payment processors (Paystack, MTN MoMo, Telecel Cash) with milestone escrow release upon verifiable delivery.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-[#040813] space-y-3">
          <Award className="h-6 w-6 text-[#D4AF37]" />
          <h3 className="font-serif-brand text-lg text-white font-semibold">Excellence with Divinity</h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Our guiding ethos rejects cutting corners, generic AI slop, and rushed compromises. We deliver work of spiritual and professional gravity that stands the test of international scrutiny.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-[#040813] space-y-3">
          <CheckCircle2 className="h-6 w-6 text-[#D4AF37]" />
          <h3 className="font-serif-brand text-lg text-white font-semibold">Bilateral Confidentiality</h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            All investor data room exchanges and strategic co-development agreements are governed by strict mutual non-disclosure and bilateral governance protocols.
          </p>
        </div>
      </div>

      {/* Direct Line to the Board / Executive Desk */}
      <div className="p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#060D1E] via-[#040813] to-[#02050E] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif-brand text-2xl text-white font-bold">
            Connect with the TACO GLOBAL Executive Council
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl">
            Schedule a bilateral introductory briefing with our managing partners regarding strategic allocation, syndicate participation, or commercial partnerships.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <a
            href="tel:+2332055517659"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#D4AF37]/40 bg-[#080F24] hover:bg-[#0E1A3C] text-xs font-mono text-[#FDF0CD] transition-colors"
          >
            <Phone className="h-4 w-4 text-[#D4AF37]" />
            <span>+233 20 5551 7659</span>
          </a>
          <a
            href="https://wa.me/2332055517659?text=Hello%20TACO%20GLOBAL%20Executive%20Council,%20I%20would%20like%20to%20schedule%20an%20Investor%20Briefing."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] text-slate-950 font-bold uppercase tracking-wider text-xs transition-all shadow-md shadow-[#D4AF37]/25"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Direct WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
};
