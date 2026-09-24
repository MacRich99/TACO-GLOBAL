import React from 'react';
import { ServiceSpec } from '@/src/types';
import { useCurrency } from '@/src/context/CurrencyContext';
import { useAppNavigation } from '@/src/context/RouteContext';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  FileText, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

interface ServiceDetailDrawerProps {
  service: ServiceSpec | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailDrawer: React.FC<ServiceDetailDrawerProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const { formatPrice, currency } = useCurrency();
  const { openServiceModal, navigate } = useAppNavigation();

  if (!isOpen || !service) return null;

  const handleCommission = () => {
    onClose();
    openServiceModal(service.slug);
  };

  const handleFullRoute = () => {
    onClose();
    navigate(`/studios/service/${service.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative z-50 w-full max-w-xl h-full bg-[#080D1D] text-slate-100 shadow-2xl flex flex-col border-l border-white/10 overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0A1024]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#D4AF37] font-semibold">
              {service.categoryName}
            </span>
            {service.badge && (
              <>
                <span className="text-slate-600">&middot;</span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {service.badge}
                </span>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
          {/* Title & Investment Header */}
          <div className="space-y-3">
            <h2 className="font-serif-brand text-2xl font-bold text-white tracking-tight leading-snug">
              {service.title}
            </h2>
            <p className="text-xs text-[#FDF0CD] font-medium font-sans">
              {service.headline}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 pb-4 border-y border-white/5">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                  Starting Investment
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-mono text-2xl font-bold text-white tabular-nums">
                    {formatPrice(service.startingPrice)}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">({currency})</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block">
                  Projected Turnaround
                </span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mt-1 justify-end">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{service.turnaroundTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-[11px] uppercase tracking-[0.16em] font-mono text-slate-400 font-semibold">
              Executive Overview
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {service.overview}
            </p>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] uppercase tracking-[0.16em] font-mono text-slate-400 font-semibold">
              Core Deliverables ({service.deliverables.length})
            </h3>
            <div className="space-y-2 rounded-xl bg-[#0B1226] p-4 border border-white/5">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Phases */}
          {service.workflowPhases && service.workflowPhases.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-[11px] uppercase tracking-[0.16em] font-mono text-slate-400 font-semibold">
                Milestone Execution Workflow
              </h3>
              <div className="space-y-2.5">
                {service.workflowPhases.map((phase, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-lg bg-[#0B1226] border border-white/5 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">
                        {idx + 1}. {phase.phase}
                      </span>
                      <span className="text-[10px] font-mono text-[#D4AF37]">
                        {phase.duration}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Client Inputs */}
          {service.clientInputsRequired && service.clientInputsRequired.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-[11px] uppercase tracking-[0.16em] font-mono text-slate-400 font-semibold">
                Required Client Inputs
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-400 font-light list-disc list-inside">
                {service.clientInputsRequired.map((input, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {input}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Link to Dedicated URL */}
          <div className="pt-2">
            <button
              onClick={handleFullRoute}
              className="text-xs text-slate-400 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 cursor-pointer font-mono"
            >
              <span>View full specification document</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Footer with ONLY ONE Primary Action Button */}
        <div className="p-5 border-t border-white/5 bg-[#0A1024]">
          <button
            onClick={handleCommission}
            className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] rounded-lg hover:brightness-110 active:scale-[0.99] transition-all text-center cursor-pointer shadow-lg shadow-[#D4AF37]/20"
          >
            Commission This Service
          </button>
          <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-slate-400 mt-2.5">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              Paystack Protected
            </span>
            <span>&middot;</span>
            <span>50% Milestone Escrow</span>
          </div>
        </div>
      </div>
    </div>
  );
};
