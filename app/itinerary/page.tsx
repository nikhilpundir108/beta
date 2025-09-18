"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import ReactMarkdown from 'react-markdown';

export default function ItineraryPage() {
  const { user, isLoaded } = useUser();
  const [itinerary, setItinerary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return; // Wait until Clerk has loaded the user state

    if (!user) {
      setIsLoading(false);
      return; // User is not logged in, so do nothing.
    }

    const fetchItinerary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // The API call is now secure and simple. The backend knows the user.
        const res = await fetch(`/api/itinerary`);

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch itinerary");
        }
        
        setItinerary(data.itinerary);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItinerary();
  }, [user, isLoaded]);

  if (!isLoaded || isLoading) {
    return <div className="text-center p-10">Generating your personalized itinerary...</div>;
  }
  
  if (!user) {
    return <div className="text-center p-10">Please log in to view your itinerary.</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your AI-Generated Itinerary</h1>
      <article className="prose lg:prose-xl  p-6 rounded-lg shadow">
        <ReactMarkdown>{itinerary}</ReactMarkdown>
      </article>
    </div>
  );
}