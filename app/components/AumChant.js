"use client";
import { useEffect, useRef, useState } from "react";
// keep framer-motion if you like, but avoid on mobile
import { motion } from "framer-motion";

export default function AumChant({ onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // restore preference, but DO NOT autoplay until user taps the button
  useEffect(() => {
    const saved = localStorage.getItem("aum-playing") === "true";
    if (saved) setIsPlaying(true); // reflects the intent in UI
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
      localStorage.setItem("aum-playing", "false");
      onClose?.();
    } else {
      try {
        // first play will trigger the network fetch since preload="none"
        await a.play();
        setIsPlaying(true);
        localStorage.setItem("aum-playing", "true");
      } catch {
        // some browsers may require another tap if blocked
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-lg">
      <audio
        ref={audioRef}
        src="/audio/aum-chant.mp3"  // place under /public/audio
        loop
        preload="none"             // key: don't download until play()
        playsInline
        aria-label="Continuous Aum Chant meditation audio"
      />
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        className={`px-3 py-1 rounded-full text-white ${isPlaying ? "bg-red-600" : "bg-green-600"}`}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Stop Aum Chant" : "Play Aum Chant"}
      >
        {isPlaying ? "✕ Stop Aum" : "▶︎ Play Aum"}
      </motion.button>
    </div>
  );
}
