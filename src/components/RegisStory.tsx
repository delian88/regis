'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, Home, CheckCircle2, Phone, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { SiteContentMap } from '@/db/site-content';

interface RegisStoryProps {
  content?: SiteContentMap['homepage_story'];
}

export function RegisStory({ content }: RegisStoryProps) {
  const tag = content?.tag || 'A DECADE OF ENGINEERING DISTINCTION';
  const title = content?.title || 'Providing Affordable Housing for Deserving Nigerians';
  const subtitle =
    content?.subtitle ||
    'For over a decade, Regis Integrated Services Limited (RISL) has stood at the forefront of Abuja’s urban evolution.';
  const p1 =
    content?.p1 ||
    'Over the past 10 years, we have designed, managed, and constructed over 1,000 residential units and serviced estate schemes across the Federal Capital Territory and beyond. Our commitment is founded on delivering affordable luxurious homes without sacrificing architectural magnificence.';
  const p2 =
    content?.p2 ||
    'In trusted collaboration with national institutions including the Federal Housing Authority (FHA) and FHA Mortgage Bank, we pioneer homeownership through innovative financing models and site-and-services master plans.';

  const stats = content?.stats || [
    { value: '10+', label: 'Years Track Record', sub: 'Continuous Excellence' },
    { value: '200+', label: 'Happy Customers', sub: 'Satisfied Homeowners' },
    { value: '1,000+', label: 'Housing Projects', sub: 'Master-planned Developments' },
    { value: '100%', label: 'Quality Assurance', sub: 'Guaranteed Structural Integrity' },
  ];

  const image = content?.image || 'https://www.regis.com.ng/wp-content/uploads/2022/08/IMG_Photo-3.jpg';

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Experience Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo */}
              <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl">
                <Image
                  src={image}
                  alt="Regis Integrated Services Limited Construction Leadership"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Wuse Zone 2, Abuja, Nigeria</span>
                  </div>
                  <p className="text-white font-bold text-base sm:text-lg">
                    Regis Integrated Services Limited
                  </p>
                  <p className="text-slate-300 text-xs">
                    Building the future of Nigerian urban living
                  </p>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 p-5 rounded-2xl shadow-2xl border border-amber-300/40 flex items-center gap-4">
                <div className="text-3xl sm:text-4xl font-black">{stats[0]?.value || '10+'}</div>
                <div className="text-xs font-black uppercase tracking-wider leading-tight">
                  Years of <br />
                  Excellence
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/25 text-amber-300 tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{tag}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {title}
              </h2>

              <p className="text-base text-amber-400 font-semibold">{subtitle}</p>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>{p1}</p>
                <p>{p2}</p>
              </div>
            </div>

            {/* 4 Statistics Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{stat.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* FHA Institutional Partner Spotlight */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Official Partner with Federal Housing Authority (FHA)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-lg">
                  Accredited developer delivering landmark housing at FHA Golden Jubilee Estate Mbora, backed by mortgage facilities.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors shadow-md shadow-amber-500/20"
              >
                <span>View FHA Mbora Units</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
