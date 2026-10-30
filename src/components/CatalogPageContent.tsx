'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter, SlidersHorizontal, ArrowUpDown, Search, Building2, MapPin } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import { SeedProperty } from '@/db/seed-data';

interface CatalogPageContentProps {
  initialProperties: SeedProperty[];
  category: 'sale' | 'rent' | 'shortlet' | 'jv' | 'all';
  categoryTitle: string;
  categoryDescription: string;
  initialState?: string;
  initialType?: string;
}

export function CatalogPageContent({
  initialProperties,
  category,
  categoryTitle,
  categoryDescription,
  initialState = 'all',
  initialType = 'all',
}: CatalogPageContentProps) {
  const [selectedState, setSelectedState] = useState<string>(initialState);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBeds, setSelectedBeds] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc'>('recent');

  const filteredProperties = useMemo(() => {
    return initialProperties
      .filter((p) => {
        if (category !== 'all' && p.category !== category) return false;
        if (selectedState !== 'all' && p.state.toLowerCase() !== selectedState.toLowerCase()) return false;
        if (selectedType !== 'all' && p.propertyType.toLowerCase() !== selectedType.toLowerCase()) return false;
        if (selectedBeds !== 'all' && p.bedrooms < selectedBeds) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchLocality = p.locality.toLowerCase().includes(q);
          const matchState = p.state.toLowerCase().includes(q);
          return matchTitle || matchLocality || matchState;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return b.id - a.id;
      });
  }, [initialProperties, category, selectedState, selectedType, selectedBeds, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-strong)] tracking-tight">
          {categoryTitle}
        </h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)] max-w-3xl">
          {categoryDescription}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
            <input
              type="text"
              placeholder="Search Lekki, Ikoyi, Abuja..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="all">All States & Cities</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja (FCT)</option>
              <option value="Oyo">Oyo (Ibadan)</option>
              <option value="Ogun">Ogun (Abeokuta, Magboro)</option>
              <option value="Rivers">Rivers (Port Harcourt)</option>
              <option value="Enugu">Enugu</option>
            </select>
          </div>

          {/* Property Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="all">All Property Types</option>
              <option value="flats">Flats / Apartments</option>
              <option value="houses">Houses / Duplexes</option>
              <option value="land">Plots of Land</option>
              <option value="commercial">Commercial / Office</option>
            </select>
          </div>

          {/* Bedrooms Filter */}
          <div>
            <select
              value={selectedBeds}
              onChange={(e) => setSelectedBeds(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="all">Any Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>
        </div>

        {/* Results Count & Sort bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--border)] text-xs">
          <p className="font-semibold text-[var(--foreground-muted)]">
            Showing <span className="font-bold text-[var(--foreground-strong)]">{filteredProperties.length}</span> properties
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[var(--foreground-muted)] flex items-center gap-1 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort by:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-2.5 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold"
            >
              <option value="recent">Most Recent</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
          <Building2 className="w-10 h-10 text-[var(--foreground-muted)] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[var(--foreground-strong)]">
            No properties match your current filters
          </h3>
          <p className="text-xs text-[var(--foreground-muted)] mt-1 mb-4">
            Try adjusting your search criteria, selecting a different city, or removing bedroom filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedState('all');
              setSelectedType('all');
              setSelectedBeds('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-full text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
