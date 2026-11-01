'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Building2, PlusCircle, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdvertiseListPropertyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'sale',
    propertyType: 'houses',
    state: 'Lagos',
    locality: 'Lekki Phase 1',
    streetAddress: '',
    price: '',
    period: 'total',
    bedrooms: '4',
    bathrooms: '4',
    plotSizeSqm: '500',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          plotSizeSqm: Number(formData.plotSizeSqm),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create property listing. Please try again.');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/for-sale');
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 mb-3 border border-amber-500/20">
              <Building2 className="w-3.5 h-3.5" />
              <span>PARTNER WITH REGIS INTEGRATED SERVICES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground-strong)] tracking-tight">
              Submit Property & Land for Joint Venture Development
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[var(--foreground-muted)] max-w-xl mx-auto">
              Do you own titled land or prime property in Abuja, Lagos, or key urban centres? Partner with Regis Integrated Services Limited for turnkey construction, luxury estate joint ventures, or outright acquisition.
            </p>
          </div>

          {/* Success Notification */}
          {success ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">
                Joint Venture Proposal Received!
              </h2>
              <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 max-w-md mx-auto">
                Your land / property details have been submitted directly to Regis Integrated Services Limited. Our land acquisition and engineering directorate will review your title documents and contact you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md space-y-6">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Listing Category & Type */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground-strong)] border-b border-[var(--border)] pb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-red-600" />
                  <span>1. Basic Property Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Transaction Type *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] font-semibold"
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                      <option value="shortlet">For Short Let</option>
                      <option value="jv">Joint Venture</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Property Category *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] font-semibold"
                    >
                      <option value="houses">Houses & Duplexes</option>
                      <option value="flats">Flats & Apartments</option>
                      <option value="land">Land / Plots</option>
                      <option value="commercial">Commercial & Office</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Luxury 4 Bedroom Semi-Detached Duplex with BQ"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Step 2: Location */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground-strong)] border-b border-[var(--border)] pb-2">
                  2. Location
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] font-semibold"
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja (FCT)</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Ogun">Ogun</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Enugu">Enugu</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Locality / Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lekki Phase 1, Ikoyi, Maitama"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                    Street Address (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Admiralty Way, Lekki Phase 1"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                  />
                </div>
              </div>

              {/* Step 3: Pricing & Features */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground-strong)] border-b border-[var(--border)] pb-2">
                  3. Pricing & Dimensions
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Price in Naira (₦) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 150000000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] font-bold text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Payment Frequency
                    </label>
                    <select
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    >
                      <option value="total">Total Price (Outright Sale)</option>
                      <option value="year">Per Year (Rent)</option>
                      <option value="month">Per Month</option>
                      <option value="day">Per Night (Shortlet)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Area (sqm)
                    </label>
                    <input
                      type="number"
                      value={formData.plotSizeSqm}
                      onChange={(e) => setFormData({ ...formData, plotSizeSqm: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide detailed description: finishing, security, title documents (C of O, Governor's Consent), facilities, neighborhood..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                    Primary Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                  />
                </div>
              </div>

              {/* Step 4: Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground-strong)] border-b border-[var(--border)] pb-2">
                  4. Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Your Name / Agency *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Deluxe Homes Ltd"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08012345678"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="agent@company.com"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Direct Developer Evaluation (CAC & COREN Certified)</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  <span>{submitting ? 'Submitting...' : 'Submit Proposal to Regis Directorate'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
