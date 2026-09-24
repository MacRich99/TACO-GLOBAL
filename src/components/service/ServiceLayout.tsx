import React from 'react';
import { ServiceSpec } from '@/src/types';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  FileCheck, 
  Users, 
  Printer,
  Sparkles,
  Share2
} from 'lucide-react';

interface ServiceLayoutProps {
  service: ServiceSpec;
}

export const ServiceLayout: React.FC<ServiceLayoutProps> = ({ service }) => {
  const { navigate, openServiceModal } = useAppNavigation();
  const { formatPrice, currency } = useCurrency();

  const handlePrintDossier = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <article className="min-h-screen bg-[#050811] text-slate-100 pb-24">
      {/* Breadcrumb Navigation & Utility Ribbon */}
      <div className="border-b border-slate-800/80 bg-[#070C18]/60 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl flex items-center justify-between text-xs">
          <button
            onClick={() => navigate('/studios')}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Back to TACO STUDIOS Catalog</span>
          </button>
          <div className="flex items-center gap-4 text-slate-400">
            <div className="hidden sm:flex items-center gap-2">
              <span>TACO STUDIOS</span>
              <span aria-hidden="true">&middot;</span>
              <span className="text-[#D4AF37] font-medium">{service.categoryName}</span>
            </div>
            <button
              onClick={handlePrintDossier}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-800 bg-slate-900/60 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Print or export specification dossier"
            >
              <Printer className="h-3 w-3 text-[#D4AF37]" />
              <span className="text-[11px]">Print Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Hero & Value Proposition */}
      <header className="relative overflow-hidden border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#090F20] to-[#050811] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
                  {service.categoryName}
                </span>
                {service.badge && (
                  <>
                    <span className="text-slate-600">&middot;</span>
                    <span className="text-xs font-medium text-emerald-400 tracking-wide font-mono">
                      {service.badge}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
                {service.headline}
              </p>

              {/* Price & Turnaround Summary Bar */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-sm">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400">Starting From</span>
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#FCE7A1] tabular-nums">
                    {formatPrice(service.startingPrice)}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">({currency})</span>
                </div>

                <div className="h-8 w-[1px] bg-slate-800 hidden sm:block" />

                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="h-4 w-4 text-[#D4AF37]" />
                  <span>Turnaround: <strong className="text-white font-medium">{service.turnaroundTime}</strong></span>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => openServiceModal(service.slug)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] rounded hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
                >
                  <span>Request This Service Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href={`https://wa.me/233551234567?text=Hello%20TAC%20GLOBAL,%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded transition-colors"
                >
                  <span>Consult via WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Right Card: Quick Spec Highlight */}
            <div className="lg:col-span-4 rounded-xl border border-[#D4AF37]/35 bg-[#070C18]/90 p-6 space-y-4 shadow-xl backdrop-blur-md">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Executive Guarantee</span>
                <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Commercial rights &amp; master production vectors included.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Strict milestone deadlines with direct project director check-ins.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Zero plagiarism or generic automated templating. 100% bespoke craftsmanship.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Secure milestone payments processed via Paystack or Mobile Money.</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => openServiceModal(service.slug)}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#FCE7A1] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded transition-colors cursor-pointer"
                >
                  Commission {formatPrice(service.startingPrice)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {/* 2. Overview & Scope */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              01. Scope &amp; Purpose
            </span>
            <h2 className="font-serif-brand text-2xl font-bold text-white">
              Overview &amp; Deliverable Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <p className="text-base text-slate-300 leading-relaxed font-light">
                {service.overview}
              </p>
            </div>

            <div className="md:col-span-4 rounded-xl border border-slate-800 bg-[#070D1C] p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200">
                <Users className="h-4 w-4 text-[#D4AF37]" />
                <span>Engineered Specifically For</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                {service.targetAudience.map((audience, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Included Deliverables */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              02. Output Breakdown
            </span>
            <h2 className="font-serif-brand text-2xl font-bold text-white">
              Included Deliverables &amp; Master Files
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-800 bg-[#070C18] p-4 flex items-start gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="h-6 w-6 rounded-md bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-xs text-slate-200 leading-relaxed font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Timeline & Step-by-Step Workflow */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              03. Operational Phases
            </span>
            <h2 className="font-serif-brand text-2xl font-bold text-white">
              Timeline &amp; Milestone Workflow ({service.turnaroundTime})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {service.workflowPhases.map((phase, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border border-slate-800 bg-[#070D1C] p-5 space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                      {phase.duration}
                    </span>
                    <span className="text-xs font-mono text-slate-400">0{idx + 1}</span>
                  </div>
                  <h3 className="font-serif-brand text-sm font-semibold text-white">
                    {phase.phase}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Client Inputs Required */}
        <section className="rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#070C18] to-[#0A1224] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
                04. Intake Requirements
              </span>
              <h2 className="font-serif-brand text-xl font-bold text-white">
                Client Materials Required to Kick Off
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Please gather these prior to submission
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {service.clientInputsRequired.map((inputItem, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                <FileCheck className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light">{inputItem}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Optional Tiers (if available) */}
        {service.tiers && service.tiers.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
                05. Scope Tiers
              </span>
              <h2 className="font-serif-brand text-2xl font-bold text-white">
                Package Tier Options
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-[#070C18] p-6 space-y-4 hover:border-[#D4AF37]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-brand text-lg font-bold text-white">
                      {tier.name}
                    </h3>
                    <div className="text-xl font-bold text-[#FCE7A1] font-mono">
                      {formatPrice(tier.price)}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">Turnaround: {tier.deliveryDays}</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {tier.description}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                    {tier.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openServiceModal(service.slug)}
                    className="w-full mt-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] to-[#D4AF37] rounded hover:brightness-110 transition-all cursor-pointer"
                  >
                    Select {tier.name}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Context-Aware Final CTA Block */}
        <section className="rounded-2xl border border-[#D4AF37]/35 bg-[#080E1E] p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto">
            Ready to Commission <span className="text-[#FCE7A1]">{service.title}</span>?
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
            Our directors are standing by. Submit your brief in 60 seconds with transparent pricing and milestone tracking.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openServiceModal(service.slug)}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] rounded hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
            >
              Start Intake Brief ({formatPrice(service.startingPrice)})
            </button>
            <button
              onClick={() => navigate('/studios')}
              className="px-6 py-3.5 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 rounded transition-colors cursor-pointer"
            >
              Browse Other Services
            </button>
          </div>
        </section>
      </div>
    </article>
  );
};
