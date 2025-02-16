"use client"; // ✅ Ensures this runs only on the client side

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ✅ Dynamically import Lottie to prevent SSR errors
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function OpeningAnimation({ onComplete }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // ✅ Correct import path for Next.js (move animations to /public)
    import("../../public/animations/lotus-bloom.json")
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Failed to load animation:", error));

    // ✅ Auto-hide animation after 4 seconds
    const timeout = setTimeout(() => {
      setAnimationComplete(true);
      if (onComplete) onComplete();
    }, 4000);

    return () => clearTimeout(timeout); // ✅ Cleanup timeout on unmount
  }, [onComplete]); // ✅ Fix: Include `onComplete` as a dependency

  if (animationComplete) return null; // ✅ Hide animation when done

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      {animationData && (
        <Lottie
          animationData={animationData.default}
          loop={false}
          style={{ width: 300, height: 300 }} // ✅ Adjust size of Lotus animation
        />
      )}
    </div>
  );
}
