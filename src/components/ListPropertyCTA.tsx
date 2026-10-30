'use client';

import React from 'react';
import Link from 'next/link';
import { Building, PlusCircle, CheckCircle, ArrowRight } from 'lucide-react';

export function ListPropertyCTA() {
  return (
    <section className="py-12 md:py-16 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white mb-4">
              <Building className="w-3.5 h-3.5" />
              <span>FOR AGENTS & DEVELOPERS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Are you an Estate Agent or Property Developer?
            </h2>

            <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">
              List your properties on Nigeria&apos;s No. 1 property portal. Connect with high-intent buyers, diaspora investors, and qualified tenants actively searching for real estate right now.
            </p>

            {/* Checklist */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-white/95">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Over 2 Million monthly property searchers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Instant WhatsApp and phone call leads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Custom agent branded profile with company logo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Easy listing management dashboard</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/advertise-list-property"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold bg-white text-red-600 hover:bg-slate-100 shadow-md transition-all active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Property</span>
              </Link>

              <Link
                href="/register?type=agent"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold bg-red-950/40 hover:bg-red-950/60 border border-white/30 text-white transition-all active:scale-95"
              >
                <span>Register as an Agent</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="absolute right-0 top-0 -bottom-10 w-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border-8 border-white/10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
