"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function DestinationDetails() {
  const params = useParams();
  const [destination, setDestination] = useState<any>(null);

  useEffect(() => {
    if (params?.id) {
      fetch(`/api/destinations/${params.id}`)
        .then((res) => res.json())
        .then(setDestination);
    }
  }, [params?.id]);

  if (!destination) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{destination.name}</h1>
      <img src={destination.image} alt={destination.name} className="w-full h-80 object-cover rounded-lg" />
      <p>{destination.description}</p>

      {destination.location && (
        <Map lat={destination.location.lat} lng={destination.location.lng} name={destination.name} />
      )}

      {/* Homestays */}
      <section>
        <h2 className="text-2xl font-semibold mt-6">Homestays</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          {destination.homestays?.map((h: any) => (
            <div key={h._id} className="border rounded p-4 shadow">
              <img src={h.image} alt={h.name} className="h-32 w-full object-cover rounded" />
              <h3 className="font-bold">{h.name}</h3>
              <p>{h.description}</p>
              <p className="text-green-600">₹{h.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurants */}
      <section>
        <h2 className="text-2xl font-semibold mt-6">Restaurants</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          {destination.restaurants?.map((r: any) => (
            <div key={r._id} className="border rounded p-4 shadow">
              <img src={r.image} alt={r.name} className="h-32 w-full object-cover rounded" />
              <h3 className="font-bold">{r.name}</h3>
              <p>{r.description}</p>
              <p className="text-gray-500">{r.cuisine}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vendors */}
      <section>
        <h2 className="text-2xl font-semibold mt-6">Vendors</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-2">
          {destination.vendors?.map((v: any) => (
            <div key={v._id} className="border rounded p-4 shadow">
              <img src={v.image} alt={v.name} className="h-32 w-full object-cover rounded" />
              <h3 className="font-bold">{v.name}</h3>
              <p>{v.service}</p>
              <p className="text-blue-600">{v.contact}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
