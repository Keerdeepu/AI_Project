// src/components/BookmarksList.js
import React from "react";

export default function BookmarksList({ bookmarks, onClear }) {
  if (!bookmarks.length) return null; // ✅ Render nothing if no bookmarks

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Bookmarks</h3>
        <button
          onClick={onClear}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Clear Bookmarks
        </button>
      </div>

      {bookmarks.map((entry, idx) => (
        <div key={idx} className="mb-3 border-b pb-2">
          <p>
            <strong>Date:</strong>{" "}
            {entry.date ? new Date(entry.date).toLocaleString() : "Unknown"}
          </p>
          <p>
            <strong>Domain:</strong>{" "}
            {entry.input ? entry.input.domain : "Unknown"}
          </p>
        </div>
      ))}
    </div>
  );
}

