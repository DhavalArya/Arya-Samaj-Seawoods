"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import Script from "next/script";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MembershipModal from "./components/MembershipModal";
import Footer from "./components/Footer";
import DonationPopup from "./components/DonationPopup";
// import AumChant from "./components/AumChant"; // mount on demand
import DarkModeToggle from "./components/DarkModeToggle";
import dynamic from "next/dynamic";
import DeferInView from "./components/DeferInView";

// Light entry, heavy stuff deferred
const OpeningAnimation = dynamic(() => import("./components/OpeningAnimation"), { ssr: false });
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
  const [playChant, setPlayChant] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");
    if (saved === "enabled") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Gentle idle preload of just the first deferred chunk
  useEffect(() => {
    const preload = () => import("./components/DailyWisdom");

    if (typeof window === "undefined") return;

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(preload, { timeout: 2000 });
    } else {
      // fallback for browsers without requestIdleCallback
      setTimeout(preload, 1200);
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

        {/* Aum Chant mounted only on user intent */}
        {/* <button onClick={() => setPlayChant(true)} className="btn">Play Aum</button>
        {playChant && <AumChant />} */}

        <Header />
        <DarkModeToggle isDark={isDarkMode} toggle={() => setIsDarkMode((d) => !d)} />
        <Hero setShowForm={setShowForm} />
        <MembershipModal showForm={showForm} setShowForm={setShowForm} onClose={() => setShowForm(false)} />

        <main className="main-content">
          <DeferInView><Suspense fallback={<div className="loader">Loading...</div>}><DailyWisdom /></Suspense></DeferInView>
          <DeferInView><Suspense fallback={<div className="loader">Loading...</div>}><Slideshow /></Suspense></DeferInView>
          <DeferInView><Suspense fallback={<div className="loader">Loading...</div>}><Events /></Suspense></DeferInView>
          <DeferInView><Suspense fallback={<div className="loader">Loading...</div>}><Activities /></Suspense></DeferInView>
          <DeferInView><Suspense fallback={<div className="loader">Loading...</div>}><VaidikKnowledge /></Suspense></DeferInView>
          <DeferInView><Suspense fallback={<div className="loader">Loading...</div>}><WhyAryaSamaj /></Suspense></DeferInView>
          <DeferInView><Suspense fallback={<div className="loader">Loading...</div>}><MissionVision /></Suspense></DeferInView>
          <DeferInView><Suspense fallback={<div className="loader">Loading...</div>}><StoriesOfTransformation /></Suspense></DeferInView>
          <DeferInView><Testimonials /></DeferInView>
          <DeferInView><Committee /></DeferInView>
          <DeferInView><Suspense fallback={<div className="loader">Loading...</div>}><VaidikQuiz /></Suspense></DeferInView>
        </main>

        <Footer />
        <DonationPopup />
      </div>
    </>
  );
}
