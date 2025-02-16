"use client";
import { motion } from "framer-motion";

export default function HavanSmoke() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Left Smoke */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.4, y: -50 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-5 bottom-0 w-32 h-32 bg-gradient-to-t from-gray-500 via-gray-400 to-transparent rounded-full opacity-20 blur-xl"
      />
      {/* Right Smoke */}
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 0.5, y: -70 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 bottom-0 w-36 h-36 bg-gradient-to-t from-gray-500 via-gray-400 to-transparent rounded-full opacity-25 blur-xl"
      />
    </div>
  );
}
