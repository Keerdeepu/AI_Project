// src/components/ProjectForm.js
import React from "react";

export default function ProjectForm({ formData, onChange, onSubmit, onReset }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label>Domain:*</label>
      <input
        type="text"
        name="domain"
        value={formData.domain}
        onChange={onChange}
      /><br/>

      <label>Skill Level:*</label>
      <select name="skillLevel" value={formData.skillLevel} onChange={onChange}>
        <option value="">Select Skill Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select><br/>

      <label>TimeFrame:*</label>
      <select name="timeframe" value={formData.timeframe} onChange={onChange}>
        <option value="">Select Timeframe</option>
        <option value="short">Short</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select><br/>

      <label>Constraints (Optional)</label>
      <textarea
        name="constraints"
        value={formData.constraints}
        onChange={onChange}
        placeholder="Enter any constraints..."
      />

      <button type="submit">Generate Project</button>
      <button type="button" onClick={onReset}>Reset</button>
    </form>
  );
}
