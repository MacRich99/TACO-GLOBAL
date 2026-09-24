import React, { useState } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import { PersonaType, PersonaInfo } from '@/src/types';
import servicesData from '@/src/data/services.json';
import { 
  Briefcase, 
  GraduationCap, 
  Users, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Compass,
  ArrowUpRight
} from 'lucide-react';

export const PersonaQuickRoads: React.FC = () => {
  const { navigate, openServiceModal, setActivePersona } = useAppNavigation();
  const { formatPrice, currency } = useCurrency();
  
  const personas = (servicesData as any).personas as PersonaInfo[];
  const [selectedPersonaId, setSelectedPersonaId] = useState<PersonaType>('entrepreneur');

  const currentPersona = personas.find((p) => p.id === selectedPersonaId) || personas[0];

  const getPersonaRoman = (id: PersonaType) => {
    switch (id) {
      case 'entrepreneur':
        return 'I';
      case 'career-academic':
        return 'II';
      case 'talent-ambassador':
        return 'III';
      case 'enterprise-institutional':
        return 'IV';
    }
  };

  const getPersonaIcon = (id: PersonaType) => {
    switch (id) {
      case 'entrepreneur':
        return <Briefcase className="h-3.5 w-3.5" />;
      case 'career-academic':
        return <GraduationCap className="h-3.5 w-3.5" />;
      case 'talent-ambassador':
        return <Users className="h-3.5 w-3.5" />;
      case 'enterprise-institutional':
        return <Building2 className="h-3.5 w-3.5" />;
    }
  };

  const handleTabSelect = (id: PersonaType) => {
    setSelectedPersonaId(id);
    setActivePersona(id);
  };

  const handlePrimaryCta = () => {
    setActivePersona(selectedPersonaId);
    if (selectedPersonaId === 'entrepreneur') {
      openServiceModal('logo-design', 'entrepreneur');
    } else if (selectedPersonaId === 'career-academic') {
      openServiceModal('sop-writing', 'career-academic');
    } else if (selectedPersonaId === 'talent-ambassador') {
      navigate('/opportunities');
    } else {
      openServiceModal('market-research-intelligence', 'enterprise-institutional');
    }
  };

  const handleSecondaryCta = () => {
    setActivePersona(selectedPersonaId);
    if (selectedPersonaId === 'entrepreneur') {
      openServiceModal('business-plan', 'entrepreneur');
    } else if (selectedPersonaId === 'career-academic') {
      openServiceModal('executive-cv-linkedin', 'career-academic');
    } else if (selectedPersonaId === 'talent-ambassador') {
      navigate('/opportunities');
    } else {
      navigate('/contact');
    }
  };

  const handleOfferingClick = (item: PersonaInfo['featuredOfferings'][0]) => {
    setActivePersona(selectedPersonaId);
    if (item.actionType === 'service' && item.slug) {
      navigate(`/studios/service/${item.slug}`);
    } else if (item.actionType === 'modal') {
      openServiceModal(item.actionTarget, selectedPersonaId);
    } else if (item.actionType === 'route') {
      navigate(item.actionTarget);
    }
  };

  const renderPriceNote = (note: string) => {
    const match = note.match(/\$(\d+)/);
    if (match) {
      const usdAmount = parseInt(match[1], 10);
      return note.replace(`$${usdAmount}`, formatPrice(usdAmount));
    }
    return note;
  };

  return (
    <div className="w-full rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-b from-[#080D1D]/90 via-[#050914]/95 to-[#020409]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
      {/* Editorial Watermark */}
      <div className="absolute top-2 right-4 text-[70px] font-serif-brand font-bold text-white/[0.02] pointer-events-none select-none">
        {getPersonaRoman(selectedPersonaId)}
      </div>

      {/* Top Header Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37] font-mono">
            ARCHITECTURAL PATHWAYS &middot; BESPOKE TRACKS
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-400">
          TRACK <span className="text-[#FDF0CD] font-bold font-serif-brand">{getPersonaRoman(selectedPersonaId)}</span> &middot; {currentPersona.badge.toUpperCase()}
        </div>
      </div>

      {/* 4 Architectural Persona Segmented Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {personas.map((persona) => {
          const isSelected = selectedPersonaId === persona.id;
          const roman = getPersonaRoman(persona.id);
          return (
            <button
              key={persona.id}
              onClick={() => handleTabSelect(persona.id)}
              className={`flex items-center justify-between p-3.5 rounded-lg border text-left transition-all cursor-pointer select-none group relative ${
                isSelected
                  ? 'border-[#D4AF37]/80 bg-[#0B142B] text-white shadow-lg shadow-[#D4AF37]/10'
                  : 'border-slate-800/80 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className={`text-[10px] font-mono font-bold transition-colors ${
                  isSelected ? 'text-[#D4AF37]' : 'text-slate-600 group-hover:text-slate-400'
                }`}>
                  {roman}.
                </span>
                <div className="truncate">
                  <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400 truncate">
                    {persona.badge}
                  </div>
                  <div className="text-xs font-medium truncate text-slate-200 group-hover:text-white">
                    {persona.tabLabel}
                  </div>
                </div>
              </div>
              {isSelected && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Persona Showcase Content Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#040813]/70 rounded-xl border border-slate-800/80 p-6 sm:p-8">
        {/* Left: Persona Goal & Narrative */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-[#D4AF37]/25 bg-[#D4AF37]/5 text-[9px] uppercase font-mono tracking-[0.2em] text-[#FDF0CD]">
            <span>{currentPersona.badge}</span>
            <span className="text-slate-600">&middot;</span>
            <span className="text-slate-300 font-sans">{currentPersona.touchpoints}</span>
          </div>

          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            {currentPersona.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {currentPersona.tagline}
          </p>

          <div className="text-xs text-slate-400 border-l border-[#D4AF37]/60 pl-3 py-0.5 font-light leading-relaxed">
            <strong className="text-slate-200 font-medium">Mandate:</strong> {currentPersona.goal}
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handlePrimaryCta}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] rounded hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
            >
              <span>{currentPersona.primaryCtaText}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleSecondaryCta}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600 rounded transition-colors cursor-pointer bg-slate-900/40"
            >
              <span>{currentPersona.secondaryCtaText}</span>
            </button>
          </div>
        </div>

        {/* Right: 4-Card Persona Offerings Grid */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="uppercase tracking-[0.16em] font-mono text-[10px] text-slate-400">
              Curated Deliverables &middot; Track {getPersonaRoman(selectedPersonaId)}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Bespoke Production</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentPersona.featuredOfferings.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleOfferingClick(item)}
                className="group/card rounded-lg border border-slate-800/80 bg-[#060B18] p-4 flex flex-col justify-between hover:border-[#D4AF37]/45 hover:bg-[#080E20] transition-all duration-200 cursor-pointer shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#FDF0CD]">
                      {renderPriceNote(item.priceNote)}
                    </span>
                  </div>
                  <h3 className="font-serif-brand text-xs sm:text-sm font-semibold text-white group-hover/card:text-[#FDF0CD] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-800/80 mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 group-hover/card:text-slate-200 transition-colors text-[10px] uppercase tracking-wider font-mono">
                    {item.actionType === 'service' ? 'Specifications' : item.actionType === 'modal' ? 'Commission' : 'Explore'}
                  </span>
                  <div className="h-5 w-5 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover/card:bg-[#D4AF37] group-hover/card:text-slate-950 transition-colors">
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px] font-light">Looking for comprehensive catalog?</span>
            <button
              onClick={() => navigate('/studios')}
              className="text-[#D4AF37] hover:underline font-medium cursor-pointer inline-flex items-center gap-1 text-[11px] tracking-wide"
            >
              <span>Explore All Studio Practices</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
