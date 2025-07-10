import React from 'react';

interface StatusPillProps {
  status: 'In-process' | 'Need to start' | 'Complete' | 'Blocked';
}

const statusColors = {
  'In-process': 'bg-yellow-100 text-yellow-800',
  'Need to start': 'bg-orange-100 text-orange-800',
  'Complete': 'bg-green-100 text-green-800',
  'Blocked': 'bg-red-100 text-red-800',
};

const StatusPill: React.FC<StatusPillProps> = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>{status}</span>
);

export default StatusPill; 