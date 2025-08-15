"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaGlobe, FaUsers, FaLightbulb } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const HighlightCard = memo(function HighlightCard({ icon: Icon, title, children }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-orange-400"
      whileHover={{ scale: 1.05 }}
      tabIndex={0}
      role="region"
      aria-label={title}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Icon
        className="text-orange-600 text-4xl mx-auto"
        aria-hidden="true"
        focusable="false"
      />
      <h3 className="mt-4 text-xl font-bold font-merriweather">{title}</h3>
      <div className="text-gray-700 text-sm mt-2">{children}</div>
    </motion.div>
  );
});

export default function WhyAryaSamaj() {
  return (
    <section
      className="py-16 px-6 bg-gradient-to-b from-yellow-100 to-orange-50 text-gray-900"
      aria-labelledby="why-arya-samaj-title"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2
          id="why-arya-samaj-title"
          className="text-4xl font-bold font-merriweather text-orange-700"
        >
          Why Arya Samaj?
        </h2>
        <p className="mt-3 text-lg text-gray-700 font-poppins max-w-3xl mx-auto">
          Arya Samaj is not just a spiritual movement but a revolution of truth,
          knowledge, and social reform.
        </p>
      </div>

      {/* Cards grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <HighlightCard icon={FaLightbulb} title="Rational & Scientific">
          Arya Samaj promotes Vaidik knowledge based on{" "}
          <strong>science, logic, and truth</strong>, rejecting blind faith.
        </HighlightCard>

        <HighlightCard icon={FaBookOpen} title="Education & Reform">
          Established{" "}
          <strong>Gurukuls, DAV Schools, and universities</strong>, empowering
          youth with <strong>Vaidik and modern knowledge</strong>.
        </HighlightCard>

        <HighlightCard icon={FaUsers} title="Women Empowerment">
          Advocated <strong>equal rights</strong> for women, supported{" "}
          <strong>widow remarriage</strong>, and opposed{" "}
          <strong>dowry and caste discrimination</strong>.
        </HighlightCard>

        <HighlightCard icon={FaGlobe} title="Inspiring Leaders">
          <p>
            Historical Icons:{" "}
            <strong>Lala Lajpat Rai, Bhagat Singh, Ram Prasad Bismil, Swami
            Shraddhanand</strong>.
          </p>
          <p className="mt-2">
            Modern Arya Samajis:{" "}
            <strong>
              Mahashay Dharampal Gulati (MDH), Acharya Devvrat (Gujarat Governor),
              Rakesh Sharma (Astronaut)
            </strong>
            .
          </p>
        </HighlightCard>
      </div>
    </section>
  );
}
