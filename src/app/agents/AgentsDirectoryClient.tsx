'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Building2, ShieldCheck, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { SeedAgent } from '@/db/seed-data';

interface AgentsDirectoryClientProps {
  initialAgents: SeedAgent[];
}

export function AgentsDirectoryClient({ initialAgents }: AgentsDirectoryClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [onlyVerified, setOnlyVerified] = useState(false);

  const filteredAgents = useMemo(() => {
    return initialAgents.filter((agent) => {
      if (onlyVerified && !agent.isVerified) return false;
      if (selectedState !== 'all' && !agent.location.toLowerCase().includes(selectedState.toLowerCase())) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchName = agent.name.toLowerCase().includes(q);
        const matchCompany = agent.companyName?.toLowerCase().includes(q);
        const matchLocation = agent.location?.toLowerCase().includes(q);
        return matchName || matchCompany || matchLocation;
      }
      return true;
    });
  }, [initialAgents, searchTerm, selectedState, onlyVerified]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 mb-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>REGIS IN-HOUSE TEAMS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-strong)] tracking-tight">
          Regis Executive Directorate & Advisory Units
        </h1>
        <p className="mt-1 text-sm text-[var(--foreground-muted)] max-w-2xl">
          Connect directly with Regis Integrated Services Limited project directors, structural engineers, architectural designers, and mortgage advisory specialists.
        </p>
      </div>

      {/* Filter and Search Box */}
      <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
            <input
              type="text"
              placeholder="Search by unit name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <option value="all">All Locations</option>
              <option value="Abuja">Abuja (FCT Headquarters)</option>
              <option value="Lagos">Lagos Liaison</option>
            </select>
          </div>

          {/* Verified Toggle */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-xs font-bold text-[var(--foreground-strong)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="size-4 accent-amber-600 rounded"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Show Verified Units Only</span>
              </span>
            </label>
          </div>
        </div>

        <div className="text-xs text-[var(--foreground-muted)] font-medium pt-2 border-t border-[var(--border)]">
          Found <span className="font-bold text-[var(--foreground-strong)]">{filteredAgents.length}</span> project units
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="flex flex-col rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative size-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border shrink-0">
                <Image
                  src={agent.logoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base text-[var(--foreground-strong)] truncate">
                  {agent.name}
                </h3>
                {agent.companyName && (
                  <p className="text-xs text-[var(--foreground-muted)] truncate">
                    {agent.companyName}
                  </p>
                )}
                {agent.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[0.6875rem] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Official Regis Directorate</span>
                  </span>
                )}
              </div>
            </div>

            <div className="mt-auto space-y-2 text-xs text-[var(--foreground-muted)] pt-3 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{agent.location}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[var(--foreground-strong)]">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{agent.activeListingsCount || 10}+ Active Units & Sites</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[var(--border)]">
              <a
                href={`tel:${agent.phone || '+2348155555168'}`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[var(--foreground-strong)] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Direct Call</span>
              </a>

              <a
                href={`https://wa.me/${agent.whatsapp?.replace(/[^0-9]/g, '') || '2348155555168'}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20am%20inquiring%20about%20Regis%20Integrated%20Services%20developments.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
