// components/Navbar.tsx

"use client"; // This is a client component because it uses hooks

import { useState } from "react";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left Side: Logo and Navigation Links */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ✈️ Tour Mate
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link href="/destinations" className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/preferences" className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                  Preferences
                </Link>
                <Link href="/itinerary" className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                  AI Itinerary
                </Link>
                <Link href="/travel" className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                  Plan Your Trip
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="hidden md:block">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button suppressHydrationWarning className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu button */}
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isMenuOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/itinerary" className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
              My Itinerary
            </Link>
            <Link href="/preferences" className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
              Preferences
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2">
              {isSignedIn ? (
                <div className="flex items-center">
                  <UserButton afterSignOutUrl="/" />
                  <span className="ml-3 text-base font-medium text-gray-800">Your Profile</span>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="w-full text-left bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}