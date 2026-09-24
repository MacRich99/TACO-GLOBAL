import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import { db } from '@/src/lib/firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  setDoc,
  arrayUnion 
} from 'firebase/firestore';
import { DbService } from '@/src/lib/servicesDb';
import { ProjectRecord, OpportunityApplication, DeliverableItem, TimelineMilestone } from '@/src/types/backend';
import { 
  Shield, 
  Layers, 
  DollarSign, 
  Kanban, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Send, 
  ExternalLink, 
  CreditCard,
  FileCheck,
  Search,
  Filter,
  Save,
  X,
  Mail,
  ChevronRight,
  TrendingUp,
  Sliders
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { formatPrice, currency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'services' | 'opportunities' | 'invoicing'>('pipeline');

  // Real-time Firestore Collections
  const [services, setServices] = useState<DbService[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [applications, setApplications] = useState<OpportunityApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>('all');

  // Service Edit Modal
  const [editingService, setEditingService] = useState<DbService | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);

  // Project Edit / Quote / Invoicing Modal
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [quoteAmount, setQuoteAmount] = useState<number>(0);
  const [paymentLink, setPaymentLink] = useState('');
  const [newDeliverableTitle, setNewDeliverableTitle] = useState('');
  const [newDeliverableUrl, setNewDeliverableUrl] = useState('');
  const [newDeliverableType, setNewDeliverableType] = useState('PDF');
  const [adminReplyText, setAdminReplyText] = useState('');

  // Real-time listeners
  useEffect(() => {
    // 1. Services
    const unsubServices = onSnapshot(collection(db, 'services'), (snap) => {
      const list: DbService[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as DbService));
      setServices(list);
    });

    // 2. Projects
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snap) => {
      const list: ProjectRecord[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as ProjectRecord));
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setProjects(list);
    });

    // 3. Applications
    const unsubApps = onSnapshot(collection(db, 'applications'), (snap) => {
      const list: OpportunityApplication[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as OpportunityApplication));
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setApplications(list);
      setLoading(false);
    });

    return () => {
      unsubServices();
      unsubProjects();
      unsubApps();
    };
  }, []);

  // Update Service Details Live
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const serviceRef = doc(db, 'services', editingService.id);
      await updateDoc(serviceRef, {
        title: editingService.title,
        starting_price: Number(editingService.starting_price),
        turnaround_time: editingService.turnaround_time,
        active: editingService.active,
        description: editingService.description,
        updated_at: new Date().toISOString(),
      });
      setServiceModalOpen(false);
      setEditingService(null);
    } catch (err) {
      console.error('Failed to update service:', err);
    }
  };

  // Toggle Service Active Status
  const toggleServiceActive = async (svc: DbService) => {
    try {
      const serviceRef = doc(db, 'services', svc.id);
      await updateDoc(serviceRef, {
        active: !svc.active,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error toggling service status:', err);
    }
  };

  // Update Project Status & Stages
  const handleUpdateProjectStatus = async (projectId: string, newStatus: ProjectRecord['status']) => {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, {
        status: newStatus,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error updating project status:', err);
    }
  };

  // Update Quote & Payment Link
  const handleSaveProjectInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const projectRef = doc(db, 'projects', editingProject.id);
      await updateDoc(projectRef, {
        quote_amount: Number(quoteAmount),
        payment_link: paymentLink.trim(),
        payment_status: paymentLink.trim() ? 'deposit_paid' : 'unpaid',
        updated_at: new Date().toISOString(),
      });
      setEditingProject(null);
    } catch (err) {
      console.error('Failed to update project quote:', err);
    }
  };

  // Add Deliverable to Project
  const handleAddDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !newDeliverableTitle.trim()) return;

    try {
      const item: DeliverableItem = {
        title: newDeliverableTitle.trim(),
        url: newDeliverableUrl.trim() || `https://storage.tacglobal.org/dossiers/${encodeURIComponent(newDeliverableTitle)}.pdf`,
        type: newDeliverableType,
        created_at: new Date().toISOString(),
      };

      const projectRef = doc(db, 'projects', editingProject.id);
      await updateDoc(projectRef, {
        deliverables_url: arrayUnion(item),
        status: 'Under Review', // Auto bump to under review once deliverables are uploaded
        updated_at: new Date().toISOString(),
      });

      setNewDeliverableTitle('');
      setNewDeliverableUrl('');
    } catch (err) {
      console.error('Failed to add deliverable:', err);
    }
  };

  // Admin Reply in Project Chat
  const handleAdminReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !adminReplyText.trim()) return;

    try {
      const projectRef = doc(db, 'projects', editingProject.id);
      await updateDoc(projectRef, {
        communication_logs: arrayUnion({
          sender: 'TAC Executive Atelier',
          role: 'admin',
          message: adminReplyText.trim(),
          timestamp: new Date().toISOString(),
        }),
        updated_at: new Date().toISOString(),
      });
      setAdminReplyText('');
    } catch (err) {
      console.error('Failed to send admin reply:', err);
    }
  };

  // Application Status Transition
  const handleUpdateAppStatus = async (appId: string, newStatus: OpportunityApplication['status']) => {
    try {
      const appRef = doc(db, 'applications', appId);
      await updateDoc(appRef, {
        status: newStatus,
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error updating application status:', err);
    }
  };

  // Filtered Projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.client_name?.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.client_email?.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesStatus = projectStatusFilter === 'all' || p.status === projectStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-tech-grid-dark text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Executive Admin Header */}
        <div className="card-tech-glass p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border-[#D4AF37]/30">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#D4AF37]" />
              <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest">
                Executive Command Center &middot; Root Access
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              TAC GLOBAL Native Administration
            </h1>
            <p className="font-sans text-xs sm:text-sm text-slate-300">
              Live service pricing manipulation, real-time client Kanban pipeline, automated invoice generation, and opportunity admissions.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center min-w-[90px]">
              <div className="text-slate-400 uppercase text-[9px]">Commissions</div>
              <div className="text-base font-bold text-white font-display mt-0.5">{projects.length}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center min-w-[90px]">
              <div className="text-slate-400 uppercase text-[9px]">Active Svcs</div>
              <div className="text-base font-bold text-blue-400 font-display mt-0.5">
                {services.filter((s) => s.active).length}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center min-w-[90px]">
              <div className="text-slate-400 uppercase text-[9px]">Applicants</div>
              <div className="text-base font-bold text-emerald-400 font-display mt-0.5">{applications.length}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-2">
          {[
            { id: 'pipeline', label: 'Client Project Pipeline', icon: <Kanban className="h-4 w-4" /> },
            { id: 'services', label: 'Service & Pricing Manager', icon: <Sliders className="h-4 w-4" /> },
            { id: 'opportunities', label: 'Opportunities & Ambassadors', icon: <Users className="h-4 w-4" /> },
            { id: 'invoicing', label: 'Automated Invoicing & Paystack Links', icon: <CreditCard className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] text-slate-950 shadow-md shadow-[#D4AF37]/20'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 1. CLIENT PROJECT PIPELINE (KANBAN / TABLE) */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="card-tech-glass p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search by client, title, or ID..."
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-slate-400" />
                <select
                  value={projectStatusFilter}
                  onChange={(e) => setProjectStatusFilter(e.target.value)}
                  className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="all">All Pipeline Stages</option>
                  <option value="Pending Quote">Pending Quote</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Pending Quote', 'In Progress', 'Under Review', 'Completed'].map((stage) => {
                const stageProjects = filteredProjects.filter((p) => p.status === stage);
                return (
                  <div key={stage} className="card-tech-glass rounded-xl p-4 space-y-3 flex flex-col">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
                        {stage}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white">
                        {stageProjects.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                      {stageProjects.length === 0 ? (
                        <p className="text-[11px] font-sans text-slate-500 italic py-4 text-center">
                          No projects in this stage
                        </p>
                      ) : (
                        stageProjects.map((p) => (
                          <div
                            key={p.id}
                            className="p-3.5 rounded-lg bg-slate-900/90 border border-white/10 hover:border-[#D4AF37]/50 transition-all space-y-2.5 shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[9px] text-[#D4AF37] uppercase">
                                {p.id.slice(0, 10)}
                              </span>
                              <span className="font-mono text-[10px] font-bold text-white">
                                {formatPrice(p.quote_amount || 0)}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-display text-xs font-bold text-white line-clamp-1">
                                {p.title}
                              </h4>
                              <p className="font-sans text-[11px] text-slate-400 line-clamp-1">
                                {p.client_name || p.client_email}
                              </p>
                            </div>

                            {/* Transition Quick Actions */}
                            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-1">
                              <button
                                onClick={() => {
                                  setEditingProject(p);
                                  setQuoteAmount(p.quote_amount || 0);
                                  setPaymentLink(p.payment_link || '');
                                }}
                                className="text-[10px] font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="h-3 w-3" />
                                <span>Inspect / Manage</span>
                              </button>

                              <select
                                value={p.status}
                                onChange={(e) => handleUpdateProjectStatus(p.id, e.target.value as any)}
                                className="bg-slate-800 text-[10px] text-slate-300 border border-slate-700 rounded px-1.5 py-0.5 cursor-pointer focus:outline-none"
                              >
                                <option value="Pending Quote">Quote</option>
                                <option value="In Progress">Progress</option>
                                <option value="Under Review">Review</option>
                                <option value="Completed">Done</option>
                              </select>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. SERVICES & PRICING MANAGER */}
        {activeTab === 'services' && (
          <div className="card-tech-glass rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Live Service Catalog &amp; Pricing Manager
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-1">
                  Adjust service starting rates, turnaround times, and live availability across the platform in real time without code deployment.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="pb-3 px-3">Service Title</th>
                    <th className="pb-3 px-3">Category</th>
                    <th className="pb-3 px-3">Starting Rate</th>
                    <th className="pb-3 px-3">Turnaround</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {services.map((svc) => (
                    <tr key={svc.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3 font-semibold text-white">
                        <div>{svc.title}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{svc.id}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-mono">{svc.category}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#FDF0CD]">
                        {formatPrice(svc.starting_price)}
                      </td>
                      <td className="py-3 px-3 text-slate-400">{svc.turnaround_time}</td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => toggleServiceActive(svc)}
                          className={`font-mono text-[9px] uppercase px-2.5 py-1 rounded-full border cursor-pointer transition-all ${
                            svc.active
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/20'
                          }`}
                        >
                          {svc.active ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setEditingService(svc);
                            setServiceModalOpen(true);
                          }}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-blue-400 hover:text-white transition-colors cursor-pointer"
                          title="Edit Service Pricing"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. OPPORTUNITIES & AMBASSADORS */}
        {activeTab === 'opportunities' && (
          <div className="card-tech-glass rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/[0.06] pb-4">
              <h3 className="font-display text-xl font-bold text-white">
                Talent &amp; Ambassador Admissions Pipeline
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-1">
                Review Campus Ambassador (15% commission) and Referral Partner applications with automated admission updates.
              </p>
            </div>

            {applications.length === 0 ? (
              <p className="font-sans text-xs text-slate-400 italic text-center py-8">
                No ambassador or referral applications submitted yet.
              </p>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#D4AF37] uppercase">
                          {app.program_type}
                        </span>
                        <span className="text-slate-600">&middot;</span>
                        <span className="font-mono text-xs text-slate-400">
                          {new Date(app.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-white">
                        {app.applicant_name} ({app.applicant_email})
                      </h4>
                      <p className="font-sans text-xs text-slate-300">
                        Phone/WhatsApp: {app.phone || 'N/A'} &middot; Region: {app.details?.campusOrCity || 'N/A'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[9px] uppercase px-2.5 py-1 rounded-full border ${
                          app.status === 'Approved'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : app.status === 'Rejected'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }`}
                      >
                        {app.status}
                      </span>

                      <div className="flex gap-1.5 ml-2">
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'Approved')}
                          className="px-3 py-1.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'Screened')}
                          className="px-3 py-1.5 rounded bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-xs font-semibold cursor-pointer"
                        >
                          Screen
                        </button>
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'Rejected')}
                          className="px-3 py-1.5 rounded bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. AUTOMATED INVOICING & PAYSTACK LINKS */}
        {activeTab === 'invoicing' && (
          <div className="card-tech-glass rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/[0.06] pb-4">
              <h3 className="font-display text-xl font-bold text-white">
                Automated Invoicing &amp; Gateway Dispatcher
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-1">
                Attach custom Paystack / Hubtel checkout links, record milestone payments, and dispatch PDF receipts to clients.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="pb-3 px-3">Project Ref</th>
                    <th className="pb-3 px-3">Client</th>
                    <th className="pb-3 px-3">Quote</th>
                    <th className="pb-3 px-3">Payment Status</th>
                    <th className="pb-3 px-3">Invoice Link</th>
                    <th className="pb-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-3 font-mono text-[#D4AF37] font-semibold">{proj.id.slice(0, 10)}</td>
                      <td className="py-3 px-3 font-medium text-white">{proj.client_name || proj.client_email}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#FDF0CD]">{formatPrice(proj.quote_amount || 0)}</td>
                      <td className="py-3 px-3">
                        <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-full border ${
                          proj.payment_status === 'paid'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : proj.payment_status === 'deposit_paid'
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }`}>
                          {proj.payment_status || 'unpaid'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {proj.payment_link ? (
                          <a
                            href={proj.payment_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 hover:underline flex items-center gap-1 font-mono text-[10px]"
                          >
                            <span>Paystack Link</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-slate-500 italic">Not set</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setQuoteAmount(proj.quote_amount || 0);
                            setPaymentLink(proj.payment_link || '');
                          }}
                          className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white font-semibold cursor-pointer"
                        >
                          Configure Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Edit Service Pricing */}
      {serviceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="card-tech-glass max-w-lg w-full p-6 sm:p-8 rounded-2xl space-y-5 border-[#D4AF37]/50 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display text-base font-bold text-white">
                Modify Service Specification &amp; Pricing
              </h3>
              <button onClick={() => setServiceModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                    Starting Price (USD)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingService.starting_price}
                    onChange={(e) => setEditingService({ ...editingService, starting_price: Number(e.target.value) })}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                    Turnaround Time
                  </label>
                  <input
                    type="text"
                    value={editingService.turnaround_time}
                    onChange={(e) => setEditingService({ ...editingService, turnaround_time: e.target.value })}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                  Description / Overview
                </label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="svc-active"
                  checked={editingService.active}
                  onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                  className="rounded border-slate-700 bg-slate-900 text-[#D4AF37]"
                />
                <label htmlFor="svc-active" className="text-xs text-slate-300">
                  Service is publicly active and accept commissions
                </label>
              </div>

              <div className="flex gap-2 pt-3 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Save Changes Live
                </button>
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Inspect Project & Attach Deliverables / Invoicing */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="card-tech-glass max-w-2xl w-full p-6 sm:p-8 rounded-2xl space-y-6 border-[#D4AF37]/50 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[10px] text-[#D4AF37] uppercase">Project Management</span>
                <h3 className="font-display text-base font-bold text-white">
                  {editingProject.title} ({editingProject.id})
                </h3>
              </div>
              <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Pending Quote', 'In Progress', 'Under Review', 'Completed'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleUpdateProjectStatus(editingProject.id, st)}
                  className={`py-2 px-2 rounded border text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    editingProject.status === st
                      ? 'bg-blue-500/20 border-blue-400 text-white font-bold'
                      : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Quote & Invoice Setup */}
            <form onSubmit={handleSaveProjectInvoice} className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-white/10">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#D4AF37]" />
                <span>Quote &amp; Paystack/Hubtel Gateway</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Custom Milestone Quote (USD)
                  </label>
                  <input
                    type="number"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(Number(e.target.value))}
                    className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Paystack / MoMo Payment Link
                  </label>
                  <input
                    type="url"
                    value={paymentLink}
                    onChange={(e) => setPaymentLink(e.target.value)}
                    placeholder="https://paystack.com/pay/..."
                    className="w-full rounded bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="py-1.5 px-4 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FDF0CD] text-xs font-semibold hover:bg-[#D4AF37]/30 transition-all cursor-pointer"
              >
                Update Invoice &amp; Link
              </button>
            </form>

            {/* Upload Finished Deliverable Hub */}
            <form onSubmit={handleAddDeliverable} className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-white/10">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-emerald-400" />
                <span>Dispatch Finished Deliverable Asset</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Asset Title (e.g. Master Vector Pack)"
                  value={newDeliverableTitle}
                  onChange={(e) => setNewDeliverableTitle(e.target.value)}
                  className="rounded bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="url"
                  placeholder="Storage/Download URL"
                  value={newDeliverableUrl}
                  onChange={(e) => setNewDeliverableUrl(e.target.value)}
                  className="rounded bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white"
                />
                <select
                  value={newDeliverableType}
                  onChange={(e) => setNewDeliverableType(e.target.value)}
                  className="rounded bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white"
                >
                  <option value="Vector Pack (ZIP)">Vector Pack (ZIP)</option>
                  <option value="Executive Dossier (PDF)">Executive PDF</option>
                  <option value="Live Web Repo">Live Web Repo</option>
                  <option value="Financial Model (XLSX)">Financial Model (XLSX)</option>
                </select>
              </div>
              <button
                type="submit"
                className="py-1.5 px-4 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/30 transition-all cursor-pointer"
              >
                Add Deliverable for Client
              </button>
            </form>

            {/* Admin Direct Reply */}
            <form onSubmit={handleAdminReply} className="space-y-2 pt-2">
              <label className="block text-[10px] font-mono uppercase text-slate-400">
                Dispatch Admin Advisory Message to Client
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                  placeholder="Type an official atelier note to client..."
                  className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-semibold hover:bg-blue-500/30 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
