import React from 'react';

export default function AdminSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
        <p className="text-gray-400">Configure global society parameters and integrations.</p>
      </div>

      <div className="glass-panel p-12 text-center text-gray-500 rounded-2xl border-dashed border-2 border-white/10">
        <p className="font-semibold text-lg text-gray-300 mb-2">Settings module is under construction</p>
        <p>Integrations for Cloudinary (Logo uploads), BullMQ (Queue management), and advanced Access Control limits will be available here.</p>
      </div>
    </div>
  );
}
