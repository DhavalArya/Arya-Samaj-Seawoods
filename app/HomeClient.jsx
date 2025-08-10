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

// 🚀 Lazy Load Sections for Performance
const DailyWisdom = lazy(() => import("./components/DailyWisdom"));
const Events = lazy(() => import("./components/Events"));
const Committee = lazy(() => import("./components/Committee"));
const VaidikKnowledge = lazy(() => import("./components/VedicKnowledge"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const WhyAryaSamaj = lazy(() => import("./components/WhyAryaSamaj"));
const MissionVision = lazy(() => import("./components/MissionVision"));
const StoriesOfTransformation = lazy(() => import("./components/StoriesOfTransformation"));
const VaidikQuiz = lazy(() => import("./components/VedicQuiz"));
const Slideshow = lazy(() => import("./components/Slideshow"));
const Activities = lazy(() => import("./components/Activities"));

export const metadata = {
  title: "Arya Samaj Seawoods",
  description: "Official site of Arya Samaj Seawoods",
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // ✅ Check Dark Mode Status from Local Storage
    const savedDarkMode = localStorage.getItem("dark-mode");
    if (savedDarkMode === "enabled") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  return (
    <>
      {/* Opening Animation */}
      {!animationFinished && <OpeningAnimation onComplete={() => setAnimationFinished(true)} />}

      {/* Main Content */}
      {animationFinished && (
        <div className={`${isDarkMode ? "dark" : ""} relative min-h-screen overflow-hidden`}>
          
          {/* Background Effects */}
          <div className="layered-background"></div>

          <AumChant />
          <Header />
          <DarkModeToggle />
          <Hero setShowForm={setShowForm} />
          <MembershipModal showForm={showForm} setShowForm={setShowForm} />

          <main className="main-content">
            <Suspense fallback={<div className="loader">Loading Wisdom...</div>}>
              <DailyWisdom />
            </Suspense>
            <Suspense fallback={<div className="loader">Loading Wisdom...</div>}>
              <Slideshow />
            </Suspense>
            <Suspense fallback={<div className="loader">Loading Events...</div>}>
              <Events />
            </Suspense>
            <Suspense fallback={<div>Loading Activities...</div>}>
              <Activities />
            </Suspense>
            <Suspense fallback={<div className="loader">Loading Knowledge...</div>}>
              <VaidikKnowledge />
            </Suspense>
            <Suspense fallback={<div className="loader">Loading Why Arya Samaj...</div>}>
              <WhyAryaSamaj />
            </Suspense>
            <Suspense fallback={<div className="loader">Loading Mission & Vision...</div>}>
              <MissionVision />
            </Suspense>
            <Suspense fallback={<div className="loader">Loading Stories...</div>}>
              <StoriesOfTransformation />
            </Suspense>
            <Suspense fallback={<div className="loader">Loading Testimonials...</div>}>
              <Testimonials />
            </Suspense>
            <Suspense fallback={<div className="loader">Loading Committee...</div>}>
              <Committee />
            </Suspense>
            {/* <Suspense fallback={<div className="loader">Loading Contact...</div>}>
              <Contact />
            </Suspense> */}
            <Suspense fallback={<div className="loader">Loading Vaidik Quiz...</div>}>
              <VaidikQuiz />
            </Suspense>
          </main>

          <Footer />
          <DonationPopup />
        </div>
      )}
    </>
  );
}
