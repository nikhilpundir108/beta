"use client";
import React, { useState } from 'react';
import { Compass, MapPin, Calendar, Users } from 'lucide-react';
import TravelPlanner from '@/components/TravelPlanner';
import MyPlans from '@/components/MyPlans';
import { TravelPlan } from '@/types/travel';
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";


function App() {

  const [currentView, setCurrentView] = useState<'home' | 'planner' | 'plans'>('home');
  const [savedPlans, setSavedPlans] = useState<TravelPlan[]>([]);
  const { user } = useUser();


  const handleSavePlan = (plan: TravelPlan) => {
    setSavedPlans(prev => [...prev, { ...plan, id: Date.now().toString() }]);
    setCurrentView('plans');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'planner':
        return <TravelPlanner onSavePlan={handleSavePlan} onBack={() => setCurrentView('home')} />;
      case 'plans':
        return <MyPlans plans={savedPlans} onBack={() => setCurrentView('home')} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-t border-b border-white/20">
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
                      onClick={() => setCurrentView('plans')}
                      className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                    >
                      My Plans ({savedPlans.length})
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
              <div className="text-center mb-16">
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

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-xl transition-all">
                  <MapPin className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Mood-Based Planning</h3>
                  <p className="text-gray-600">
                    Tell us your mood and we'll recommend destinations that match your vibe -
                    adventurous, relaxing, or cultural experiences.
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-xl transition-all">
                  <Calendar className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Itineraries</h3>
                  <p className="text-gray-600">
                    AI-powered planning that considers your budget, duration, and preferences
                    to create the perfect day-by-day schedule.
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-xl transition-all">
                  <Users className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Local Support</h3>
                  <p className="text-gray-600">
                    Connect with verified local vendors, guides, and businesses to enhance
                    your experience while supporting the community.
                  </p>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-indigo-600">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Trip Details</h4>
                    <p className="text-sm text-gray-600">Enter your dates, budget, and travel group size</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-indigo-600">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Choose Mood</h4>
                    <p className="text-sm text-gray-600">Select your desired travel experience and vibe</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-indigo-600">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Customize</h4>
                    <p className="text-sm text-gray-600">Select transport, accommodation, and attractions</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-indigo-600">4</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Enjoy</h4>
                    <p className="text-sm text-gray-600">Get your personalized itinerary and start exploring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderCurrentView();
}

export default App;