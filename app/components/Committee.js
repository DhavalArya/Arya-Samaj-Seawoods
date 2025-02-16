"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const committeeMembers = [
  { name: "Rajesh Sharma", position: "President", image: "/images/member1.jpg" },
  { name: "Sunita Verma", position: "Secretary", image: "/images/member2.jpg" },
  { name: "Amit Patel", position: "Treasurer", image: "/images/member3.jpg" },
  { name: "Neha Kapoor", position: "Member", image: "/images/member4.jpg" },
  { name: "Ravi Yadav", position: "Member", image: "/images/member5.jpg" },
];

export default function Committee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });

  const visibleCount = 3; // Always show 3 members at a time
  const totalMembers = committeeMembers.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalMembers);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalMembers) % totalMembers);
  };

  // Auto-scroll effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="bg-[#FDE5C7] py-10 px-6 rounded-3xl shadow-lg w-full max-w-5xl mx-auto text-center"
    >
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-[#8C4A08] mb-6 flex items-center justify-center">
        👥 Committee Members
      </h2>

      {/* Carousel Container */}
      <div className="relative flex items-center justify-center overflow-hidden w-full">
        {/* Left Arrow */}
        <button
          className="absolute left-2 z-10 p-3 bg-gray-800/60 text-white rounded-full shadow-md hover:bg-gray-900 transition-all"
          onClick={prevSlide}
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Members Carousel */}
        <div className="overflow-hidden w-full flex justify-center">
          <div
            className="flex space-x-6 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / totalMembers}%)`,
              width: `${(totalMembers / visibleCount) * 100}%`,
            }}
          >
            {committeeMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center min-w-[30%] border border-orange-300"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mb-4 border-4 border-gray-400"
                />
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-md text-gray-600">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-2 z-10 p-3 bg-gray-800/60 text-white rounded-full shadow-md hover:bg-gray-900 transition-all"
          onClick={nextSlide}
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </motion.section>
  );
}
