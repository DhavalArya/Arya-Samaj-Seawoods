"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const vedicTopics = [
  { 
    title: "Introduction to Arya Samaj", 
    description: "Founded in 1875 to promote Vedic wisdom.",
    icon: "📜"
  },
  { 
    title: "Basic Vedic Teachings", 
    description: "Vedas promote truth, righteousness, and selflessness.",
    icon: "🔥"
  },
  { 
    title: "Downloadable Books", 
    description: "Access books by Maharshi Dayanand and Vedic scriptures.",
    icon: "📚",
    link: "/books" // Add download functionality
  },
  { 
    title: "Arya Samaj QR Codes", 
    description: "Scan QR to access more Arya Samaj resources.",
    icon: "🔗",
    link: "/qr-codes"
  },
];

export default function VedicKnowledge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="bg-gradient-to-br from-[#FDE5C7] to-[#F6D7A7] p-10 rounded-3xl shadow-lg text-gray-900 w-full max-w-5xl mx-auto text-center"
    >
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-[#8C4A08] mb-6">📖 Hindu & Vedic Knowledge Hub</h2>

      {/* Scrollable Vedic Cards */}
      <div className="overflow-x-auto flex space-x-6 snap-x scroll-smooth p-4">
        {vedicTopics.map((topic, index) => (
          <motion.div
            key={index}
            className="min-w-[320px] bg-white p-6 rounded-xl shadow-md snap-center border border-orange-300 flex flex-col items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold text-orange-800">{topic.icon} {topic.title}</h3>
            <p className="text-gray-700 mt-2">{topic.description}</p>

            {/* Download or QR Link */}
            {topic.link && (
              <a
                href={topic.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition-all shadow-md"
              >
                {topic.title.includes("Downloadable") ? "📥 Download" : "🔗 View"}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
