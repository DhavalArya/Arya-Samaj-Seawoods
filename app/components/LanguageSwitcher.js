"use client";
import { useState, useEffect } from "react";

export default function LanguageSwitcher({ onLanguageChange }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setLanguage(savedLang);
    onLanguageChange(savedLang);
  }, [onLanguageChange]); // ✅ Now `onLanguageChange` is a dependency

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    onLanguageChange(lang);
  };

  return (
    <div className="flex space-x-3 text-white">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded ${language === "en" ? "bg-orange-500" : "bg-gray-700"}`}
      >
        🇬🇧 English
      </button>
      <button
        onClick={() => changeLanguage("hi")}
        className={`px-3 py-1 rounded ${language === "hi" ? "bg-orange-500" : "bg-gray-700"}`}
      >
        🇮🇳 हिंदी
      </button>
    </div>
  );
}
