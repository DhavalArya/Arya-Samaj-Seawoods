"use client";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("dark-mode") === "enabled";
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle("dark", savedDarkMode);

    // Inject meta color-scheme for SEO + browser theming
    const meta = document.createElement("meta");
    meta.name = "color-scheme";
    meta.content = savedDarkMode ? "dark light" : "light dark";
    document.head.appendChild(meta);

    return () => {
      if (meta && meta.parentNode) meta.parentNode.removeChild(meta);
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("dark-mode", newMode ? "enabled" : "disabled");

    // Update meta color-scheme dynamically
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = newMode ? "dark light" : "light dark";
  };

  return (
    <>
      <button
        className="fixed bottom-20 right-6 bg-gray-900 text-white p-3 rounded-full shadow-lg z-50"
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      {/* Optional: Structured Data for Theme Mode */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Arya Samaj Seawoods",
          applicationCategory: "WebSite",
          featureList: ["Dark Mode Toggle", "Light Mode Toggle"],
          operatingSystem: "All",
        })}
      </script>
    </>
  );
}
