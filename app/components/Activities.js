"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaHandsHelping,
  FaChalkboardTeacher,
  FaLeaf,
  FaMusic,
  FaFire,
  FaUserTie,
  FaSpa,
  FaFemale,
  FaFistRaised,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function Activities() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -600, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 600, behavior: "smooth" });
  };

  const activities = [
    {
      icon: <FaHandsHelping className="text-orange-600 text-4xl mx-auto" />,
      title: "Saptahik Satsang",
      description: (
        <>
          Weekly <strong>Vaidik Satsangs</strong> and Bhajan Sandhya for inner peace and community bonding.
        </>
      ),
    },
    {
      icon: <FaChalkboardTeacher className="text-orange-600 text-4xl mx-auto" />,
      title: "Guest Lectures",
      description: (
        <>
          Inspiring talks by <strong>scholars, Acharyas, and experts</strong> on Vedas, social reform, and modern living.
        </>
      ),
    },
    {
      icon: <FaUserTie className="text-orange-600 text-4xl mx-auto" />,
      title: "16 Sanskar Purohits",
      description: (
        <>
          Experienced <strong>Purohits for 16 essential Vaidik Sanskars</strong> like Namkaran, Upanayan, and Vivah.
        </>
      ),
    },
    {
      icon: <FaFemale className="text-orange-600 text-4xl mx-auto" />,
      title: "Ladies Satsang",
      description: (
        <>
          <strong>Exclusive women’s satsangs</strong> fostering Vaidik values, empowerment, and community sisterhood.
        </>
      ),
    },
    {
      icon: <FaFire className="text-orange-600 text-4xl mx-auto" />,
      title: "Dainik Yajya",
      description: (
        <>
          Daily morning <strong>Vaidik Havan (Yajya)</strong> to purify the environment and cultivate positive vibrations.
        </>
      ),
    },
    {
      icon: <FaLeaf className="text-orange-600 text-4xl mx-auto" />,
      title: "Ayurvedik Chikitsalaya",
      description: (
        <>
          <strong>Traditional Ayurvedic health consultations</strong> and natural remedies at minimum charitable cost.
        </>
      ),
    },
    {
      icon: <FaMusic className="text-orange-600 text-4xl mx-auto" />,
      title: "Dance & Music",
      description: (
        <>
          <strong>Bharatnatyam, Kathak, and Indian Music classes</strong> for children and adults — preserving our rich cultural heritage.
        </>
      ),
    },
    {
      icon: <FaSpa className="text-orange-600 text-4xl mx-auto" />,
      title: "Yoga Classes",
      description: (
        <>
          Regular <strong>Yoga & Pranayama sessions</strong> for health, harmony, and spiritual awareness.
        </>
      ),
    },
    {
      icon: <FaFistRaised className="text-orange-600 text-4xl mx-auto" />,
      title: "Karate Classes",
      description: (
        <>
          <strong>Martial arts and self-defense classes</strong> to build discipline, confidence, and strength in youth.
        </>
      ),
    },
  ];

  return (
    <section
      id="activities"
      className="py-16 px-6 bg-gradient-to-b from-orange-50 to-yellow-100 text-gray-900 relative"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-merriweather text-orange-700">
          Our Community Activities
        </h2>
        <p className="mt-3 text-lg text-gray-700 font-poppins">
          Arya Samaj Seawoods organizes community activities
          for spiritual upliftment, health, and cultural enrichment — all at
          charitable, no-profit, no-loss rates.
        </p>
      </div>

      {/* Scroll buttons */}
      <div className="relative mt-10 max-w-7xl mx-auto px-2">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800/60 text-white rounded-full shadow hover:bg-gray-900"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth no-scrollbar scroll-container"
        >
          <div className="flex gap-8 w-fit px-6">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center w-[250px] flex-shrink-0"
              >
                {activity.icon}
                <h3 className="mt-4 text-xl font-bold font-merriweather">
                  {activity.title}
                </h3>
                <p className="text-gray-700 text-sm mt-2">
                  {activity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800/60 text-white rounded-full shadow hover:bg-gray-900"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
