import React, { useState } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import servicesData from '@/src/data/services.json';
import { TacLogo } from '@/src/components/brand/TacLogo';
import { InvestorDataRoom } from '@/src/components/investor/InvestorDataRoom';
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  FileText,
  TrendingUp,
  Share2,
  Search,
  Users,
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  Award,
  ChevronRight,
  Layers,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Cpu,
  Target,
  HeartHandshake
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate, openServiceModal } = useAppNavigation();
  const { formatPrice, currency } = useCurrency();

  // Selected discipline for quick modal/preview
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);

  // Selected persona / audience segment
  const [selectedAudience, setSelectedAudience] = useState<string>('Entrepreneurs');

  const audienceProfiles: Record<string, { tag: string; description: string; services: string[]; quote: string }> = {
    'Entrepreneurs': {
      tag: 'Ideation to Incorporation',
      description: 'Visionary builders structuring their first commercial venture with high-conviction identity and bankable business plans.',
      services: ['Corporate Logo & Brand Identity', 'Bankable Business Plan', 'Full-Stack Web MVP'],
      quote: 'From napkin sketch to an executive brand that commands respect on day one.'
    },
    'Startups': {
      tag: 'Seed to Scale',
      description: 'High-growth teams requiring investor pitch decks, rapid digital prototypes, and market validation research.',
      services: ['Investor Pitch Deck & Financial Model', 'Brand Identity Systems', 'Marketing Strategy & Social Launch'],
      quote: 'Speed of execution paired with institutional rigor for fundraising.'
    },
    'Small and growing businesses': {
      tag: 'Operational Modernisation',
      description: 'Established firms revamping their digital presence, formalizing brand guidelines, and deploying automated customer intake.',
      services: ['Brand Revamp & Vector Guidelines', 'High-Converting Web Platform', 'Monthly Social Media Retainer'],
      quote: 'Upgrading your commercial front-end to attract premium contract opportunities.'
    },
    'Organisations': {
      tag: 'Enterprise & Institutional',
      description: 'Corporate institutions requiring comprehensive annual reports, strategic communications, and executive slide decks.',
      services: ['Institutional Reporting & Whitepapers', 'Corporate Communications', 'Market Intelligence & Feasibility Studies'],
      quote: 'Reliable, boardroom-ready documentation delivered within stringent SLAs.'
    },
    'NGOs': {
      tag: 'Impact & Grant Compliance',
      description: 'Non-profit and philanthropic missions seeking donor grant proposals, impact evaluation reports, and community outreach campaigns.',
      services: ['Grant Proposals & Concept Notes', 'Impact Reports', 'Digital Storytelling Campaigns'],
      quote: 'Translating human impact into clear, compelling evidence for global donors.'
    },
    'Schools': {
      tag: 'Academic & Institutional',
      description: 'Educational bodies seeking modern student prospectuses, digital portals, and research publication support.',
      services: ['Academic Prospectus Design', 'Institutional Web Portals', 'Student Communications'],
      quote: 'Elevating educational prestige with contemporary international design.'
    },
    'Churches and ministries': {
      tag: 'Faith & Kingdom Excellence',
      description: 'Ministries and Christian bodies seeking excellence with divinity in visual broadcast media, conference branding, and community platforms.',
      services: ['Conference Identity & Broadcast Graphics', 'Ministry Media Systems', 'Leadership Publications'],
      quote: 'Excellence with divinity: presenting eternal truth with supreme aesthetic reverence.'
    },
    'Event organisers': {
      tag: 'Live & Virtual Production',
      description: 'Conferences, summits, and festival coordinators needing holistic visual stage identities, ticketing portals, and promotional collateral.',
      services: ['Summit Keynote Branding', 'Sponsor Pitch Packets', 'Event Websites & Program Guides'],
      quote: 'High-impact stage assets and sponsor decks that sell out arenas.'
    },
    'Creators': {
      tag: 'Personal Monopolies',
      description: 'Content creators, authors, and thought leaders packaging their knowledge into digital products, bespoke portfolios, and newsletters.',
      services: ['Personal Brand Marks', 'Book Layout & E-Commerce Landing Pages', 'Content Engine Strategy'],
      quote: 'Transforming audience attention into monetized, proprietary enterprise IP.'
    },
    'Professionals': {
      tag: 'Executive Career Elevation',
      description: 'Senior executives, consultants, and public sector leaders seeking world-class CVs, LinkedIn profiles, and personal branding.',
      services: ['Executive CV & Bio Revamp', 'LinkedIn Positioning Strategy', 'Thought Leadership Ghostwriting'],
      quote: 'Positioning high-achieving professionals for global board and C-suite appointments.'
    },
    'Students': {
      tag: 'Scholars & Global Admissions',
      description: 'Graduating students and scholars aiming for top-tier master’s, PhD, and scholarship admissions in the UK, US, Canada, and Europe.',
      services: ['Ivy League & Russell Group SOP', 'Academic CV & Portfolio', 'Scholarship Essays (99.4% Success Rate)'],
      quote: 'Transforming academic journeys into winning personal statements.'
    },
    'Community initiatives': {
      tag: 'Grassroots Activation',
      description: 'Local and regional youth development, environmental, and civic projects requiring clear advocacy collateral.',
      services: ['Campaign Identity', 'Grassroots Social Mobilisation', 'Community Research Surveys'],
      quote: 'Giving local changemakers the institutional voice needed to mobilize support.'
    },
    'International clients': {
      tag: 'Cross-Border Execution',
      description: 'Diaspora founders, multinational partners, and overseas firms wanting reliable African operations with multi-currency clearing.',
      services: ['Cross-Border Market Intelligence', 'Pan-African Digital Engineering', 'Executive Field Advisory'],
      quote: 'Seamless delivery across GMT, BST, and EST with Paystack and SWIFT clearing.'
    }
  };

  const disciplines = [
    {
      id: 'creative-digital',
      number: '01',
      title: 'Creative & Digital',
      icon: Palette,
      description: 'Brand identities, visual design and digital experiences that make ideas look as serious as they are.',
      tags: ['Brand identity', 'Design', 'Web & digital', 'Visual content'],
      categorySlug: 'creative-digital',
    },
    {
      id: 'writing-communication',
      number: '02',
      title: 'Writing & Communication',
      icon: FileText,
      description: 'Clear, persuasive writing and communication that helps people, organisations and businesses be understood.',
      tags: ['Professional writing', 'Editing', 'Communication', 'Documents'],
      categorySlug: 'writing-communication',
    },
    {
      id: 'business-strategy',
      number: '03',
      title: 'Business & Strategy',
      icon: TrendingUp,
      description: 'Strategy, structure and business support for founders and organisations moving from idea to execution.',
      tags: ['Business planning', 'Strategy', 'Structure', 'Advisory'],
      categorySlug: 'business-strategy',
    },
    {
      id: 'social-marketing',
      number: '04',
      title: 'Social & Marketing',
      icon: Share2,
      description: 'Marketing and social presence built on strategy, not noise, so the right people find and trust you.',
      tags: ['Marketing strategy', 'Social media', 'Campaigns', 'Content'],
      categorySlug: 'social-marketing',
    },
    {
      id: 'research-intel',
      number: '05',
      title: 'Research & Intelligence',
      icon: Search,
      description: 'Research, analysis and insight that turn assumptions into informed decisions.',
      tags: ['Research', 'Analysis', 'Insight', 'Reporting'],
      categorySlug: 'research-intel',
    },
    {
      id: 'people-opportunities',
      number: '06',
      title: 'People & Opportunities',
      icon: Users,
      description: 'Training, development and opportunities for students, creatives, professionals and emerging leaders.',
      tags: ['Training', 'Workshops', 'Leadership', 'Opportunities'],
      categorySlug: 'opportunities',
    },
  ];

  const commitments = [
    {
      title: 'Strategy',
      icon: Compass,
      description: 'Every engagement starts with the problem, not the deliverable.',
    },
    {
      title: 'Creativity',
      icon: Sparkles,
      description: 'Ideas expressed with craft, taste and intent.',
    },
    {
      title: 'Technology',
      icon: Cpu,
      description: 'Modern tools used with judgement, never for their own sake.',
    },
    {
      title: 'Research',
      icon: Search,
      description: 'Decisions informed by evidence rather than assumption.',
    },
    {
      title: 'People',
      icon: Users,
      description: 'Work that develops the people behind it as much as the output.',
    },
    {
      title: 'Purpose',
      icon: Award,
      description: 'Excellence held to a higher standard than the brief.',
    },
  ];

  const approachStages = [
    {
      number: '01',
      title: 'DISCOVER',
      description: 'Understand the context, the people and the real need.',
    },
    {
      number: '02',
      title: 'DEFINE',
      description: 'Frame the problem clearly and agree what success looks like.',
    },
    {
      number: '03',
      title: 'STRATEGISE',
      description: 'Decide the direction before committing resources.',
    },
    {
      number: '04',
      title: 'CREATE',
      description: 'Produce the work with craft, care and precision.',
    },
    {
      number: '05',
      title: 'REVIEW',
      description: 'Test the work against the brief and refine it together.',
    },
    {
      number: '06',
      title: 'DELIVER',
      description: 'Hand over something complete, usable and ready for market.',
    },
    {
      number: '07',
      title: 'GROW',
      description: 'Stay engaged as the idea becomes something bigger.',
    },
  ];

  const audienceList = Object.keys(audienceProfiles);

  return (
    <div className="space-y-28 md:space-y-36 pb-28 selection:bg-[#D4AF37] selection:text-slate-950">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Exact design and texts from images 13, 14, 15) */}
      {/* ============================================================ */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden text-center">
        {/* Subtle Luxury Gradient Background Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#D4AF37]/10 via-[#070D1D]/30 to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Centered Official 3D Gold Logo */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative p-1 rounded-full bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/20 to-transparent shadow-[0_0_40px_rgba(212,175,55,0.25)]">
              <TacLogo variant="mark" size="xl" />
            </div>
            <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]/80">
              {servicesData.company.motto}
            </div>
          </div>

          {/* Overline Tag */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full border border-[#D4AF37]/35 bg-[#060B18]/80 text-[#D4AF37] text-[11px] font-medium tracking-[0.25em] uppercase shadow-sm">
              GHANA-ROOTED. GLOBALLY MINDED.
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-brand text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Ideas. People. Businesses. Impact.
          </h1>

          {/* Subtext */}
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed">
            TACO GLOBAL is a purpose-driven creative, business and development company helping individuals, organisations and businesses transform ideas into professional brands, digital experiences, strategies and opportunities.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('what-we-do');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/studios');
              }}
              className="px-8 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#D4AF37]/25 cursor-pointer border border-[#FFF0B3]/40"
            >
              Explore Services
            </button>

            <button
              onClick={() => openServiceModal()}
              className="px-8 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-[0.16em] text-white bg-[#060A16] hover:bg-[#0B1224] border border-[#D4AF37]/45 hover:border-[#D4AF37] active:scale-[0.98] transition-all cursor-pointer shadow-md"
            >
              Work with TACO GLOBAL
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('investor-room');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/investors');
              }}
              className="px-6 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider text-[#FDF0CD] bg-[#070D1F] hover:bg-[#0E1838] border border-[#D4AF37]/35 transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Investor Memorandum</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-bold">READY</span>
            </button>
          </div>

          {/* Live Rates & Hotline Trust Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
              <a href="tel:+2332055517659" className="hover:text-white transition-colors">
                Desk: +233 20 5551 7659
              </a>
            </div>
            <span className="text-slate-700 hidden sm:inline">&middot;</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Milestone Escrow Clearing</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">&middot;</span>
            <div className="text-[#FDF0CD]">
              <span>Rates ({currency}): </span>
              <span className="font-semibold text-[#D4AF37]">Logo {formatPrice(75)}</span> &middot;{' '}
              <span className="font-semibold text-[#D4AF37]">SOP {formatPrice(100)}</span> &middot;{' '}
              <span className="font-semibold text-[#D4AF37]">Plan {formatPrice(250)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. WHO WE ARE (Exact design and texts from images 13, 14)      */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              WHO WE ARE
            </span>
            <h2 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
              More than a service provider. A growing ecosystem.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              TACO GLOBAL brings creativity, strategy, technology, communication, research and people development together under one standard of excellence, so that ideas, people and businesses grow at the same time.
            </p>
            <div>
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37] hover:text-[#FFF] transition-colors group cursor-pointer"
              >
                <span>Read about TACO GLOBAL</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* 3 Pillars: 1, 2, 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl border border-[#D4AF37]/25 bg-[#050915] hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group space-y-6">
              <div className="space-y-4">
                <span className="font-serif-brand text-5xl font-light text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors">
                  1
                </span>
                <h3 className="font-serif-brand text-2xl text-white font-semibold">
                  Services
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Professional creative, digital, writing, communication, business, strategy, marketing and research services.
                </p>
              </div>
              <button
                onClick={() => navigate('/studios')}
                className="text-left text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1.5 pt-2"
              >
                <span>Explore service catalog</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl border border-[#D4AF37]/25 bg-[#050915] hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group space-y-6">
              <div className="space-y-4">
                <span className="font-serif-brand text-5xl font-light text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors">
                  2
                </span>
                <h3 className="font-serif-brand text-2xl text-white font-semibold">
                  People &amp; Opportunities
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Opportunities for students, creatives, professionals, ambassadors, marketers, researchers, creators and emerging leaders.
                </p>
              </div>
              <button
                onClick={() => navigate('/opportunities')}
                className="text-left text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1.5 pt-2"
              >
                <span>View opportunities &amp; apply</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl border border-[#D4AF37]/25 bg-[#050915] hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group space-y-6">
              <div className="space-y-4">
                <span className="font-serif-brand text-5xl font-light text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors">
                  3
                </span>
                <h3 className="font-serif-brand text-2xl text-white font-semibold">
                  Development
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Training, workshops, leadership development, professional development, practical experience and community development.
                </p>
              </div>
              <button
                onClick={() => openServiceModal(undefined, 'career-academic')}
                className="text-left text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1.5 pt-2"
              >
                <span>Inquire about workshops</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHAT WE DO (Exact design and texts from images 16-20)       */}
      {/* ============================================================ */}
      <section id="what-we-do" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              WHAT WE DO
            </span>
            <h2 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
              Six disciplines. One standard.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Every TACO service sits within one of six areas. Together they cover the full journey from idea to brand, from strategy to market, from individual to leader.
            </p>
          </div>

          {/* 6 Disciplines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.id}
                  className="p-7 rounded-2xl border border-[#D4AF37]/25 bg-[#050915] hover:border-[#D4AF37]/60 hover:bg-[#070D1E] transition-all duration-300 flex flex-col justify-between group space-y-6"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon & Discipline Number */}
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-lg bg-[#0A1224] border border-[#D4AF37]/30 text-[#D4AF37] group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-serif-brand text-xl font-light text-[#D4AF37]/60">
                        {d.number}
                      </span>
                    </div>

                    <h3 className="font-serif-brand text-2xl text-white font-semibold group-hover:text-[#FDF0CD] transition-colors">
                      {d.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed min-h-[48px]">
                      {d.description}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {d.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-[#0A1224] border border-slate-800 text-[11px] text-slate-400 font-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Explore Action */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (d.categorySlug === 'opportunities') {
                          navigate('/opportunities');
                        } else {
                          navigate(`/studios/${d.categorySlug}`);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => openServiceModal()}
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      Commission &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. WHY TACO (Exact design and texts from images 1, 2, 7)        */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              WHY TACO
            </span>
            <h2 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
              We don't just complete tasks. We understand problems.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Good work begins before the brief. TACO engagements are built on six commitments that shape how we think, not only what we deliver.
            </p>
          </div>

          {/* 6 Commitments 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="p-8 rounded-2xl border border-[#D4AF37]/20 bg-[#040813] hover:border-[#D4AF37]/45 transition-all space-y-4"
                >
                  <div className="p-2.5 rounded-lg bg-[#080E20] border border-[#D4AF37]/25 text-[#D4AF37] w-fit">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif-brand text-xl text-white font-semibold">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {c.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. OUR APPROACH (Exact design and texts from images 3, 4, 7)    */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              OUR APPROACH
            </span>
            <h2 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
              A disciplined path from idea to impact.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Seven stages, applied to every engagement regardless of size.
            </p>
          </div>

          {/* 7 Stages Flow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachStages.map((stage, idx) => (
              <div
                key={stage.number}
                className={`p-6 rounded-2xl border border-[#D4AF37]/25 bg-[#050915] space-y-3 relative ${
                  idx === 6 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Number Badge with gold circle accent */}
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full border border-[#D4AF37]/50 bg-[#0A1224] flex items-center justify-center font-mono text-xs font-semibold text-[#D4AF37]">
                    {stage.number}
                  </span>
                  <span className="font-serif-brand font-semibold text-white tracking-wider text-sm">
                    {stage.title}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed pt-1">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. WHO WE SERVE (Exact design and texts from images 4, 5)       */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              WHO WE SERVE
            </span>
            <h2 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
              Built for anyone with something worth building.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              From a first-time founder in Accra to an organisation working across borders, TACO works with people at every stage of an idea.
            </p>
          </div>

          {/* Audience Tag Chips (Interactive) */}
          <div className="flex flex-wrap gap-2.5">
            {audienceList.map((aud) => {
              const active = selectedAudience === aud;
              return (
                <button
                  key={aud}
                  onClick={() => setSelectedAudience(aud)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md shadow-[#D4AF37]/25'
                      : 'bg-[#050915] text-slate-300 hover:text-white border border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
                  }`}
                >
                  {aud}
                </button>
              );
            })}
          </div>

          {/* Interactive Audience Detail Callout */}
          {selectedAudience && audienceProfiles[selectedAudience] && (
            <div className="p-8 rounded-2xl border border-[#D4AF37]/35 bg-[#050A1A] grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
              <div className="md:col-span-8 space-y-3">
                <div className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/35 uppercase tracking-wider">
                  {audienceProfiles[selectedAudience].tag}
                </div>
                <h3 className="font-serif-brand text-2xl text-white font-semibold">
                  TACO Solutions for {selectedAudience}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {audienceProfiles[selectedAudience].description}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-mono">Typical Deliverables:</span>
                  {audienceProfiles[selectedAudience].services.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded bg-[#091124] border border-slate-700 text-[#FDF0CD]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center gap-3">
                <button
                  onClick={() => openServiceModal()}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] hover:brightness-110 transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer text-center"
                >
                  Start Project for {selectedAudience}
                </button>
                <span className="text-[11px] font-mono text-slate-400">
                  Direct review by TACO team
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. PEOPLE & OPPORTUNITIES (Exact design from images 6, 10)     */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                PEOPLE &amp; OPPORTUNITIES
              </span>
              <h2 className="font-serif-brand text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
                Don't just look for an opportunity. Build one.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                TACO is also a place to grow. Through training, workshops, practical experience and community, we help emerging talent turn potential into professional capability.
              </p>
            </div>
            <div>
              <button
                onClick={() => navigate('/opportunities')}
                className="px-8 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#D4AF37]/25 cursor-pointer whitespace-nowrap"
              >
                Join TACO
              </button>
            </div>
          </div>

          {/* Development Programmes Grid (4 pairs) */}
          <div className="p-8 rounded-3xl border border-[#D4AF37]/30 bg-[#040813] space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Development programmes
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { left: 'Students', right: 'Creatives' },
                { left: 'Professionals', right: 'Ambassadors' },
                { left: 'Marketers', right: 'Researchers' },
                { left: 'Creators', right: 'Emerging leaders' },
              ].map((pair, i) => (
                <div key={i} className="space-y-2">
                  <div className="p-3.5 rounded-xl border border-slate-800 bg-[#060D1E] text-slate-200 text-xs font-medium flex items-center justify-between hover:border-[#D4AF37]/40 transition-colors">
                    <span>{pair.left}</span>
                    <ArrowRight className="h-3 w-3 text-[#D4AF37]" />
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-800 bg-[#060D1E] text-slate-200 text-xs font-medium flex items-center justify-between hover:border-[#D4AF37]/40 transition-colors">
                    <span>{pair.right}</span>
                    <ArrowRight className="h-3 w-3 text-[#D4AF37]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <span>Campus Ambassador Network: 15% revenue share on referrals</span>
              <button
                onClick={() => navigate('/opportunities')}
                className="text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Read Fellowship &amp; Ambassador prospectus</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. INVESTOR-READY SUITE & DATA ROOM (Fulfilling User Mandate)  */}
      {/* ============================================================ */}
      <section id="investor-room" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <InvestorDataRoom />
      </section>

      {/* ============================================================ */}
      {/* 9. BEGIN HERE (Exact design and texts from image 8)            */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
            BEGIN HERE
          </span>
        </div>

        <h2 className="font-serif-brand text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight">
          Ready to turn an idea into something real?
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => openServiceModal()}
            className="px-8 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 bg-gradient-to-r from-[#F4D068] via-[#D4AF37] to-[#B8860B] hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#D4AF37]/25 cursor-pointer border border-[#FFF0B3]/40"
          >
            Start a Project
          </button>

          <button
            onClick={() => navigate('/opportunities')}
            className="px-8 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-[0.16em] text-white bg-[#060A16] hover:bg-[#0B1224] border border-[#D4AF37]/45 hover:border-[#D4AF37] active:scale-[0.98] transition-all cursor-pointer shadow-md"
          >
            Join TACO
          </button>

          <button
            onClick={() => navigate('/investors')}
            className="px-8 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider text-[#FDF0CD] bg-[#070D1F] hover:bg-[#0E1838] border border-[#D4AF37]/35 transition-all cursor-pointer flex items-center gap-2"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Investor Briefing</span>
          </button>
        </div>
      </section>
    </div>
  );
};
