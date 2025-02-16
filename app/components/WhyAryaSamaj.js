"use client";
import { motion } from "framer-motion";
import { FaBookOpen, FaGlobe, FaUsers, FaLightbulb } from "react-icons/fa";

export default function WhyAryaSamaj() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-yellow-100 to-orange-50 text-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-merriweather text-orange-700">Why Arya Samaj?</h2>
        <p className="mt-3 text-lg text-gray-700 font-poppins">
          Arya Samaj is not just a spiritual movement but a revolution of truth, knowledge, and social reform.
        </p>
      </div>

      {/* Key Highlights Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        
        {/* Scientific Hinduism */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <FaLightbulb className="text-orange-600 text-4xl mx-auto"/>
          <h3 className="mt-4 text-xl font-bold font-merriweather">Rational & Scientific</h3>
          <p className="text-gray-700 text-sm mt-2">
            Arya Samaj promotes Vedic knowledge based on <strong>science, logic, and truth</strong>, rejecting blind faith.
          </p>
        </motion.div>

        {/* Education & Social Reform */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <FaBookOpen className="text-orange-600 text-4xl mx-auto"/>
          <h3 className="mt-4 text-xl font-bold font-merriweather">Education & Reform</h3>
          <p className="text-gray-700 text-sm mt-2">
            Established <strong>Gurukuls, DAV Schools, and universities</strong>, empowering youth with <strong>Vedic and modern knowledge</strong>.
          </p>
        </motion.div>

        {/* Women Empowerment */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <FaUsers className="text-orange-600 text-4xl mx-auto"/>
          <h3 className="mt-4 text-xl font-bold font-merriweather">Women Empowerment</h3>
          <p className="text-gray-700 text-sm mt-2">
            Advocated <strong>equal rights</strong> for women, supported <strong>widow remarriage</strong>, and opposed <strong>dowry and caste discrimination</strong>.
          </p>
        </motion.div>

        {/* Famous Personalities */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <FaGlobe className="text-orange-600 text-4xl mx-auto"/>
          <h3 className="mt-4 text-xl font-bold font-merriweather">Inspiring Leaders</h3>
          <p className="text-gray-700 text-sm mt-2">
            Historical Icons: <strong>Lala Lajpat Rai, Bhagat Singh, Ram Prasad Bismil, Swami Shraddhanand</strong>.
          </p>
          <p className="text-gray-700 text-sm mt-2">
            Modern Arya Samajis: <strong>Mahashay Dharampal Gulati (MDH), Acharya Devvrat (Gujarat Governor), Rakesh Sharma (Astronaut)</strong>.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
