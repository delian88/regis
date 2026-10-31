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
  Briefcase,
  PlusCircle,
  Megaphone,
  TrendingUp,
  Clock,
  PieChart,
  FileText,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { useCurrency, CURRENCIES, CurrencyCode } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';

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
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-md transition-colors">
      {/* Top Utility Bar matching regis.com.ng */}
      <div className="w-full bg-[#0B101E] text-slate-300 text-[0.75rem] py-1.5 px-4 sm:px-6 border-b border-slate-800/80">
        <div className="mx-auto max-w-content flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <span>Need Help? Call:</span>
              <a href="tel:+2348155555168" className="hover:underline text-white font-extrabold">+234 (0) 815 555 5168</a>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">22 Koforidua Street, Wuse Zone 2, Abuja</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/about-us" className="hover:text-amber-400 transition-colors">ABOUT US</Link>
            <Link href="/projects" className="hover:text-amber-400 transition-colors">PROJECTS</Link>
            <Link href="/blog" className="hover:text-amber-400 transition-colors">BLOG</Link>
            <Link href="/contact-us" className="text-amber-400 hover:text-amber-300 transition-colors">CONTACT US</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6">
        {/* Regis Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex items-center">
            {/* Regis Official Logo */}
            <div className="relative h-10 flex items-center">
              <img
                src="https://www.regis.com.ng/wp-content/uploads/2016/07/logoconstruction.png"
                alt="Regis Integrated Services Limited"
                className="h-9 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="ml-2 flex flex-col">
              <div className="flex items-center tracking-tight font-extrabold text-base leading-none text-[var(--foreground-strong)]">
                <span className="text-amber-500">REGIS</span>
                <span className="ml-1 text-[var(--foreground-strong)]">PROPERTIES</span>
              </div>
              <span className="text-[0.625rem] font-semibold text-[var(--foreground-muted)] tracking-wider uppercase mt-0.5">
                Integrated Services Ltd
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 lg:gap-1.5">
          <Link
            href="/"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/' ? 'text-red-600 font-bold bg-[var(--surface-1)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            Home
          </Link>

          <Link
            href="/about-us"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/about-us' ? 'text-red-600 font-bold bg-[var(--surface-1)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            About Us
          </Link>

          <Link
            href="/projects"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/projects' ? 'text-red-600 font-bold bg-[var(--surface-1)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            Projects
          </Link>

          {/* Building Types / Buy Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('buy')}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeDropdown === 'buy' ? 'text-[var(--foreground-strong)] bg-[var(--surface-1)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
              }`}
            >
              Building Types
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'buy' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'buy' && (
              <div className="absolute left-0 mt-1.5 w-72 rounded-xl bg-[var(--card)] p-2 shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150 z-50">
                <Link href="/for-sale/houses" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Home className="w-4 h-4 text-amber-500" />
                  Houses & Duplexes
                </Link>
                <Link href="/for-sale/flats-apartments" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Layers className="w-4 h-4 text-amber-500" />
                  Blocks of Flats
                </Link>
                <Link href="/for-sale/land" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  Estate Lands (Sites & Services)
                </Link>
                <Link href="/for-sale/commercial" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Building className="w-4 h-4 text-amber-500" />
                  Commercial Property
                </Link>

                <div className="my-1.5 border-t border-[var(--border)]" />
                <p className="px-3 pt-1 pb-1 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                  Key Locations
                </p>
                <div className="grid grid-cols-2 gap-1 px-1">
                  <Link href="/for-sale?locality=Mbora" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                    Mbora (FHA)
                  </Link>
                  <Link href="/for-sale?locality=Guzape" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                    Guzape District
                  </Link>
                  <Link href="/for-sale?locality=Lugbe" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                    Lugbe
                  </Link>
                  <Link href="/for-sale?locality=Idu" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                    Idu Industrial
                  </Link>
                </div>

                <div className="my-1.5 border-t border-[var(--border)]" />
                <Link href="/for-sale" className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                  <span>View all properties for sale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>


          {/* Rent Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('rent')}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeDropdown === 'rent' ? 'text-[var(--foreground-strong)] bg-[var(--surface-1)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
              }`}
            >
              Rent
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'rent' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'rent' && (
              <div className="absolute left-0 mt-1.5 w-72 rounded-xl bg-[var(--card)] p-2 shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150 z-50">
                <Link href="/for-rent/houses" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Home className="w-4 h-4 text-red-500" />
                  Houses
                </Link>
                <Link href="/for-rent/flats-apartments" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Layers className="w-4 h-4 text-red-500" />
                  Flats / Apartments
                </Link>
                <Link href="/for-rent/shortlet" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Clock className="w-4 h-4 text-red-500" />
                  Short Let Apartments
                </Link>
                <Link href="/for-rent/commercial" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Building className="w-4 h-4 text-red-500" />
                  Commercial Property
                </Link>

                <div className="my-1.5 border-t border-[var(--border)]" />
                <p className="px-3 pt-1 pb-1 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                  Browse by location
                </p>
                <div className="grid grid-cols-2 gap-1 px-1">
                  <Link href="/for-rent?state=Abuja" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                    Abuja
                  </Link>
                  <Link href="/for-rent?state=Lagos" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                    Lagos
                  </Link>
                  <Link href="/for-rent?state=Ogun" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                    Ogun
                  </Link>
                  <Link href="/for-rent?state=Rivers" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                    Rivers
                  </Link>
                </div>

                <div className="my-1.5 border-t border-[var(--border)]" />
                <Link href="/for-rent" className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                  <span>View all properties for rent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Companies Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('companies')}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeDropdown === 'companies' ? 'text-[var(--foreground-strong)] bg-[var(--surface-1)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
              }`}
            >
              Companies
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'companies' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'companies' && (
              <div className="absolute left-0 mt-1.5 w-60 rounded-xl bg-[var(--card)] p-2 shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150 z-50">
                <Link href="/agents" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Briefcase className="w-4 h-4 text-[var(--foreground-muted)]" />
                  Estate agents
                </Link>
                <Link href="/developers" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Building className="w-4 h-4 text-[var(--foreground-muted)]" />
                  Property developers
                </Link>
              </div>
            )}
          </div>

          {/* Requests Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('requests')}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeDropdown === 'requests' ? 'text-[var(--foreground-strong)] bg-[var(--surface-1)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
              }`}
            >
              Requests
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'requests' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'requests' && (
              <div className="absolute left-0 mt-1.5 w-60 rounded-xl bg-[var(--card)] p-2 shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150 z-50">
                <Link href="/requests/create" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <PlusCircle className="w-4 h-4 text-[var(--foreground-muted)]" />
                  Post a request
                </Link>
                <Link href="/requests" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-1)]">
                  <Megaphone className="w-4 h-4 text-[var(--foreground-muted)]" />
                  View property requests
                </Link>
              </div>
            )}
          </div>

          {/* Market Trends Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('trends')}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                activeDropdown === 'trends' ? 'text-[var(--foreground-strong)] bg-[var(--surface-1)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
              }`}
            >
              Market trends
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'trends' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'trends' && (
              <div className="absolute right-0 mt-1.5 w-[560px] rounded-xl bg-[var(--card)] p-4 shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="px-2 pb-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                      Prices & Demand
                    </p>
                    <Link href="/market-trends" className="flex items-start gap-3 rounded-lg p-2 hover:bg-[var(--surface-1)] transition-colors">
                      <div className="size-8 rounded-lg bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground-strong)]">
                          Rent & Price Index
                          <span className="bg-red-500/10 text-red-600 text-[0.625rem] px-1.5 py-0.5 rounded-full font-bold">New</span>
                        </div>
                        <p className="text-[0.75rem] text-[var(--foreground-muted)] mt-0.5">Monthly rents & prices by area</p>
                      </div>
                    </Link>

                    <Link href="/market-trends" className="flex items-start gap-3 rounded-lg p-2 hover:bg-[var(--surface-1)] transition-colors mt-1">
                      <div className="size-8 rounded-lg bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center shrink-0">
                        <PieChart className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--foreground-strong)]">Demand vs Supply</span>
                        <p className="text-[0.75rem] text-[var(--foreground-muted)] mt-0.5">Where searches outrun listings</p>
                      </div>
                    </Link>
                  </div>

                  <div>
                    <p className="px-2 pb-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                      Reports & Speed
                    </p>
                    <Link href="/market-trends" className="flex items-start gap-3 rounded-lg p-2 hover:bg-[var(--surface-1)] transition-colors">
                      <div className="size-8 rounded-lg bg-purple-100 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground-strong)]">
                          Time to Let & Sell
                          <span className="bg-red-500/10 text-red-600 text-[0.625rem] px-1.5 py-0.5 rounded-full font-bold">New</span>
                        </div>
                        <p className="text-[0.75rem] text-[var(--foreground-muted)] mt-0.5">How long homes take to rent</p>
                      </div>
                    </Link>

                    <Link href="/market-reports/q4-2026" className="flex items-start gap-3 rounded-lg p-2 hover:bg-[var(--surface-1)] transition-colors mt-1">
                      <div className="size-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--foreground-strong)]">Quarterly Reports</span>
                        <p className="text-[0.75rem] text-[var(--foreground-muted)] mt-0.5">Each quarter&apos;s market in one report</p>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[var(--border)] flex justify-between items-center px-2">
                  <span className="text-xs text-[var(--foreground-muted)]">Live Nigerian real estate market analytics</span>
                  <Link href="/market-trends" className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1">
                    All market data <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/blog' ? 'text-amber-500 font-bold bg-[var(--surface-1)]' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contact-us"
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
              pathname === '/contact-us' ? 'text-amber-500 font-bold bg-[var(--surface-1)]' : 'text-amber-500 hover:text-amber-400 hover:bg-[var(--surface-1)]'
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Right Action Tools: Currency, Theme, Auth, Post Property */}
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
              <Globe className="w-3.5 h-3.5 text-red-600" />
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
                  const active = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs sm:text-sm font-medium transition-colors ${
                        active ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 font-bold' : 'text-[var(--foreground)] hover:bg-[var(--surface-1)]'
                      }`}
                    >
                      <span>
                        {item.symbol} · {item.code}
                      </span>
                      {active && <Check className="w-4 h-4 text-red-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Mode Switcher */}
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
              {isDark ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
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
                    mode === 'light' ? 'bg-[var(--surface-1)] text-red-600 font-bold' : 'text-[var(--foreground)] hover:bg-[var(--surface-1)]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                  {mode === 'light' && <Check className="w-3.5 h-3.5 ml-auto text-red-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('dark');
                    setThemeOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold ${
                    mode === 'dark' ? 'bg-[var(--surface-1)] text-red-600 font-bold' : 'text-[var(--foreground)] hover:bg-[var(--surface-1)]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                  {mode === 'dark' && <Check className="w-3.5 h-3.5 ml-auto text-red-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('system');
                    setThemeOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold ${
                    mode === 'system' ? 'bg-[var(--surface-1)] text-red-600 font-bold' : 'text-[var(--foreground)] hover:bg-[var(--surface-1)]'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>System</span>
                  {mode === 'system' && <Check className="w-3.5 h-3.5 ml-auto text-red-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Sign In & Admin */}
          <Link
            href="/admin"
            className="hidden md:inline-flex items-center gap-1.5 font-bold rounded-pill text-xs px-3.5 h-9 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/30 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Admin CMS</span>
          </Link>
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center justify-center font-bold rounded-pill text-xs sm:text-sm px-4 h-9 text-[var(--foreground)] hover:bg-[var(--surface-1)] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center justify-center font-bold rounded-pill text-xs sm:text-sm px-4 h-9 bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm transition-colors"
          >
            Post Property
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-[var(--card)] p-5 shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <img
                  src="https://www.regis.com.ng/wp-content/uploads/2016/07/logoconstruction.png"
                  alt="Regis Integrated Services"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-extrabold text-xs text-[var(--foreground-strong)]">Regis Integrated Services</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-full hover:bg-[var(--surface-1)] text-[var(--foreground-muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex flex-col gap-2.5 py-4 text-sm font-semibold">
              <Link href="/" className="flex items-center justify-between py-2 border-b border-[var(--border)]" onClick={() => setMobileMenuOpen(false)}>
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link href="/about-us" className="flex items-center justify-between py-2 border-b border-[var(--border)]" onClick={() => setMobileMenuOpen(false)}>
                <span>About Regis Integrated Services</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link href="/projects" className="flex items-center justify-between py-2 border-b border-[var(--border)]" onClick={() => setMobileMenuOpen(false)}>
                <span>Projects & Developments</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link href="/building-types" className="flex items-center justify-between py-2 border-b border-[var(--border)]" onClick={() => setMobileMenuOpen(false)}>
                <span>Building Types & Prototypes</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link href="/for-sale" className="flex items-center justify-between py-2 border-b border-[var(--border)]" onClick={() => setMobileMenuOpen(false)}>
                <span>Properties for Sale</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link href="/for-sale?type=land" className="flex items-center justify-between py-2 border-b border-[var(--border)]" onClick={() => setMobileMenuOpen(false)}>
                <span>Serviced Estate Lands</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link href="/blog" className="flex items-center justify-between py-2 border-b border-[var(--border)]" onClick={() => setMobileMenuOpen(false)}>
                <span>Blog & Insights</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
              <Link href="/contact-us" className="flex items-center justify-between py-2 border-b border-[var(--border)] text-amber-500 font-bold" onClick={() => setMobileMenuOpen(false)}>
                <span>Contact & Book Inspection</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </Link>
            </div>

            {/* Drawer Currency & Auth */}
            <div className="mt-auto pt-4 border-t border-[var(--border)] space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-1)]">
                <span className="text-xs font-bold text-[var(--foreground-muted)] uppercase">Currency</span>
                <div className="flex gap-1">
                  {(['NGN', 'USD', 'GBP'] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`px-2 py-1 text-xs rounded-md font-bold ${
                        currency === c ? 'bg-red-600 text-white' : 'text-[var(--foreground)] hover:bg-[var(--card)]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 text-center py-2.5 rounded-lg border border-[var(--border)] text-xs font-bold text-[var(--foreground)] hover:bg-[var(--surface-1)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="flex-1 text-center py-2.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
