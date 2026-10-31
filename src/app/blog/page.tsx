import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RegisCTA } from '@/components/RegisCTA';
import { Calendar, User, ArrowRight, BookOpen, Tag } from 'lucide-react';

export const metadata = {
  title: 'Blog & Real Estate Insights — Regis Integrated Services Limited',
  description:
    'Read the latest construction updates, building type guides, mortgage news, and real estate market analysis from the engineers at Regis Integrated Services Limited.',
};

const ARTICLES = [
  {
    title: 'How to Own a Home at FHA Golden Jubilee Estate Mbora, Abuja',
    slug: 'how-to-own-a-home-fha-golden-jubilee-estate-mbora',
    category: 'Affordable Housing & Mortgages',
    date: 'October 24, 2024',
    author: 'Regis Advisory Editorial',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg',
    excerpt:
      'A comprehensive step-by-step breakdown on acquiring 2-bedroom flats (₦65M), 3-bedroom flats (₦85M), or 5-bedroom duplexes (₦120M) at FHA Golden Jubilee Estate Mbora with single-digit financing from FHA Mortgage Bank.',
  },
  {
    title: 'Why Guzape District Has Become Abuja’s Leading Luxury Living Hub',
    slug: 'why-guzape-district-abuja-luxury-hub',
    category: 'Luxury Living & Investment',
    date: 'August 18, 2024',
    author: 'Architectural Director',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg',
    excerpt:
      'Guzape’s dramatic hill topography, central connectivity to Asokoro, and how our Plot 22 Cadastral Zone A09 6-Bedroom Luxury Terrace with walkout basement delivers unprecedented panoramic views.',
  },
  {
    title: 'Sites & Services Scheme: Why Lugbe & Idu Serviced Land Outperforms Unplanned Plots',
    slug: 'sites-and-services-land-lugbe-idu-abuja',
    category: 'Land & Investment',
    date: 'July 11, 2024',
    author: 'Site Engineering Team',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/layer-6.jpg',
    excerpt:
      'Why buying 250 SQM or 500 SQM serviced estate plots in Lugbe Airport corridor and Idu Industrial zone provides title security, access roads, instant physical allocation, and rapid value appreciation.',
  },
  {
    title: 'Modern Architectural Trends Shaping Contemporary Nigerian Homes',
    slug: 'modern-architectural-trends-nigerian-homes',
    category: 'Architecture & Design',
    date: 'June 04, 2024',
    author: 'Head of Spatial Design',
    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/JaysvilleInterior-Design-Architectural-Design.jpg',
    excerpt:
      'Exploring double-volume living areas, cross-ventilation engineering, rooftop outdoor terraces, and smart home automation adapted for Nigerian climatic conditions.',
  },
  {
    title: 'Views & Sights: Regis Royale Estate Infrastructure & Delivery Milestone',
    slug: 'regis-royale-estate-infrastructure-milestone',
    category: 'Project Delivery',
    date: 'May 15, 2024',
    author: 'Project Delivery Director',
    image: 'https://www.regis.com.ng/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-26-at-16.42.39.jpeg',
    excerpt:
      'On-site photo update of internal interlocked road networks, solar lighting, dedicated transformer installation, and homeowner occupancy handover at Regis Royale Estate.',
  },
];

export default function BlogPage() {
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
                'radial-gradient(60% 60% at 75% 20%, rgba(245,158,11,0.25), transparent 70%), radial-gradient(70% 70% at 20% 80%, rgba(220,38,38,0.25), transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Regis Knowledge & Insights</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
              Blog & Construction Updates
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Official publications, mortgage guides, building prototype analyses, and site milestone reports directly from Regis Integrated Services Limited.
            </p>
          </div>
        </div>

        {/* Articles List */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARTICLES.map((art, idx) => (
                <article
                  key={idx}
                  className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/75 backdrop-blur-md text-amber-300 border border-white/10">
                          {art.category}
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{art.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          <span>{art.author}</span>
                        </div>
                      </div>

                      <h2 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors leading-snug">
                        {art.title}
                      </h2>

                      <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/projects`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors pt-4 border-t border-white/10 w-full"
                    >
                      <span>Read Full Report & Developments</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <RegisCTA />
      </main>

      <Footer />
    </div>
  );
}
