"use client";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // ✅ Load dark mode state from localStorage
    const savedDarkMode = localStorage.getItem("dark-mode") === "enabled";
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle("dark", savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);

    // ✅ Save mode in localStorage
    localStorage.setItem("dark-mode", newMode ? "enabled" : "disabled");
  };

  return (
    <button
      className="fixed bottom-20 right-6 bg-gray-900 text-white p-3 rounded-full shadow-lg z-50"
      onClick={toggleDarkMode}
    >
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
}
