"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import Script from "next/script";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MembershipModal from "./components/MembershipModal";
import Footer from "./components/Footer";
import DonationPopup from "./components/DonationPopup";
import AumChant from "./components/AumChant";
import DarkModeToggle from "./components/DarkModeToggle";
import OpeningAnimation from "./components/OpeningAnimation";
import dynamic from "next/dynamic";

// Heavy sections – dynamically imported
const DailyWisdom = lazy(() => import("./components/DailyWisdom"));
const Slideshow = lazy(() => import("./components/Slideshow"));
const Events = lazy(() => import("./components/Events"));
const Activities = lazy(() => import("./components/Activities"));
const VaidikKnowledge = lazy(() => import("./components/VedicKnowledge"));
const WhyAryaSamaj = lazy(() => import("./components/WhyAryaSamaj"));
const MissionVision = lazy(() => import("./components/MissionVision"));
const StoriesOfTransformation = lazy(() => import("./components/StoriesOfTransformation"));
const Testimonials = dynamic(() => import("./components/Testimonials"), { ssr: false });
const Committee = dynamic(() => import("./components/Committee"), { ssr: false });
const VaidikQuiz = lazy(() => import("./components/VedicQuiz"));

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");
    if (saved === "enabled") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Preload heavy sections after idle
  useEffect(() => {
    if (typeof window !== "undefined") {
      requestIdleCallback(() => {
        import("./components/DailyWisdom");
        import("./components/Slideshow");
        import("./components/Events");
        import("./components/Activities");
        import("./components/VedicKnowledge");
      });
    }
  }, []);

  return (
    <>
      <Script src="https://analytics.example.com/script.js" strategy="lazyOnload" />

      {!animationFinished && (
        <OpeningAnimation onComplete={() => setAnimationFinished(true)} />
      )}

      <div className={`${isDarkMode ? "dark" : ""} relative min-h-screen overflow-hidden`}>
        <div className="layered-background" aria-hidden="true" />

        <AumChant />
        <Header />
        <DarkModeToggle isDark={isDarkMode} toggle={() => setIsDarkMode((d) => !d)} />
        <Hero setShowForm={setShowForm} />
        <MembershipModal showForm={showForm} setShowForm={setShowForm} onClose={() => setShowForm(false)} />

        <main className="main-content">
          <Suspense fallback={<div className="loader">Loading...</div>}><DailyWisdom /></Suspense>
          <Suspense fallback={<div className="loader">Loading...</div>}><Slideshow /></Suspense>
          <Suspense fallback={<div className="loader">Loading...</div>}><Events /></Suspense>
          <Suspense fallback={<div className="loader">Loading...</div>}><Activities /></Suspense>
          <Suspense fallback={<div className="loader">Loading...</div>}><VaidikKnowledge /></Suspense>
          <Suspense fallback={<div className="loader">Loading...</div>}><WhyAryaSamaj /></Suspense>
          <Suspense fallback={<div className="loader">Loading...</div>}><MissionVision /></Suspense>
          <Suspense fallback={<div className="loader">Loading...</div>}><StoriesOfTransformation /></Suspense>
          <Testimonials />
          <Committee />
          <Suspense fallback={<div className="loader">Loading...</div>}><VaidikQuiz /></Suspense>
        </main>

        <Footer />
        <DonationPopup />
      </div>
    </>
  );
}
