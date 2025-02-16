"use client";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Ramila", role: "Nurse", feedback: "Arya Samaj supported my education when I had no hope." },
  { name: "Amit", role: "Social Worker", feedback: "Arya Samaj's teachings helped me bring real change." },
  { name: "Sita", role: "Teacher", feedback: "I learned the importance of truth and righteousness." },
];

export default function Testimonials() {
  return (
    <section className="bg-yellow-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-orange-700 mb-4">🌞 Testimonials & Success Stories</h2>
      <div className="overflow-x-auto flex space-x-6 snap-x scroll-smooth">
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
