"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then(setDestinations);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Destinations</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {destinations.map((d) => (
          <Link key={d._id} href={`/destinations/${d._id}`} className="border rounded-lg overflow-hidden shadow hover:shadow-lg">
            <img src={d.image} alt={d.name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{d.name}</h2>
              <p className="text-gray-600">{d.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
