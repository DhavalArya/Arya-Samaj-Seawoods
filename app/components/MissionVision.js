"use client";
import { motion } from "framer-motion";
import { FaBook, FaLeaf, FaHandHoldingHeart, FaPrayingHands } from "react-icons/fa";

export default function MissionVision() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-orange-100 to-yellow-50 text-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        {/* Vaidik Motto */}
        <h2 className="text-4xl font-bold font-merriweather text-orange-700">
          &ldquo;Krinvanto Vishwam Aryam&rdquo;
        </h2>
        <p className="mt-2 text-lg font-noto-serif text-gray-800">
          &ldquo;Let us make the world noble.&rdquo;
        </p>

        {/* Brief Explanation of True Arya */}
        <p className="mt-4 text-md text-gray-700 font-poppins">
          A <strong>true Arya</strong> is one who follows <strong>righteousness (Dharma), selfless service (Seva), and truth (Satya)</strong>.
          Arya Samaj envisions a world uplifted through <strong>spiritual wisdom, education, social reform, and environmental care</strong>.
        </p>
      </div>

      {/* Mission Goals */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        
        {/* 1️⃣ Spiritual Upliftment */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <FaPrayingHands className="text-orange-600 text-5xl mx-auto animate-pulse"/>
          <h3 className="mt-4 text-xl font-bold font-merriweather">Spiritual Upliftment</h3>
          <p className="text-gray-700 text-sm mt-2">
            Spreading <strong>Vaidik wisdom</strong> through <strong>Satsangs, Yajnas, and discourses</strong> for a <strong>righteous life</strong>.
          </p>
        </motion.div>

        {/* 2️⃣ Educational Initiatives */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <FaBook className="text-orange-600 text-5xl mx-auto animate-bounce"/>
          <h3 className="mt-4 text-xl font-bold font-merriweather">Education for All</h3>
          <p className="text-gray-700 text-sm mt-2">
            Providing <strong>quality education</strong> through <strong>Gurukuls, DAV Schools, and scholarships</strong> for underprivileged students.
          </p>
        </motion.div>

        {/* 3️⃣ Social Reforms */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <FaHandHoldingHeart className="text-orange-600 text-5xl mx-auto animate-pulse"/>
          <h3 className="mt-4 text-xl font-bold font-merriweather">Social Reforms</h3>
          <p className="text-gray-700 text-sm mt-2">
            Fighting <strong>social evils</strong> like <strong>casteism, dowry, and child marriage</strong>, and empowering <strong>women & youth</strong>.
          </p>
        </motion.div>

        {/* 4️⃣ Environmental Efforts */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <FaLeaf className="text-orange-600 text-5xl mx-auto animate-bounce"/>
          <h3 className="mt-4 text-xl font-bold font-merriweather">Environmental Efforts</h3>
          <p className="text-gray-700 text-sm mt-2">
            Organizing <strong>tree plantations after Havan</strong>, promoting <strong>eco-friendly lifestyle & sustainable living</strong>.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
