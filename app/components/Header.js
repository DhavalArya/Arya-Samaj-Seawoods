"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [events, setEvents] = useState([
    "📢 Vedic Havan Ceremony - Feb 15, 2025",
    "🎤 Youth Awareness Seminar - Feb 25, 2025",
    "📖 Vedic Knowledge Workshop - March 10, 2025",
  ]);
  const [currentEvent, setCurrentEvent] = useState(0);

  useEffect(() => {
    const eventInterval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(eventInterval);
  }, []);

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white shadow-lg z-[1000]">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo with Glow Effect */}
        <Link href="/">
          <img
            src="/images/arya-samaj-logo.jpg"
            alt="Arya Samaj Logo"
            className="h-14 transition-transform transform hover:scale-105 hover:shadow-lg"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6 font-semibold text-lg">
          <Link href="#wisdom" className="text-white hover:underline transition">
            Wisdom
          </Link>
          <Link href="#events" className="text-white hover:underline transition">
            Events
          </Link>
          <Link href="#knowledge" className="text-white hover:underline transition">
            Knowledge
          </Link>
        </nav>
      </div>

      {/* Sanskrit Shloka Marquee */}
      <div className="bg-orange-700 text-white text-sm py-1 text-center font-semibold">
        <marquee behavior="scroll" direction="left">
          "ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥"
        </marquee>
      </div>

      {/* Live Upcoming Event Ticker */}
      <div className="bg-yellow-500 text-black text-sm py-2 text-center font-medium">
        <span className="animate-pulse">🔥 Upcoming Event:</span> {events[currentEvent]}
      </div>
    </header>
  );
}
