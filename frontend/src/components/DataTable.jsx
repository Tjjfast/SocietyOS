import React from 'react';

export default function DataTable({ columns, data, keyField = 'id', isLoading = false }) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
        Loading data...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-12 text-center text-gray-500 glass-panel rounded-2xl">
        No records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className="px-6 py-4 text-sm font-medium text-gray-400 whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((row) => (
            <tr 
              key={row[keyField]} 
              className="hover:bg-white/5 transition-colors group cursor-default"
            >
              {columns.map((col, idx) => (
                <td 
                  key={idx} 
                  className={`px-6 py-4 text-sm text-gray-200 ${col.className || ''}`}
                >
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
