'use client';

import React, { useState } from 'react';
import { User, Palette, HardDrive, Bell, Save, Shield } from 'lucide-react';

type SettingsTab = 'profile' | 'appearance' | 'storage' | 'notifications';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile & Security', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'storage', label: 'Storage Preferences', icon: HardDrive },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-50 tracking-tight flex items-center gap-3">
          <Shield className="text-zinc-400" />
          Environment Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Manage your app preferences, theme, and local environment.
        </p>
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
                  onClick={() => setActiveTab(tab.id as SettingsTab)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap ${
                    isActive 
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm' 
                      : 'bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-[#18181b]'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-zinc-200' : 'text-zinc-500'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Tab Content */}
        <div className="flex-1">
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-6 min-h-[500px]">
            
            {/* Profile & Security */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-[#27272a] pb-4">
                  <h2 className="text-xl font-bold text-zinc-50">Profile & Security</h2>
                  <p className="text-sm text-zinc-400 mt-1">Manage your administrator account details.</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue="Admin"
                      className="w-full md:w-2/3 bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="admin@autoclip.local"
                      className="w-full md:w-2/3 bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
                    <button className="px-4 py-2 bg-[#27272a] hover:bg-zinc-700 text-zinc-100 rounded-lg text-sm transition-colors">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-[#27272a] pb-4">
                  <h2 className="text-xl font-bold text-zinc-50">Appearance</h2>
                  <p className="text-sm text-zinc-400 mt-1">Customize how Auto Clip looks on your device.</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-3">Theme Preference</label>
                    <div className="flex gap-4">
                      <button className="flex-1 py-3 border-2 border-blue-500 bg-[#09090b] text-blue-400 rounded-xl font-medium text-sm">
                        Dark Mode
                      </button>
                      <button className="flex-1 py-3 border-2 border-[#27272a] hover:border-zinc-500 bg-zinc-100 text-zinc-500 rounded-xl font-medium text-sm transition-colors">
                        Light Mode
                      </button>
                      <button className="flex-1 py-3 border-2 border-[#27272a] hover:border-zinc-500 bg-[#18181b] text-zinc-400 rounded-xl font-medium text-sm transition-colors">
                        System
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Storage Preferences */}
            {activeTab === 'storage' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-[#27272a] pb-4">
                  <h2 className="text-xl font-bold text-zinc-50">Storage Preferences</h2>
                  <p className="text-sm text-zinc-400 mt-1">Manage local disk usage and cleanup rules.</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Original Source Video Retention</label>
                    <select className="w-full md:w-1/2 bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all text-sm appearance-none">
                      <option>Delete immediately after render</option>
                      <option>Keep for 24 hours</option>
                      <option>Keep for 7 days</option>
                      <option>Keep forever</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Local Storage Limit</label>
                    <div className="flex items-center gap-3 w-full md:w-1/2">
                      <input 
                        type="number" 
                        defaultValue={50}
                        className="flex-1 bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all text-sm"
                      />
                      <span className="text-zinc-400 text-sm">GB</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm transition-colors">
                      Clear Cache Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b border-[#27272a] pb-4">
                  <h2 className="text-xl font-bold text-zinc-50">Notifications</h2>
                  <p className="text-sm text-zinc-400 mt-1">Configure alerts for rendering completion and errors.</p>
                </div>
                
                <div className="space-y-6">
                  <label className="flex items-center justify-between p-4 border border-[#27272a] bg-[#09090b] rounded-xl cursor-pointer hover:border-zinc-600 transition-colors">
                    <div>
                      <p className="font-medium text-zinc-100 text-sm">Email Alerts</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Receive emails when long renders finish.</p>
                    </div>
                    <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 border border-[#27272a] bg-[#09090b] rounded-xl cursor-pointer hover:border-zinc-600 transition-colors">
                    <div>
                      <p className="font-medium text-zinc-100 text-sm">Error Webhook (Discord/Slack)</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Post an alert to your channel if rendering fails.</p>
                    </div>
                    <div className="w-10 h-5 bg-[#27272a] rounded-full relative">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-400 rounded-full"></div>
                    </div>
                  </label>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Webhook URL</label>
                    <input 
                      type="text" 
                      placeholder="https://discord.com/api/webhooks/..."
                      className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#27272a] flex justify-end">
              <button className="bg-zinc-100 hover:bg-white text-zinc-900 font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors">
                <Save size={18} /> Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
