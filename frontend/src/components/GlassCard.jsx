import React from 'react';

export default function GlassCard({ children, className = '', active = false }) {
  return (
    <div className={`${active ? 'surface-card-active' : 'surface-card'} p-6 transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
}
