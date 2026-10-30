'use client';

import React from 'react';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { FavoritesProvider } from '@/context/FavoritesContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
