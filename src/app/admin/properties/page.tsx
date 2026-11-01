'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  PlusCircle,
  Search,
  Filter,
  Video,
  Eye,
  Edit3,
  Trash2,
  MapPin,
  CheckCircle2,
  Layers,
  ArrowUpDown,
  RefreshCw,
} from 'lucide-react';
import { SeedProperty } from '@/db/seed-data';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<SeedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/properties?limit=200');
      const data = await res.json();
      if (data.success) {
        setProperties(data.properties);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
        showToast(`Listing "${title}" removed successfully.`);
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting listing.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter listings
  const filtered = properties.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.locality.toLowerCase().includes(search.toLowerCase()) ||
      item.state.toLowerCase().includes(search.toLowerCase()) ||
      item.subtype.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === 'all' || item.propertyType === filterType;
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch && matchesType && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-2xl shadow-amber-500/40 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Property & Land Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Manage Properties & Serviced Lands
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Publish new developments, manage prices, add video tours, and update pictures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProperties}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Property / Land</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-[#0B1120] border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, Abuja district, land area, price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Property Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Types</option>
            <option value="houses">Houses & Duplexes</option>
            <option value="flats">Apartments & Flats</option>
            <option value="land">Serviced Lands / Plots</option>
            <option value="commercial">Commercial / Industrial</option>
          </select>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Categories</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="shortlet">Short Let</option>
            <option value="jv">Joint Venture</option>
          </select>
        </div>
      </div>

      {/* Listings Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white font-semibold">{filtered.length}</strong> of{' '}
          {properties.length} listings
        </span>
      </div>

      {/* Property Cards / Rows Table */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading Regis properties catalog...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0B1120] border border-white/10 space-y-3">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No properties match your filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or reset the type and category filters above.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#0B1120] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
            >
              {/* Media Thumbnail & Title */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-white/10">
                  <Image
                    src={item.images[0] || 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Photo count pill */}
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-bold text-white">
                    {item.images.length} Photos
                  </div>
                  {/* Video pill */}
                  {item.videoUrl && (
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-amber-500 text-[9px] font-black text-slate-950 flex items-center gap-1 shadow-sm">
                      <Video className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {item.propertyType}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                      {item.category}
                    </span>
                    {item.isFeatured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Featured
                      </span>
                    )}
                    {item.videoUrl && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <Video className="w-2.5 h-2.5" /> Video Tour
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white truncate max-w-lg">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item.locality}, {item.state}</span>
                    </span>
                    {item.plotSizeSqm && (
                      <span className="text-slate-300 font-medium">
                        {item.plotSizeSqm} SQM
                      </span>
                    )}
                    {item.bedrooms > 0 && (
                      <span className="text-slate-400">{item.bedrooms} Beds</span>
                    )}
                    <span className="text-amber-400 font-extrabold text-sm">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <Link
                  href={`/property/${item.id}`}
                  target="_blank"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5"
                  title="View Public Page"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/admin/properties/${item.id}/edit`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  disabled={deletingId === item.id}
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20 disabled:opacity-50"
                  title="Delete Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
