import React, { useState } from 'react';
import servicesData from '@/src/data/services.json';
import { OpportunityRole } from '@/src/types';
import { CheckCircle2, ArrowRight, DollarSign, Users, Award, ShieldCheck, Check } from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const roles = servicesData.opportunities as OpportunityRole[];
  const [selectedRole, setSelectedRole] = useState<string>(roles[0]?.id || 'campus-ambassador');

  // Application form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantInstitution, setApplicantInstitution] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [statement, setStatement] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const currentRole = roles.find((r) => r.id === selectedRole) || roles[0];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPhone) return;

    const ref = `TACO-OPP-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppId(ref);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 pb-24 space-y-20">
      {/* Header */}
      <header className="border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#090F22] to-[#050811] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
            Global Talent &amp; Partner Network
          </span>
          <h1 className="font-serif-brand text-3xl sm:text-5xl font-bold tracking-tight text-white">
            TACO Opportunities &amp; Partnerships
          </h1>
          <p className="text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Join the premier African and global executive ecosystem. Earn substantial commissions as a Campus Ambassador or Commercial Referral Partner, or execute high-stakes briefs within our Specialist Network.
          </p>
        </div>
      </header>

      {/* Role Selection Tabs */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                setSelectedRole(role.id);
                setIsSubmitted(false);
              }}
              className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedRole === role.id
                  ? 'border-[#D4AF37] bg-[#0A132C] shadow-lg shadow-[#D4AF37]/10'
                  : 'border-slate-800 bg-[#070C18] hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] mb-1">
                {role.category === 'ambassador'
                  ? 'University Wing'
                  : role.category === 'partner'
                  ? 'Corporate Wing'
                  : 'Specialist Roster'}
              </div>
              <h3 className="font-serif-brand text-base font-bold text-white mb-2">
                {role.title}
              </h3>
              <div className="text-xs text-emerald-400 font-medium font-mono">
                {role.compensation}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Role Detailed Spec */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-[#070D1C] p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs uppercase font-mono text-[#D4AF37]">Selected Role</span>
              <h2 className="font-serif-brand text-2xl font-bold text-white mt-1">
                {currentRole.title}
              </h2>
              <div className="text-xs text-slate-400 mt-1">
                Location: {currentRole.location} &middot; Commitment: {currentRole.commitment}
              </div>
            </div>

            <div className="rounded-lg border border-[#D4AF37]/40 bg-[#091024] p-3 text-right">
              <div className="text-[10px] uppercase text-slate-400">Commission / Payout</div>
              <div className="text-xs font-bold text-[#FCE7A1] font-mono mt-0.5">
                {currentRole.compensation}
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {currentRole.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Responsibilities */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Core Responsibilities
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                {currentRole.responsibilities.map((res, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Candidate Profile
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                {currentRole.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perks & Benefits */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#FCE7A1]">
                Perks &amp; Incentives
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentRole.perks.map((prk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{prk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Application Form */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#070C18] p-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              Direct Candidate Onboarding
            </span>
            <h3 className="font-serif-brand text-2xl font-bold text-white">
              Apply for {currentRole.title}
            </h3>
            <p className="text-xs text-slate-400">
              Applications are reviewed by the TACO Executive Council within 48 hours.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Check className="h-8 w-8" />
              </div>
              <h4 className="font-serif-brand text-xl font-bold text-white">
                Application Received
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{applicantName}</strong>. Your dossier has been logged under reference code <span className="font-mono text-[#FCE7A1]">{appId}</span>. Our partner director will contact you via WhatsApp / email.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-[#D4AF37] hover:underline pt-2 block mx-auto"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="opp-name" className="text-xs text-slate-300">Full Name *</label>
                  <input
                    id="opp-name"
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Your legal name"
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="opp-email" className="text-xs text-slate-300">Email Address *</label>
                  <input
                    id="opp-email"
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="opp-phone" className="text-xs text-slate-300">WhatsApp / Phone Number *</label>
                  <input
                    id="opp-phone"
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="+233 ... or +44 ..."
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="opp-org" className="text-xs text-slate-300">University or Organization</label>
                  <input
                    id="opp-org"
                    type="text"
                    value={applicantInstitution}
                    onChange={(e) => setApplicantInstitution(e.target.value)}
                    placeholder="e.g. University of Ghana / Freelance"
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="opp-portfolio" className="text-xs text-slate-300">LinkedIn Profile or Portfolio URL</label>
                <input
                  id="opp-portfolio"
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="https://linkedin.com/in/... or GitHub / Behance"
                  className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="opp-statement" className="text-xs text-slate-300">Why are you a fit for {currentRole.title}?</label>
                <textarea
                  id="opp-statement"
                  rows={3}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder="Summarize your relevant network, campus influence, or past project achievements..."
                  className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] rounded-lg hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-md shadow-[#D4AF37]/20"
                >
                  Submit Application Dossier
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
