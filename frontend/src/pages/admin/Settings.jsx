import React from 'react';

export default function AdminSettings() {
  return (
    <div className="pt-8 px-8 pb-12 min-h-[calc(100vh-80px)] flex flex-col">
       <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
         <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">Role Management</h2>
              <p className="text-gray-400 mt-1">Configure global society parameters and access levels.</p>
            </div>
         </div>

         <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <div className="bg-surface-container-high/30 p-8 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-white">info</span>
                        Role Permissions Overview
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-white mt-1.5"></div>
                            <div>
                                <p className="text-sm font-bold text-white">Admin</p>
                                <p className="text-xs text-gray-500">Full system access, billing, user management, and configuration.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5"></div>
                            <div>
                                <p className="text-sm font-bold text-white">Head Guard</p>
                                <p className="text-xs text-gray-500">Security management, shift planning, and incident report approval.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-gray-700 mt-1.5"></div>
                            <div>
                                <p className="text-sm font-bold text-white">Resident</p>
                                <p className="text-xs text-gray-500">Visitor requests, amenity booking, and personal profile management.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/5 group">
                    <img 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-transform duration-700 group-hover:scale-110" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH6u1Xi9qfM2_UuIcOvFSLHyUBx4hcjAqGbnLjRg1Ir69MvwStVSBbrWGUu7ohFFAKwvkFMOJP7DC2NBKdmOlwV-Y7-g10qvnmQzjxM7kv5FS39uo3zAn9MqlXTb3KqMhICMVnjiw093olr1ycQo4ykIe5e6wRiJ_oCMmV30JmfC_jf-GVY-5wxtN4oxhIHXIWJdsmC0PpHASQbvbdRHZrEhCcmEBkJUrnl9w-uwXjA3iG9pXaeKDJE7H6r_uOgfzErOgjYGQrkYC-"
                      alt="abstract"
                    />
                    <div className="relative p-8 h-full flex flex-col justify-end bg-gradient-to-t from-background to-transparent">
                        <h3 className="text-xl font-black text-white">Need Advanced Roles?</h3>
                        <p className="text-sm text-on-surface-variant mt-2 mb-6">Create custom permission sets for specific committees or facility managers.</p>
                        <button 
                          onClick={() => alert("Policy Configurator is a backend feature. Coming in Phase 6!")}
                          className="w-fit bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-lg font-bold border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                        >
                            Configure Policy
                        </button>
                    </div>
                </div>
             </div>
         </div>
       </div>
    </div>
  );
}
