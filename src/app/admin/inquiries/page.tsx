'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Search,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Building2,
  Calendar,
} from 'lucide-react';
import { InspectionBooking } from '@/db';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InspectionBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: InspectionBooking['status']) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = inquiries.filter((item) => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.propertyInterest.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Site Inspection Scheduler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Client Inquiries & Inspection Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time requests submitted from the public website for Guzape, Mbora, Lugbe, and Idu.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          disabled={loading}
          className="self-start sm:self-center p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 flex items-center gap-2 text-xs font-semibold"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Inquiries</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-[#0B1120] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by client name, telephone, or development..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Statuses ({inquiries.length})</option>
          <option value="pending">Pending Follow-up</option>
          <option value="contacted">Contacted</option>
          <option value="scheduled">Inspection Scheduled</option>
          <option value="completed">Completed / Inspected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading inspection bookings...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0B1120] border border-white/10 space-y-3">
          <CalendarCheck className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No inquiries found</h3>
          <p className="text-xs text-slate-400">
            Client inspection bookings submitted from property detail pages and the contact page will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#0B1120] border border-white/10 hover:border-amber-500/30 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-white">{item.fullName}</h3>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        item.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : item.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : item.status === 'scheduled'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{item.propertyInterest}</span>
                    </span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>Preferred Date: {item.preferredDate}</span>
                    </span>
                  </div>
                </div>

                {/* Quick Action Dialers */}
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${item.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Client</span>
                  </a>
                  <a
                    href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  {item.email && (
                    <a
                      href={`mailto:${item.email}`}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Message Note */}
              {item.message && (
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                    Client Note / Special Request:
                  </span>
                  &ldquo;{item.message}&rdquo;
                </div>
              )}

              {/* Status Update Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs text-slate-400">
                <span className="text-[11px]">
                  Submitted on {new Date(item.createdAt).toLocaleDateString()} at{' '}
                  {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1">
                    Update Status:
                  </span>
                  {(['pending', 'contacted', 'scheduled', 'completed', 'cancelled'] as const).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(item.id, st)}
                        disabled={updatingId === item.id || item.status === st}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                          item.status === st
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
