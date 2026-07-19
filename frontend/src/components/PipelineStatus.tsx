'use client';

import React, { useEffect, useState } from 'react';
import { Download, MonitorPlay, Smartphone, Play, Loader2 } from 'lucide-react';

interface Platform {
  name: string;
  icon: React.ReactNode;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
}

interface PipelineItem {
  id: string;
  title: string;
  thumbnail: string;
  progress: number;
  stage: string;
  platforms: Platform[];
  clip_path?: string;
}

const PipelineStatus = ({ activeVideoIds = [] }: { activeVideoIds?: number[] }) => {
  const [items, setItems] = useState<PipelineItem[]>([]);

  useEffect(() => {
    if (activeVideoIds.length === 0) return;

    const fetchStatuses = async () => {
      const newItems: PipelineItem[] = [];
      for (const id of activeVideoIds) {
        try {
          const res = await fetch(`http://localhost:8000/api/videos/${id}`);
          if (res.ok) {
            const data = await res.json();
            
            // Map status to progress
            let progress = 10;
            let stage = data.status;
            if (data.status === 'PROCESSING') progress = 50;
            if (data.status === 'COMPLETED') progress = 100;
            if (data.status === 'FAILED') progress = 0;

            const isCompleted = data.status === 'COMPLETED';

            newItems.push({
              id: data.video_id.toString(),
              title: data.title || data.original_url,
              thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=100&h=100', // Placeholder
              progress,
              stage,
              clip_path: data.clip_path,
              platforms: [
                { name: 'YouTube Shorts', icon: <MonitorPlay size={14} />, status: isCompleted ? 'completed' : 'pending' },
                { name: 'TikTok', icon: <Play size={14} />, status: isCompleted ? 'completed' : 'pending' },
                { name: 'Instagram Reels', icon: <Smartphone size={14} />, status: isCompleted ? 'completed' : 'pending' },
              ]
            });
          }
        } catch (error) {
          console.error(`Failed to fetch status for video ${id}`);
        }
      }
      setItems(newItems);
    };

    fetchStatuses();
    const interval = setInterval(fetchStatuses, 3000);
    return () => clearInterval(interval);
  }, [activeVideoIds]);

  if (activeVideoIds.length === 0) {
    return (
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden p-8 text-center">
        <p className="text-zinc-500">No active pipelines. Submit a video URL to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-[#27272a] flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-50">Active Pipelines</h2>
      </div>
      
      <div className="divide-y divide-[#27272a]">
        {items.map((item) => (
          <div key={item.id} className="p-6 hover:bg-zinc-800/20 transition-colors">
            <div className="flex items-start gap-4">
              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-lg object-cover border border-zinc-700" />
              <div className="flex-1 min-w-0">
                <h3 className="text-zinc-100 font-medium truncate mb-1">{item.title}</h3>
                
                {/* Progress Bar & Stage */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.progress === 100 ? 'bg-emerald-500' : item.progress === 0 ? 'bg-red-500' : 'bg-blue-500 relative overflow-hidden'}`}
                      style={{ width: `${item.progress === 0 ? 100 : item.progress}%` }}
                    >
                      {item.progress > 0 && item.progress < 100 && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 font-medium whitespace-nowrap min-w-[120px] text-right">
                    {item.progress === 100 ? 'Ready' : item.stage}
                  </span>
                </div>
                
                {/* Platform Status */}
                <div className="flex items-center gap-2">
                  {item.platforms.map((platform, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium ${
                        platform.status === 'completed' 
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : platform.status === 'uploading'
                          ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                          : 'border-zinc-700 bg-zinc-800/50 text-zinc-400'
                      }`}
                      title={platform.name}
                    >
                      {platform.icon}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="ml-4 flex flex-col gap-2">
                <button 
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700 disabled:opacity-50"
                  title="Download Clip"
                  disabled={item.progress !== 100}
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineStatus;
