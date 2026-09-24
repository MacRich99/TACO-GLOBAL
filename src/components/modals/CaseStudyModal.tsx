import React, { useEffect } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { SelectedWorks } from '@/src/data/richardData';
import { X, ArrowUpRight, Check, MapPin, Calendar, Award } from 'lucide-react';

export const CaseStudyModal: React.FC = () => {
  const { activeCaseStudySlug, closeCaseStudyModal, openCommissionModal } = useAppNavigation();

  const project = SelectedWorks.find((p) => p.slug === activeCaseStudySlug);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCaseStudyModal();
      }
    };
    if (activeCaseStudySlug) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCaseStudySlug, closeCaseStudyModal]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={closeCaseStudyModal}
    >
      <div
        className="relative w-full max-w-4xl bg-[#070b16] border border-[#D4AF37]/30 rounded-lg shadow-2xl shadow-black/80 my-8 overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Close Button */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D4AF37]/20 bg-[#070b16]/95 backdrop-blur px-6 py-4">
          <div className="flex items-center gap-3 text-xs font-mono text-[#D4AF37]">
            <span className="uppercase tracking-widest">{project.categoryLabel}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={closeCaseStudyModal}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Title & Metadata */}
          <div className="space-y-4">
            <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="font-editorial text-xl italic text-[#ECC86A] leading-relaxed">
              {project.headline}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-2 border-y border-white/5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Client:</span>
                <span className="text-slate-200 font-semibold">{project.client}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>{project.location}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>{project.year}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Role:</span>
                <span className="text-slate-200">{project.role}</span>
              </div>
            </div>
          </div>

          {/* Featured Visual */}
          <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden border border-[#D4AF37]/25 bg-[#03050a]">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3 bg-[#030610] p-6 rounded border border-white/5">
              <h3 className="font-serif-brand text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                The Strategic Challenge
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3 bg-[#030610] p-6 rounded border border-white/5">
              <h3 className="font-serif-brand text-xs uppercase tracking-widest text-[#ECC86A] font-semibold">
                Architectural Resolution
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Craft & Technical Breakdown */}
          <div className="space-y-4">
            <h3 className="font-serif-brand text-sm uppercase tracking-wider text-white font-semibold">
              Craft & Execution Rigor
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.craftDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <Check className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tangible Outcomes */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="font-serif-brand text-sm uppercase tracking-wider text-[#D4AF37] font-semibold">
              Tangible Outcomes & Sovereign Impact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.outcomes.map((item, idx) => (
                <div key={idx} className="p-4 rounded bg-[#030610] border border-[#D4AF37]/15 space-y-1">
                  <div className="font-serif-brand text-2xl font-bold text-white tracking-tight">
                    {item.metric}
                  </div>
                  <div className="text-xs text-slate-400 font-light leading-snug">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial if available */}
          {project.testimonial && (
            <div className="p-6 rounded bg-gradient-to-r from-[#0d1424] to-[#080d18] border-l-2 border-[#D4AF37] space-y-3">
              <p className="font-editorial italic text-base text-slate-200 leading-relaxed">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <div className="text-xs text-slate-400 font-mono">
                <span className="text-white font-semibold">{project.testimonial.author}</span>
                <span> · </span>
                <span>{project.testimonial.title}, {project.testimonial.organization}</span>
              </div>
            </div>
          )}

          {/* Deliverables Checklist */}
          <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mr-2">
              Deliverables:
            </span>
            {project.deliverables.map((item, idx) => (
              <span
                key={idx}
                className="text-xs text-slate-300 bg-white/5 px-2.5 py-1 rounded"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Need a similar level of craft for your enterprise?
            </span>
            <button
              onClick={() => {
                closeCaseStudyModal();
                openCommissionModal(project.title);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-950 bg-[#D4AF37] hover:bg-[#ECC86A] transition-colors rounded cursor-pointer"
            >
              <span>Discuss Similar Commission</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
