'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  MapPin,
  Clock,
  PieChart,
  BarChart3,
  Calculator,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

interface AreaTrend {
  area: string;
  state: string;
  avgRent3Bed: string;
  avgSale4Bed: string;
  landPerSqm: string;
  annualRentChange: string;
  annualPriceChange: string;
  daysToLet: number;
  demandIndex: 'Very High' | 'High' | 'Moderate';
  rentalYield: string;
}

const MARKET_DATA: AreaTrend[] = [
  {
    area: 'Lekki Phase 1',
    state: 'Lagos',
    avgRent3Bed: '₦8,500,000 / yr',
    avgSale4Bed: '₦380,000,000',
    landPerSqm: '₦550,000 / sqm',
    annualRentChange: '+18.4%',
    annualPriceChange: '+22.5%',
    daysToLet: 21,
    demandIndex: 'Very High',
    rentalYield: '8.4%',
  },
  {
    area: 'Ikoyi',
    state: 'Lagos',
    avgRent3Bed: '₦22,000,000 / yr',
    avgSale4Bed: '₦850,000,000',
    landPerSqm: '₦1,400,000 / sqm',
    annualRentChange: '+24.0%',
    annualPriceChange: '+28.2%',
    daysToLet: 35,
    demandIndex: 'Very High',
    rentalYield: '7.8%',
  },
  {
    area: 'Victoria Island & Oniru',
    state: 'Lagos',
    avgRent3Bed: '₦15,000,000 / yr',
    avgSale4Bed: '₦550,000,000',
    landPerSqm: '₦850,000 / sqm',
    annualRentChange: '+16.5%',
    annualPriceChange: '+19.8%',
    daysToLet: 24,
    demandIndex: 'Very High',
    rentalYield: '9.2%',
  },
  {
    area: 'Ikeja GRA',
    state: 'Lagos',
    avgRent3Bed: '₦7,000,000 / yr',
    avgSale4Bed: '₦320,000,000',
    landPerSqm: '₦480,000 / sqm',
    annualRentChange: '+14.2%',
    annualPriceChange: '+17.0%',
    daysToLet: 18,
    demandIndex: 'Very High',
    rentalYield: '7.5%',
  },
  {
    area: 'Maitama',
    state: 'Abuja',
    avgRent3Bed: '₦18,000,000 / yr',
    avgSale4Bed: '₦680,000,000',
    landPerSqm: '₦750,000 / sqm',
    annualRentChange: '+15.8%',
    annualPriceChange: '+21.0%',
    daysToLet: 26,
    demandIndex: 'Very High',
    rentalYield: '6.9%',
  },
  {
    area: 'Wuse 2 & Jabi',
    state: 'Abuja',
    avgRent3Bed: '₦9,000,000 / yr',
    avgSale4Bed: '₦350,000,000',
    landPerSqm: '₦400,000 / sqm',
    annualRentChange: '+12.5%',
    annualPriceChange: '+16.4%',
    daysToLet: 22,
    demandIndex: 'High',
    rentalYield: '7.4%',
  },
  {
    area: 'Old GRA, Port Harcourt',
    state: 'Rivers',
    avgRent3Bed: '₦5,500,000 / yr',
    avgSale4Bed: '₦260,000,000',
    landPerSqm: '₦280,000 / sqm',
    annualRentChange: '+10.2%',
    annualPriceChange: '+13.5%',
    daysToLet: 30,
    demandIndex: 'High',
    rentalYield: '7.1%',
  },
  {
    area: 'Bodija & Iyaganku',
    state: 'Oyo',
    avgRent3Bed: '₦3,200,000 / yr',
    avgSale4Bed: '₦140,000,000',
    landPerSqm: '₦120,000 / sqm',
    annualRentChange: '+11.8%',
    annualPriceChange: '+15.2%',
    daysToLet: 25,
    demandIndex: 'High',
    rentalYield: '8.1%',
  },
];

export function MarketTrendsClient() {
  const [selectedState, setSelectedState] = useState<'all' | 'Lagos' | 'Abuja' | 'Rivers' | 'Oyo'>('all');

  // Simple Yield Calculator state
  const [propertyCost, setPropertyCost] = useState<number>(150_000_000);
  const [monthlyRent, setMonthlyRent] = useState<number>(1_000_000);

  const annualRent = monthlyRent * 12;
  const grossYield = propertyCost > 0 ? ((annualRent / propertyCost) * 100).toFixed(2) : '0';

  const filteredData = MARKET_DATA.filter((d) => selectedState === 'all' || d.state === selectedState);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 mb-3 border border-amber-500/20">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>REGIS REAL ESTATE INTELLIGENCE & PRICE INDEX</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--foreground-strong)] tracking-tight">
          Abuja & Nigeria Property Market Trends
        </h1>
        <p className="mt-2 text-sm text-[var(--foreground-muted)] leading-relaxed">
          Accurate, development-backed benchmark pricing, rental yields, time-on-market metrics, and capital appreciation rates curated by Regis Integrated Services Limited.
        </p>
      </div>

      {/* Top 4 Quick Metric Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] mb-2 font-medium">
            <span>National Avg Rent Growth</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +16.8%
            </span>
          </div>
          <p className="text-2xl font-black text-[var(--foreground-strong)]">₦8.5M / yr</p>
          <p className="text-[0.6875rem] text-[var(--foreground-muted)] mt-1">Average 3-bed flat in prime Lagos & Abuja</p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] mb-2 font-medium">
            <span>Capital Appreciation</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +21.4%
            </span>
          </div>
          <p className="text-2xl font-black text-[var(--foreground-strong)]">₦350M</p>
          <p className="text-[0.6875rem] text-[var(--foreground-muted)] mt-1">Average 4-bed duplex in key urban zones</p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] mb-2 font-medium">
            <span>Average Rental Yield</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">Stable</span>
          </div>
          <p className="text-2xl font-black text-red-600 dark:text-red-400">8.2%</p>
          <p className="text-[0.6875rem] text-[var(--foreground-muted)] mt-1">Peak 18%+ in Short-Let / Oniru apartments</p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] mb-2 font-medium">
            <span>Average Speed to Let</span>
            <span className="text-purple-600 font-bold">Fast</span>
          </div>
          <p className="text-2xl font-black text-[var(--foreground-strong)]">24 Days</p>
          <p className="text-[0.6875rem] text-[var(--foreground-muted)] mt-1">From listing publication to signed tenancy</p>
        </div>
      </div>

      {/* Filter Tabs by State */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 bg-[var(--surface-1)] p-1 rounded-xl border border-[var(--border)]">
          {(['all', 'Lagos', 'Abuja', 'Rivers', 'Oyo'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedState === st
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)]'
              }`}
            >
              {st === 'all' ? 'All Key Cities' : st}
            </button>
          ))}
        </div>

        <div className="text-xs text-[var(--foreground-muted)] flex items-center gap-1 font-medium">
          <Info className="w-3.5 h-3.5 text-red-500" />
          <span>Updated based on over 160,000 verified listings across Nigeria</span>
        </div>
      </div>

      {/* Benchmark Pricing Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--surface-1)] text-[var(--foreground-strong)] border-b border-[var(--border)] font-bold uppercase tracking-wider text-[0.6875rem]">
              <tr>
                <th className="py-3.5 px-4">Location / Corridor</th>
                <th className="py-3.5 px-4">State</th>
                <th className="py-3.5 px-4">Avg Rent (3-Bed Flat)</th>
                <th className="py-3.5 px-4">Avg Price (4-Bed Duplex)</th>
                <th className="py-3.5 px-4">Land (per sqm)</th>
                <th className="py-3.5 px-4">YoY Rent Growth</th>
                <th className="py-3.5 px-4">Gross Yield</th>
                <th className="py-3.5 px-4 text-center">Demand Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[var(--foreground)]">
              {filteredData.map((row) => (
                <tr key={row.area} className="hover:bg-[var(--surface-1)]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--foreground-strong)] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{row.area}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[var(--foreground-muted)]">{row.state}</td>
                  <td className="py-3.5 px-4 font-bold text-red-600 dark:text-red-400">{row.avgRent3Bed}</td>
                  <td className="py-3.5 px-4 font-bold">{row.avgSale4Bed}</td>
                  <td className="py-3.5 px-4 text-[var(--foreground-muted)]">{row.landPerSqm}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">{row.annualRentChange}</td>
                  <td className="py-3.5 px-4 font-extrabold text-[var(--foreground-strong)]">{row.rentalYield}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[0.625rem] font-bold bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300">
                      {row.demandIndex}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Yield & ROI Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
            <Calculator className="w-4 h-4" />
            <span>Rental Yield & Investment Calculator</span>
          </div>
          <h2 className="text-xl font-black text-[var(--foreground-strong)]">
            Calculate Estimated Annual Rental Yield
          </h2>
          <p className="text-xs text-[var(--foreground-muted)]">
            Estimate your gross annualized returns for buy-to-let properties in Nigeria.
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[var(--foreground-strong)] mb-1">
                Property Purchase Price (₦)
              </label>
              <input
                type="number"
                value={propertyCost}
                onChange={(e) => setPropertyCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] font-bold text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--foreground-strong)] mb-1">
                Expected Monthly Rent (₦)
              </label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] font-bold text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div className="p-4 rounded-xl bg-[var(--surface-1)] border border-[var(--border)] flex items-center justify-between">
              <div>
                <p className="text-xs text-[var(--foreground-muted)] font-medium">Estimated Gross Yield</p>
                <p className="text-2xl font-black text-red-600">{grossYield}% / annum</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--foreground-muted)] font-medium">Annual Rental Revenue</p>
                <p className="text-base font-bold text-[var(--foreground-strong)]">₦{annualRent.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Insights Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-lg space-y-4 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6875rem] font-bold bg-white/10 text-amber-400 mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Q4 2026 MARKET HIGHLIGHTS</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              Lekki Corridor & Maitama Lead Capital Appreciation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              Demand for gated estate developments with independent 24/7 solar/gas hybrid power plants has increased by over 34% this year. Expatriate and diaspora buyers are heavily prioritizing title safety (Governor&apos;s Consent and electronic C of O registration).
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <p className="text-[0.6875rem] text-slate-400">Short Let Occupancy</p>
                <p className="text-base font-black text-white mt-0.5">78.5% Avg</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <p className="text-[0.6875rem] text-slate-400">Prime Office Occupancy</p>
                <p className="text-base font-black text-white mt-0.5">88.2% Avg</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Looking to invest in Nigeria?</span>
            <Link
              href="/for-sale"
              className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              <span>Explore Verified Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
