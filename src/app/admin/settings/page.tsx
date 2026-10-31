'use client';

import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Database,
  RotateCcw,
  Download,
  CheckCircle2,
  Lock,
  Layers,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [resetting, setResetting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReset = async () => {
    if (
      !confirm(
        'Warning: This will reset all customized landing page texts, hero headlines, and company profile settings back to original Regis defaults. Continue?'
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
          Admin Portal Settings & Backup
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Manage system persistence, database synchronization, and factory defaults.
        </p>
      </div>

      {/* Persistence Architecture Card */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-400" />
          <span>Persistent Storage & High-Availability Engine</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          The Regis CMS and property posting system operates with a hybrid dual-persistence layer:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Resilient File Storage (Active)</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Custom properties, pictures, video URLs, and CMS edits are saved directly to <code className="text-amber-300">src/data/</code>, guaranteeing zero data loss across server restarts.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>PostgreSQL / Supabase Sync</span>
            </div>
            <p className="text-[11px] text-slate-400">
              When <code className="text-amber-300">DATABASE_URL</code> is provisioned, Drizzle ORM automatically mirrors all listings to your cloud relational cluster.
            </p>
          </div>
        </div>
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
