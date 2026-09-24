import React, { useState, useEffect, useRef } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import servicesData from '@/src/data/services.json';
import { PersonaType } from '@/src/types';
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Building2, 
  Compass,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  personaTag?: PersonaType;
  suggestedAction?: {
    label: string;
    action: () => void;
  };
}

export const TacAssistantDrawer: React.FC = () => {
  const { 
    aiAssistantOpen, 
    closeAiAssistant, 
    openServiceModal, 
    navigate,
    assistantInitialPrompt,
    setActivePersona 
  } = useAppNavigation();

  const { formatPrice, currency } = useCurrency();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Greetings. I am the TACO Executive Concierge AI, trained across all 4 TACO GLOBAL & TACO STUDIOS user tracks. Which best represents your objective today?\n\n' +
        '1. 💼 Entrepreneur & Founder (Branding, Pitch Decks, Web Dev, Business Plans)\n' +
        '2. 🎓 Career & Academic (SOPs, Admissions Essays, Executive CVs)\n' +
        '3. 🚀 Talent & Ambassador (15% Campus Commissions, Referral Payouts)\n' +
        '4. 🏛️ Institutional & Enterprise (Market Research & Feasibility)',
      suggestedAction: {
        label: 'Explore Entrepreneur Solutions',
        action: () => handlePersonaPrompt('entrepreneur'),
      },
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle initial prompt if passed via context
  useEffect(() => {
    if (assistantInitialPrompt && aiAssistantOpen) {
      handleSendMessage(assistantInitialPrompt);
    }
  }, [assistantInitialPrompt, aiAssistantOpen]);

  const handlePersonaPrompt = (persona: PersonaType) => {
    setActivePersona(persona);
    if (persona === 'entrepreneur') {
      handleSendMessage("I am an Entrepreneur building or scaling a business. What services and packages do you have?");
    } else if (persona === 'career-academic') {
      handleSendMessage("I am applying for graduate school / jobs and need help with my SOP and CV.");
    } else if (persona === 'talent-ambassador') {
      handleSendMessage("I want to earn income and join as a Campus Ambassador or Referral Partner.");
    } else {
      handleSendMessage("We are an Enterprise / Institution seeking market research and strategic advisory.");
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let action: ChatMessage['suggestedAction'] = undefined;
      let detectedPersona: PersonaType | undefined = undefined;
      const lower = query.toLowerCase();

      // Persona 1: Entrepreneur
      if (
        lower.includes('entrepreneur') || 
        lower.includes('startup') || 
        lower.includes('business plan') || 
        lower.includes('pitch deck') || 
        lower.includes('brand') || 
        lower.includes('logo') || 
        lower.includes('web dev') || 
        lower.includes('website')
      ) {
        detectedPersona = 'entrepreneur';
        reply = `Welcome, Founder. For Entrepreneurs & Business Owners, TACO STUDIOS deploys bankable assets designed to raise capital and acquire customers:\n\n` +
          `• Corporate Logo & Visual Mark: From ${formatPrice(75)} (3–5 days)\n` +
          `• Full Brand Identity Manual: From ${formatPrice(180)} (5–7 days)\n` +
          `• Bankable Business Plan: From ${formatPrice(250)} (30–45 pages, bank loan approved)\n` +
          `• Investor Pitch Deck: From ${formatPrice(150)} (Visual story & traction modeling)\n` +
          `• Custom Web Engineering: From ${formatPrice(900)} (Full-stack production)\n` +
          `• Starter Brand Suite: Fixed ${formatPrice(450)} (Bundled savings)\n\n` +
          `Would you like to commission an asset or review our business packages?`;
        
        action = {
          label: 'Launch My Brand (Intake Form)',
          action: () => {
            openServiceModal('logo-design', 'entrepreneur');
            closeAiAssistant();
          },
        };
      } 
      // Persona 2: Career Professional / Academic
      else if (
        lower.includes('sop') || 
        lower.includes('statement of purpose') || 
        lower.includes('cv') || 
        lower.includes('resume') || 
        lower.includes('academic') || 
        lower.includes('scholarship') || 
        lower.includes('university') || 
        lower.includes('admission') || 
        lower.includes('master') || 
        lower.includes('phd')
      ) {
        detectedPersona = 'career-academic';
        reply = `Welcome, Scholar / Professional. TACO STUDIOS Writing & Communications maintains a 99.4% admissions success record across Oxford, Cambridge, Harvard, LSE, and prestigious scholarship programs (Chevening, Commonwealth, Mastercard Foundation):\n\n` +
          `• Statement of Purpose (SOP): From ${formatPrice(100)} (3–5 days, faculty research alignment)\n` +
          `• Executive CV & LinkedIn Revamp: From ${formatPrice(80)} (ATS-optimized, C-suite formatting)\n` +
          `• Academic Essay & Thesis Proofreading: From ${formatPrice(65)} (Turnitin originality verification)\n\n` +
          `What degree program, target university, or executive role are you targeting?`;

        action = {
          label: 'Request SOP / Document Intake',
          action: () => {
            openServiceModal('sop-writing', 'career-academic');
            closeAiAssistant();
          },
        };
      } 
      // Persona 3: Talent & Ambassador
      else if (
        lower.includes('ambassador') || 
        lower.includes('partner') || 
        lower.includes('referral') || 
        lower.includes('join') || 
        lower.includes('earn') || 
        lower.includes('commission') || 
        lower.includes('student') || 
        lower.includes('campus') || 
        lower.includes('work') || 
        lower.includes('gig')
      ) {
        detectedPersona = 'talent-ambassador';
        reply = `Excited to connect! TACO GLOBAL provides high-reward partner pathways for talented individuals:\n\n` +
          `1. Campus Ambassadors: Represent TACO on your university campus and earn a direct 15% cash commission on every student or departmental service brief commissioned.\n` +
          `2. Commercial Referral Partners: Receive 10%–15% recurring payouts within 48h of invoice settlement when introducing corporate clients.\n` +
          `3. Specialist Freelance Network: Vetted design, engineering, and financial modeling talent assigned to paid global client projects.\n\n` +
          `Would you like to apply for the Campus Ambassador or Referral Partner track?`;

        action = {
          label: 'Apply for Opportunity Track',
          action: () => {
            navigate('/opportunities');
            closeAiAssistant();
          },
        };
      } 
      // Persona 4: Institutional & Enterprise Partner
      else if (
        lower.includes('research') || 
        lower.includes('institution') || 
        lower.includes('enterprise') || 
        lower.includes('feasibility') || 
        lower.includes('market study') || 
        lower.includes('intelligence') || 
        lower.includes('advisory') || 
        lower.includes('government') || 
        lower.includes('ecosystem')
      ) {
        detectedPersona = 'enterprise-institutional';
        reply = `Welcome. TACO GLOBAL Research & Intelligence conducts rigorous, empirical studies and feasibility reports across West African and global trade corridors:\n\n` +
          `• Market Research & Industry Intelligence: From ${formatPrice(320)} (7–10 days)\n` +
          `• Commercial Feasibility Studies: From ${formatPrice(400)} (10–14 days)\n` +
          `• Regulatory Risk & Bilateral Trade Advisory: Bespoke Institutional Scope\n` +
          `• Long-Term Ecosystem Alignment: The Peoples Mall, N'S Radiance partnerships.\n\n` +
          `We support corporate expansions, DFIs, and institutional investors. What market or sector is under study?`;

        action = {
          label: 'Commission Market Report',
          action: () => {
            openServiceModal('market-research-intelligence', 'enterprise-institutional');
            closeAiAssistant();
          },
        };
      } 
      // Multi-currency or pricing inquiry
      else if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('paystack') || lower.includes('momo')) {
        reply = `All TACO prices are displayed live in ${currency} with instant settlement via Paystack and Mobile Money (MTN, Telecel, AirtelTigo). Here is the rate matrix:\n\n` +
          `• Logo: ${formatPrice(75)}\n` +
          `• SOP: ${formatPrice(100)}\n` +
          `• Executive CV: ${formatPrice(80)}\n` +
          `• Business Plan: ${formatPrice(250)}\n` +
          `• Web Engineering: ${formatPrice(900)}\n` +
          `• Market Intelligence: ${formatPrice(320)}\n\n` +
          `Tell me your specific project to generate an exact milestone quote!`;

        action = {
          label: 'View Studios Catalog',
          action: () => {
            navigate('/studios');
            closeAiAssistant();
          },
        };
      } 
      // Fallback with clarifying questions for the 4 personas
      else {
        reply = `Thank you for your message. To ensure I direct you to the most effective solution, which category best matches your profile?\n\n` +
          `1. 💼 An Entrepreneur launching or scaling a brand\n` +
          `2. 🎓 A Student/Professional applying for universities or executive roles\n` +
          `3. 🚀 An Ambassador or Partner seeking 15% commissions\n` +
          `4. 🏛️ An Enterprise/Institution requiring market intelligence`;

        action = {
          label: 'I am an Entrepreneur',
          action: () => handlePersonaPrompt('entrepreneur'),
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          personaTag: detectedPersona,
          suggestedAction: action,
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  if (!aiAssistantOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[#070C18] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 bg-[#090F20] px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37]">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 font-serif-brand">
              <span>Ask TACOO Concierge</span>
              <Sparkles className="h-3 w-3 text-[#D4AF37]" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Live Currency: {currency} &middot; 4 Persona Intelligence
            </div>
          </div>
        </div>
        <button
          onClick={closeAiAssistant}
          className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          aria-label="Close Assistant"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* 4 Persona Fast-Access Chips Ribbon */}
      <div className="border-b border-slate-800 bg-[#050914] p-2.5">
        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1.5 px-1">
          Quick Persona Focus:
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => handlePersonaPrompt('entrepreneur')}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-[#D4AF37]/50 text-left text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Briefcase className="h-3 w-3 text-[#D4AF37] shrink-0" />
            <span className="truncate">Entrepreneur</span>
          </button>
          <button
            onClick={() => handlePersonaPrompt('career-academic')}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-[#D4AF37]/50 text-left text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <GraduationCap className="h-3 w-3 text-[#D4AF37] shrink-0" />
            <span className="truncate">Career / SOP</span>
          </button>
          <button
            onClick={() => handlePersonaPrompt('talent-ambassador')}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-[#D4AF37]/50 text-left text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Users className="h-3 w-3 text-[#D4AF37] shrink-0" />
            <span className="truncate">Ambassador 15%</span>
          </button>
          <button
            onClick={() => handlePersonaPrompt('enterprise-institutional')}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-[#D4AF37]/50 text-left text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Building2 className="h-3 w-3 text-[#D4AF37] shrink-0" />
            <span className="truncate">Enterprise Intel</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] text-slate-950 font-medium'
                  : 'bg-slate-900 border border-slate-800 text-slate-200'
              }`}
            >
              {msg.text}
            </div>

            {/* Persona Tag badge */}
            {msg.personaTag && (
              <span className="text-[10px] font-mono uppercase text-[#D4AF37] mt-1 tracking-wider">
                Persona Track: {msg.personaTag}
              </span>
            )}

            {/* Contextual Action Button */}
            {msg.suggestedAction && (
              <button
                onClick={msg.suggestedAction.action}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs font-semibold text-[#FCE7A1] hover:bg-[#D4AF37]/20 transition-colors cursor-pointer"
              >
                <span>{msg.suggestedAction.label}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-slate-400 text-xs py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-mono text-[11px]">TACO Concierge formulating recommendation...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field & Direct Desk Hotline */}
      <div className="border-t border-slate-800 bg-[#080D1A] p-3 space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about SOPs, Business Plans, 15% commissions..."
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 rounded-lg bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] text-slate-950 font-bold hover:brightness-110 disabled:opacity-40 transition-all cursor-pointer"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 pt-1 border-t border-slate-800/60">
          <span>Executive Desk:</span>
          <a
            href="https://wa.me/2332055517659?text=Hello%20TACO%20GLOBAL,%20I%20would%20like%20to%20speak%20with%20an%20executive."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <MessageSquare className="h-3 w-3 text-emerald-400" />
            <span>WhatsApp +233 20 5551 7659</span>
          </a>
        </div>
      </div>
    </div>
  );
};
