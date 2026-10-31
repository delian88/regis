import React from 'react';
import { PropertyForm } from '@/components/admin/PropertyForm';
import { PlusCircle } from 'lucide-react';

export const metadata = {
  title: 'Post New Property or Land — Regis Admin',
};

export default function NewPropertyPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Listing Creator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Post Property or Serviced Land
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Upload pictures, attach a video walkthrough tour, configure cadastral coordinates, and publish live to the Regis portal.
        </p>
      </div>

      <PropertyForm />
    </div>
  );
}
