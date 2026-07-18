import React from 'react';
import { LayoutDashboard, Video, Settings, PlaySquare, CalendarClock } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#09090b] border-r border-[#27272a] h-screen flex flex-col p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 px-2 py-4 mb-8">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
          <PlaySquare className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">AI-Clip Auto</h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <NavItem icon={<Video size={20} />} label="Projects" />
        <NavItem icon={<CalendarClock size={20} />} label="Automations" />
        <NavItem icon={<Settings size={20} />} label="Settings" />
      </nav>
      
      <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50">
        <p className="text-xs text-zinc-300 font-medium mb-1">Pro Plan Active</p>
        <p className="text-xs text-zinc-500 mb-2">12 / 50 Videos generated</p>
        <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full rounded-full" style={{ width: '24%' }}></div>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => {
  return (
    <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${active ? 'bg-zinc-800 text-blue-400 font-medium' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
};

export default Sidebar;
