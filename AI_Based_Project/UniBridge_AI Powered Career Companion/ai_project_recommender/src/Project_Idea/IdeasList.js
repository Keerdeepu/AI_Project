// src/components/IdeasList.js
import React from "react";

export default function IdeasList({ title, ideas, onClear }) {
  if (!ideas?.titles) return null;

  return (
    <div className="mt-6 bg-blue-100 p-4 rounded">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={onClear}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >Clear</button>
      </div>
      {ideas.titles.map((t, i) => (
        <div key={i} className="mb-4">
          <h3 className="font-bold">{t}</h3>
          <p>{ideas.summaries[i]}</p>
          <p><strong>Tools:</strong> {ideas.tools[i]}</p>
        </div>
      ))}
    </div>
  );
}
