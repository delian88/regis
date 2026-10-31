'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FileEdit,
  Save,
  CheckCircle2,
  Sparkles,
  Layers,
  Building,
  Image as ImageIcon,
  Phone,
  Compass,
  ArrowRight,
  Plus,
  Trash2,
  RotateCcw,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { DEFAULT_SITE_CONTENT, SiteContentMap } from '@/db/site-content-types';

type TabKey =
  | 'hero'
  | 'pillars'
  | 'story'
  | 'gallery'
  | 'cta'
  | 'about'
  | 'projects'
  | 'building_types'
  | 'contact';

export default function AdminCMSPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('hero');
  const [content, setContent] = useState<SiteContentMap>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Read URL query param if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as TabKey;
      if (tabParam) setActiveTab(tabParam);
    }
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      if (data.success && data.data) {
        setContent(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveSection = async (sectionKey: keyof SiteContentMap) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: sectionKey,
          data: content[sectionKey],
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Section "${sectionKey.replace('_', ' ').toUpperCase()}" saved successfully!`);
      } else {
        alert(data.error || 'Failed saving section.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating section.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!confirm('Are you sure you want to reset all site content to original Regis defaults?')) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' }),
      });
      const data = await res.json();
      if (data.success) {
        setContent(data.data);
        showToast('Site content reset to official defaults.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { key: 'hero', label: '1. Landing Hero', icon: Sparkles },
    { key: 'pillars', label: '2. Core Pillars', icon: Layers },
    { key: 'story', label: '3. Corporate Story', icon: BookOpen },
    { key: 'gallery', label: '4. Regis Gallery', icon: ImageIcon },
    { key: 'cta', label: '5. Landing CTA', icon: ArrowRight },
    { key: 'about', label: '6. About Us Page', icon: Building },
    { key: 'projects', label: '7. Projects Page', icon: Compass },
    { key: 'building_types', label: '8. Building Types', icon: Layers },
    { key: 'contact', label: '9. Contact & Profile', icon: Phone },
  ];

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading CMS editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-2xl shadow-amber-500/40 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
            <FileEdit className="w-3.5 h-3.5" />
            <span>Regis Visual CMS Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Landing Page & Subpages Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Edit every text block, banner, pillar, statistic, and gallery photo across the website in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 text-xs font-semibold border border-white/5 transition-colors"
            title="Reset to Regis Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <a
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors"
          >
            <span>Preview Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>
      </div>

      {/* Section Tabs Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-[#0B1120] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO SECTION */}
      {activeTab === 'hero' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Landing Page Hero Section</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Top banner with trust badge, headline, and search background.
              </p>
            </div>
            <button
              onClick={() => handleSaveSection('homepage_hero')}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Hero Changes</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Eyebrow Trust Badge</label>
              <input
                type="text"
                value={content.homepage_hero.badge}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_hero: { ...content.homepage_hero, badge: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Main Headline (H1)</label>
              <input
                type="text"
                value={content.homepage_hero.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_hero: { ...content.homepage_hero, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Subheadline & Welcome Message</label>
              <textarea
                rows={3}
                value={content.homepage_hero.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_hero: { ...content.homepage_hero, subtitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Background Image URL</label>
              <input
                type="url"
                value={content.homepage_hero.backgroundImage}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_hero: { ...content.homepage_hero, backgroundImage: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PILLARS SECTION */}
      {activeTab === 'pillars' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Landing Page 3 Core Pillars</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                The 3 architectural pillars displayed prominently right below the hero search.
              </p>
            </div>
            <button
              onClick={() => handleSaveSection('homepage_pillars')}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Pillars</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Section Tag</label>
              <input
                type="text"
                value={content.homepage_pillars.tag}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_pillars: { ...content.homepage_pillars, tag: e.target.value },
                  })
                }
                className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Section Heading</label>
              <input
                type="text"
                value={content.homepage_pillars.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_pillars: { ...content.homepage_pillars, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* 3 Pillars List */}
          <div className="space-y-6">
            {content.homepage_pillars.pillars.map((pillar, idx) => (
              <div
                key={pillar.id || idx}
                className="p-5 rounded-xl bg-black/30 border border-white/5 space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>Pillar #{idx + 1}: {pillar.title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-300">Pillar Title</label>
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => {
                        const updated = [...content.homepage_pillars.pillars];
                        updated[idx].title = e.target.value;
                        setContent({
                          ...content,
                          homepage_pillars: { ...content.homepage_pillars, pillars: updated },
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-300">Tag / Badge</label>
                    <input
                      type="text"
                      value={pillar.tag}
                      onChange={(e) => {
                        const updated = [...content.homepage_pillars.pillars];
                        updated[idx].tag = e.target.value;
                        setContent({
                          ...content,
                          homepage_pillars: { ...content.homepage_pillars, pillars: updated },
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-300">Image URL</label>
                    <input
                      type="url"
                      value={pillar.image}
                      onChange={(e) => {
                        const updated = [...content.homepage_pillars.pillars];
                        updated[idx].image = e.target.value;
                        setContent({
                          ...content,
                          homepage_pillars: { ...content.homepage_pillars, pillars: updated },
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="sm:col-span-3 space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-300">Description</label>
                    <textarea
                      rows={2}
                      value={pillar.description}
                      onChange={(e) => {
                        const updated = [...content.homepage_pillars.pillars];
                        updated[idx].description = e.target.value;
                        setContent({
                          ...content,
                          homepage_pillars: { ...content.homepage_pillars, pillars: updated },
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CORPORATE STORY */}
      {activeTab === 'story' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>Corporate Story & Track Record</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                10-year company narrative, FHA partner badge, and 4 live metrics.
              </p>
            </div>
            <button
              onClick={() => handleSaveSection('homepage_story')}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Story Changes</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">Eyebrow Tag</label>
                <input
                  type="text"
                  value={content.homepage_story.tag}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      homepage_story: { ...content.homepage_story, tag: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">Headline</label>
                <input
                  type="text"
                  value={content.homepage_story.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      homepage_story: { ...content.homepage_story, title: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Paragraph 1</label>
              <textarea
                rows={3}
                value={content.homepage_story.p1}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_story: { ...content.homepage_story, p1: e.target.value },
                  })
                }
                className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Paragraph 2</label>
              <textarea
                rows={3}
                value={content.homepage_story.p2}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_story: { ...content.homepage_story, p2: e.target.value },
                  })
                }
                className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* 4 Statistics */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Track Record Metrics (4 Counters):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {content.homepage_story.stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-2">
                    <input
                      type="text"
                      value={stat.value}
                      placeholder="e.g. 10+"
                      onChange={(e) => {
                        const updated = [...content.homepage_story.stats];
                        updated[idx].value = e.target.value;
                        setContent({
                          ...content,
                          homepage_story: { ...content.homepage_story, stats: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1 rounded bg-black/50 border border-white/10 text-xs font-bold text-amber-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      placeholder="Label"
                      onChange={(e) => {
                        const updated = [...content.homepage_story.stats];
                        updated[idx].label = e.target.value;
                        setContent({
                          ...content,
                          homepage_story: { ...content.homepage_story, stats: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1 rounded bg-black/50 border border-white/10 text-[11px] text-white focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REGIS GALLERY */}
      {activeTab === 'gallery' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" />
                <span>Views & Sights Gallery (Regis Royale Estate)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Curate the on-site photo gallery showing real construction progress.
              </p>
            </div>
            <button
              onClick={() => handleSaveSection('homepage_gallery')}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Gallery Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Gallery Title</label>
              <input
                type="text"
                value={content.homepage_gallery.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_gallery: { ...content.homepage_gallery, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Gallery Subtitle</label>
              <input
                type="text"
                value={content.homepage_gallery.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_gallery: { ...content.homepage_gallery, subtitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Gallery Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Gallery Photos ({content.homepage_gallery.items.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const newItem = {
                    title: 'New Regis Site Progress Photo',
                    category: 'Structural Progress',
                    image: 'https://www.regis.com.ng/wp-content/uploads/2022/08/building.jpg',
                    desc: 'Real-time photographic view from the construction grounds.',
                  };
                  setContent({
                    ...content,
                    homepage_gallery: {
                      ...content.homepage_gallery,
                      items: [newItem, ...content.homepage_gallery.items],
                    },
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/20 hover:bg-amber-500/25"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Photo Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.homepage_gallery.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = content.homepage_gallery.items.filter((_, i) => i !== idx);
                      setContent({
                        ...content,
                        homepage_gallery: { ...content.homepage_gallery, items: updated },
                      });
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-white/10">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...content.homepage_gallery.items];
                          updated[idx].title = e.target.value;
                          setContent({
                            ...content,
                            homepage_gallery: { ...content.homepage_gallery, items: updated },
                          });
                        }}
                        className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs font-bold text-white focus:outline-none"
                      />
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...content.homepage_gallery.items];
                          updated[idx].category = e.target.value;
                          setContent({
                            ...content,
                            homepage_gallery: { ...content.homepage_gallery, items: updated },
                          });
                        }}
                        className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-[11px] text-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <input
                      type="url"
                      value={item.image}
                      placeholder="Image URL"
                      onChange={(e) => {
                        const updated = [...content.homepage_gallery.items];
                        updated[idx].image = e.target.value;
                        setContent({
                          ...content,
                          homepage_gallery: { ...content.homepage_gallery, items: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-[11px] text-slate-300 font-mono focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LANDING CTA */}
      {activeTab === 'cta' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-amber-400" />
                <span>Landing Page Call To Action (RegisCTA)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                The high-converting gold & dark banner inviting clients to build their dream.
              </p>
            </div>
            <button
              onClick={() => handleSaveSection('homepage_cta')}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save CTA Banner</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Main Headline</label>
              <input
                type="text"
                value={content.homepage_cta.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_cta: { ...content.homepage_cta, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Subtitle</label>
              <textarea
                rows={3}
                value={content.homepage_cta.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    homepage_cta: { ...content.homepage_cta, subtitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">Direct Phone Hotline</label>
                <input
                  type="text"
                  value={content.homepage_cta.phone}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      homepage_cta: { ...content.homepage_cta, phone: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">WhatsApp Number</label>
                <input
                  type="text"
                  value={content.homepage_cta.whatsapp}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      homepage_cta: { ...content.homepage_cta, whatsapp: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ABOUT US PAGE */}
      {activeTab === 'about' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                <span>About Us Page Content</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Corporate profile, mission, vision, and 6 core architectural services.
              </p>
            </div>
            <button
              onClick={() => handleSaveSection('about_page')}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save About Page</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">About Hero Title</label>
                <input
                  type="text"
                  value={content.about_page.heroTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about_page: { ...content.about_page, heroTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">Story Title</label>
                <input
                  type="text"
                  value={content.about_page.storyTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about_page: { ...content.about_page, storyTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Corporate Mission</label>
              <textarea
                rows={2}
                value={content.about_page.mission}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about_page: { ...content.about_page, mission: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Corporate Vision</label>
              <textarea
                rows={2}
                value={content.about_page.vision}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about_page: { ...content.about_page, vision: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* 6 Services */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                6 Turnkey Architecture & Construction Services:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.about_page.services.map((service, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-2">
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        const updated = [...content.about_page.services];
                        updated[idx].title = e.target.value;
                        setContent({
                          ...content,
                          about_page: { ...content.about_page, services: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs font-bold text-amber-400 focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      value={service.desc}
                      onChange={(e) => {
                        const updated = [...content.about_page.services];
                        updated[idx].desc = e.target.value;
                        setContent({
                          ...content,
                          about_page: { ...content.about_page, services: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-[11px] text-slate-300 focus:outline-none leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: PROJECTS PAGE */}
      {activeTab === 'projects' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Projects Page Header & Intro</span>
              </h2>
            </div>
            <button
              onClick={() => handleSaveSection('projects_page')}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Projects Intro</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Page Headline</label>
              <input
                type="text"
                value={content.projects_page.heroTitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    projects_page: { ...content.projects_page, heroTitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Subtitle</label>
              <input
                type="text"
                value={content.projects_page.heroSubtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    projects_page: { ...content.projects_page, heroSubtitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: BUILDING TYPES PAGE */}
      {activeTab === 'building_types' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Building Types & Architectural Units Page</span>
              </h2>
            </div>
            <button
              onClick={() => handleSaveSection('building_types_page')}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Page Headline</label>
              <input
                type="text"
                value={content.building_types_page.heroTitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    building_types_page: {
                      ...content.building_types_page,
                      heroTitle: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Subtitle</label>
              <input
                type="text"
                value={content.building_types_page.heroSubtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    building_types_page: {
                      ...content.building_types_page,
                      heroSubtitle: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: CONTACT & OFFICE INFO */}
      {activeTab === 'contact' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Contact Info, Telephone & Headquarters</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Controls the numbers and addresses shown in the header utility bar, contact page, and footer.
              </p>
            </div>
            <button
              onClick={() => handleSaveSection('contact_info')}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Contact Details</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Company Legal Name</label>
              <input
                type="text"
                value={content.contact_info.companyName}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact_info: { ...content.contact_info, companyName: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Primary Official Phone</label>
              <input
                type="text"
                value={content.contact_info.phonePrimary}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact_info: { ...content.contact_info, phonePrimary: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Secondary Phone</label>
              <input
                type="text"
                value={content.contact_info.phoneSecondary}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact_info: { ...content.contact_info, phoneSecondary: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">WhatsApp Number</label>
              <input
                type="text"
                value={content.contact_info.whatsapp}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact_info: { ...content.contact_info, whatsapp: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">General Inquiries Email</label>
              <input
                type="email"
                value={content.contact_info.email}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact_info: { ...content.contact_info, email: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Sales Email</label>
              <input
                type="email"
                value={content.contact_info.salesEmail}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact_info: { ...content.contact_info, salesEmail: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Corporate Head Office Address</label>
              <input
                type="text"
                value={content.contact_info.address}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact_info: { ...content.contact_info, address: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-200">Working / Inspection Hours</label>
              <input
                type="text"
                value={content.contact_info.workingHours}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact_info: { ...content.contact_info, workingHours: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
