import React, { useState } from 'react';
import { useAppNavigation } from '@/src/context/RouteContext';
import { useCurrency } from '@/src/context/CurrencyContext';
import servicesData from '@/src/data/services.json';
import { ServiceSpec } from '@/src/types';
import { ArrowRight, Clock, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface StudiosPageProps {
  initialCategory?: string;
}

export const StudiosPage: React.FC<StudiosPageProps> = ({ initialCategory }) => {
  const { navigate, openServiceModal } = useAppNavigation();
  const { formatPrice, currency } = useCurrency();

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all services
  const allServices: ServiceSpec[] = servicesData.categories.flatMap((c) => c.services as unknown as ServiceSpec[]);

  // Filter logic
  const filteredServices = allServices.filter((svc) => {
    const matchesCategory = activeCategory === 'all' || svc.categoryId === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 pb-24">
      {/* Header Banner */}
      <header className="border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#090F22] to-[#050811] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D4AF37]">
              TACO STUDIOS &middot; Production Suite
            </span>
            <span className="text-slate-600">&middot;</span>
            <span className="text-xs font-mono text-slate-400">Live Rates: {currency}</span>
          </div>

          <h1 className="font-serif-brand text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Client-Facing Service Catalog
          </h1>

          <p className="text-base text-slate-300 font-light max-w-2xl leading-relaxed">
            Standardized project blueprints with fixed starting rates, defined deliverables, and guaranteed milestone turnarounds.
          </p>

          {/* Quick Search & Filter Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services (e.g., Logo, SOP, Business Plan, Web Dev)..."
                className="w-full rounded-lg border border-slate-700 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Filter Tabs Bar (Functional buttons) */}
      <div className="sticky top-[95px] z-30 border-b border-slate-800 bg-[#060A16]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3">
        <div className="mx-auto max-w-6xl flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#D4AF37] text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            All Services ({allServices.length})
          </button>
          {servicesData.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#D4AF37] text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Catalog */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10">
        {filteredServices.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-[#070D1C] p-12 text-center space-y-4">
            <p className="text-sm text-slate-400">
              No services matched your query &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#FCE7A1] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((svc) => (
              <div
                key={svc.id}
                className="rounded-xl border border-slate-800 bg-[#070D1C] p-6 space-y-5 hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-[#D4AF37]/5 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#D4AF37]">
                      {svc.categoryName}
                    </span>
                    {svc.badge && (
                      <span className="text-[10px] font-medium text-emerald-400 font-mono">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Price Header */}
                  <div>
                    <h3 className="font-serif-brand text-xl font-bold text-white group-hover:text-[#FCE7A1] transition-colors">
                      {svc.title}
                    </h3>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <span className="text-[10px] uppercase text-slate-400 font-mono">Starting from</span>
                      <span className="font-mono text-xl font-bold text-[#FCE7A1] tabular-nums">
                        {formatPrice(svc.startingPrice)}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">({currency})</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
                    {svc.overview}
                  </p>

                  {/* Turnaround Pill */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>Turnaround: {svc.turnaroundTime}</span>
                  </div>

                  {/* Quick Deliverable Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {svc.deliverables.slice(0, 3).map((del, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="h-3 w-3 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="truncate font-light">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => openServiceModal(svc.slug)}
                    className="w-full py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] rounded hover:brightness-110 active:scale-[0.99] transition-all text-center cursor-pointer shadow-sm"
                  >
                    Request Service
                  </button>

                  <button
                    onClick={() => navigate(`/studios/service/${svc.slug}`)}
                    className="w-full py-2 px-3 text-xs font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>View Specifications &amp; Blueprint</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
