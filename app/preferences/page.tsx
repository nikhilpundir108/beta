"use client";
import { useState } from "react";

export default function PreferencesPage() {
  const [form, setForm] = useState({
    destination: "",
    travelType: "",
    budget: "",
    duration: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Preferences saved!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md mx-auto">
      <select
        value={form.destination}
        onChange={(e) => setForm({ ...form, destination: e.target.value })}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Destination</option>
        <option>Jaipur</option>
        <option>Manali</option>
        <option>Goa</option>
        <option>Kerala</option>
      </select>

      <select
        value={form.travelType}
        onChange={(e) => setForm({ ...form, travelType: e.target.value })}
        className="w-full border p-2 rounded"
      >
        <option value="">Travel Type</option>
        <option>Solo</option>
        <option>Family</option>
        <option>Group</option>
        <option>Adventure</option>
        <option>Relaxation</option>
      </select>

      <input
        type="text"
        placeholder="Budget Range"
        value={form.budget}
        onChange={(e) => setForm({ ...form, budget: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Duration (e.g., 5 days)"
        value={form.duration}
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Save Preferences
      </button>
    </form>
  );
}
