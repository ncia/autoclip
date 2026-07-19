'use client';

import React, { useState } from 'react';
import { Search, UploadCloud, Filter, Video, Music, Image as ImageIcon, Download, PlayCircle, MoreHorizontal } from 'lucide-react';

const TABS = ['All Assets', 'Videos', 'Audio', 'Images'];

const ASSETS = [
  { id: 1, type: 'Video', title: 'Tech_Review_Raw_1.mp4', size: '1.2 GB', duration: '12:45', thumbnail: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=400&h=250&fit=crop&q=80', date: '2 hours ago' },
  { id: 2, type: 'Audio', title: 'LoFi_Chill_Beat.mp3', size: '4.5 MB', duration: '03:20', thumbnail: null, date: '1 day ago' },
  { id: 3, type: 'Video', title: 'Lex_Fridman_Ep_142.mp4', size: '3.4 GB', duration: '2:15:30', thumbnail: 'https://images.unsplash.com/photo-1516280440502-a27dd8bf5176?w=400&h=250&fit=crop&q=80', date: '2 days ago' },
  { id: 4, type: 'Image', title: 'Channel_Logo_Dark.png', size: '250 KB', duration: null, thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop&q=80', date: '5 days ago' },
  { id: 5, type: 'Video', title: 'B_Roll_City_Night.mp4', size: '850 MB', duration: '01:15', thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=250&fit=crop&q=80', date: '1 week ago' },
  { id: 6, type: 'Audio', title: 'Whoosh_Transition_3.wav', size: '1.2 MB', duration: '00:03', thumbnail: null, date: '1 week ago' },
];

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState('All Assets');

  const filteredAssets = activeTab === 'All Assets' 
    ? ASSETS 
    : ASSETS.filter(a => a.type === activeTab.replace('s', '').replace('Images', 'Image')); // Simple plural hack for mock

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mt-2 md:mt-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-50 tracking-tight">Assets Library</h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-400">
            Manage your downloaded videos, B-rolls, background music, and branding files.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="pl-10 pr-4 py-2.5 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-64 transition-all"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] whitespace-nowrap">
            <UploadCloud size={18} />
            <span>Upload</span>
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-zinc-100 text-zinc-900 shadow-md' 
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-700/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-[#27272a] hover:bg-zinc-800 rounded-lg text-sm font-medium text-zinc-300 transition-colors w-fit">
          <Filter size={16} /> Filter & Sort
        </button>
      </div>

      {/* Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="group bg-[#18181b]/80 backdrop-blur-md border border-[#27272a] hover:border-zinc-600 rounded-xl overflow-hidden transition-all duration-300 shadow-lg cursor-pointer flex flex-col">
            
            {/* Thumbnail Area */}
            <div className="relative aspect-video bg-zinc-900 overflow-hidden flex items-center justify-center">
              {asset.thumbnail ? (
                <img src={asset.thumbnail} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-60" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover:scale-105 transition-transform duration-500">
                  {asset.type === 'Audio' ? <Music size={40} className="text-zinc-600" /> : <ImageIcon size={40} className="text-zinc-600" />}
                </div>
              )}
              
              {/* Duration Badge */}
              {asset.duration && (
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm rounded text-[10px] font-medium text-white tracking-wider">
                  {asset.duration}
                </div>
              )}
              
              {/* Type Badge */}
              <div className="absolute top-2 left-2 p-1.5 bg-black/50 backdrop-blur-md rounded-md text-white">
                {asset.type === 'Video' && <Video size={14} />}
                {asset.type === 'Audio' && <Music size={14} />}
                {asset.type === 'Image' && <ImageIcon size={14} />}
              </div>

              {/* Hover Overlay Play/Download */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                {(asset.type === 'Video' || asset.type === 'Audio') && (
                  <button className="text-white hover:text-blue-400 transform scale-75 group-hover:scale-100 transition-all duration-300 delay-75">
                    <PlayCircle size={48} strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>

            {/* Info Area */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 truncate group-hover:text-blue-400 transition-colors mb-1" title={asset.title}>
                  {asset.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-zinc-500">{asset.size}</span>
                  <span className="text-xs text-zinc-500">{asset.date}</span>
                </div>
              </div>
            </div>

            {/* Context Menu / Actions Row */}
            <div className="px-4 py-2.5 border-t border-[#27272a]/50 bg-zinc-900/30 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="text-zinc-400 hover:text-blue-400 transition-colors p-1" title="Download">
                <Download size={16} />
              </button>
              <button className="text-zinc-400 hover:text-zinc-100 transition-colors p-1">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
