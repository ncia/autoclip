'use client';

import React from 'react';
import { Plus, MonitorPlay, Music2, Camera, AlertCircle, RefreshCw, Unplug, CheckCircle2 } from 'lucide-react';

const ACCOUNTS = [
  { 
    id: 1, 
    platform: 'YouTube', 
    handle: '@TechNewsDaily', 
    status: 'Connected', 
    followers: '14.2K', 
    lastSync: '10 mins ago',
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop&q=80',
    color: 'from-red-500/20 to-transparent',
    borderColor: 'border-red-500/30 hover:border-red-500/60',
    icon: <MonitorPlay className="text-red-500" />
  },
  { 
    id: 2, 
    platform: 'TikTok', 
    handle: '@technews_clips', 
    status: 'Token Expiring', 
    followers: '85.4K', 
    lastSync: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop&q=80',
    color: 'from-[#00f2fe]/20 to-transparent',
    borderColor: 'border-[#00f2fe]/30 hover:border-[#00f2fe]/60',
    icon: <Music2 className="text-[#00f2fe]" />
  },
  { 
    id: 3, 
    platform: 'Instagram', 
    handle: '@technews_official', 
    status: 'Disconnected', 
    followers: '12K', 
    lastSync: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop&q=80',
    color: 'from-pink-500/20 to-transparent',
    borderColor: 'border-pink-500/30 hover:border-pink-500/60',
    icon: <Camera className="text-pink-500" />
  },
  { 
    id: 4, 
    platform: 'YouTube', 
    handle: '@LexPodcastClips', 
    status: 'Connected', 
    followers: '2.1M', 
    lastSync: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=100&h=100&fit=crop&q=80',
    color: 'from-red-500/20 to-transparent',
    borderColor: 'border-red-500/30 hover:border-red-500/60',
    icon: <MonitorPlay className="text-red-500" />
  }
];

export default function AccountsPage() {
  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mt-2 md:mt-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-50 tracking-tight">Connected Accounts</h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-400">
            Manage your social media channels for automated uploads.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Add New Account Card */}
        <button className="group bg-[#18181b]/40 hover:bg-[#18181b]/80 border-2 border-dashed border-[#27272a] hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] gap-4 cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-zinc-800/50 group-hover:bg-blue-500/20 flex items-center justify-center transition-colors">
            <Plus size={32} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors">Connect New Account</h3>
            <p className="text-sm text-zinc-500 mt-1">YouTube, TikTok, or Instagram</p>
          </div>
        </button>

        {/* Existing Accounts */}
        {ACCOUNTS.map(acc => (
          <div key={acc.id} className={`group relative bg-[#18181b] border ${acc.borderColor} rounded-2xl p-6 transition-all duration-300 shadow-lg overflow-hidden flex flex-col`}>
            
            {/* Background Glow */}
            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${acc.color} opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none`} />

            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={acc.avatar} alt={acc.handle} className="w-14 h-14 rounded-full border-2 border-[#18181b] shadow-md" />
                  <div className="absolute -bottom-1 -right-1 p-1 bg-[#18181b] rounded-full">
                    {acc.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">{acc.handle}</h3>
                  <p className="text-sm text-zinc-400 font-medium">{acc.platform}</p>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="flex items-center">
                {acc.status === 'Connected' && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    <CheckCircle2 size={14} /> Active
                  </span>
                )}
                {acc.status === 'Token Expiring' && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold animate-pulse">
                    <AlertCircle size={14} /> Expiring
                  </span>
                )}
                {acc.status === 'Disconnected' && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-bold">
                    <Unplug size={14} /> Offline
                  </span>
                )}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50 mb-6">
              <div>
                <p className="text-xs text-zinc-500 mb-0.5">Followers</p>
                <p className="text-sm font-semibold text-zinc-200">{acc.followers}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-0.5">Last Synced</p>
                <p className="text-sm font-semibold text-zinc-200">{acc.lastSync}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="relative z-10 flex gap-3 mt-auto">
              <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium py-2 rounded-lg transition-colors text-sm">
                <RefreshCw size={16} /> Sync Now
              </button>
              <button className="px-3 py-2 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-500/30">
                <Unplug size={18} />
              </button>
            </div>
            
          </div>
        ))}
      </section>
    </main>
  );
}
