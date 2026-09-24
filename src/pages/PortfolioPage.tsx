import React, { useState } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import servicesData from '@/src/data/services.json';
import { PortfolioCaseStudy } from '@/src/types';
import { CheckCircle2, ArrowRight, ExternalLink, Award, TrendingUp } from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { openServiceModal } = useAppNavigation();
  const caseStudies = servicesData.portfolio as PortfolioCaseStudy[];

  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = caseStudies.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 pb-24 space-y-16">
      {/* Header */}
      <header className="border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#090F22] to-[#050811] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
            Proven Track Record
          </span>
          <h1 className="font-serif-brand text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Client Outcomes &amp; Case Studies
          </h1>
          <p className="text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Quantified empirical results across graduate admissions, venture capital raises, brand transformations, and institutional debt facilities.
          </p>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#D4AF37] text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Case Studies
          </button>
          <button
            onClick={() => setActiveFilter('writing-comm')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'writing-comm'
                ? 'bg-[#D4AF37] text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Admissions &amp; Writing
          </button>
          <button
            onClick={() => setActiveFilter('business-strategy')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'business-strategy'
                ? 'bg-[#D4AF37] text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Business Plans &amp; Decks
          </button>
          <button
            onClick={() => setActiveFilter('creative-digital')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'creative-digital'
                ? 'bg-[#D4AF37] text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Brand &amp; Web Builds
          </button>
          <button
            onClick={() => setActiveFilter('research-intel')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'research-intel'
                ? 'bg-[#D4AF37] text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Market Intelligence
          </button>
        </div>
      </div>

      {/* Case Studies Cards */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((cs) => (
            <div
              key={cs.id}
              className="rounded-2xl border border-slate-800 bg-[#070D1C] p-8 space-y-6 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37]">
                    {cs.sector}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{cs.client}</span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#050811] p-4 flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-slate-400">{cs.metricLabel}</div>
                    <div className="font-mono text-3xl font-bold text-[#FCE7A1] tabular-nums mt-0.5">
                      {cs.metric}
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="font-serif-brand text-xl font-bold text-white">
                  {cs.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {cs.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    TACO Deliverables Provided
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cs.deliverables.map((del, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-[#0A1328] border border-slate-800 text-[11px] text-slate-300"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-300 leading-relaxed">
                  <strong className="text-emerald-200">Outcome:</strong> {cs.outcome}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openServiceModal()}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] to-[#D4AF37] rounded hover:brightness-110 transition-all text-center cursor-pointer"
                >
                  Commission Similar Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Commission Footer */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#070D1C] p-8 space-y-4">
          <h3 className="font-serif-brand text-2xl font-bold text-white">
            Ready to achieve comparable commercial outcomes?
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Discuss your requirements confidentially with our strategy and digital leads.
          </p>
          <button
            onClick={() => openServiceModal()}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] to-[#D4AF37] rounded-lg shadow-md cursor-pointer"
          >
            Start Project Intake
          </button>
        </div>
      </section>
    </div>
  );
};
