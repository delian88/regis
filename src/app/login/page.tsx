'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { RegisLogo } from '@/components/RegisLogo';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const normalizedEmail = email.trim().toLowerCase();

      // If logging in with the superadmin email, authenticate through admin auth endpoint
      if (normalizedEmail === 'vicollins2003@gmail.com') {
        const res = await fetch('/api/admin/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: normalizedEmail, password }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Invalid administrator credentials.');
        }
        router.push('/admin');
        router.refresh();
        return;
      }

      // Normal user authentication via Supabase client
      if (supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (error) throw error;
      }

      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Invalid login credentials. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center flex flex-col items-center">
            <div className="mb-4">
              <RegisLogo size="md" showSubtitle={true} href="/" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[var(--foreground-strong)] tracking-tight">
              Client Portal Sign In
            </h1>
            <p className="mt-1 text-xs text-[var(--foreground-muted)] max-w-sm">
              Access your real estate documentation, milestone inspections, and property agreements
            </p>
          </div>

          {/* Superadmin shortcut alert */}
          <Link
            href="/admin/login"
            className="block p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/30 hover:border-amber-500/60 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--foreground-strong)] flex items-center gap-1.5">
                    <span>Superadmin Portal</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-extrabold uppercase">
                      Admin
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--foreground-muted)]">
                    Sign in with vicollins2003@gmail.com
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[var(--foreground-muted)]">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-amber-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--foreground-muted)]">
              <span>Don&apos;t have an account yet? </span>
              <Link href="/register" className="font-bold text-amber-600 hover:underline">
                Create one free
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
