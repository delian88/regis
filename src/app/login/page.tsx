'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
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
      if (supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
      // Success or demo fallback
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

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-red-600 text-white font-black text-2xl shadow-lg shadow-red-600/30 mb-4">
              P
            </div>
            <h1 className="text-2xl font-black text-[var(--foreground-strong)] tracking-tight">
              Sign in to your account
            </h1>
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">
              Manage your properties, saved listings, and lead enquiries
            </p>
          </div>

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
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[var(--foreground-muted)]">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-red-600 hover:underline">
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
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow transition-all active:scale-95 disabled:opacity-50"
              >
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--foreground-muted)]">
              <span>Don&apos;t have an account yet? </span>
              <Link href="/register" className="font-bold text-red-600 hover:underline">
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
