'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { SiteContentMap } from '@/db/site-content';

interface RegisCTAProps {
  content?: SiteContentMap['homepage_cta'];
}

export function RegisCTA({ content }: RegisCTAProps) {
  const tag = content?.tag || 'Regis Integrated Services Limited';
  const title = content?.title || "LET'S BUILD YOUR DREAM, TOGETHER!";
  const subtitle =
    content?.subtitle ||
    'Whether you are acquiring a luxury 6-bedroom terrace in Guzape, a family duplex at FHA Golden Jubilee Estate Mbora, or 250 – 500 SQM serviced estate land in Lugbe or Idu, our advisory team is ready to assist you with transparent documentation and flexible payment plans.';
  const phone = content?.phone || '+234 (0) 815 555 5168';
  const whatsapp = content?.whatsapp || '+2348155555168';
  const buttonText = content?.buttonText || 'Book Site Inspection';
  const buttonLink = content?.buttonLink || '/contact-us';

  return (
    <section className="relative py-24 text-white overflow-hidden">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://www.regis.com.ng/wp-content/uploads/2022/08/layer-6.jpg"
          alt="Regis Construction Site"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {title}
          </h2>

          <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            {subtitle}
          </p>

          {/* Key Office Info */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>22 Koforidua Street, Wuse Zone 2, Abuja</span>
            </div>
            <div className="hidden sm:block text-slate-600">•</div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{phone}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={buttonLink}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              <span>{buttonText}</span>
            </Link>

            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
