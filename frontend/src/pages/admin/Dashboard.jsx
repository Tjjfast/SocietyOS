import React, { useEffect, useState } from 'react';
import { Users, AlertCircle, ClipboardList, Activity } from 'lucide-react';
import api from '../../services/api';
import StatsCard from '../../components/StatsCard';
import StatusPill from '../../components/StatusPill';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data.data);
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-center text-white/50 pt-20">Gathering telemetry...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Telemetry</h1>
        <p className="text-gray-400">Live overview of your society operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Active Residents" value={stats?.totalResidents || 0} icon={Users} />
        <StatsCard title="Active Passes" value={stats?.activePasses || 0} icon={Activity} />
        <StatsCard title="Gate Entries Today" value={stats?.entriesToday || 0} icon={ClipboardList} />
        <StatsCard title="Open Complaints" value={stats?.openComplaints || 0} icon={AlertCircle} trend={0} />
      </div>

      <div className="pt-6 border-t border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300">View All Log</button>
        </div>
        
        <div className="glass-panel p-2">
          <div className="p-10 text-center text-gray-500 text-sm">
            Detailed activity feed is integrated directly into the Entry Logs and Complaints modules.
          </div>
        </div>
      </div>
    </div>
  );
}