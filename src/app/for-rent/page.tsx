import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CatalogPageContent } from '@/components/CatalogPageContent';
import { getProperties } from '@/db';

export const metadata = {
  title: 'Property for Rent in Nigeria - Flats, Houses & Offices | Nigeria Property Centre',
  description: 'Search houses, flats, serviced apartments, and office spaces for rent in Lagos, Abuja, Ibadan, Port Harcourt and across Nigeria from certified agents.',
};

interface ForRentPageProps {
  searchParams: Promise<{ state?: string; type?: string; locality?: string }>;
}

export default async function ForRentPage({ searchParams }: ForRentPageProps) {
  const params = await searchParams;
  const properties = await getProperties({ category: 'rent' });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <CatalogPageContent
          initialProperties={properties}
          category="rent"
          categoryTitle="Property for Rent in Nigeria"
          categoryDescription="Browse verified serviced apartments, self-contain units, family duplexes, and commercial office spaces available for rent across top Nigerian locations."
          initialState={params.state || 'all'}
          initialType={params.type || 'all'}
        />
      </main>
      <Footer />
    </div>
  );
}
