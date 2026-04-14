import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';

export default function AdminUsers() {
  const { user } = useAuth();
  const [residents, setResidents]     = useState([]);
  const [modalOpen, setModalOpen]     = useState(false);
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [phone, setPhone]             = useState('');
  const [password, setPassword]       = useState('');
  const [submitting, setSubmitting]   = useState(false);

  const fetchResidents = () => {
    api.get('/users?role=RESIDENT')
      .then(res => setResidents(res.data.data || []))
      .catch(err => console.error('Failed to fetch residents:', err));
  };

  useEffect(() => { fetchResidents(); }, []);

  const handleOnboard = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;

    const societyId = user?.societyId;
    if (!societyId) {
      alert('Error: Admin session missing Society ID. Please log out and log back in.');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/auth/register', {
        name, email, phone: phone || undefined,
        password, role: 'RESIDENT', societyId,
      });
      setName(''); setEmail(''); setPhone(''); setPassword('');
      setModalOpen(false);
      fetchResidents();
    } catch (err) {
      console.error('Onboarding failed:', err);
      const msg = err.response?.data?.errors
        ? Object.entries(err.response.data.errors).map(([k, v]) => `${k}: ${v}`).join(', ')
        : err.response?.data?.message || 'Onboarding failed. Check inputs.';
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this resident? This cannot be undone.')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchResidents();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.');
    }
  };

  const approved = residents.filter(r => r.status === 'APPROVED').length;
  const pending  = residents.filter(r => r.status === 'PENDING').length;

  return (
    <div className="pt-8 px-8 pb-12 relative min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Resident Directory</h2>
            <p className="text-gray-400 mt-1">Manage society residents, unit assignments, and verification status.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 text-sm font-bold rounded-lg border-none hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm font-bold">person_add</span>
              Onboard Resident
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass-morphism p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Total Residents</p>
              <h3 className="text-3xl font-black text-white mt-2">{residents.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Verified</p>
              <h3 className="text-3xl font-black text-white mt-2">{approved}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            </div>
          </div>
          <div className="glass-morphism p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Pending Approvals</p>
              <h3 className="text-3xl font-black text-white mt-2">{pending}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center text-error">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>person_alert</span>
            </div>
          </div>
        </div>

        <div className="glass-morphism rounded-xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {residents.map(resident => {
                  const names    = resident.name?.split(' ') || ['?'];
                  const initials = names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
                  const isApproved = resident.status === 'APPROVED';
                  return (
                    <tr key={resident.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-xs text-white font-bold">
                            {initials.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{resident.name}</p>
                            <p className="text-[10px] text-gray-500">{resident.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400 font-medium">{resident.phone || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${isApproved ? 'bg-emerald-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                          <span className={`text-xs font-bold uppercase tracking-widest ${isApproved ? 'text-emerald-500' : 'text-yellow-500'}`}>
                            {isApproved ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDelete(resident.id)}
                            className="p-1.5 rounded hover:bg-error/10 text-gray-400 hover:text-error transition-colors bg-transparent border-none cursor-pointer flex items-center"
                          >
                            <span className="material-symbols-outlined text-sm">delete_forever</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {residents.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500 font-medium">No residents found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/5">
            <p className="text-xs text-gray-500 italic">Manage your residential registry accurately.</p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-morphism w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl bg-surface-container-low border border-white/10">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-black text-white">Onboard New Resident</h3>
              <button onClick={() => setModalOpen(false)} className="material-symbols-outlined text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">close</button>
            </div>
            <div className="p-8">
              <form className="space-y-5 flex flex-col" onSubmit={handleOnboard}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                      placeholder="e.g. John Doe" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                      placeholder="john@example.com" type="email" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone (Optional)</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                      placeholder="e.g. +91 9876543210" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Initial Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600"
                      placeholder="Min. 6 characters" type="password" />
                  </div>
                </div>
                <div className="pt-2 flex gap-4 mt-2">
                  <button onClick={() => setModalOpen(false)} type="button"
                    className="flex-1 py-3 px-4 rounded-lg font-bold text-gray-400 border border-white/10 bg-transparent hover:bg-white/5 transition-all cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting || !name.trim() || !email.trim() || !password.trim()}
                    className="flex-1 py-3 px-4 rounded-lg font-bold bg-white text-black border-none hover:bg-gray-200 transition-all cursor-pointer disabled:opacity-50">
                    {submitting ? 'Registering...' : 'Complete Onboarding'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
