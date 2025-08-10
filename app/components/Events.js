"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Calendar from "react-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "react-calendar/dist/Calendar.css";
import { format, differenceInMilliseconds } from "date-fns";

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]); // fetched events array
  const [eventDates, setEventDates] = useState({});
  const [nextEvent, setNextEvent] = useState(null);
  const [countdown, setCountdown] = useState("");

  // Fetch events from public/events.json on mount
  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        // convert to {date: title} object for easy lookup
        const eventsObj = {};
        data.forEach(event => {
          eventsObj[event.date] = event.title;
        });
        setEventDates(eventsObj);
      })
      .catch(err => console.error("Failed to load events:", err));
  }, []);

  // Get nearest upcoming event
  useEffect(() => {
    const futureEvents = events
      .filter(event => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (futureEvents.length > 0) {
      setNextEvent(futureEvents[0]);
    }
  }, [events]);

  // Countdown Timer for Next Event
  useEffect(() => {
    if (!nextEvent) return;

    const updateCountdown = () => {
      const timeLeft = differenceInMilliseconds(new Date(nextEvent.date), new Date());
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
      id="calendar"
    >
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-[#8C4A08] mb-4 flex items-center justify-center">
        📅 Upcoming Events
      </h2>

      {/* Live Countdown for Next Event */}
      {nextEvent && (
        <p className="text-lg font-medium text-[#D9534F] bg-white px-4 py-2 rounded-full inline-block shadow-md mb-6">
          🎉 Next Event: {nextEvent.title} <br /> {countdown}
        </p>
      )}

      {/* Interactive Calendar */}
      <div className="flex flex-col items-center">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            return eventDates[formattedDate] ? "event-day" : null;
          }}
          tileContent={({ date }) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            return eventDates[formattedDate] ? (
              <div
                data-tooltip-id="event-tooltip"
                data-tooltip-content={eventDates[formattedDate]}
                className="w-full h-full"
              ></div>
            ) : null;
          }}
          className="rounded-lg shadow-md border-2 border-orange-400 bg-white text-black"
        />

        {/* Upcoming Events List */}
        <div className="mt-6 w-full">
          <h3 className="text-2xl font-semibold text-orange-700 mb-3">
            🗓️ Event List
          </h3>
          <ul className="text-left space-y-3">
            {events.map((event, index) => (
              <li
                key={index}
                className="py-3 px-4 bg-orange-100 text-gray-900 rounded-lg shadow-sm flex justify-between items-center hover:bg-orange-200 transition-all"
              >
                <span className="font-semibold">{event.title}</span>
                <span className="text-orange-700">{format(new Date(event.date), "MMM dd, yyyy")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Global Tooltip for event names */}
      <Tooltip id="event-tooltip" />
    </motion.section>
  );
}
