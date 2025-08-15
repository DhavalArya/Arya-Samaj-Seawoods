"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(0);

  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to load events:", err));
  }, []);

  const [shlokas, setShlokas] = useState([]);
  const [currentShloka, setCurrentShloka] = useState(0);
  // const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (events.length === 0) return;
    const eventInterval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(eventInterval);
  }, [events]);

  // Fetch shlokas from JSON on mount
  useEffect(() => {
    fetch('/shlokas.json')
      .then(res => res.json())
      .then(data => {
        setShlokas(data);
        // setAnimate(true); // Start animation after loading
      })
      .catch(err => console.error("Failed to load shlokas:", err));
  }, []);

  // Handler when animation ends
  const handleAnimationEnd = () => {
    requestAnimationFrame(() => {
      setCurrentShloka((prev) => (prev + 1) % shlokas.length);
      // setAnimate(false); // reset animation
      // setTimeout(() => setAnimate(true), 100); // restart animation
    });
  };

  const getAnimationDuration = (text) => {
    const charsPerSecond = 2; // adjust: higher = faster
    const duration = text.length / charsPerSecond;
    return `${Math.max(8, duration)}s`; // minimum 8s for short shlokas
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
        <div className="justify-self-center">
          <h1 className="text-xl font-bold font-merriweather text-white">
            Arya Samaj Seawoods
          </h1>
        </div>

        {/* Right: Navigation */}
        <nav className="flex justify-end space-x-4 font-semibold text-lg">
          <Link href="#activities" className="text-white hover:underline transition">
            Activities
          </Link>
          <Link href="#calendar" className="text-white hover:underline transition">
            Calendar
          </Link>
          <Link href="#committee" className="text-white hover:underline transition">
            Committee
          </Link>
        </nav>
      </div>

      {/* Sanskrit Shloka Custom Animation */}
      <div className="bg-orange-700 text-white text-sm py-1 overflow-hidden">
        <div className="relative w-full h-6">
          {shlokas.length > 0 && (
            <div
              key={currentShloka}
              className={`animate-marquee whitespace-nowrap`}
              onAnimationEnd={handleAnimationEnd}
              style={{
                "--marquee-duration": getAnimationDuration(shlokas[currentShloka]),
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
            <span className="animate-pulse">🔥 Upcoming Event:</span> {events[currentEvent].title} - {new Date(events[currentEvent].date).toDateString()}
          </>
        )}
      </div>

      {/* Tailwind CSS custom animation (Add to your global CSS) */}
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
