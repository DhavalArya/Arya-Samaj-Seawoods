"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
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
      description:
        "Weekly Vaidik Satsangs and Bhajan Sandhya at Arya Samaj Seawoods, promoting inner peace and community bonding.",
    },
    {
      icon: <FaChalkboardTeacher className="text-orange-600 text-4xl mx-auto" />,
      title: "Guest Lectures",
      description:
        "Inspiring talks by scholars, Acharyas, and experts on Vedas, social reform, and modern living.",
    },
    {
      icon: <FaUserTie className="text-orange-600 text-4xl mx-auto" />,
      title: "16 Sanskar Purohits",
      description:
        "Experienced Purohits for 16 essential Vaidik Sanskars like Namkaran, Upanayan, and Vivah.",
    },
    {
      icon: <FaFemale className="text-orange-600 text-4xl mx-auto" />,
      title: "Ladies Satsang",
      description:
        "Exclusive women’s satsangs fostering Vaidik values, empowerment, and community sisterhood.",
    },
    {
      icon: <FaFire className="text-orange-600 text-4xl mx-auto" />,
      title: "Dainik Yajya",
      description:
        "Daily morning Vaidik Havan (Yajya) to purify the environment and cultivate positive vibrations.",
    },
    {
      icon: <FaLeaf className="text-orange-600 text-4xl mx-auto" />,
      title: "Ayurvedik Chikitsalaya",
      description:
        "Traditional Ayurvedic health consultations and natural remedies at minimum charitable cost.",
    },
    {
      icon: <FaMusic className="text-orange-600 text-4xl mx-auto" />,
      title: "Dance & Music",
      description:
        "Bharatnatyam, Kathak, and Indian Music classes for children and adults — preserving our rich cultural heritage.",
    },
    {
      icon: <FaSpa className="text-orange-600 text-4xl mx-auto" />,
      title: "Yoga Classes",
      description:
        "Regular Yoga & Pranayama sessions for health, harmony, and spiritual awareness.",
    },
    {
      icon: <FaFistRaised className="text-orange-600 text-4xl mx-auto" />,
      title: "Karate Classes",
      description:
        "Martial arts and self-defense classes to build discipline, confidence, and strength in youth.",
    },
  ];

  return (
    <>
      {/* SEO Head Section */}
      <Head>
        <title>
          Arya Samaj Seawoods Activities | Satsang, Yoga, Ayurveda & Cultural Programs
        </title>
        <meta
          name="description"
          content="Explore Arya Samaj Seawoods community activities including Vaidik satsangs, yoga classes, Ayurvedic consultations, music, dance, and cultural programs."
        />
        <meta
          name="keywords"
          content="Arya Samaj Seawoods, Vaidik satsang, yoga classes, Ayurveda consultation, cultural programs, community activities"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: activities.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: a.title,
                description: a.description,
              })),
            }),
          }}
        />
      </Head>

      <section
        id="activities"
        className="py-16 px-6 bg-gradient-to-b from-orange-50 to-yellow-100 text-gray-900 relative"
        aria-labelledby="activities-heading"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2
            id="activities-heading"
            className="text-4xl font-bold font-merriweather text-orange-700"
          >
            Arya Samaj Seawoods — Community Activities & Cultural Programs
          </h2>
          <p className="mt-3 text-lg text-gray-700 font-poppins">
            Arya Samaj Seawoods organizes{" "}
            <strong>spiritual, cultural, and health-focused activities</strong>{" "}
            for all age groups — promoting Vaidik values, physical well-being,
            and community unity at charitable rates.
          </p>
        </div>

        {/* Scroll buttons */}
        <div className="relative mt-10 max-w-7xl mx-auto px-2">
          {/* Left Button */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll left through activities"
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
                <motion.article
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-lg shadow-lg text-center w-[250px] flex-shrink-0"
                >
                  <span role="img" aria-label={activity.title}>
                    {activity.icon}
                  </span>
                  <h3 className="mt-4 text-xl font-bold font-merriweather">
                    {activity.title} — Arya Samaj Seawoods
                  </h3>
                  <p className="text-gray-700 text-sm mt-2">
                    {activity.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right through activities"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800/60 text-white rounded-full shadow hover:bg-gray-900"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </section>
    </>
  );
}
