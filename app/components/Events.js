"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, differenceInMilliseconds } from "date-fns";

const eventDates = {
  "2025-02-15": "Vedic Havan Ceremony",
  "2025-02-20": "Arya Samaj Charity Event",
  "2025-02-25": "Youth Awareness Seminar",
};

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nextEvent, setNextEvent] = useState(null);
  const [countdown, setCountdown] = useState("");

  // Get nearest upcoming event
  useEffect(() => {
    const futureEvents = Object.keys(eventDates)
      .map((date) => new Date(date))
      .filter((date) => date >= new Date());

    if (futureEvents.length > 0) {
      const nearestEvent = futureEvents.sort((a, b) => a - b)[0];
      setNextEvent(nearestEvent);
    }
  }, []);

  // Countdown Timer for Next Event
  useEffect(() => {
    if (!nextEvent) return;

    const updateCountdown = () => {
      const timeLeft = differenceInMilliseconds(nextEvent, new Date());
      if (timeLeft <= 0) {
        setCountdown("⏳ Happening Today!");
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        setCountdown(`⏳ ${days}d ${hours}h ${minutes}m left`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [nextEvent]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="bg-gradient-to-br from-[#FDE5C7] to-[#F6D7A7] text-gray-900 py-10 px-8 w-full max-w-5xl mx-auto text-center rounded-3xl shadow-xl"
    >
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-[#8C4A08] mb-4 flex items-center justify-center">
        📅 Upcoming Events
      </h2>

      {/* Live Countdown for Next Event */}
      {nextEvent && (
        <p className="text-lg font-medium text-[#D9534F] bg-white px-4 py-2 rounded-full inline-block shadow-md mb-6">
          🎉 Next Event: {eventDates[format(nextEvent, "yyyy-MM-dd")]} <br /> {countdown}
        </p>
      )}

      {/* Interactive Calendar */}
      <div className="flex flex-col items-center">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            return eventDates[formattedDate]
              ? "bg-orange-200 text-orange-900 font-bold rounded-lg"
              : "text-gray-900";
          }}
          className="rounded-lg shadow-md border-2 border-orange-400 bg-white text-black"
        />

        {/* Upcoming Events List */}
        <div className="mt-6 w-full">
          <h3 className="text-2xl font-semibold text-orange-700 mb-3">
            🗓️ Event List
          </h3>
          <ul className="text-left space-y-3">
            {Object.entries(eventDates).map(([date, event], index) => (
              <li
                key={index}
                className="py-3 px-4 bg-orange-100 text-gray-900 rounded-lg shadow-sm flex justify-between items-center hover:bg-orange-200 transition-all"
              >
                <span className="font-semibold">{event}</span>
                <span className="text-orange-700">{format(new Date(date), "MMM dd, yyyy")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
