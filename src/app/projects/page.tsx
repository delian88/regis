import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RegisCTA } from '@/components/RegisCTA';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'Projects & Developments — Regis Integrated Services Limited',
  description:
    'Discover signature residential developments by Regis Integrated Services Limited: Regis Royale Estate, FHA Golden Jubilee Estate Mbora, Guzape luxury terraces, and serviced lands in Lugbe and Idu, Abuja.',
};

const DEVELOPMENTS = [
  {
    id: 'guzape-terrace',
    propertyId: 1001,
    title: '6-Bedroom Luxury Terrace Duplex with Basement',
    location: 'Plot 22 Cadastral Zone A09, Guzape District (Main), Abuja',
    price: '₦500,000,000',
    type: 'Luxury Residential',
    status: 'Selling Fast / Ongoing Construction',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg',
    features: [
      '6 En-suite Bedrooms + Penthouse Master Suite',
      'Private Walk-out Basement & Cinema / Entertainment Lounge',
      'Rooftop Panoramic Terrace overlooking Guzape Hills',
      'Elevator / Private Lift Shaft Provision',
      '2-Room Domestic Staff Quarters (BQ)',
      'Smart Home Automation & CCTV Infrastructure',
    ],
    slug: '6-bedroom-luxury-terrace-duplex-guzape-abuja',
  },
  {
    id: 'fha-mbora-duplex',
    propertyId: 1002,
    title: '5-Bedroom Semi-Detached Duplex',
    location: 'FHA Golden Jubilee Estate, Mbora District, Abuja',
    price: '₦120,000,000',
    type: 'Semi-Detached Duplex',
    status: 'Available / Partnered with FHA',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg',
    features: [
      '5 Spacious En-suite Bedrooms with Fitted Wardrobes',
      'Expansive Family Lounge on Upper Level',
      'Contemporary Fitted Kitchen with Heat Extractor',
      'Self-contained Maid’s Room / BQ',
      'Dedicated 4-Car Parking Bay',
      'Mortgage Facility available via FHA Mortgage Bank',
    ],
    slug: '5-bedroom-semi-detached-duplex-fha-golden-jubilee-estate-mbora-abuja',
  },
  {
    id: 'fha-mbora-flats',
    propertyId: 1003,
    title: '2 & 3-Bedroom Block of Flats',
    location: 'FHA Golden Jubilee Estate, Mbora District, Abuja',
    price: 'From ₦65,000,000 – ₦85,000,000',
    type: 'Block of Flats / Apartments',
    status: 'Available / High Rental Yield',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/JaysvilleInterior-Design-Architectural-Design.jpg',
    features: [
      '3-Bed Flat: ₦85M | 2-Bed Flat: ₦65M',
      'All Bedrooms En-suite with Modern Sanitary Wares',
      'Double Balcony with Serene Estate Views',
      'Perimeter Electric Fencing & Uniformed Security',
      '24/7 Estate Water Reticulation & Dedicated Transformer',
      'Federal Housing Authority (FHA) Verified Title',
    ],
    slug: '3-bedroom-block-of-flats-fha-golden-jubilee-estate-mbora-abuja',
  },
  {
    id: 'regis-royale',
    propertyId: 1005,
    title: 'Regis Royale Estate Signature Showcase',
    location: 'Serene Residential Zone, Abuja',
    price: '₦350,000,000',
    type: 'Master-Planned Gated Community',
    status: 'Showcase / Completed Units',
    image: 'https://www.regis.com.ng/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-26-at-16.42.39.jpeg',
    features: [
      'Master-planned architectural community layout',
      'Fully paved interlocked road network and drainage',
      'Solar street illumination & 24/7 access control gate',
      'Children’s play park & green recreation boulevard',
      'Immediate physical allocation upon verification',
    ],
    slug: 'regis-royale-estate-luxury-villa-abuja',
  },
  {
    id: 'lugbe-serviced-land',
    propertyId: 1006,
    title: 'Lugbe Estate Serviced Land (250 & 500 SQMs)',
    location: 'Lugbe 1 Extension (Airport Road Corridor), Abuja',
    price: '₦3,500,000 – ₦7,000,000',
    type: 'Sites & Services Plots',
    status: 'Instant Allocation',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/layer-6.jpg',
    features: [
      '500 SQM Plot: ₦7,000,000 (Ideal for 4-Bed Duplex)',
      '250 SQM Plot: ₦3,500,000 (Ideal for Semi-Detached / Terrace)',
      '100% Dry Table Land with zero flood risk',
      'Sites & services scheme with designated access roads',
      'Instant allocation with registered estate deeds',
    ],
    slug: 'lugbe-estate-land-500sqm-abuja',
  },
  {
    id: 'idu-serviced-land',
    propertyId: 1008,
    title: 'Idu Industrial Layout Serviced Land (250 & 500 SQMs)',
    location: 'Idu Industrial Area (Near Light Rail Terminal), Abuja',
    price: '₦3,500,000 – ₦7,000,000',
    type: 'Mixed Residential & Commercial Land',
    status: 'Instant Allocation',
    image: 'https://www.regis.com.ng/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-26-at-16.42.39-2.jpeg',
    features: [
      '500 SQM Plot: ₦7,000,000 | 250 SQM Plot: ₦3,500,000',
      'Rapidly appreciating corridor adjacent to train transit',
      'Suitable for multi-unit residential development or warehouse depot',
      'Perimeter cleared with ready site access',
      'Flexible installment payment plans available',
    ],
    slug: 'idu-estate-land-500sqm-abuja',
  },
];

export default function ProjectsPage() {
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
                'radial-gradient(60% 60% at 75% 15%, rgba(245,158,11,0.25), transparent 70%), radial-gradient(70% 70% at 20% 85%, rgba(220,38,38,0.25), transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider mb-4">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Regis Integrated Services Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
              Featured Projects & Developments
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Explore our landmark housing estates in Guzape, Mbora, and serviced land schemes across Abuja. Built with precision, registered titles, and mortgage bank backing.
            </p>
          </div>
        </div>

        {/* Developments List */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
            {DEVELOPMENTS.map((dev, idx) => (
              <div
                key={dev.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Photo */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                    <Image
                      src={dev.image}
                      alt={dev.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-amber-400 border border-white/10">
                        {dev.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-amber-500 text-slate-950 shadow-lg">
                        {dev.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className={`lg:col-span-7 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{dev.location}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {dev.title}
                  </h2>

                  <div className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    {dev.status}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {dev.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                    <Link
                      href={`/property/${dev.propertyId}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-105"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/2348155555168?text=Hello%20Regis%20Integrated%20Services,%20I%20am%20interested%20in%20inspecting%20${encodeURIComponent(
                        dev.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire via WhatsApp</span>
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
