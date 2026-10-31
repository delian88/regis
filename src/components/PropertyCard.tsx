'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Bed, Bath, ShieldCheck, Video } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { SeedProperty } from '@/db/seed-data';

interface PropertyCardProps {
  property: SeedProperty;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { formatPrice } = useCurrency();
  const { isFavorite, toggleFavorite } = useFavorites();

  const saved = isFavorite(property.id);

  const getCategoryLabel = () => {
    const typeLabel = property.propertyType === 'flats' ? 'Flat / apartment' : property.propertyType === 'houses' ? 'House' : property.propertyType === 'land' ? 'Land' : 'Commercial';
    const catLabel = property.category === 'sale' ? 'for sale' : property.category === 'rent' ? 'for rent' : property.category === 'shortlet' ? 'for short let' : 'for joint venture';
    return `${typeLabel} ${catLabel}`;
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
      {/* Image Container with Hover Zoom */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-transform active:scale-90 ${
            saved ? 'text-red-500' : 'text-white hover:text-red-400'
          }`}
          aria-label="Save listing"
          title={saved ? 'Remove from saved' : 'Save listing'}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Verified & Video Badges */}
        <div className="absolute left-3 top-3 z-20 flex flex-wrap items-center gap-1.5">
          {property.isVerified && (
            <div className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[0.6875rem] font-bold text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified</span>
            </div>
          )}
          {(property.videoUrl || (property.videos && property.videos.length > 0)) && (
            <div className="flex items-center gap-1 rounded-full bg-amber-500 text-slate-950 px-2 py-0.5 text-[0.65rem] font-black uppercase shadow">
              <Video className="w-3 h-3" />
              <span>Video</span>
            </div>
          )}
        </div>
      </div>

      {/* Details Box */}
      <div className="flex min-w-0 flex-1 flex-col p-4">
        {/* Price Tag with Currency Conversion */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl sm:text-2xl font-extrabold text-[var(--foreground-strong)] tracking-tight">
            {formatPrice(property.price, property.period)}
          </span>
        </div>

        {/* Subtitle Category */}
        <p className="mt-1 text-xs font-bold text-red-600 uppercase tracking-wide">
          {getCategoryLabel()}
        </p>

        {/* Title */}
        <h3 className="mt-1.5 line-clamp-2 text-sm font-bold text-[var(--foreground-strong)] group-hover:text-red-600 transition-colors">
          {property.title}
        </h3>

        {/* Location Pin */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span className="truncate">{property.streetAddress || `${property.locality}, ${property.state}`}</span>
        </div>

        {/* Spec Icons (Beds & Baths) */}
        <div className="mt-auto pt-3 border-t border-[var(--border)] flex items-center gap-4 text-xs font-semibold text-[var(--foreground-strong)]">
          {property.bedrooms > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[var(--foreground-muted)]" />
              {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[var(--foreground-muted)]" />
              {property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}
            </span>
          )}
          {property.plotSizeSqm && property.plotSizeSqm > 0 && (
            <span className="text-[var(--foreground-muted)] text-[0.75rem]">
              {property.plotSizeSqm.toLocaleString()} sqm
            </span>
          )}
        </div>
      </div>

      {/* Main card clickable link */}
      <Link
        href={`/property/${property.id}`}
        className="absolute inset-0 z-10"
        aria-label={property.title}
      />
    </article>
  );
}
