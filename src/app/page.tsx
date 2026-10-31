import React from 'react';
import { Header } from '@/components/Header';
import { HeroSearch } from '@/components/HeroSearch';
import { RegisPillars } from '@/components/RegisPillars';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { RegisStory } from '@/components/RegisStory';
import { RegisGallery } from '@/components/RegisGallery';
import { RegisCTA } from '@/components/RegisCTA';
import { CityLocations } from '@/components/CityLocations';
import { FeaturedAgents } from '@/components/FeaturedAgents';
import { AppDownloadBanner } from '@/components/AppDownloadBanner';
import { StateDirectory } from '@/components/StateDirectory';
import { Footer } from '@/components/Footer';
import { getProperties, getAgents, getAllSiteContent } from '@/db';

export const metadata = {
  title: 'Regis Integrated Services Limited — Official Real Estate & Construction Portal',
  description:
    'Regis Integrated Services Limited (RISL) is Nigeria’s leading property development and construction enterprise. Explore Regis Royale Estate, FHA Golden Jubilee Estate Mbora, Guzape luxury terraces, and serviced lands in Lugbe and Idu, Abuja.',
};

export default async function HomePage() {
  const [properties, agents, content] = await Promise.all([
    getProperties({ limit: 12 }),
    getAgents(),
    getAllSiteContent(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-amber-500 selection:text-slate-950">
      {/* Regis Header with Utility Bar & Official Phone */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Regis Dark Hero with Category Tabs & Authentic Abuja / Nigeria Search Engine */}
        <HeroSearch content={content.homepage_hero} />

        {/* 3 Core Pillars: Luxurious Homes, State-of-the-Art Construction, Modern Architectural Designs */}
        <RegisPillars content={content.homepage_pillars} />

        {/* Featured Developments & Available Properties */}
        <FeaturedProperties properties={properties} />

        {/* Regis Corporate Story & Track Record (10+ Years, 200+ Clients, 1,000+ Projects) */}
        <RegisStory content={content.homepage_story} />

        {/* Authentic On-Site Gallery: Views and Sights of Regis Royale Estate */}
        <RegisGallery content={content.homepage_gallery} />

        {/* "LET'S BUILD YOUR DREAM, TOGETHER!" Call To Action Banner */}
        <RegisCTA content={content.homepage_cta} />

        {/* Popular Locations & Market Overview */}
        <CityLocations />

        {/* Accredited Developers & Partners (Featuring Regis Integrated Services Limited) */}
        <FeaturedAgents agents={agents} />

        {/* Mobile Portal App Banner */}
        <AppDownloadBanner />

        {/* Collapsible A-Z 36 Nigerian States + FCT Directory */}
        <StateDirectory />
      </main>

      {/* Comprehensive Regis Footer with FHA Institutional Partnership */}
      <Footer />
    </div>
  );
}
