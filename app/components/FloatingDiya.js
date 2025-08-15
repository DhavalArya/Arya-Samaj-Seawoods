"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FloatingDiya() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="absolute bottom-10 right-10 opacity-60"
      aria-hidden="true"
    >
      <Image
        src="/images/diya.png"
        alt="Decorative glowing Diya lamp"
        width={48}
        height={48}
        priority={false}
        className="w-12 h-12"
      />
    </motion.div>
  );
}
