'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Map, ChevronDown, ChevronUp } from 'lucide-react';

const NIGERIAN_STATES = [
  { name: 'Abia', popular: false },
  { name: 'Abuja (FCT)', popular: true },
  { name: 'Adamawa', popular: false },
  { name: 'Akwa Ibom', popular: false },
  { name: 'Anambra', popular: false },
  { name: 'Bauchi', popular: false },
  { name: 'Bayelsa', popular: false },
  { name: 'Benue', popular: false },
  { name: 'Borno', popular: false },
  { name: 'Cross River', popular: false },
  { name: 'Delta', popular: false },
  { name: 'Ebonyi', popular: false },
  { name: 'Edo', popular: false },
  { name: 'Ekiti', popular: false },
  { name: 'Enugu', popular: true },
  { name: 'Gombe', popular: false },
  { name: 'Imo', popular: false },
  { name: 'Jigawa', popular: false },
  { name: 'Kaduna', popular: false },
  { name: 'Kano', popular: false },
  { name: 'Katsina', popular: false },
  { name: 'Kebbi', popular: false },
  { name: 'Kogi', popular: false },
  { name: 'Kwara', popular: false },
  { name: 'Lagos', popular: true },
  { name: 'Nasarawa', popular: false },
  { name: 'Niger', popular: false },
  { name: 'Ogun', popular: true },
  { name: 'Ondo', popular: false },
  { name: 'Osun', popular: false },
  { name: 'Oyo', popular: true },
  { name: 'Plateau', popular: false },
  { name: 'Rivers', popular: true },
  { name: 'Sokoto', popular: false },
  { name: 'Taraba', popular: false },
  { name: 'Yobe', popular: false },
  { name: 'Zamfara', popular: false },
];

export function StateDirectory() {
  const [expanded, setExpanded] = useState(false);

  // When not expanded, show top 12 states
  const displayedStates = expanded ? NIGERIAN_STATES : NIGERIAN_STATES.slice(0, 16);

  return (
    <section className="py-12 bg-slate-50 dark:bg-[#070B16] border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-red-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground-strong)] tracking-tight">
              Properties by State in Nigeria
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
          >
            <span>{expanded ? 'Show fewer states' : `View all 36 states + FCT`}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* States Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayedStates.map((state) => (
            <Link
              key={state.name}
              href={`/for-sale?state=${encodeURIComponent(state.name.split(' ')[0])}`}
              className="p-3 rounded-xl bg-[var(--card)] hover:bg-red-50 dark:hover:bg-red-950/30 border border-[var(--border)] hover:border-red-400 text-xs font-semibold text-[var(--foreground-strong)] hover:text-red-600 transition-all flex items-center justify-between group"
            >
              <span className="truncate">{state.name}</span>
              {state.popular && (
                <span className="size-2 rounded-full bg-red-600 shrink-0" title="Hot market" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
