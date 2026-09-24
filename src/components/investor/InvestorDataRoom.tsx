import React, { useState } from 'react';
import { useCurrency } from '@/src/context/CurrencyContext';
import { 
  TrendingUp, 
  ShieldCheck, 
  Globe2, 
  Layers, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Building2, 
  DollarSign, 
  PieChart, 
  Users, 
  Sparkles,
  DownloadCloud,
  Lock
} from 'lucide-react';
import { TacLogo } from '@/src/components/brand/TacLogo';

export const InvestorDataRoom: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'thesis' | 'economics' | 'flywheel' | 'roadmap'>('thesis');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    firm: '',
    email: '',
    ticketSize: '$50,000 – $250,000',
    notes: '',
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#060B18] via-[#03060E] to-[#020409] p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/90 backdrop-blur-xl relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#D4AF37]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#070D1F] text-[#FDF0CD] text-[11px] font-mono tracking-widest uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>INSTITUTIONAL CAPITAL &amp; GOVERNANCE</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-white font-bold tracking-tight">
            TACO GLOBAL Investment Architecture
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
            A dual-engine economic flywheel capturing the $3.2B Sub-Saharan African &amp; diaspora knowledge economy through high-margin agency execution and proprietary venture incubation.
          </p>
        </div>

        {/* Executive Direct Contact */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <a
            href="tel:+2332055517659"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D4AF37]/35 bg-[#080E21] hover:bg-[#0C152F] text-xs font-mono text-[#FDF0CD] transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Desk: +233 20 5551 7659</span>
          </a>
          <a
            href="https://wa.me/2332055517659?text=Hello%20TACO%20GLOBAL%20Executive%20Council,%20I%20am%20an%20investor%20requesting%20the%20Institutional%20Data%20Room%20access."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] text-slate-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#D4AF37]/20"
          >
            <span>WhatsApp Chair</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-6 border-b border-slate-800/80 no-scrollbar">
        {[
          { id: 'thesis', label: '1. Investment Thesis & TAM', icon: Globe2 },
          { id: 'flywheel', label: '2. Dual-Engine Flywheel', icon: Layers },
          { id: 'economics', label: '3. Operating Unit Economics', icon: TrendingUp },
          { id: 'roadmap', label: '4. Capital Blueprint & Request Deck', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-[0.14em] font-medium transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md shadow-[#D4AF37]/25'
                  : 'bg-[#060A16] text-slate-400 hover:text-white border border-slate-800/60'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Investment Thesis */}
      {activeTab === 'thesis' && (
        <div className="py-8 space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-[#D4AF37]/25 bg-[#050915] space-y-3">
              <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">MACRO TAILWIND</div>
              <div className="text-3xl font-serif-brand font-bold text-white">$3.2B TAM</div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Sub-Saharan African and diaspora knowledge, creative production, and cross-border advisory market growing at 16.4% CAGR through 2030.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#D4AF37]/25 bg-[#050915] space-y-3">
              <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">PROFITABILITY</div>
              <div className="text-3xl font-serif-brand font-bold text-emerald-400">68.4% GM</div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                High gross margin agency execution models self-fund venture incubation, achieving positive working capital with zero external debt burden.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#D4AF37]/25 bg-[#050915] space-y-3">
              <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">CREDIBILITY RATE</div>
              <div className="text-3xl font-serif-brand font-bold text-[#FDF0CD]">99.4% Success</div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Uncompromising standard of excellence in academic admissions, corporate identity builds, and bankable business plans across UK and global corridors.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#040812] space-y-4">
            <h3 className="font-serif-brand text-xl text-white font-semibold">The Structural Problem &amp; The TACO Solution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-300 font-light leading-relaxed">
              <div className="space-y-3 p-4 rounded-xl border border-red-500/20 bg-red-950/10">
                <span className="font-semibold text-red-400 uppercase tracking-wider text-[11px] block">Market Friction (The Status Quo)</span>
                <p>
                  Founders, institutions, and diaspora clients face severe fragmentation: cheap freelancers produce unviable work, generic AI floods the market with unusable templated copy, and international agencies charge astronomical rates disconnected from African realities.
                </p>
              </div>
              <div className="space-y-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
                <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px] block">The TACO Advantage (Institutional Standard)</span>
                <p>
                  TACO GLOBAL combines rigorous strategic craft, real human judgment, multi-currency escrow settlement (Paystack / Mobile Money / SWIFT), and a collegiate talent network to deliver verified institutional excellence in 3–7 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Dual Engine Flywheel */}
      {activeTab === 'flywheel' && (
        <div className="py-8 space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Engine 1 */}
            <div className="p-8 rounded-2xl border border-[#D4AF37]/35 bg-[#050A19] relative space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 uppercase tracking-widest">
                  ENGINE 1: CASHFLOW FOUNDATION
                </span>
                <span className="text-xs font-mono text-emerald-400">Immediate Working Capital</span>
              </div>
              <h3 className="font-serif-brand text-2xl text-white font-bold">
                TACO STUDIOS (High-Margin Services)
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Provides 6 core disciplines: Creative &amp; Digital, Writing &amp; Communication, Business &amp; Strategy, Social &amp; Marketing, Research &amp; Intelligence, and People Development.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span>Upfront milestone escrow billing via Paystack / Mobile Money</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span>Gross margins of 65% – 72% across all 6 service lines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span>Organic pipeline generated by student ambassadors and corporate referrals</span>
                </li>
              </ul>
            </div>

            {/* Engine 2 */}
            <div className="p-8 rounded-2xl border border-[#D4AF37]/35 bg-[#050A19] relative space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 uppercase tracking-widest">
                  ENGINE 2: VENTURE &amp; EQUITY EXPANSION
                </span>
                <span className="text-xs font-mono text-[#D4AF37]">Long-Horizon Equity Moat</span>
              </div>
              <h3 className="font-serif-brand text-2xl text-white font-bold">
                TACO VENTURES &amp; INCUBATION
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Reinvests high-margin service profits into proprietary consumer, commerce, and digital properties, eliminating external dilutive pre-seed rounds.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span>Incubated brands include The Peoples Mall &amp; N'S Radiance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span>Proprietary talent academy feeds vetted creative and tech operatives</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span>Cross-selling between services clients and venture platforms</span>
                </li>
              </ul>
            </div>
          </div>

          {/* System Flywheel Visual */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#03060E] text-center space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              THE TACO DUAL-ENGINE CLOSED LOOP
            </div>
            <p className="text-xs text-slate-400 font-light max-w-xl mx-auto">
              Ambassador Network $\rightarrow$ Zero-CAC Client Inflow $\rightarrow$ High-Margin Cashflow Execution $\rightarrow$ Proprietary Venture Incubation $\rightarrow$ High-Multiple Enterprise Value.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Operating Unit Economics */}
      {activeTab === 'economics' && (
        <div className="py-8 space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-[#040813] space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Average Ticket</span>
              <div className="text-2xl font-bold font-serif-brand text-white">$150 – $2,500</div>
              <span className="text-[11px] text-slate-500">From micro-SOPs to enterprise retainers</span>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#040813] space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Response SLA</span>
              <div className="text-2xl font-bold font-serif-brand text-emerald-400">&lt; 4 Hours</div>
              <span className="text-[11px] text-slate-500">Instant automated lead triage</span>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#040813] space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Turnaround</span>
              <div className="text-2xl font-bold font-serif-brand text-[#D4AF37]">3–7 Days</div>
              <span className="text-[11px] text-slate-500">Rapid iterative delivery</span>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#040813] space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Ambassador Commission</span>
              <div className="text-2xl font-bold font-serif-brand text-[#FDF0CD]">15% Rev-Share</div>
              <span className="text-[11px] text-slate-500">Decentralized campus viral sales</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#050A18] space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Multi-Currency Clearing &amp; Payment Redundancy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 font-light">
              <div className="p-4 rounded-lg bg-[#02050D] border border-slate-800/80">
                <span className="text-[#D4AF37] font-mono font-semibold block mb-1">Local Rails (Ghana)</span>
                MTN Mobile Money, Telecel Cash, AirtelTigo. Real-time Ghanaian Cedi (GHS) direct settlement.
              </div>
              <div className="p-4 rounded-lg bg-[#02050D] border border-slate-800/80">
                <span className="text-[#D4AF37] font-mono font-semibold block mb-1">Pan-African Gateway</span>
                Paystack integration enabling credit/debit card processing across West and Southern Africa.
              </div>
              <div className="p-4 rounded-lg bg-[#02050D] border border-slate-800/80">
                <span className="text-[#D4AF37] font-mono font-semibold block mb-1">International Corridors</span>
                USD, GBP, EUR SWIFT transfers for corporate strategy, overseas scholars, and diaspora clients.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Roadmap & Confidential Deck */}
      {activeTab === 'roadmap' && (
        <div className="py-8 space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Phased Roadmap */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-serif-brand text-xl text-white font-semibold">Strategic Expansion Milestones</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#060D20] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#D4AF37] font-bold">PHASE 1 (2026): ENGINE CONSOLIDATION</span>
                    <span className="text-emerald-400">Current Phase</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Formalize Accra Executive Desk, scale campus ambassador presence across all major tertiary institutions in Ghana, expand web development and executive business planning pipelines.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-[#040814] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">PHASE 2 (2027): PAN-AFRICAN CORRIDORS</span>
                    <span className="text-slate-500">Upcoming</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Launch regional satellite operational clusters in Lagos (Nigeria) and Nairobi (Kenya). Deepen diaspora partnerships in London and North America.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-[#040814] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">PHASE 3 (2028): VENTURE ACCELERATION</span>
                    <span className="text-slate-500">Long-Horizon</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Institutional spin-outs of proprietary commerce and platform ventures (The Peoples Mall, N'S Radiance) with third-party institutional co-investment.
                  </p>
                </div>
              </div>
            </div>

            {/* Request Confidential Deck Form */}
            <div className="lg:col-span-5 p-6 rounded-2xl border border-[#D4AF37]/40 bg-[#050A19] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                <Lock className="h-3.5 w-3.5" />
                <span className="uppercase tracking-widest">CONFIDENTIAL DATA ROOM ACCESS</span>
              </div>
              <h4 className="font-serif-brand text-lg text-white font-bold">Request Institutional Briefing</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Accredited investors, angel syndicates, and institutional partners may request our executive information memorandum and financial deck.
              </p>

              {inquirySubmitted ? (
                <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-center space-y-2">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto" />
                  <div className="text-sm font-semibold text-emerald-300">Request Dispatched</div>
                  <p className="text-xs text-slate-300">
                    The TACO GLOBAL Executive Council has received your credentials. An executive will contact you via WhatsApp/Email within 4 hours.
                  </p>
                  <a
                    href="https://wa.me/2332055517659?text=Hello%20TACO%20GLOBAL,%20I%20have%20submitted%20an%20Investor%20Briefing%20request%20on%20the%20platform."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-[#D4AF37] hover:underline font-mono"
                  >
                    Expedite via Direct WhatsApp Desk &rarr;
                  </a>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="e.g. Dr. Kwame Mensah"
                      className="w-full px-3 py-2 rounded-lg bg-[#02050E] border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Institution / Angel Fund</label>
                    <input
                      required
                      type="text"
                      value={inquiryForm.firm}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, firm: e.target.value })}
                      placeholder="e.g. Sahara Ventures / Family Office"
                      className="w-full px-3 py-2 rounded-lg bg-[#02050E] border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Professional Email</label>
                    <input
                      required
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      placeholder="kwame@saharaventures.com"
                      className="w-full px-3 py-2 rounded-lg bg-[#02050E] border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Allocation / Ticket Interest</label>
                    <select
                      value={inquiryForm.ticketSize}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, ticketSize: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#02050E] border border-slate-700 text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="$25,000 – $50,000">$25,000 – $50,000 (Angel)</option>
                      <option value="$50,000 – $250,000">$50,000 – $250,000 (Syndicate / Fund)</option>
                      <option value="$250,000 – $1,000,000">$250,000 – $1,000,000 (Strategic Partner)</option>
                      <option value="Commercial Advisory / Retainer">Commercial Advisory / Retainer</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] text-slate-950 font-semibold uppercase tracking-wider text-xs transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer hover:brightness-110 mt-2"
                  >
                    Transmit Investor Credentials
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
