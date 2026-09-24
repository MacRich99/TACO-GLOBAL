export type PersonaType = 
  | 'entrepreneur' 
  | 'career-academic' 
  | 'talent-ambassador' 
  | 'enterprise-institutional';

export interface PersonaInfo {
  id: PersonaType;
  tabLabel: string;
  badge: string;
  title: string;
  tagline: string;
  goal: string;
  touchpoints: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryCtaPath: string;
  iconName: string;
  featuredOfferings: {
    title: string;
    priceNote: string;
    slug?: string;
    actionType: 'service' | 'modal' | 'route';
    actionTarget: string;
  }[];
}

export interface ServiceTier {
  name: string;
  price: number;
  deliveryDays: string;
  description: string;
  highlights: string[];
}

export interface ServiceSpec {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  categoryName: string;
  startingPrice: number;
  currency: string;
  turnaroundTime: string;
  badge?: string;
  targetPersona: PersonaType | string;
  headline: string;
  overview: string;
  targetAudience: string[];
  deliverables: string[];
  workflowPhases: {
    phase: string;
    duration: string;
    description: string;
  }[];
  clientInputsRequired: string[];
  tiers?: ServiceTier[];
  faqs?: { question: string; answer: string }[];
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  startingPriceNote: string;
  iconName: string;
  services: ServiceSpec[];
}

export interface PackageBundle {
  id: string;
  name: string;
  tagline: string;
  price: number;
  savingsNote: string;
  turnaroundTime: string;
  popular?: boolean;
  idealFor: string;
  targetPersona?: PersonaType;
  includedServices: string[];
  deliverables: string[];
  clientInputs: string[];
}

export interface OpportunityRole {
  id: string;
  title: string;
  category: 'ambassador' | 'partner' | 'specialist';
  compensation: string;
  commitment: string;
  location: string;
  targetPersona?: PersonaType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}

export interface PortfolioCaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  sector: string;
  metric: string;
  metricLabel: string;
  summary: string;
  targetPersona?: PersonaType;
  deliverables: string[];
  outcome: string;
}

export interface ServiceRequestPayload {
  persona: PersonaType;
  serviceId?: string;
  serviceTitle: string;
  categoryName?: string;
  clientName: string;
  email: string;
  phone: string;
  organization?: string;
  targetDeadline: string;
  projectBrief: string;
  assetsLink?: string;
  preferredContact: 'whatsapp' | 'email' | 'call';
  providedInputs: string[];
  
  // Dynamic Persona-specific fields
  businessStage?: 'idea' | 'early' | 'growth' | 'established';
  industrySector?: string;
  targetUniversityOrRole?: string;
  applicationDeadline?: string;
  applicantRoleOrTrack?: string;
  marketStudyGeography?: string;
}
