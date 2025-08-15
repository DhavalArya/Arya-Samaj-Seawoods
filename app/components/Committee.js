"use client";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Head from "next/head";

const committeeMembers = [
  { name: "Shri Tulsi Ram Bangia", position: "Founder", image: "/images/TRBangia.jpg" },
  { name: "Lala Haridas Agrawal", position: "Founder", image: "/images/LalaHaridas.jpg" },
  { name: "Shri Sanjeev Agrawal", position: "President", image: "/images/Sanjeev.jpg" },
  { name: "Shri Brahmdutt Khullar", position: "Vice President", image: "/images/Brahmdutt.jpg" },
  { name: "Shri Mahendra Arya", position: "Vice President", image: "/images/Mahendra.jpg" },
  { name: "Shri Swadesh Karmakar", position: "Secretary", image: "/images/Swadesh.jpg" },
  { name: "Shri Dhaval Arya", position: "Secretary", image: "/images/Dhaval.jpg" },
  { name: "Shri Chandrabali Singh", position: "Treasurer", image: "/images/member6.jpg" },
  { name: "Shri Vijay Gupta", position: "Treasurer", image: "/images/member7.jpg" },
];

export default function Committee() {
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

  const total = committeeMembers.length;
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

  // Auto-play with pause on hover
  const AUTO = 2200;
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(nextSlide, AUTO);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [nextSlide]);
  const pause = () => timerRef.current && clearInterval(timerRef.current);
  const resume = () => {
    if (!timerRef.current) timerRef.current = setInterval(nextSlide, AUTO);
  };

  const cardBasis = `${100 / cols}%`;

  return (
    <>
      {/* SEO Meta + Structured Data */}
      <Head>
        <meta
          name="description"
          content="Meet the dedicated committee members of Arya Samaj Seawoods — visionaries, leaders, and volunteers serving the community."
        />
        <meta
          name="keywords"
          content="Arya Samaj Seawoods committee, Arya Samaj leaders, Arya Samaj members, Arya Samaj organization"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arya Samaj Seawoods",
              member: committeeMembers.map((m) => ({
                "@type": "Person",
                name: m.name,
                jobTitle: m.position,
                image: `https://yourdomain.com${m.image}`,
              })),
            }),
          }}
        />
      </Head>

      <motion.section
        ref={sectionRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="bg-[#FDE5C7] py-10 px-6 rounded-3xl shadow-lg w-full max-w-5xl mx-auto text-center"
        id="committee"
        aria-label="Committee Members Carousel"
      >
        <h2 className="text-4xl font-bold text-[#8C4A08] mb-6 flex items-center justify-center">
          👥 Arya Samaj Seawoods Committee Members
        </h2>

        <div
          className="relative flex items-center justify-center overflow-hidden w-full"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {/* Left Button */}
          <button
            aria-label="Previous Committee Member Slide"
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
              {committeeMembers.map((m, i) => (
                <div key={`${m.name}-${i}`} style={{ flex: `0 0 ${cardBasis}` }} className="px-3">
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-orange-300 h-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={m.image}
                      alt={`${m.name} - ${m.position}`}
                      width={120}
                      height={120}
                      className="rounded-full mb-4 border-4 border-gray-400"
                      loading="lazy"
                    />
                    <h3 className="text-xl font-bold text-gray-800">{m.name}</h3>
                    <p className="text-md text-gray-600">{m.position}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            aria-label="Next Committee Member Slide"
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
