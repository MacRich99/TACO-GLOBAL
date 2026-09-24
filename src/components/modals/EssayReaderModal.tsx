import React, { useEffect } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { Essays } from '@/src/data/richardData';
import { X, Clock, Calendar, Bookmark, ArrowUpRight } from 'lucide-react';

export const EssayReaderModal: React.FC = () => {
  const { activeEssaySlug, closeEssayModal, openCommissionModal } = useAppNavigation();

  const essay = Essays.find((e) => e.slug === activeEssaySlug);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeEssayModal();
      }
    };
    if (activeEssaySlug) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEssaySlug, closeEssayModal]);

  if (!essay) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={closeEssayModal}
    >
      <div
        className="relative w-full max-w-3xl bg-[#070b16] border border-[#D4AF37]/30 rounded-lg shadow-2xl shadow-black/80 my-8 overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D4AF37]/20 bg-[#070b16]/95 backdrop-blur px-6 py-4">
          <div className="flex items-center gap-3 text-xs font-mono text-[#D4AF37]">
            <span className="uppercase tracking-widest">{essay.category}</span>
            <span>·</span>
            <span>Richard Awudey</span>
          </div>

          <button
            onClick={closeEssayModal}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Reader Body */}
        <div className="p-6 sm:p-12 space-y-8 max-h-[82vh] overflow-y-auto">
          {/* Metadata & Title */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>{essay.date}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>{essay.readTime}</span>
              </span>
            </div>

            <h1 className="font-serif-brand text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
              {essay.title}
            </h1>

            <p className="font-editorial text-xl italic text-[#ECC86A] leading-relaxed">
              {essay.subtitle}
            </p>
          </div>

          {/* Excerpt Lead */}
          <div className="p-6 rounded bg-[#030610] border-l-2 border-[#D4AF37] font-editorial text-lg text-slate-200 leading-relaxed italic">
            &ldquo;{essay.excerpt}&rdquo;
          </div>

          {/* Core Essay Prose */}
          <article className="space-y-6 text-base text-slate-300 font-light leading-relaxed">
            {essay.content.map((paragraph, idx) => (
              <p key={idx} className="tracking-wide">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Key Takeaways */}
          <div className="p-6 rounded bg-[#030610] border border-[#D4AF37]/20 space-y-4">
            <h3 className="font-serif-brand text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              <span>Core Takeaways & Axioms</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {essay.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-mono">0{idx + 1}.</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Callout */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Have thoughts or wishing to invite Richard to speak on this topic?
            </div>
            <button
              onClick={() => {
                closeEssayModal();
                openCommissionModal(`Keynote / Discourse: ${essay.title}`);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-950 bg-[#D4AF37] hover:bg-[#ECC86A] transition-colors rounded cursor-pointer whitespace-nowrap"
            >
              <span>Initiate Discourse</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
