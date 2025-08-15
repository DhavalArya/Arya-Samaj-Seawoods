"use client";

import Head from "next/head";

export default function KnowledgeHub() {
  return (
    <>
      {/* SEO Meta & Structured Data */}
      <Head>
        <title>Vaidik Knowledge Hub | Arya Samaj Seawoods</title>
        <meta
          name="description"
          content="Explore the life, teachings, and principles of Maharshi Dayanand Saraswati and Arya Samaj. Learn about Vedic wisdom, truth, and social reform."
        />
        <meta
          name="keywords"
          content="Vaidik Knowledge, Arya Samaj Seawoods, Maharshi Dayanand Saraswati, Vedic principles, truth, social reform, vedas"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Vaidik Knowledge Hub",
              description:
                "Learn about Maharshi Dayanand Saraswati, Arya Samaj principles, and Vedic wisdom for truth and social reform.",
              author: {
                "@type": "Organization",
                name: "Arya Samaj Seawoods",
              },
              publisher: {
                "@type": "Organization",
                name: "Arya Samaj Seawoods",
                logo: {
                  "@type": "ImageObject",
                  url: "https://yourdomain.com/images/arya-samaj-logo.jpg",
                },
              },
            }),
          }}
        />
      </Head>

      <section
        id="knowledge"
        className="p-10 bg-orange-100"
        aria-label="Vaidik Knowledge Hub section"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-orange-700">
            📖 Vaidik Knowledge Hub
          </h2>
          <p className="mt-4 text-gray-700 text-lg">
            Discover the timeless wisdom of the{" "}
            <strong>Vedas</strong>, the vision of{" "}
            <strong>Maharshi Dayanand Saraswati</strong>, and the guiding
            principles of the <strong>Arya Samaj</strong> movement.
          </p>
        </div>

        {/* SEO-friendly static educational content */}
        <article className="mt-8 max-w-4xl mx-auto text-gray-800 space-y-6 leading-relaxed">
          <section>
            <h3 className="text-xl font-semibold text-orange-800">
              Who was Maharshi Dayanand Saraswati?
            </h3>
            <p>
              Maharshi Dayanand Saraswati (1824–1883) was a visionary social
              reformer and founder of the Arya Samaj. He revived the teachings
              of the Vedas, rejecting superstition and promoting truth, logic,
              and equality. His work inspired a wave of social change in India,
              advocating education for all, women’s rights, and the abolition of
              caste discrimination.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-orange-800">
              Core Principles of Arya Samaj
            </h3>
            <ul className="list-disc list-inside">
              <li>God is the source of all true knowledge.</li>
              <li>The Vedas are the true scriptures of humanity.</li>
              <li>Truth should be accepted, and untruth should be discarded.</li>
              <li>Promote justice, righteousness, and compassion.</li>
              <li>All human beings are equal and should be treated as such.</li>
              <li>Education is essential for personal and social upliftment.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-orange-800">
              The Relevance of Vedic Knowledge Today
            </h3>
            <p>
              Vedic wisdom offers guidance for living a balanced, ethical, and
              meaningful life. Its principles encourage harmony between humans
              and nature, selfless service to society, and continuous learning.
              In today’s fast-changing world, these teachings provide moral
              grounding and clarity.
            </p>
          </section>
        </article>
      </section>
    </>
  );
}
