import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import api from '../../services/api';
import GlassCard from '../../components/GlassCard';
import DataTable from '../../components/DataTable';

export default function AdminFlats() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlats = async () => {
    try {
      const { data } = await api.get('/flats');
      setFlats(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flat?')) return;
    try {
      await api.delete(`/flats/${id}`);
      fetchFlats();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete flat');
    }
  };

  const columns = [
    { header: 'Flat Number', render: (row) => <span className="text-xl font-bold text-white">{row.number}</span> },
    { header: 'Floor', accessor: 'floor' },
    { header: 'Occupants', render: (row) => (
      <div className="flex items-center gap-2 text-blue-400 font-medium">
        <Users size={16} />
        {row._count.users}
      </div>
    )},
    { header: 'Actions', render: (row) => (
      <div className="flex gap-3">
        <button className="text-gray-400 hover:text-blue-400 transition-colors" title="Edit">
          <Edit2 size={18} />
        </button>
        {row._count.users === 0 && (
          <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-rose-400 transition-colors" title="Delete">
            <Trash2 size={18} />
          </button>
        )}
      </div>
    )}
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Flat Registry</h1>
          <p className="text-gray-400">Manage infrastructure and resident assignments.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Flat
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <GlassCard className="!p-0 overflow-hidden">
          <DataTable columns={columns} data={flats} keyField="id" isLoading={loading} />
        </GlassCard>
      </div>
    </div>
  );
}
