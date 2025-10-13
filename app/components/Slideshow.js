"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaCompress,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import Head from "next/head";

/* ---------- env heuristics ---------- */
function useEnvInfo() {
  const [isLgUp, setIsLgUp] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
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

/* ---------- format support (AVIF detection) ---------- */
function useAvifSupport() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let alive = true;
    // tiny AVIF data URI test
    const avifData =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAG1pZjFhdmlmAAAAAA==";
    // try createImageBitmap (fast) then fallback to Image()
    const test = async () => {
      try {
        if ("createImageBitmap" in window && "fetch" in window) {
          const r = await fetch(avifData);
          const b = await r.blob();
          await createImageBitmap(b);
          if (alive) setOk(true);
          return;
        }
      } catch {}
      try {
        const img = new Image();
        img.onload = () => alive && setOk(true);
        img.onerror = () => alive && setOk(false);
        img.src = avifData;
      } catch {
        alive = false;
        setOk(false);
      }
    };
    test();
    return () => {
      alive = false;
    };
  }, []);
  return ok;
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
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: t },
      exit: { opacity: 0, transition: t },
    },
    "slide-left": {
      initial: { x: "10%", opacity: 0.25 },
      animate: { x: "0%", opacity: 1, transition: t },
      exit: { x: "-10%", opacity: 0.25, transition: t },
    },
    "slide-up": {
      initial: { y: "10%", opacity: 0.25 },
      animate: { y: "0%", opacity: 1, transition: t },
      exit: { y: "-10%", opacity: 0.25, transition: t },
    },
    zoom: {
      initial: { scale: 1.08, opacity: 0 },
      animate: { scale: 1, opacity: 1, transition: t },
      exit: { scale: 0.985, opacity: 0, transition: t },
    },
    kenburns: {
      initial: { scale: 1.06, opacity: 0, x: "-1%", y: "-1%" },
      animate: { scale: 1, opacity: 1, x: "0%", y: "0%", transition: t },
      exit: { scale: 1.01, opacity: 0, x: "1%", y: "1%", transition: t },
    },
    // NOTE: GPU-heavy on full-screen images; keep commented for perf.
    // blur: {
    //   initial: { filter: "blur(10px)", opacity: 0 },
    //   animate: { filter: "blur(0px)", opacity: 1, transition: t },
    //   exit: { filter: "blur(10px)", opacity: 0, transition: t },
    // },
  };
}

/* ---------- main component ---------- */
export default function Slideshow({
  transition: defaultTransition = "kenburns",
  durationMs = 5000,
  crossfadeMs = 900,
  shuffle = false,
  quality = 70,
}) {
  const { isLgUp, isCoarse } = useEnvInfo();
  const avifOk = useAvifSupport();

  const [slides, setSlides] = useState([]);
  const [order, setOrder] = useState([]);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [isFsUi, setIsFsUi] = useState(false);
  const [transition, setTransition] = useState(defaultTransition);

  const intervalRef = useRef(null);

  // load slides (allow caching)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/slides.json");
        const data = await res.json();
        if (!alive) return;
        setSlides(data);
        const idxs = data.map((_, i) => i);
        setOrder(shuffle ? shuffleArray(idxs) : idxs);
      } catch (e) {
        console.warn("Failed to load /slides.json", e);
      }
    })();
    return () => {
      alive = false;
    };
  }, [shuffle]);

  const total = order.length || 1;

  /* ---- slide nav ---- */
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const goTo = (i) => setCurrent(i);

  /* ---- autoplay ---- */
  const startTimer = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (slides.length <= 1 || !playing) return;
    intervalRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, durationMs);
  }, [slides.length, playing, durationMs, total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  /* ---- pause when hidden ---- */
  useEffect(() => {
    const vis = () => setPlaying(!document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  /* ---- fullscreen on <html> ---- */
  const rootEnterFs = useCallback(() => {
    const docEl = document.documentElement;
    try {
      const p =
        docEl.requestFullscreen?.() ||
        docEl.webkitRequestFullscreen?.() ||
        docEl.msRequestFullscreen?.();
      if (p && typeof p.then === "function") {
        p.then(() => setIsFsUi(true)).catch((err) => console.warn("FS rejected:", err));
      } else setIsFsUi(true);
    } catch (err) {
      console.warn("FS error:", err);
    }
  }, []);
  const rootExitFs = useCallback(() => {
    const d = document;
    try {
      const p = d.exitFullscreen?.() || d.webkitExitFullscreen?.() || d.msExitFullscreen?.();
      if (p && typeof p.then === "function") p.finally(() => setIsFsUi(false));
      else setIsFsUi(false);
    } catch {
      setIsFsUi(false);
    }
  }, []);
  const isFsActive = () =>
    Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);

  const toggleFullscreen = useCallback(() => {
    if (isFsActive()) rootExitFs();
    else rootEnterFs();
  }, [rootEnterFs, rootExitFs]);

  // keep UI flag in sync if user presses ESC
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
      } else if (e.key === "Escape" && isFsActive()) rootExitFs();
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

  const variants = useMemo(() => makeVariants(crossfadeMs), [crossfadeMs]);

  const currIdx = order[current] ?? 0;
  const curr = slides[currIdx] || {};

  // choose best source per browser support (avif > webp > src)
  const chooseSrc = (s) => (avifOk && s.avif) || s.webp || s.src || "";
  const currSrc = chooseSrc(curr);
  const currAlt = curr.alt || curr.caption || `Slide ${currIdx + 1}`;

  // compute next for light preload hint
  const nextSlide = slides.length ? slides[order[(current + 1) % slides.length]] : undefined;
  const nextSrc = nextSlide ? chooseSrc(nextSlide) : null;

  const baseHeights = isLgUp
    ? "lg:h-[80vh] xl:h-[92vh]"
    : isCoarse
    ? "h-[55vh]"
    : "h-[60vh]";

  if (!slides.length) {
    return (
      <div role="status" aria-live="polite" className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold text-gray-700">Loading slides...</p>
      </div>
    );
  }

  return (
    <>
      {/* lightweight preload of only the next image */}
      {nextSrc ? (
        <Head>
          <link rel="preload" as="image" href={nextSrc} />
        </Head>
      ) : null}

      {/* Inline view */}
      <section
        {...swipeHandlers}
        role="region"
        aria-roledescription="carousel"
        aria-label="Image Slideshow"
        className={`relative w-full ${baseHeights} overflow-hidden rounded-2xl shadow-2xl bg-black`}
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
              onMouseDown={(e) => {
                e.preventDefault();
                setPlaying((p) => !p);
              }}
              onClick={(e) => e.preventDefault()}
              aria-label={playing ? "Pause" : "Play"}
              className="bg-gray-900/60 text-white p-2 rounded-md hover:bg-gray-900/80"
            >
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                toggleFullscreen();
              }}
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
          onMouseDown={(e) => {
            e.preventDefault();
            prev();
          }}
          onClick={(e) => e.preventDefault()}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/60 text-white p-3 rounded-full z-30 hover:scale-110 transition"
        >
          <FaChevronLeft size={22} />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            next();
          }}
          onClick={(e) => e.preventDefault()}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/60 text-white p-3 rounded-full z-30 hover:scale-110 transition"
        >
          <FaChevronRight size={22} />
        </button>

        {/* Slides (single live node) */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currIdx + "-" + transition}
              className="absolute inset-0"
              variants={variants[variantKeyExists(transition) ? transition : "kenburns"]}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src={currSrc}
                alt={currAlt}
                fill
                sizes="100vw"
                priority={current === 0}
                loading={current === 0 ? "eager" : "lazy"}
                quality={quality}
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
        <div
          className="absolute bottom-5 w-full flex justify-center gap-3 z-30"
          role="tablist"
          aria-label="Slide navigation"
        >
          {order.map((oIdx, i) => (
            <button
              key={oIdx}
              onMouseDown={(e) => {
                e.preventDefault();
                goTo(i);
              }}
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

      {/* Fullscreen overlay */}
      {isFsUi &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black" onDoubleClick={toggleFullscreen}>
            <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-end gap-2">
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  setPlaying((p) => !p);
                }}
                onClick={(e) => e.preventDefault()}
                aria-label={playing ? "Pause" : "Play"}
                className="bg-gray-900/60 text-white p-2 rounded-md hover:bg-gray-900/80"
              >
                {playing ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleFullscreen();
                }}
                onClick={(e) => e.preventDefault()}
                aria-label="Exit Fullscreen"
                className="bg-gray-900/60 text-white p-2 rounded-md hover:bg-gray-900/80"
              >
                <FaCompress />
              </button>
            </div>

            <div className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={"fs-" + currIdx + "-" + transition}
                  className="absolute inset-0"
                  variants={variants[variantKeyExists(transition) ? transition : "kenburns"]}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Image
                    src={currSrc}
                    alt={currAlt}
                    fill
                    sizes="100vw"
                    priority={false}
                    loading="eager"
                    quality={quality}
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

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                prev();
              }}
              onClick={(e) => e.preventDefault()}
              aria-label="Previous Slide"
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-gray-900/60 text-white p-4 rounded-full z-30 hover:scale-110 transition"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                next();
              }}
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

/* guard: if someone passes an unknown transition */
function variantKeyExists(key) {
  return ["fade", "slide-left", "slide-up", "zoom", "kenburns", "blur"].includes(key);
}
