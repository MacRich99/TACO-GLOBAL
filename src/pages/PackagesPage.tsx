import React from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import servicesData from '@/src/data/services.json';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const { openServiceModal } = useAppNavigation();
  const { formatPrice, currency } = useCurrency();

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 pb-24 space-y-20">
      {/* Header */}
      <header className="border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#090F22] to-[#050811] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              Turnkey Enterprise Suites
            </span>
            <span className="text-slate-600">&middot;</span>
            <span className="text-xs font-mono text-slate-400">Currency: {currency}</span>
          </div>

          <h1 className="font-serif-brand text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Turnkey Bundled Packages
          </h1>
          <p className="text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Engineered combinations of our most sought-after services. Save up to $420 with coordinated project management and synchronized milestone handoffs.
          </p>
        </div>
      </header>

      {/* Packages Grid */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {servicesData.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border flex flex-col justify-between transition-all ${
                pkg.popular
                  ? 'border-[#D4AF37] bg-gradient-to-b from-[#0B1530] to-[#070D1C] shadow-2xl shadow-[#D4AF37]/15 ring-1 ring-[#D4AF37]/40'
                  : 'border-slate-800 bg-[#070C18] hover:border-slate-700'
              }`}
            >
              {/* Package Header */}
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Suite V1.0
                  </span>
                  {pkg.popular && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                      Most Selected
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif-brand text-2xl font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="rounded-xl border border-slate-800/80 bg-[#050914] p-4 flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-mono">Fixed Bundle Fee</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-3xl font-bold text-[#FCE7A1] tabular-nums">
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">({currency})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-emerald-400 block font-mono">{pkg.savingsNote}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{pkg.turnaroundTime}</span>
                  </div>
                </div>

                {/* Ideal For */}
                <div className="text-xs text-slate-400 border-l-2 border-[#D4AF37] pl-3 py-1 leading-relaxed">
                  <strong className="text-slate-200">Ideal For:</strong> {pkg.idealFor}
                </div>

                {/* Included Services */}
                <div className="space-y-3 pt-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-200">
                    Included Components
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {pkg.includedServices.map((svc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="font-light">{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tangible Deliverables */}
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-200">
                    Tangible Deliverables
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400 font-light">
                    {pkg.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-8 pt-0">
                <button
                  onClick={() => openServiceModal(pkg.id)}
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] rounded-lg hover:brightness-110 active:scale-[0.98] transition-all text-center cursor-pointer shadow-md shadow-[#D4AF37]/20"
                >
                  Commission {pkg.name} ({formatPrice(pkg.price)})
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Trust & Guarantee Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="rounded-xl border border-slate-800 bg-[#070D1C] p-6 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-center gap-2 text-white font-medium">
            <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
            <span>TACO Turnkey Settlement Protocol</span>
          </div>
          <p className="max-w-xl mx-auto leading-relaxed font-light">
            All package briefs are governed by milestone checkpoints. 50% initial escrow commitment upon brief sign-off, with final 50% settled upon approved master handoff via Paystack or Mobile Money.
          </p>
        </div>
      </section>
    </div>
  );
};
