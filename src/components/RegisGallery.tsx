'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, MapPin, CheckCircle2, X, ZoomIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SiteContentMap } from '@/db/site-content';

interface RegisGalleryProps {
  content?: SiteContentMap['homepage_gallery'];
}

export function RegisGallery({ content }: RegisGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const tag = content?.tag || 'REAL-TIME ONSITE PROGRESS & PANORAMAS';
  const title = content?.title || 'VIEWS AND SIGHTS OF REGIS ROYALE ESTATE';
  const subtitle =
    content?.subtitle ||
    'Authentic on-site photography showcasing structural finishing, paved infrastructure, and serenity at Regis Royale Estate.';

  const items = content?.items || [
    {
      title: 'Regis Royale Estate — Exterior Elevation',
      category: 'Exterior',
      image: 'https://www.regis.com.ng/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-26-at-16.42.39.jpeg',
      desc: 'Modern facade featuring premium stonework, expansive glass balconies, and perimeter security.',
    },
    {
      title: 'Regis Royale Estate — Paved Access Driveway',
      category: 'Infrastructure',
      image: 'https://www.regis.com.ng/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-26-at-16.42.39-1.jpeg',
      desc: 'Interlocked internal roads, street lighting, underground drainage, and manicured landscaping.',
    },
    {
      title: 'Regis Royale Estate — Contemporary Villa Architecture',
      category: 'Architecture',
      image: 'https://www.regis.com.ng/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-26-at-16.42.39-2.jpeg',
      desc: 'Geometric luxury architecture with ambient exterior lighting and private parking bay.',
    },
    {
      title: 'Regis Royale Estate — Neighborhood Environment',
      category: 'Community',
      image: 'https://www.regis.com.ng/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-26-at-16.42.39-3.jpeg',
      desc: 'Serene, secure, and peaceful master-planned residential enclave in Abuja.',
    },
  ];

  return (
    <section className="py-20 bg-[#070B16] text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider mb-3">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>{tag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item.image)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer shadow-xl hover:border-amber-500/50 transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider shadow">
                {item.category}
              </div>

              {/* Zoom Indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-sm text-white leading-snug group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
            <Image
              src={activeImage}
              alt="Enlarged view"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
