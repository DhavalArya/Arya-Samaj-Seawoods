"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FloatingSection({ children, align = "left" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: false, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: align === "left" ? "-100%" : "100%" }}
      animate={isInView ? { opacity: 1, x: "0%" } : { opacity: 0, x: align === "left" ? "-100%" : "100%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full"
    >
      {children}
    </motion.div>
  );
}
