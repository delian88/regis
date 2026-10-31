import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RegisCTA } from '@/components/RegisCTA';
import {
  Building2,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Bed,
  Bath,
  Maximize2,
  Compass,
} from 'lucide-react';

export const metadata = {
  title: 'Building Types & Architectural Units — Regis Integrated Services Limited',
  description:
    'Explore our diverse architectural prototypes and building types: 6-Bedroom Terrace Duplexes, 5-Bedroom Semi-Detached Duplexes, and 2 & 3-Bedroom Luxury Flats in Abuja.',
};

const BUILDING_TYPES = [
  {
    title: '6-Bedroom Luxury Terrace Duplex with Basement',
    category: 'Ultra-Luxury Terrace Villa',
    location: 'Guzape District, Abuja',
    startingPrice: '₦500,000,000',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg',
    beds: '6 Bedrooms',
    baths: '7 Bathrooms',
    area: '650 SQM GFA',
    description:
      'Engineered for discerning executives and diaspora buyers. Features a subterranean walkout basement for cinema/gym, multi-level elevator shaft, panoramic rooftop lounge, and 2-room staff quarters.',
    features: [
      'Multi-level residential layout with private elevator shaft',
      'Walkout basement configured for home cinema or private gym',
      'Penthouse master suite with walk-in closet & jacuzzi',
      'Rooftop outdoor sky terrace with hill views',
      'Automated smart home lighting and climate control',
      '2-Room self-contained domestic staff quarters (BQ)',
    ],
    slug: '6-bedroom-luxury-terrace-duplex-guzape-abuja',
  },
  {
    title: '5-Bedroom Semi-Detached Duplex',
    category: 'Family Residence',
    location: 'FHA Golden Jubilee Estate, Mbora, Abuja',
    startingPrice: '₦120,000,000',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg',
    beds: '5 Bedrooms',
    baths: '6 Bathrooms',
    area: '420 SQM GFA',
    description:
      'A refined contemporary semi-detached duplex designed for expanding families. Dual reception halls, ultra-modern kitchen with quartz countertops, and dedicated compound parking for 4 vehicles.',
    features: [
      'Generous ante-room leading to double-height main living hall',
      'Spacious upper-level private family lounge',
      'Fully fitted kitchen with heat extractor & pantry',
      'En-suite maid’s room / BQ',
      'Private paved compound accommodating up to 4 SUVs',
      'Mortgage eligibility through FHA Mortgage Bank',
    ],
    slug: '5-bedroom-semi-detached-duplex-fha-golden-jubilee-estate-mbora-abuja',
  },
  {
    title: '3-Bedroom Luxury Block of Flats',
    category: 'Premium Family Apartment',
    location: 'FHA Golden Jubilee Estate, Mbora, Abuja',
    startingPrice: '₦85,000,000',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/JaysvilleInterior-Design-Architectural-Design.jpg',
    beds: '3 Bedrooms',
    baths: '4 Bathrooms',
    area: '210 SQM GFA',
    description:
      'Masterfully planned 3-bedroom flat within a secured residential block. Open-plan living and dining, large perimeter windows providing natural ventilation, and superior Italian tile finishes.',
    features: [
      'All bedrooms en-suite with walk-in showers',
      'Dual balconies offering cross-ventilation and estate views',
      'Dedicated staircase and service entry',
      'Separate electric and water utility meters',
      'Dedicated 2-car covered parking bays per unit',
      'Projected annual rental yield: ₦5M - ₦6.5M/year',
    ],
    slug: '3-bedroom-block-of-flats-fha-golden-jubilee-estate-mbora-abuja',
  },
  {
    title: '2-Bedroom Luxury Block of Flats',
    category: 'Executive Apartment',
    location: 'FHA Golden Jubilee Estate, Mbora, Abuja',
    startingPrice: '₦65,000,000',
    image: 'https://www.regis.com.ng/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-26-at-16.42.39-1.jpeg',
    beds: '2 Bedrooms',
    baths: '3 Bathrooms',
    area: '150 SQM GFA',
    description:
      'Ideal for young professionals, starter families, or diaspora investors seeking high-performing short-let or long-term rental income in Abuja’s prime Mbora district.',
    features: [
      'Compact, highly functional floor layout',
      'Both bedrooms en-suite with guest powder room',
      'Modern open kitchen concept',
      'Intercom connectivity to estate main security gate',
      'Low service charge and minimal ongoing maintenance',
      'Fast capital value growth in Mbora district',
    ],
    slug: '2-bedroom-block-of-flats-fha-golden-jubilee-estate-mbora-abuja',
  },
];

export default function BuildingTypesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-amber-500 selection:text-slate-950">
      <Header />

      <main className="flex-1">
        {/* Header Hero */}
        <div className="relative py-20 bg-[#070B16] text-white border-b border-white/10 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(60% 60% at 80% 20%, rgba(245,158,11,0.25), transparent 70%), radial-gradient(70% 70% at 20% 80%, rgba(220,38,38,0.25), transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider mb-4">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Architectural Specifications</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
              Building Types & Design Prototypes
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Every prototype engineered by Regis Integrated Services Limited is optimized for thermal comfort, structural longevity, privacy, and maximum usable floor space.
            </p>
          </div>
        </div>

        {/* Building Prototypes Grid */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
            {BUILDING_TYPES.map((bt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Photo */}
                <div className="lg:col-span-5">
                  <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                    <Image
                      src={bt.image}
                      alt={bt.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-amber-400 border border-white/10">
                        {bt.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="px-4 py-1.5 rounded-xl text-xs font-black bg-amber-500 text-slate-950 shadow-xl">
                        {bt.startingPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    {bt.location}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {bt.title}
                  </h2>

                  {/* Spec Badges */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      <Bed className="w-4 h-4 text-amber-400" />
                      <span>{bt.beds}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      <Bath className="w-4 h-4 text-amber-400" />
                      <span>{bt.baths}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      <Maximize2 className="w-4 h-4 text-amber-400" />
                      <span>{bt.area}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {bt.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {bt.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-white/10">
                    <Link
                      href={`/properties/${bt.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-105"
                    >
                      <span>Explore Unit Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={`https://wa.me/2348155555168?text=Hello%20Regis%20Integrated%20Services,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(
                        bt.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                    <a
                      href="tel:+2348155555168"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call +234 815 555 5168</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global CTA */}
        <RegisCTA />
      </main>

      <Footer />
    </div>
  );
}
