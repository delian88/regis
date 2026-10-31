'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  HardHat,
  Compass,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Award,
  ArrowRight,
  Landmark,
} from 'lucide-react';

interface DivisionItem {
  id: string;
  name: string;
  department: string;
  lead: string;
  description: string;
  specialization: string;
  icon: React.ElementType;
}

const REGIS_DIVISIONS: DivisionItem[] = [
  {
    id: 'executive',
    name: 'Executive Project Directorate',
    department: 'Corporate Headquarters, Wuse Zone 2',
    lead: 'Executive Project Director & Board',
    description:
      'Oversees corporate governance, strategic land acquisitions in Abuja, government cadastral approvals, and high-level institutional partnerships with the Federal Housing Authority.',
    specialization: 'Strategic Direction & FHA Alliances',
    icon: Building2,
  },
  {
    id: 'engineering',
    name: 'Civil & Structural Engineering Unit',
    department: 'Site Operations & Quality Assurance',
    lead: 'Lead Structural Engineers (COREN Certified)',
    description:
      'Enforces rigorous geotechnical soil testing, rebar structural integrity audits, on-site concrete batch casting, and structural safety compliant with National Building Codes.',
    specialization: 'Turnkey Construction & Site Safety',
    icon: HardHat,
  },
  {
    id: 'architecture',
    name: 'Spatial Design & Architectural Studio',
    department: 'Design Directorate',
    lead: 'Chief Architect & CAD Modeler',
    description:
      'Designs contemporary 3D living concepts, double-volume penthouses, private elevator shafts, walkout basements, and sustainable natural ventilation systems.',
    specialization: '3D Spatial Modeling & Modern Concepts',
    icon: Compass,
  },
  {
    id: 'advisory',
    name: 'Client Advisory & Diaspora Mortgage Desk',
    department: 'Investor Relations & Documentation',
    lead: 'Head of Sales & Conveyancing',
    description:
      'Provides transparent milestone progress tracking for diaspora and local buyers, title deeds conveyancing (C of O / Governor Consent), and FHA Mortgage Bank financing guidance.',
    specialization: 'Diaspora Services & Mortgage Financing',
    icon: Landmark,
  },
];

export function RegisDivisions() {
  return (
    <section className="py-14 md:py-20 bg-[var(--background)] border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>REGIS IN-HOUSE PROFESSIONAL TEAMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--foreground-strong)] tracking-tight">
              Our Corporate Project Divisions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
              Every home and plot at Regis Integrated Services Limited is conceived, engineered, and managed entirely by our licensed in-house team of architects, civil engineers, and legal conveyancers.
            </p>
          </div>

          <Link
            href="/about-us"
            className="text-xs sm:text-sm font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 shrink-0"
          >
            <span>Learn more about our team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Divisions Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGIS_DIVISIONS.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.id}
                className="flex flex-col rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                {/* Accent Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700 opacity-80 group-hover:h-1.5 transition-all" />

                {/* Icon & Title */}
                <div className="size-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block mb-1">
                    {div.specialization}
                  </span>
                  <h3 className="font-extrabold text-base text-[var(--foreground-strong)] leading-snug">
                    {div.name}
                  </h3>
                  <p className="text-[11px] text-[var(--foreground-muted)] font-semibold mt-0.5">
                    {div.department}
                  </p>
                </div>

                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed flex-1 mt-2 mb-6">
                  {div.description}
                </p>

                {/* Direct Action Link */}
                <div className="pt-4 border-t border-[var(--border)] mt-auto flex items-center justify-between text-xs font-bold text-amber-500">
                  <a
                    href="tel:+2348155555168"
                    className="hover:underline flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Speak with Team</span>
                  </a>
                  <a
                    href="https://wa.me/2348155555168?text=Hello%20Regis%20Integrated%20Services,%20I%20would%20like%20to%20consult%20with%20your%20team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-500 transition-colors"
                    title="WhatsApp Consultation"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
