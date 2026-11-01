'use client';

import React from 'react';
import { ShieldCheck, Users, Search, Gift, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Reviewed Listings',
    description: 'Every property submitted on our platform goes through automated checks and manual inspection to prevent duplicates and fraudulent listings.',
    highlight: 'Verified safe & active',
  },
  {
    icon: Users,
    title: 'Agents & Developers',
    description: 'Connect directly with over 15,000 certified Nigerian real estate agents, chartered surveyors, and accredited property developers.',
    highlight: 'Direct contact details',
  },
  {
    icon: Search,
    title: 'Powerful Search Tools',
    description: 'Filter listings by precise budget, state, locality, property type, number of bedrooms, and flexible payment frequency.',
    highlight: 'Find homes 3x faster',
  },
  {
    icon: Gift,
    title: 'Direct Developer Ownership',
    description: 'Deal directly with Regis Integrated Services Limited. No third-party agency markup, transparent deed delivery, and dedicated customer service.',
    highlight: 'Zero agent markup',
  },
];

export function WhyPropertyCentre() {
  return (
    <section className="py-12 md:py-16 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 mb-2">
            <span>EXCLUSIVE BUILDER & DEVELOPER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-strong)] tracking-tight">
            Why Choose Regis Integrated Services Limited?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--foreground-muted)]">
            Over a decade of architectural excellence, structural integrity, and institutional partnership with the Federal Housing Authority (FHA).
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Icon Circle */}
                <div className="size-12 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--foreground-strong)] tracking-tight mb-2">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed flex-1">
                  {feat.description}
                </p>

                {/* Highlight Tag */}
                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{feat.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)]">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-red-600">160,000+</p>
            <p className="text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] mt-1">Properties Listed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-red-600">15,000+</p>
            <p className="text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] mt-1">Verified Agents</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-red-600">36 States</p>
            <p className="text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] mt-1">Nationwide Reach</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-black text-red-600">2M+</p>
            <p className="text-xs sm:text-sm font-semibold text-[var(--foreground-muted)] mt-1">Monthly Visitors</p>
          </div>
        </div>
      </div>
    </section>
  );
}
