import React, { useEffect, useState } from 'react';
import { Filter, Calendar, MapPin, UserCheck, Search } from 'lucide-react';
import api from '../../services/api';
import GlassCard from '../../components/GlassCard';
import DataTable from '../../components/DataTable';
import StatusPill from '../../components/StatusPill';

export default function AdminEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const { data } = await api.get('/entry');
      setEntries(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const getMethodBadge = (method) => {
    switch (method) {
      case 'QR_SCAN': return <span className="text-blue-400 text-xs font-medium bg-blue-400/10 px-2 py-1 rounded">QR Scan</span>;
      case 'LIVE_APPROVAL': return <span className="text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded">Live Approved</span>;
      case 'MANUAL_LOOKUP': return <span className="text-amber-400 text-xs font-medium bg-amber-400/10 px-2 py-1 rounded">Manual</span>;
      default: return method;
    }
  };

  const columns = [
    { header: 'Time', render: (row) => (
      <div>
        <div className="text-white font-medium">{new Date(row.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <div className="text-xs text-gray-500">{new Date(row.entryTime).toLocaleDateString()}</div>
      </div>
    )},
    { header: 'Visitor', render: (row) => (
      <div>
        <p className="text-white font-medium">{row.visitorName}</p>
        <p className="text-xs text-gray-400">{row.visitorType.replace('_', ' ')}</p>
      </div>
    )},
    { header: 'Destination', render: (row) => (
      <div className="flex items-center gap-2">
        <MapPin size={14} className="text-gray-500" />
        <span>Flat {row.flat?.number || '—'}</span>
      </div>
    )},
    { header: 'Method', render: (row) => getMethodBadge(row.method) },
    { header: 'Status', render: (row) => (
      <StatusPill 
        status={row.status} 
        variant={row.status === 'APPROVED' ? 'success' : row.status === 'SCANNED' ? 'info' : row.status === 'REJECTED' ? 'danger' : 'warning'} 
      />
    )},
    { header: 'Guard on Duty', render: (row) => (
      <div className="flex flex-col">
        <span className="text-sm">{row.guard?.name || 'Unknown'}</span>
        {row.exitTime && <span className="text-xs text-rose-400">Exited: {new Date(row.exitTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
      </div>
    )},
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gate Activity Log</h1>
          <p className="text-gray-400">Complete immutable record of all societal entry and exit.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search visitor..." 
              className="input-glass pl-10 h-10 w-64 text-sm"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2 h-10">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <GlassCard className="!p-0 overflow-hidden">
        <DataTable columns={columns} data={entries} keyField="id" isLoading={loading} />
      </GlassCard>
    </div>
  );
}
