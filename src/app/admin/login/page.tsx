'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  Building2,
  Database,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('vicollins2003@gmail.com');
  const [password, setPassword] = useState('Admin@regis$1');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials.');
      }

      setSuccessMsg('Authenticated successfully! Entering Regis Admin Dashboard...');
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 700);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Authentication failed. Please verify your email and password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setEmail('vicollins2003@gmail.com');
    setPassword('Admin@regis$1');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/15 via-amber-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 p-6 flex items-center justify-between max-w-7xl w-full mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
            R
          </div>
          <div>
            <div className="font-black text-sm tracking-tight text-white flex items-center gap-2">
              <span>REGIS RISL</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold uppercase tracking-wider border border-amber-500/30">
                Superadmin
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Integrated Services Limited</p>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all bg-white/5"
        >
          <span>Return to Website</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Authentication Box */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="p-8 sm:p-9 rounded-3xl bg-[#0B1120]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 space-y-6">
            {/* Header info */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border border-amber-500/30 text-amber-400 mb-2 shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Superadmin Portal
              </h1>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Sign in to manage landing page sections, post properties, upload media tours, and handle client inspection requests.
              </p>
            </div>

            {/* Quick credentials banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/25 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Configured Credentials</span>
                </div>
                <div className="text-slate-300 font-mono text-[11px]">
                  vicollins2003@gmail.com
                </div>
              </div>
              <button
                type="button"
                onClick={handleFillCredentials}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-[11px] transition-all border border-amber-500/30"
              >
                Auto Fill
              </button>
            </div>

            {/* Error & Success alerts */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span className="flex-1 leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span className="flex-1 leading-relaxed">{successMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="admin-login-email"
                    type="email"
                    required
                    placeholder="vicollins2003@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300">
                    Security Password
                  </label>
                  <span className="text-[11px] text-amber-400 font-medium">Supabase Auth Protected</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="admin-login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-white/10 bg-slate-950/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                id="admin-login-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? 'Authenticating with Supabase...' : 'Enter Admin Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Database status indicator */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase PostgreSQL: Connected</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Live DB
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-xs text-slate-400 border-t border-white/5">
        Regis Integrated Services Limited &bull; Enterprise Admin Portal &bull; Abuja, Nigeria
      </footer>
    </div>
  );
}
