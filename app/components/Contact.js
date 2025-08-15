"use client";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      className="contact-section py-10 px-6 bg-[#FFF8F0] rounded-3xl shadow-lg max-w-5xl mx-auto"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <h2
        id="contact-heading"
        className="text-3xl font-bold text-center text-gray-800 mb-6"
      >
        📍 Contact Arya Samaj Seawoods – Navi Mumbai
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Contact Details */}
        <div className="w-full md:w-1/2 space-y-3 text-lg">
          <p>
            <FaMapMarkerAlt className="inline-block text-red-500 mr-2" />
            <strong>Address:</strong> Arya Samaj Seawoods, Navi Mumbai, Maharashtra
          </p>
          <p>
            <FaPhone className="inline-block text-green-500 mr-2" />
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+91 9223344556, +91 9323022055"
              className="text-blue-700 hover:underline"
            >
              +91 92233 44556, +91 93230 22055
            </a>
          </p>
          <p>
            <FaEnvelope className="inline-block text-blue-500 mr-2" />
            <strong>Email:</strong>{" "}
            <a
              href="mailto:aryasamajseawoods@gmail.com"
              className="text-blue-700 hover:underline"
            >
              aryasamajseawoods@gmail.com
            </a>
          </p>
        </div>

        {/* Google Map */}
        <div className="w-full md:w-1/2">
          <iframe
            className="w-full h-60 rounded-md shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12074.01456248477!2d73.01985314543745!3d19.01832915513438"
            allowFullScreen
            loading="lazy"
            title="Arya Samaj Seawoods Location Map"
          ></iframe>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Arya Samaj Seawoods",
            image: "https://aryasamajseawoods.co.in/images/aryasamaj-logo.jpg",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Seawoods",
              addressLocality: "Navi Mumbai",
              addressRegion: "Maharashtra",
              postalCode: "400706",
              addressCountry: "IN",
            },
            telephone: "+91-9223344556, +91-9323022055",
            email: "aryasamajseawoods@gmail.com",
            url: "https://aryasamajseawoods.co.in",
          }),
        }}
      />
    </section>
  );
}
