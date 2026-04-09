import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell } from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-gunmetal-bg)] relative">
      {/* Background ambient light effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 shrink-0 flex items-center justify-between px-10 border-b border-white/5">
          <div className="flex items-center">
            {/* Contextual Title can go here, handled by pages usually, or keep blank for minimal look */}
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-white/60 hover:text-white transition-colors relative">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[var(--color-gunmetal-bg)]"></span>
            </button>
            
            <div className="h-6 w-[1px] bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white label-text">{user?.name || 'Administrator'}</p>
                <p className="text-xs text-white/50">{user?.email}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[var(--color-gunmetal-surface-high)] border border-white/10 flex items-center justify-center font-medium text-white shadow-inner">
                {user?.name?.charAt(0) || 'A'}
              </div>
            </div>

            <button 
              onClick={logout}
              className="ml-2 text-white/40 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={20} strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 scroll-smooth">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
