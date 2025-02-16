"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function AumChant() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (!isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Autoplay prevented:", error);
        });
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Playback prevented:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <motion.button
        onClick={toggleAudio}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white shadow-lg ${
          isPlaying ? "bg-red-600" : "bg-green-600"
        }`}
        whileHover={{ scale: 1.1 }}
      >
        <span>{isPlaying ? "🔇 Stop Aum" : "🔊 Play Aum"}</span>
      </motion.button>
      <audio ref={audioRef} loop>
        <source src="/audio/aum-chant.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
