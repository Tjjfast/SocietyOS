import React from 'react';

export default function AdminHelp() {
  return (
    <div className="pt-8 px-8 pb-12 relative min-h-[calc(100vh-80px)]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight">Need Help?</h2>
          <p className="text-gray-400 mt-1">If you are facing issues, please contact the developer directly for support.</p>
        </div>

        <div className="glass-morphism p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                <p className="text-gray-400 text-sm mb-4">Drop us an email, and we'll get back to you as soon as possible.</p>
                <div className="flex flex-col gap-2">
                  <a href="mailto:shivammisra766@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm flex items-center gap-2 w-max">
                    shivammisra766@gmail.com
                  </a>
                  <a href="mailto:tjfast@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm flex items-center gap-2 w-max">
                    tjfast@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/10"></div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <span className="material-symbols-outlined text-2xl">call</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Phone Support</h3>
                <p className="text-gray-400 text-sm mb-4">For urgent issues, you can call or text the developer directly.</p>
                <a href="tel:+919717656993" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-lg tracking-wide flex items-center gap-2 w-max">
                  +91 9717656993
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}