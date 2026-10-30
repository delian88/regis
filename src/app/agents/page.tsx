import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAgents } from '@/db';
import { AgentsDirectoryClient } from './AgentsDirectoryClient';

export const metadata = {
  title: 'Real Estate Agents in Nigeria - Certified Estate Surveyors & Valuers | Nigeria Property Centre',
  description: 'Find trusted and verified estate agents, chartered surveyors, and registered realtors in Lagos, Abuja, Port Harcourt, and across all Nigerian states.',
};

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <AgentsDirectoryClient initialAgents={agents} />
      </main>
      <Footer />
    </div>
  );
}
