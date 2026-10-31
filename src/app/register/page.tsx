'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { User, Building, Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'seeker' | 'agent'>('agent');
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (supabase) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
              company_name: formData.companyName,
              phone: formData.phone,
              account_type: accountType,
            },
          },
        });
        if (error) throw error;
      }
      alert('Registration successful! Welcome to Regis Integrated Services Limited.');
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Registration failed. Please check your information.');
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
              Create your free account
            </h1>
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">
              Join Nigeria&apos;s largest property discovery network
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md space-y-5">
            {/* Account Type Selector Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAccountType('agent')}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  accountType === 'agent'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)]'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Estate Agent / Developer</span>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('seeker')}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  accountType === 'seeker'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground-strong)]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Property Seeker</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Adeleke"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {accountType === 'agent' && (
                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                    Agency or Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prime Realty Nigeria Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="08012345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--foreground-muted)] block mb-1.5">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow transition-all active:scale-95 disabled:opacity-50"
              >
                <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--foreground-muted)]">
              <span>Already registered? </span>
              <Link href="/login" className="font-bold text-red-600 hover:underline">
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
