"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Slideshow() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch slide data from public/slides.json
  useEffect(() => {
    let isMounted = true;
    const fetchSlides = async () => {
      try {
        const res = await fetch("/slides.json");
        const data = await res.json();
        if (isMounted) setSlides(data);
      } catch (err) {
      }
    };

    fetchSlides();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentIndex(index);

  if (slides.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex justify-center items-center h-[60vh]"
      >
        <p className="text-xl font-semibold text-gray-700">Loading slides...</p>
      </div>
    );
  }

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Image Slideshow"
      className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden rounded-2xl shadow-2xl z-20"
    >
      {/* Previous Slide Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800/60 text-white p-3 rounded-full z-30 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Slides */}
      <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={slide.src}
              alt={slide.alt || slide.caption || `Slide ${index + 1}`}
              width={slide.width}
              height={slide.height}
              className="w-full h-full object-cover rounded-2xl"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="empty"
            />

            {/* Slide Caption */}
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

      {/* Next Slide Button */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-800/60 text-white p-3 rounded-full z-30 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white"
      >
        <FaChevronRight size={24} />
      </button>

      {/* Navigation Dots */}
      <div
        className="absolute bottom-5 w-full flex justify-center space-x-4 z-30"
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={currentIndex === index}
            role="tab"
            className={`cursor-pointer w-4 h-4 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 ${
              currentIndex === index
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 scale-125 shadow-lg ring-white"
                : "bg-gray-400 opacity-60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
