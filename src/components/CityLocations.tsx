'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, TrendingUp, Download, ArrowUpRight } from 'lucide-react';

interface CityData {
  name: string;
  state: string;
  count: string;
  popularSuburbs: string[];
  imageUrl: string;
  badge?: string;
}

const CITIES: CityData[] = [
  {
    name: 'Lagos',
    state: 'Lagos State',
    count: '131,282',
    popularSuburbs: ['Lekki', 'Ikoyi', 'Victoria Island', 'Ikeja', 'Ajah', 'Banana Island'],
    imageUrl: 'https://images.unsplash.com/photo-1577975882846-431adc8c2009?auto=format&fit=crop&w=800&q=80',
    badge: 'Most Popular',
  },
  {
    name: 'Abuja (FCT)',
    state: 'Federal Capital Territory',
    count: '22,335',
    popularSuburbs: ['Maitama', 'Asokoro', 'Guzape', 'Jabi', 'Wuse 2', 'Life Camp'],
    imageUrl: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80',
    badge: 'Capital City',
  },
  {
    name: 'Oyo',
    state: 'Ibadan & Environs',
    count: '3,485',
    popularSuburbs: ['Bodija', 'Oluyole', 'Jericho', 'Alalubosa', 'Ring Road'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ogun',
    state: 'Abeokuta, Magboro, Arepo',
    count: '2,356',
    popularSuburbs: ['Abeokuta', 'Magboro', 'Arepo', 'Shimawa', 'Ibafo'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rivers',
    state: 'Port Harcourt',
    count: '2,095',
    popularSuburbs: ['GRA Phase 2', 'Peter Odili Road', 'Trans Amadi', 'Woji'],
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Enugu',
    state: 'Enugu State',
    count: '884',
    popularSuburbs: ['Independence Layout', 'GRA', 'New Haven', 'Trans-Ekulu'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
];

export function CityLocations() {
  return (
    <section className="py-12 md:py-16 bg-slate-50 dark:bg-[#070B16] border-y border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 mb-2">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>REGIONAL REAL ESTATE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-strong)] tracking-tight">
              Popular Locations
            </h2>
            <p className="mt-1 text-sm text-[var(--foreground-muted)] max-w-2xl">
              Explore residential and commercial properties in top Nigerian commercial hubs, investment corridors, and serene gated communities.
            </p>
          </div>

          <Link
            href="/for-sale"
            className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <span>View all 36 states</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.map((city) => (
            <Link
              key={city.name}
              href={`/for-sale?state=${encodeURIComponent(city.name.split(' ')[0])}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <Image
                  src={city.imageUrl}
                  alt={`${city.name} real estate`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                {city.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[0.6875rem] font-bold bg-red-600 text-white shadow-sm">
                    {city.badge}
                  </span>
                )}

                {/* Floating Listing Count */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[0.6875rem] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {city.count} listings
                </span>

                {/* City Title on Image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-xl font-extrabold tracking-tight group-hover:text-red-300 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-white/80">{city.state}</p>
                </div>
              </div>

              {/* Suburbs Tags */}
              <div className="p-4 bg-[var(--card)] flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider mb-2">
                    Popular Areas:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {city.popularSuburbs.map((suburb) => (
                      <span
                        key={suburb}
                        className="inline-block px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-[var(--foreground-strong)] font-medium border border-[var(--border)]"
                      >
                        {suburb}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold text-red-600 group-hover:translate-x-1 transition-transform">
                  <span>Browse {city.name} properties</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Q4 Market Report Banner - Exact Nigeria Property Centre feature */}
        <div className="mt-10 relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-700 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>NIGERIA PROPERTY MARKET REPORT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Nigeria Real Estate Market Trends & Price Index
              </h3>
              <p className="mt-2 text-sm text-white/90 leading-relaxed">
                Download the latest verified quarterly research covering average land prices, rental yields, luxury residential demand, and emerging growth corridors across Lagos, Abuja, Ibadan, and Port Harcourt.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#download-report"
                onClick={(e) => {
                  e.preventDefault();
                  alert('The Q4 Nigeria Property Market Report is being compiled with real-time price indexes. Register your email in the newsletter to receive the PDF copy directly!');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-extrabold bg-white text-slate-950 hover:bg-slate-100 shadow-md transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-red-600" />
                <span>Download Free Report</span>
              </a>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute right-1/3 -top-10 w-48 h-48 bg-red-400/20 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
