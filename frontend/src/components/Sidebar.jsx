import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Building, ClipboardList, AlertCircle, Bell, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 ${
          isActive 
            ? 'glass-panel text-white' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`
      }
    >
      <Icon size={20} className="shrink-0" strokeWidth={1.5} />
      <span className="font-medium text-sm tracking-wide">{label}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="nav-rail flex flex-col h-full w-64 pt-6 pb-6 px-4 shrink-0 transition-all">
      <div className="flex items-center gap-3 px-4 mb-10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg">
          S
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white label-text">
          SocietyOS
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/admin/users" icon={Users} label="Resident Log" />
        <NavItem to="/admin/flats" icon={Building} label="Flat Registry" />
        <NavItem to="/admin/entries" icon={ClipboardList} label="Gate Activity" />
        <NavItem to="/admin/complaints" icon={AlertCircle} label="Complaints" />
        <NavItem to="/admin/notices" icon={Bell} label="Notices" />
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <NavItem to="/admin/settings" icon={Settings} label="Settings" />
      </div>
    </div>
  );
}
