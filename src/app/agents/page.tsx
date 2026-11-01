import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAgents } from '@/db';
import { AgentsDirectoryClient } from './AgentsDirectoryClient';

export const metadata = {
  title: 'Project Directorate & Advisory Units — Regis Integrated Services Limited',
  description: 'Connect directly with Regis Integrated Services Limited project directors, structural engineers, architectural designers, and mortgage advisory specialists.',
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
