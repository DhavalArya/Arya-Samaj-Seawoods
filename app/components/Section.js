"use client";

// app/components/Section.js
export default function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="my-16 p-10 bg-white shadow-md border-l-8 border-orange-600 rounded-lg mx-auto max-w-5xl text-left"
      aria-labelledby={`${id}-title`}
    >
      {/* Using <h2> with id for accessibility/SEO */}
      <h2
        id={`${id}-title`}
        className="text-3xl font-bold mb-6 text-center text-orange-700 scroll-mt-20"
      >
        {title}
      </h2>

      {/* Content container for spacing and better readability */}
      <div className="space-y-4 text-gray-800 font-poppins">{children}</div>
    </section>
  );
}
