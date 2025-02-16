"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none parallax-container">
      {/* 🌅 Background Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-orange-200 via-yellow-100 to-white mix-blend-multiply parallax-layer"
        style={{ y: y1 }}
      />

      {/* 🕉️ Floating Hindu Motifs */}
      <motion.img
        src="/images/vedic-pattern1.jpg"
        alt="Vedic Motif 1"
        className="absolute top-10 left-10 w-40 opacity-25 parallax-layer"
        style={{ y: y1 }}
      />
      <motion.img
        src="/images/vedic-pattern2.jpg"
        alt="Vedic Motif 2"
        className="absolute top-1/2 right-10 w-44 opacity-20 parallax-layer"
        style={{ y: y2 }}
      />
      <motion.img
        src="/images/vedic-pattern3.jpg"
        alt="Vedic Motif 3"
        className="absolute bottom-10 left-1/3 w-36 opacity-25 parallax-layer"
        style={{ y: y3 }}
      />
    </div>
  );
}
