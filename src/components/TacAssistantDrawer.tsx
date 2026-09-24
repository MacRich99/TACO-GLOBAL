import React, { useState, useEffect, useRef } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import servicesData from '@/src/data/services.json';
import { db } from '@/src/data/dbStore';
import { PersonaType } from '@/src/types';
import { GoogleGenAI } from '@google/genai';
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
  MessageSquare,
  DollarSign,
  Layers,
  Clock,
  ExternalLink
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  personaTag?: PersonaType;
  suggestedAction?: {
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  };
  recommendedServices?: {
    id: string;
    title: string;
    price: number;
    turnaround: string;
    slug: string;
  }[];
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
      text: 'Greetings. I am the TAC AI Concierge, trained on the complete TAC GLOBAL ecosystem and TAC STUDIOS deliverable catalog. How may I direct your mission today?',
      suggestedAction: {
        label: 'Explore Entrepreneur Solutions',
        action: () => handleQuickPersonaSelect('entrepreneur'),
      },
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with initial prompt if passed
  useEffect(() => {
    if (aiAssistantOpen && assistantInitialPrompt) {
      handleSendMessage(assistantInitialPrompt);
    }
  }, [aiAssistantOpen, assistantInitialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const allServices = db.getServices();

  const handleQuickPersonaSelect = (persona: PersonaType) => {
    setActivePersona(persona);
    const personaLabels: Record<PersonaType, string> = {
      'entrepreneur': 'Entrepreneur & Founder (Branding, Pitch Decks, Web Dev, Business Plans)',
      'career-academic': 'Career & Academic (SOPs, Admissions Essays, Executive CVs)',
      'talent-ambassador': 'Talent & Ambassador (Campus Commissions, Referral Payouts)',
      'enterprise-institutional': 'Institutional & Enterprise (Market Research & Feasibility)',
    };
    handleSendMessage(`I am interested in ${personaLabels[persona]}`);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessageId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMessageId, sender: 'user', text: query },
    ];
    setMessages(newMessages);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      // 1. Check for matching services in database
      const queryLower = query.toLowerCase();
      const matched = allServices.filter((s) => 
        queryLower.includes(s.title.toLowerCase()) ||
        queryLower.includes(s.category.toLowerCase()) ||
        (s.id === 'logo-design' && (queryLower.includes('logo') || queryLower.includes('brand'))) ||
        (s.id === 'business-plan' && (queryLower.includes('business plan') || queryLower.includes('investor'))) ||
        (s.id === 'academic-sop' && (queryLower.includes('sop') || queryLower.includes('statement') || queryLower.includes('essay'))) ||
        (s.id === 'fullstack-web-dev' && (queryLower.includes('web') || queryLower.includes('website') || queryLower.includes('app')))
      ).slice(0, 3);

      // 2. Attempt Google GenAI call with gemini-3.8-flash
      let aiResponseText = '';
      let usedGemini = false;

      // Provide system context for TAC GLOBAL
      const systemInstruction = `You are "Ask TAC", the official AI Executive Concierge for TAC GLOBAL & TAC STUDIOS.
Motto: "Excellence with Divinity".
You are knowledgeable, authoritative, concise, and focused on commercial execution.
TAC STUDIOS specializes in:
1. Creative & Digital: Corporate Logo ($75), Full-Stack Web Development ($900), Brand Identity Kit.
2. Writing & Technical: Academic SOP & Admissions ($100), Executive CV & Portfolio ($65), Standard Operating Procedures (SOPs).
3. Business & Strategy: Bankable Business Plan ($250), Investor Pitch Deck ($180).
4. Empirical Market Intelligence: Feasibility Studies ($500), Africa Macro Strategy.
Payments: 50% milestone escrow backed by Paystack / Mobile Money.
Keep responses under 3 paragraphs, professional, and invite the user to commission the deliverable or open a brief.`;

      try {
        const ai = new GoogleGenAI({});
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: query,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          aiResponseText = response.text;
          usedGemini = true;
        }
      } catch (geminiError) {
        // Fallback gracefully to domain-aware local heuristic engine
        console.warn('GenAI dynamic call fallback:', geminiError);
      }

      if (!usedGemini || !aiResponseText) {
        // Smart domain-driven fallback response
        if (queryLower.includes('price') || queryLower.includes('cost') || queryLower.includes('rate') || queryLower.includes('fee')) {
          aiResponseText = `TAC STUDIOS operates with transparent starting benchmarks:\n\n` +
            `• Corporate Logo & Visual Mark: From $75 (3–5 days)\n` +
            `• Academic SOP & Admissions Dossier: From $100 (4 days)\n` +
            `• Bankable Business Plan & Model: From $250 (7–10 days)\n` +
            `• Full-Stack Web Application: From $900 (14 days)\n\n` +
            `All projects require only 50% milestone escrow via Paystack or Mobile Money prior to sprint launch.`;
        } else if (queryLower.includes('sop') || queryLower.includes('academic') || queryLower.includes('admission') || queryLower.includes('essay')) {
          aiResponseText = `For graduate admissions and international fellowships, TAC STUDIOS Academic Fellows draft institutional-grade Statements of Purpose ($100) and Admissions Essays tailored to Oxford, Harvard, LSE, and Commonwealth requirements.`;
        } else if (queryLower.includes('business plan') || queryLower.includes('investor') || queryLower.includes('pitch')) {
          aiResponseText = `Our Strategy practice structures bankable business plans ($250) and investor pitch decks ($180) equipped with 5-year dynamic financial models, DCF valuation, and market comparables.`;
        } else if (queryLower.includes('ambassador') || queryLower.includes('partner') || queryLower.includes('career')) {
          aiResponseText = `TAC GLOBAL operates a competitive Campus Ambassador and Referral Partner network offering 15% commissions on all referred studio commissions. You can apply directly through our Opportunities portal.`;
        } else {
          aiResponseText = `Under the banner of "Excellence with Divinity", TAC STUDIOS executes standardized, institutional-grade deliverables across Creative Digital, Technical Writing, and Bankable Strategy. Which specific deliverable would you like to scope?`;
        }
      }

      const recs = matched.map((m) => ({
        id: m.id,
        title: m.title,
        price: m.startingPrice,
        turnaround: m.turnaroundTime,
        slug: m.slug,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiResponseText,
          recommendedServices: recs.length > 0 ? recs : undefined,
          suggestedAction: recs.length > 0 ? {
            label: `Commission ${recs[0].title}`,
            action: () => openServiceModal(recs[0].slug),
          } : undefined,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'Thank you for reaching TAC Concierge. How may our specialized practices assist your enterprise or academic goals?',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!aiAssistantOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg h-full bg-[#060B18] border-l border-white/10 card-tech-glass flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Hairline */}
        <div className="h-1 bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#1E3A8A]" />

        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#FDF0CD]">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-white tracking-tight">
                  Ask TAC &middot; AI Concierge
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Trained on TAC GLOBAL Ecosystem &amp; Blueprint Rates
              </p>
            </div>
          </div>

          <button
            onClick={closeAiAssistant}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Persona Switcher Shortcuts */}
        <div className="p-3 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px] font-mono">
          <span className="text-slate-500 uppercase shrink-0 px-1">Tracks:</span>
          <button
            onClick={() => handleQuickPersonaSelect('entrepreneur')}
            className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white hover:border-[#D4AF37]/40 shrink-0 cursor-pointer"
          >
            Founder
          </button>
          <button
            onClick={() => handleQuickPersonaSelect('career-academic')}
            className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white hover:border-[#D4AF37]/40 shrink-0 cursor-pointer"
          >
            Academic
          </button>
          <button
            onClick={() => handleQuickPersonaSelect('talent-ambassador')}
            className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white hover:border-[#D4AF37]/40 shrink-0 cursor-pointer"
          >
            Ambassador
          </button>
          <button
            onClick={() => handleQuickPersonaSelect('enterprise-institutional')}
            className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white hover:border-[#D4AF37]/40 shrink-0 cursor-pointer"
          >
            Enterprise
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div
                className={`max-w-[90%] rounded-xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#142347] border border-blue-500/30 text-white'
                    : 'bg-white/[0.03] border border-white/10 text-slate-200'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Recommended Service Cards in Chat */}
                {msg.recommendedServices && msg.recommendedServices.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                    <div className="text-[10px] uppercase tracking-wider font-mono text-[#D4AF37]">
                      Recommended Blueprint:
                    </div>
                    {msg.recommendedServices.map((svc) => (
                      <div
                        key={svc.id}
                        onClick={() => openServiceModal(svc.slug)}
                        className="p-2.5 rounded-lg bg-black/40 border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-display font-medium text-white group-hover:text-[#FDF0CD]">
                            {svc.title}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {svc.turnaround} &middot; Escrow Backed
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-mono font-bold text-[#FDF0CD]">
                            {formatPrice(svc.price)}
                          </div>
                          <span className="text-[10px] text-[#D4AF37] font-mono group-hover:underline">
                            Commission &rarr;
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              {msg.suggestedAction && (
                <button
                  onClick={msg.suggestedAction.action}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] to-[#D4AF37] hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
                >
                  <span>{msg.suggestedAction.label}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono p-2">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37] animate-spin" />
              <span>Analyzing catalog &amp; formulation...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-slate-900/40">
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
              placeholder="Ask about pricing, SOPs, pitch decks, turnarounds..."
              className="flex-1 rounded-lg bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-lg bg-gradient-to-r from-[#ECC86A] to-[#D4AF37] text-slate-950 hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 cursor-pointer shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mt-2 px-1">
            <span>Powered by Gemini &amp; TAC Knowledge Base</span>
            <button
              onClick={() => {
                closeAiAssistant();
                navigate('/studios');
              }}
              className="hover:text-slate-300 underline cursor-pointer"
            >
              Browse Full Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
