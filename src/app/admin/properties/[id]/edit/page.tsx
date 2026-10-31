import React from 'react';
import { notFound } from 'next/navigation';
import { PropertyForm } from '@/components/admin/PropertyForm';
import { getPropertyById } from '@/db';
import { Edit3 } from 'lucide-react';

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Edit Property / Land — Regis Admin',
};

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
          <Edit3 className="w-3.5 h-3.5" />
          <span>Editor Mode</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Edit Listing: {property.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Update photographs, virtual video tour link, pricing tiers, and building status.
        </p>
      </div>

      <PropertyForm initialData={property} isEditing={true} />
    </div>
  );
}
