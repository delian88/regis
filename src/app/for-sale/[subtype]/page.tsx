import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CatalogPageContent } from '@/components/CatalogPageContent';
import { getProperties } from '@/db';

interface SubtypePageProps {
  params: Promise<{ subtype: string }>;
  searchParams: Promise<{ state?: string; locality?: string }>;
}

const SUBTYPE_MAP: Record<string, { type: string; title: string; desc: string }> = {
  houses: {
    type: 'houses',
    title: 'Houses & Duplexes for Sale in Nigeria',
    desc: 'Browse semi-detached, fully-detached duplexes, terraces, and bungalows for sale in prime locations across Nigeria.',
  },
  'flats-apartments': {
    type: 'flats',
    title: 'Flats & Apartments for Sale in Nigeria',
    desc: 'Explore luxury 1, 2, 3, and 4 bedroom apartments, penthouses, and serviced flats for sale from verified developers.',
  },
  land: {
    type: 'land',
    title: 'Plots of Land for Sale in Nigeria',
    desc: 'Buy genuine commercial and residential land with Governor Consent, Certificate of Occupancy (C of O), or Gazette.',
  },
  commercial: {
    type: 'commercial',
    title: 'Commercial Property for Sale in Nigeria',
    desc: 'Office buildings, shopping complexes, warehouses, hotels, and event centres for investment and business operations.',
  },
};

export async function generateMetadata({ params }: SubtypePageProps) {
  const { subtype } = await params;
  const config = SUBTYPE_MAP[subtype] || {
    title: 'Properties for Sale in Nigeria',
    desc: 'Find verified properties for sale across Nigeria with Regis Integrated Services Limited.',
  };
  return {
    title: `${config.title} | Regis Integrated Services Limited`,
    description: config.desc,
  };
}

export default async function ForSaleSubtypePage({ params, searchParams }: SubtypePageProps) {
  const { subtype } = await params;
  const queryParams = await searchParams;
  const config = SUBTYPE_MAP[subtype] || {
    type: 'all',
    title: 'Properties for Sale in Nigeria',
    desc: 'Find verified properties for sale across Nigeria with Regis Integrated Services Limited.',
  };

  const properties = await getProperties({
    category: 'sale',
    propertyType: config.type !== 'all' ? config.type : undefined,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <CatalogPageContent
          initialProperties={properties}
          category="sale"
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
