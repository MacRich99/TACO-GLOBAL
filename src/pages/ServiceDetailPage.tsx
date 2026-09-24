import React from 'react';
import servicesData from '@/src/data/services.json';
import { ServiceLayout } from '@/src/components/service/ServiceLayout';
import { ServiceSpec } from '@/src/types';
import { useAppNavigation } from '@/src/context/RouteContext';
import { ArrowLeft } from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const { navigate } = useAppNavigation();

  // Find matching service across all categories
  const allServices: ServiceSpec[] = servicesData.categories.flatMap((c) => c.services as unknown as ServiceSpec[]);
  const service = allServices.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#050811] text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4 rounded-xl border border-slate-800 bg-[#070D1C] p-8">
          <h2 className="font-serif-brand text-2xl font-bold text-white">
            Service Specification Not Found
          </h2>
          <p className="text-xs text-slate-400">
            The service route <code className="text-[#FCE7A1] font-mono">/studios/service/{slug}</code> does not exist or has been restructured.
          </p>
          <button
            onClick={() => navigate('/studios')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#ECC86A] to-[#D4AF37] rounded"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Studios Catalog</span>
          </button>
        </div>
      </div>
    );
  }

  return <ServiceLayout service={service} />;
};
