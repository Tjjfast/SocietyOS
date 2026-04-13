import React, { useEffect, useState } from 'react';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';
import api from '../../services/api';
import GlassCard from '../../components/GlassCard';
import StatusPill from '../../components/StatusPill';

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get('/complaint');
      setComplaints(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/complaint/${id}/status`, { status });
      fetchComplaints();
    } catch (err) {
      alert('Failed to update complaint');
    }
  };

  if (loading) return <div className="p-8 text-gray-400">Loading complaints...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Complaints Management</h1>
        <p className="text-gray-400">Review and resolve resident issues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {complaints.length === 0 ? (
          <div className="col-span-full p-12 text-center text-gray-500 glass-panel">
            No complaints found.
          </div>
        ) : (
          complaints.map(complaint => (
            <GlassCard key={complaint.id} className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <StatusPill 
                  status={complaint.status} 
                  variant={complaint.status === 'RESOLVED' ? 'success' : complaint.status === 'IN_PROGRESS' ? 'warning' : 'danger'} 
                />
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{complaint.title}</h3>
              <p className="text-sm text-gray-400 mb-6 flex-1">{complaint.description}</p>
              
              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <div className="text-sm text-gray-500">
                  By: <span className="text-gray-300">{complaint.creator?.name}</span>
                </div>
                
                {complaint.status !== 'RESOLVED' && (
                  <div className="flex gap-2">
                    {complaint.status === 'OPEN' && (
                      <button 
                        onClick={() => handleUpdateStatus(complaint.id, 'IN_PROGRESS')}
                        className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition-colors"
                      >
                        Start Fix
                      </button>
                    )}
                    <button 
                      onClick={() => handleUpdateStatus(complaint.id, 'RESOLVED')}
                      className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle size={14} /> Resolve
                    </button>
                  </div>
                )}
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
