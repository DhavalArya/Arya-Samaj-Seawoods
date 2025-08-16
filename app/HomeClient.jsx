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

// Lazy components that should load only on intent
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

function FloatingButton({ onClick, ariaLabel, className = "", children }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        // identical sizing for every FAB
        "inline-flex h-11 items-center gap-2 px-4 rounded-full",
        "text-white text-sm sm:text-base font-semibold leading-none",
        "shadow-lg select-none",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // UI state for the floating actions
  const [playChant, setPlayChant] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  const isSmall = useIsSmallScreen();
  const prefersReducedMotion = usePrefersReducedMotion();

  // OPTION B: allow mobile opening animation after gesture or idle
  const [allowMobileAnim, setAllowMobileAnim] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !isSmall) return;

    const allow = () => setAllowMobileAnim(true);

    // user gesture path
    window.addEventListener("touchstart", allow, { once: true, passive: true });
    window.addEventListener("scroll", allow, { once: true, passive: true });

    // idle fallback
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => setAllowMobileAnim(true), { timeout: 2500 });
    } else {
      const t = setTimeout(() => setAllowMobileAnim(true), 2500);
      return () => clearTimeout(t);
    }

    return () => {
      window.removeEventListener("touchstart", allow);
      window.removeEventListener("scroll", allow);
    };
  }, [isSmall]);

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

      {/* Desktop: show immediately. Mobile: show after gesture/idle. Respect reduced motion. */}
      {!prefersReducedMotion &&
        !animationFinished &&
        (!isSmall || allowMobileAnim) && (
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
            <FloatingButton
              onClick={() => setPlayChant(true)}
              ariaLabel="Open Aum chant player"
              className="bg-green-600 hover:bg-green-700"
            >
              <span aria-hidden="true" className="align-middle">🔊</span>
              <span className="align-middle">Play Aum</span>
            </FloatingButton>
          ) : (
            <AumChant onClose={() => setPlayChant(false)} />
          )}
        </div>

        {/* Bottom-right: Donate */}
        <div className="fixed right-3 bottom-4 z-40">
          {!donateOpen ? (
            <FloatingButton
              onClick={() => setDonateOpen(true)}
              ariaLabel="Open donate dialog"
              className="bg-orange-600 hover:bg-orange-700"
            >
              <span aria-hidden="true" className="align-middle">🙏</span>
              <span className="align-middle">Donate</span>
            </FloatingButton>
          ) : (
            <DonationPopup onClose={() => setDonateOpen(false)} />
          )}
        </div>
      </div>
    </>
  );
}
