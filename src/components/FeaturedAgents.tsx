'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Phone, MessageSquare, Building2, MapPin, X, ArrowRight, ExternalLink } from 'lucide-react';
import { SeedAgent } from '@/db/seed-data';

interface FeaturedAgentsProps {
  agents: SeedAgent[];
}

export function FeaturedAgents({ agents }: FeaturedAgentsProps) {
  const [selectedAgentForCall, setSelectedAgentForCall] = useState<SeedAgent | null>(null);

  return (
    <section className="py-12 md:py-16 bg-slate-50 dark:bg-[#070B16] border-y border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 mb-2">
              <Building2 className="w-3.5 h-3.5 text-red-600" />
              <span>ACCREDITED PROFESSIONALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground-strong)] tracking-tight">
              Featured Estate Agents & Developers
            </h2>
            <p className="mt-1 text-sm text-[var(--foreground-muted)] max-w-2xl">
              Connect directly with verified real estate agencies, chartered estate surveyors, and licensed property developers.
            </p>
          </div>

          <Link
            href="/agents"
            className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <span>View all agents</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.slice(0, 4).map((agent) => (
            <div
              key={agent.id}
              className="flex flex-col rounded-2xl bg-[var(--card)] border border-[var(--border)] p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Agent Logo & Verified */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative size-14 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-[var(--border)] shrink-0">
                  <Image
                    src={agent.logoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                    alt={agent.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-sm text-[var(--foreground-strong)] truncate">
                      {agent.name}
                    </h3>
                  </div>
                  {agent.companyName && (
                    <p className="text-xs text-[var(--foreground-muted)] truncate">
                      {agent.companyName}
                    </p>
                  )}
                  {agent.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[0.6875rem] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Agent</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Location & Count */}
              <div className="space-y-1.5 mb-5 text-xs text-[var(--foreground-muted)] flex-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="truncate">{agent.location || 'Lagos, Nigeria'}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-[var(--foreground-strong)]">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{agent.activeListingsCount || 12} active properties</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[var(--border)]">
                {/* Phone Call / Modal */}
                <button
                  type="button"
                  onClick={() => setSelectedAgentForCall(agent)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[var(--foreground-strong)] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  <span>Call</span>
                </button>

                {/* WhatsApp Direct */}
                <a
                  href={`https://wa.me/${agent.whatsapp?.replace(/[^0-9]/g, '') || agent.phone?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20saw%20your%20profile%20on%20Nigeria%20Property%20Centre%20and%20would%20like%20to%20enquire%20about%20your%20available%20listings.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* View profile link */}
              <Link
                href={`/agents/${agent.id}`}
                className="mt-3 text-center text-xs font-semibold text-red-600 hover:underline flex items-center justify-center gap-1"
              >
                <span>View properties</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>

        {/* Call Modal */}
        {selectedAgentForCall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm rounded-2xl bg-[var(--card)] p-6 shadow-2xl border border-[var(--border)]">
              <button
                type="button"
                onClick={() => setSelectedAgentForCall(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-[var(--foreground-strong)] p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative size-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 border">
                  <Image
                    src={selectedAgentForCall.logoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                    alt={selectedAgentForCall.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground-strong)]">
                  {selectedAgentForCall.name}
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] mb-4">
                  {selectedAgentForCall.companyName || 'Verified Real Estate Agent'}
                </p>

                <div className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-[var(--border)] mb-4">
                  <p className="text-xs font-medium text-[var(--foreground-muted)] mb-1">
                    Direct Phone Number
                  </p>
                  <a
                    href={`tel:${selectedAgentForCall.phone}`}
                    className="text-lg font-extrabold text-red-600 hover:underline tracking-wide block"
                  >
                    {selectedAgentForCall.phone || '+234 803 123 4567'}
                  </a>
                </div>

                <div className="w-full flex gap-3">
                  <a
                    href={`tel:${selectedAgentForCall.phone}`}
                    className="flex-1 py-2.5 px-4 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white text-center transition-colors"
                  >
                    Call Now
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedAgentForCall.phone || '');
                      alert('Phone number copied to clipboard!');
                    }}
                    className="py-2.5 px-4 rounded-full text-xs font-bold border border-[var(--border)] hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--foreground-strong)] transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
