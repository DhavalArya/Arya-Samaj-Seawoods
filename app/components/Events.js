"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import Calendar from "react-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "react-calendar/dist/Calendar.css";
import { format, differenceInMilliseconds, parse } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  // const [pastEvents, setPastEvents] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/events.json", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEvents(sorted);
        setLastUpdated(new Date());

        const now = new Date();
        const upcoming = sorted
          .filter((event) => new Date(event.date) >= now)
          .slice(0, 3);
        // const past = sorted.filter((event) => new Date(event.date) < now);

        setUpcomingEvents(upcoming);
        // setPastEvents(past);
        setNextEvent(upcoming.length > 0 ? upcoming[0] : null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error fetching events:", err);
        }
      });

    return () => controller.abort();
  }, []);

  const eventDates = useMemo(() => {
    const eventsObj = {};
    events.forEach((event) => {
      eventsObj[event.date] = event.title;
    });
    return eventsObj;
  }, [events]);

  useEffect(() => {
    if (!nextEvent) return;

    const updateCountdown = () => {
      const timeZone = 'Asia/Kolkata';

      // Combine date and start time as a string (e.g., "2025-10-12 9:00 PM")
      const startTimeStr = nextEvent.time.split(" - ")[0]; // "9:00 PM"
      const combinedDateTimeStr = `${nextEvent.date} ${startTimeStr}`;

      // Define the format string to match the combined format
      const formatString = "yyyy-MM-dd h:mm a";

      // Parse to a Date object (assumes local time, but we'll convert to zoned)
      const parsedEventDate = parse(combinedDateTimeStr, formatString, new Date());

      // Convert to IST "wall time" (Asia/Kolkata)
      const eventInIST = toZonedTime(parsedEventDate, timeZone);

      // Get current time and convert to IST
      const now = new Date();
      const nowInIST = toZonedTime(now, timeZone);

      // Calculate time difference
      const timeLeft = differenceInMilliseconds(eventInIST, nowInIST);

      if (timeLeft <= 0) {
        setCountdown("⏳ Event is today!");
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        setCountdown(`⏳ ${days} days ${hours} hours ${minutes} minutes left`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [nextEvent]);

  // Hindi share message (used only for share content)
  const getEventShareMessage = (event) => {
    const formattedDate = format(new Date(event.date), "dd/MM/yyyy");

    return `📢 *${event.title}*  
  🌸 ${event.description}🌸
  📍 पता: प्लॉट नं. ५, सूर्या सीएचएस, सेक्टर ५० (ओल्ड), सीवुड्स, नवी मुंबई  
  📅 तारीख: ${formattedDate} (रविवार)  
  🕘 समय: ${event.time}  

  ✨ कार्यक्रम क्रम: हवन 🔥 → भजन 🎶 → सत्संग 🗣️ → प्रसाद 🍽️  

  🌟 *ब्रम्हा विजय पाल शास्त्री* जी के साथ आध्यात्मिक अनुभूति।  

  🎉 विशेष:  
  -  

  🙏 कार्यक्रम एक पावन यात्रा है — एक साथ आओ, दिल से जुड़ो, और आध्यात्मिक आनंद उठाओ!  

  👥 समिति के सदस्य:  
  - प्रधान: संजीव अग्रवाल  
  - निवेदक: श्री हरिदास अगरवाल, डॉ. तुलसीराम बांगिया  
  - उप प्रधान: श्री ब्रह्मदत्त खुलर, महेंद्र आर्य  
  - मंत्री: श्री स्वदेश करमाकर, श्री धवल आर्य  
  - कोषाध्यक्ष: श्री विजय गुप्ता, चंद्रबली सिंह  
  - सदस्यगण: प्रेम कुमार अरोड़ा, प्रमोद गुलाटी, आर पी गिरधर, पुष्पिंदर सिंह, सविता गुलाटी, शिप्रा करमाकर, सविता गर्जे, डॉ. रजनी गुप्ता  

  🌈 आप सभी का उत्साह से स्वागत है — चलिए, मिलकर आध्यात्म और प्रेम का वातावरण बनाएं!  
  🙏 धन्यवाद  
  🕉️ *आर्य समाज सीवुड*  
  📞 संपर्क सूत्र: +91-9223344556 | +91-9323022055
  🌐 वेबसाइट: www.aryasamajseawoods.co.in 
  📍 स्थान: https://maps.app.goo.gl/QQUvD9oD1yWA9ps8A 
  📧 ईमेल: aryasamajseawoods@gmail.com

  #AryaSamaj #Seawoods #हवन #भजन #सत्संग #प्रसाद #आध्यात्मिकता #नवीमुंबई #समाजसेवा #शांति`;
  };

  const openNew = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const shareOnWhatsApp = (event) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      getEventShareMessage(event)
    )}`;
    openNew(url);
  };

  const shareOnX = (event) => {
    const message = getEventShareMessage(event);
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(message)}`;
    openNew(url);
  };

  const shareOnFacebook = (event) => {
    const message = getEventShareMessage(event);
    // Facebook share link requires a URL, so we just open facebook.com
    // Users can paste message manually, as Facebook does not support text param in URL
    openNew("https://facebook.com");
    // Optionally, you can copy the message automatically:
    navigator.clipboard?.writeText(message);
  };

  const shareOnLinkedIn = (event) => {
    const message = getEventShareMessage(event);
    openNew("https://linkedin.com");
    navigator.clipboard?.writeText(message);
  };

  // Instagram share (Instagram does NOT have official text share URLs,
  // so we copy text to clipboard and open instagram.com for user to paste manually)
  const shareOnInstagram = (event) => {
    const message = getEventShareMessage(event);
    navigator.clipboard
      .writeText(message)
      .then(() => {
        alert("Message copied! Please paste it in your Instagram post.");
        openNew("https://instagram.com");
      })
      .catch(() => {
        openNew("https://instagram.com");
      });
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="bg-gradient-to-br from-[#FDE5C7] to-[#F6D7A7] text-gray-900 py-10 px-8 w-full max-w-5xl mx-auto text-center rounded-3xl shadow-xl"
      id="calendar"
      aria-labelledby="events-heading"
    >
      <h2
        id="events-heading"
        className="text-4xl font-bold text-[#8C4A08] mb-4 flex items-center justify-center"
      >
        📅 Upcoming Events
      </h2>

      {nextEvent ? (
        <p
          className="text-lg font-medium text-[#D9534F] bg-white px-4 py-2 rounded-full inline-block shadow-md mb-6"
          aria-live="polite"
        >
          🎉 Next Event: {nextEvent.title} <br /> {countdown}
        </p>
      ) : (
        <p className="text-lg font-medium text-gray-700 bg-white px-4 py-2 rounded-full inline-block shadow mb-6">
          🙁 No upcoming events available.
        </p>
      )}

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
            const matchedEvent = events.find((e) => e.date === formattedDate);
            return matchedEvent ? (
              <div
                data-tooltip-id="event-tooltip"
                data-tooltip-content={matchedEvent.description}
                className="w-full h-full"
                role="tooltip"
              ></div>
            ) : null;
          }}
          className="rounded-lg shadow-md border-2 border-orange-400 bg-white text-black"
          aria-label="Events Calendar"
        />

        <div className="mt-6 w-full">
          <h3 className="text-2xl font-semibold text-orange-700 mb-3">
            🗓️ Upcoming Events
          </h3>
          {lastUpdated && (
            <p className="text-sm text-gray-600 mb-2">
              Last Updated: {format(lastUpdated, "dd MMM yyyy")}
            </p>
          )}
          {upcomingEvents.length === 0 ? (
            <p className="text-gray-700">No events available.</p>
          ) : (
            <ul className="text-left space-y-6">
              {upcomingEvents.map((event, index) => (
                <li
                  key={index}
                  className="py-4 px-5 bg-orange-100 text-gray-900 rounded-lg shadow-sm hover:bg-orange-200 transition-all"
                >
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <p className="text-sm text-gray-700 mb-1">{event.description}</p>
                  <div className="flex justify-between items-center text-sm text-orange-700 mb-3">
                    <time dateTime={event.date}>
                      📅 {format(new Date(event.date), "dd/MM/yyyy")}
                    </time>
                    <span>⏰ {event.time}</span>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => shareOnWhatsApp(event)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      title="Share on WhatsApp"
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={() => shareOnX(event)}
                      className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 text-sm"
                      title="Share on X"
                    >
                      X
                    </button>
                    <button
                      onClick={() => shareOnFacebook(event)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      title="Share on Facebook"
                    >
                      Facebook
                    </button>
                    <button
                      onClick={() => shareOnLinkedIn(event)}
                      className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-900 text-sm"
                      title="Share on LinkedIn"
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() => shareOnInstagram(event)}
                      className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 text-sm"
                      title="Share on Instagram"
                    >
                      Instagram
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* <div className="mt-10 w-full">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            🕰️ Past Events
          </h3>
          {pastEvents.length === 0 ? (
            <p className="text-gray-700">No past events available.</p>
          ) : (
            <ul className="text-left space-y-4">
              {pastEvents.map((event, index) => (
                <li
                  key={index}
                  className="py-3 px-5 bg-gray-100 rounded-lg shadow-sm text-gray-800"
                >
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <time
                    className="text-xs text-gray-500"
                    dateTime={event.date}
                  >
                    📅 {format(new Date(event.date), "dd/MM/yyyy")}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>

      <Tooltip id="event-tooltip" place="top" effect="solid" />
    </motion.section>
  );
}
