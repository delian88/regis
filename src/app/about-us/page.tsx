import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RegisCTA } from '@/components/RegisCTA';
import {
  ShieldCheck,
  Award,
  Users,
  Building,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Compass,
  Layers,
  FileSpreadsheet,
  Palette,
  HardHat,
  ArrowRight,
} from 'lucide-react';
import { getSiteContent } from '@/db';

export const metadata = {
  title: 'About Us — Regis Integrated Services Limited | Construction & Real Estate Abuja',
  description:
    'Learn about Regis Integrated Services Limited (RISL). For over a decade, we have delivered 1,000+ affordable luxury housing projects in Abuja and across Nigeria.',
};

const SERVICE_ICONS = [Compass, Palette, HardHat, Layers, Building, FileSpreadsheet];

export default async function AboutUsPage() {
  const content = await getSiteContent('about_page');
  const ctaContent = await getSiteContent('homepage_cta');

  const services = content?.services || [
    {
      title: 'Architecture & Spatial Design',
      desc: 'Our architects develop contemporary 3D spatial models, functional layouts, double-volume elevations, and eco-friendly ventilation systems tailor-made for African climates.',
    },
    {
      title: 'Interior Design & Fit-Out',
      desc: 'From custom imported marble floors and recessed LED ambient cove lighting to bespoke kitchen cabinetry, we craft sophisticated interior living spaces.',
    },
    {
      title: 'Design & Build Turnkey Construction',
      desc: 'Complete end-to-end civil engineering, reinforced concrete superstructure framing, roofing, and turnkey finishing under one accountable management contract.',
    },
    {
      title: 'Site Supervision & Quality Control',
      desc: 'Senior site engineers oversee daily casting, soil compaction tests, rebar reinforcement inspections, and strict adherence to Nigerian national building codes.',
    },
    {
      title: 'Project Management & Delivery',
      desc: 'We enforce stringent milestone tracking, budget transparency, and safety protocols to ensure on-time delivery without unexpected cost overruns.',
    },
    {
      title: 'Cost Studies & Feasibility',
      desc: 'Detailed Bill of Quantities (BOQ), material market price tracking, and financial feasibility studies that optimize capital efficiency for homeowners and investors.',
    },
  ];

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
                'radial-gradient(60% 60% at 80% 10%, rgba(245,158,11,0.25), transparent 70%), radial-gradient(70% 70% at 20% 90%, rgba(220,38,38,0.25), transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Company Profile</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
              {content?.heroTitle || 'About Regis Integrated Services Limited'}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {content?.heroSubtitle ||
                'Providing affordable, luxurious housing for deserving Nigerians. For over a decade, we have set benchmark standards in Nigerian civil engineering and urban community development.'}
            </p>
          </div>
        </div>

        {/* Corporate Story & Leadership Section */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Photo */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl h-[460px]">
                  <Image
                    src="https://www.regis.com.ng/wp-content/uploads/2022/08/IMG_Photo-3.jpg"
                    alt="Regis Integrated Services Corporate Headquarters"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                      Abuja, Federal Capital Territory
                    </span>
                    <h3 className="text-xl font-black text-white">
                      Regis Integrated Services Limited
                    </h3>
                    <p className="text-xs text-slate-300">
                      RC Certified Nigerian Construction & Real Estate Developer
                    </p>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Our Heritage & Vision</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {content?.storyTitle || 'For Over a Decade, Delivering Affordable Luxury Across Nigeria'}
                </h2>

                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    {content?.storyP1 ||
                      'Regis Integrated Services Limited was founded over ten years ago with a single transformative conviction: that every hardworking Nigerian deserves access to aesthetically breathtaking, structurally sound, and affordable homes in secured communities.'}
                  </p>
                  <p>
                    {content?.storyP2 ||
                      'From our corporate headquarters at 22 Koforidua Street, Wuse Zone 2, Abuja, we have directed monumental residential and commercial developments, including our flagship Regis Royale Estate, exclusive luxury terrace duplexes in Guzape District, family flats at the FHA Golden Jubilee Estate in Mbora, and serviced land parcels in Lugbe and Idu.'}
                  </p>
                  <p>
                    We work hand-in-hand with institutional giants such as the <strong className="text-white">Federal Housing Authority (FHA)</strong> and <strong className="text-white">FHA Mortgage Bank</strong>, unlocking structured mortgage options that empower civil servants, entrepreneurs, and the Nigerian diaspora to become undisputed homeowners.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Registered Real Estate Developer</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Official FHA Development Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="py-16 bg-[#070B16] text-white border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 relative overflow-hidden group hover:border-amber-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 border border-amber-500/30">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Our Mission</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {content?.mission ||
                    'To deliver innovative, aesthetically compelling, structurally sound, and affordable housing solutions that provide exceptional living standards and sustainable capital appreciation for our clients.'}
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 relative overflow-hidden group hover:border-amber-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 border border-amber-500/30">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Our Vision</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {content?.vision ||
                    'To be recognized as West Africa’s most trustworthy, customer-centric, and technically proficient real estate development and turnkey construction conglomerate.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Turnkey Services Grid */}
        <section className="py-20 bg-slate-950 text-white border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 uppercase tracking-wider mb-4">
                <HardHat className="w-4 h-4 text-amber-400" />
                <span>End-to-End Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Complete Architecture, Engineering & Construction Solutions
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                From pre-construction land soil analysis and 3D prototyping to interior fit-out and keys handover.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item, idx) => {
                const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Regis CTA */}
        <RegisCTA content={ctaContent} />
      </main>

      <Footer />
    </div>
  );
}
