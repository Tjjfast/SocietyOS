
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalResidents: 0,
    totalGuards: 0,
    entriesToday: 0,
    pendingUsers: 0
  });

  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, entriesRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/entries?limit=5')
        ]);

        if (statsRes?.data?.data) {
          setStats(statsRes.data.data);
        }

        if (entriesRes?.data?.data) {
          setRecentEntries(entriesRes.data.data);
        }
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-slate-400 mt-20 text-lg font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      
      {/* Header */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-slate-400 tracking-tight">
            Systems Overview
          </h2>
          <p className="text-slate-400 mt-2 font-medium">
            Real-time metrics and operations.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <StatCard title="Total Residents" value={stats?.totalResidents ?? 0} icon="group" />
        <StatCard title="On-Duty Guards" value={stats?.totalGuards ?? 0} icon="shield" />
        <StatCard title="Gate Check-ins" value={stats?.entriesToday ?? 0} icon="login" />
        <StatCard title="Pending Approvals" value={stats?.pendingUsers ?? 0} icon="warning" highlight />

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-7 backdrop-blur-xl shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-4">

            <ActionCard to="/admin/users" icon="person_add" label="New Resident" />
            <ActionCard to="/admin/entries" icon="qr_code_2" label="Issue Pass" />
            <ActionCard to="/admin/notices" icon="campaign" label="Broadcast" />
            <ActionCard to="/admin/complaints" icon="emergency" label="Emergency" />

          </div>
        </div>

        {/* Activity Placeholder (replace with real chart later) */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-7 text-center text-slate-500">
          Chart integration pending (use Recharts / Chart.js with real API)
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-3xl shadow-2xl">
        <div className="p-7 border-b border-white/5 flex justify-between">
          <h3 className="text-xl font-bold text-white">Recent Gate Logs</h3>
          <Link to="/admin/entries" className="text-indigo-400 text-sm font-bold">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase text-slate-500 border-b border-white/5">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Gate</th>
                <th className="px-6 py-4 text-right">Time</th>
              </tr>
            </thead>

            <tbody>
              {recentEntries.length > 0 ? (
                recentEntries.map((entry) => {
                  const name = entry.pass?.visitorName || entry.user?.name || 'Unknown';
                  const type = entry.pass?.visitorType || entry.user?.role || 'Guest';
                  const time = new Date(entry.entryTime || entry.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <tr key={entry.id} className="border-b border-white/5">
                      <td className="px-6 py-4 text-white">{name}</td>
                      <td className="px-6 py-4 text-slate-400">{type}</td>
                      <td className="px-6 py-4 text-slate-300">{entry.status || 'Entered'}</td>
                      <td className="px-6 py-4 text-slate-500">{entry.gateScanned || 'MAIN-01'}</td>
                      <td className="px-6 py-4 text-right text-slate-400">{time}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-slate-500">
                    No recent activity
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      <div className="h-16"></div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({ title, value, icon, highlight }) {
  return (
    <div className={`p-6 rounded-2xl border ${highlight ? 'border-rose-500/30' : 'border-white/5'} bg-white/[0.02]`}>
      <div className="flex justify-between mb-4">
        <span className="material-symbols-outlined text-indigo-400">{icon}</span>
      </div>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <p className="text-slate-400 text-sm mt-1">{title}</p>
    </div>
  );
}

function ActionCard({ to, icon, label }) {
  return (
    <Link to={to} className="p-5 rounded-xl border border-white/5 text-center hover:bg-indigo-500/10 transition">
      <span className="material-symbols-outlined text-2xl text-indigo-400">{icon}</span>
      <p className="text-sm text-slate-300 mt-2 font-semibold">{label}</p>
    </Link>
  );
}
