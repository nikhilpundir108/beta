"use client";
import { useEffect, useState } from "react";

export default function Vendors({ destinationId }: { destinationId: string }) {
    const [vendors, setVendors] = useState<any[]>([]);

    useEffect(() => {
        fetch(`/api/vendors?destinationId=${destinationId}`)
            .then((res) => res.json())
            .then((data) => setVendors(data));
    }, [destinationId]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {vendors.map((vendor) => (
                <div
                    key={vendor._id}
                    className="p-4 border rounded-2xl shadow-md hover:shadow-lg transition"
                >
                    <img
                        src={vendor.images?.[0] || "/default.jpg"}
                        alt={vendor.name}
                        className="w-full h-40 object-cover rounded-lg"
                    />
                    <h2 className="text-lg font-bold mt-2">{vendor.name}</h2>
                    <p className="text-gray-600">Category: {vendor.category}</p>
                    <p className="text-sm">💰 Price: ₹{vendor.price}</p>
                </div>
            ))}
        </div>
    );
}
