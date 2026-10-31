import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MarketTrendsClient } from './MarketTrendsClient';

export const metadata = {
  title: 'Nigeria Real Estate Market Trends & Price Index — Regis Integrated Services Limited',
  description: 'Explore verified market trends, average house prices, rental rates, and investment yields across Lagos, Abuja, Port Harcourt, and major Nigerian cities.',
};

export default function MarketTrendsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <MarketTrendsClient />
      </main>
      <Footer />
    </div>
  );
}
