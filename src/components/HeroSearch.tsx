'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Tag,
  Key,
  Calendar,
  Briefcase,
  Search,
  ChevronDown,
  SlidersHorizontal,
  Check,
  ShieldCheck,
  X,
  Sparkles
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const NIGERIAN_LOCATIONS = [
  { name: 'Lekki, Lagos', state: 'Lagos', locality: 'Lekki' },
  { name: 'Ikoyi, Lagos', state: 'Lagos', locality: 'Ikoyi' },
  { name: 'Victoria Island (VI), Lagos', state: 'Lagos', locality: 'Victoria Island' },
  { name: 'Ajah, Lagos', state: 'Lagos', locality: 'Ajah' },
  { name: 'Ikeja, Lagos', state: 'Lagos', locality: 'Ikeja' },
  { name: 'Maitama, Abuja', state: 'Abuja', locality: 'Maitama' },
  { name: 'Guzape District, Abuja', state: 'Abuja', locality: 'Guzape' },
  { name: 'Life Camp, Abuja', state: 'Abuja', locality: 'Life Camp' },
  { name: 'Gwarinpa, Abuja', state: 'Abuja', locality: 'Gwarinpa' },
  { name: 'Port Harcourt, Rivers', state: 'Rivers', locality: 'Port Harcourt' },
  { name: 'Ibadan, Oyo', state: 'Oyo', locality: 'Ibadan' },
  { name: 'Mowe Ofada, Ogun', state: 'Ogun', locality: 'Mowe Ofada' },
];

const PROPERTY_TYPES = [
  {
    id: 'flats',
    name: 'Flat / Apartment',
    subtypes: ['Mini Flat (Room and Parlour)', 'Self Contain (Single Rooms)', 'Penthouse', 'Standard Apartment'],
  },
  {
    id: 'houses',
    name: 'House',
    subtypes: ['Detached Duplex', 'Semi-detached Duplex', 'Terraced Duplex', 'Detached Bungalow', 'Semi-detached Bungalow', 'Block of Flats'],
  },
  {
    id: 'land',
    name: 'Land',
    subtypes: ['Residential Land', 'Commercial Land', 'Industrial Land', 'Mixed-use Land', 'Farm Land'],
  },
  {
    id: 'commercial',
    name: 'Commercial Property',
    subtypes: ['Office Space', 'Shop', 'Warehouse', 'Plaza / Mall', 'Hotel / Guest House', 'Filling Station', 'School', 'Factory'],
  },
];

const PRICE_OPTIONS = [
  { value: '0', label: 'No limit' },
  { value: '500000', label: '₦500,000' },
  { value: '1000000', label: '₦1 Million' },
  { value: '2500000', label: '₦2.5 Million' },
  { value: '5000000', label: '₦5 Million' },
  { value: '10000000', label: '₦10 Million' },
  { value: '25000000', label: '₦25 Million' },
  { value: '50000000', label: '₦50 Million' },
  { value: '100000000', label: '₦100 Million' },
  { value: '250000000', label: '₦250 Million' },
  { value: '500000000', label: '₦500 Million' },
  { value: '1000000000', label: '₦1 Billion' },
];

const AMENITIES_LIST = [
  '24/7 power supply',
  'Standby generator',
  'Swimming pool',
  'Gym',
  'Fitted kitchen',
  'Air conditioning',
  'CCTV surveillance',
  'Security gate',
  'Elevator',
  'Boys\' quarters (BQ)',
  'Car park',
  'High-speed internet / WiFi',
  'Water heater',
  'POP ceiling',
  'Smart home',
  'Cinema room',
  'Jacuzzi / bathtub',
];

export function HeroSearch() {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  // Search filter states
  const [category, setCategory] = useState<'sale' | 'rent' | 'shortlet' | 'jv'>('sale');
  const [location, setLocation] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubtype, setSelectedSubtype] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [furnished, setFurnished] = useState<string>('any');
  const [serviced, setServiced] = useState<string>('any');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [keywords, setKeywords] = useState('');

  // UI state for dropdowns & accordion
  const [locationFocused, setLocationFocused] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [bedsDropdownOpen, setBedsDropdownOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [amenitiesModalOpen, setAmenitiesModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close open dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setLocationFocused(false);
        setTypeDropdownOpen(false);
        setPriceDropdownOpen(false);
        setBedsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter location suggestions
  const filteredLocations = NIGERIAN_LOCATIONS.filter((item) =>
    item.name.toLowerCase().includes(location.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (location) params.set('location', location);
    if (selectedType && selectedType !== 'all') params.set('type', selectedType);
    if (selectedSubtype) params.set('subtype', selectedSubtype);
    if (minPrice > 0) params.set('minPrice', String(minPrice));
    if (maxPrice > 0) params.set('maxPrice', String(maxPrice));
    if (bedrooms > 0) params.set('bedrooms', String(bedrooms));
    if (furnished !== 'any') params.set('furnished', furnished);
    if (serviced !== 'any') params.set('serviced', serviced);
    if (keywords) params.set('keywords', keywords);

    const targetRoute = category === 'sale' ? '/for-sale' : category === 'rent' ? '/for-rent' : category === 'shortlet' ? '/short-let' : '/for-sale';
    router.push(`${targetRoute}?${params.toString()}`);
  };

  const getPriceSummary = () => {
    if (!minPrice && !maxPrice) return 'Any price';
    if (minPrice && !maxPrice) return `From ${formatPrice(minPrice)}`;
    if (!minPrice && maxPrice) return `Up to ${formatPrice(maxPrice)}`;
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  const getTypeSummary = () => {
    if (selectedSubtype) return selectedSubtype;
    if (selectedType === 'flats') return 'Flats / Apartments';
    if (selectedType === 'houses') return 'Houses';
    if (selectedType === 'land') return 'Land';
    if (selectedType === 'commercial') return 'Commercial';
    return 'Any type';
  };

  const toggleAmenity = (name: string) => {
    if (selectedAmenities.includes(name)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== name));
    } else {
      setSelectedAmenities([...selectedAmenities, name]);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#070B16] text-white py-12 lg:py-20 border-b border-white/10">
      {/* Signature Red & Indigo Glow Gradients */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(60% 60% at 75% 5%, rgba(224,69,69,0.7), transparent 70%), radial-gradient(70% 70% at 10% 95%, rgba(45,53,102,0.6), transparent 70%)',
        }}
      />

      <div className="relative mx-auto flex max-w-content flex-col items-center gap-6 px-4 text-center sm:px-6 lg:gap-7">
        {/* Marketplace Trust Badge */}
        <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-red-400" />
          Nigeria&apos;s leading property marketplace
        </span>

        {/* Main Headline */}
        <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
          Find the right property
        </h1>
        <p className="max-w-xl text-sm text-slate-300 sm:text-base">
          Search thousands of homes, land and commercial property for sale and rent — across every major city in Nigeria.
        </p>

        {/* The Signature Search Panel Card */}
        <div ref={containerRef} className="w-full max-w-[1080px] text-left mt-2">
          <form
            onSubmit={handleSearch}
            className="w-full rounded-2xl border border-white/15 bg-[#0F1626]/90 p-4 sm:p-5 shadow-2xl backdrop-blur-md"
          >
            {/* Category Filter Pills: Buy, Rent, Shortlet, Joint Venture */}
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Search category">
              <button
                type="button"
                onClick={() => setCategory('sale')}
                className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  category === 'sale' ? 'bg-red-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                Buy
              </button>
              <button
                type="button"
                onClick={() => setCategory('rent')}
                className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  category === 'rent' ? 'bg-red-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                Rent
              </button>
              <button
                type="button"
                onClick={() => setCategory('shortlet')}
                className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  category === 'shortlet' ? 'bg-red-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Shortlet
              </button>
              <button
                type="button"
                onClick={() => setCategory('jv')}
                className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                  category === 'jv' ? 'bg-red-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Joint Venture (JV)</span>
              </button>
            </div>

            {/* Core Search Controls Bar */}
            <div className="mt-3.5 flex flex-col gap-2 rounded-xl bg-[var(--card)] text-[var(--foreground)] p-1.5 shadow-sm lg:flex-row lg:items-stretch lg:gap-0 lg:divide-x lg:divide-[var(--border)]">
              {/* Location Input with Auto-complete */}
              <div className="relative flex-1 px-4 py-2.5">
                <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => {
                    setLocationFocused(true);
                    setTypeDropdownOpen(false);
                    setPriceDropdownOpen(false);
                    setBedsDropdownOpen(false);
                  }}
                  placeholder="state, locality or area"
                  className="w-full bg-transparent text-sm font-bold text-[var(--foreground-strong)] placeholder:font-normal placeholder:text-[var(--foreground-muted)] focus:outline-none"
                />

                {/* Suggestions Dropdown */}
                {locationFocused && (
                  <div className="absolute left-0 top-full mt-2 w-full min-w-[280px] rounded-xl bg-[var(--card)] p-2 shadow-2xl border border-[var(--border)] z-50 animate-in fade-in zoom-in-95 duration-100">
                    <p className="px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                      Popular Locations in Nigeria
                    </p>
                    <div className="max-h-60 overflow-y-auto space-y-0.5">
                      {filteredLocations.map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => {
                            setLocation(item.locality);
                            setLocationFocused(false);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs sm:text-sm font-medium hover:bg-[var(--surface-1)] transition-colors"
                        >
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-xs text-[var(--foreground-muted)]">{item.state}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Property Type Dropdown */}
              <div className="relative px-4 py-2.5 lg:w-56">
                <button
                  type="button"
                  onClick={() => {
                    setTypeDropdownOpen(!typeDropdownOpen);
                    setLocationFocused(false);
                    setPriceDropdownOpen(false);
                    setBedsDropdownOpen(false);
                  }}
                  className="w-full text-left focus:outline-none"
                >
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                    Property Type
                  </span>
                  <div className="mt-0.5 flex items-center justify-between gap-1 text-sm font-bold text-[var(--foreground-strong)]">
                    <span className="truncate">{getTypeSummary()}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--foreground-muted)] shrink-0" />
                  </div>
                </button>

                {typeDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-80 lg:w-96 rounded-xl bg-[var(--card)] p-3 shadow-2xl border border-[var(--border)] z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                      <span className="text-xs font-bold uppercase text-[var(--foreground-muted)]">Select Type</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedType('all');
                          setSelectedSubtype('');
                          setTypeDropdownOpen(false);
                        }}
                        className="text-xs font-bold text-red-600 hover:underline"
                      >
                        Reset
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-3 pt-2">
                      {PROPERTY_TYPES.map((group) => (
                        <div key={group.id} className="space-y-1">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedType(group.id);
                              setSelectedSubtype('');
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-bold ${
                              selectedType === group.id && !selectedSubtype ? 'bg-red-50 text-red-600 dark:bg-red-950/40' : 'hover:bg-[var(--surface-1)] text-[var(--foreground-strong)]'
                            }`}
                          >
                            <span>{group.name}</span>
                            {selectedType === group.id && !selectedSubtype && <Check className="w-3.5 h-3.5 text-red-600" />}
                          </button>
                          <div className="grid grid-cols-1 gap-0.5 pl-3">
                            {group.subtypes.map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => {
                                  setSelectedType(group.id);
                                  setSelectedSubtype(st);
                                  setTypeDropdownOpen(false);
                                }}
                                className={`text-left text-xs py-1 px-2 rounded-md transition-colors ${
                                  selectedSubtype === st ? 'bg-red-100 text-red-700 font-bold dark:bg-red-900/40 dark:text-red-300' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] hover:bg-[var(--surface-1)]'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Range Dropdown */}
              <div className="relative px-4 py-2.5 lg:w-48">
                <button
                  type="button"
                  onClick={() => {
                    setPriceDropdownOpen(!priceDropdownOpen);
                    setLocationFocused(false);
                    setTypeDropdownOpen(false);
                    setBedsDropdownOpen(false);
                  }}
                  className="w-full text-left focus:outline-none"
                >
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                    Price Range
                  </span>
                  <div className="mt-0.5 flex items-center justify-between gap-1 text-sm font-bold text-[var(--foreground-strong)]">
                    <span className="truncate">{getPriceSummary()}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--foreground-muted)] shrink-0" />
                  </div>
                </button>

                {priceDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-80 rounded-xl bg-[var(--card)] p-4 shadow-2xl border border-[var(--border)] z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[0.6875rem] font-bold uppercase text-[var(--foreground-muted)] mb-1">
                          Min Price
                        </label>
                        <select
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          {PRICE_OPTIONS.map((opt) => (
                            <option key={`min-${opt.value}`} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[0.6875rem] font-bold uppercase text-[var(--foreground-muted)] mb-1">
                          Max Price
                        </label>
                        <select
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          {PRICE_OPTIONS.map((opt) => (
                            <option key={`max-${opt.value}`} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Popular Range Presets */}
                    <div className="mt-4 pt-3 border-t border-[var(--border)]">
                      <p className="text-[0.6875rem] font-bold uppercase text-[var(--foreground-muted)] mb-1.5">
                        Popular Ranges
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setMinPrice(0);
                            setMaxPrice(25000000);
                          }}
                          className="px-2.5 py-1 text-xs rounded-full bg-[var(--surface-1)] hover:bg-red-50 hover:text-red-600 font-semibold transition-colors"
                        >
                          Under ₦25M
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMinPrice(25000000);
                            setMaxPrice(50000000);
                          }}
                          className="px-2.5 py-1 text-xs rounded-full bg-[var(--surface-1)] hover:bg-red-50 hover:text-red-600 font-semibold transition-colors"
                        >
                          ₦25M - ₦50M
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMinPrice(50000000);
                            setMaxPrice(100000000);
                          }}
                          className="px-2.5 py-1 text-xs rounded-full bg-[var(--surface-1)] hover:bg-red-50 hover:text-red-600 font-semibold transition-colors"
                        >
                          ₦50M - ₦100M
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMinPrice(100000000);
                            setMaxPrice(250000000);
                          }}
                          className="px-2.5 py-1 text-xs rounded-full bg-[var(--surface-1)] hover:bg-red-50 hover:text-red-600 font-semibold transition-colors"
                        >
                          ₦100M - ₦250M
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMinPrice(250000000);
                            setMaxPrice(0);
                          }}
                          className="px-2.5 py-1 text-xs rounded-full bg-[var(--surface-1)] hover:bg-red-50 hover:text-red-600 font-semibold transition-colors"
                        >
                          Over ₦250M
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[var(--border)] flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setMinPrice(0);
                          setMaxPrice(0);
                        }}
                        className="text-xs font-bold text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)]"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriceDropdownOpen(false)}
                        className="px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bedrooms Dropdown */}
              <div className="relative px-4 py-2.5 lg:w-44">
                <button
                  type="button"
                  onClick={() => {
                    setBedsDropdownOpen(!bedsDropdownOpen);
                    setLocationFocused(false);
                    setTypeDropdownOpen(false);
                    setPriceDropdownOpen(false);
                  }}
                  className="w-full text-left focus:outline-none"
                >
                  <span className="block text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--foreground-muted)]">
                    Bedrooms
                  </span>
                  <div className="mt-0.5 flex items-center justify-between gap-1 text-sm font-bold text-[var(--foreground-strong)]">
                    <span className="truncate">{bedrooms > 0 ? `${bedrooms} beds` : 'Any beds'}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--foreground-muted)] shrink-0" />
                  </div>
                </button>

                {bedsDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-[var(--card)] p-3 shadow-2xl border border-[var(--border)] z-50 animate-in fade-in zoom-in-95 duration-100">
                    <p className="text-[0.6875rem] font-bold uppercase text-[var(--foreground-muted)] mb-2">
                      Minimum Bedrooms
                    </p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setBedrooms(num);
                            setBedsDropdownOpen(false);
                          }}
                          className={`py-2 text-xs font-bold rounded-lg transition-colors ${
                            bedrooms === num
                              ? 'bg-red-600 text-white shadow-sm'
                              : 'bg-[var(--surface-1)] text-[var(--foreground-strong)] hover:bg-[var(--surface-2)]'
                          }`}
                        >
                          {num === 0 ? 'Any' : num === 6 ? '6+' : num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Submit Action Button */}
              <div className="p-1 lg:flex lg:items-center">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-red-700 active:scale-98 transition-all disabled:opacity-75"
                >
                  <Search className="w-4 h-4" />
                  <span>{isSearching ? 'Searching...' : 'Search'}</span>
                </button>
              </div>
            </div>

            {/* Advanced Filters Accordion Toggle */}
            <div className="mt-3.5 pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-400" />
                <span>More search options</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>

              {selectedAmenities.length > 0 && (
                <span className="text-[0.6875rem] font-bold text-red-400">
                  {selectedAmenities.length} amenities selected
                </span>
              )}
            </div>

            {/* Expanded Advanced Filters Panel */}
            {showAdvanced && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-slate-200">
                {/* Furnishing */}
                <div>
                  <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Furnishing
                  </label>
                  <select
                    value={furnished}
                    onChange={(e) => setFurnished(e.target.value)}
                    className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="any" className="bg-[#0F1626]">Any</option>
                    <option value="furnished" className="bg-[#0F1626]">Furnished</option>
                    <option value="unfurnished" className="bg-[#0F1626]">Unfurnished</option>
                  </select>
                </div>

                {/* Serviced */}
                <div>
                  <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Serviced
                  </label>
                  <select
                    value={serviced}
                    onChange={(e) => setServiced(e.target.value)}
                    className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="any" className="bg-[#0F1626]">Any</option>
                    <option value="serviced" className="bg-[#0F1626]">Serviced Only</option>
                  </select>
                </div>

                {/* Amenities Trigger */}
                <div>
                  <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Amenities
                  </label>
                  <button
                    type="button"
                    onClick={() => setAmenitiesModalOpen(true)}
                    className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs font-semibold text-left text-white hover:bg-white/15 flex items-center justify-between"
                  >
                    <span className="truncate">
                      {selectedAmenities.length > 0 ? `${selectedAmenities.length} selected` : 'Select amenities'}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>

                {/* Keywords input */}
                <div>
                  <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. pool, sea view, waterfront"
                    className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-xs font-semibold text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Amenities Selection Modal */}
      {amenitiesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[var(--card)] text-[var(--foreground)] p-6 shadow-2xl border border-[var(--border)] max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div>
                <h3 className="text-base font-bold text-[var(--foreground-strong)]">Property Amenities</h3>
                <p className="text-xs text-[var(--foreground-muted)]">Select features you require in a property</p>
              </div>
              <button
                type="button"
                onClick={() => setAmenitiesModalOpen(false)}
                className="size-8 rounded-full flex items-center justify-center hover:bg-[var(--surface-1)] text-[var(--foreground-muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AMENITIES_LIST.map((item) => {
                const selected = selectedAmenities.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleAmenity(item)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-left border transition-colors ${
                      selected
                        ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 font-bold'
                        : 'border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-1)]'
                    }`}
                  >
                    <div
                      className={`size-4 rounded flex items-center justify-center border ${
                        selected ? 'bg-red-600 border-red-600 text-white' : 'border-[var(--border-strong)]'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" />}
                    </div>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center">
              <button
                type="button"
                onClick={() => setSelectedAmenities([])}
                className="text-xs font-bold text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)]"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setAmenitiesModalOpen(false)}
                className="px-5 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-sm"
              >
                Done ({selectedAmenities.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
