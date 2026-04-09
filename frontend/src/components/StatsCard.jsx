import React from 'react';
import GlassCard from './GlassCard';

export default function StatsCard({ title, value, icon: Icon, trend }) {
  return (
    <GlassCard className="flex items-center p-6 gap-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Icon size={120} strokeWidth={1} />
      </div>
      
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
        <Icon className="text-blue-400" size={24} />
      </div>
      
      <div className="flex-1 z-10">
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold tracking-tight text-white">{value}</h3>
          {trend && (
            <span className={`text-sm mb-1 ${trend > 0 ? 'text-emerald-400' : typeof trend === 'number' && trend < 0 ? 'text-rose-400' : 'text-gray-400'}`}>
              {trend > 0 ? '+' : ''}{trend} today
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
