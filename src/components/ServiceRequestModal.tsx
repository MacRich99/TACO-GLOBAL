import React, { useState, useEffect, useRef } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import { db } from '@/src/data/dbStore';
import { ServiceItem } from '@/src/types/schema';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Paperclip, 
  Trash2, 
  Building2, 
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  Lock,
  Layers
} from 'lucide-react';

export const ServiceRequestModal: React.FC = () => {
  const { 
    serviceModalOpen, 
    selectedServiceSlug, 
    activePersona, 
    closeServiceModal,
    navigate
  } = useAppNavigation();

  const { formatPrice, currency } = useCurrency();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  
  // Client Contact Details
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [targetDeadline, setTargetDeadline] = useState('Standard Timeline');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email' | 'call'>('whatsapp');
  
  // Project Brief Details
  const [projectObjectives, setProjectObjectives] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [specificInputs, setSpecificInputs] = useState<Record<string, string>>({});
  
  // File Uploads
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; size: number; fileType: string; url: string; uploadedAt: string }[]>([]);
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProject, setSubmittedProject] = useState<{ id: string; quoteAmount: number } | null>(null);

  useEffect(() => {
    const list = db.getServices();
    setServices(list);
  }, []);

  // Update selected service when modal opens or slug changes
  useEffect(() => {
    if (serviceModalOpen) {
      const list = db.getServices();
      setServices(list);
      setSubmittedProject(null);

      if (selectedServiceSlug) {
        const found = list.find((s) => s.slug === selectedServiceSlug || s.id === selectedServiceSlug);
        if (found) {
          setSelectedServiceId(found.id);
        } else if (list.length > 0) {
          setSelectedServiceId(list[0].id);
        }
      } else if (!selectedServiceId && list.length > 0) {
        setSelectedServiceId(list[0].id);
      }
    }
  }, [serviceModalOpen, selectedServiceSlug]);

  const activeService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newUploaded = Array.from(files).map((f) => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: f.name,
      size: f.size,
      fileType: f.type || 'application/octet-stream',
      url: '#',
      uploadedAt: new Date().toISOString(),
    }));

    setUploadedFiles((prev) => [...prev, ...newUploaded]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSpecificInputChange = (field: string, value: string) => {
    setSpecificInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !email.trim() || !activeService) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newRecord = db.createProject({
        clientId: `client-${Date.now()}`,
        clientName,
        clientEmail: email,
        clientPhone: phone,
        clientOrganization: organization,
        serviceId: activeService.id,
        serviceTitle: activeService.title,
        category: activeService.category,
        targetPersona: activeService.targetPersona || activePersona || 'entrepreneur',
        status: 'Pending',
        paymentStatus: 'Unpaid',
        customQuoteAmount: activeService.startingPrice,
        briefDetails: {
          objectives: projectObjectives || `Commission request for ${activeService.title}`,
          targetAudience: targetAudience || 'General Target Market',
          specificInputs,
          targetDeadline,
          preferredContactMethod: contactMethod,
        },
        uploadedFiles,
      });

      setIsSubmitting(false);
      setSubmittedProject({ id: newRecord.id, quoteAmount: newRecord.customQuoteAmount });
    }, 600);
  };

  if (!serviceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-white/10 card-tech-glass p-6 sm:p-9 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Metallic Hairline Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#1E3A8A]" />

        {/* Close Button */}
        <button
          onClick={closeServiceModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {submittedProject ? (
          /* Success Screen with direct link to live Client Portal */
          <div className="text-center py-8 space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#D4AF37]">
                Commission Brief Logged &middot; Database Synced
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Brief Reference: <span className="text-[#FDF0CD] font-mono">{submittedProject.id}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto leading-relaxed">
                Your deliverable dossier for <strong className="text-white font-medium">{activeService?.title}</strong> has been registered in the TAC STUDIOS dispatch queue under an initial starting scope of <strong className="text-[#FDF0CD] font-mono">{formatPrice(submittedProject.quoteAmount)}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] max-w-md mx-auto text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Client Name:</span>
                <span className="text-white font-medium">{clientName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Dispatch Status:</span>
                <span className="text-amber-400 font-semibold">Pending Practice Review</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Protection:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> 50% Milestone Escrow
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  closeServiceModal();
                  navigate('/dashboard');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] to-[#D4AF37] hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 font-mono"
              >
                <span>Track Live in Client Portal</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={closeServiceModal}
                className="w-full sm:w-auto px-5 py-3 rounded-lg text-xs font-mono uppercase tracking-wider text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-[#D4AF37] mb-1">
                <Layers className="h-3.5 w-3.5" />
                <span>TAC STUDIOS &middot; INTAKE DISPATCH</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Commission Specialized Deliverable
              </h2>
              <p className="text-xs text-slate-400 font-light mt-1">
                Direct production pipeline backed by vetted fellows, fixed starting rates, and escrow settlement.
              </p>
            </div>

            {/* Service Selector & Pre-fill Banner */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                  Target Service Blueprint
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="bg-[#090F22] border border-white/15 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer w-full sm:w-72"
                >
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.title} (${svc.startingPrice})
                    </option>
                  ))}
                </select>
              </div>

              {activeService && (
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Starting Investment</span>
                  <span className="font-mono text-xl font-bold text-[#FDF0CD]">
                    {formatPrice(activeService.startingPrice)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Turnaround: {activeService.turnaroundTime}
                  </span>
                </div>
              )}
            </div>

            {/* Section 1: Client Credentials */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold border-b border-white/10 pb-1.5 flex items-center justify-between">
                <span>1. Client &amp; Enterprise Credentials</span>
                <span className="text-[10px] text-slate-500 font-mono">Confidential 256-bit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Dr. Kwame Mensah"
                    className="w-full rounded-lg bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Corporate / Primary Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. kwame@enterprise.com"
                    className="w-full rounded-lg bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Phone / WhatsApp Dispatch
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +233 24 000 0000"
                    className="w-full rounded-lg bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Organization / Academic Affiliation
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Apex Diagnostics / Oxford"
                    className="w-full rounded-lg bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Dynamic Category-Specific Production Fields */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold border-b border-white/10 pb-1.5 flex items-center justify-between">
                <span>2. Deliverable Scope &amp; Specialized Parameters</span>
                <span className="text-[10px] text-[#D4AF37] font-mono">{activeService?.category || 'Custom Blueprint'}</span>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Primary Objectives &amp; Commercial Mandate *
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectObjectives}
                  onChange={(e) => setProjectObjectives(e.target.value)}
                  placeholder={`Describe your vision for ${activeService?.title || 'this project'}, target deliverables, and desired outcomes...`}
                  className="w-full rounded-lg bg-white/[0.03] border border-white/10 p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#D4AF37] transition-colors leading-relaxed"
                />
              </div>

              {/* Dynamic Inputs from Service Specification */}
              {activeService?.requiredInputs && activeService.requiredInputs.length > 0 && (
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Required Blueprint Prerequisites:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.requiredInputs.map((inputKey) => (
                      <div key={inputKey}>
                        <label className="text-[9px] uppercase font-mono text-slate-400 block mb-0.5 truncate">
                          {inputKey}
                        </label>
                        <input
                          type="text"
                          value={specificInputs[inputKey] || ''}
                          onChange={(e) => handleSpecificInputChange(inputKey, e.target.value)}
                          placeholder={`Provide details or link...`}
                          className="w-full rounded-md bg-white/[0.03] border border-white/10 px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none font-mono"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* File Attachment Support */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase font-mono text-slate-400">
                    Supporting Documents / Reference Assets
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] font-mono text-[#FDF0CD] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Paperclip className="h-3 w-3" />
                    <span>Attach Files (PDF, Excel, Vector)</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-1.5">
                    {uploadedFiles.map((file) => (
                      <div 
                        key={file.id} 
                        className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="h-3.5 w-3.5 text-[#D4AF37] shrink-0" />
                          <span className="text-slate-200 truncate">{file.name}</span>
                          <span className="text-[10px] text-slate-500">
                            ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions & Escrow Guarantee */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                <span>50% Milestone Escrow &middot; Paystack / MoMo</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={closeServiceModal}
                  className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] to-[#D4AF37] rounded-lg hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer disabled:opacity-50 font-mono shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Registering Brief...</span>
                  ) : (
                    <>
                      <span>Transmit Request</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
