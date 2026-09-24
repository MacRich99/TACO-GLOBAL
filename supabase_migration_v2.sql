-- ============================================================================
-- TAC GLOBAL & TAC STUDIOS - Native PostgreSQL / Supabase Schema Migration v2.0
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE & RBAC
CREATE TYPE user_role AS ENUM ('client', 'admin', 'team_member', 'ambassador');

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'client' NOT NULL,
    organization TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. SERVICES & PRICING CATALOG TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    starting_price NUMERIC(10, 2) NOT NULL DEFAULT 75.00,
    currency VARCHAR(5) DEFAULT 'USD' NOT NULL,
    turnaround_time TEXT NOT NULL DEFAULT '3–5 days',
    deliverables JSONB DEFAULT '[]'::jsonb NOT NULL,
    inputs JSONB DEFAULT '[]'::jsonb NOT NULL,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. PROJECTS & COMMISSION PIPELINE TABLE
CREATE TYPE project_status AS ENUM ('Pending Quote', 'In Progress', 'Under Review', 'Completed');
CREATE TYPE payment_status_type AS ENUM ('unpaid', 'deposit_paid', 'paid');

CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    client_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    client_name TEXT,
    client_email TEXT,
    service_id TEXT REFERENCES public.services(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    status project_status DEFAULT 'Pending Quote' NOT NULL,
    quote_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    currency VARCHAR(5) DEFAULT 'USD' NOT NULL,
    payment_status payment_status_type DEFAULT 'unpaid' NOT NULL,
    payment_link TEXT,
    invoice_pdf_url TEXT,
    brief_data JSONB DEFAULT '{}'::jsonb,
    files_url JSONB DEFAULT '[]'::jsonb,
    deliverables_url JSONB DEFAULT '[]'::jsonb,
    timeline_milestones JSONB DEFAULT '[]'::jsonb,
    communication_logs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. OPPORTUNITIES & AMBASSADORS TABLE
CREATE TYPE application_status AS ENUM ('Received', 'Screened', 'Approved', 'Rejected');

CREATE TABLE IF NOT EXISTS public.applications (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    phone TEXT,
    program_type TEXT NOT NULL,
    status application_status DEFAULT 'Received' NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Users RLS
CREATE POLICY "Users can read own profile" ON public.users 
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins full access to users" ON public.users 
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

-- Services RLS
CREATE POLICY "Public read services" ON public.services 
    FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Admins can update services" ON public.services 
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

-- Projects RLS
CREATE POLICY "Clients read own projects" ON public.projects 
    FOR SELECT USING (
        auth.uid() = client_id OR 
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Clients insert projects" ON public.projects 
    FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Admins full access to projects" ON public.projects 
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

-- Applications RLS
CREATE POLICY "Anyone can submit applications" ON public.applications 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins manage applications" ON public.applications 
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );
