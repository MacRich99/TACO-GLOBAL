import React from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import servicesData from '@/src/data/services.json';
import { MessageSquare, Bot } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { toggleAiAssistant, aiAssistantOpen } = useAppNavigation();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* AI Assistant Button */}
      <button
        onClick={() => toggleAiAssistant()}
        className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-full border shadow-lg transition-all cursor-pointer ${
          aiAssistantOpen
            ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
            : 'bg-[#080E1E] text-[#FCE7A1] border-[#D4AF37]/50 hover:bg-[#0C152E]'
        }`}
        aria-label="Toggle TACO AI Concierge"
      >
        <Bot className="h-4 w-4 text-[#D4AF37]" />
        <span className="hidden sm:inline">Ask AI Concierge</span>
      </button>

      {/* WhatsApp Floating Action */}
      <a
        href={`https://wa.me/${servicesData.company.whatsapp}?text=Hello%20TAC%20GLOBAL,%20I%20would%20like%20to%20discuss%20a%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-full shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
        aria-label="Chat on WhatsApp (+233 20 5551 7659)"
        title="WhatsApp Direct: +233 20 5551 7659"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp Concierge</span>
      </a>
    </div>
  );
};
