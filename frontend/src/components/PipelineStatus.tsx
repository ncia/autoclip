import React from 'react';
import { Download, MonitorPlay, Smartphone, Play } from 'lucide-react';

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
}

const mockData: PipelineItem[] = [
  {
    id: '1',
    title: 'The Future of AI in 2026',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=100&h=100',
    progress: 100,
    stage: 'Completed',
    platforms: [
      { name: 'YouTube Shorts', icon: <MonitorPlay size={14} />, status: 'completed' },
      { name: 'TikTok', icon: <Play size={14} />, status: 'completed' },
      { name: 'Instagram Reels', icon: <Smartphone size={14} />, status: 'completed' },
    ]
  },
  {
    id: '2',
    title: 'How to build a SaaS in a weekend',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=100&h=100',
    progress: 65,
    stage: 'Generating Captions...',
    platforms: [
      { name: 'YouTube Shorts', icon: <MonitorPlay size={14} />, status: 'pending' },
      { name: 'TikTok', icon: <Play size={14} />, status: 'pending' },
      { name: 'Instagram Reels', icon: <Smartphone size={14} />, status: 'pending' },
    ]
  },
  {
    id: '3',
    title: '10 Tips for Productivity',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=100&h=100',
    progress: 25,
    stage: 'Analyzing Script...',
    platforms: [
      { name: 'YouTube Shorts', icon: <MonitorPlay size={14} />, status: 'pending' },
    ]
  }
];

const PipelineStatus = () => {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-[#27272a] flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-50">Active Pipelines</h2>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All</button>
      </div>
      
      <div className="divide-y divide-[#27272a]">
        {mockData.map((item) => (
          <div key={item.id} className="p-6 hover:bg-zinc-800/20 transition-colors">
            <div className="flex items-start gap-4">
              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-lg object-cover border border-zinc-700" />
              <div className="flex-1 min-w-0">
                <h3 className="text-zinc-100 font-medium truncate mb-1">{item.title}</h3>
                
                {/* Progress Bar & Stage */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500 relative overflow-hidden'}`}
                      style={{ width: `${item.progress}%` }}
                    >
                      {item.progress < 100 && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 font-medium whitespace-nowrap min-w-[120px] text-right">
                    {item.progress === 100 ? 'Ready / Uploaded' : item.stage}
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
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
                  title="Download Clip"
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
