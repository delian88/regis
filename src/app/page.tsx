import React from 'react';
import { Header } from '@/components/Header';
import { HeroSearch } from '@/components/HeroSearch';
import { RegisPillars } from '@/components/RegisPillars';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { RegisStory } from '@/components/RegisStory';
import { RegisGallery } from '@/components/RegisGallery';
import { RegisDistricts } from '@/components/RegisDistricts';
import { RegisDivisions } from '@/components/RegisDivisions';
import { RegisConsultation } from '@/components/RegisConsultation';
import { RegisCTA } from '@/components/RegisCTA';
import { Footer } from '@/components/Footer';
import { getProperties, getAllSiteContent } from '@/db';

export const metadata = {
  title: 'Regis Integrated Services Limited — Affordable Luxury Real Estate & Construction Abuja',
  description:
    'Regis Integrated Services Limited (RISL) is Nigeria’s leading property development and construction enterprise. Explore Regis Royale Estate, FHA Golden Jubilee Estate Mbora, Guzape luxury terraces, and serviced lands in Lugbe and Idu, Abuja.',
};

export default async function HomePage() {
  const [properties, content] = await Promise.all([
    getProperties({ limit: 12 }),
    getAllSiteContent(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-amber-500 selection:text-slate-950">
      {/* Regis Header with Full Company Name Logo & Direct Inquiries Hotline */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Regis Corporate Hero with Search Engine for Regis Developments */}
        <HeroSearch content={content.homepage_hero} />

        {/* 3 Core Pillars: Luxurious Homes, State-of-the-Art Construction, Modern Architectural Designs */}
        <RegisPillars content={content.homepage_pillars} />

        {/* Featured Developments & Available Units (Guzape, Mbora, Lugbe, Idu) */}
        <FeaturedProperties properties={properties} />

        {/* Strategic Development Corridors across Abuja */}
        <RegisDistricts />

        {/* Regis Corporate Story & Engineering Heritage (10+ Years, 1,000+ Units, FHA Alliance) */}
        <RegisStory content={content.homepage_story} />

        {/* In-House Project Divisions & Professional Engineering Team */}
        <RegisDivisions />

        {/* Authentic On-Site Gallery: Views and Sights of Regis Royale Estate */}
        <RegisGallery content={content.homepage_gallery} />

        {/* Executive Property Inspection & Video Walkthrough Booking */}
        <RegisConsultation />

        {/* "LET'S BUILD YOUR DREAM, TOGETHER!" Call To Action Banner */}
        <RegisCTA content={content.homepage_cta} />
      </main>

      {/* Comprehensive Regis Footer with Full Name Logo & Strategic Alliances */}
      <Footer />
    </div>
  );
}
