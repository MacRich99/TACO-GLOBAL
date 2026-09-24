import React, { useState, useEffect } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency, CurrencyCode } from '@/src/context/CurrencyContext';
import servicesData from '@/src/data/services.json';
import { ServiceSpec, PersonaType } from '@/src/types';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  Copy, 
  Check, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Building2, 
  FileText,
  Calendar,
  Compass
} from 'lucide-react';

export const ServiceRequestModal: React.FC = () => {
  const { 
    serviceModalOpen, 
    selectedServiceSlug, 
    activePersona, 
    setActivePersona, 
    closeServiceModal 
  } = useAppNavigation();

  const { formatPrice, currency, setCurrency, rates } = useCurrency();

  // All services flattened for dropdown
  const allServices: ServiceSpec[] = servicesData.categories.flatMap((c) => c.services as unknown as ServiceSpec[]);

  // Active persona inside modal
  const [modalPersona, setModalPersona] = useState<PersonaType>(activePersona || 'entrepreneur');

  // Form State: Common Fields
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetDeadline, setTargetDeadline] = useState('Standard Timeline');
  const [projectBrief, setProjectBrief] = useState('');
  const [cloudLink, setCloudLink] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email' | 'call'>('whatsapp');
  const [checkedInputs, setCheckedInputs] = useState<Record<string, boolean>>({});

  // Dynamic Persona-Specific Fields
  // 1. Entrepreneur
  const [businessName, setBusinessName] = useState('');
  const [businessStage, setBusinessStage] = useState<'idea' | 'early' | 'growth' | 'established'>('early');
  const [industrySector, setIndustrySector] = useState('');

  // 2. Career & Academic
  const [targetInstitution, setTargetInstitution] = useState('');
  const [targetProgramOrRole, setTargetProgramOrRole] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [scholarshipOrScheme, setScholarshipOrScheme] = useState('');

  // 3. Talent & Ambassador
  const [opportunityTrack, setOpportunityTrack] = useState('Campus Ambassador (15% Commission)');
  const [campusOrCity, setCampusOrCity] = useState('');
  const [socialOrNetworkReach, setSocialOrNetworkReach] = useState('');

  // 4. Institutional & Enterprise
  const [institutionName, setInstitutionName] = useState('');
  const [advisoryScope, setAdvisoryScope] = useState('Market Feasibility Study');
  const [geographicFocus, setGeographicFocus] = useState('Ghana & West Africa');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize when modal opens or selectedServiceSlug changes
  useEffect(() => {
    if (selectedServiceSlug) {
      const match = allServices.find((s) => s.slug === selectedServiceSlug || s.id === selectedServiceSlug);
      if (match) {
        setSelectedServiceId(match.id);
        if (match.targetPersona) {
          setModalPersona(match.targetPersona as PersonaType);
        }
        return;
      }
    }

    if (activePersona) {
      setModalPersona(activePersona);
    }

    // If no service selected, pick the first appropriate for current persona
    if (!selectedServiceId && allServices.length > 0) {
      const personaMatch = allServices.find((s) => (s.targetPersona as PersonaType) === modalPersona);
      setSelectedServiceId(personaMatch ? personaMatch.id : allServices[0].id);
    }
  }, [selectedServiceSlug, serviceModalOpen, activePersona]);

  // When persona tab changes in modal, auto-suggest relevant service
  const handlePersonaTabClick = (p: PersonaType) => {
    setModalPersona(p);
    setActivePersona(p);
    const personaServices = allServices.filter((s) => (s.targetPersona as PersonaType) === p);
    if (personaServices.length > 0) {
      setSelectedServiceId(personaServices[0].id);
    }
  };

  // When service changes in dropdown, auto-adjust persona if mismatched
  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const found = allServices.find((s) => s.id === serviceId);
    if (found && found.targetPersona && (found.targetPersona as PersonaType) !== modalPersona) {
      setModalPersona(found.targetPersona as PersonaType);
    }
  };

  const activeService = allServices.find((s) => s.id === selectedServiceId) || allServices[0];

  const handleInputCheck = (inputName: string) => {
    setCheckedInputs((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!clientName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name, email, and phone/WhatsApp number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const ref = `TAC-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceCode(ref);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleCopyRef = () => {
    if (referenceCode) {
      navigator.clipboard.writeText(referenceCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const generateWhatsAppUrl = () => {
    let personaDetails = '';
    if (modalPersona === 'entrepreneur') {
      personaDetails = `*Business:* ${businessName || 'N/A'} (${businessStage})\n*Sector:* ${industrySector || 'General'}`;
    } else if (modalPersona === 'career-academic') {
      personaDetails = `*Target Institution:* ${targetInstitution || 'N/A'}\n*Program/Role:* ${targetProgramOrRole || 'N/A'}\n*Deadline:* ${applicationDeadline || 'Rolling'}`;
    } else if (modalPersona === 'talent-ambassador') {
      personaDetails = `*Track:* ${opportunityTrack}\n*Campus/City:* ${campusOrCity || 'N/A'}`;
    } else {
      personaDetails = `*Enterprise:* ${institutionName || 'N/A'}\n*Scope:* ${advisoryScope}\n*Region:* ${geographicFocus}`;
    }

    const text = encodeURIComponent(
      `Hello TACO GLOBAL Concierge,\n\nI have submitted my intake brief: *${referenceCode}*.\n\n` +
      `*Track/Persona:* ${modalPersona.toUpperCase()}\n` +
      `*Service:* ${activeService?.title || 'Custom Scope'}\n` +
      `*Client:* ${clientName}\n` +
      `${personaDetails}\n` +
      `*Turnaround:* ${targetDeadline}\n` +
      `*Estimated Starting Rate:* ${formatPrice(activeService?.startingPrice || 0)} (${currency})\n` +
      `*Brief:* ${projectBrief.slice(0, 150)}...`
    );
    return `https://wa.me/${servicesData.company.whatsapp}?text=${text}`;
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setReferenceCode('');
    setClientName('');
    setEmail('');
    setPhone('');
    setBusinessName('');
    setIndustrySector('');
    setTargetInstitution('');
    setTargetProgramOrRole('');
    setCampusOrCity('');
    setInstitutionName('');
    setProjectBrief('');
    setCloudLink('');
    closeServiceModal();
  };

  if (!serviceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#D4AF37]/50 bg-[#070C18] text-slate-100 shadow-2xl shadow-black/95 my-8 overflow-hidden">
        {/* Modal Top Ribbon Header */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 bg-[#0B1224] px-6 py-4">
          <div>
            <div className="text-[10px] uppercase font-semibold tracking-widest text-[#D4AF37]">
              TACO GLOBAL &middot; Context-Aware Project Intake
            </div>
            <h3 className="font-serif-brand text-lg font-bold text-white">
              {isSubmitted ? 'Engagement Dossier Initialized' : 'Commissioning & Brief Intake'}
            </h3>
          </div>
          <button
            onClick={closeServiceModal}
            className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 max-h-[82vh] overflow-y-auto">
          {isSubmitted ? (
            /* Success confirmation */
            <div className="text-center py-6 space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div>
                <h4 className="font-serif-brand text-2xl font-bold text-white mb-2">
                  Intake Dossier Registered
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
                  Your requirements for <span className="text-[#FCE7A1] font-semibold">{activeService?.title}</span> have been synchronized with the TACO Executive Concierge.
                </p>
              </div>

              {/* Reference Code Box */}
              <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-[#0B132B]/90 shadow-md">
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                    Official Reference Code
                  </div>
                  <div className="font-mono text-xl font-bold text-[#FCE7A1] tracking-wider">
                    {referenceCode}
                  </div>
                </div>
                <button
                  onClick={handleCopyRef}
                  className="p-2 text-slate-300 hover:text-white rounded hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Copy reference code"
                >
                  {copiedCode ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Next Steps & Instant WhatsApp Link */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-left space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                  <span>Immediate Review &amp; Paystack / MoMo Invoice</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  A formal scope breakdown, milestone timeline, and multi-currency Paystack / Mobile Money invoice have been prepared for <strong className="text-slate-200">{email}</strong>. For instant kickoff or direct questions, transition to WhatsApp:
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-all shadow-md shadow-emerald-950/40"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Handoff to WhatsApp (+233 20 5551 7659)</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 rounded transition-colors cursor-pointer"
                  >
                    Done / Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Context-Aware Intake Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="rounded-md border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
                  {errorMessage}
                </div>
              )}

              {/* 1. Context-Aware 4-Persona Selector Tabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Select Your Profile / Purpose:</span>
                  <span className="text-[10px] font-mono text-[#D4AF37]">Adaptive Intake Questions</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'entrepreneur', label: 'Entrepreneur', icon: <Briefcase className="h-3.5 w-3.5" /> },
                    { id: 'career-academic', label: 'Career / Academic', icon: <GraduationCap className="h-3.5 w-3.5" /> },
                    { id: 'talent-ambassador', label: 'Talent & Partner', icon: <Users className="h-3.5 w-3.5" /> },
                    { id: 'enterprise-institutional', label: 'Enterprise / Intel', icon: <Building2 className="h-3.5 w-3.5" /> },
                  ].map((p) => {
                    const isSelected = modalPersona === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePersonaTabClick(p.id as PersonaType)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#FCE7A1] font-semibold shadow-sm'
                            : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {p.icon}
                        <span className="truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Service & Currency Header Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-[#D4AF37]/30 bg-[#090F20] p-4">
                <div className="sm:col-span-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="modal-service-select" className="text-xs font-semibold text-slate-300">
                      Primary Service / Deliverable
                    </label>
                    {/* Currency quick toggle */}
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <span>Rate:</span>
                      {(Object.keys(rates) as CurrencyCode[]).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCurrency(c)}
                          className={`px-1 py-0.5 rounded cursor-pointer ${
                            currency === c ? 'bg-[#D4AF37] text-slate-950 font-bold' : 'hover:text-white'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <select
                    id="modal-service-select"
                    value={selectedServiceId}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    {servicesData.categories.map((cat) => (
                      <optgroup key={cat.id} label={cat.name}>
                        {cat.services.map((svc) => (
                          <option key={svc.id} value={svc.id}>
                            {svc.title} ({formatPrice(svc.startingPrice)})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col justify-center sm:border-l sm:border-slate-800 sm:pl-4">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Starting At</span>
                  <div className="text-xl font-bold text-[#FCE7A1] font-mono tabular-nums">
                    {formatPrice(activeService?.startingPrice || 0)}
                  </div>
                  <span className="text-[11px] text-slate-400 font-light">{activeService?.turnaroundTime}</span>
                </div>
              </div>

              {/* 3. Base Client Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="modal-client-name" className="text-xs font-medium text-slate-300">
                    Your Full Name <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="modal-client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Samuel Asante"
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="modal-client-email" className="text-xs font-medium text-slate-300">
                    Email Address <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="modal-client-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="modal-client-phone" className="text-xs font-medium text-slate-300">
                    WhatsApp / Phone <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="modal-client-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+233 20 ... or +44 7..."
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* 4. DYNAMIC PERSONA-SPECIFIC FORM FIELDS */}
              <div className="rounded-xl border border-slate-800 bg-[#060B18] p-4 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  <Compass className="h-3.5 w-3.5" />
                  <span>
                    {modalPersona === 'entrepreneur' && 'Entrepreneur & Venture Specifications'}
                    {modalPersona === 'career-academic' && 'Academic Institution & Career Targets'}
                    {modalPersona === 'talent-ambassador' && 'Talent Track & Regional Representation'}
                    {modalPersona === 'enterprise-institutional' && 'Institutional Intelligence Parameters'}
                  </span>
                </div>

                {/* Sub-form A: Entrepreneur */}
                {modalPersona === 'entrepreneur' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="ent-bus-name" className="text-xs text-slate-300 font-medium">Business / Venture Name</label>
                      <input
                        id="ent-bus-name"
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Zenith Logistics Ltd"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="ent-bus-stage" className="text-xs text-slate-300 font-medium">Stage of Business</label>
                      <select
                        id="ent-bus-stage"
                        value={businessStage}
                        onChange={(e) => setBusinessStage(e.target.value as any)}
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      >
                        <option value="idea">Idea / Conceptual Pre-Seed</option>
                        <option value="early">Early-Stage / MVP Launch</option>
                        <option value="growth">Growth &amp; Seed Scaling</option>
                        <option value="established">Established SME / Enterprise</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="ent-bus-sector" className="text-xs text-slate-300 font-medium">Industry / Sector</label>
                      <input
                        id="ent-bus-sector"
                        type="text"
                        value={industrySector}
                        onChange={(e) => setIndustrySector(e.target.value)}
                        placeholder="e.g. FinTech, Agribusiness, Retail"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Sub-form B: Career Professional & Academic */}
                {modalPersona === 'career-academic' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="acad-institution" className="text-xs text-slate-300 font-medium">Target University or Employer</label>
                      <input
                        id="acad-institution"
                        type="text"
                        value={targetInstitution}
                        onChange={(e) => setTargetInstitution(e.target.value)}
                        placeholder="e.g. Oxford, Cambridge, Harvard, Deloitte, UN"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="acad-program" className="text-xs text-slate-300 font-medium">Degree Program OR Target Job Title</label>
                      <input
                        id="acad-program"
                        type="text"
                        value={targetProgramOrRole}
                        onChange={(e) => setTargetProgramOrRole(e.target.value)}
                        placeholder="e.g. MSc Data Science, MBA, VP Operations"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="acad-deadline" className="text-xs text-slate-300 font-medium">Application Deadline</label>
                      <input
                        id="acad-deadline"
                        type="text"
                        value={applicationDeadline}
                        onChange={(e) => setApplicationDeadline(e.target.value)}
                        placeholder="e.g. Dec 15th / In 3 Weeks"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="acad-scholarship" className="text-xs text-slate-300 font-medium">Scholarship / Scheme (If Applicable)</label>
                      <input
                        id="acad-scholarship"
                        type="text"
                        value={scholarshipOrScheme}
                        onChange={(e) => setScholarshipOrScheme(e.target.value)}
                        placeholder="e.g. Chevening, Commonwealth, Mastercard Foundation"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Sub-form C: Talent & Ambassador */}
                {modalPersona === 'talent-ambassador' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="tal-track" className="text-xs text-slate-300 font-medium">Program of Interest</label>
                      <select
                        id="tal-track"
                        value={opportunityTrack}
                        onChange={(e) => setOpportunityTrack(e.target.value)}
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      >
                        <option value="Campus Ambassador (15% Commission)">Campus Ambassador (15% Commission)</option>
                        <option value="Commercial Referral Partner (10-15%)">Commercial Referral Partner (10–15%)</option>
                        <option value="Specialist Talent Network (Design/Dev/Writing)">Specialist Talent Network</option>
                        <option value="Content Creator & Media Partner">Content Creator &amp; Media Partner</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="tal-campus" className="text-xs text-slate-300 font-medium">Campus / City of Residence</label>
                      <input
                        id="tal-campus"
                        type="text"
                        value={campusOrCity}
                        onChange={(e) => setCampusOrCity(e.target.value)}
                        placeholder="e.g. Univ of Ghana (Legon), KNUST, London"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="tal-reach" className="text-xs text-slate-300 font-medium">Primary Strength / Social Reach</label>
                      <input
                        id="tal-reach"
                        type="text"
                        value={socialOrNetworkReach}
                        onChange={(e) => setSocialOrNetworkReach(e.target.value)}
                        placeholder="e.g. Student Council, 5k LinkedIn, Sales"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Sub-form D: Institutional & Enterprise */}
                {modalPersona === 'enterprise-institutional' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="inst-name" className="text-xs text-slate-300 font-medium">Entity / Corporation Name</label>
                      <input
                        id="inst-name"
                        type="text"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        placeholder="e.g. West African Trade Alliance"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="inst-scope" className="text-xs text-slate-300 font-medium">Advisory / Study Scope</label>
                      <select
                        id="inst-scope"
                        value={advisoryScope}
                        onChange={(e) => setAdvisoryScope(e.target.value)}
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      >
                        <option value="Market Feasibility Study">Market Feasibility Study</option>
                        <option value="Empirical Regulatory Intelligence">Empirical Regulatory Intelligence</option>
                        <option value="Bilateral Trade Advisory">Bilateral Trade Advisory</option>
                        <option value="Long-Term Ecosystem Strategic Partnership">Long-Term Strategic Alignment</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="inst-geo" className="text-xs text-slate-300 font-medium">Geographic Corridor</label>
                      <input
                        id="inst-geo"
                        type="text"
                        value={geographicFocus}
                        onChange={(e) => setGeographicFocus(e.target.value)}
                        placeholder="e.g. Ghana & Nigeria, Pan-African, UK/Diaspora"
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Dynamic Prerequisite Checklist from Active Service */}
              {activeService && activeService.clientInputsRequired?.length > 0 && (
                <div className="rounded-lg border border-slate-800 bg-[#080D1A] p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#D4AF37]">
                      Required Client Materials for {activeService.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Check items in hand</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeService.clientInputsRequired.map((inputItem, idx) => (
                      <label
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedInputs[inputItem]}
                          onChange={() => handleInputCheck(inputItem)}
                          className="mt-0.5 rounded border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="font-light">{inputItem}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Project Brief / Deliverable Objectives */}
              <div className="space-y-1.5">
                <label htmlFor="modal-project-brief" className="text-xs font-medium text-slate-300">
                  Deliverable Objectives &amp; Background Notes
                </label>
                <textarea
                  id="modal-project-brief"
                  rows={3}
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  placeholder="Outline key requirements, preferred visual style, target deadlines, or specific constraints..."
                  className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none font-light"
                />
              </div>

              {/* 7. Assets Link & Delivery Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="modal-cloud-link" className="text-xs font-medium text-slate-300">
                    Existing Draft / Google Drive Link (Optional)
                  </label>
                  <input
                    id="modal-cloud-link"
                    type="url"
                    value={cloudLink}
                    onChange={(e) => setCloudLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="modal-turnaround" className="text-xs font-medium text-slate-300">
                    Turnaround Priority
                  </label>
                  <select
                    id="modal-turnaround"
                    value={targetDeadline}
                    onChange={(e) => setTargetDeadline(e.target.value)}
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Standard Timeline">Standard Delivery ({activeService?.turnaroundTime})</option>
                    <option value="Expedited Express (48 Hours)">Expedited Priority (48h +30%)</option>
                    <option value="Urgent Emergency (24 Hours)">Urgent Emergency (24h +60%)</option>
                    <option value="Phased Institutional Rollout">Phased Institutional Rollout</option>
                  </select>
                </div>
              </div>

              {/* 8. Preferred Response Channel */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-slate-300">
                  Preferred Channel for Milestone Handoff
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['whatsapp', 'email', 'call'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setContactMethod(method)}
                      className={`py-2 px-3 text-xs font-medium rounded border transition-colors capitalize cursor-pointer ${
                        contactMethod === method
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#FCE7A1]'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {method === 'whatsapp' ? 'WhatsApp' : method === 'email' ? 'Email Dossier' : 'Direct Call'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 9. Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] rounded-lg hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-[#D4AF37]/25"
                >
                  {isSubmitting ? (
                    <span>Registering Brief...</span>
                  ) : (
                    <>
                      <span>
                        Submit Brief &amp; Generate Quote ({formatPrice(activeService?.startingPrice || 0)})
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <div className="mt-3 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2 font-mono">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>Escrow Milestone Security &middot; Paystack / MoMo Enabled &middot; NDAs Honored</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
