import React from 'react';
import StatCard from '@/components/StatCard';
import PipelineStatus from '@/components/PipelineStatus';
import { Video, Clock, CheckCircle2, UploadCloud } from 'lucide-react';

export default function Dashboard() {
  return (
    <main className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Monitor your automated YouTube Shorts, TikTok, and Reels pipeline.
          </p>
        </div>
        
        {/* Quick Action Button */}
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20 whitespace-nowrap">
          <UploadCloud size={18} />
          <span>New Project</span>
        </button>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Clips Generated" 
          value="1,248" 
          subtitle="from 42 videos" 
          trend="+12% this week"
          icon={<Video size={20} />} 
        />
        <StatCard 
          title="Auto-Uploads Success" 
          value="98.5%" 
          subtitle="across 3 platforms" 
          icon={<CheckCircle2 size={20} className="text-emerald-400" />} 
        />
        <StatCard 
          title="Time Saved" 
          value="342h" 
          subtitle="estimated editing time" 
          icon={<Clock size={20} className="text-purple-400" />} 
        />
      </section>

      {/* Input / New Task Section */}
      <section className="bg-[#18181b] border border-[#27272a] p-6 rounded-xl flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Generate clips from YouTube Video URL
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="https://www.youtube.com/watch?v=..." 
              className="flex-1 bg-[#09090b] border border-[#27272a] rounded-lg px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <button className="hidden md:block bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap">
              Process Video
            </button>
          </div>
        </div>
        <button className="w-full md:hidden bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap">
          Process Video
        </button>
      </section>

      {/* Pipeline Status Section */}
      <section>
        <PipelineStatus />
      </section>

    </main>
  );
}
