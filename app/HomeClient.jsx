"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";

import Header from "./components/Header";
import Hero from "./components/Hero";
import MembershipModal from "./components/MembershipModal";
import Footer from "./components/Footer";
import DarkModeToggle from "./components/DarkModeToggle";
import DeferInView from "./components/DeferInView";

// Heavy/interactive sections – all deferred
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

// 👇 lazy components that should load only on intent
const DonationPopup = dynamic(() => import("./components/DonationPopup"), { ssr: false });
const AumChant = dynamic(() => import("./components/AumChant"), { ssr: false });

// --- tiny utilities (JS only) ---
function useMediaQuery(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = () => setMatch(m.matches);
    onChange();
    m.addEventListener ? m.addEventListener("change", onChange) : m.addListener(onChange);
    return () =>
      m.removeEventListener ? m.removeEventListener("change", onChange) : m.removeListener(onChange);
  }, [query]);
  return match;
}
function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
function useIsSmallScreen() {
  return useMediaQuery("(max-width: 640px)");
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // 👇 UI state for the floating actions
  const [playChant, setPlayChant] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  const isSmall = useIsSmallScreen();
  const prefersReducedMotion = usePrefersReducedMotion();

  // restore dark mode
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("dark-mode");
    if (saved === "enabled") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Gentle idle preload only on larger screens (skip phones)
  useEffect(() => {
    if (isSmall) return; // keep mobile radios quiet
    const preload = () => import("./components/DailyWisdom");
    if (typeof window === "undefined") return;
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(preload, { timeout: 2000 });
    } else {
      setTimeout(preload, 1200);
    }
  }, [isSmall]);

  return (
    <>
      <Script src="https://analytics.example.com/script.js" strategy="lazyOnload" />

      {!(isSmall || prefersReducedMotion) && !animationFinished && (
        <OpeningAnimation onComplete={() => setAnimationFinished(true)} />
      )}

      <div className={`${isDarkMode ? "dark" : ""} relative min-h-screen overflow-hidden`}>
        <div className="layered-background" aria-hidden="true" />

        <Header />
        <DarkModeToggle isDark={isDarkMode} toggle={() => setIsDarkMode((d) => !d)} />
        <Hero setShowForm={setShowForm} />
        <MembershipModal
          showForm={showForm}
          setShowForm={setShowForm}
          onClose={() => setShowForm(false)}
        />

        <main className="main-content">
          <DeferInView>
            <Suspense fallback={<div className="loader" aria-live="polite">Loading…</div>}>
              <DailyWisdom />
            </Suspense>
          </DeferInView>
          <DeferInView>
            <Suspense fallback={<div className="loader" aria-live="polite">Loading…</div>}>
              <Slideshow />
            </Suspense>
          </DeferInView>
          <DeferInView>
            <Suspense fallback={<div className="loader" aria-live="polite">Loading…</div>}>
              <Events />
            </Suspense>
          </DeferInView>
          <DeferInView>
            <Suspense fallback={<div className="loader" aria-live="polite">Loading…</div>}>
              <Activities />
            </Suspense>
          </DeferInView>
          <DeferInView>
            <Suspense fallback={<div className="loader" aria-live="polite">Loading…</div>}>
              <VaidikKnowledge />
            </Suspense>
          </DeferInView>
          <DeferInView>
            <Suspense fallback={<div className="loader" aria-live="polite">Loading…</div>}>
              <WhyAryaSamaj />
            </Suspense>
          </DeferInView>
          <DeferInView>
            <Suspense fallback={<div className="loader" aria-live="polite">Loading…</div>}>
              <MissionVision />
            </Suspense>
          </DeferInView>
          <DeferInView>
            <Suspense fallback={<div className="loader" aria-live="polite">Loading…</div>}>
              <StoriesOfTransformation />
            </Suspense>
          </DeferInView>
          <DeferInView>
            <Testimonials />
          </DeferInView>
          <DeferInView>
            <Committee />
          </DeferInView>
          <DeferInView>
            <Suspense fallback={<div className="loader" aria-live="polite">Loading…</div>}>
              <VaidikQuiz />
            </Suspense>
          </DeferInView>
        </main>

        <Footer />

        {/* ===== Floating Actions ===== */}

        {/* Bottom-left: Aum Chant */}
        <div className="fixed left-3 bottom-4 z-40">
          {!playChant ? (
            <button
              onClick={() => setPlayChant(true)}
              className="rounded-full px-4 py-2 bg-green-600 text-white shadow-lg hover:bg-green-700"
              aria-label="Open Aum chant player"
            >
              ▶︎ Play Aum
            </button>
          ) : (
            <AumChant onClose={() => setPlayChant(false)} />
          )}
        </div>

        {/* Bottom-right: Donate */}
        <div className="fixed right-3 bottom-4 z-40">
          {!donateOpen ? (
            <button
              onClick={() => setDonateOpen(true)}
              className="rounded-full px-4 py-2 bg-orange-600 text-white shadow-lg hover:bg-orange-700"
              aria-label="Open donate dialog"
            >
              🙏 Donate
            </button>
          ) : (
            <DonationPopup onClose={() => setDonateOpen(false)} />
          )}
        </div>
      </div>
    </>
  );
}
