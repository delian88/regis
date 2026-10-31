'use client';

import React from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Video,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export function RegisConsultation() {
  return (
    <section className="py-14 md:py-20 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070B16] via-[#0F1626] to-[#1E293B] border border-amber-500/30 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Subtle Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 size-96 rounded-full bg-amber-600/10 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <CalendarCheck className="w-4 h-4" />
                <span>EXECUTIVE PROPERTY INSPECTION & ADVISORY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Inspect With Our Lead Structural Engineers
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Whether you reside in Abuja or in the diaspora, Regis Integrated Services Limited provides bespoke physical site inspections and interactive high-definition video walkthroughs with our resident project architects.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Cadastral beacon verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>FHA Mortgage Bank financing counsel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Interactive Zoom/WhatsApp video tours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Direct physical allocation of land plots</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Physical Site Visit</span>
                </Link>

                <a
                  href="https://wa.me/2348155555168?text=Hello%20Regis%20Integrated%20Services,%20I%20would%20like%20to%20schedule%20a%20property%20inspection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Sales Director</span>
                </a>
              </div>
            </div>

            {/* Right Quick Info Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="size-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Abuja Head Office</h4>
                    <p className="text-xs text-slate-300">
                      22 Koforidua Street, Wuse Zone 2, Abuja
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Hotline: +234 (0) 815 555 5168</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Inspection Days: Mon – Sat (9:00 AM – 4:00 PM)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Escorted transportation available from our Wuse office</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="tel:+2348155555168"
                    className="block text-center w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-colors"
                  >
                    Direct Line: +234 815 555 5168
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
