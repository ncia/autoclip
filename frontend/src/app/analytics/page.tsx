'use client';

import React from 'react';
import { Eye, MousePointerClick, Video, Clock, TrendingUp, MonitorPlay, ChevronRight } from 'lucide-react';

const STATS = [
  { label: 'Total Views', value: '2.4M', trend: '+14.5%', isUp: true, icon: <Eye size={20} className="text-blue-400" /> },
  { label: 'Avg. Conversion', value: '4.8%', trend: '+2.1%', isUp: true, icon: <MousePointerClick size={20} className="text-emerald-400" /> },
  { label: 'Clips Generated', value: '1,248', trend: '+124', isUp: true, icon: <Video size={20} className="text-purple-400" /> },
  { label: 'Time Saved', value: '342h', trend: 'Steady', isUp: true, icon: <Clock size={20} className="text-amber-400" /> },
];

const TOP_CLIPS = [
  { id: 1, title: 'Apple Vision Pro Review - Mind Blown 🤯', views: '842K', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=200&h=300&fit=crop&q=80' },
  { id: 2, title: 'Lex Fridman & Elon Musk Highlights', views: '651K', platform: 'YouTube Shorts', thumbnail: 'https://images.unsplash.com/photo-1516280440502-a27dd8bf5176?w=200&h=300&fit=crop&q=80' },
  { id: 3, title: 'Best Mechanical Keyboards 2026', views: '420K', platform: 'Instagram Reels', thumbnail: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=200&h=300&fit=crop&q=80' },
  { id: 4, title: 'Elden Ring DLC Secret Boss', views: '380K', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=200&h=300&fit=crop&q=80' },
  { id: 5, title: 'Top 5 AI Tools you missed', views: '290K', platform: 'YouTube Shorts', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=300&fit=crop&q=80' },
];

export default function AnalyticsPage() {
  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <header className="mt-2 md:mt-0">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-50 tracking-tight">Analytics Overview</h1>
        <p className="mt-1 text-xs md:text-sm text-zinc-400">
          Monitor the performance of your automated pipelines across all connected channels.
        </p>
      </header>

      {/* Top Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((stat, idx) => (
          <div key={idx} className="bg-[#18181b]/80 backdrop-blur-md border border-[#27272a] hover:border-zinc-700 p-6 rounded-2xl transition-all duration-300 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:bg-white/10 transition-colors" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 shadow-inner">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.isUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-zinc-400 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-zinc-50 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart Mockup */}
        <section className="lg:col-span-2 bg-[#18181b]/80 backdrop-blur-md border border-[#27272a] rounded-2xl p-6 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-500" /> Growth Trends
            </h2>
            <select className="bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-zinc-600 cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[300px] rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 flex items-center justify-center relative overflow-hidden group">
            {/* Minimalist mock chart visual */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-blue-500/20 to-transparent blur-sm" />
            <svg className="w-full h-full absolute inset-0 opacity-70 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,90 Q15,70 30,80 T60,40 T100,20" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <path d="M0,100 Q20,80 40,85 T70,60 T100,40" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4" />
            </svg>
            <p className="text-zinc-500 font-medium z-10 bg-zinc-900/80 px-4 py-2 rounded-lg border border-zinc-800 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              Interactive Chart Placeholder
            </p>
          </div>
        </section>

        {/* Top Performing Clips */}
        <section className="bg-[#18181b]/80 backdrop-blur-md border border-[#27272a] rounded-2xl p-6 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <MonitorPlay size={18} className="text-purple-500" /> Top Clips
            </h2>
            <button className="text-xs font-medium text-blue-500 hover:text-blue-400 transition-colors">
              View All
            </button>
          </div>
          
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide">
            {TOP_CLIPS.map((clip, index) => (
              <div key={clip.id} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer border border-transparent hover:border-zinc-700/50">
                <div className="relative w-12 h-16 rounded-md overflow-hidden flex-shrink-0 border border-zinc-800">
                  <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                    #{index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-zinc-100 truncate group-hover:text-blue-400 transition-colors">{clip.title}</h4>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-medium text-zinc-500 truncate pr-2">{clip.platform}</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{clip.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
