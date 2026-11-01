'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Building2,
  LayoutDashboard,
  Home,
  PlusCircle,
  FileEdit,
  Image as ImageIcon,
  CalendarCheck,
  ExternalLink,
  Menu,
  X,
  Bell,
  Search,
  CheckCircle2,
  Layers,
  Settings,
  LogOut,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'Properties & Land',
    href: '/admin/properties',
    icon: Building2,
    badge: 'Manage',
  },
  {
    name: 'Post Property / Land',
    href: '/admin/properties/new',
    icon: PlusCircle,
    badge: 'New',
  },
  {
    name: 'Landing & Pages CMS',
    href: '/admin/cms',
    icon: FileEdit,
    badge: 'Live Edit',
  },
  {
    name: 'Media & Video Library',
    href: '/admin/media',
    icon: ImageIcon,
    badge: null,
  },
  {
    name: 'Inspection Bookings',
    href: '/admin/inquiries',
    icon: CalendarCheck,
    badge: '3 New',
  },
  {
    name: 'Settings & Defaults',
    href: '/admin/settings',
    icon: Settings,
    badge: null,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error:', e);
      router.push('/admin/login');
    } finally {
      setLoggingOut(false);
    }
  };

  const [checkingAuth, setCheckingAuth] = useState(pathname !== '/admin/login');

  useEffect(() => {
    if (pathname === '/admin/login') {
      setCheckingAuth(false);
      return;
    }

    let isMounted = true;
    fetch('/api/admin/auth')
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login');
        } else if (isMounted) {
          setCheckingAuth(false);
        }
      })
      .catch(() => {
        router.push('/admin/login');
      });

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#070B16] text-slate-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg animate-pulse shadow-lg shadow-amber-500/20">
            R
          </div>
          <p className="text-xs text-amber-400 font-semibold tracking-wide">
            Verifying Regis Admin Authorization...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0B1120] border-b border-white/10 sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-amber-500/20">
            R
          </div>
          <div>
            <div className="font-extrabold text-xs tracking-tight text-white flex items-center gap-1.5">
              <span>REGIS INTEGRATED SERVICES</span>
              <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold uppercase tracking-wider border border-amber-500/30">
                Admin
              </span>
            </div>
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Desktop & Mobile Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:flex flex-col w-full md:w-64 lg:w-72 bg-[#0B1120] border-r border-white/10 shrink-0 z-40 md:sticky md:top-0 md:h-screen`}
      >
        {/* Brand Banner */}
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform shrink-0">
              R
            </div>
            <div className="min-w-0">
              <div className="font-black text-xs sm:text-sm tracking-tight text-white uppercase leading-tight">
                <span className="text-amber-500">Regis </span>
                <span>Integrated Services Ltd</span>
              </div>
              <p className="text-[10px] text-amber-400/90 font-bold tracking-wider uppercase mt-0.5">
                Enterprise Management Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Management & Content
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-amber-400'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 px-3 py-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Public Website
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all group border border-white/5"
          >
            <div className="flex items-center gap-3">
              <Home className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />
              <span>View Live Website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
          </Link>
        </nav>

        {/* Logged in User Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center font-bold text-xs text-slate-950 shadow-sm shadow-amber-500/20 shrink-0">
                SA
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">vicollins2003@gmail.com</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Superadmin</span>
                </div>
              </div>
            </div>
            <button
              id="admin-sidebar-logout-btn"
              onClick={handleLogout}
              disabled={loggingOut}
              title="Sign Out of Admin"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#070B16]">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Supabase Connected
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-300">
              vicollins2003@gmail.com &bull; Superadmin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-sm shadow-amber-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Property / Land</span>
            </Link>
            <Link
              href="/admin/cms"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/15 transition-all border border-white/10"
            >
              <FileEdit className="w-4 h-4 text-amber-400" />
              <span>Edit Landing Page</span>
            </Link>
            <button
              id="admin-topbar-logout-btn"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-300 font-semibold text-xs hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
