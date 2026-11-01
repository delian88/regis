'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Compass, ShieldCheck } from 'lucide-react';
import { SiteContentMap } from '@/db/site-content';

interface RegisPillarsProps {
  content?: SiteContentMap['homepage_pillars'];
}

export function RegisPillars({ content }: RegisPillarsProps) {
  const pillars = content?.pillars || [
    {
      id: 'pillar-1',
      title: 'LUXURIOUS HOMES IN A SERENE COMMUNITY',
      tag: 'Affordable Luxury',
      image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg',
      description:
        'We build master-planned residences in prime Abuja locations that blend sophisticated aesthetics, peaceful green landscapes, 24/7 security, and exceptional community living.',
      link: '/projects',
    },
    {
      id: 'pillar-2',
      title: 'STATE OF THE ART CONSTRUCTION & PROJECT MANAGEMENT',
      tag: 'Structural Integrity',
      image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg',
      description:
        'From foundation laying to turnkey delivery, our veteran structural engineers oversee civil engineering, materials testing, site safety, and schedule precision.',
      link: '/about-us',
    },
    {
      id: 'pillar-3',
      title: 'MODERN ARCHITECTURAL DESIGNS',
      tag: 'Bespoke Design',
      image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/JaysvilleInterior-Design-Architectural-Design.jpg',
      description:
        'Bespoke architectural layouts, panoramic terraces, double-volume living spaces, and ergonomic interior arrangements tailor-made for contemporary lifestyle demands.',
      link: '/building-types',
    },
  ];

  const tag = content?.tag || 'The Regis Standard of Excellence';
  const title = content?.title || 'Built on Integrity, Engineered for Generations';
  const subtitle =
    content?.subtitle ||
    'Regis Integrated Services Limited combines forward-thinking architecture with rigorous engineering standards to develop signature properties that appreciate across time.';

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#070B16] via-[#0B132B] to-[#070B16] text-white relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/25 text-amber-300 mb-4 tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{tag}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id || idx}
              className="group relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-1 border border-white/10 shadow-2xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="rounded-xl overflow-hidden bg-slate-900 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 tracking-wider uppercase shadow-md">
                    {pillar.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-amber-400 transition-colors uppercase leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <Link
                    href={pillar.link || '/projects'}
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 group-hover:text-amber-300 pt-2"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
