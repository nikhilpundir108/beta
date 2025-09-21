"use client";

import { useEffect, useState } from "react";

export default function SuggestionsPage() {
  const [plan, setPlan] = useState<any>(null);
  const [selected, setSelected] = useState({ restaurants: [], vendors: [], homestays: [] });

  useEffect(() => {
    const fetchSuggestions = async () => {
      const res = await fetch("/api/generatePlan", { method: "POST" });
      const data = await res.json();
      if (res.ok) setPlan(data.plan);
    };
    fetchSuggestions();
  }, []);

  const handleCheckbox = (type: string, item: string) => {
    setSelected((prev: any) => {
      const list = prev[type] || [];
      return list.includes(item)
        ? { ...prev, [type]: list.filter((i: string) => i !== item) }
        : { ...prev, [type]: [...list, item] };
    });
  };

  const handleSubmit = async () => {
    if (!plan) return;
    const res = await fetch("/api/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: plan._id, selected }),
    });
    if (res.ok) window.location.href = "/itinerary";
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Select Your Favorites</h1>

      {plan && (
        <div className="mt-6 space-y-4">
          {["restaurants", "vendors", "homestays"].map((type) => (
            <div key={type}>
              <h2 className="text-xl font-semibold capitalize">{type}</h2>
              <ul className="space-y-2">
                {plan.suggestions[type].map((item: string) => (
                  <li key={item}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selected[type]?.includes(item)}
                        onChange={() => handleCheckbox(type, item)}
                      />
                      <span>{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
            Generate Final Itinerary
          </button>
        </div>
      )}
    </div>
  );
}
