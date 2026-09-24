import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardSkeletonProps {
  index?: number;
  className?: string;
}

export const ServiceCardSkeleton: React.FC<ServiceCardSkeletonProps> = ({
  index = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative rounded-xl border border-white/[0.08] bg-slate-900/30 p-5 space-y-4 shadow-sm overflow-hidden luxury-shimmer-sweep ${className}`}
    >
      {/* Top Meta Row: Category Tag & Turnaround Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/40 animate-pulse" />
          <div className="h-2.5 w-24 rounded-full bg-white/[0.08] animate-luxury-pulse" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-white/[0.06]" />
          <div className="h-2 w-14 rounded-full bg-white/[0.06] animate-luxury-pulse" />
        </div>
      </div>

      {/* Title & Starting Price Skeleton */}
      <div className="space-y-2 pt-1">
        <div className="h-5 w-3/4 rounded-md bg-white/[0.09] animate-luxury-pulse" />
        <div className="flex items-center gap-2 pt-1">
          <div className="h-2.5 w-16 rounded bg-white/[0.05]" />
          <div className="h-4 w-20 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/20" />
        </div>
      </div>

      {/* 2-line Description Headline Skeleton */}
      <div className="space-y-2 pt-1">
        <div className="h-2.5 w-full rounded bg-white/[0.05]" />
        <div className="h-2.5 w-4/5 rounded bg-white/[0.04]" />
      </div>

      {/* Hairline Divider & Bottom Action Skeleton */}
      <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-2 w-12 rounded bg-white/[0.04]" />
          <div className="h-3.5 w-16 rounded bg-white/[0.07]" />
        </div>

        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-14 rounded bg-white/[0.07]" />
          <div className="h-3 w-3 rounded bg-white/[0.07]" />
        </div>
      </div>
    </motion.div>
  );
};
