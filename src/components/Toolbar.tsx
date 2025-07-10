import React from 'react';

const toolbarButtons = [
  { label: 'Tool bar', variant: 'ghost' },
  { label: 'Hide fields', variant: 'ghost' },
  { label: 'Sort', variant: 'ghost' },
  { label: 'Filter', variant: 'ghost' },
  { label: 'Cell view', variant: 'ghost' },
  { label: 'Import', variant: 'default' },
  { label: 'Export', variant: 'default' },
  { label: 'Share', variant: 'default' },
  { label: 'New Action', variant: 'primary' },
];

const Toolbar: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border-b bg-gray-50">
      {toolbarButtons.map((btn, idx) => (
        <button
          key={btn.label}
          className={
            btn.variant === 'primary'
              ? 'bg-green-600 text-white px-4 py-1 rounded font-semibold shadow hover:bg-green-700 transition'
              : btn.variant === 'default'
              ? 'bg-gray-200 text-gray-700 px-3 py-1 rounded font-medium hover:bg-gray-300 transition'
              : 'bg-transparent text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition'
          }
          onClick={() => console.log(`${btn.label} button clicked`)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar; 