'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Building2,
  Plus,
  Trash2,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowLeft,
  Eye,
  HelpCircle,
  Play,
} from 'lucide-react';
import Link from 'next/link';
import { SeedProperty } from '@/db/seed-data';

interface PropertyFormProps {
  initialData?: Partial<SeedProperty>;
  isEditing?: boolean;
}

const PRESET_IMAGES = [
  {
    name: 'Guzape Luxury Terrace Elevation',
    url: 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg',
  },
  {
    name: 'FHA Mbora Semi-Detached Duplex',
    url: 'https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg',
  },
  {
    name: 'Modern Spatial Architecture & Living',
    url: 'https://www.regis.com.ng/wp-content/uploads/2022/08/JaysvilleInterior-Design-Architectural-Design.jpg',
  },
  {
    name: 'Regis Royale Onsite Framing',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.39.jpeg',
  },
  {
    name: 'Luxury Interior Marble Finishing',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.36-1.jpeg',
  },
  {
    name: 'Lugbe & Idu Serviced Land Layout (500 SQM)',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/land-270x270_c.jpg',
  },
  {
    name: 'Lugbe Serviced Land Layout (250 SQM)',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/land2-270x270_c.jpg',
  },
  {
    name: 'FHA Mbora 2 & 3 Bedroom Block of Flats',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/3D3_042345-270x270_c.jpg',
  },
];

const PRESET_AMENITIES = [
  'Government Approved Building Plans',
  'Site and Services Infrastructure',
  'Table Dry Flat Topography',
  'Certificate of Occupancy (C of O)',
  'Federal Housing Authority (FHA) Partnership',
  'FHA Mortgage Bank Financing Available',
  'Private Walkout Basement',
  'Private Elevator / Lift Shaft',
  'Rooftop Panoramic Terrace',
  '24/7 Armed Security & CCTV',
  'Dedicated Domestic Staff Quarters (BQ)',
  'Swimming Pool & Clubhouse',
  'Paved Internal Road Network',
  'Constant Treated Water Supply',
  'Smart Home Automation',
];

export function PropertyForm({ initialData, isEditing = false }: PropertyFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState<'sale' | 'rent' | 'shortlet' | 'jv'>(
    initialData?.category || 'sale'
  );
  const [propertyType, setPropertyType] = useState<'houses' | 'flats' | 'land' | 'commercial'>(
    initialData?.propertyType || 'houses'
  );
  const [subtype, setSubtype] = useState(initialData?.subtype || 'Luxury Terrace Duplex');
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : '');
  const [status, setStatus] = useState<
    'available' | 'selling_fast' | 'under_construction' | 'sold_out'
  >(initialData?.status || 'available');

  const [state, setState] = useState(initialData?.state || 'Abuja');
  const [locality, setLocality] = useState(initialData?.locality || 'Guzape');
  const [area, setArea] = useState(initialData?.area || 'Guzape District');
  const [streetAddress, setStreetAddress] = useState(
    initialData?.streetAddress || 'Plot 22 Cadastral Zone A09, Guzape Main, Abuja'
  );

  const [bedrooms, setBedrooms] = useState(initialData?.bedrooms ?? 5);
  const [bathrooms, setBathrooms] = useState(initialData?.bathrooms ?? 6);
  const [toilets, setToilets] = useState(initialData?.toilets ?? 6);
  const [parkingSpaces, setParkingSpaces] = useState(initialData?.parkingSpaces ?? 4);
  const [plotSizeSqm, setPlotSizeSqm] = useState(
    initialData?.plotSizeSqm ? String(initialData.plotSizeSqm) : '500'
  );

  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? true);
  const [isVerified, setIsVerified] = useState(initialData?.isVerified ?? true);
  const [isServiced, setIsServiced] = useState(initialData?.isServiced ?? true);
  const [isFurnished, setIsFurnished] = useState(initialData?.isFurnished ?? false);

  const [description, setDescription] = useState(
    initialData?.description ||
      'Exquisite luxury architectural masterpiece developed by Regis Integrated Services Limited. Features premium structural reinforced concrete, contemporary layout, and flexible payment plans.'
  );

  // Pictures state
  const [images, setImages] = useState<string[]>(
    initialData?.images && initialData.images.length > 0
      ? initialData.images
      : ['https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg']
  );
  const [newImageUrl, setNewImageUrl] = useState('');

  // Video state
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');

  // Amenities state
  const [amenities, setAmenities] = useState<string[]>(
    initialData?.amenities && initialData.amenities.length > 0
      ? initialData.amenities
      : [
          'Government Approved Building Plans',
          'Site and Services Infrastructure',
          'Certificate of Occupancy (C of O)',
          '24/7 Armed Security & CCTV',
        ]
  );

  // Quick SQM button handler
  const setQuickSqm = (sqm: number) => {
    setPlotSizeSqm(String(sqm));
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleAddPresetImage = (url: string) => {
    if (!images.includes(url)) {
      setImages((prev) => [...prev, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      setError('Please provide a title and price.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      title,
      category,
      propertyType,
      subtype,
      price: Number(price),
      currency: 'NGN',
      state,
      locality,
      area,
      streetAddress,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      toilets: Number(toilets),
      parkingSpaces: Number(parkingSpaces),
      plotSizeSqm: plotSizeSqm ? Number(plotSizeSqm) : null,
      isFeatured,
      isVerified,
      isServiced,
      isFurnished,
      status,
      description,
      images: images.filter(Boolean),
      videoUrl: videoUrl.trim() || null,
      videos: videoUrl.trim() ? [videoUrl.trim()] : [],
      amenities,
      agentId: 1, // Regis Integrated Services Limited
    };

    try {
      const endpoint = isEditing
        ? `/api/admin/properties/${initialData?.id}`
        : '/api/admin/properties';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to save property listing');
      }

      router.push('/admin/properties');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong while saving the listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Back button & Title */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Properties List</span>
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Basic Info Section */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>Listing Details & Classification</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Specify property or land category, title, pricing, and project status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-200">
              Listing Title <span className="text-amber-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 6-Bedroom Luxury Terrace Duplex with Basement or Lugbe Serviced Estate Land (500 SQM)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Property Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">
              Property Type <span className="text-amber-500">*</span>
            </label>
            <select
              value={propertyType}
              onChange={(e) => {
                const val = e.target.value as any;
                setPropertyType(val);
                if (val === 'land') {
                  setBedrooms(0);
                  setBathrooms(0);
                  setToilets(0);
                  setParkingSpaces(0);
                  setSubtype('Serviced Residential Land');
                } else if (val === 'houses') {
                  setSubtype('Luxury Terrace Duplex');
                } else if (val === 'flats') {
                  setSubtype('2-Bedroom Block of Flats');
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="houses">Houses & Duplexes</option>
              <option value="land">Serviced Lands / Plots</option>
              <option value="flats">Apartments & Flats</option>
              <option value="commercial">Commercial & Industrial</option>
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">Transaction Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="sale">For Sale (Direct Purchase)</option>
              <option value="rent">For Rent</option>
              <option value="shortlet">Short Let</option>
              <option value="jv">Joint Venture Development</option>
            </select>
          </div>

          {/* Subtype */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">Subtype / Prototype</label>
            <input
              type="text"
              placeholder="e.g. Luxury Terrace with Basement, Semi-Detached, Serviced Land"
              value={subtype}
              onChange={(e) => setSubtype(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">
              Price (NGN ₦) <span className="text-amber-500">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              placeholder="e.g. 500000000 or 7000000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
            {price && (
              <p className="text-[11px] text-amber-400 font-semibold">
                Formatted: ₦{Number(price).toLocaleString()} NGN
              </p>
            )}
          </div>

          {/* Listing Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">Sales / Construction Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="available">Available for Purchase</option>
              <option value="selling_fast">Selling Fast / High Demand</option>
              <option value="under_construction">Ongoing Construction / Off-Plan</option>
              <option value="sold_out">Sold Out</option>
            </select>
          </div>

          {/* Plot Size SQM */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">Plot / Built Area (SQM)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="e.g. 500 or 250"
                value={plotSizeSqm}
                onChange={(e) => setPlotSizeSqm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            {/* Quick SQM Presets */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400">Presets:</span>
              {[250, 500, 600, 1000].map((sqm) => (
                <button
                  key={sqm}
                  type="button"
                  onClick={() => setQuickSqm(sqm)}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-white/10"
                >
                  {sqm} SQM
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>Abuja Cadastral & Geographic Location</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Specify the exact district, cadastral zone, or state corridor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* State */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">State / Territory</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Abuja">Abuja (FCT)</option>
              <option value="Lagos">Lagos</option>
              <option value="Oyo">Oyo (Ibadan)</option>
              <option value="Rivers">Rivers (Port Harcourt)</option>
              <option value="Ogun">Ogun</option>
            </select>
          </div>

          {/* Locality */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">Locality / District</label>
            <input
              type="text"
              placeholder="e.g. Guzape, Mbora, Lugbe, Idu, Wuse 2"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">Estate / Neighborhood</label>
            <input
              type="text"
              placeholder="e.g. Regis Royale Estate, FHA Golden Jubilee"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Street / Cadastral Address */}
          <div className="sm:col-span-3 space-y-1.5">
            <label className="text-xs font-bold text-slate-200">Cadastral & Street Address</label>
            <input
              type="text"
              placeholder="e.g. Plot 22 Cadastral Zone A09, Guzape Main, Abuja"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Building Specifications (If Houses or Flats) */}
      {propertyType !== 'land' && (
        <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Rooms & Structural Configuration</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Bedrooms</label>
              <input
                type="number"
                min="0"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Bathrooms</label>
              <input
                type="number"
                min="0"
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Toilets</label>
              <input
                type="number"
                min="0"
                value={toilets}
                onChange={(e) => setToilets(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Parking Spaces</label>
              <input
                type="number"
                min="0"
                value={parkingSpaces}
                onChange={(e) => setParkingSpaces(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* PICTURES MANAGER */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" />
                <span>Property & Land Pictures</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Add high-resolution photographs, 3D architectural renders, or drone shots.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              {images.length} Photos Added
            </span>
          </div>
        </div>

        {/* Add new photo input */}
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Paste image URL (https://...)"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Image</span>
          </button>
        </div>

        {/* Quick Presets for Authentic Regis Assets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Quick-Add Official Regis Project Photography:
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_IMAGES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddPresetImage(preset.url)}
                className="text-[11px] px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-amber-500/15 text-slate-300 hover:text-amber-300 border border-white/5 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3 h-3 text-amber-400" />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid with Previews */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/50 border border-white/10 group"
            >
              <Image src={img} alt={`Photo ${idx + 1}`} fill className="object-cover" />
              {idx === 0 && (
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                  Primary Cover
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* VIDEO TOUR MANAGER */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-amber-400" />
            <span>Virtual Video Walkthrough Tour</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Provide a video tour link (YouTube embed, Vimeo, or direct MP4 link). This displays a prominent Video Tour player on the public property listing.
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200">Video Walkthrough URL</label>
            <input
              type="text"
              placeholder="e.g. https://www.youtube.com/watch?v=... or direct MP4 video link"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          {/* Video Preview */}
          {videoUrl && (
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5" />
                <span>Live Video Tour Preview</span>
              </div>
              {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                <div className="aspect-video w-full max-w-lg rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={
                      videoUrl.includes('watch?v=')
                        ? videoUrl.replace('watch?v=', 'embed/')
                        : videoUrl.includes('youtu.be/')
                        ? videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')
                        : videoUrl
                    }
                    title="Video Preview"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video w-full max-w-lg rounded-lg overflow-hidden bg-black">
                  <video src={videoUrl} controls className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Amenities & Features */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span>Amenities & Title Documents</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Check all relevant features, infrastructure provisions, and title guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_AMENITIES.map((amenity) => {
            const checked = amenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2.5 ${
                  checked
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : 'bg-black/30 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                    checked
                      ? 'bg-amber-500 border-amber-400 text-slate-950'
                      : 'border-slate-600 bg-transparent'
                  }`}
                >
                  {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span>{amenity}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 space-y-4">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>Comprehensive Description</span>
          </h2>
        </div>
        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed architectural specifications, payment milestones, title certificates, neighborhood landmarks..."
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
        />
      </div>

      {/* Visibility Toggles & Submission Bar */}
      <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 border-slate-600 bg-black/40"
            />
            <span className="text-xs font-bold text-slate-200">
              Feature on Homepage Showcase
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 border-slate-600 bg-black/40"
            />
            <span className="text-xs font-bold text-slate-200">
              Verified Title Badge
            </span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/properties"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs border border-white/10 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                <span>Saving Listing...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEditing ? 'Save Changes' : 'Publish Property / Land'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
