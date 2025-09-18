"use client";
import React, { useState } from "react";
import { Compass, MapPin, Calendar, Users } from "lucide-react";
import TravelPlanner from "@/components/TravelPlanner";
import MyPlans from "@/components/MyPlans";
import { TravelPlan } from "@/types/travel";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

function App() {
  const [currentView, setCurrentView] = useState<"home" | "planner" | "plans">("home");
  const [savedPlans, setSavedPlans] = useState<TravelPlan[]>([]);
  const { user } = useUser();

  const handleSavePlan = (plan: TravelPlan) => {
    setSavedPlans((prev) => [...prev, { ...plan, id: Date.now().toString() }]);
    setCurrentView("plans");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "planner":
        return <TravelPlanner onSavePlan={handleSavePlan} onBack={() => setCurrentView("home")} />;
      case "plans":
        return <MyPlans plans={savedPlans} onBack={() => setCurrentView("home")} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
              <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Compass className="h-8 w-8 text-indigo-600" />
                    <span className="text-2xl font-bold text-gray-900">Plan Your Trip</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => setCurrentView("plans")}
                      className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                    >
                      My Plans ({savedPlans.length})
                    </button>
                    {/* <SignedIn>
                      <button
                        onClick={() => setCurrentView("plans")}
                        className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                      >
                        My Plans ({savedPlans.length})
                      </button>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow">
                          Sign In
                        </button>
                      </SignInButton>
                    </SignedOut> */}
                  </div>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Plan Your Perfect Journey
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Create personalized travel experiences tailored to your mood, budget, and preferences.
                Discover hidden gems and support local communities.
              </p>
              <SignedIn>
                <button
                  onClick={() => setCurrentView("planner")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Planning Your Trip
                </button>
              </SignedIn>
              <SignedOut>
                <p className="text-gray-500">Please sign in to start planning.</p>
              </SignedOut>
            </div>

            {/* Features + How It Works (your existing sections remain) */}
          </div>
        );
    }
  };

  return renderCurrentView();
}

export default App;
