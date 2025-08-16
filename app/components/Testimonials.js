"use client";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Head from "next/head";

const testimonials = [
  { name: "Draupadi Murmu", role: "President of India", feedback: "India has been blessed by the birth of brilliant personalities like Maharshi Dayānand Saraswatī." },
  { name: "Narendra Modi", role: "Prime Minister of India", feedback: "Maharshi Dayānand was not just a Vaidik sage but also a national sage. Swami Dayānand called upon us to go 'Back to Vedas' in times when spiritual heritage was fading." },
  { name: "Amit Shah", role: "Home Minister of India", feedback: "Maharshi Dayānand 'awakened the soul of the nation by establishing the Arya Samāj'. Dayānand Saraswatī 'fearlessly propagated swadharm, swabhasha and swaraj when such discourse was prohibited'." },
  { name: "Rajnath Singh", role: "Defence Minister of India", feedback: "Swami Dayānand's vision for blending ancient knowledge with modern needs continues to guide us in the 21st century." },
  { name: "Mohan Bhagwat", role: "RSS Chief", feedback: "We will make everybody 'Arya', all sampradayas need to be purified." },
  { name: "Rajat Sharma", role: "Journalist", feedback: "Societal superstitions and evils have been reduced by Arya Samāj, which brought the Vedas back into nation-building." },
  { name: "Piyush Goyal", role: "Minister of Commerce and Industry", feedback: "The Arya Samāj has contributed greatly to India's development through women empowerment, the struggle to end Sati Pratha and untouchability, equality in society." },
  { name: "Prof. Biman Prasad", role: "Deputy Prime Minister of Fiji", feedback: "Arya Samaj's legacy of moral values and community service continues to inspire us all. Though small in number, your impact, your reach, your influence has been great. We are the beneficiaries of your hard work." },
  { name: "Dharam Gokhool", role: "President of Mauritius", feedback: "Swami ji did not create a new religion, but rather a movement (ek andolan) that was started to respond to the evils of Hindu society." },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { triggerOnce: true });

  // Responsive columns
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const setByWidth = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    setByWidth();
    window.addEventListener("resize", setByWidth);
    return () => window.removeEventListener("resize", setByWidth);
  }, []);

  const total = testimonials.length;
  const maxIndex = useMemo(() => Math.max(0, total - cols), [total, cols]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure valid index
  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay with pause on hover
  const AUTO = 4000;
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(nextSlide, AUTO);
    return () => clearInterval(timerRef.current);
  }, [nextSlide]);
  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    timerRef.current = setInterval(nextSlide, AUTO);
  };

  const cardBasis = `${100 / cols}%`;

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Hear what world leaders, thinkers, and visionaries have said about Maharshi Dayanand Saraswati and the Arya Samaj movement."
        />
        <meta
          name="keywords"
          content="Arya Samaj testimonials, Maharshi Dayanand quotes, Arya Samaj leaders, Arya Samaj praise"
        />
      </Head>

      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="bg-yellow-100 py-10 px-6 rounded-3xl shadow-lg w-full max-w-6xl mx-auto text-center"
        id="testimonials"
        aria-label="Testimonials Carousel"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          🕉️ Revered Voices on Maharshi Dayanand & Arya Samaj
        </h2>

        <div
          className="relative flex items-center justify-center overflow-hidden w-full"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {/* Left Button */}
          <button
            aria-label="Previous Testimonial Slide"
            className="absolute left-2 z-10 p-3 bg-gray-800/60 text-white rounded-full shadow-md hover:bg-gray-900 transition-all"
            onClick={prevSlide}
          >
            <FaChevronLeft size={22} />
          </button>

          {/* Viewport */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-linear"
              style={{
                transform: `translateX(-${currentIndex * (100 / cols)}%)`,
                width: "100%",
              }}
            >
              {testimonials.map((t, i) => (
                <div key={`${t.name}-${i}`} style={{ flex: `0 0 ${cardBasis}` }} className="px-3">
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start text-left border border-gray-200 h-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-gray-700 text-sm md:text-base mb-4">"{t.feedback}"</p>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{t.name}</h3>
                    <p className="text-sm text-gray-600">{t.role}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            aria-label="Next Testimonial Slide"
            className="absolute right-2 z-10 p-3 bg-gray-800/60 text-white rounded-full shadow-md hover:bg-gray-900 transition-all"
            onClick={nextSlide}
          >
            <FaChevronRight size={22} />
          </button>
        </div>
      </motion.section>
    </>
  );
}
