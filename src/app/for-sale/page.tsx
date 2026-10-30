import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CatalogPageContent } from '@/components/CatalogPageContent';
import { getProperties } from '@/db';

export const metadata = {
  title: 'Property for Sale in Nigeria - Houses, Flats & Land | Nigeria Property Centre',
  description: 'Find verified properties for sale in Nigeria. Browse duplexes, flats, bungalows, and dry land with C of O and Governor Consent across Lagos, Abuja, and nationwide.',
};

interface ForSalePageProps {
  searchParams: Promise<{ state?: string; type?: string; locality?: string }>;
}

export default async function ForSalePage({ searchParams }: ForSalePageProps) {
  const params = await searchParams;
  const properties = await getProperties({ category: 'sale' });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <CatalogPageContent
          initialProperties={properties}
          category="sale"
          categoryTitle="Property for Sale in Nigeria"
          categoryDescription="Explore houses, apartments, lands, and commercial spaces available for direct purchase from verified Nigerian estate agents and accredited developers."
          initialState={params.state || 'all'}
          initialType={params.type || 'all'}
        />
      </main>
      <Footer />
    </div>
  );
}
