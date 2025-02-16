"use client";
import { motion } from "framer-motion";

// app/components/Section.js
export default function Section({ id, title, children }) {
    return (
      <section id={id} className="my-16 p-10 bg-white shadow-md border-l-8 border-orange-600 rounded-lg mx-auto max-w-5xl text-left">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">{title}</h2>
        {children}
      </section>
    );
  }
  