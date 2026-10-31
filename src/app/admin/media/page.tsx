'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Video,
  Copy,
  CheckCircle2,
  ExternalLink,
  Play,
  Sparkles,
  Layers,
} from 'lucide-react';

interface MediaAsset {
  id: string;
  name: string;
  category: 'guzape' | 'mbora' | 'land' | 'royale' | 'interior' | 'video';
  type: 'image' | 'video';
  url: string;
  tag: string;
}

const REGIS_MEDIA: MediaAsset[] = [
  {
    id: 'm-1',
    name: 'Guzape 6-Bedroom Luxury Terrace Elevation',
    category: 'guzape',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg',
    tag: 'Cadastral Zone A09',
  },
  {
    id: 'm-2',
    name: 'FHA Mbora Semi-Detached Duplex Architectural 3D',
    category: 'mbora',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2022/08/post3.jpg',
    tag: 'FHA Golden Jubilee',
  },
  {
    id: 'm-3',
    name: 'Modern Contemporary Living Room Fit-Out',
    category: 'interior',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2022/08/JaysvilleInterior-Design-Architectural-Design.jpg',
    tag: 'Luxury Interiors',
  },
  {
    id: 'm-4',
    name: 'Regis Royale Live Superstructure Onsite Progress',
    category: 'royale',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.39.jpeg',
    tag: 'Structural Milestone',
  },
  {
    id: 'm-5',
    name: 'Imported Marble Floor & Cove Lighting Finish',
    category: 'interior',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.36-1.jpeg',
    tag: 'Turnkey Finishes',
  },
  {
    id: 'm-6',
    name: 'Subterranean Walkout Basement Retaining Walls',
    category: 'guzape',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.34-1.jpeg',
    tag: 'Civil Engineering',
  },
  {
    id: 'm-7',
    name: 'Drone Aerial Landscape & Valley Views',
    category: 'guzape',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/WhatsApp-Image-2024-08-26-at-16.42.33.jpeg',
    tag: 'Hilltop Panorama',
  },
  {
    id: 'm-8',
    name: 'Lugbe Serviced Estate Land Layout (500 SQM)',
    category: 'land',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/land-270x270_c.jpg',
    tag: 'Airport Road Corridor',
  },
  {
    id: 'm-9',
    name: 'Idu Industrial Layout Serviced Plot (250 SQM)',
    category: 'land',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/land2-270x270_c.jpg',
    tag: 'Railway Station Axis',
  },
  {
    id: 'm-10',
    name: 'FHA Mbora 2 & 3 Bedroom Block of Flats',
    category: 'mbora',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/3D3_042345-270x270_c.jpg',
    tag: 'FHA Affordable Block',
  },
  {
    id: 'm-11',
    name: 'Regis Royale Luxury Villa Showcase',
    category: 'royale',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2024/10/3D10_042151.jpg',
    tag: 'Estate Landmark',
  },
  {
    id: 'm-12',
    name: 'Regis Integrated Services Corporate Brand Identity',
    category: 'interior',
    type: 'image',
    url: 'https://www.regis.com.ng/wp-content/uploads/2016/07/logoconstruction.png',
    tag: 'Logo Vector Asset',
  },
];

export default function AdminMediaPage() {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filtered =
    filterCategory === 'all'
      ? REGIS_MEDIA
      : REGIS_MEDIA.filter((m) => m.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Asset Repository</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Regis Media & Video Tour Assets
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          High-resolution photography, 3D architectural renders, and video tour assets for use in property listings and page sections.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {[
          { key: 'all', label: 'All Assets' },
          { key: 'guzape', label: 'Guzape Luxury Terraces' },
          { key: 'mbora', label: 'FHA Mbora Estate' },
          { key: 'land', label: 'Lugbe & Idu Serviced Land' },
          { key: 'royale', label: 'Regis Royale Onsite' },
          { key: 'interior', label: 'Interior Fit-Outs' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterCategory(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === tab.key
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'bg-[#0B1120] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((asset) => (
          <div
            key={asset.id}
            className="rounded-2xl bg-[#0B1120] border border-white/10 overflow-hidden group hover:border-amber-500/30 transition-all flex flex-col"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[16/10] w-full bg-slate-950">
              <Image
                src={asset.url}
                alt={asset.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-amber-500/20">
                {asset.tag}
              </div>
            </div>

            {/* Info & Copy Bar */}
            <div className="p-4 flex-1 flex flex-col justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold text-white leading-snug">{asset.name}</h3>
                <p className="text-[10px] text-slate-500 font-mono truncate mt-1">{asset.url}</p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handleCopy(asset.id, asset.url)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors"
                >
                  {copiedId === asset.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Open Full Image"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
