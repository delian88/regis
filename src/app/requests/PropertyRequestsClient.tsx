'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Building2,
  Calendar,
  Phone,
  MessageSquare,
  PlusCircle,
  Briefcase,
  Layers,
  Home,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { SeedPropertyRequest } from '@/db/seed-data';

interface PropertyRequestsClientProps {
  initialRequests: SeedPropertyRequest[];
}

export function PropertyRequestsClient({ initialRequests }: PropertyRequestsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedPropType, setSelectedPropType] = useState('all');

  const filteredRequests = useMemo(() => {
    return initialRequests.filter((req) => {
      if (selectedType !== 'all' && req.requestType.toLowerCase() !== selectedType.toLowerCase()) return false;
      if (selectedState !== 'all' && req.state.toLowerCase() !== selectedState.toLowerCase()) return false;
      if (selectedPropType !== 'all' && req.propertyType.toLowerCase() !== selectedPropType.toLowerCase()) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchName = req.name.toLowerCase().includes(q);
        const matchLocality = req.locality?.toLowerCase().includes(q);
        const matchState = req.state.toLowerCase().includes(q);
        const matchDetails = req.details?.toLowerCase().includes(q);
        return matchName || matchLocality || matchState || matchDetails;
      }
      return true;
    });
  }, [initialRequests, searchTerm, selectedType, selectedState, selectedPropType]);

  const formatPrice = (val: number | null) => {
    if (!val) return 'Negotiable';
    if (val >= 1_000_000_000) {
      return `₦${(val / 1_000_000_000).toFixed(1)}B`;
    }
    if (val >= 1_000_000) {
      return `₦${(val / 1_000_000).toLocaleString()}M`;
    }
    return `₦${val.toLocaleString()}`;
  };

  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'buy':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'rent':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'shortlet':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'jv':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Top CTA Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 sm:p-8 mb-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6875rem] font-bold bg-white/20 text-white mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONNECT WITH CLIENTS FAST</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Property Requests in Nigeria
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-red-100 leading-relaxed">
            Real prospective tenants, buyers, and corporate investors looking for specific apartments, houses, commercial spaces, and land. Contact seekers directly to close deals quickly.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
          <Link
            href="/requests/create"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold bg-white text-red-600 hover:bg-red-50 shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Free Request</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
            <input
              type="text"
              placeholder="Search Lekki, Maitama, duplex..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Request Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="all">All Request Types</option>
              <option value="buy">For Sale / Buy</option>
              <option value="rent">To Rent / Lease</option>
              <option value="shortlet">Shortlet</option>
              <option value="jv">Joint Venture (JV)</option>
            </select>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="all">All States</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja (FCT)</option>
              <option value="Rivers">Rivers (Port Harcourt)</option>
              <option value="Oyo">Oyo (Ibadan)</option>
            </select>
          </div>

          {/* Property Category */}
          <div>
            <select
              value={selectedPropType}
              onChange={(e) => setSelectedPropType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="houses">Houses & Duplexes</option>
              <option value="flats">Flats & Apartments</option>
              <option value="land">Plots of Land</option>
              <option value="commercial">Commercial / Office</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] font-medium pt-2 border-t border-[var(--border)]">
          <span>Showing <strong className="text-[var(--foreground-strong)]">{filteredRequests.length}</strong> active property requests</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Direct Client Inquiries
          </span>
        </div>
      </div>

      {/* Requests Feed Grid */}
      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredRequests.map((req) => {
            const dateStr = new Date(req.createdAt).toLocaleDateString('en-NG', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            const whatsappMsg = `Hello ${req.name}, I am a representative from Regis Integrated Services Limited. I saw your request for ${req.propertyType} in ${req.locality || req.state} (Budget: ${formatPrice(req.budgetMin)} - ${formatPrice(req.budgetMax)}). We have matching options and serviced plots available for inspection.`;

            return (
              <div
                key={req.id}
                className="flex flex-col justify-between rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className={`px-2.5 py-1 text-[0.6875rem] font-black uppercase rounded-lg border tracking-wider ${getBadgeColor(req.requestType)}`}>
                      {req.requestType === 'buy' ? 'Looking to Buy' : req.requestType === 'rent' ? 'Looking to Rent' : req.requestType === 'jv' ? 'Joint Venture' : 'Short Let'}
                    </span>
                    <span className="flex items-center gap-1 text-[0.6875rem] text-[var(--foreground-muted)] font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{dateStr}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-[var(--foreground-strong)] tracking-tight mb-2">
                    {req.bedrooms > 0 ? `${req.bedrooms} Bedroom ` : ''}
                    {req.propertyType.charAt(0).toUpperCase() + req.propertyType.slice(1)} in {req.locality ? `${req.locality}, ` : ''}{req.state}
                  </h3>

                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--foreground-muted)]">Target Budget:</span>
                    <span className="text-sm font-black text-red-600 dark:text-red-400">
                      {formatPrice(req.budgetMin)} - {formatPrice(req.budgetMax)}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--foreground)] leading-relaxed bg-[var(--surface-1)] p-3 rounded-xl border border-[var(--border)] mb-4">
                    &ldquo;{req.details}&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[var(--foreground-muted)]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{req.locality ? `${req.locality}, ${req.state}` : req.state}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-[var(--foreground-strong)]">
                      <span>Posted by: <strong>{req.name}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-[var(--border)]">
                  <a
                    href={`tel:${req.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--foreground-strong)] transition-colors border border-[var(--border)]"
                  >
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    <span>Call Seeker</span>
                  </a>

                  <a
                    href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
          <Building2 className="w-10 h-10 text-[var(--foreground-muted)] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[var(--foreground-strong)]">
            No property requests match your current filters
          </h3>
          <p className="text-xs text-[var(--foreground-muted)] mt-1 mb-4">
            Try resetting your filters or selecting a different location.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedType('all');
              setSelectedState('all');
              setSelectedPropType('all');
              setSearchTerm('');
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
