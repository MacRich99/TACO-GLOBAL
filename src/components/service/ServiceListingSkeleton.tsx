import React from 'react';
import { ServiceCardSkeleton } from './ServiceCardSkeleton';

interface ServiceListingSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
  showCategoryHeader?: boolean;
}

export const ServiceListingSkeleton: React.FC<ServiceListingSkeletonProps> = ({
  count = 3,
  columns = 3,
  showCategoryHeader = false,
}) => {
  const gridColsClass =
    columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 4
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      {/* Optional Category Header Skeleton */}
      {showCategoryHeader && (
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-3 luxury-shimmer-sweep">
          <div className="space-y-2">
            <div className="h-4 w-48 rounded bg-white/[0.08] animate-luxury-pulse" />
            <div className="h-2.5 w-72 rounded bg-white/[0.04]" />
          </div>
          <div className="h-3 w-28 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/20" />
        </div>
      )}

      {/* Cards Grid Skeleton */}
      <div className={`grid ${gridColsClass} gap-5 sm:gap-6`}>
        {Array.from({ length: count }).map((_, idx) => (
          <ServiceCardSkeleton key={idx} index={idx} />
        ))}
      </div>
    </div>
  );
};
