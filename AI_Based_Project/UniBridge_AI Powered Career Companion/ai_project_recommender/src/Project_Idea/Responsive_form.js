import React, { useState, useContext } from "react";
import { AppContext } from "./AppContext";
import ProjectForm from "./ProjectForm";
import ResultsSection from "./ResultsSection";
import IdeasList from "./IdeasList";
import HistoryList from "./HistoryList";
import BookmarksList from "./BookmarksList";
import ideasData from "./ideas.json";

export default function Responsive_form() {
  const { history, setHistory, bookmarks, setBookmarks } = useContext(AppContext);

  const [formData, setFormData] = useState({
    domain: "", skillLevel: "", timeframe: "", constraints: ""
  });
  const [results, setResults] = useState({ main: null, moreIdeas: null, similarIdeas: null });
  const [lastInput, setLastInput] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.domain || !formData.skillLevel || !formData.timeframe) {
      return alert("Please fill in all required fields.");
    }
    setLastInput(formData);
    await fetchProjects(formData, "main");
  };

  const fetchProjects = async (input, type="main", variation=false) => {
    const body = variation ? { ...input, variation: true } : input;
    const response = await fetch("http://localhost:8000/generate-projects", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    setResults(prev => ({ ...prev, [type]: data }));
    if (type === "main") setHistory([{ input: lastInput, result: data, date: new Date().toISOString() }, ...history]);
  };

  return (
    <div className="container">
      <h1>Project Generator</h1>

      <ProjectForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={() => setFormData({ domain: "", skillLevel: "", timeframe: "", constraints: "" })}
      />

      <ResultsSection
        results={results.main}
        onMoreIdeas={() => setResults(prev => ({ ...prev, moreIdeas: ideasData.moreIdeas }))}
        onSimilarIdeas={() => setResults(prev => ({ ...prev, similarIdeas: ideasData.similarIdeas }))}
        onBookmark={() => {
          const newBookmark = { input: lastInput, result: results, date: new Date().toISOString() };
          setBookmarks([newBookmark, ...bookmarks]);
        }}
        onCopy={() => {
          const text = results.main?.titles.map((t,i) => 
            `${t}\n${results.main.summaries[i]}\nTools: ${results.main.tools[i]}`).join("\n\n");
          navigator.clipboard.writeText(text);
        }}
      />

      <IdeasList title="More Ideas" ideas={results.moreIdeas}
        onClear={() => setResults(prev => ({ ...prev, moreIdeas: null }))} />

      <IdeasList title="Similar Ideas" ideas={results.similarIdeas}
        onClear={() => setResults(prev => ({ ...prev, similarIdeas: null }))} />

      <HistoryList history={history} onClear={() => { setHistory([]); localStorage.removeItem("projectHistory"); }} />
      <BookmarksList bookmarks={bookmarks} onClear={() => { setBookmarks([]); localStorage.removeItem("bookmarks"); }} />
    </div>
  );
}