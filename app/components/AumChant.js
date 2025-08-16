"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

export default function AumChant() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Load state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("aum-playing") === "true";
    setIsPlaying(savedState);

    if (savedState && audioRef.current) {
      audioRef.current.play().catch(err => {});
    }

    const handleInteraction = () => {
      if (savedState && !audioRef.current?.paused) return;
      if (savedState) {
        audioRef.current.play().catch((error) => {
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
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
      });
    }

    setIsPlaying(!isPlaying);
    localStorage.setItem("aum-playing", (!isPlaying).toString());
  };

  return (
    <>
      {/* SEO + Structured Data */}
      <Head>
        <meta
          name="description"
          content="Listen to continuous Aum Chant from Arya Samaj Seawoods — a meditative sound for inner peace and spiritual awareness."
        />
        <meta
          name="keywords"
          content="Aum chant, Om mantra, meditation audio, Arya Samaj Seawoods, spiritual music"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AudioObject",
              name: "Aum Chant Meditation Audio",
              description:
                "A soothing Aum chant loop from Arya Samaj Seawoods for meditation, relaxation, and spiritual awareness.",
              contentUrl: "https://yourdomain.com/audio/aum-chant.mp3",
              encodingFormat: "audio/mp3",
            }),
          }}
        />
      </Head>

      <div
        className="fixed bottom-5 left-5 z-50"
        role="region"
        aria-label="Aum Chant audio player"
      >
        <motion.button
          onClick={toggleAudio}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white shadow-lg ${
            isPlaying ? "bg-red-600" : "bg-green-600"
          }`}
          whileHover={{ scale: 1.1 }}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Stop Aum Chant" : "Play Aum Chant"}
        >
          <span aria-hidden="true">
            {isPlaying ? "🔇 Stop Aum" : "🔊 Play Aum"}
          </span>
        </motion.button>

        <audio
          ref={audioRef}
          loop
          preload="auto"
          aria-label="Continuous Aum Chant meditation audio"
        >
          <source src="/audio/aum-chant.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
}
