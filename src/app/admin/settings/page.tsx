'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  ShieldCheck,
  Database,
  RotateCcw,
  CheckCircle2,
  RefreshCw,
  Server,
  Activity,
  AlertTriangle,
  Lock,
  Layers,
  Table,
} from 'lucide-react';

interface DbStatusResponse {
  success: boolean;
  database: {
    status: string;
    connected: boolean;
    name: string;
    provider: string;
    host: string;
    ssl: boolean;
    latencyMs: number;
    version: string;
    error: string | null;
  };
  tables: Record<string, number>;
  superadmin: {
    email: string;
    role: string;
    authenticated: boolean;
  };
  timestamp: string;
}

export default function AdminSettingsPage() {
  const [resetting, setResetting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<DbStatusResponse | null>(null);
  const [checkingDb, setCheckingDb] = useState(false);

  const fetchDbStatus = async () => {
    setCheckingDb(true);
    try {
      const res = await fetch('/api/admin/db-status');
      const data: DbStatusResponse = await res.json();
      setDbStatus(data);
    } catch (err) {
      console.error('Failed fetching DB status:', err);
    } finally {
      setCheckingDb(false);
    }
  };

  useEffect(() => {
    fetchDbStatus();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReset = async () => {
    if (
      !confirm(
        'Warning: This will reset all customized landing page texts, hero headlines, and company profile settings back to original Regis defaults in PostgreSQL. Continue?'
      )
    ) {
      return;
    }

    setResetting(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('All CMS sections restored to default Regis copy.');
        fetchDbStatus();
      }
    } catch (err) {
      console.error(err);
      alert('Error resetting content.');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-2xl shadow-amber-500/40 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
          <Settings className="w-3.5 h-3.5" />
          <span>Configuration & Security</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Admin Portal Settings & Database
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Real-time PostgreSQL database synchronization, server health diagnostics, and superadmin persistence.
        </p>
      </div>

      {/* LIVE DATABASE HEALTH & DIAGNOSTICS CARD */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-amber-500/20 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>PostgreSQL Database Connectivity</span>
                {dbStatus?.database?.connected ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE CONNECTED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">
                    <AlertTriangle className="w-3 h-3" />
                    CHECKING / OFFLINE
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">
                Supabase AWS Cloud Pooler with SSL encryption
              </p>
            </div>
          </div>

          <button
            onClick={fetchDbStatus}
            disabled={checkingDb}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${checkingDb ? 'animate-spin' : ''}`} />
            <span>{checkingDb ? 'Testing Ping...' : 'Test DB Ping'}</span>
          </button>
        </div>

        {/* Database Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Server className="w-3 h-3 text-amber-400" />
              <span>Engine</span>
            </div>
            <div className="text-sm font-bold text-white truncate">
              {dbStatus?.database?.version || 'PostgreSQL 17'}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {dbStatus?.database?.name || 'postgres'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>Latency</span>
            </div>
            <div className="text-sm font-bold text-emerald-400">
              {dbStatus?.database?.latencyMs ? `${dbStatus.database.latencyMs} ms` : 'Testing...'}
            </div>
            <div className="text-[10px] text-slate-500">
              Direct connection
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>Super Admin</span>
            </div>
            <div className="text-xs font-bold text-white truncate">
              {dbStatus?.superadmin?.email || 'vicollins2003@gmail.com'}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold">
              Superadmin Privileged
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Layers className="w-3 h-3 text-purple-400" />
              <span>SSL Encryption</span>
            </div>
            <div className="text-sm font-bold text-white">
              Required
            </div>
            <div className="text-[10px] text-slate-500">
              Port 5432 TLS
            </div>
          </div>
        </div>

        {/* Database Tables Row Counts */}
        <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2.5">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Table className="w-3.5 h-3.5 text-amber-400" />
            <span>Database Tables & Synchronized Records</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Properties</span>
              <span className="text-xs font-black text-amber-400">{dbStatus?.tables?.properties ?? '—'}</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Site Content</span>
              <span className="text-xs font-black text-amber-400">{dbStatus?.tables?.site_content ?? '—'}</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Inquiries</span>
              <span className="text-xs font-black text-amber-400">{dbStatus?.tables?.inspection_bookings ?? '—'}</span>
            </div>
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400">Admin Users</span>
              <span className="text-xs font-black text-amber-400">{dbStatus?.tables?.admin_users ?? '—'}</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Architecture Note:</strong> The super admin portal uses a direct connection pooler to Supabase PostgreSQL 17. Every property listing you add, edit, or delete, and all CMS texts you modify are saved directly to the relational database.
        </p>
      </div>

      {/* Reset & Restore Defaults Card */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-red-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-red-400" />
            <span>Reset Site Content to Regis Defaults</span>
          </h2>
          <button
            onClick={handleReset}
            disabled={resetting}
            className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 text-xs font-bold border border-red-500/30 transition-colors disabled:opacity-50"
          >
            {resetting ? 'Resetting...' : 'Restore Factory Defaults'}
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Use this action if you want to wipe manual text changes and restore the verified official Regis Integrated Services copy (Wuse Zone 2 Abuja office, FHA Golden Jubilee Estate Mbora, Guzape luxury terraces, Lugbe and Idu serviced lands).
        </p>
      </div>
    </div>
  );
}

