"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function PreferencesPage() {
  const { user } = useUser();
  const [form, setForm] = useState({
    destination: "",
    travelType: "",
    budget: "",
    duration: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please log in");

    const res = await fetch("/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId: user.id }),
    });

    if (res.ok) {
      alert("Preferences saved!");
      window.location.href = "/itinerary"; // redirect to itinerary
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Set Your Travel Preferences</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Destination"
          className="w-full border p-2 rounded"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
        />
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Travel Type (Adventure, Relax, etc.)"
          className="w-full border p-2 rounded"
          value={form.travelType}
          onChange={(e) => setForm({ ...form, travelType: e.target.value })}
        />
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Budget"
          className="w-full border p-2 rounded"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        />
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Duration (days)"
          className="w-full border p-2 rounded"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <button
          suppressHydrationWarning
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save & Generate Itinerary
        </button>
      </form>
    </div>
  );
}
