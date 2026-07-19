'use client';

import React, { useState } from 'react';
import { Cpu, Cloud, Database, Globe, Share2, Save, Key, CheckCircle2, Eye, EyeOff } from 'lucide-react';

type TabType = 'ai' | 'worker' | 'sourcing' | 'hosting' | 'social';

export default function ApiKeysPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ai');
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const toggleVisibility = (key: string) => {
    setVisibleKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'ai', label: 'AI & Intelligence', icon: Cpu },
    { id: 'worker', label: 'Video Processing', icon: Cloud },
    { id: 'sourcing', label: 'Sourcing & Data', icon: Database },
    { id: 'hosting', label: 'Infrastructure', icon: Globe },
    { id: 'social', label: 'Social Publishing', icon: Share2 },
  ];

  const renderInput = (id: string, label: string, placeholder: string, type: 'text' | 'password' = 'password') => (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
      <div className="relative">
        <input 
          type={type === 'password' && !visibleKeys[id] ? 'password' : 'text'} 
          placeholder={placeholder}
          className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2.5 pr-10 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
        />
        {type === 'password' && (
          <button 
            type="button"
            onClick={() => toggleVisibility(id)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {visibleKeys[id] ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mt-2 md:mt-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-50 tracking-tight flex items-center gap-3">
            <Key className="text-blue-500" />
            API Management
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your global API keys, tokens, and app credentials across the entire system.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <CheckCircle2 size={16} /> Keys auto-save on change
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Vertical Tabs Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                      : 'bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-zinc-200 hover:bg-[#27272a]'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-blue-200' : 'text-zinc-500'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Tab Content */}
        <div className="flex-1">
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 min-h-[500px]">
            
            {/* AI & Intelligence */}
            {activeTab === 'ai' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-[#27272a] pb-4">
                  <h2 className="text-xl font-bold text-zinc-50 flex items-center gap-2">
                    <Cpu className="text-blue-400" /> AI & Intelligence
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">Configure models for transcription (Whisper) and highlight extraction (GPT-4o).</p>
                </div>
                <div className="space-y-6">
                  {renderInput('openai', 'OpenAI API Key', 'sk-proj-...', 'password')}
                  {renderInput('gemini', 'Google Gemini API Key', 'AIzaSy...', 'password')}
                </div>
              </div>
            )}

            {/* Video Processing */}
            {activeTab === 'worker' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-[#27272a] pb-4">
                  <h2 className="text-xl font-bold text-zinc-50 flex items-center gap-2">
                    <Cloud className="text-purple-400" /> Video Processing
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">Cloud rendering configuration for heavy FFmpeg tasks.</p>
                </div>
                <div className="space-y-6">
                  {renderInput('modal_id', 'Modal API Token ID', 'ak-...', 'text')}
                  {renderInput('modal_secret', 'Modal API Token Secret', 'as-...', 'password')}
                </div>
              </div>
            )}

            {/* Sourcing & Data */}
            {activeTab === 'sourcing' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-[#27272a] pb-4">
                  <h2 className="text-xl font-bold text-zinc-50 flex items-center gap-2">
                    <Database className="text-emerald-400" /> Sourcing & Data
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">APIs to discover viral videos and bypass scraping restrictions.</p>
                </div>
                <div className="space-y-6">
                  {renderInput('yt_data', 'YouTube Data API v3 Key', 'AIzaSy...', 'password')}
                  {renderInput('proxy', 'Proxy / Scraping API Key (Optional)', 'BrightData or similar key...', 'password')}
                </div>
              </div>
            )}

            {/* Infrastructure */}
            {activeTab === 'hosting' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-[#27272a] pb-4">
                  <h2 className="text-xl font-bold text-zinc-50 flex items-center gap-2">
                    <Globe className="text-sky-400" /> Infrastructure
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">Manage server auto-scaling and domain configuration.</p>
                </div>
                <div className="space-y-6">
                  {renderInput('vultr', 'Vultr API Key', 'Enter Vultr API Key...', 'password')}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('domain', 'Primary Domain', 'e.g. autoclip.io', 'text')}
                    {renderInput('subdomain', 'Host / Subdomain', 'e.g. api, app, or @', 'text')}
                  </div>
                </div>
              </div>
            )}

            {/* Social Publishing */}
            {activeTab === 'social' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-[#27272a] pb-4">
                  <h2 className="text-xl font-bold text-zinc-50 flex items-center gap-2">
                    <Share2 className="text-pink-400" /> Social Publishing App Credentials
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">Global App credentials needed to allow your users to connect their channels.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-[#09090b] p-5 rounded-xl border border-[#27272a]">
                    <h3 className="text-md font-semibold text-zinc-200 mb-4">YouTube (Google Cloud OAuth)</h3>
                    <div className="space-y-4">
                      {renderInput('yt_client_id', 'Client ID', '...apps.googleusercontent.com', 'text')}
                      {renderInput('yt_client_secret', 'Client Secret', 'GOCSPX-...', 'password')}
                    </div>
                  </div>

                  <div className="bg-[#09090b] p-5 rounded-xl border border-[#27272a]">
                    <h3 className="text-md font-semibold text-zinc-200 mb-4">TikTok For Developers</h3>
                    <div className="space-y-4">
                      {renderInput('tt_client_key', 'Client Key', 'aw...', 'text')}
                      {renderInput('tt_client_secret', 'Client Secret', '...', 'password')}
                    </div>
                  </div>

                  <div className="bg-[#09090b] p-5 rounded-xl border border-[#27272a]">
                    <h3 className="text-md font-semibold text-zinc-200 mb-4">Instagram Graph API (Meta)</h3>
                    <div className="space-y-4">
                      {renderInput('ig_app_id', 'App ID', '...', 'text')}
                      {renderInput('ig_app_secret', 'App Secret', '...', 'password')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#27272a] flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
