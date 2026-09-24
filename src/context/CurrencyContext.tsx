import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'GHS' | 'GBP' | 'EUR';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  getSymbol: () => string;
  rates: Record<CurrencyCode, { rate: number; symbol: string; label: string }>;
}

const RATES: Record<CurrencyCode, { rate: number; symbol: string; label: string }> = {
  USD: { rate: 1.0, symbol: '$', label: 'USD ($)' },
  GHS: { rate: 15.5, symbol: 'GH₵', label: 'GHS (GH₵)' },
  GBP: { rate: 0.78, symbol: '£', label: 'GBP (£)' },
  EUR: { rate: 0.92, symbol: '€', label: 'EUR (€)' },
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const formatPrice = (amountInUSD: number): string => {
    const config = RATES[currency];
    const converted = amountInUSD * config.rate;
    // Format nicely
    if (currency === 'GHS') {
      return `${config.symbol} ${Math.round(converted).toLocaleString()}`;
    }
    if (converted >= 1000) {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${Math.round(converted)}`;
  };

  const getSymbol = () => RATES[currency].symbol;

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, getSymbol, rates: RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
