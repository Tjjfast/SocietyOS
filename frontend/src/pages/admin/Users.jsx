import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import GlassCard from '../../components/GlassCard';
import DataTable from '../../components/DataTable';
import StatusPill from '../../components/StatusPill';
import { CheckCircle, XCircle } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await api.patch(`/users/${id}/${action}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name', render: (row) => <span className="font-medium text-white">{row.name}</span> },
    { header: 'Contact', render: (row) => (
      <div className="flex flex-col">
        <span>{row.email}</span>
        <span className="text-xs text-gray-500">{row.phone || 'N/A'}</span>
      </div>
    )},
    { header: 'Role', render: (row) => (
      <StatusPill 
        status={row.role} 
        variant={row.role === 'ADMIN' ? 'danger' : row.role === 'SECURITY' ? 'warning' : 'info'} 
      />
    )},
    { header: 'Flat', render: (row) => row.flat ? `${row.flat.number} (Fl: ${row.flat.floor})` : '—' },
    { header: 'Status', render: (row) => (
      <StatusPill 
        status={row.status} 
        variant={row.status === 'APPROVED' ? 'success' : row.status === 'REJECTED' ? 'danger' : 'warning'} 
      />
    )},
    { header: 'Actions', render: (row) => (
      row.status === 'PENDING' ? (
        <div className="flex gap-2">
          <button onClick={() => handleAction(row.id, 'approve')} className="text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-400/10 p-1.5 rounded-lg" title="Approve">
            <CheckCircle size={18} />
          </button>
          <button onClick={() => handleAction(row.id, 'reject')} className="text-rose-400 hover:text-rose-300 transition-colors bg-rose-400/10 p-1.5 rounded-lg" title="Reject">
            <XCircle size={18} />
          </button>
        </div>
      ) : (
        <span className="text-gray-500 text-xs">No pending actions</span>
      )
    )}
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Resident Log</h1>
          <p className="text-gray-400">Manage pending approvals and resident accounts.</p>
        </div>
      </div>

      <GlassCard className="!p-0 overflow-hidden">
        <DataTable columns={columns} data={users} isLoading={loading} />
      </GlassCard>
    </div>
  );
}
