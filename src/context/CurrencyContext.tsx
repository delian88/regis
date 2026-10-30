'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD';

interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateToNgn: number; // 1 Foreign = X NGN
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  NGN: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rateToNgn: 1 },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', rateToNgn: 1520 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', rateToNgn: 1960 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', rateToNgn: 1640 },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rateToNgn: 1100 },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInNgn: number, period?: string | null) => string;
  currentCurrencyInfo: CurrencyInfo;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('NGN');

  useEffect(() => {
    const saved = localStorage.getItem('npc_currency') as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('npc_currency', code);
  };

  const formatPrice = (amountInNgn: number, period?: string | null): string => {
    if (!amountInNgn && amountInNgn !== 0) return 'Price on Request';
    const curr = CURRENCIES[currency];
    const converted = currency === 'NGN' ? amountInNgn : amountInNgn / curr.rateToNgn;

    let formattedNumber = '';
    if (converted >= 1000000000) {
      const billions = converted / 1000000000;
      formattedNumber = `${curr.symbol}${billions % 1 === 0 ? billions : billions.toFixed(1)} Billion`;
    } else if (converted >= 1000000 && currency === 'NGN' && amountInNgn >= 10000000) {
      // In Nigeria, prices in millions e.g. ₦850 Million or exact commas
      formattedNumber = `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    } else {
      formattedNumber = `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }

    if (period) {
      const periodLabel = period === 'daily' ? ' / day' : period === 'monthly' ? ' / month' : period === 'yearly' ? ' / yr' : ` / ${period}`;
      return `${formattedNumber}${periodLabel}`;
    }

    return formattedNumber;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        currentCurrencyInfo: CURRENCIES[currency],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
