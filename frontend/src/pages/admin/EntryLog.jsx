import React, { useState, useEffect } from 'react';
import api from '../../api';

const STATUS_MAP = {
  APPROVED: { color: 'bg-emerald-500', text: 'text-emerald-500', label: 'Inside' },
  REJECTED: { color: 'bg-error', text: 'text-error', label: 'Denied' },
  EXITED:   { color: 'bg-gray-500', text: 'text-gray-500', label: 'Exited' },
  PENDING:  { color: 'bg-amber-500', text: 'text-amber-500', label: 'Pending' },
};

const TYPE_MAP = {
  DELIVERY: { icon: 'local_shipping', color: 'text-blue-400 bg-blue-400/10', label: 'Delivery' },
  GUEST:    { icon: 'person',          color: 'text-purple-400 bg-purple-400/10', label: 'Guest' },
  SERVICE:  { icon: 'handyman',        color: 'text-amber-400 bg-amber-400/10', label: 'Service' },
};

export default function AdminEntries() {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, denied: 0 });

  useEffect(() => {
    api.get('/entries')
      .then(res => {
        const data = res.data.data || [];
        setEntries(data);
        setStats({
          total:  data.length,
          active: data.filter(e => e.status === 'APPROVED').length,
          denied: data.filter(e => e.status === 'REJECTED').length,
        });
      })
      .catch(err => console.error('Failed to fetch entries:', err));
  }, []);

  return (
    <div className="pt-8 px-8 pb-12 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Gate Activity</h2>
            <p className="text-gray-400 mt-1">Real-time monitoring of all incoming and outgoing visitor logs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-morphism p-6 rounded-xl flex flex-col justify-between">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">Today's Entries</span>
            <div className="flex items-end justify-between mt-4">
              <span className="text-4xl font-bold text-white">{stats.total}</span>
              <span className="material-symbols-outlined text-white/50 text-4xl flex items-center">login</span>
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-xl flex flex-col justify-between">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">Active Inside</span>
            <div className="flex items-end justify-between mt-4">
              <span className="text-4xl font-bold text-emerald-500">{stats.active}</span>
              <span className="text-emerald-500 text-sm flex items-center gap-1 font-bold">Inside Premises</span>
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-xl flex flex-col justify-between">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">Denied Access</span>
            <div className="flex items-end justify-between mt-4">
              <span className="text-4xl font-bold text-error">{stats.denied}</span>
              <span className="text-error text-sm flex items-center gap-1">Rejected</span>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50 text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-white/10">
                  <th className="px-6 py-4">Visitor / Agency</th>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Time Entry</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {entries.map(entry => {
                  const visitorName = entry.pass?.visitorName || entry.user?.name || 'Unknown';
                  const visitorType = entry.pass?.visitorType || 'GUEST';
                  const typeInfo = TYPE_MAP[visitorType] || TYPE_MAP.GUEST;
                  const statusInfo = STATUS_MAP[entry.status] || STATUS_MAP.PENDING;
                  const destUnit = entry.pass?.flat?.unitNumber || entry.flat?.unitNumber || '—';
                  return (
                    <tr key={entry.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-sm">{visitorName}</span>
                          <span className="text-xs text-gray-500">{entry.pass?.vehicleNumber || entry.pass?.phone || '—'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{destUnit}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded ${typeInfo.color} text-xs font-bold uppercase tracking-tight`}>
                          <span className="material-symbols-outlined text-[10px] flex items-center">{typeInfo.icon}</span> {typeInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-400">
                        {new Date(entry.entryTime || entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${statusInfo.color}`}></div>
                          <span className={`text-xs ${statusInfo.text} font-bold uppercase tracking-widest`}>{statusInfo.label}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-medium">No gate activity recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/5">
            <p className="text-xs text-gray-500 italic">Gate stream connected and listening.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
