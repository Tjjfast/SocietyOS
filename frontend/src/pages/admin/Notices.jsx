import React, { useEffect, useState } from 'react';
import { Pin, Trash2, PlusCircle } from 'lucide-react';
import api from '../../services/api';
import GlassCard from '../../components/GlassCard';

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', priority: 'LOW' });

  const fetchNotices = async () => {
    try {
      const { data } = await api.get('/notice');
      setNotices(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notice', formData);
      setFormData({ title: '', content: '', priority: 'LOW' });
      setShowForm(false);
      fetchNotices();
    } catch (err) {
      alert('Failed to publish notice');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this notice?')) return;
    try {
      await api.delete(`/notice/${id}`);
      fetchNotices();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Digital Notice Board</h1>
          <p className="text-gray-400">Broadcast announcements to all residents.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary flex items-center gap-2"
        >
          <PlusCircle size={18} /> New Notice
        </button>
      </div>

      {showForm && (
        <GlassCard className="mb-8 border border-blue-500/30 bg-blue-900/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              placeholder="Notice Title" 
              required
              className="input-glass text-lg font-medium"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            <textarea 
              placeholder="Message content..." 
              required
              rows={4}
              className="input-glass resize-none"
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
            />
            <div className="flex justify-between items-center pt-2">
              <select 
                className="input-glass w-auto cursor-pointer"
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option value="LOW" className="bg-[#0c1321]">Low Priority</option>
                <option value="MEDIUM" className="bg-[#0c1321]">Medium Priority</option>
                <option value="HIGH" className="bg-[#0c1321]">URGENT / HIGH</option>
              </select>
              
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Pin size={16} /> Publish Notice
                </button>
              </div>
            </div>
          </form>
        </GlassCard>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-400">Loading notices...</div>
        ) : notices.length === 0 ? (
          <div className="p-12 text-center text-gray-500 glass-panel">No active notices.</div>
        ) : (
          notices.map(notice => (
            <div key={notice.id} className="glass-panel p-6 flex gap-4 relative group">
              <div className="mt-1 shrink-0">
                <Pin className={notice.priority === 'HIGH' ? 'text-rose-500' : notice.priority === 'MEDIUM' ? 'text-amber-500' : 'text-blue-500'} size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                  <span className="text-xs text-gray-500">{new Date(notice.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-gray-400 text-sm whitespace-pre-wrap">{notice.content}</p>
              </div>
              <button 
                onClick={() => handleDelete(notice.id)}
                className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity p-2 bg-red-500/10 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
