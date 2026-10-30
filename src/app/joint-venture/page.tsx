import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CatalogPageContent } from '@/components/CatalogPageContent';
import { getProperties } from '@/db';

export const metadata = {
  title: 'Joint Venture (JV) Land & Developments in Nigeria | Nigeria Property Centre',
  description: 'Explore verified joint venture property and land deals in prime locations across Ikoyi, Lekki, Victoria Island, and Abuja for reputable real estate developers.',
};

export default async function JointVenturePage() {
  const properties = await getProperties({ category: 'jv' });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <CatalogPageContent
          initialProperties={properties}
          category="jv"
          categoryTitle="Joint Venture (JV) Properties in Nigeria"
          categoryDescription="Connect with prime land owners seeking experienced property developers for commercial and luxury residential joint venture developments."
        />
      </main>
      <Footer />
    </div>
  );
}
