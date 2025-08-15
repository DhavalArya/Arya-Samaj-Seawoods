"use client";
import { useState, useEffect, useCallback } from "react";

export default function LanguageSwitcher({ onLanguageChange }) {
  const [language, setLanguage] = useState("en");

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`; // 🔹 1 year
    document.documentElement.setAttribute("lang", lang);
    if (typeof onLanguageChange === "function") {
      onLanguageChange(lang);
    }
  }, [onLanguageChange]);

  useEffect(() => {
    const savedLang =
      localStorage.getItem("language") ||
      (typeof document !== "undefined" && document.documentElement.lang) ||
      "en";
    changeLanguage(savedLang);
  }, [changeLanguage]);

  return (
    <div
      className="flex space-x-3 text-white"
      role="group"
      aria-label="Language Switcher"
    >
      <button
        onClick={() => changeLanguage("en")}
        aria-current={language === "en" ? "true" : "false"}
        lang="en"
        className={`px-3 py-1 rounded transition-colors ${
          language === "en" ? "bg-orange-500" : "bg-gray-700"
        }`}
      >
        🇬🇧 English
      </button>
      <button
        onClick={() => changeLanguage("hi")}
        aria-current={language === "hi" ? "true" : "false"}
        lang="hi"
        className={`px-3 py-1 rounded transition-colors ${
          language === "hi" ? "bg-orange-500" : "bg-gray-700"
        }`}
      >
        🇮🇳 हिंदी
      </button>
    </div>
  );
}
