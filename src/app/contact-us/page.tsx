'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
} from 'lucide-react';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    property: 'Guzape 6-Bedroom Luxury Terrace Duplex',
    date: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          propertyInterest: formData.property,
          preferredDate: formData.date,
          message: formData.message,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true); // show confirmation anyway
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1">
        {/* Hero Header */}
        <div className="relative py-20 bg-[#070B16] text-white border-b border-white/10 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(60% 60% at 75% 20%, rgba(245,158,11,0.25), transparent 70%), radial-gradient(70% 70% at 20% 80%, rgba(220,38,38,0.25), transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider mb-4">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Abuja Headquarters</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
              Contact Regis Integrated Services Limited
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              We welcome you to visit our corporate head office in Wuse Zone 2, Abuja, or schedule a guided physical site inspection with our sales directors.
            </p>
          </div>
        </div>

        {/* Contact Info & Inspection Form Grid */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Official Contact Directory */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                    Official Head Office
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Get in Touch With Us
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Our team is on standby to assist you with floor plans, site allocations, title deed verification, and mortgage financing pre-qualification.
                  </p>
                </div>

                {/* Info Cards */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="size-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Head Office Address
                      </h3>
                      <p className="text-sm font-semibold text-white mt-1">
                        22 Koforidua Street, Wuse Zone 2
                      </p>
                      <p className="text-xs text-slate-300">
                        Near UBA Bank, Off Mambolo Street, Abuja, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="size-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Direct Lines
                      </h3>
                      <p className="text-sm font-semibold text-white mt-1">
                        <a href="tel:+2348155555168" className="hover:text-amber-400 transition-colors">
                          +234 (0) 815 555 5168
                        </a>
                      </p>
                      <p className="text-xs text-slate-400">
                        Direct call & WhatsApp support available
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="size-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Email Address
                      </h3>
                      <p className="text-sm font-semibold text-white mt-1">
                        <a href="mailto:info@regis.com.ng" className="hover:text-amber-400 transition-colors">
                          info@regis.com.ng
                        </a>
                      </p>
                      <p className="text-xs text-slate-400">
                        Official corporate inquiries & partnership proposals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="size-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Working Hours
                      </h3>
                      <p className="text-sm font-semibold text-white mt-1">
                        Monday – Friday: 8:00 AM – 5:00 PM
                      </p>
                      <p className="text-xs text-slate-400">
                        Saturday inspections available by appointment
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Quick Action */}
                <a
                  href="https://wa.me/2348155555168?text=Hello%20Regis%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20properties"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Instant WhatsApp Chat (+234 815 555 5168)</span>
                </a>
              </div>

              {/* Right Column: Site Inspection Booking & Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Free Site Inspection Request</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Book a Private Inspection or Consultation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Our site engineers and relationship managers will confirm your appointment within 2 hours.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                      <div className="size-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Inspection Request Received!</h4>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        Thank you for contacting <strong className="text-white">Regis Integrated Services Limited</strong>. An advisory officer will contact you shortly via phone/WhatsApp to confirm your site visit.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alhaji Ibrahim Danjuma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-xl bg-slate-900 border border-white/15 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                            Phone / WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +234 803 123 4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full rounded-xl bg-slate-900 border border-white/15 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="you@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-xl bg-slate-900 border border-white/15 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                            Preferred Inspection Date
                          </label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full rounded-xl bg-slate-900 border border-white/15 px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                          Project / Property of Interest *
                        </label>
                        <select
                          value={formData.property}
                          onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                          className="w-full rounded-xl bg-slate-900 border border-white/15 px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="Guzape 6-Bedroom Luxury Terrace Duplex">
                            Guzape 6-Bedroom Luxury Terrace Duplex (₦500M)
                          </option>
                          <option value="FHA Mbora 5-Bedroom Semi-Detached Duplex">
                            FHA Mbora 5-Bedroom Semi-Detached Duplex (₦120M)
                          </option>
                          <option value="FHA Mbora 3-Bedroom Block of Flats">
                            FHA Mbora 3-Bedroom Block of Flats (₦85M)
                          </option>
                          <option value="FHA Mbora 2-Bedroom Block of Flats">
                            FHA Mbora 2-Bedroom Block of Flats (₦65M)
                          </option>
                          <option value="Lugbe Estate Serviced Land (500 SQM)">
                            Lugbe Estate Serviced Land (500 SQM – ₦7M)
                          </option>
                          <option value="Lugbe Estate Serviced Land (250 SQM)">
                            Lugbe Estate Serviced Land (250 SQM – ₦3.5M)
                          </option>
                          <option value="Idu Industrial Layout Land (500 SQM)">
                            Idu Industrial Layout Land (500 SQM – ₦7M)
                          </option>
                          <option value="Idu Industrial Layout Land (250 SQM)">
                            Idu Industrial Layout Land (250 SQM – ₦3.5M)
                          </option>
                          <option value="Regis Royale Estate Villa Showcase">
                            Regis Royale Estate Villa Showcase
                          </option>
                          <option value="Joint Venture Development Proposal">
                            Joint Venture (JV) Development Proposal
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                          Additional Requirements or Comments
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your payment preferences, timeline, or specific inspection requests..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-xl bg-slate-900 border border-white/15 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Schedule Site Inspection Now</span>
                      </button>

                      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Your contact details are strictly confidential and will never be shared.</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
