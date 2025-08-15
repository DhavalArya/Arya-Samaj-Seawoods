"use client";

import { useState, useEffect, Suspense, lazy } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import MembershipModal from "./components/MembershipModal";
import Footer from "./components/Footer";
import DonationPopup from "./components/DonationPopup";
import AumChant from "./components/AumChant";
import DarkModeToggle from "./components/DarkModeToggle";
import OpeningAnimation from "./components/OpeningAnimation";
import Script from "next/script";

// Lazy-loaded Sections
const DailyWisdom = lazy(() => import("./components/DailyWisdom"));
const Slideshow = lazy(() => import("./components/Slideshow"));
const Events = lazy(() => import("./components/Events"));
const Activities = lazy(() => import("./components/Activities"));
const VaidikKnowledge = lazy(() => import("./components/VedicKnowledge"));
const WhyAryaSamaj = lazy(() => import("./components/WhyAryaSamaj"));
const MissionVision = lazy(() => import("./components/MissionVision"));
const StoriesOfTransformation = lazy(() => import("./components/StoriesOfTransformation"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Committee = lazy(() => import("./components/Committee"));
const VaidikQuiz = lazy(() => import("./components/VedicQuiz"));

export const metadata = {
  title: "Arya Samaj Seawoods",
  description: "Official site of Arya Samaj Seawoods — spiritual wisdom, social reform, education & community.",
  openGraph: {
    title: "Arya Samaj Seawoods",
    description: "Join us in spreading Vaidik wisdom, reform, and social upliftment.",
    url: "https://yourdomain.com/",
    siteName: "Arya Samaj Seawoods",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arya Samaj Seawoods",
    description: "Discover Vaidik knowledge, social reform, and community initiatives.",
  },
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Preserve dark mode via localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");
    if (saved === "enabled") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  return (
    <>
      <Script src="https://analytics.example.com/script.js" strategy="lazyOnload" />

      {!animationFinished ? (
        <OpeningAnimation onComplete={() => setAnimationFinished(true)} />
      ) : (
        <div className={`${isDarkMode ? "dark" : ""} relative min-h-screen overflow-hidden`}>
          <div className="layered-background" aria-hidden="true" />

          <AumChant />
          <Header />
          <DarkModeToggle isDark={isDarkMode} toggle={() => setIsDarkMode((d) => !d)} />
          <Hero setShowForm={setShowForm} />
          <MembershipModal show={showForm} onClose={() => setShowForm(false)} />

          <main className="main-content">
            <Suspense fallback={<div className="loader">Loading Wisdom...</div>}><DailyWisdom /></Suspense>
            <Suspense fallback={<div className="loader">Loading Visuals...</div>}><Slideshow /></Suspense>
            <Suspense fallback={<div className="loader">Loading Events...</div>}><Events /></Suspense>
            <Suspense fallback={<div className="loader">Loading Activities...</div>}><Activities /></Suspense>
            <Suspense fallback={<div className="loader">Loading Knowledge...</div>}><VaidikKnowledge /></Suspense>
            <Suspense fallback={<div className="loader">Loading Values...</div>}><WhyAryaSamaj /></Suspense>
            <Suspense fallback={<div className="loader">Loading Mission...</div>}><MissionVision /></Suspense>
            <Suspense fallback={<div className="loader">Loading Stories...</div>}><StoriesOfTransformation /></Suspense>
            <Suspense fallback={<div className="loader">Loading Testimonials...</div>}><Testimonials /></Suspense>
            <Suspense fallback={<div className="loader">Loading Committee...</div>}><Committee /></Suspense>
            <Suspense fallback={<div className="loader">Loading Quiz...</div>}><VaidikQuiz /></Suspense>
          </main>

          <Footer />
          <DonationPopup />
        </div>
      )}
    </>
  );
}
