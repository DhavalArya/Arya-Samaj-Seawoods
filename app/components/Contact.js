"use client";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📍 Contact Us</h2>
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Contact Details */}
        <div className="w-full md:w-1/2">
          <p className="text-lg"><FaMapMarkerAlt className="inline-block text-red-500 mr-2" /> Seawoods, Navi Mumbai</p>
          <p className="text-lg"><FaPhone className="inline-block text-green-500 mr-2" /> +91 9876543210</p>
          <p className="text-lg"><FaEnvelope className="inline-block text-blue-500 mr-2" /> contact@aryasamajseawoods.com</p>
        </div>

        {/* Google Map */}
        <div className="w-full md:w-1/2">
          <iframe
            className="w-full h-60 rounded-md shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12074.01456248477!2d73.01985314543745!3d19.01832915513438"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
