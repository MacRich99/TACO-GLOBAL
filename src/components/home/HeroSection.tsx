import React from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import servicesData from '@/src/data/services.json';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { navigate, openServiceModal } = useAppNavigation();
  const { formatPrice, currency } = useCurrency();

  return (
    <section className="relative min-h-screen bg-tech-grid-dark text-white px-6 py-20 flex flex-col justify-center overflow-hidden">
      {/* Ambient Blue Glow Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Gold Auxiliary Flare matching Pomelli heritage */}
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10 w-full">
        {/* Monospace Badge Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            * TAC GLOBAL ECOSYSTEM *
          </span>
        </motion.div>

        {/* Display Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
        >
          Excellence With Divinity
        </motion.h1>

        {/* Sans Body Text */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          The practical studio and revenue-generating engine serving businesses, entrepreneurs, and career applicants worldwide.
        </motion.p>

        {/* Interactive Primary Action Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => openServiceModal()}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
          >
            <span>Commission a Service</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => navigate('/studios')}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <span>Browse All Practices</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>

        {/* Technical Glass Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="card-tech-glass p-6 md:p-8 rounded-xl space-y-5 mt-8 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
                  TAC STUDIOS
                </h3>
              </div>
              <p className="font-sans text-sm text-slate-400 mt-1">
                Select a category to explore services starting from {formatPrice(75)} ({currency}).
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Escrow Milestone Backed</span>
            </div>
          </div>

          {/* Quick-Access Category Selectors within the Technical Glass Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {servicesData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate('/studios')}
                className="group p-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-blue-500/40 transition-all text-left cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-blue-400 uppercase tracking-wider">
                      {cat.services.length} Blueprints
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="font-display text-sm font-bold text-white group-hover:text-blue-200 transition-colors mt-1.5">
                    {cat.name}
                  </div>
                  <div className="font-sans text-[11px] text-slate-400 font-light line-clamp-1 mt-0.5">
                    {cat.tagline}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.04] font-mono text-[11px] text-[#FDF0CD] font-medium">
                  {cat.startingPriceNote}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { HeroSection };
