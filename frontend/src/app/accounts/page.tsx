'use client';

import React, { useState, useEffect } from 'react';
import { Plus, MonitorPlay, Music2, Camera, AlertCircle, RefreshCw, Unplug, CheckCircle2, X } from 'lucide-react';

interface Account {
  id: string;
  email: string;
  status: string;
  platforms: string[];
  persona: any;
  has_youtube_token: boolean;
  has_tiktok_token: boolean;
  has_instagram_token: boolean;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAccountId, setNewAccountId] = useState('');
  const [newPlatform, setNewPlatform] = useState('youtube');
  const [isLoading, setIsLoading] = useState(false);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/accounts`);
      if (res.ok) {
        const data = await res.json();
        setAccounts(data);
      }
    } catch (err) {
      console.error("Failed to fetch accounts", err);
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newAccountId,
          email: '', // Optional for now
          platforms: newPlatform
        })
      });
      
      if (res.ok) {
        // Redirect to OAuth
        window.location.href = `${API_URL}/api/auth/${newPlatform}/login?account_id=${newAccountId}`;
      } else {
        alert("Failed to create account. ID might already exist.");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating account");
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformInfo = (platforms: string[], yt: boolean, tt: boolean, ig: boolean) => {
    if (yt || platforms.includes('youtube')) return { name: 'YouTube', icon: <MonitorPlay className="text-red-500" />, color: 'from-red-500/20 to-transparent', borderColor: 'border-red-500/30 hover:border-red-500/60' };
    if (tt || platforms.includes('tiktok')) return { name: 'TikTok', icon: <Music2 className="text-[#00f2fe]" />, color: 'from-[#00f2fe]/20 to-transparent', borderColor: 'border-[#00f2fe]/30 hover:border-[#00f2fe]/60' };
    if (ig || platforms.includes('instagram')) return { name: 'Instagram', icon: <Camera className="text-pink-500" />, color: 'from-pink-500/20 to-transparent', borderColor: 'border-pink-500/30 hover:border-pink-500/60' };
    return { name: 'Unknown', icon: <MonitorPlay className="text-zinc-500" />, color: 'from-zinc-500/20 to-transparent', borderColor: 'border-zinc-500/30 hover:border-zinc-500/60' };
  };

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
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group bg-[#18181b]/40 hover:bg-[#18181b]/80 border-2 border-dashed border-[#27272a] hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] gap-4 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-zinc-800/50 group-hover:bg-blue-500/20 flex items-center justify-center transition-colors">
            <Plus size={32} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors">Connect New Account</h3>
            <p className="text-sm text-zinc-500 mt-1">YouTube, TikTok, or Instagram</p>
          </div>
        </button>

        {/* Existing Accounts */}
        {accounts.map(acc => {
          const info = getPlatformInfo(acc.platforms, acc.has_youtube_token, acc.has_tiktok_token, acc.has_instagram_token);
          const isConnected = acc.has_youtube_token || acc.has_tiktok_token || acc.has_instagram_token;

          return (
            <div key={acc.id} className={`group relative bg-[#18181b] border ${info.borderColor} rounded-2xl p-6 transition-all duration-300 shadow-lg overflow-hidden flex flex-col`}>
              
              {/* Background Glow */}
              <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${info.color} opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none`} />

              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-[#18181b] shadow-md bg-zinc-800 flex items-center justify-center">
                      <span className="text-lg font-bold text-zinc-400">{acc.id.substring(0,2).toUpperCase()}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-1 bg-[#18181b] rounded-full">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100">@{acc.id}</h3>
                    <p className="text-sm text-zinc-400 font-medium">{info.name}</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="flex items-center">
                  {isConnected ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                      <CheckCircle2 size={14} /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold animate-pulse">
                      <AlertCircle size={14} /> Pending
                    </span>
                  )}
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-4 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50 mb-6">
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Quota</p>
                  <p className="text-sm font-semibold text-zinc-200">{acc.persona?.quota || 0} clips/day</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Template</p>
                  <p className="text-sm font-semibold text-zinc-200 truncate">{acc.persona?.template || 'None'}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="relative z-10 flex gap-3 mt-auto">
                <button 
                  onClick={() => window.location.href = `${API_URL}/api/auth/${acc.platforms[0] || 'youtube'}/login?account_id=${acc.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium py-2 rounded-lg transition-colors text-sm"
                >
                  <RefreshCw size={16} /> Re-sync
                </button>
                <button className="px-3 py-2 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-500/30">
                  <Unplug size={18} />
                </button>
              </div>
              
            </div>
          )
        })}
      </section>

      {/* Add Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-[#27272a]">
              <h2 className="text-xl font-bold text-zinc-50">Connect New Account</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddAccount} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Account Handle / ID</label>
                <input 
                  type="text" 
                  value={newAccountId}
                  onChange={(e) => setNewAccountId(e.target.value)}
                  placeholder="e.g. TechNewsDaily"
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Platform</label>
                <div className="grid grid-cols-3 gap-3">
                  <button type="button" onClick={() => setNewPlatform('youtube')} className={`p-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${newPlatform === 'youtube' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-[#09090b] border-[#27272a] text-zinc-500 hover:border-zinc-600'}`}>
                    <MonitorPlay size={24} />
                    <span className="text-xs font-medium">YouTube</span>
                  </button>
                  <button type="button" onClick={() => setNewPlatform('tiktok')} className={`p-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${newPlatform === 'tiktok' ? 'bg-[#00f2fe]/10 border-[#00f2fe]/50 text-[#00f2fe]' : 'bg-[#09090b] border-[#27272a] text-zinc-500 hover:border-zinc-600'}`}>
                    <Music2 size={24} />
                    <span className="text-xs font-medium">TikTok</span>
                  </button>
                  <button type="button" onClick={() => setNewPlatform('instagram')} className={`p-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${newPlatform === 'instagram' ? 'bg-pink-500/10 border-pink-500/50 text-pink-400' : 'bg-[#09090b] border-[#27272a] text-zinc-500 hover:border-zinc-600'}`}>
                    <Camera size={24} />
                    <span className="text-xs font-medium">Instagram</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors text-sm"
                >
                  {isLoading ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
