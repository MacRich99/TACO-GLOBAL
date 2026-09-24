export interface ProjectFile {
  name: string;
  url: string;
  size?: number;
  uploaded_at: string;
}

export interface DeliverableItem {
  title: string;
  url: string;
  type: string;
  created_at: string;
}

export interface TimelineMilestone {
  stage: string; // 'Brief Review' | 'Production' | 'Revisions' | 'Final Delivery'
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  description?: string;
}

export interface CommunicationLog {
  sender: string;
  role: 'client' | 'admin' | 'team_member';
  message: string;
  timestamp: string;
}

export interface ProjectRecord {
  id: string;
  client_id: string;
  client_name?: string;
  client_email?: string;
  service_id?: string;
  service_title: string;
  title: string;
  status: 'Pending Quote' | 'In Progress' | 'Under Review' | 'Completed';
  quote_amount: number;
  currency: string;
  payment_status?: 'unpaid' | 'deposit_paid' | 'paid';
  payment_link?: string;
  invoice_pdf_url?: string;
  assigned_to?: string;
  brief_data?: Record<string, any>;
  files_url: ProjectFile[];
  deliverables_url: DeliverableItem[];
  timeline_milestones: TimelineMilestone[];
  communication_logs?: CommunicationLog[];
  created_at: string;
  updated_at?: string;
}

export interface OpportunityApplication {
  id: string;
  user_id?: string;
  applicant_name: string;
  applicant_email: string;
  phone?: string;
  program_type: 'Campus Ambassador' | 'Referral Partner' | 'Specialist Talent Network' | 'Media Partner';
  status: 'Received' | 'Screened' | 'Approved' | 'Rejected';
  details?: Record<string, any>;
  notes?: string;
  created_at: string;
  updated_at?: string;
}
