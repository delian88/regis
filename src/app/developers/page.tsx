import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAgents } from '@/db';
import { AgentsDirectoryClient } from '../agents/AgentsDirectoryClient';

export const metadata = {
  title: 'Strategic Alliances & Institutional Partners — Regis Integrated Services Limited',
  description: 'Learn about Regis Integrated Services Limited alliances, including our partnership with the Federal Housing Authority (FHA) and FHA Mortgage Bank.',
};

export default async function DevelopersPage() {
  const agents = await getAgents();
  // Filter or prioritize developer companies
  const developers = agents.filter((a) => a.companyName?.toLowerCase().includes('ltd') || a.companyName?.toLowerCase().includes('group') || a.companyName?.toLowerCase().includes('associates') || a.companyName?.toLowerCase().includes('homes'));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <AgentsDirectoryClient initialAgents={developers.length > 0 ? developers : agents} />
      </main>
      <Footer />
    </div>
  );
}
