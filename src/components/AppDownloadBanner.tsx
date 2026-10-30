'use client';

import React from 'react';
import { Smartphone, Check, Bell, Heart, Shield } from 'lucide-react';

export function AppDownloadBanner() {
  return (
    <section className="py-12 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070B16] via-[#111827] to-[#1E293B] border border-slate-800 p-8 sm:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Text & Features */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/30 mb-4">
                <Smartphone className="w-3.5 h-3.5" />
                <span>MOBILE APP FOR IOS & ANDROID</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                House-hunting, now in your pocket
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Experience seamless property search on Nigeria&apos;s fastest real estate mobile app. Get instant alerts when matching apartments or lands are listed in your dream neighborhood.
              </p>

              {/* Feature points */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                    <Bell className="w-3 h-3" />
                  </div>
                  <span>Instant alerts for new listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                    <Heart className="w-3 h-3" />
                  </div>
                  <span>Sync saved properties across devices</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                    <Shield className="w-3 h-3" />
                  </div>
                  <span>Direct WhatsApp contact with verified agents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Offline viewing for saved favorites</span>
                </div>
              </div>

              {/* Store Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {/* Google Play */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.nigeriapropertycentre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all text-white shadow-md active:scale-95"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.366-.37-.61-.926-.61-1.572V3.386c0-.646.244-1.202.61-1.572zm11.238 11.24l2.124 2.124-11.46 6.54 9.336-8.664zm2.124-2.124l-2.124-2.124 9.336-8.664-11.46 6.54 2.124 2.124 2.124 2.124zm1.503 1.503l3.652-2.084c.73-.418.73-1.096 0-1.514l-3.652-2.084-2.227 2.227 2.227 2.227z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[0.625rem] uppercase tracking-wider text-slate-400 leading-none">Get it on</p>
                    <p className="text-sm font-bold leading-tight">Google Play</p>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="https://apps.apple.com/ng/app/nigeria-property-centre/id1450280961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all text-white shadow-md active:scale-95"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.03.63-2.67 1.38-.56.64-1.05 1.7-0.92 2.73 1.05.08 2.08-.52 2.67-1.24z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[0.625rem] uppercase tracking-wider text-slate-400 leading-none">Download on the</p>
                    <p className="text-sm font-bold leading-tight">App Store</p>
                  </div>
                </a>
              </div>
            </div>

            {/* App Preview Card Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 rounded-3xl bg-slate-900 border-4 border-slate-700 p-4 shadow-2xl">
                <div className="h-4 w-28 mx-auto bg-slate-800 rounded-full mb-3" />
                <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <span className="font-extrabold text-red-500">NPC Mobile</span>
                    <span className="text-[0.625rem] text-slate-400">Lagos, NG</span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    <div className="h-28 rounded-xl bg-gradient-to-tr from-red-900/40 to-slate-800 p-2.5 flex flex-col justify-end">
                      <p className="text-[0.6875rem] font-bold text-white">4 Bed Semi-Detached Duplex</p>
                      <p className="text-[0.625rem] text-emerald-400 font-extrabold">₦180,000,000</p>
                    </div>
                    <div className="h-20 rounded-xl bg-slate-900 p-2 border border-slate-800 flex items-center gap-2">
                      <div className="size-12 rounded-lg bg-slate-800 shrink-0" />
                      <div>
                        <p className="text-[0.625rem] font-bold text-white">Ikoyi Waterfront Luxury</p>
                        <p className="text-[0.5625rem] text-slate-400">Banana Island</p>
                        <p className="text-[0.625rem] text-red-400 font-bold">₦1,200,000,000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative blur lights */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
