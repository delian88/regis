import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CatalogPageContent } from '@/components/CatalogPageContent';
import { getProperties } from '@/db';

export const metadata = {
  title: 'Short Let Apartments & Luxury Villas — Regis Integrated Services Limited',
  description: 'Book fully furnished, serviced short let flats and luxury villas in Lekki Phase 1, Ikoyi, Victoria Island, and Maitama Abuja with 24/7 power, WiFi, and swimming pools.',
};

interface ShortLetPageProps {
  searchParams: Promise<{ state?: string; type?: string; locality?: string }>;
}

export default async function ShortLetPage({ searchParams }: ShortLetPageProps) {
  const params = await searchParams;
  const properties = await getProperties({ category: 'shortlet' });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <CatalogPageContent
          initialProperties={properties}
          category="shortlet"
          categoryTitle="Short Let Apartments & Holiday Homes in Nigeria"
          categoryDescription="Discover fully furnished luxury apartments, studio suites, and private serviced residences with 24/7 uninterrupted power, high-speed WiFi, security, and concierge services."
          initialState={params.state || 'all'}
          initialType={params.type || 'all'}
        />
      </main>
      <Footer />
    </div>
  );
}
