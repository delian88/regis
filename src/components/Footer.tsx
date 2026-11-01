'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowUpRight, MessageCircle, Lock } from 'lucide-react';
import { RegisLogo } from './RegisLogo';

export function Footer() {
  return (
    <footer className="bg-[#070B16] text-slate-300 border-t border-slate-800">
      {/* Institutional Partner Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 block mb-1">
                Strategic Real Estate Alliances
              </span>
              <h4 className="text-sm font-bold text-white">
                Official Development & Mortgage Financing Partners
              </h4>
            </div>
            
            <div className="flex items-center gap-8 flex-wrap justify-center">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                <div className="relative h-10 w-24">
                  <Image
                    src="https://www.regis.com.ng/wp-content/uploads/2023/10/fha-logo.png"
                    alt="Federal Housing Authority (FHA)"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-left text-[11px] leading-tight">
                  <span className="font-bold text-white block">Federal Housing Authority</span>
                  <span className="text-slate-400 text-[10px]">National Partner</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                <div className="relative h-10 w-24">
                  <Image
                    src="https://www.regis.com.ng/wp-content/uploads/2023/10/fha-mortgage-bank-logo.jpg"
                    alt="FHA Mortgage Bank"
                    fill
                    className="object-contain rounded"
                  />
                </div>
                <div className="text-left text-[11px] leading-tight">
                  <span className="font-bold text-white block">FHA Mortgage Bank</span>
                  <span className="text-slate-400 text-[10px]">Mortgage Financing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Info & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="pb-2">
              <RegisLogo variant="light" size="md" showSubtitle={true} href="/" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-white font-semibold">Regis Integrated Services Limited (RISL)</strong> is a premier Nigerian real estate development, design, and construction enterprise. For over a decade, we have delivered 1,000+ affordable luxurious housing units and serviced plots across Abuja and Nigeria.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>22 Koforidua Street, Wuse Zone 2, Near UBA Bank, Off Mambolo Street, Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+2348155555168" className="hover:text-white transition-colors">
                  +234 (0) 815 555 5168
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:info@regis.com.ng" className="hover:text-white transition-colors">
                  info@regis.com.ng
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Mon – Fri: 8:00 AM – 5:00 PM (West Africa Time)</span>
              </div>
            </div>

            {/* WhatsApp CTA & Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://wa.me/2348155555168?text=Hello%20Regis%20Integrated%20Services,%20I%20am%20inquiring%20about%20your%20properties"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com/regisintegrated"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="http://twitter.com/regis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all"
                  aria-label="Twitter / X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/regis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/regis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Regis Projects & Developments */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Featured Developments
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/projects" className="hover:text-amber-400 transition-colors font-medium">
                  Regis Royale Estate
                </Link>
              </li>
              <li>
                <Link href="/for-sale?state=Abuja&locality=Mbora" className="hover:text-white transition-colors">
                  FHA Golden Jubilee Estate (Mbora)
                </Link>
              </li>
              <li>
                <Link href="/for-sale?state=Abuja&locality=Guzape" className="hover:text-white transition-colors">
                  Guzape Luxury Terraces
                </Link>
              </li>
              <li>
                <Link href="/for-sale?type=land&state=Abuja&locality=Lugbe" className="hover:text-white transition-colors">
                  Lugbe Estate Serviced Land
                </Link>
              </li>
              <li>
                <Link href="/for-sale?type=land&state=Abuja&locality=Idu" className="hover:text-white transition-colors">
                  Idu Industrial Estate Land
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  All Projects & Site Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Building Types & Units */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Building Types
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/building-types" className="hover:text-white transition-colors">
                  6-Bedroom Luxury Terrace Duplex
                </Link>
              </li>
              <li>
                <Link href="/building-types" className="hover:text-white transition-colors">
                  5-Bedroom Semi-Detached Duplex
                </Link>
              </li>
              <li>
                <Link href="/building-types" className="hover:text-white transition-colors">
                  3-Bedroom Block of Flats
                </Link>
              </li>
              <li>
                <Link href="/building-types" className="hover:text-white transition-colors">
                  2-Bedroom Block of Flats
                </Link>
              </li>
              <li>
                <Link href="/building-types" className="hover:text-white transition-colors">
                  Custom Architectural Designs
                </Link>
              </li>
              <li>
                <Link href="/joint-venture" className="hover:text-white transition-colors">
                  Joint Venture Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate & Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Resources
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about-us" className="hover:text-amber-400 transition-colors font-medium">
                  About Regis Integrated Services
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  Contact & Inspection Booking
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Regis Blog & Building News
                </Link>
              </li>
              <li>
                <Link href="/safety-tips" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Buyer Safety Guidelines</span>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  Corporate Profile & Heritage
                </Link>
              </li>
              <li>
                <Link href="/requests/create" className="hover:text-white transition-colors">
                  Custom Housing Request
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-500 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Staff Login</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accreditation */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Regis Integrated Services Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact-us" className="hover:text-slate-300 transition-colors">
              Abuja Head Office
            </Link>
            <Link href="/admin/login" className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold text-amber-500/90">
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
