import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  PlusCircle,
  FileEdit,
  CalendarCheck,
  Video,
  Image as ImageIcon,
  ArrowUpRight,
  MapPin,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Eye,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { getProperties, getInspectionBookings, getAllSiteContent } from '@/db';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [properties, bookings, content] = await Promise.all([
    getProperties({ limit: 100 }),
    getInspectionBookings(),
    getAllSiteContent(),
  ]);

  const housesCount = properties.filter((p) => p.propertyType === 'houses').length;
  const landsCount = properties.filter((p) => p.propertyType === 'land').length;
  const flatsCount = properties.filter((p) => p.propertyType === 'flats').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600/20 via-slate-900 to-[#0B1120] p-6 sm:p-8 border border-amber-500/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Regis Integrated Services Management Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, Administrator
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              From this portal, you can edit every section of the landing page, update individual subpages, post luxury properties and serviced lands with pictures and video walkthroughs, and manage client inspection bookings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/25"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Property / Land</span>
            </Link>
            <Link
              href="/admin/cms"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/15 transition-all border border-white/15"
            >
              <FileEdit className="w-4 h-4 text-amber-400" />
              <span>Edit Page Content</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Properties */}
        <div className="p-5 rounded-2xl bg-[#0B1120] border border-white/10 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Listings
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{properties.length}</div>
          <p className="mt-2 text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">{housesCount} Houses</span> &bull;{' '}
            <span className="text-amber-400 font-semibold">{landsCount} Land Plots</span> &bull;{' '}
            <span className="text-slate-300">{flatsCount} Flats</span>
          </p>
        </div>

        {/* Serviced Land Plots */}
        <div className="p-5 rounded-2xl bg-[#0B1120] border border-white/10 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Serviced Lands
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{landsCount}</div>
          <p className="mt-2 text-xs text-slate-400">
            Lugbe Airport Corridor & Idu Industrial Layout
          </p>
        </div>

        {/* Inspection Bookings */}
        <div className="p-5 rounded-2xl bg-[#0B1120] border border-white/10 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Inspection Inquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{bookings.length}</div>
          <p className="mt-2 text-xs text-amber-400 font-medium">
            {pendingBookings.length} awaiting follow-up call
          </p>
        </div>

        {/* CMS Sections Managed */}
        <div className="p-5 rounded-2xl bg-[#0B1120] border border-white/10 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              CMS Sections Active
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <FileEdit className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">9 Sections</div>
          <p className="mt-2 text-xs text-slate-400">
            Hero, Pillars, Story, Gallery, CTA, Pages
          </p>
        </div>
      </div>

      {/* Two Column Section: Recent Properties & Inspection Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Properties Management */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Featured & Active Listings</span>
              </h2>
              <p className="text-xs text-slate-400">
                Duplexes, luxury terraces, and serviced lands live on the website
              </p>
            </div>
            <Link
              href="/admin/properties"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View all ({properties.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {properties.slice(0, 5).map((property) => (
              <div
                key={property.id}
                className="p-4 rounded-xl bg-[#0B1120] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-white/10">
                    <Image
                      src={property.images[0] || 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg'}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                    {property.videoUrl && (
                      <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/75 text-[9px] text-amber-300 font-bold flex items-center gap-0.5">
                        <Video className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {property.propertyType}
                      </span>
                      {property.videoUrl && (
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                          <Video className="w-2.5 h-2.5" /> Video Tour
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-white truncate max-w-sm sm:max-w-xs mt-1">
                      {property.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{property.locality}, {property.state}</span>
                      <span className="text-slate-600">&bull;</span>
                      <span className="text-amber-400 font-semibold">
                        ₦{(property.price / 1000000).toLocaleString()}M
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Link
                    href={`/property/${property.id}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title="View Public Page"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/properties/${property.id}/edit`}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Inspection Inquiries & Quick CMS Links */}
        <div className="lg:col-span-5 space-y-6">
          {/* Inspection Inquiries */}
          <div className="p-5 rounded-2xl bg-[#0B1120] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-amber-400" />
                <span>Recent Inspection Inquiries</span>
              </h2>
              <Link
                href="/admin/inquiries"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                View all ({bookings.length})
              </Link>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.fullName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : item.status === 'scheduled'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-300 font-medium">
                    Interest: {item.propertyInterest}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-slate-400">
                    <span>Date: {item.preferredDate}</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${item.phone}`}
                        className="text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" /> Call
                      </a>
                      <a
                        href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CMS Page Editors */}
          <div className="p-5 rounded-2xl bg-[#0B1120] border border-white/10 space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-amber-400" />
              <span>Page & Section Quick Links</span>
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/admin/cms?tab=hero"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-200 hover:text-white transition-all flex flex-col gap-1"
              >
                <span className="text-amber-400 font-bold">Landing Hero</span>
                <span className="text-[11px] text-slate-400">Title, badge & imagery</span>
              </Link>
              <Link
                href="/admin/cms?tab=pillars"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-200 hover:text-white transition-all flex flex-col gap-1"
              >
                <span className="text-amber-400 font-bold">Core Pillars</span>
                <span className="text-[11px] text-slate-400">3 Architectural values</span>
              </Link>
              <Link
                href="/admin/cms?tab=gallery"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-200 hover:text-white transition-all flex flex-col gap-1"
              >
                <span className="text-amber-400 font-bold">Regis Gallery</span>
                <span className="text-[11px] text-slate-400">Onsite construction views</span>
              </Link>
              <Link
                href="/admin/cms?tab=contact"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-200 hover:text-white transition-all flex flex-col gap-1"
              >
                <span className="text-amber-400 font-bold">Contact & Office</span>
                <span className="text-[11px] text-slate-400">Phone, Wuse address</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
