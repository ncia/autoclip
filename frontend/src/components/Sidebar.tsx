'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Video, Settings, SquarePlay, CalendarClock, BarChart3, Palette, FolderOpen, Users, Menu, X, Key } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Close sidebar on route change (for mobile)
  useEffect(() => {
    closeSidebar();
  }, [pathname]);

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a] flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <SquarePlay className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Auto Clip</h1>
        </div>
        <button onClick={toggleSidebar} className="text-zinc-400 hover:text-white p-2">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" 
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-[#09090b] border-r border-[#27272a] p-4 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between mb-8 px-2 py-4 md:py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <SquarePlay className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Auto Clip</h1>
          </div>
          <button onClick={closeSidebar} className="md:hidden text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
          <NavItem href="/" icon={<LayoutDashboard size={20} />} label="Dashboard" active={pathname === '/'} onClick={closeSidebar} />
          <NavItem href="/projects" icon={<Video size={20} />} label="Projects" active={pathname === '/projects'} onClick={closeSidebar} />
          <NavItem href="/automations" icon={<CalendarClock size={20} />} label="Automations" active={pathname === '/automations'} onClick={closeSidebar} />
          <NavItem href="/analytics" icon={<BarChart3 size={20} />} label="Analytics" active={pathname === '/analytics'} onClick={closeSidebar} />
          <NavItem href="/templates" icon={<Palette size={20} />} label="Templates" active={pathname === '/templates'} onClick={closeSidebar} />
          <NavItem href="/assets" icon={<FolderOpen size={20} />} label="Assets" active={pathname === '/assets'} onClick={closeSidebar} />
          <NavItem href="/accounts" icon={<Users size={20} />} label="Accounts" active={pathname === '/accounts'} onClick={closeSidebar} />
          <NavItem href="/api-keys" icon={<Key size={20} />} label="API Keys" active={pathname === '/api-keys'} onClick={closeSidebar} />
          <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" active={pathname === '/settings'} onClick={closeSidebar} />
        </nav>
        
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50">
          <p className="text-xs text-zinc-300 font-medium mb-1">Pro Plan Active</p>
          <p className="text-xs text-zinc-500 mb-2">12 / 50 Videos generated</p>
          <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '24%' }}></div>
          </div>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ href, icon, label, active = false, onClick }: { href: string; icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) => {
  return (
    <Link href={href} onClick={onClick} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${active ? 'bg-zinc-800 text-blue-400 font-medium' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
