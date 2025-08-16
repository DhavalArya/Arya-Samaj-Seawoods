"use client";
import { useEffect, useRef, useState } from "react";

export default function DeferInView({ children, rootMargin = "200px" }) {
  const ref = useRef(null);      // no generic in JS
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || show) return;

    // Fallback for very old browsers / SSR safety
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    let obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
        if (obs) obs.disconnect();
        obs = null;
      }
    }, { rootMargin });

    obs.observe(node);
    return () => { if (obs) obs.disconnect(); };
  }, [show, rootMargin]);

  return <div ref={ref}>{show ? children : null}</div>;
}
