"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    src: "/images/arya-samaj-logo.jpg",
    caption: "Arya Samaj - A Movement for Truth & Dharma",
  },
  {
    src: "/images/vaidik-aum.png",
    caption: "Vaidik Aum - The Eternal Sound of Creation",
  },
  {
    src: "/images/maharshi-dayanand.jpg",
    caption: "Maharshi Dayanand - The Reformer of Vedic Dharma",
  },
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden rounded-2xl shadow-2xl z-20">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800/60 text-white p-3 rounded-full z-30 hover:scale-110 transition-all"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Image Transition with Ken Burns Effect */}
      <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex} // Use currentIndex as key
            className="absolute inset-0 w-full h-full z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10 }}
            >
              <Image
                src={slides[currentIndex].src}
                alt="Slideshow Image"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-20"
                width={1920}
                height={1080}
                priority
                unoptimized
              />
            </motion.div>

            {/* Caption Overlay */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xl font-semibold px-6 py-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {slides[currentIndex].caption}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-800/60 text-white p-3 rounded-full z-30 hover:scale-110 transition-all"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 w-full flex justify-center space-x-4 z-30">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer w-4 h-4 rounded-full transition-all duration-500 ${
              currentIndex === index
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 scale-125 shadow-lg"
                : "bg-gray-400 opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
