"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <section className="relative bg-yellow-100 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-700 mb-4 text-center">
        🕉️ Revered Voices on Maharshi Dayanand & Arya Samaj
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800/60 text-white rounded-full hover:bg-gray-900 transition-all"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800/60 text-white rounded-full hover:bg-gray-900 transition-all"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Scrollable Testimonials */}
      <div
        ref={scrollRef}
        className="overflow-x-auto flex space-x-6 snap-x scroll-smooth scrollbar-hide px-4 scroll-container"
        style={{ scrollbarWidth: "none" }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="min-w-[300px] bg-white p-4 rounded-lg shadow-md snap-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-orange-600">{testimonial.name}</h3>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
            <p className="text-gray-700 mt-2">{testimonial.feedback}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
