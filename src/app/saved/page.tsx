'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { useFavorites } from '@/context/FavoritesContext';
import { SEED_PROPERTIES } from '@/db/seed-data';
import { Heart, Search, ArrowRight } from 'lucide-react';

export default function SavedPropertiesPage() {
  const { favorites } = useFavorites();

  const savedList = SEED_PROPERTIES.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-strong)] tracking-tight">
                Saved Properties
              </h1>
              <p className="text-xs text-[var(--foreground-muted)]">
                {savedList.length} {savedList.length === 1 ? 'property' : 'properties'} bookmarked for quick comparison
              </p>
            </div>
          </div>

          {savedList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedList.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl bg-[var(--card)] border border-[var(--border)] max-w-lg mx-auto p-8">
              <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[var(--foreground-strong)]">
                You haven&apos;t saved any properties yet
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-1 mb-6">
                Click the heart icon on any property card to save it here and compare prices later.
              </p>
              <Link
                href="/for-sale"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <span>Browse Properties for Sale</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
