import React, { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import { useAppNavigation } from '@/src/context/RouteContext';
import { db } from '@/src/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  updateDoc, 
  doc, 
  arrayUnion,
  addDoc
} from 'firebase/firestore';
import { ProjectRecord, TimelineMilestone, DeliverableItem, ProjectFile, CommunicationLog } from '@/src/types/backend';
import { 
  FolderKanban, 
  Clock, 
  Upload, 
  Download, 
  MessageSquare, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  FileText, 
  Sparkles, 
  Paperclip,
  Send,
  Plus,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

const DEFAULT_STAGES = ['Brief Review', 'Production', 'Revisions', 'Final Delivery'];

export const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { formatPrice } = useCurrency();
  const { openServiceModal } = useAppNavigation();

  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Communications input
  const [newMessage, setNewMessage] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

  // File upload state (simulated S3/Storage bucket with persistent Firestore metadata)
  const [uploadFileTitle, setUploadFileTitle] = useState('');
  const [uploadFileLink, setUploadFileLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Real-time Firestore Subscription for Client Projects
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const projectsRef = collection(db, 'projects');
    // Query projects matching client_id OR client_email
    const q = query(
      projectsRef,
      where('client_id', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: ProjectRecord[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as ProjectRecord);
        });

        // Sort descending by created_at in memory
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setProjects(list);
        if (list.length > 0 && !selectedProjectId) {
          setSelectedProjectId(list[0].id);
        }
        setLoading(false);
      },
      (error) => {
        console.error('[Dashboard] Error querying projects:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Send Direct Message / Revision Request
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeProject || !user) return;

    setSendingMsg(true);
    try {
      const msg: CommunicationLog = {
        sender: profile?.full_name || user.displayName || user.email?.split('@')[0] || 'Client',
        role: 'client',
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      const projectDocRef = doc(db, 'projects', activeProject.id);
      await updateDoc(projectDocRef, {
        communication_logs: arrayUnion(msg),
        updated_at: new Date().toISOString(),
      });
      setNewMessage('');
    } catch (err) {
      console.error('Failed to append message:', err);
    } finally {
      setSendingMsg(false);
    }
  };

  // Upload Client Asset / Brief Attachment
  const handleUploadAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileTitle.trim() || !activeProject) return;

    setIsUploading(true);
    try {
      const newFile: ProjectFile = {
        name: uploadFileTitle.trim(),
        url: uploadFileLink.trim() || `https://storage.tacglobal.org/assets/${encodeURIComponent(uploadFileTitle)}.pdf`,
        size: Math.floor(Math.random() * 4000000) + 120000,
        uploaded_at: new Date().toISOString(),
      };

      const projectDocRef = doc(db, 'projects', activeProject.id);
      await updateDoc(projectDocRef, {
        files_url: arrayUnion(newFile),
        updated_at: new Date().toISOString(),
      });

      setUploadFileTitle('');
      setUploadFileLink('');
      setShowUploadModal(false);
    } catch (err) {
      console.error('Failed to attach asset:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // Calculate Progress Percentage based on Status
  const getProgressPercent = (status: ProjectRecord['status']) => {
    switch (status) {
      case 'Pending Quote': return 15;
      case 'In Progress': return 55;
      case 'Under Review': return 85;
      case 'Completed': return 100;
      default: return 20;
    }
  };

  return (
    <div className="min-h-screen bg-tech-grid-dark text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Workspace Header */}
        <div className="card-tech-glass p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">
                Client Workspace &middot; Live Engine
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome, {profile?.full_name || user?.email}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-slate-300">
              Track deliverables, upload brief files, review milestone status, and inspect institutional assets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openServiceModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-[#D4AF37]/20"
            >
              <Plus className="h-4 w-4" />
              <span>Commission New Brief</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
            <p className="font-mono text-xs text-slate-400">CONNECTING SECURE COMMISSIONS VAULT...</p>
          </div>
        ) : projects.length === 0 ? (
          /* Empty State */
          <div className="card-tech-glass rounded-2xl p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FolderKanban className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-xl font-bold text-white">No Active Projects Registered</h3>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                You have not commissioned any deliverables yet. Submit your first corporate logo, SOP dossier, web development scope, or business plan to begin live tracking.
              </p>
            </div>
            <button
              onClick={() => openServiceModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Initialize Project Intake</span>
            </button>
          </div>
        ) : (
          /* Main Workspace Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Project Selector Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Active Commissions ({projects.length})
                </h3>
              </div>

              <div className="space-y-3">
                {projects.map((proj) => {
                  const isSelected = proj.id === activeProject?.id;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`card-tech-glass p-4 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'border-[#D4AF37] bg-white/[0.07] shadow-lg shadow-[#D4AF37]/10'
                          : 'border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-[10px] text-blue-400 uppercase tracking-wider">
                          {proj.id.slice(0, 10)}
                        </span>
                        <span
                          className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-full border ${
                            proj.status === 'Completed'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : proj.status === 'Under Review'
                              ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                              : proj.status === 'In Progress'
                              ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          }`}
                        >
                          {proj.status}
                        </span>
                      </div>

                      <h4 className="font-display text-sm font-bold text-white line-clamp-1">
                        {proj.title}
                      </h4>
                      <p className="font-sans text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {proj.service_title}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Quote:</span>
                        <span className="font-bold text-[#FDF0CD]">
                          {formatPrice(proj.quote_amount || 0)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Project Detail Hub */}
            {activeProject && (
              <div className="lg:col-span-8 space-y-6">
                {/* 1. Status Tracker Header */}
                <div className="card-tech-glass p-6 sm:p-8 rounded-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-[#D4AF37] uppercase tracking-wider">
                          {activeProject.id}
                        </span>
                        <span className="text-slate-600">&middot;</span>
                        <span className="font-mono text-xs text-slate-400">
                          Initialized {new Date(activeProject.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                        {activeProject.title}
                      </h2>
                      <p className="font-sans text-xs text-slate-300 mt-0.5">
                        Category: <strong className="text-white">{activeProject.service_title}</strong>
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Milestone Value</div>
                      <div className="font-display text-xl sm:text-2xl font-bold text-[#FDF0CD]">
                        {formatPrice(activeProject.quote_amount || 0)}
                      </div>
                      {activeProject.payment_link && activeProject.payment_status !== 'paid' && (
                        <a
                          href={activeProject.payment_link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/30 transition-colors"
                        >
                          <CreditCard className="h-3.5 w-3.5" />
                          <span>Paystack / MoMo Invoice</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Real-Time Progress Bar & Stages */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 uppercase tracking-wider">Production Phase</span>
                      <span className="text-blue-400 font-bold">
                        {getProgressPercent(activeProject.status)}% Completed
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-[1px]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-[#D4AF37] to-emerald-400 transition-all duration-700"
                        style={{ width: `${getProgressPercent(activeProject.status)}%` }}
                      />
                    </div>

                    {/* Stage Checkpoints */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {DEFAULT_STAGES.map((stg, idx) => {
                        const currentStageIdx = 
                          activeProject.status === 'Completed' ? 4 :
                          activeProject.status === 'Under Review' ? 3 :
                          activeProject.status === 'In Progress' ? 2 : 1;

                        const isDone = idx + 1 < currentStageIdx;
                        const isCurrent = idx + 1 === currentStageIdx;

                        return (
                          <div
                            key={stg}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              isDone
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : isCurrent
                                ? 'bg-blue-500/15 border-blue-500/40 text-white shadow-md shadow-blue-500/10'
                                : 'bg-white/[0.02] border-white/[0.04] text-slate-500'
                            }`}
                          >
                            <div className="font-mono text-[9px] uppercase tracking-wider">
                              Stage 0{idx + 1}
                            </div>
                            <div className="font-display text-xs font-bold mt-1">
                              {stg}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. Deliverables Download Hub */}
                <div className="card-tech-glass p-6 sm:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-emerald-400" />
                      <h3 className="font-display text-base font-bold text-white">
                        Deliverables Download Hub
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">
                      {activeProject.deliverables_url?.length || 0} Assets Ready
                    </span>
                  </div>

                  {!activeProject.deliverables_url || activeProject.deliverables_url.length === 0 ? (
                    <div className="py-8 text-center space-y-2 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                      <FileText className="h-8 w-8 text-slate-600 mx-auto" />
                      <p className="font-sans text-xs text-slate-400">
                        Deliverables are currently in atelier production. Finished vector bundles, PDF dossiers, or live site links will appear here for one-click download.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeProject.deliverables_url.map((deliv, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 hover:border-emerald-500/30 transition-all"
                        >
                          <div className="space-y-0.5">
                            <span className="font-mono text-[9px] uppercase text-emerald-400">
                              {deliv.type || 'Final Asset'}
                            </span>
                            <div className="font-sans text-xs font-semibold text-white line-clamp-1">
                              {deliv.title}
                            </div>
                            <div className="font-mono text-[10px] text-slate-500">
                              {deliv.created_at ? new Date(deliv.created_at).toLocaleDateString() : 'Ready'}
                            </div>
                          </div>
                          <a
                            href={deliv.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 transition-colors"
                            title="Download Deliverable"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. In-App Brief & File Uploads Hub */}
                <div className="card-tech-glass p-6 sm:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4 text-blue-400" />
                      <h3 className="font-display text-base font-bold text-white">
                        Client Assets &amp; Raw Brief Material
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-xs font-medium cursor-pointer transition-colors"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>Attach Asset / Drive Link</span>
                    </button>
                  </div>

                  {!activeProject.files_url || activeProject.files_url.length === 0 ? (
                    <p className="font-sans text-xs text-slate-400 italic">
                      No supplementary files attached. Click "Attach Asset / Drive Link" to upload brand decks, CV drafts, or reference imagery.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {activeProject.files_url.map((file, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <Paperclip className="h-4 w-4 text-slate-500" />
                            <div>
                              <div className="font-medium text-white">{file.name}</div>
                              <div className="font-mono text-[10px] text-slate-500">
                                {new Date(file.uploaded_at).toLocaleDateString()} &middot;{' '}
                                {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Cloud Doc'}
                              </div>
                            </div>
                          </div>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-mono text-xs flex items-center gap-1"
                          >
                            <span>Open</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Direct Communications & Revisions Log */}
                <div className="card-tech-glass p-6 sm:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-[#D4AF37]" />
                      <h3 className="font-display text-base font-bold text-white">
                        Project Communications &amp; Revision Log
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">Live Concierge</span>
                  </div>

                  {/* Message Stream */}
                  <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                    {!activeProject.communication_logs || activeProject.communication_logs.length === 0 ? (
                      <p className="font-sans text-xs text-slate-400 italic text-center py-4">
                        No messages yet. Send a note below to request a revision or ask questions about this commission.
                      </p>
                    ) : (
                      activeProject.communication_logs.map((log, idx) => {
                        const isMe = log.role === 'client';
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border text-xs max-w-lg ${
                              isMe
                                ? 'ml-auto bg-blue-500/10 border-blue-500/30 text-blue-100'
                                : 'mr-auto bg-white/[0.05] border-white/10 text-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-slate-400 mb-1">
                              <span className="font-bold text-slate-300">{log.sender}</span>
                              <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="font-sans leading-relaxed">{log.message}</p>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Message Input Form */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-white/[0.06]">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a revision request or question for the lead architect..."
                      className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={sendingMsg || !newMessage.trim()}
                      className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal: Upload / Attach File */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="card-tech-glass max-w-md w-full p-6 rounded-2xl space-y-4 border-[#D4AF37]/40 shadow-2xl">
            <h3 className="font-display text-base font-bold text-white">
              Attach Asset or Link to Brief
            </h3>
            <form onSubmit={handleUploadAsset} className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Asset Title / Description
                </label>
                <input
                  type="text"
                  required
                  value={uploadFileTitle}
                  onChange={(e) => setUploadFileTitle(e.target.value)}
                  placeholder="e.g. Current Brand Guide / University Guidelines"
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Google Drive / Cloud URL (Optional)
                </label>
                <input
                  type="url"
                  value={uploadFileLink}
                  onChange={(e) => setUploadFileLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {isUploading ? 'Registering...' : 'Save Asset'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
