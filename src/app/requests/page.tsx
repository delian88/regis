import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PropertyRequestsClient } from './PropertyRequestsClient';
import { getPropertyRequests } from '@/db';

export const metadata = {
  title: 'Client Property Requests & Acquisition Enquiries — Regis Integrated Services Limited',
  description: 'Browse genuine real estate buyer and tenant requests across Lagos, Abuja, Port Harcourt and throughout Nigeria. Contact prospective clients with matching listings directly.',
};

export default async function RequestsPage() {
  const requests = await getPropertyRequests();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1">
        <PropertyRequestsClient initialRequests={requests} />
      </main>
      <Footer />
    </div>
  );
}
