import { 
  ServiceItem, 
  ServiceRequest, 
  PartnerApplication, 
  FinancialAnalyticsSummary, 
  UserProfile,
  ProjectStatus,
  PaymentStatus,
  ApplicationStatus
} from '@/src/types/schema';
import servicesData from '@/src/data/services.json';

const STORAGE_KEY_SERVICES = 'tac_db_services_v1';
const STORAGE_KEY_PROJECTS = 'tac_db_projects_v1';
const STORAGE_KEY_APPLICATIONS = 'tac_db_applications_v1';
const STORAGE_KEY_CURRENT_USER = 'tac_db_current_user_v1';

// Initial Seed Data for Services
const seedServices: ServiceItem[] = servicesData.categories.flatMap((cat) => 
  cat.services.map((svc) => ({
    id: svc.id,
    slug: svc.slug,
    title: svc.title,
    category: cat.name,
    categoryId: cat.id,
    description: svc.overview,
    startingPrice: svc.startingPrice,
    currency: svc.currency || 'USD',
    turnaroundTime: svc.turnaroundTime,
    deliverables: svc.deliverables,
    requiredInputs: svc.clientInputsRequired,
    targetPersona: svc.targetPersona || 'entrepreneur',
    isActive: true,
    featured: svc.badge === 'High Demand' || svc.startingPrice > 200,
    workflowPhases: svc.workflowPhases,
  }))
);

// Initial Seed Data for Client Projects (for live client portal demo)
const seedProjects: ServiceRequest[] = [
  {
    id: 'TAC-REQ-2026-081',
    clientId: 'client-usr-01',
    clientName: 'Dr. Kwame Mensah',
    clientEmail: 'kwame.mensah@apexhealth.gh',
    clientPhone: '+233 24 881 9022',
    clientOrganization: 'Apex BioDiagnostics Ltd.',
    serviceId: 'business-plan',
    serviceTitle: 'Bankable Business Plan & Financial Model',
    category: 'Business & Strategy',
    targetPersona: 'entrepreneur',
    status: 'In Progress',
    paymentStatus: 'Milestone Escrowed',
    customQuoteAmount: 280,
    depositAmount: 140,
    paystackReference: 'pstk_live_891048201',
    briefDetails: {
      objectives: 'Comprehensive expansion plan for commercial diagnostic laboratories in Accra and Kumasi seeking $1.2M debt/equity financing.',
      targetAudience: 'Development Finance Institutions (DFIs) and commercial venture lenders.',
      specificInputs: {
        '5-Year Capital Expenditure Schedule': 'Attached in uploaded financial files',
        'Historical Clinical Volume': 'Provided in CSV',
      },
      targetDeadline: '10 Business Days',
      preferredContactMethod: 'whatsapp',
    },
    uploadedFiles: [
      {
        id: 'f-1',
        name: 'Apex_Historical_Revenue_2024_2025.xlsx',
        size: 1420000,
        url: '#',
        uploadedAt: '2026-09-18T10:14:00Z',
        fileType: 'application/vnd.ms-excel',
      },
      {
        id: 'f-2',
        name: 'Lab_Equipment_Vendor_Quotes.pdf',
        size: 2840000,
        url: '#',
        uploadedAt: '2026-09-18T10:16:00Z',
        fileType: 'application/pdf',
      },
    ],
    assignedTeamMemberId: 'team-02',
    assignedTeamMemberName: 'Abena Osei (Lead Strategy Partner)',
    milestones: [
      {
        id: 'm-1',
        title: 'Industry & Competitor Research Matrix',
        description: 'West Africa diagnostic landscape benchmarking and pricing comparative analysis.',
        dueDate: 'Day 3',
        completed: true,
        completedAt: '2026-09-20T16:00:00Z',
      },
      {
        id: 'm-2',
        title: 'Financial Projections & Pro-Forma Modeling',
        description: 'Detailed revenue build, staffing model, and DCF valuation schedules.',
        dueDate: 'Day 6',
        completed: true,
        completedAt: '2026-09-23T11:30:00Z',
      },
      {
        id: 'm-3',
        title: 'Draft Strategic Dossier Review',
        description: 'Client review session and structural feedback iteration.',
        dueDate: 'Day 8',
        completed: false,
      },
      {
        id: 'm-4',
        title: 'Final Institutional Grade Dossier Delivery',
        description: 'Full investor-ready PDF, editable DOCX, and live Excel dynamic model.',
        dueDate: 'Day 10',
        completed: false,
      },
    ],
    revisions: [
      {
        id: 'r-1',
        author: 'Abena Osei',
        role: 'team',
        message: 'Initial financial model draft completed. We applied conservative 18% gross margins for specialized pathology tests. Please review Sheet 3 in the client portal.',
        timestamp: '2026-09-22T14:20:00Z',
      },
      {
        id: 'r-2',
        author: 'Dr. Kwame Mensah',
        role: 'client',
        message: 'Reviewed Sheet 3. Equipment depreciation schedule looks aligned with our GE Healthcare warranty. Ready for the narrative draft.',
        timestamp: '2026-09-23T08:45:00Z',
      },
    ],
    deliverableDownloads: [
      {
        id: 'd-1',
        fileName: 'Apex_Financial_ProForma_V1.2_Confidential.xlsx',
        fileUrl: '#',
        version: 'v1.2 Draft',
        uploadedAt: '2026-09-23T12:00:00Z',
        fileSizeMb: 4.8,
      },
    ],
    createdAt: '2026-09-18T09:30:00Z',
    updatedAt: '2026-09-23T12:00:00Z',
  },
  {
    id: 'TAC-REQ-2026-094',
    clientId: 'client-usr-02',
    clientName: 'Sarah Jenkins',
    clientEmail: 's.jenkins@oxon.ac.uk',
    clientPhone: '+44 7700 900142',
    clientOrganization: 'University of Oxford (Candidate)',
    serviceId: 'academic-sop',
    serviceTitle: 'Academic Statement of Purpose & Admissions Essay',
    category: 'Writing & Technical',
    targetPersona: 'career-academic',
    status: 'Delivered',
    paymentStatus: 'Fully Paid',
    customQuoteAmount: 110,
    depositAmount: 110,
    paystackReference: 'pstk_live_994101823',
    briefDetails: {
      objectives: 'DPhil in International Development statement of purpose emphasizing empirical fieldwork in Sub-Saharan microfinance.',
      targetAudience: 'Departmental Admissions Committee and Rhodes Trust reviewers.',
      specificInputs: {
        'Undergraduate Transcript GPA': '3.92 / 4.0 First Class Honours',
        'Target Supervisors': 'Prof. D. Robinson & Dr. E. Boateng',
      },
      targetDeadline: '4 Business Days',
      preferredContactMethod: 'email',
    },
    uploadedFiles: [
      {
        id: 'f-3',
        name: 'Sarah_CV_Academic_2026.pdf',
        size: 890000,
        url: '#',
        uploadedAt: '2026-09-19T14:10:00Z',
        fileType: 'application/pdf',
      },
    ],
    assignedTeamMemberId: 'team-01',
    assignedTeamMemberName: 'Marcus Sterling (Senior Academic Fellow)',
    milestones: [
      {
        id: 'm-10',
        title: 'Narrative Framing & Arc Structuring',
        description: 'Connecting academic lineage, gap analysis, and future policy contribution.',
        dueDate: 'Day 2',
        completed: true,
        completedAt: '2026-09-20T17:00:00Z',
      },
      {
        id: 'm-11',
        title: 'Polished Delivery & Academic Formatting',
        description: 'Final 1,200-word academic dossier aligned with Oxford DPhil requirements.',
        dueDate: 'Day 4',
        completed: true,
        completedAt: '2026-09-22T16:30:00Z',
      },
    ],
    revisions: [
      {
        id: 'r-10',
        author: 'Marcus Sterling',
        role: 'team',
        message: 'Final draft uploaded. We amplified your research methodology section to highlight mixed-methods rigor. Ready for submission.',
        timestamp: '2026-09-22T16:32:00Z',
      },
    ],
    deliverableDownloads: [
      {
        id: 'd-10',
        fileName: 'Sarah_Jenkins_Oxford_DPhil_Statement_FINAL_Approved.pdf',
        fileUrl: '#',
        version: 'Final V2.0',
        uploadedAt: '2026-09-22T16:35:00Z',
        fileSizeMb: 1.2,
      },
    ],
    createdAt: '2026-09-19T14:00:00Z',
    updatedAt: '2026-09-22T16:35:00Z',
  },
  {
    id: 'TAC-REQ-2026-102',
    clientId: 'client-usr-03',
    clientName: 'Nii Tackie',
    clientEmail: 'info@kustomcouture.com',
    clientPhone: '+233 20 445 1199',
    clientOrganization: 'Kustom Couture Atelier',
    serviceId: 'logo-design',
    serviceTitle: 'Corporate Logo & Visual Mark',
    category: 'Creative & Digital',
    targetPersona: 'entrepreneur',
    status: 'Pending',
    paymentStatus: 'Unpaid',
    customQuoteAmount: 75,
    briefDetails: {
      objectives: 'Minimalist, luxury monogram and architectural serif wordmark for high-fashion runway line.',
      targetAudience: 'High net worth diaspora luxury clientele.',
      specificInputs: {
        'Preferred Palette': 'Obsidian black, matte gold foil, alabaster white',
      },
      targetDeadline: '3 Business Days',
      preferredContactMethod: 'whatsapp',
    },
    uploadedFiles: [],
    milestones: [
      {
        id: 'm-20',
        title: 'Concept Ideation & Creative Direction',
        description: '3 bespoke directions presented in high-fidelity mockups.',
        dueDate: 'Day 2',
        completed: false,
      },
      {
        id: 'm-21',
        title: 'Master Vector Export Suite',
        description: 'Full SVG, EPS, AI, PNG, and PDF asset kit.',
        dueDate: 'Day 3',
        completed: false,
      },
    ],
    revisions: [],
    deliverableDownloads: [],
    createdAt: '2026-09-23T19:20:00Z',
    updatedAt: '2026-09-23T19:20:00Z',
  }
];

// Initial Seed Data for Applications
const seedApplications: PartnerApplication[] = [
  {
    id: 'APP-2026-041',
    fullName: 'David Boateng',
    email: 'd.boateng@st.ug.edu.gh',
    phone: '+233 55 901 2345',
    institutionOrCompany: 'University of Ghana, Legon',
    role: 'Campus Ambassador',
    status: 'Accepted',
    portfolioOrLinkedIn: 'linkedin.com/in/davidboateng-ug',
    statementOfIntent: 'Passionate about connecting undergraduate founders and master thesis researchers with TAC STUDIOS specialized deliverables.',
    referralCodeProposed: 'LEGON-TAC-01',
    trackingNotes: ['Onboarding pack dispatched', 'Assigned to Legon Business School cluster'],
    reviewedBy: 'Kofi Larbi (Head of Growth)',
    createdAt: '2026-09-15T11:00:00Z',
    updatedAt: '2026-09-17T09:30:00Z',
  },
  {
    id: 'APP-2026-048',
    fullName: 'Elena Rostova',
    email: 'elena@novacapitaladvisors.de',
    phone: '+49 171 8920199',
    institutionOrCompany: 'Nova Capital Advisors Berlin',
    role: 'Referral Partner',
    status: 'Under Review',
    portfolioOrLinkedIn: 'novacapitaladvisors.de/partners',
    statementOfIntent: 'We advise DACH seed stage technology startups expanding into emerging markets. Seeking institutional outsourcing for technical SOPs and market validation decks.',
    referralCodeProposed: 'BERLIN-NOVA',
    trackingNotes: ['Initial discovery call scheduled with European Desk'],
    reviewedBy: 'Abena Osei',
    createdAt: '2026-09-21T14:15:00Z',
    updatedAt: '2026-09-22T10:00:00Z',
  },
];

// Current active demo profile (default as Admin/Owner for administrative testing, switchable to Client)
export const DEFAULT_CURRENT_USER: UserProfile = {
  id: 'usr-admin-01',
  uid: 'admin_master_tac',
  email: 'director@tacglobal.org',
  displayName: 'Lead Director',
  role: 'Admin/Owner',
  organization: 'TAC GLOBAL Executive Council',
  country: 'Ghana / UK',
  createdAt: '2026-01-01T00:00:00Z',
  lastLoginAt: '2026-09-24T04:00:00Z',
};

// Internal storage getters & setters with browser fallback
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed saving to storage for key ${key}:`, err);
  }
}

// In-memory singletons
let cachedServices: ServiceItem[] | null = null;
let cachedProjects: ServiceRequest[] | null = null;
let cachedApplications: PartnerApplication[] | null = null;
let cachedCurrentUser: UserProfile | null = null;

export const db = {
  // Services operations
  getServices(): ServiceItem[] {
    if (!cachedServices) {
      cachedServices = loadFromStorage(STORAGE_KEY_SERVICES, seedServices);
    }
    return cachedServices;
  },

  updateService(id: string, updates: Partial<ServiceItem>): ServiceItem | null {
    const services = this.getServices();
    const index = services.findIndex((s) => s.id === id);
    if (index === -1) return null;

    services[index] = { ...services[index], ...updates };
    cachedServices = [...services];
    saveToStorage(STORAGE_KEY_SERVICES, cachedServices);
    return services[index];
  },

  // Projects operations
  getProjects(): ServiceRequest[] {
    if (!cachedProjects) {
      cachedProjects = loadFromStorage(STORAGE_KEY_PROJECTS, seedProjects);
    }
    return cachedProjects;
  },

  getProjectById(id: string): ServiceRequest | undefined {
    return this.getProjects().find((p) => p.id === id);
  },

  createProject(newProjectData: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt' | 'milestones' | 'revisions' | 'deliverableDownloads'>): ServiceRequest {
    const projects = this.getProjects();
    const projectNum = 100 + projects.length + 1;
    const newId = `TAC-REQ-2026-${projectNum}`;
    
    const now = new Date().toISOString();
    const newProject: ServiceRequest = {
      ...newProjectData,
      id: newId,
      status: newProjectData.status || 'Pending',
      paymentStatus: newProjectData.paymentStatus || 'Unpaid',
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: 'Intake Dossier Verification & Scoping',
          description: 'Client inputs reviewed by practice lead and verified for technical production.',
          dueDate: 'Day 1',
          completed: true,
          completedAt: now,
        },
        {
          id: `m-${Date.now()}-2`,
          title: 'Primary Blueprint & Execution Sprint',
          description: 'Standardized deliverable production under 50% milestone escrow guarantee.',
          dueDate: 'Day 3',
          completed: false,
        },
        {
          id: `m-${Date.now()}-3`,
          title: 'Quality Assurance & Delivery Handoff',
          description: 'Final institutional audit, vector/PDF export, and client revision window.',
          dueDate: 'Day 5',
          completed: false,
        }
      ],
      revisions: [
        {
          id: `rev-${Date.now()}`,
          author: 'TAC System',
          role: 'team',
          message: `Request received successfully under starting scope of $${newProjectData.customQuoteAmount}. Our practice lead is reviewing your brief.`,
          timestamp: now,
        }
      ],
      deliverableDownloads: [],
      createdAt: now,
      updatedAt: now,
    };

    const updatedList = [newProject, ...projects];
    cachedProjects = updatedList;
    saveToStorage(STORAGE_KEY_PROJECTS, updatedList);
    return newProject;
  },

  updateProjectStatus(
    id: string, 
    status: ProjectStatus, 
    paymentStatus?: PaymentStatus, 
    customQuoteAmount?: number,
    assignedTeamMemberName?: string
  ): ServiceRequest | null {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    projects[index] = {
      ...projects[index],
      status,
      paymentStatus: paymentStatus || projects[index].paymentStatus,
      customQuoteAmount: customQuoteAmount !== undefined ? customQuoteAmount : projects[index].customQuoteAmount,
      assignedTeamMemberName: assignedTeamMemberName || projects[index].assignedTeamMemberName,
      updatedAt: new Date().toISOString(),
    };

    cachedProjects = [...projects];
    saveToStorage(STORAGE_KEY_PROJECTS, cachedProjects);
    return projects[index];
  },

  addProjectRevision(id: string, message: string, author: string, role: 'client' | 'team'): ServiceRequest | null {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const newRev = {
      id: `rev-${Date.now()}`,
      author,
      role,
      message,
      timestamp: new Date().toISOString(),
    };

    projects[index] = {
      ...projects[index],
      revisions: [...projects[index].revisions, newRev],
      updatedAt: new Date().toISOString(),
    };

    cachedProjects = [...projects];
    saveToStorage(STORAGE_KEY_PROJECTS, cachedProjects);
    return projects[index];
  },

  toggleMilestone(projectId: string, milestoneId: string): ServiceRequest | null {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === projectId);
    if (index === -1) return null;

    const updatedMilestones = projects[index].milestones.map((m) => {
      if (m.id === milestoneId) {
        return {
          ...m,
          completed: !m.completed,
          completedAt: !m.completed ? new Date().toISOString() : undefined,
        };
      }
      return m;
    });

    projects[index] = {
      ...projects[index],
      milestones: updatedMilestones,
      updatedAt: new Date().toISOString(),
    };

    cachedProjects = [...projects];
    saveToStorage(STORAGE_KEY_PROJECTS, cachedProjects);
    return projects[index];
  },

  // Applications operations
  getApplications(): PartnerApplication[] {
    if (!cachedApplications) {
      cachedApplications = loadFromStorage(STORAGE_KEY_APPLICATIONS, seedApplications);
    }
    return cachedApplications;
  },

  createApplication(appData: Omit<PartnerApplication, 'id' | 'createdAt' | 'updatedAt' | 'trackingNotes'>): PartnerApplication {
    const apps = this.getApplications();
    const newApp: PartnerApplication = {
      ...appData,
      id: `APP-2026-${String(apps.length + 50).padStart(3, '0')}`,
      trackingNotes: ['Application submitted via TAC Ecosystem portal'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newApp, ...apps];
    cachedApplications = updated;
    saveToStorage(STORAGE_KEY_APPLICATIONS, updated);
    return newApp;
  },

  updateApplicationStatus(id: string, status: ApplicationStatus, newNote?: string): PartnerApplication | null {
    const apps = this.getApplications();
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const currentNotes = apps[index].trackingNotes || [];
    const updatedNotes = newNote ? [newNote, ...currentNotes] : currentNotes;

    apps[index] = {
      ...apps[index],
      status,
      trackingNotes: updatedNotes,
      updatedAt: new Date().toISOString(),
    };

    cachedApplications = [...apps];
    saveToStorage(STORAGE_KEY_APPLICATIONS, cachedApplications);
    return apps[index];
  },

  // User Profile and Role Switcher
  getCurrentUser(): UserProfile {
    if (!cachedCurrentUser) {
      cachedCurrentUser = loadFromStorage(STORAGE_KEY_CURRENT_USER, DEFAULT_CURRENT_USER);
    }
    return cachedCurrentUser;
  },

  setCurrentUserRole(role: UserProfile['role']): UserProfile {
    const user = this.getCurrentUser();
    const updated: UserProfile = { ...user, role };
    cachedCurrentUser = updated;
    saveToStorage(STORAGE_KEY_CURRENT_USER, updated);
    return updated;
  },

  // Financial Analytics
  getFinancialAnalytics(): FinancialAnalyticsSummary {
    const projects = this.getProjects();
    const grossVolumeUSD = projects.reduce((sum, p) => sum + (p.customQuoteAmount || 0), 0);
    const pendingQuotesUSD = projects
      .filter((p) => p.status === 'Pending' || p.status === 'Quoted')
      .reduce((sum, p) => sum + (p.customQuoteAmount || 0), 0);
    const inEscrowUSD = projects
      .filter((p) => p.paymentStatus === 'Milestone Escrowed')
      .reduce((sum, p) => sum + (p.depositAmount || p.customQuoteAmount * 0.5), 0);
    const completedPayoutsUSD = projects
      .filter((p) => p.status === 'Completed' || p.status === 'Delivered')
      .reduce((sum, p) => sum + (p.customQuoteAmount || 0), 0);

    // Calculate dynamic metrics from actual project records
    const clientEmails = projects.map((p) => p.clientEmail).filter(Boolean);
    const uniqueClientsCount = new Set(clientEmails).size;
    
    // Calculate repeat clients percentage dynamically
    let repeatRate = 0;
    if (uniqueClientsCount > 0) {
      const emailCounts: Record<string, number> = {};
      clientEmails.forEach((email) => {
        emailCounts[email] = (emailCounts[email] || 0) + 1;
      });
      const repeatClientsCount = Object.values(emailCounts).filter((c) => c > 1).length;
      repeatRate = Math.round((repeatClientsCount / uniqueClientsCount) * 100);
    }

    return {
      grossVolumeUSD,
      pendingQuotesUSD,
      inEscrowUSD,
      completedPayoutsUSD,
      activeProjectsCount: projects.filter((p) => p.status === 'In Progress' || p.status === 'Pending').length,
      totalClientsCount: uniqueClientsCount,
      conversionRatePercent: repeatRate,
    };
  },

  getTeamMembers() {
    return [
      { id: 'team-01', name: 'Marcus Sterling', role: 'Lead Academic & Technical Fellow' },
      { id: 'team-02', name: 'Abena Osei', role: 'Principal Strategy & M&A Partner' },
      { id: 'team-03', name: 'Kwesi Asante', role: 'Design Systems Architect' },
      { id: 'team-04', name: 'Nadia El-Mansoor', role: 'MENA Enterprise Liaison' },
    ];
  }
};
