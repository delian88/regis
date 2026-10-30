'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Heart,
  Share2,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Phone,
  MessageSquare,
  Building,
  CheckCircle2,
  Calculator,
  ChevronRight,
  ShieldAlert,
  Send,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { PropertyCard } from '@/components/PropertyCard';
import { SeedProperty, SeedAgent } from '@/db/seed-data';

interface PropertyDetailsClientProps {
  property: SeedProperty & { agent?: SeedAgent };
  relatedProperties: SeedProperty[];
}

export function PropertyDetailsClient({ property, relatedProperties }: PropertyDetailsClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hello, I am interested in "${property.title}" listed on Nigeria Property Centre. Please contact me with more information.`,
  });

  const [loanYears, setLoanYears] = useState(15);
  const [interestRate, setInterestRate] = useState(18); // Typical Nigerian mortgage rate

  const { formatPrice } = useCurrency();
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(property.id);

  // Mortgage calculation
  const principal = property.price * 0.8; // 20% down payment
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanYears * 12;
  const monthlyRepayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property on Nigeria Property Centre: ${property.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Listing URL copied to clipboard!');
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-[var(--foreground-muted)] mb-4 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href={`/for-${property.category}`} className="hover:text-red-600 capitalize">
          For {property.category === 'shortlet' ? 'Short Let' : property.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href={`/for-${property.category}?state=${encodeURIComponent(property.state)}`} className="hover:text-red-600">
          {property.state}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate max-w-[200px] text-[var(--foreground-strong)]">{property.locality}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Gallery, Details, Amenities, Mortgage, Description */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Photo Gallery */}
          <div className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-[var(--border)] shadow-sm">
            {/* Active Large Image */}
            <div className="relative aspect-[16/10] w-full bg-slate-950">
              <Image
                src={images[activeImageIndex]}
                alt={property.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />

              {/* Verified Pill */}
              {property.isVerified && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Property</span>
                </div>
              )}

              {/* Photo Counter */}
              <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails row */}
            {images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-[var(--card)] border-t border-[var(--border)] scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-16 w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-red-600 scale-95' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Heading, Price, Actions */}
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 mb-2">
                  {property.propertyType} for {property.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-[var(--foreground-strong)] tracking-tight">
                  {property.title}
                </h1>
                <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-[var(--foreground-muted)]">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{property.streetAddress || `${property.locality}, ${property.state}`}</span>
                </div>
              </div>

              {/* Price & Favorite */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                <div className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
                  {formatPrice(property.price, property.period)}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(property.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      saved
                        ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/40 dark:border-red-800'
                        : 'border-[var(--border)] text-[var(--foreground-muted)] hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current text-red-600' : ''}`} />
                    <span>{saved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)] transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Key Specs Bar */}
            <div className="mt-6 pt-6 border-t border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)]">
                <Bed className="w-5 h-5 mx-auto text-red-500 mb-1" />
                <p className="text-base font-extrabold text-[var(--foreground-strong)]">{property.bedrooms || '—'}</p>
                <p className="text-[0.6875rem] font-semibold text-[var(--foreground-muted)]">Bedrooms</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)]">
                <Bath className="w-5 h-5 mx-auto text-red-500 mb-1" />
                <p className="text-base font-extrabold text-[var(--foreground-strong)]">{property.bathrooms || '—'}</p>
                <p className="text-[0.6875rem] font-semibold text-[var(--foreground-muted)]">Bathrooms</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)]">
                <Maximize2 className="w-5 h-5 mx-auto text-red-500 mb-1" />
                <p className="text-base font-extrabold text-[var(--foreground-strong)]">{property.plotSizeSqm ? `${property.plotSizeSqm} sqm` : 'Standard'}</p>
                <p className="text-[0.6875rem] font-semibold text-[var(--foreground-muted)]">Total Area</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[var(--border)]">
                <Building className="w-5 h-5 mx-auto text-red-500 mb-1" />
                <p className="text-base font-extrabold text-[var(--foreground-strong)] capitalize">{property.propertyType}</p>
                <p className="text-[0.6875rem] font-semibold text-[var(--foreground-muted)]">Property Type</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
            <h2 className="text-lg font-bold text-[var(--foreground-strong)] mb-4">
              Property Description
            </h2>
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed whitespace-pre-line">
              {property.description}
            </div>
          </div>

          {/* Amenities & Features */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
              <h2 className="text-lg font-bold text-[var(--foreground-strong)] mb-4">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground-strong)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mortgage Estimator */}
          {property.category === 'sale' && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-red-50/30 dark:from-slate-900 dark:to-slate-950 border border-[var(--border)] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-[var(--foreground-strong)]">
                  Mortgage & Payment Estimator
                </h2>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] mb-6">
                Based on standard 20% down payment ({formatPrice(property.price * 0.2)}) and 80% loan financing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
                    Loan Term: {loanYears} Years
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full accent-red-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
                    Interest Rate: {interestRate}%
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={28}
                    step={0.5}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-red-600"
                  />
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border)] text-center sm:text-right">
                  <span className="text-[0.6875rem] font-bold text-[var(--foreground-muted)] block">
                    Estimated Monthly Payment
                  </span>
                  <span className="text-xl font-black text-red-600">
                    {formatPrice(Math.round(monthlyRepayment))} / mo
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Contact Agent, Inquiry Form, Safety Warning */}
        <div className="lg:col-span-4 space-y-6">
          {/* Agent Card */}
          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm sticky top-24">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)] mb-4">
              Listed by Verified Agent
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="relative size-14 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border shrink-0">
                <Image
                  src={property.agent?.logoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                  alt={property.agent?.name || 'Agent'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm text-[var(--foreground-strong)] truncate">
                  {property.agent?.name || 'Accredited Property Consultant'}
                </h4>
                {property.agent?.companyName && (
                  <p className="text-xs text-[var(--foreground-muted)] truncate">
                    {property.agent.companyName}
                  </p>
                )}
                <div className="flex items-center gap-1 text-[0.6875rem] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Partner</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <a
                href={`tel:${property.agent?.phone || '+2348031234567'}`}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Agent</span>
              </a>

              <a
                href={`https://wa.me/${property.agent?.whatsapp?.replace(/[^0-9]/g, '') || '2348031234567'}?text=Hello%20${encodeURIComponent(property.agent?.name || '')},%20I%20am%20interested%20in%20"${encodeURIComponent(property.title)}"%20on%20Nigeria%20Property%20Centre.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Inquiry Form */}
            <div className="pt-4 border-t border-[var(--border)]">
              <h4 className="text-xs font-bold text-[var(--foreground-strong)] mb-3">
                Send an Enquiry
              </h4>

              {inquirySent ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    Enquiry Sent Successfully!
                  </p>
                  <p className="text-[0.6875rem] text-emerald-600 dark:text-emerald-400 mt-0.5">
                    The agent has received your details and will call or message you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-1 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-1 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number (e.g. 08012345678)"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-1 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      required
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-1 focus:ring-red-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Enquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Safety Warning */}
            <div className="mt-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[0.6875rem] text-amber-800 dark:text-amber-300">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Inspection Advisory</span>
              </div>
              <p>
                Do not pay any inspection fee or deposit before physically verifying the property and confirming the agent&apos;s identity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[var(--border)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground-strong)] mb-6">
            Similar Properties in {property.state}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProperties.map((rel) => (
              <PropertyCard key={rel.id} property={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
