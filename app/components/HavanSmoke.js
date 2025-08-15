"use client";
import { motion } from "framer-motion";

export default function HavanSmoke() {
  const smokes = [
    {
      className:
        "absolute left-5 bottom-0 w-32 h-32 bg-gradient-to-t from-gray-500 via-gray-400 to-transparent rounded-full opacity-25 blur-xl",
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 0.4, y: -50 },
      duration: 5
    },
    {
      className:
        "absolute right-10 bottom-0 w-36 h-36 bg-gradient-to-t from-gray-500 via-gray-400 to-transparent rounded-full opacity-30 blur-xl",
      initial: { opacity: 0, y: 120 },
      animate: { opacity: 0.5, y: -70 },
      duration: 6
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {smokes.map((smoke, i) => (
        <motion.div
          key={i}
          initial={smoke.initial}
          animate={smoke.animate}
          transition={{
            duration: smoke.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={smoke.className}
        />
      ))}
    </div>
  );
}
