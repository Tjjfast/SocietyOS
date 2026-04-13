import React from 'react';

const variantConfig = {
  success: { bg: 'bg-[#1b6859]/30', text: 'text-[#10D9A0]', border: 'border-[#1b6859]' },
  warning: { bg: 'bg-[#b46b00]/30', text: 'text-[#F59E0B]', border: 'border-[#b46b00]' },
  danger: { bg: 'bg-[#bb5551]/30', text: 'text-[#fc9995]', border: 'border-[#bb5551]' },
  info: { bg: 'bg-[#34495e]/60', text: 'text-[#dbe5ff]', border: 'border-[#384866]' },
};

export default function StatusPill({ status, variant = 'info', className = '' }) {
  const config = variantConfig[variant] || variantConfig.info;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider ${config.bg} ${config.text} border ${config.border} ${className}`}>
      {status}
    </span>
  );
}
