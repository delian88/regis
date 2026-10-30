import React from 'react';
import { Header } from '@/components/Header';
import { HeroSearch } from '@/components/HeroSearch';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { CityLocations } from '@/components/CityLocations';
import { WhyPropertyCentre } from '@/components/WhyPropertyCentre';
import { FeaturedAgents } from '@/components/FeaturedAgents';
import { AppDownloadBanner } from '@/components/AppDownloadBanner';
import { ListPropertyCTA } from '@/components/ListPropertyCTA';
import { StateDirectory } from '@/components/StateDirectory';
import { Footer } from '@/components/Footer';
import { getProperties, getAgents } from '@/db';

export const metadata = {
  title: 'Nigeria Property Centre - Property & Real Estate in Nigeria for Sale & Rent',
  description: 'Search 160,000+ flats, houses, lands, and commercial properties for sale, rent, and lease from trusted estate agents in Lagos, Abuja, Ibadan, and all 36 Nigerian states.',
};

export default async function HomePage() {
  const [properties, agents] = await Promise.all([
    getProperties({ limit: 12 }),
    getAgents(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-red-500 selection:text-white">
      {/* Header Navigation */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Dark Hero with NPC Category Tabs & Advanced Search Engine */}
        <HeroSearch />

        {/* Featured Properties Grid */}
        <FeaturedProperties properties={properties} />

        {/* Popular Locations & Q4 Market Report */}
        <CityLocations />

        {/* Why Nigeria Property Centre - 4 Value Pillars & Live Metrics */}
        <WhyPropertyCentre />

        {/* Featured Estate Agents & Developers with Call & WhatsApp Dialers */}
        <FeaturedAgents agents={agents} />

        {/* Mobile App Download Banner */}
        <AppDownloadBanner />

        {/* Estate Agent / Developer Sign-Up Call-to-Action */}
        <ListPropertyCTA />

        {/* Collapsible A-Z 36 Nigerian States + FCT Directory */}
        <StateDirectory />
      </main>

      {/* Comprehensive NPC Footer */}
      <Footer />
    </div>
  );
}
