import React from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { BrandAssets } from '@/src/assets/images';
import { TacLogo } from '@/src/components/brand/TacLogo';
import servicesData from '@/src/data/services.json';
import { ArrowRight, CheckCircle2, Globe, Shield, Rocket, Target, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate, openServiceModal } = useAppNavigation();

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 pb-24 space-y-20">
      {/* Hero Header */}
      <header className="relative border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#090F22] to-[#050811] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#D4AF37]/30 bg-[#090F20]">
            <span className="font-serif-brand text-[11px] uppercase tracking-[0.2em] text-[#FCE7A1] font-medium">
              Ecosystem Blueprint &middot; TACO GLOBAL
            </span>
          </div>

          <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Excellence with Divinity.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            TACO GLOBAL is an African-founded, internationally focused enterprise ecosystem built to bridge world-class strategy, high-craft creative production, and long-range commercial ventures.
          </p>
        </div>
      </header>

      {/* Main Narrative & Philosophy */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-5">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              The Core Mandate
            </span>
            <h2 className="font-serif-brand text-3xl font-bold text-white">
              Institutional Rigor Meets Creative Authority
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Founded on the conviction that high-performance work is a spiritual and moral obligation, TACO GLOBAL rejects mediocrity, generic AI templating, and rushed compromises. Every business plan we formulate, every brand identity we architect, and every Statement of Purpose we craft is held to the highest standard of international excellence.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Through our production wing, <strong>TACO STUDIOS</strong>, we provide high-velocity execution for founders and scholars. Concurrently, TACO GLOBAL advances long-horizon commercial initiatives across commercial real estate, digital commerce, and capital aggregation.
            </p>
          </div>

          <div className="md:col-span-5 rounded-2xl border border-[#D4AF37]/40 bg-[#070C18] p-6 space-y-4 shadow-xl">
            <div className="aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#040710]">
              <img
                src={BrandAssets.businessStrategy}
                alt="Executive Strategy Session"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center pt-2">
              <div className="font-serif-brand text-sm font-bold text-white">
                Global Advisory &middot; Local Grounding
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Executive representation across Accra, London, and international diaspora corridors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Roadmap (Phase 1, 2, 3 as defined in blueprint) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-[#070D1C] p-8 sm:p-12 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              Strategic Horizon
            </span>
            <h2 className="font-serif-brand text-3xl font-bold text-white">
              Version Roadmap &amp; Evolution
            </h2>
            <p className="text-xs text-slate-400">
              A transparent, phased architecture designed to scale seamlessly without legacy technical debt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <div className="rounded-xl border border-[#D4AF37] bg-[#0A132B] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]">Phase 1</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                  Current V1.0
                </span>
              </div>
              <h3 className="font-serif-brand text-lg font-bold text-white">
                Static-First Hub &amp; Studios
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ultra-fast Next.js architecture, complete TACO STUDIOS service catalog, dynamic lead capture modals, and Paystack / MoMo settlement integration.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <li>&bull; 5 core studio practices</li>
                <li>&bull; Fixed starting rate cards</li>
                <li>&bull; Instant WhatsApp concierge</li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="rounded-xl border border-slate-800 bg-[#070D1E] p-6 space-y-4 opacity-90">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Phase 2</span>
                <span className="text-[10px] text-slate-500 font-mono">Medium Term</span>
              </div>
              <h3 className="font-serif-brand text-lg font-bold text-white">
                Dynamic Upgrades
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Centralized database integration (Supabase / Firebase), automated PDF invoicing, and dynamic application tracking for Campus Ambassadors.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-800">
                <li>&bull; Automated invoice generation</li>
                <li>&bull; Ambassador referral tracker</li>
                <li>&bull; Lead intake CRM integration</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="rounded-xl border border-slate-800 bg-[#070D1E] p-6 space-y-4 opacity-80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Phase 3</span>
                <span className="text-[10px] text-slate-500 font-mono">Long Term</span>
              </div>
              <h3 className="font-serif-brand text-lg font-bold text-white">
                The Complete Ecosystem
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated client &amp; admin portal for real-time project milestone tracking, revision management, and unified umbrellas for sister divisions.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-800">
                <li>&bull; Client collaboration portal</li>
                <li>&bull; Sister initiatives integration</li>
                <li>&bull; Multi-tier vendor settlement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Divisions & Sister Wings */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
            Corporate Umbrella
          </span>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white">
            TACO GLOBAL Divisions &amp; Affiliates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-slate-800 bg-[#070C18] p-6 space-y-3">
            <h3 className="font-serif-brand text-lg font-bold text-white">
              TACO STUDIOS
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The flagship digital and creative execution practice delivering branding, web applications, bankable business plans, and admissions essays.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/studios')}
                className="text-xs font-semibold text-[#FCE7A1] hover:underline"
              >
                Access Studios &rarr;
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#070C18] p-6 space-y-3">
            <h3 className="font-serif-brand text-lg font-bold text-white">
              The Peoples Mall
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              An upcoming hybrid commercial enterprise aimed at democratizing retail commerce, artisan distribution, and community shopping experiences across West Africa.
            </p>
            <div className="text-[11px] text-slate-500 pt-2 font-mono">In Incubation</div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#070C18] p-6 space-y-3">
            <h3 className="font-serif-brand text-lg font-bold text-white">
              N&rsquo;S Radiance
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A specialized lifestyle, wellness, and bespoke beauty brand focused on organic formulations, premium aesthetic packaging, and conscious luxury.
            </p>
            <div className="text-[11px] text-slate-500 pt-2 font-mono">In Incubation</div>
          </div>
        </div>
      </section>

      {/* Direct CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#070E20] to-[#0A142D] p-8 sm:p-12 space-y-6">
          <h3 className="font-serif-brand text-2xl font-bold text-white">
            Engage the TACO Global Council
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Whether exploring corporate advisory, university admissions essays, or commercial referral partnerships, our executive team is accessible.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => openServiceModal()}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] to-[#D4AF37] rounded-lg shadow-md"
            >
              Commission a Brief
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white border border-slate-700 rounded-lg"
            >
              Contact Offices
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
