"use client";
import { useEffect, useState } from "react";

export default function Homestays({ destinationId }: { destinationId: string }) {
  const [homestays, setHomestays] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/homestays?destinationId=${destinationId}`)
      .then((res) => res.json())
      .then((data) => setHomestays(data));
  }, [destinationId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {homestays.map((stay) => (
        <div
          key={stay._id}
          className="p-4 border rounded-2xl shadow-md hover:shadow-lg transition"
        >
          <img
            src={stay.images?.[0] || "/default.jpg"}
            alt={stay.name}
            className="w-full h-40 object-cover rounded-lg"
          />
          <h2 className="text-lg font-bold mt-2">{stay.name}</h2>
          <p className="text-gray-600">₹{stay.pricePerNight} / night</p>
          <p className="text-sm mt-1">Amenities: {stay.amenities?.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
