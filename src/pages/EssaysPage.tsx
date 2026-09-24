import React from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { Essays, RichardProfile } from '@/src/data/richardData';
import { Clock, Calendar, ArrowUpRight, BookOpen } from 'lucide-react';

export const EssaysPage: React.FC = () => {
  const { openEssayModal, openCommissionModal } = useAppNavigation();

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 text-slate-200">
      {/* 1. Header */}
      <header className="border-b border-[#D4AF37]/15 bg-gradient-to-b from-[#080e1e] to-[#03050a] pt-16 sm:pt-24 pb-16 px-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex items-center gap-3 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
            <span>Discourse, Monographs &amp; Theory</span>
            <span>·</span>
            <span>By Richard Awudey</span>
          </div>

          <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Monographs &amp; Treatises
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-3xl leading-relaxed">
            Essays examining the spiritual discipline of craftsmanship, Pan-African modernist geometry, and the geopolitical evolution of digital luxury.
          </p>
        </div>
      </header>

      {/* 2. Essays List */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="space-y-8">
          {Essays.map((essay) => (
            <article
              key={essay.id}
              onClick={() => openEssayModal(essay.slug)}
              className="group cursor-pointer p-8 rounded-lg bg-[#070c18] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                <span className="text-[#D4AF37] uppercase tracking-widest">{essay.category}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{essay.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{essay.readTime}</span>
                  </span>
                </div>
              </div>

              <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                {essay.title}
              </h2>

              <p className="font-editorial text-lg italic text-[#ECC86A]">
                {essay.subtitle}
              </p>

              <p className="text-sm text-slate-300 font-light leading-relaxed">
                {essay.excerpt}
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#D4AF37] font-mono">
                <span className="group-hover:underline">Read Full Monograph</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Speaking & Discourse Inquiries */}
      <section className="mx-auto max-w-4xl px-6 text-center space-y-6 pt-12 border-t border-[#D4AF37]/15">
        <h3 className="font-serif-brand text-2xl font-bold text-white">
          Keynote Inquiries &amp; Academic Panels
        </h3>
        <p className="text-sm text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
          Richard Awudey accepts invitations for keynote addresses, design symposiums, and institutional seminars examining Pan-African Modernism and brand authority.
        </p>
        <button
          onClick={() => openCommissionModal('Keynote Invitation / Academic Panel')}
          className="px-8 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-950 bg-[#D4AF37] hover:bg-[#ECC86A] rounded transition-all cursor-pointer"
        >
          Inquire for Keynote Speaking
        </button>
      </section>
    </div>
  );
};
