import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { getPropertyById, getProperties } from '@/db';
import { PropertyDetailsClient } from './PropertyDetailsClient';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return { title: 'Property Not Found - Nigeria Property Centre' };

  return {
    title: `${property.title} - Nigeria Property Centre`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images.length > 0 ? [property.images[0]] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  // Related properties in same state or category
  const relatedProperties = await getProperties({
    category: property.category,
    limit: 3,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 py-6 sm:py-8">
        <PropertyDetailsClient
          property={property}
          relatedProperties={relatedProperties.filter((p) => p.id !== property.id)}
        />
      </main>

      <Footer />
    </div>
  );
}
