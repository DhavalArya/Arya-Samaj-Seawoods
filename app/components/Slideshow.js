"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Slideshow() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔄 Fetch slides.json dynamically on mount
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/slides.json");
        const data = await res.json();
        setSlides(data);
      } catch (err) {
        console.error("Failed to load slides:", err);
      }
    };

    fetchSlides();
  }, []);

  // ⏰ Auto slide change every 5s
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (slides.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold text-gray-700">Loading slides...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden rounded-2xl shadow-2xl z-20">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800/60 text-white p-3 rounded-full z-30 hover:scale-110 transition-all"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Slides Preloaded with Opacity Transitions */}
      <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.caption}
              width={slide.width}
              height={slide.height}
              className="w-full h-full object-cover rounded-2xl"
              placeholder="empty"
              // blurDataURL="/images/placeholder.jpg" // create a tiny placeholder in /public/images
            />

            {/* Caption Overlay */}
            {index === currentIndex && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xl font-semibold px-6 py-3 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {slide.caption}
              </motion.div>
            )}
          </motion.div>
        ))}
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
