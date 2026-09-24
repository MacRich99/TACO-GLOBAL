import React, { useState } from 'react';
import servicesData from '@/src/data/services.json';
import { useAppNavigation } from '@/src/context/RouteContext';
import { Mail, Phone, MapPin, MessageSquare, CreditCard, ShieldCheck, ChevronDown, Check, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { openServiceModal } = useAppNavigation();

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('New Project Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the TACO STUDIOS milestone settlement work?',
      a: 'We operate on a transparent milestone structure. Upon signing off on your project brief, an initial 50% commitment is settled via Paystack, Mobile Money, or direct wire transfer. The remaining 50% balance is settled only upon delivery of the final approved master assets and documentation.',
    },
    {
      q: 'Can I pay in Ghanaian Cedis (GHS), US Dollars (USD), or British Pounds (GBP)?',
      a: 'Yes. Our Paystack and Mobile Money gateways process local currency (GHS, NGN, KES) at real-time interbank conversion rates, and accept international credit/debit cards (Visa, Mastercard, Amex) in USD, EUR, and GBP.',
    },
    {
      q: 'Are revision rounds included with each service?',
      a: 'Yes. Every service blueprint includes designated revision rounds (e.g. 2 rounds for logo designs, post-feedback review for SOPs and business plans) to ensure total client satisfaction prior to final master file delivery.',
    },
    {
      q: 'Do you sign non-disclosure agreements (NDAs)?',
      a: 'Absolutely. For proprietary business models, patent-pending tech, and confidential investor pitch decks, TACO GLOBAL routinely executes bilateral Non-Disclosure Agreements prior to brief intake.',
    },
    {
      q: 'How quickly does the project kickoff after submission?',
      a: 'Standard briefs are acknowledged and assigned to a specialized project lead within 2 to 4 business hours. Expedited emergency briefs can initiate same-day.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 pb-24 space-y-20">
      {/* Header */}
      <header className="border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#090F22] to-[#050811] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
            Global Concierge
          </span>
          <h1 className="font-serif-brand text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Connect with TACO GLOBAL
          </h1>
          <p className="text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Reach our executive directors, commission a bespoke enterprise project, or arrange a strategic advisory consultation.
          </p>
        </div>
      </header>

      {/* Main Grid: Info + Contact Form */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office Hubs & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
                Office Hubs
              </span>
              <h2 className="font-serif-brand text-2xl font-bold text-white">
                Executive Locations
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Our distributed leadership coordinates projects around the clock across African, European, and North American timezones.
              </p>
            </div>

            <div className="space-y-4">
              {servicesData.company.officeLocations.map((loc, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-[#070D1C] p-5 space-y-1.5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2 text-white font-serif-brand font-semibold text-sm">
                    <MapPin className="h-4 w-4 text-[#D4AF37]" />
                    <span>{loc.city} &middot; {loc.region}</span>
                  </div>
                  <p className="text-xs text-slate-400 pl-6">{loc.focus}</p>
                </div>
              ))}
            </div>

            {/* Quick Contacts */}
            <div className="rounded-xl border border-[#D4AF37]/35 bg-[#070C18] p-5 space-y-3.5 text-xs shadow-lg shadow-black/60">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Official Contact Desk
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE 24/7
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-3 text-slate-200">
                  <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">Direct Telephone Line</div>
                    <a href="tel:+2332055517659" className="text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors font-mono tracking-wide">
                      +233 20 5551 7659
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-200">
                  <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">WhatsApp Executive Concierge</div>
                    <a href="https://wa.me/2332055517659?text=Hello%20TAC%20GLOBAL,%20I%20would%20like%20to%20connect." target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors font-mono tracking-wide">
                      +233 20 5551 7659
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-200">
                  <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">Corporate Email</div>
                    <a href={`mailto:${servicesData.company.email}`} className="text-sm font-semibold text-slate-200 hover:text-white transition-colors">
                      {servicesData.company.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/2332055517659?text=Hello%20TAC%20GLOBAL,%20I%20would%20like%20to%20connect."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors w-full justify-center shadow-md shadow-emerald-950/50"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Open WhatsApp Direct Chat (+233 20 5551 7659)</span>
                </a>
              </div>
            </div>

            {/* Settlement Details */}
            <div className="rounded-xl border border-slate-800 bg-[#070D1C] p-5 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <CreditCard className="h-4 w-4 text-[#D4AF37]" />
                <span>Verified Payment Channels</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc">
                {servicesData.company.paymentMethods.map((pm, i) => (
                  <li key={i}>{pm}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl border border-[#D4AF37]/30 bg-[#070C18] p-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
                Direct Message
              </span>
              <h3 className="font-serif-brand text-2xl font-bold text-white mt-1">
                Send an Executive Inquiry
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                For service commissions, you can also use our specialized intake modal.
              </p>
            </div>

            {sent ? (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Check className="h-8 w-8" />
                </div>
                <h4 className="font-serif-brand text-xl font-bold text-white">
                  Message Dispatched
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{name}</strong>. Your message has been routed to our corporate inbox. You will receive a response within 4 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-xs text-[#D4AF37] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs text-slate-300">Your Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ama Mensah"
                      className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-xs text-slate-300">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-phone" className="text-xs text-slate-300">WhatsApp / Phone</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+233 ... or +44 ..."
                      className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-subject" className="text-xs text-slate-300">Nature of Inquiry</label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="New Project Inquiry">Commission a Project Brief</option>
                      <option value="Partnership / Campus Ambassador">Campus Ambassador / Partnership</option>
                      <option value="Institutional Advisory">Institutional Strategic Advisory</option>
                      <option value="Vendor / Media">Media / Press / Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-msg" className="text-xs text-slate-300">Your Message *</label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can TACO GLOBAL support your objectives? Detail your scope, timeline, and questions..."
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] rounded-lg hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-md shadow-[#D4AF37]/20"
                  >
                    Send Direct Message
                  </button>
                  <button
                    type="button"
                    onClick={() => openServiceModal()}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#FCE7A1] hover:underline text-center cursor-pointer"
                  >
                    Open Service Intake Form &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Frequently Asked Questions */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
            Clarity &amp; Assurance
          </span>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#070D1C] divide-y divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
              >
                <span className="font-serif-brand text-sm font-semibold text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <p className="mt-3 text-xs text-slate-300 leading-relaxed font-light">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
