"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Dynamically import Lottie for client-side only
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LandingScene() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

  // Load animation
  useEffect(() => {
    import("../../public/animations/lotus-bloom.json")
      .then((data) => setAnimationData(data))
      .catch((err) => {});

    const timeout = setTimeout(() => setAnimationComplete(true), 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={ref} className="relative w-full min-h-screen">
      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none parallax-container"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationComplete ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-orange-200 via-yellow-100 to-white mix-blend-multiply parallax-layer"
          style={{ y: y1 }}
        />

        <motion.img
          src="/images/vedic-pattern1.jpg"
          alt="Traditional Vaidik motif 1"
          className="absolute top-10 left-10 w-40 opacity-25 parallax-layer"
          style={{ y: y1 }}
          loading="lazy"
          decoding="async"
        />
        <motion.img
          src="/images/vedic-pattern2.jpg"
          alt="Traditional Vaidik motif 2"
          className="absolute top-1/2 right-10 w-44 opacity-20 parallax-layer"
          style={{ y: y2 }}
          loading="lazy"
          decoding="async"
        />
        <motion.img
          src="/images/vedic-pattern3.jpg"
          alt="Traditional Vaidik motif 3"
          className="absolute bottom-10 left-1/3 w-36 opacity-25 parallax-layer"
          style={{ y: y3 }}
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {/* Opening Animation Overlay */}
      <AnimatePresence>
        {!animationComplete && animationData && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Lottie animationData={animationData.default} loop={false} style={{ width: 300, height: 300 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
