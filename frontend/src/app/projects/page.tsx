import React from 'react';
import { Search, Filter, Play, MoreVertical, Download } from 'lucide-react';

const ProjectsPage = () => {
  // Mock data for projects
  const projects = [
    {
      id: '1',
      title: 'The Future of AI in 2026',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400&h=600',
      duration: '0:58',
      date: '2026-07-18',
      status: 'Ready',
      views: '1.2M',
    },
    {
      id: '2',
      title: 'How to build a SaaS in a weekend',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400&h=600',
      duration: '0:45',
      date: '2026-07-17',
      status: 'Processing',
      views: '-',
    },
    {
      id: '3',
      title: '10 Tips for Productivity',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=400&h=600',
      duration: '0:52',
      date: '2026-07-16',
      status: 'Ready',
      views: '840K',
    },
    {
      id: '4',
      title: 'Setup my perfect desk workspace',
      thumbnail: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&q=80&w=400&h=600',
      duration: '0:40',
      date: '2026-07-15',
      status: 'Ready',
      views: '3.1M',
    },
    {
      id: '5',
      title: 'Why you need to learn Rust',
      thumbnail: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&q=80&w=400&h=600',
      duration: '0:59',
      date: '2026-07-14',
      status: 'Failed',
      views: '-',
    },
    {
      id: '6',
      title: 'Day in the life of a software engineer',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=600',
      duration: '0:35',
      date: '2026-07-10',
      status: 'Ready',
      views: '5.2M',
    }
  ];

  return (
    <main className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight">Projects Archive</h1>
          <p className="mt-1 text-sm text-zinc-400">
            View, manage, and download all your generated clips.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="bg-[#18181b] border border-[#27272a] rounded-lg pl-9 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64 transition-all"
            />
          </div>
          <button className="bg-[#18181b] border border-[#27272a] hover:bg-zinc-800 text-zinc-300 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Filter size={16} />
            <span className="text-sm font-medium">Filter</span>
          </button>
        </div>
      </header>

      {/* Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="group flex flex-col bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-black/50">
            {/* Thumbnail Area */}
            <div className="relative aspect-[9/16] overflow-hidden bg-zinc-900">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              
              {/* Play Button Overlay on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/20 hover:bg-blue-600 backdrop-blur-md text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg">
                  <Play className="w-6 h-6 ml-1" />
                </button>
              </div>

              {/* Badges */}
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  project.status === 'Ready' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  project.status === 'Processing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
                  {project.duration}
                </span>
              </div>
            </div>

            {/* Info Area */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="font-semibold text-zinc-100 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <button className="text-zinc-500 hover:text-zinc-300 p-1 -mr-2">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <div className="mt-auto flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Play size={12} className="text-zinc-400" /> {project.views}
                </span>
                <span>{project.date}</span>
              </div>
            </div>
            
            {/* Footer Action */}
            <div className="px-4 py-3 border-t border-[#27272a] bg-zinc-900/50">
              <button 
                disabled={project.status !== 'Ready'}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-zinc-300 hover:text-white disabled:opacity-50 disabled:hover:text-zinc-300 transition-colors py-1"
              >
                <Download size={16} />
                Download Clip
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ProjectsPage;
