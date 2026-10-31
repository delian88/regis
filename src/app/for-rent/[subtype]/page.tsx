import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CatalogPageContent } from '@/components/CatalogPageContent';
import { getProperties } from '@/db';

interface RentSubtypePageProps {
  params: Promise<{ subtype: string }>;
  searchParams: Promise<{ state?: string; locality?: string }>;
}

const RENT_SUBTYPE_MAP: Record<string, { type: string; category?: 'rent' | 'shortlet'; title: string; desc: string }> = {
  houses: {
    type: 'houses',
    category: 'rent',
    title: 'Houses & Duplexes for Rent in Nigeria',
    desc: 'Browse semi-detached, fully-detached duplexes, terraces, and self-contained compounds for rent across Nigeria.',
  },
  'flats-apartments': {
    type: 'flats',
    category: 'rent',
    title: 'Flats & Apartments for Rent in Nigeria',
    desc: 'Explore mini-flats, 2-bedroom, 3-bedroom, and luxury serviced apartments for rent with round-the-clock security and light.',
  },
  shortlet: {
    type: 'flats',
    category: 'shortlet',
    title: 'Short Let Apartments in Nigeria',
    desc: 'Fully furnished, serviced apartments available for daily and weekly vacation and business stays across Lagos and Abuja.',
  },
  commercial: {
    type: 'commercial',
    category: 'rent',
    title: 'Commercial Property & Office Spaces for Rent in Nigeria',
    desc: 'Grade A office buildings, open-plan spaces, retail shops, and warehouses available for lease.',
  },
};

export async function generateMetadata({ params }: RentSubtypePageProps) {
  const { subtype } = await params;
  const config = RENT_SUBTYPE_MAP[subtype] || {
    title: 'Properties for Rent in Nigeria',
    desc: 'Find verified properties for rent across Nigeria with Regis Integrated Services Limited.',
  };
  return {
    title: `${config.title} | Regis Integrated Services Limited`,
    description: config.desc,
  };
}

export default async function ForRentSubtypePage({ params, searchParams }: RentSubtypePageProps) {
  const { subtype } = await params;
  const queryParams = await searchParams;
  const config = RENT_SUBTYPE_MAP[subtype] || {
    type: 'all',
    category: 'rent' as const,
    title: 'Properties for Rent in Nigeria',
    desc: 'Find verified properties for rent across Nigeria with Regis Integrated Services Limited.',
  };

  const properties = await getProperties({
    category: config.category || 'rent',
    propertyType: config.type !== 'all' ? config.type : undefined,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <CatalogPageContent
          initialProperties={properties}
          category={config.category || 'rent'}
          categoryTitle={config.title}
          categoryDescription={config.desc}
          initialState={queryParams.state || 'all'}
          initialType={config.type}
        />
      </main>
      <Footer />
    </div>
  );
}
