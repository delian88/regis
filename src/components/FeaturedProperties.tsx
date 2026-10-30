'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import { SeedProperty } from '@/db/seed-data';

interface FeaturedPropertiesProps {
  properties: SeedProperty[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [filter, setFilter] = useState<'all' | 'sale' | 'rent' | 'shortlet'>('all');

  const filtered = properties.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section className="py-12 md:py-16 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>HANDPICKED FOR YOU</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-strong)] tracking-tight">
              Featured Properties
            </h2>
            <p className="mt-1 text-sm text-[var(--foreground-muted)] max-w-2xl">
              Browse through verified luxury and affordable homes from vetted real estate agents and top developers across Nigeria.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Properties' },
              { id: 'sale', label: 'For Sale' },
              { id: 'rent', label: 'For Rent' },
              { id: 'shortlet', label: 'Short Let' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-[var(--card)] text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] border border-[var(--border)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[var(--card)] rounded-xl border border-[var(--border)]">
            <p className="text-base font-semibold text-[var(--foreground-muted)]">
              No featured listings found in this category right now.
            </p>
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <Link
            href={`/for-${filter === 'all' ? 'sale' : filter}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white dark:bg-slate-900 border border-[var(--border)] text-[var(--foreground-strong)] hover:border-red-500 hover:text-red-600 shadow-sm transition-all group"
          >
            <span>Explore all {filter === 'all' ? 'available' : filter} listings</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-red-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
