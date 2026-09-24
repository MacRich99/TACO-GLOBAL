import React, { useState, useEffect } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { RichardProfile } from '@/src/data/richardData';
import { X, CheckCircle2, ArrowUpRight, Mail, MessageSquare, Send, ShieldCheck } from 'lucide-react';

export const CommissionModal: React.FC = () => {
  const { commissionModalOpen, closeCommissionModal, selectedCommissionService } = useAppNavigation();

  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    discipline: selectedCommissionService || 'Brand Architecture & Corporate Identity',
    timeline: 'Within 3–6 months',
    budgetBand: 'Executive / Retained ($10k - $50k+)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedCommissionService) {
      setFormData((prev) => ({ ...prev, discipline: selectedCommissionService }));
    }
  }, [selectedCommissionService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCommissionModal();
      }
    };
    if (commissionModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commissionModalOpen, closeCommissionModal]);

  if (!commissionModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete your name, email, and a brief description of your commission.');
      return;
    }

    setSubmitting(true);
    // Simulate deliberate executive processing
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    closeCommissionModal();
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      phone: '',
      discipline: 'Brand Architecture & Corporate Identity',
      timeline: 'Within 3–6 months',
      budgetBand: 'Executive / Retained ($10k - $50k+)',
      message: ''
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={closeCommissionModal}
    >
      <div
        className="relative w-full max-w-2xl bg-[#070b16] border border-[#D4AF37]/30 rounded-lg shadow-2xl shadow-black/80 my-8 overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D4AF37]/20 bg-[#070b16]/95 backdrop-blur px-6 py-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
            <ShieldCheck className="h-4 w-4" />
            <span className="uppercase tracking-widest">Confidential Commission Brief</span>
          </div>

          <button
            onClick={closeCommissionModal}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-6">
              <div className="inline-flex p-4 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-brand text-2xl font-bold text-white">
                  Commission Received
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Richard Awudey and the TAC GLOBAL executive team will review your brief with discretion and respond within 24 business hours.
                </p>
              </div>

              <div className="p-4 rounded bg-[#030610] border border-white/5 max-w-sm mx-auto text-xs text-slate-400 text-left space-y-1">
                <div><span className="text-slate-500">Subject:</span> {formData.discipline}</div>
                <div><span className="text-slate-500">Contact:</span> {formData.email}</div>
                <div><span className="text-slate-500">Direct Office:</span> {RichardProfile.contact.email}</div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-[#D4AF37] hover:bg-[#ECC86A] rounded transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif-brand text-2xl font-bold text-white">
                  Initiate a Commission with Richard Awudey
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Please outline your enterprise objectives or advisory requirement. Direct inquiries are also handled directly via{' '}
                  <a
                    href={`mailto:${RichardProfile.contact.email}`}
                    className="text-[#D4AF37] hover:underline"
                  >
                    {RichardProfile.contact.email}
                  </a>.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 text-xs text-rose-300 bg-rose-950/40 border border-rose-800 rounded">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Kwame Mensah"
                    className="w-full bg-[#030610] border border-white/10 focus:border-[#D4AF37] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Organization / Firm
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Sovereign Alliance"
                    className="w-full bg-[#030610] border border-white/10 focus:border-[#D4AF37] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full bg-[#030610] border border-white/10 focus:border-[#D4AF37] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+233 / +44 / +1"
                    className="w-full bg-[#030610] border border-white/10 focus:border-[#D4AF37] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Commission Focus
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full bg-[#030610] border border-white/10 focus:border-[#D4AF37] rounded px-3 py-2.5 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Brand Architecture & Corporate Identity">Brand Architecture & Corporate Identity</option>
                    <option value="Bespoke Digital Flagship & Web Craft">Bespoke Digital Flagship & Web Craft</option>
                    <option value="Executive Monograph & Publication Design">Executive Monograph & Publication Design</option>
                    <option value="Retained Creative Direction / Advisory">Retained Creative Direction / Advisory</option>
                    <option value="Keynote Address or Panel Invitation">Keynote Address or Panel Invitation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Anticipated Horizon
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#030610] border border-white/10 focus:border-[#D4AF37] rounded px-3 py-2.5 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Immediate (Next 30–60 days)">Immediate (Next 30–60 days)</option>
                    <option value="Within 3–6 months">Within 3–6 months</option>
                    <option value="Long-range Strategic Planning">Long-range Strategic Planning</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Brief Overview of Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a concise outline of your enterprise, current strategic juncture, and desired deliverables..."
                  className="w-full bg-[#030610] border border-white/10 focus:border-[#D4AF37] rounded p-3 text-sm text-white focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <a
                    href="https://wa.me/233551234567"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp Direct</span>
                  </a>
                  <span>·</span>
                  <a
                    href={`mailto:${RichardProfile.contact.email}`}
                    className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Send Email</span>
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-950 bg-[#D4AF37] hover:bg-[#ECC86A] active:scale-[0.98] transition-all rounded cursor-pointer disabled:opacity-50"
                >
                  <span>{submitting ? 'Transmitting...' : 'Dispatch Brief'}</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
