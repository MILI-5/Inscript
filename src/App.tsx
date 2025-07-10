import React, { useState, useRef } from 'react';
import Toolbar from './components/Toolbar';
import Table from './components/Table';
import Tabs from './components/Tabs';
import { orders as initialOrders, Order } from './data/orders';
import StatusPill from './components/StatusPill';
import PriorityPill from './components/PriorityPill';

const columns = [
  { Header: '#', accessor: 'id', width: 'w-8', editable: false },
  { Header: 'Job Request', accessor: 'jobRequest', width: 'w-64', editable: true },
  { Header: 'Submitted', accessor: 'submitted', width: 'w-28', editable: true },
  { Header: 'Status', accessor: 'status', width: 'w-28', editable: false },
  { Header: 'Submitter', accessor: 'submitter', width: 'w-32', editable: true },
  { Header: 'URL', accessor: 'url', width: 'w-40', editable: false },
  { Header: 'Assigned', accessor: 'assigned', width: 'w-32', editable: true },
  { Header: 'Priority', accessor: 'priority', width: 'w-20', editable: false },
  { Header: 'Due Date', accessor: 'dueDate', width: 'w-28', editable: true },
  { Header: 'Est. Value', accessor: 'estValue', width: 'w-32', editable: true },
];

const tabList = [
  'All Orders',
  'Pending',
  'Reviewed',
  'Arrived',
];

const getNextEditableCell = (
  row: number,
  col: number,
  direction: 'left' | 'right' | 'up' | 'down',
  ordersLength: number
) => {
  let nextRow = row;
  let nextCol = col;
  while (true) {
    if (direction === 'left') nextCol--;
    if (direction === 'right') nextCol++;
    if (direction === 'up') nextRow--;
    if (direction === 'down') nextRow++;
    if (nextRow < 0 || nextRow >= ordersLength || nextCol < 0 || nextCol >= columns.length) return null;
    if (columns[nextCol].editable) return { row: nextRow, col: columns[nextCol].accessor, colIdx: nextCol };
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [editing, setEditing] = useState<{ row: number; col: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  // Filter logic for tabs (for demo, only All Orders shows all)
  const filteredOrders = orders; // You can add filtering logic for other tabs

  const handleCellClick = (rowIdx: number, col: any, colIdx: number) => {
    if (!col.editable) return;
    setEditing({ row: rowIdx, col: col.accessor });
    setEditValue(orders[rowIdx][col.accessor]);
    setTimeout(() => {
      inputRefs.current[rowIdx]?.[colIdx]?.focus();
    }, 0);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = (rowIdx: number, col: any) => {
    const updated = [...orders];
    const oldValue = updated[rowIdx][col.accessor];
    updated[rowIdx] = { ...updated[rowIdx], [col.accessor]: editValue };
    setOrders(updated);
    setEditing(null);
    console.log(`Cell edited: row ${rowIdx + 1}, column ${col.Header}, from '${oldValue}' to '${editValue}'`);
  };

  const handleEditKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIdx: number,
    col: any,
    colIdx: number
  ) => {
    if (e.key === 'Enter') {
      handleEditSave(rowIdx, col);
    } else if (e.key === 'Escape') {
      setEditing(null);
    } else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      // Save current cell
      const direction =
        e.key === 'ArrowLeft' ? 'left' :
        e.key === 'ArrowRight' ? 'right' :
        e.key === 'ArrowUp' ? 'up' :
        'down';
      const next = getNextEditableCell(rowIdx, colIdx, direction, filteredOrders.length);
      if (next) {
        handleEditSave(rowIdx, col);
        setTimeout(() => {
          setEditing({ row: next.row, col: next.col });
          setEditValue(orders[next.row][next.col]);
          inputRefs.current[next.row]?.[next.colIdx]?.focus();
        }, 0);
      }
      e.preventDefault();
    }
  };

  // Prepare refs for inputs
  inputRefs.current = Array(filteredOrders.length)
    .fill(null)
    .map((_, rowIdx) =>
      columns.map((col, colIdx) =>
        col.editable ? inputRefs.current[rowIdx]?.[colIdx] || null : null
      )
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-xl border flex flex-col" style={{ minHeight: 700 }}>
        {/* Toolbar */}
        <div className="px-4 pt-4">
          <Toolbar />
        </div>
        {/* Table */}
        <div className="flex-1 overflow-auto px-4 pb-4">
          <div className="overflow-x-auto border rounded-lg mt-2">
            <table className="min-w-full text-sm align-middle">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.accessor}
                      className={`font-semibold text-left px-3 py-2 ${col.width}`}
                    >
                      {col.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, rowIdx) => (
                  <tr
                    key={order.id}
                    className={`border-b transition-colors ${hoveredRow === rowIdx ? 'bg-blue-50' : 'bg-white'} cursor-pointer`}
                    onMouseEnter={() => setHoveredRow(rowIdx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => console.log('Row clicked:', order)}
                  >
                    {columns.map((col, colIdx) => {
                      // Status
                      if (col.accessor === 'status') {
                        return (
                          <td key={col.accessor} className="px-3 py-2"><StatusPill status={order.status} /></td>
                        );
                      }
                      // Priority
                      if (col.accessor === 'priority') {
                        return (
                          <td key={col.accessor} className="px-3 py-2"><PriorityPill priority={order.priority} /></td>
                        );
                      }
                      // URL
                      if (col.accessor === 'url') {
                        return (
                          <td key={col.accessor} className="px-3 py-2 text-blue-600 underline cursor-pointer" onClick={e => {e.stopPropagation();console.log('URL clicked:', order.url);}}>{order.url}</td>
                        );
                      }
                      // Editable
                      const isEditing = editing && editing.row === rowIdx && editing.col === col.accessor;
                      return (
                        <td
                          key={col.accessor}
                          className={`px-3 py-2 ${col.editable ? 'hover:bg-yellow-50 cursor-text' : ''}`}
                          onClick={e => { e.stopPropagation(); handleCellClick(rowIdx, col, colIdx); }}
                        >
                          {isEditing ? (
                            <input
                              ref={el => {
                                if (!inputRefs.current[rowIdx]) inputRefs.current[rowIdx] = [];
                                inputRefs.current[rowIdx][colIdx] = el;
                              }}
                              className="border rounded px-1 py-0.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                              value={editValue}
                              autoFocus
                              onChange={handleEditChange}
                              onBlur={() => handleEditSave(rowIdx, col)}
                              onKeyDown={e => handleEditKeyDown(e, rowIdx, col, colIdx)}
                            />
                          ) : (
                            <span>{order[col.accessor]}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Tabs */}
        <div className="border-t bg-gray-50 px-4 py-2 flex items-center">
          {tabList.map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-1 rounded-t-md font-medium mr-2 transition-colors ${activeTab === i ? 'bg-white border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
              onClick={() => { setActiveTab(i); console.log('Tab clicked:', tab); }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App; 