"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * FloatingSection Component
 * 
 * @param {string} align - "left" or "right" (default: "left")
 * @param {string} ariaLabel - Optional label for accessibility
 * @param {number} duration - Animation duration in seconds (default: 0.8)
 * @param {string} offset - Intersection observer margin (default: "-50px 0px")
 */
export default function FloatingSection({
  children,
  align = "left",
  ariaLabel = "",
  duration = 0.8,
  offset = "-50px 0px",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, margin: offset });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: align === "left" ? "-100%" : "100%" }}
      animate={
        isInView
          ? { opacity: 1, x: "0%" }
          : { opacity: 0, x: align === "left" ? "-100%" : "100%" }
      }
      transition={{ duration, ease: "easeOut" }}
      className="relative w-full will-change-transform"
      role="region"
      aria-label={ariaLabel || undefined}
      aria-hidden={!ariaLabel ? "true" : undefined}
    >
      {children}
    </motion.div>
  );
}
