"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function Header() {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [shlokas, setShlokas] = useState([]);
  const [currentShloka, setCurrentShloka] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const CHAR_PER_SECOND = 2;
  const MIN_SHLOKA_DURATION = 8; // seconds

  // Generic fetch helper
  const fetchData = useCallback(async (url, setter) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setter(data);
    } catch {
    }
  }, []);

  // Load events & auto-rotate them
  useEffect(() => {
    fetchData("/events.json", setEvents);
  }, [fetchData]);

  useEffect(() => {
    if (!events.length) return;
    const interval = setInterval(
      () => setCurrentEvent((prev) => (prev + 1) % events.length),
      5000
    );
    return () => clearInterval(interval);
  }, [events]);

  // Load shlokas
  useEffect(() => {
    fetchData("/shlokas.json", setShlokas);
  }, [fetchData]);

  // Handle shloka animation end
  const handleAnimationEnd = () => {
    if (!shlokas.length) return;
    requestAnimationFrame(() =>
      setCurrentShloka((prev) => (prev + 1) % shlokas.length)
    );
  };

  const getAnimationDuration = (text) => {
    if (!text) return `${MIN_SHLOKA_DURATION}s`;
    const duration = text.length / CHAR_PER_SECOND;
    return `${Math.max(MIN_SHLOKA_DURATION, duration)}s`;
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white shadow-lg z-[1000]">
      {/* Top Bar */}
      <div className="grid grid-cols-3 items-center px-4 py-3 md:px-6">
        {/* Left: Logo */}
        <div className="justify-self-start">
          <Link href="/">
            <Image
              src="/images/arya-samaj-logo.jpg"
              alt="Arya Samaj Logo"
              width={48}
              height={48}
              className="transition-transform transform hover:scale-105 hover:shadow-lg rounded-full"
            />
          </Link>
        </div>

        {/* Center: Title */}
        <h1 className="justify-self-center text-lg md:text-xl font-bold font-merriweather text-center">
          Arya Samaj Seawoods
        </h1>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex justify-end space-x-6 font-semibold text-lg">
          <Link href="#activities" className="hover:underline transition">
            Activities
          </Link>
          <Link href="#calendar" className="hover:underline transition">
            Calendar
          </Link>
          <Link href="#committee" className="hover:underline transition">
            Committee
          </Link>
        </nav>

        {/* Right: Mobile Hamburger */}
        <div className="md:hidden justify-self-end">
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 right-4 w-48 bg-white text-black shadow-lg rounded-md p-4 flex flex-col space-y-3 z-[2000]">
          <Link
            href="#activities"
            className="hover:text-orange-600"
            onClick={() => setMobileOpen(false)}
          >
            Activities
          </Link>
          <Link
            href="#calendar"
            className="hover:text-orange-600"
            onClick={() => setMobileOpen(false)}
          >
            Calendar
          </Link>
          <Link
            href="#committee"
            className="hover:text-orange-600"
            onClick={() => setMobileOpen(false)}
          >
            Committee
          </Link>
        </div>
      )}

      {/* Sanskrit Shloka Ticker */}
      <div className="bg-orange-700 text-sm py-1 overflow-hidden">
        <div className="relative w-full h-6">
          {shlokas.length > 0 && (
            <div
              key={currentShloka}
              className="animate-marquee whitespace-nowrap"
              onAnimationEnd={handleAnimationEnd}
              style={{
                "--marquee-duration": getAnimationDuration(
                  shlokas[currentShloka]
                ),
              }}
            >
              {shlokas[currentShloka]}
            </div>
          )}
        </div>
      </div>

      {/* Live Upcoming Event Ticker */}
      <div className="bg-yellow-500 text-black text-sm py-2 text-center font-medium">
        {events.length > 0 && (
          <>
            <span className="animate-pulse">🔥 Upcoming Event:</span>{" "}
            {events[currentEvent].title} -{" "}
            {new Date(events[currentEvent].date).toDateString()}
          </>
        )}
      </div>

      {/* Tailwind CSS custom animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            left: 100%;
          }
          100% {
            left: -100%;
          }
        }
        .animate-marquee {
          position: absolute;
          animation: marquee var(--marquee-duration) linear;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </header>
  );
}
