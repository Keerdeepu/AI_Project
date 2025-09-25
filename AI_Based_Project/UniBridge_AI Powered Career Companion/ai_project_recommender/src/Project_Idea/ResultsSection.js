// src/components/ResultsSection.js
import React from "react";

export default function ResultsSection({ results, onMoreIdeas, onSimilarIdeas, onBookmark, onCopy }) {
  if (!results?.titles) return null;

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">Results:</h2>
      {results.titles.map((title, i) => (
        <div key={i} className="mb-4">
          <h3 className="font-bold">{title}</h3>
          <p>{results.summaries[i]}</p>
          <p><strong>Tools:</strong> {results.tools[i]}</p>
        </div>
      ))}
      <div className="flex gap-2 mt-4">
        <button onClick={onMoreIdeas} className="bg-green-500 text-white px-3 py-1 rounded">More Ideas</button>
        <button onClick={onSimilarIdeas} className="bg-orange-500 text-white px-3 py-1 rounded">Similar Ideas</button>
        <button onClick={onBookmark} className="bg-yellow-500 text-white px-3 py-1 rounded">Bookmark</button>
        <button onClick={onCopy} className="bg-gray-500 text-white px-3 py-1 rounded">Copy</button>
      </div>
    </div>
  );
}
