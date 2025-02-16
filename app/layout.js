"use client";
import { motion } from "framer-motion";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className="bg-orange-50 font-sans text-gray-900">{children}</body>
      </html>
    );
  }
  