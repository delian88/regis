'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowUpRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface DistrictInfo {
  name: string;
  tagline: string;
  description: string;
  developmentType: string;
  statusBadge: string;
  imageUrl: string;
  href: string;
}

const REGIS_DISTRICTS: DistrictInfo[] = [
  {
    name: 'Guzape District (Main) — Cadastral Zone A09',
    tagline: 'Ultra-Luxury Elevated Terraces & Penthouse Living',
    description:
      'Our flagship hillside luxury development featuring 6-Bedroom Terrace Duplexes with subterranean walkout basements, private elevator shafts, and panoramic vistas overlooking Asokoro and Guzape hills.',
    developmentType: 'Luxury Residential Duplexes',
    statusBadge: 'Selling Fast • Active Construction',
    imageUrl: 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg',
    href: '/for-sale?locality=Guzape',
  },
  {
    name: 'FHA Golden Jubilee Estate, Mbora District',
    tagline: 'Affordable Luxury in Strategic Partnership with FHA',
    description:
      'Developed in institutional partnership with the Federal Housing Authority. Features 5-Bedroom Semi-Detached Duplexes and 2 & 3-Bedroom Luxury Flats with single-digit mortgage financing via FHA Mortgage Bank.',
    developmentType: 'Semi-Detached Duplexes & Flats',
    statusBadge: 'FHA Institutional Partnership',
    imageUrl: 'https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg',
    href: '/for-sale?locality=Mbora',
  },
  {
    name: 'Lugbe Airport Road Corridor — Regis Royale',
    tagline: 'Fully Serviced Master-Planned Estate Plots',
    description:
      'Table dry flat topography offering 250 SQM and 500 SQM serviced residential plots with instant physical beacon allocation, access roads, drainage infrastructure, and verified title documents.',
    developmentType: 'Sites & Services Scheme',
    statusBadge: 'Instant Allocation • C of O',
    imageUrl: 'https://www.regis.com.ng/wp-content/uploads/2024/10/land-270x270_c.jpg',
    href: '/for-sale?type=land&locality=Lugbe',
  },
  {
    name: 'Idu Industrial & Commercial Growth Hub',
    tagline: 'Strategic Commercial & Mixed-Use Land Layouts',
    description:
      'Positioned along Abuja’s premier rail transit and industrial manufacturing corridor. Ideal for commercial headquarters, warehousing, logistics, or mixed-use developments with rapid capital appreciation.',
    developmentType: 'Commercial & Mixed-Use Land',
    statusBadge: 'High Investment Yield',
    imageUrl: 'https://www.regis.com.ng/wp-content/uploads/2024/10/land2-270x270_c.jpg',
    href: '/for-sale?type=land&locality=Idu',
  },
];

export function RegisDistricts() {
  return (
    <section className="py-14 md:py-20 bg-slate-50 dark:bg-[#070B16] border-y border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>REGIS STRATEGIC LOCATIONS IN ABUJA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--foreground-strong)] tracking-tight">
              Our Development Corridors
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
              Every Regis project is situated in high-growth, government-approved cadastral zones across the Federal Capital Territory, offering maximum capital appreciation and secure land title.
            </p>
          </div>

          <Link
            href="/for-sale"
            className="text-xs sm:text-sm font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 shrink-0"
          >
            <span>Explore all Regis projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {REGIS_DISTRICTS.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo Banner */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-500 text-slate-950 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>{item.statusBadge}</span>
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-0.5">
                    {item.developmentType}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-amber-500 mb-1.5">
                    {item.tagline}
                  </h4>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold text-amber-500 group-hover:translate-x-1 transition-transform">
                  <span>View available properties & plots</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
