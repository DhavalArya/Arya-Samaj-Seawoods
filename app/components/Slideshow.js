"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaChevronLeft, FaChevronRight, FaExpand, FaCompress, FaPause, FaPlay,
} from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

/* ---------- environment heuristics (automatic) ---------- */
function useEnvInfo() {
  const [isLgUp, setIsLgUp] = useState(false);        // >= 1024px
  const [isCoarse, setIsCoarse] = useState(false);    // touch-first devices

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const update = () => {
      setIsLgUp(mqLg.matches);
      setIsCoarse(mqCoarse.matches);
    };
    update();
    mqLg.addEventListener?.("change", update);
    mqCoarse.addEventListener?.("change", update);
    return () => {
      mqLg.removeEventListener?.("change", update);
      mqCoarse.removeEventListener?.("change", update);
    };
  }, []);
  return { isLgUp, isCoarse };
}

/* ---------- main component ---------- */
export default function Slideshow({
  transition: defaultTransition = "kenburns",
  durationMs = 5000,
  crossfadeMs = 900,
  shuffle = false,
}) {
  const { isLgUp, isCoarse } = useEnvInfo(); // used for auto sizing & controls
  const [slides, setSlides] = useState([]);
  const [order, setOrder] = useState([]);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isFsUi, setIsFsUi] = useState(false); // our overlay visibility
  const [transition, setTransition] = useState(defaultTransition);

  const wrapRef = useRef(null);
  const intervalRef = useRef(null);

  /* ---- load slides ---- */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/slides.json", { cache: "no-store" });
        const data = await res.json();
        if (!alive) return;
        setSlides(data);
        const idxs = data.map((_, i) => i);
        setOrder(shuffle ? shuffleArray(idxs) : idxs);
      } catch (e) {
        console.warn("Failed to load /slides.json", e);
      }
    })();
    return () => { alive = false; };
  }, [shuffle]);

  /* ---- slide nav ---- */
  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % (order.length || 1));
  }, [order.length]);
  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + (order.length || 1)) % (order.length || 1));
  }, [order.length]);
  const goTo = (i) => setCurrent(i);

  /* ---- autoplay ---- */
  const startTimer = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (slides.length <= 1 || !playing) return;
    intervalRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % (order.length || 1));
    }, durationMs);
  }, [slides.length, playing, durationMs, order.length]);
  useEffect(() => {
    startTimer();
    return () => intervalRef.current && window.clearInterval(intervalRef.current);
  }, [startTimer]);

  /* ---- pause when hidden ---- */
  useEffect(() => {
    const vis = () => setPlaying(!document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  /* ---- FULLSCREEN: request on the DOCUMENT, show our own overlay UI ---- */
  const rootEnterFs = useCallback(() => {
    const docEl = document.documentElement;
    try {
      const p =
        docEl.requestFullscreen?.() ||
        docEl.webkitRequestFullscreen?.() ||
        docEl.msRequestFullscreen?.();
      // if Promise, ensure UI flag after it resolves; if not, set immediately
      if (p && typeof p.then === "function") {
        p.then(() => setIsFsUi(true)).catch((err) => {
          console.warn("Fullscreen rejected:", err);
        });
      } else {
        setIsFsUi(true);
      }
    } catch (err) {
      console.warn("Fullscreen error:", err);
    }
  }, []);

  const rootExitFs = useCallback(() => {
    const d = document;
    try {
      const p =
        d.exitFullscreen?.() ||
        d.webkitExitFullscreen?.() ||
        d.msExitFullscreen?.();
      if (p && typeof p.then === "function") {
        p.finally(() => setIsFsUi(false));
      } else {
        setIsFsUi(false);
      }
    } catch {
      setIsFsUi(false);
    }
  }, []);

  const isFsActive = () =>
    Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);

  const toggleFullscreen = useCallback(() => {
    // IMPORTANT: called directly in the click/keydown event
    if (isFsActive()) rootExitFs();
    else rootEnterFs();
  }, [rootEnterFs, rootExitFs]);

  // keep UI flag in sync if user presses ESC or system exits
  useEffect(() => {
    const sync = () => setIsFsUi(isFsActive());
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    document.addEventListener("MSFullscreenChange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
      document.removeEventListener("MSFullscreenChange", sync);
    };
  }, []);

  /* ---- keyboard ---- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key?.toLowerCase() === "f") toggleFullscreen();
      else if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === "Escape" && isFsActive()) {
        rootExitFs();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, toggleFullscreen, rootExitFs]);

  /* ---- swipe ---- */
  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  /* ---- preload next ---- */
  useEffect(() => {
    if (!slides.length) return;
    const nextIndex = (current + 1) % slides.length;
    const img = new window.Image();
    img.src = slides[order[nextIndex]]?.src || "";
  }, [current, slides, order]);

  const currIdx = order[current] ?? 0;
  const curr = slides[currIdx];
  const variants = useMemo(() => makeVariants(crossfadeMs), [crossfadeMs]);
  const variantKey = transition;

  /* ---- sizes auto-adjust by screen (no prop needed) ---- */
  const baseHeights = isLgUp
    ? "lg:h-[80vh] xl:h-[92vh]"
    : isCoarse
    ? "h-[55vh]"
    : "h-[60vh]";

  if (slides.length === 0) {
    return (
      <div role="status" aria-live="polite" className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold text-gray-700">Loading slides...</p>
      </div>
    );
  }

  return (
    <>
      {/* Normal inline view */}
      <section
        ref={wrapRef}
        {...swipeHandlers}
        role="region"
        aria-roledescription="carousel"
        aria-label="Image Slideshow"
        className={`relative w-full ${baseHeights} overflow-hidden rounded-2xl lg:rounded-2xl shadow-2xl bg-black`}
        onDoubleClick={toggleFullscreen}
      >
        {/* Top controls */}
        <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between pointer-events-none">
          <div className="hidden md:flex items-center gap-2 pointer-events-auto">
            <select
              aria-label="Transition effect"
              className="bg-white/80 text-gray-900 text-sm rounded-md px-2 py-1"
              value={transition}
              onChange={(e) => setTransition(e.target.value)}
            >
              <option value="kenburns">Ken Burns</option>
              <option value="fade">Fade</option>
              <option value="slide-left">Slide Left</option>
              <option value="slide-up">Slide Up</option>
              <option value="zoom">Zoom</option>
              <option value="blur">Blur In</option>
            </select>
          </div>

          <div className="ml-auto flex items-center gap-2 pointer-events-auto">
            <button
              onMouseDown={(e) => { e.preventDefault(); setPlaying((p) => !p); }}
              onClick={(e) => e.preventDefault()}
              aria-label={playing ? "Pause" : "Play"}
              className="bg-gray-900/60 text-white p-2 rounded-md hover:bg-gray-900/80"
            >
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onMouseDown={(e) => { e.preventDefault(); toggleFullscreen(); }}
              onClick={(e) => e.preventDefault()}
              aria-label={isFsUi ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="bg-gray-900/60 text-white p-2 rounded-md hover:bg-gray-900/80"
            >
              {isFsUi ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>

        {/* Prev / Next */}
        <button
          onMouseDown={(e) => { e.preventDefault(); prev(); }}
          onClick={(e) => e.preventDefault()}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/60 text-white p-3 rounded-full z-30 hover:scale-110 transition"
        >
          <FaChevronLeft size={22} />
        </button>
        <button
          onMouseDown={(e) => { e.preventDefault(); next(); }}
          onClick={(e) => e.preventDefault()}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/60 text-white p-3 rounded-full z-30 hover:scale-110 transition"
        >
          <FaChevronRight size={22} />
        </button>

        {/* Slides */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currIdx + "-" + variantKey}
              className="absolute inset-0"
              variants={variants[variantKey]}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src={curr.src}
                alt={curr.alt || curr.caption || `Slide ${currIdx + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              {curr.caption ? (
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 text-white text-lg md:text-xl font-medium px-4 py-2 rounded-md"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.3 } }}
                >
                  {curr.caption}
                </motion.div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 w-full flex justify-center gap-3 z-30" role="tablist" aria-label="Slide navigation">
          {order.map((oIdx, i) => (
            <button
              key={oIdx}
              onMouseDown={(e) => { e.preventDefault(); goTo(i); }}
              onClick={(e) => e.preventDefault()}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={current === i}
              role="tab"
              className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                current === i ? "scale-125 bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Fullscreen overlay (portal to <body>) */}
      {isFsUi &&
        createPortal(
          <div
            // a clean, layout-free layer that ignores page CSS
            className="fixed inset-0 z-[9999] bg-black"
            onDoubleClick={toggleFullscreen}
          >
            {/* minimal controls in FS */}
            <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-end gap-2">
              <button
                onMouseDown={(e) => { e.preventDefault(); setPlaying((p) => !p); }}
                onClick={(e) => e.preventDefault()}
                aria-label={playing ? "Pause" : "Play"}
                className="bg-gray-900/60 text-white p-2 rounded-md hover:bg-gray-900/80"
              >
                {playing ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onMouseDown={(e) => { e.preventDefault(); toggleFullscreen(); }}
                onClick={(e) => e.preventDefault()}
                aria-label="Exit Fullscreen"
                className="bg-gray-900/60 text-white p-2 rounded-md hover:bg-gray-900/80"
              >
                <FaCompress />
              </button>
            </div>

            {/* slide in fullscreen */}
            <div className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={"fs-" + currIdx + "-" + variantKey}
                  className="absolute inset-0"
                  variants={variants[variantKey]}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Image
                    src={curr.src}
                    alt={curr.alt || curr.caption || `Slide ${currIdx + 1}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                  {curr.caption ? (
                    <motion.div
                      className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xl font-semibold px-5 py-3 rounded-md"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
                      exit={{ opacity: 0, y: 12, transition: { duration: 0.3 } }}
                    >
                      {curr.caption}
                    </motion.div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* prev/next in FS */}
            <button
              onMouseDown={(e) => { e.preventDefault(); prev(); }}
              onClick={(e) => e.preventDefault()}
              aria-label="Previous Slide"
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-gray-900/60 text-white p-4 rounded-full z-30 hover:scale-110 transition"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onMouseDown={(e) => { e.preventDefault(); next(); }}
              onClick={(e) => e.preventDefault()}
              aria-label="Next Slide"
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-gray-900/60 text-white p-4 rounded-full z-30 hover:scale-110 transition"
            >
              <FaChevronRight size={24} />
            </button>
          </div>,
          document.body
        )}
    </>
  );
}

/* ---------- helpers ---------- */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function makeVariants(crossfadeMs) {
  const t = { duration: crossfadeMs / 1000, ease: "easeInOut" };
  return {
    fade: { initial: { opacity: 0 }, animate: { opacity: 1, transition: t }, exit: { opacity: 0, transition: t } },
    "slide-left": { initial: { x: "10%", opacity: 0.2 }, animate: { x: "0%", opacity: 1, transition: t }, exit: { x: "-10%", opacity: 0.2, transition: t } },
    "slide-up": { initial: { y: "10%", opacity: 0.2 }, animate: { y: "0%", opacity: 1, transition: t }, exit: { y: "-10%", opacity: 0.2, transition: t } },
    zoom: { initial: { scale: 1.08, opacity: 0 }, animate: { scale: 1, opacity: 1, transition: t }, exit: { scale: 0.98, opacity: 0, transition: t } },
    kenburns: { initial: { scale: 1.1, opacity: 0, x: "-1%", y: "-1%" }, animate: { scale: 1, opacity: 1, x: "0%", y: "0%", transition: t }, exit: { scale: 1.02, opacity: 0, x: "1%", y: "1%", transition: t } },
    blur: { initial: { filter: "blur(10px)", opacity: 0 }, animate: { filter: "blur(0px)", opacity: 1, transition: t }, exit: { filter: "blur(10px)", opacity: 0, transition: t } },
  };
}
