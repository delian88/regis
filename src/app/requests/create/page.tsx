'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ClipboardList, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export default function CreatePropertyRequestPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'rent',
    propertyType: 'flats',
    state: 'Lagos',
    locality: 'Lekki Phase 1',
    minPrice: '',
    maxPrice: '',
    bedrooms: '3',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit request. Please try again.');
      }

      setSuccess(true);
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
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 mb-2">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>FREE FOR PROPERTY SEEKERS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground-strong)] tracking-tight">
              Post a Property Request
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[var(--foreground-muted)]">
              Can&apos;t find what you are looking for? Let over 15,000 verified estate agents and property owners find it for you.
            </p>
          </div>

          {success ? (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">
                Property Request Submitted!
              </h2>
              <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400">
                Your requirement has been broadcast to accredited estate agents in {formData.state}. Interested agents with matching properties will contact you directly via phone or WhatsApp.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <span>Return to Homepage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md space-y-5">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
                    I am looking to *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] font-semibold"
                  >
                    <option value="rent">Rent a Property</option>
                    <option value="sale">Buy a Property</option>
                    <option value="shortlet">Rent for Short Let</option>
                    <option value="jv">Joint Venture Development</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] font-semibold"
                  >
                    <option value="flats">Flat / Apartment</option>
                    <option value="houses">House / Duplex</option>
                    <option value="land">Land / Plot</option>
                    <option value="commercial">Commercial / Office</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
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
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
                    Preferred Area / Neighborhood *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lekki Phase 1, Ikeja GRA, Maitama"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
                    Bedrooms
                  </label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                  >
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5">5+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
                    Min Budget (₦)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 2,000,000"
                    value={formData.minPrice}
                    onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
                    Max Budget (₦)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 5,000,000"
                    value={formData.maxPrice}
                    onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1">
                  Additional Notes & Specific Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Must have dedicated parking, 24/7 power, swimming pool, gated compound..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                />
              </div>

              <div className="pt-3 border-t border-[var(--border)] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground-strong)]">
                  Your Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users className="w-4 h-4 text-red-500" />
                  <span>Shared with verified agents only</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Post Request'}
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
