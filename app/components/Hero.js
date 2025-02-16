"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [quotes, setQuotes] = useState([
    "ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥",
    "The purpose of Arya Samaj is to make the world noble.",
    "Truth alone triumphs - सत्यमेव जयते",
  ]);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <section className="relative w-full text-center pt-[140px] pb-16 bg-vedic-pattern text-white rounded-b-[80px] shadow-lg mt-[120px]">
      {/* Subtle Background Animation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vedic-bg.webp"
          alt="Vedic Background"
          layout="fill"
          objectFit="cover"
          className="opacity-40 transition-opacity duration-1000"
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="text-5xl font-bold font-merriweather drop-shadow-lg">
          Welcome to Arya Samaj - Seawoods
        </h1>
        <p className="mt-3 text-xl font-noto-serif text-[#5b2c06]">"सत्यं वद। धर्मं चर।"</p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 transition rounded-full text-white font-semibold shadow-lg"
        >
          Join the Movement
        </motion.button>

        {/* Rotating Quotes */}
        <AnimatePresence mode="wait">
        <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1 }}
            className="mt-6 text-xl font-medium italic text-[#a06a40]"
            >
            {quotes[currentQuote]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
