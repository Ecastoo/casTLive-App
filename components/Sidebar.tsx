
import React from 'react';
import { NavItem } from '../types';

interface SidebarProps {
  activeContent: string;
  setActiveContent: (content: string) => void;
  // FIX: Accept the fully-formed NavItem array as a prop.
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeContent, setActiveContent, navItems }) => {
  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-black/30 backdrop-blur-lg border-r border-gray-800/50 p-6 flex flex-col z-30 animate-slide-in-left">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-glow text-cyan-300 tracking-widest uppercase">
            Cas<span className="text-pink-400">T</span>Live
        </h1>
        <p className="text-xs text-gray-400 mt-1">Cosmic Master Guide</p>
      </div>

      <ul className="space-y-3 overflow-y-auto pr-2">
        {/* FIX: Use the navItems prop passed from App.tsx. */}
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveContent(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all duration-300 group relative ${
                activeContent === item.id
                  ? 'bg-cyan-500/10 text-cyan-300 shadow-[inset_0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {/* FIX: item.icon is now available because we are using the correct prop. */}
              <div className="w-6 h-6">{item.icon}</div>
              <span className="font-semibold">{item.label}</span>
              <div className={`absolute right-0 h-full w-1 rounded-l-full bg-cyan-400 transition-transform duration-300 scale-y-0 group-hover:scale-y-100 ${activeContent === item.id ? 'scale-y-100' : ''}`}></div>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto text-center text-xs text-gray-600">
        <p>&copy; 2024 CasTLive Universe</p>
        <p>All rights reserved.</p>
      </div>
    </nav>
  );
};

export default Sidebar;
