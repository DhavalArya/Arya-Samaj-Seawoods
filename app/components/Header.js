"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function Header() {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [shlokas, setShlokas] = useState([]);
  const [currentShloka, setCurrentShloka] = useState(0);

  const CHAR_PER_SECOND = 2;
  const MIN_SHLOKA_DURATION = 8; // seconds

  // Generic fetch helper
  const fetchData = useCallback(async (url, setter) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(`Failed to load ${url}:`, err);
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
      <div className="grid grid-cols-3 items-center px-6 py-3">
        {/* Left: Logo */}
        <div className="justify-self-start">
          <Link href="/">
            <Image
              src="/images/arya-samaj-logo.jpg"
              alt="Arya Samaj Logo"
              width={56}
              height={56}
              className="transition-transform transform hover:scale-105 hover:shadow-lg"
            />
          </Link>
        </div>

        {/* Center: Title */}
        <h1 className="justify-self-center text-xl font-bold font-merriweather">
          Arya Samaj Seawoods
        </h1>

        {/* Right: Navigation */}
        <nav className="flex justify-end space-x-4 font-semibold text-lg">
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
      </div>

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
