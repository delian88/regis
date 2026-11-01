'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Globe,
  Sun,
  Moon,
  Laptop,
  Check,
  Building,
  Home,
  Layers,
  MapPin,
  CalendarCheck,
  ArrowRight,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
  Handshake,
} from 'lucide-react';
import { useCurrency, CURRENCIES, CurrencyCode } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';
import { RegisLogo } from './RegisLogo';

export function Header() {
  const { currency, setCurrency } = useCurrency();
  const { mode, setMode, isDark } = useTheme();
  const pathname = usePathname();

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setCurrencyOpen(false);
        setThemeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
    setCurrencyOpen(false);
    setThemeOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-md transition-colors"
    >
      {/* Top Corporate Utility Bar */}
      <div className="w-full bg-[#070B16] text-slate-300 text-[0.75rem] py-1.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <span>Direct Sales & Inquiries:</span>
              <a href="tel:+2348155555168" className="hover:underline text-white font-extrabold">
                +234 (0) 815 555 5168
              </a>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden lg:inline">
              Headquarters: 22 Koforidua Street, Wuse Zone 2, Abuja
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/about-us" className="hover:text-amber-400 transition-colors">
              ABOUT REGIS
            </Link>
            <Link href="/projects" className="hover:text-amber-400 transition-colors">
              PORTFOLIO
            </Link>
            <Link href="/blog" className="hover:text-amber-400 transition-colors hidden sm:inline">
              INSIGHTS
            </Link>
            <Link href="/contact-us" className="text-amber-400 hover:text-amber-300 transition-colors">
              BOOK INSPECTION
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 py-2">
        {/* Regis Full Name Logo */}
        <RegisLogo size="md" showSubtitle={true} href="/" />

        {/* Desktop Corporate Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          <Link
            href="/"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/'
                ? 'text-amber-500 font-bold bg-[var(--surface-1)]'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            Home
          </Link>

          <Link
            href="/about-us"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/about-us'
                ? 'text-amber-500 font-bold bg-[var(--surface-1)]'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            About Us
          </Link>

          {/* Developments Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('developments')}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeDropdown === 'developments'
                  ? 'text-amber-500 bg-[var(--surface-1)]'
                  : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
              }`}
            >
              Developments
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'developments' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {activeDropdown === 'developments' && (
              <div className="absolute left-0 mt-1.5 w-80 rounded-xl bg-[var(--card)] p-2.5 shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="px-3 py-1.5 mb-1 text-[0.6875rem] font-bold uppercase tracking-wider text-amber-500">
                  Regis Exclusive Portfolio
                </div>

                <Link
                  href="/for-sale/houses"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]"
                >
                  <Home className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <div className="font-bold">Luxury Terraces & Duplexes</div>
                    <p className="text-[11px] text-[var(--foreground-muted)]">
                      Guzape 6-Bed Terraces & Mbora Duplexes
                    </p>
                  </div>
                </Link>

                <Link
                  href="/for-sale/land"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]"
                >
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <div className="font-bold">Serviced Estate Lands</div>
                    <p className="text-[11px] text-[var(--foreground-muted)]">
                      Lugbe & Idu Sites & Services Schemes
                    </p>
                  </div>
                </Link>

                <Link
                  href="/for-sale/flats-apartments"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]"
                >
                  <Layers className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <div className="font-bold">Luxury Blocks of Flats</div>
                    <p className="text-[11px] text-[var(--foreground-muted)]">
                      FHA Golden Jubilee 2 & 3 Bedroom Units
                    </p>
                  </div>
                </Link>

                <Link
                  href="/for-sale/commercial"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]"
                >
                  <Building className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <div className="font-bold">Commercial & Mixed-Use</div>
                    <p className="text-[11px] text-[var(--foreground-muted)]">
                      Idu Industrial & Prime Urban Hubs
                    </p>
                  </div>
                </Link>

                <div className="my-1.5 border-t border-[var(--border)]" />
                <Link
                  href="/for-sale"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold text-amber-600 hover:bg-amber-500/10"
                >
                  <span>Explore all Regis listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/building-types"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/building-types'
                ? 'text-amber-500 font-bold bg-[var(--surface-1)]'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            Building Types
          </Link>

          <Link
            href="/projects"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/projects'
                ? 'text-amber-500 font-bold bg-[var(--surface-1)]'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            Turnkey Projects
          </Link>

          <Link
            href="/joint-venture"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/joint-venture'
                ? 'text-amber-500 font-bold bg-[var(--surface-1)]'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            Joint Ventures
          </Link>

          <Link
            href="/blog"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/blog'
                ? 'text-amber-500 font-bold bg-[var(--surface-1)]'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contact-us"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/contact-us'
                ? 'text-amber-500 font-bold bg-[var(--surface-1)]'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setCurrencyOpen(!currencyOpen);
                setThemeOpen(false);
                setActiveDropdown(null);
              }}
              className="flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs sm:text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--surface-1)] border border-[var(--border)] transition-colors"
              title="Display Currency"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-[var(--foreground-muted)]" />
            </button>

            {currencyOpen && (
              <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-[var(--card)] p-1.5 shadow-2xl border border-[var(--border)] z-50">
                <p className="px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                  Select Currency
                </p>
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const item = CURRENCIES[code];
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                        currency === code
                          ? 'bg-amber-500/10 text-amber-500 font-bold'
                          : 'text-[var(--foreground)] hover:bg-[var(--surface-1)]'
                      }`}
                    >
                      <span>
                        {item.name} ({item.symbol})
                      </span>
                      {currency === code && <Check className="w-3.5 h-3.5 text-amber-500" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setThemeOpen(!themeOpen);
                setCurrencyOpen(false);
                setActiveDropdown(null);
              }}
              className="inline-flex size-9 items-center justify-center rounded-full text-[var(--foreground)] hover:bg-[var(--surface-1)] border border-[var(--border)] transition-colors"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Moon className="w-4 h-4 text-amber-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            {themeOpen && (
              <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-[var(--card)] p-1 shadow-2xl border border-[var(--border)] z-50">
                <button
                  type="button"
                  onClick={() => {
                    setMode('light');
                    setThemeOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold ${
                    mode === 'light'
                      ? 'bg-[var(--surface-1)] text-amber-500 font-bold'
                      : 'text-[var(--foreground)] hover:bg-[var(--surface-1)]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                  {mode === 'light' && <Check className="w-3.5 h-3.5 ml-auto text-amber-500" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('dark');
                    setThemeOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold ${
                    mode === 'dark'
                      ? 'bg-[var(--surface-1)] text-amber-500 font-bold'
                      : 'text-[var(--foreground)] hover:bg-[var(--surface-1)]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                  {mode === 'dark' && <Check className="w-3.5 h-3.5 ml-auto text-amber-500" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('system');
                    setThemeOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold ${
                    mode === 'system'
                      ? 'bg-[var(--surface-1)] text-amber-500 font-bold'
                      : 'text-[var(--foreground)] hover:bg-[var(--surface-1)]'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>System</span>
                  {mode === 'system' && <Check className="w-3.5 h-3.5 ml-auto text-amber-500" />}
                </button>
              </div>
            )}
          </div>

          {/* Admin CMS Portal Link for Regis Staff */}
          <Link
            href="/admin"
            className="hidden md:inline-flex items-center gap-1.5 font-bold rounded-full text-xs px-3.5 h-9 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/30 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Admin CMS</span>
          </Link>

          {/* Primary CTA: Book Site Inspection */}
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 justify-center font-bold rounded-full text-xs sm:text-sm px-4 sm:px-5 h-9 sm:h-10 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Inspection</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex size-9 items-center justify-center rounded-lg text-[var(--foreground)] hover:bg-[var(--surface-1)] xl:hidden border border-[var(--border)] ml-1"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex xl:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-[var(--card)] p-5 shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <RegisLogo size="sm" showSubtitle={false} href="/" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-full hover:bg-[var(--surface-1)] text-[var(--foreground-muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex flex-col gap-2 py-4 text-sm font-semibold">
              <Link
                href="/"
                className="flex items-center justify-between py-2 border-b border-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link
                href="/about-us"
                className="flex items-center justify-between py-2 border-b border-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>About Regis Integrated Services</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link
                href="/for-sale/houses"
                className="flex items-center justify-between py-2 border-b border-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Luxury Terraces & Duplexes</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link
                href="/for-sale/land"
                className="flex items-center justify-between py-2 border-b border-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Serviced Estate Lands (Lugbe & Idu)</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link
                href="/building-types"
                className="flex items-center justify-between py-2 border-b border-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Building Types & Prototypes</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link
                href="/projects"
                className="flex items-center justify-between py-2 border-b border-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Turnkey Construction & Projects</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link
                href="/joint-venture"
                className="flex items-center justify-between py-2 border-b border-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Joint Ventures & Land Partnerships</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link
                href="/blog"
                className="flex items-center justify-between py-2 border-b border-[var(--border)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Real Estate Insights & Blog</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link
                href="/contact-us"
                className="flex items-center justify-between py-2 border-b border-[var(--border)] text-amber-500 font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Book Site Inspection</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link
                href="/admin"
                className="flex items-center justify-between py-2 border-b border-[var(--border)] text-slate-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Management CMS Portal</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Drawer Currency & Hotline */}
            <div className="mt-auto pt-4 border-t border-[var(--border)] space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-1)]">
                <span className="text-xs font-bold text-[var(--foreground-muted)] uppercase">
                  Currency
                </span>
                <div className="flex gap-1">
                  {(['NGN', 'USD', 'GBP'] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`px-2 py-1 text-xs rounded-md font-bold ${
                        currency === c
                          ? 'bg-amber-500 text-slate-950'
                          : 'text-[var(--foreground)] hover:bg-[var(--card)]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="tel:+2348155555168"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call +234 815 555 5168</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
