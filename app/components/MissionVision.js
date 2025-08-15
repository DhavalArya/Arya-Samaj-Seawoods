"use client";
import { motion } from "framer-motion";
import {
  FaBook,
  FaLeaf,
  FaHandHoldingHeart,
  FaPrayingHands,
} from "react-icons/fa";

const missionItems = [
  {
    icon: <FaPrayingHands className="text-orange-600 text-5xl mx-auto animate-pulse" />,
    title: "Spiritual Upliftment",
    description:
      "Spreading Vaidik wisdom through Satsangs, Yajnas, and discourses for a righteous life.",
    animation: "pulse",
  },
  {
    icon: <FaBook className="text-orange-600 text-5xl mx-auto animate-bounce" />,
    title: "Education for All",
    description:
      "Providing quality education through Gurukuls, DAV Schools, and scholarships for underprivileged students.",
    animation: "bounce",
  },
  {
    icon: <FaHandHoldingHeart className="text-orange-600 text-5xl mx-auto animate-pulse" />,
    title: "Social Reforms",
    description:
      "Fighting social evils like casteism, dowry, and child marriage, and empowering women & youth.",
    animation: "pulse",
  },
  {
    icon: <FaLeaf className="text-orange-600 text-5xl mx-auto animate-bounce" />,
    title: "Environmental Efforts",
    description:
      "Organizing tree plantations after Havan, promoting eco-friendly lifestyle & sustainable living.",
    animation: "bounce",
  },
];

export default function MissionVision() {
  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
      className="py-16 px-6 bg-gradient-to-b from-orange-100 to-yellow-50 text-gray-900"
    >
      <div className="max-w-5xl mx-auto text-center">
          <h2
            id="mission-vision-heading"
            className="text-4xl font-bold font-merriweather text-orange-700"
          >
            &ldquo;Krinvanto Vishwam Aryam&rdquo;
          </h2>
          <p className="mt-2 text-lg font-noto-serif text-gray-800">
            &ldquo;Let us make the world noble.&rdquo;
          </p>

        <p className="mt-4 text-md text-gray-700 font-poppins">
          A <strong>true Arya</strong> is one who follows{" "}
          <strong>righteousness (Dharma), selfless service (Seva), and truth (Satya)</strong>.
          Arya Samaj envisions a world uplifted through{" "}
          <strong>spiritual wisdom, education, social reform, and environmental care</strong>.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {missionItems.map((item, index) => (
          <motion.article
            key={index}
            role="region"
            aria-label={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            {item.icon}
            <h3 className="mt-4 text-xl font-bold font-merriweather">
              {item.title}
            </h3>
            <p className="text-gray-700 text-sm mt-2">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
