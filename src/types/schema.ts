/**
 * TAC GLOBAL & TAC STUDIOS - Production Database Schema & Type Definitions
 * Compatible with Next.js, React, Firebase Firestore, Supabase PostgreSQL, and Local Cache engines.
 */

export type UserRole = 'Client' | 'Admin/Owner' | 'Team Member' | 'Ambassador/Partner';

export type ProjectStatus = 'Pending' | 'Quoted' | 'In Progress' | 'Delivered' | 'Completed';

export type PaymentStatus = 'Unpaid' | 'Deposit Paid' | 'Milestone Escrowed' | 'Fully Paid';

export type ApplicationRole = 'Campus Ambassador' | 'Referral Partner' | 'Career';

export type ApplicationStatus = 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Accepted' | 'Waitlisted' | 'Archived';

export type TargetPersona = 
  | 'entrepreneur' 
  | 'career-academic' 
  | 'talent-ambassador' 
  | 'enterprise-institutional';

/**
 * 1. User & Authentication Profile Schema
 */
export interface UserProfile {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  role: UserRole;
  avatarUrl?: string;
  organization?: string;
  country?: string;
  createdAt: string; // ISO 8601
  lastLoginAt: string;
  metadata?: {
    ambassadorCode?: string;
    totalCommissionsPaid?: number;
    assignedProjectsCount?: number;
  };
}

/**
 * 2. Service Specification Schema
 */
export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  categoryId?: string;
  description: string;
  startingPrice: number; // in USD
  currency: string;
  turnaroundTime: string;
  deliverables: string[];
  requiredInputs: string[];
  targetPersona: TargetPersona | string;
  isActive: boolean;
  featured?: boolean;
  slug: string;
  workflowPhases?: {
    phase: string;
    duration: string;
    description: string;
  }[];
}

/**
 * 3. Service Request / Client Project Schema
 */
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  url: string;
  uploadedAt: string;
  fileType: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

export interface ProjectRevisionLog {
  id: string;
  author: string;
  role: 'client' | 'team';
  message: string;
  timestamp: string;
  attachments?: UploadedFile[];
}

export interface ServiceRequest {
  id: string; // Request ID e.g. "TAC-REQ-2026-001"
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientOrganization?: string;
  serviceId: string;
  serviceTitle: string;
  category: string;
  targetPersona: TargetPersona | string;
  status: ProjectStatus;
  paymentStatus: PaymentStatus;
  customQuoteAmount: number; // USD
  depositAmount?: number;
  paystackReference?: string;
  briefDetails: {
    objectives: string;
    targetAudience?: string;
    brandGuidelines?: string;
    specificInputs: Record<string, string | boolean>;
    notes?: string;
    targetDeadline?: string;
    preferredContactMethod?: 'whatsapp' | 'email' | 'call';
  };
  uploadedFiles: UploadedFile[];
  assignedTeamMemberId?: string;
  assignedTeamMemberName?: string;
  milestones: ProjectMilestone[];
  revisions: ProjectRevisionLog[];
  deliverableDownloads: {
    id: string;
    fileName: string;
    fileUrl: string;
    version: string;
    uploadedAt: string;
    fileSizeMb: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

/**
 * 4. Ambassador & Partner Applications Schema
 */
export interface PartnerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  institutionOrCompany: string;
  role: ApplicationRole;
  status: ApplicationStatus;
  portfolioOrLinkedIn?: string;
  statementOfIntent: string;
  referralCodeProposed?: string;
  trackingNotes: string[];
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 5. Financial & Revenue Analytics Summary Schema
 */
export interface FinancialAnalyticsSummary {
  grossVolumeUSD: number;
  pendingQuotesUSD: number;
  inEscrowUSD: number;
  completedPayoutsUSD: number;
  activeProjectsCount: number;
  totalClientsCount: number;
  conversionRatePercent: number;
}
