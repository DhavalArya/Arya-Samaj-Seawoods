"use client";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [panchang, setPanchang] = useState({
    tithi: "Shukla Paksha Tritiya",
    nakshatra: "Rohini",
    sunrise: "06:42 AM",
    sunset: "06:30 PM",
  });

  return (
    <footer className="w-full bg-gradient-to-r from-yellow-600 to-orange-500 text-white py-10 shadow-lg rounded-t-[40px]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* 📍 Contact Info */}
        <div>
          <h2 className="text-xl font-bold font-merriweather mb-3">📍 Contact Us</h2>
          <p className="text-sm">Seawoods, Navi Mumbai</p>
          <p className="text-sm">📞 +91 9876543210</p>
          <p className="text-sm">✉️ contact@aryasamajseawoods.com</p>
        </div>

        {/* 📅 Daily Panchang */}
        <div>
          <h2 className="text-xl font-bold font-merriweather mb-3">📅 Daily Panchang</h2>
          <p className="text-sm">🌙 Tithi: {panchang.tithi}</p>
          <p className="text-sm">⭐ Nakshatra: {panchang.nakshatra}</p>
          <p className="text-sm">🌄 Sunrise: {panchang.sunrise}</p>
          <p className="text-sm">🌇 Sunset: {panchang.sunset}</p>
        </div>

        {/* 🙏 Quick Donate */}
        <div className="text-center">
          <h2 className="text-xl font-bold font-merriweather mb-3">🙏 Quick Donate</h2>
          <Image 
            src="/images/donation-qr.jpg" 
            alt="Donation QR" 
            width={120} 
            height={120} 
            className="mx-auto rounded-lg shadow-md"
          />
          <p className="text-sm mt-2">Scan to Donate</p>
        </div>
      </div>

      {/* 📍 Google Maps Section with Exact Location */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold font-merriweather mb-3">📍 Arya Samaj Seawoods</h2>
        <div className="w-full flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.2458643646196!2d73.01384577502566!3d19.008884682181936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c360d9572cc7%3A0x88c5b6edd21c2b2!2sArya%20Samaj%20Nerul!5e0!3m2!1sen!2sin!4v1739626400718!5m2!1sen!2sin"
            width="100%"
            height="250"
            className="rounded-lg shadow-md"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <a
          href="https://www.google.com/maps/place/Arya+Samaj+Nerul/@19.008884,73.013846,15z/data=!4m6!3m5!1s0x3be7c360d9572cc7:0x88c5b6edd21c2b2!8m2!3d19.008884!4d73.013846!16s%2Fg%2F11b6j8yw6h?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
        >
          🚗 Get Directions
        </a>
      </div>

      {/* 🌍 Social Media Links */}
      <div className="mt-6 text-center text-sm font-light">
        <p>© {new Date().getFullYear()} Arya Samaj - Seawoods. All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="mx-2 hover:underline">Facebook</a> |
          <a href="#" className="mx-2 hover:underline">Instagram</a> |
          <a href="#" className="mx-2 hover:underline">Twitter</a>
        </p>
      </div>
    </footer>
  );
}
