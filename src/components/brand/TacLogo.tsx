import React, { useState } from 'react';
import { BrandAssets } from '@/src/assets/images';

interface TacLogoProps {
  variant?: 'full' | 'mark' | 'image' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showMotto?: boolean;
  className?: string;
}

export const TacLogo: React.FC<TacLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showMotto = false,
  className = '',
}) => {
  const [imgSrc, setImgSrc] = useState<string>(BrandAssets.logo || '/az.jpeg');

  const handleError = () => {
    if (imgSrc !== '/az.jpeg') {
      setImgSrc('/az.jpeg');
    }
  };

  // Full emblem card variant
  if (variant === 'full') {
    const fullSizes = {
      sm: 'w-44',
      md: 'w-64',
      lg: 'w-80',
      xl: 'w-96',
    };

    return (
      <div className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border border-[#D4AF37]/35 bg-[#030712]/90 shadow-2xl shadow-black/80 backdrop-blur-md group ${fullSizes[size]} ${className}`}>
        <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#02050E]">
          <img
            src={imgSrc}
            alt="TACO GLOBAL - Excellence with Divinity"
            onError={handleError}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050E] via-transparent to-transparent opacity-30 pointer-events-none" />
        </div>
      </div>
    );
  }

  // Pure mark (just the insignia emblem icon)
  if (variant === 'mark') {
    const markSizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-14 w-14',
      xl: 'h-20 w-20',
    };
    return (
      <div className={`relative shrink-0 rounded-lg overflow-hidden border border-[#D4AF37]/40 bg-[#060A14] shadow-md shadow-[#D4AF37]/10 ${markSizes[size]} ${className}`}>
        <img
          src={imgSrc}
          alt="TACO GLOBAL Insignia"
          onError={handleError}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // High-res image variant
  if (variant === 'image') {
    const imgSizes = {
      sm: 'h-8 w-8',
      md: 'h-11 w-11',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24',
    };
    return (
      <div className={`relative inline-flex items-center justify-center rounded-lg overflow-hidden border border-[#D4AF37]/35 bg-[#070C18] shadow-md shadow-[#D4AF37]/15 ${imgSizes[size]} ${className}`}>
        <img
          src={imgSrc}
          alt="TACO GLOBAL Official Logo"
          onError={handleError}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  const heights = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
    xl: 'h-20 w-20',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  const mottoSizes = {
    sm: 'text-[7px]',
    md: 'text-[9px]',
    lg: 'text-[11px]',
    xl: 'text-xs',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Badge with official logo */}
      <div className={`relative shrink-0 rounded-md overflow-hidden border border-[#D4AF37]/45 bg-[#060A14] shadow-sm shadow-[#D4AF37]/15 ${heights[size]}`}>
        <img
          src={imgSrc}
          alt="TACO GLOBAL"
          onError={handleError}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-serif-brand font-bold tracking-tight text-white ${textSizes[size]}`}>
            TACO
          </span>
          <span className={`font-serif-brand font-light tracking-[0.22em] text-[#D4AF37] ${textSizes[size]}`}>
            GLOBAL
          </span>
        </div>

        {showMotto && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[0.5px] w-2.5 bg-[#D4AF37]/40" />
            <span className={`font-sans-clean uppercase tracking-[0.24em] text-[#D4AF37]/90 font-medium ${mottoSizes[size]}`}>
              Excellence with Divinity
            </span>
            <span className="h-[0.5px] w-2.5 bg-[#D4AF37]/40" />
          </div>
        )}
      </div>
    </div>
  );
};

