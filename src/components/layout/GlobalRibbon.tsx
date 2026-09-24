import React, { useState, useEffect } from 'react';
import { useCurrency, CurrencyCode } from '@/src/context/CurrencyContext';
import { Globe2, ShieldCheck, ChevronDown } from 'lucide-react';

export const GlobalRibbon: React.FC = () => {
  const { currency, setCurrency, rates } = useCurrency();
  const [times, setTimes] = useState({
    accra: '',
    london: '',
    newyork: '',
    dubai: '',
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        accra: now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Accra', hour: '2-digit', minute: '2-digit' }),
        london: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
        newyork: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
        dubai: now.toLocaleTimeString('en-AE', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }),
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#03060d] border-b border-[#D4AF37]/15 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-400 select-none">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
        {/* Left: Global Hubs Time Grid */}
        <div className="flex items-center gap-4 text-[10px] tracking-wider uppercase font-mono overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#D4AF37] font-semibold">GLOBAL HUBS:</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-400">ACCRA</span>
            <span className="text-slate-200 font-medium">{times.accra || '12:00'} GMT</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">&middot;</span>
          <div className="hidden sm:flex items-center gap-1">
            <span className="text-slate-400">LONDON</span>
            <span className="text-slate-200 font-medium">{times.london || '13:00'} BST</span>
          </div>
          <span className="text-slate-700 hidden md:inline">&middot;</span>
          <div className="hidden md:flex items-center gap-1">
            <span className="text-slate-400">NEW YORK</span>
            <span className="text-slate-200 font-medium">{times.newyork || '08:00'} EDT</span>
          </div>
          <span className="text-slate-700 hidden lg:inline">&middot;</span>
          <div className="hidden lg:flex items-center gap-1">
            <span className="text-slate-400">DUBAI</span>
            <span className="text-slate-200 font-medium">{times.dubai || '16:00'} GST</span>
          </div>
        </div>

        {/* Right: Hotline, Currency Switcher & Investor Notice */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Direct Hotline */}
          <a
            href="tel:+2332055517659"
            className="flex items-center gap-1.5 text-[10px] font-mono text-[#D4AF37] hover:text-white transition-colors"
            title="Call TACO GLOBAL Executive Desk"
          >
            <span className="hidden sm:inline text-slate-400">DESK:</span>
            <span className="font-semibold tracking-wide">+233 20 5551 7659</span>
          </a>

          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <ShieldCheck className="h-3 w-3 text-[#D4AF37]" />
            <span>ESCROW VERIFIED</span>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-[#070D1F] border border-slate-800 rounded p-0.5 text-[10px] font-mono">
            {(Object.keys(rates) as CurrencyCode[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  currency === c
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={`Switch to ${rates[c].label}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
