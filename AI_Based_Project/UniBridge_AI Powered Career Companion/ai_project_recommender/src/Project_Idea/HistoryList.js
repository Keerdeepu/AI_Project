// src/components/HistoryList.js
import React from "react";

export default function HistoryList({ history, onClear }) {
  if (!history.length) return null;

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">History</h3>
        <button onClick={onClear} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Clear</button>
      </div>
      {history.map((entry, idx) => (
        <div key={idx} className="mb-3 border-b pb-2">
          <p><strong>Date:</strong> {new Date(entry.date).toLocaleString()}</p>
          <p><strong>Domain:</strong> {entry.input?.domain}</p>
        </div>
      ))}
    </div>
  );
}

