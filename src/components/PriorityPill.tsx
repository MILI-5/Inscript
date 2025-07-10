import React from 'react';

interface PriorityPillProps {
  priority: 'High' | 'Medium' | 'Low';
}

const priorityColors = {
  High: 'text-red-500',
  Medium: 'text-orange-500',
  Low: 'text-blue-500',
};

const PriorityPill: React.FC<PriorityPillProps> = ({ priority }) => (
  <span className={`font-semibold ${priorityColors[priority]}`}>{priority}</span>
);

export default PriorityPill; 