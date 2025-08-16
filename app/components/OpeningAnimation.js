"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function OpeningAnimation({ onComplete }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const containerRef = useRef(null);

  // Lazy-load animation only when container is in view
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    let timeoutId;

    if (isInView && !animationData) {
      // Preload JSON animation for better SEO & performance
      import("../../public/animations/lotus-bloom.json")
        .then((data) => setAnimationData(data))
        .catch((err) => {});
    }

    // Auto-hide animation after 4 seconds
    timeoutId = setTimeout(() => {
      setAnimationComplete(true);
      if (onComplete) onComplete();
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [isInView, animationData, onComplete]);

  return (
    <AnimatePresence>
      {!animationComplete && (
        <motion.div
          ref={containerRef}
          key="opening-animation"
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          aria-hidden="true"
        >
          {animationData ? (
            <Lottie
              animationData={animationData.default || animationData}
              loop={false}
              style={{ width: 300, height: 300 }}
              aria-label="Lotus bloom animation"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="sr-only">Loading opening animation...</span>
              <motion.div 
                className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mt-2"
                aria-hidden="true"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
