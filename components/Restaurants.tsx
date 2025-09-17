"use client";
import { useEffect, useState } from "react";

export default function Restaurants({ destinationId }: { destinationId: string }) {
    const [restaurants, setRestaurants] = useState<any[]>([]);

    useEffect(() => {
        fetch(`/api/restaurants?destinationId=${destinationId}`)
            .then((res) => res.json())
            .then((data) => setRestaurants(data));
    }, [destinationId]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {restaurants.map((rest) => (
                <div
                    key={rest._id}
                    className="p-4 border rounded-2xl shadow-md hover:shadow-lg transition"
                >
                    <img
                        src={rest.images?.[0] || "/default.jpg"}
                        alt={rest.name}
                        className="w-full h-40 object-cover rounded-lg"
                    />
                    <h2 className="text-lg font-bold mt-2">{rest.name}</h2>
                    <p className="text-gray-600">🍴 Cuisine: {rest.cuisine || "Mixed"}</p>
                    <p className="text-sm">💰 Avg Price: ₹{rest.avgPrice}</p>
                </div>
            ))}
        </div>
    );
}
