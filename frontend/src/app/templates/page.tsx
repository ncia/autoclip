'use client';

import React from 'react';
import { Plus, Type, PaintBucket, LayoutTemplate, MoreVertical, Edit2, Copy, Trash2, CheckCircle } from 'lucide-react';

const TEMPLATES = [
  { id: 1, name: 'Tech Review V1 (Default)', type: 'Auto Subtitles', isDefault: true, font: 'Inter, Bold', color: '#FFFFFF, Stroke #000000', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=400&fit=crop&q=80' },
  { id: 2, name: 'Gaming Bold', type: 'Subtitle + Progress Bar', isDefault: false, font: 'Oswald, Black', color: '#00F2FE', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop&q=80' },
  { id: 3, name: 'Minimalist Vlog', type: 'Aesthetic Subtitles', isDefault: false, font: 'Playfair Display', color: '#F1F5F9', thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=400&fit=crop&q=80' },
  { id: 4, name: 'Podcast Split Screen', type: 'Split Screen + Text', isDefault: false, font: 'Roboto, Medium', color: '#FFB800', thumbnail: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=300&h=400&fit=crop&q=80' },
];

export default function TemplatesPage() {
  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mt-2 md:mt-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-50 tracking-tight">Templates & Brand Kit</h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-400">
            Design and manage custom subtitle styles, overlays, and branding assets.
          </p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] whitespace-nowrap">
          <Plus size={18} />
          <span>New Template</span>
        </button>
      </header>

      {/* Grid View */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEMPLATES.map((tpl) => (
          <div key={tpl.id} className="group bg-[#18181b]/80 backdrop-blur-md border border-[#27272a] rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] flex flex-col relative cursor-pointer">
            
            {/* Visual Thumbnail */}
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 flex items-center justify-center">
              <img src={tpl.thumbnail} alt={tpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-40" />
              
              {/* Mockup Overlay Text */}
              <div className="absolute inset-x-0 bottom-1/4 flex flex-col items-center gap-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                <span className="text-2xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-center uppercase px-4 leading-tight">
                  YOUR EPIC<br/>SUBTITLES HERE
                </span>
                {tpl.isDefault && (
                  <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                    <CheckCircle size={12} /> Default
                  </div>
                )}
              </div>

              {/* Hover Actions Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                <button className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all delay-75" title="Edit Template">
                  <Edit2 size={18} />
                </button>
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all delay-100" title="Duplicate">
                  <Copy size={18} />
                </button>
                <button className="p-3 bg-red-600/80 hover:bg-red-500 text-white rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all delay-150" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Info Footer */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-t from-zinc-900/50 to-transparent">
              <div>
                <h3 className="text-base font-bold text-zinc-100 group-hover:text-blue-400 transition-colors truncate pr-6">{tpl.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5"><LayoutTemplate size={12}/> {tpl.type}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Type size={14} className="text-zinc-500" /> <span className="truncate">{tpl.font}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <PaintBucket size={14} className="text-zinc-500" /> <span className="truncate">{tpl.color}</span>
                </div>
              </div>
            </div>

            {/* Context Menu Icon */}
            <button className="absolute bottom-[110px] right-3 p-1.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 rounded-lg backdrop-blur-md transition-colors z-10">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}

        {/* Create New Card */}
        <button className="group bg-[#18181b]/40 hover:bg-[#18181b]/80 border-2 border-dashed border-[#27272a] hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center min-h-[400px] gap-4 cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-zinc-800/50 group-hover:bg-blue-500/20 flex items-center justify-center transition-colors">
            <Plus size={32} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors">Create Blank Template</h3>
            <p className="text-sm text-zinc-500 mt-1">Start from scratch with the visual editor</p>
          </div>
        </button>

      </section>
    </main>
  );
}
