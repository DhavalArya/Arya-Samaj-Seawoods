"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image"; // ✅ Use Next.js Image for optimization

const stories = [
    {
      name: "Swami Shraddhanand’s Shuddhi Movement",
      title: "Revival of Vaidik Dharma",
      before: "Many communities had lost their connection with Vaidik teachings due to forced conversions.",
      after: "Arya Samaj led the Shuddhi Movement to bring them back to their Vaidik roots with dignity.",
      image: "/images/shuddhi-movement.jpg",
    },
    {
      name: "Arya Samaj Orphanages",
      title: "Transforming Lives of Orphans",
      before: "Many orphaned children in India had no access to education or proper upbringing.",
      after: "Arya Samaj established orphanages that provided them free education, Vaidik values & a bright future.",
      image: "/images/orphanage.jpg",
    },
    {
      name: "Widow Empowerment (Vidhwa Ashram)",
      title: "Supporting Women’s Independence",
      before: "Widows were marginalized with no financial or emotional support.",
      after: "Arya Samaj provided education & skills to make them self-reliant and independent.",
      image: "/images/widow-empowerment.jpg",
    },
    {
      name: "Arya Veer & Veerangana Dal",
      title: "Training Youth & Disaster Relief",
      before: "Many youth lacked proper guidance on mental & physical discipline.",
      after: "Arya Veer Dal & Veerangana Dal train youth in physical fitness, Vaidik values & emergency response.",
      image: "/images/arya-veer-dal.jpg",
    },
    {
      name: "Gurukuls & Vaidik Education",
      title: "Preserving Vaidik Culture & Universal Education",
      before: "True Vaidik culture & ancient education methods were fading away.",
      after: "Arya Samaj established Gurukuls where students receive knowledge of Vedas, Sanskrit & modern subjects.",
      image: "/images/gurukul.jpg",
    },
    {
      name: "Arya Veer Dal’s Social Service",
      title: "Emergency Relief & Disaster Management",
      before: "During natural disasters, many affected people had no immediate help.",
      after: "Arya Veer Dal volunteers rescued families, provided food & rebuilt homes.",
      image: "/images/disaster-relief.jpg",
    },
    {
      name: "Gaushala & Cattle Protection",
      title: "Saving & Caring for Cows",
      before: "Many cows were abandoned, mistreated, or sent to slaughterhouses.",
      after: "Arya Samaj established Gaushalas, where cows receive proper care, shelter & protection.",
      image: "/images/gaushala.jpg",
    },
    {
      name: "Fighting Blind Faith & Superstition",
      title: "Removing Andhshraddha, Idol Worship & False Rituals",
      before: "Millions suffered due to baseless rituals, superstitions & idol worship.",
      after: "Arya Samaj spread true Vaidik knowledge, promoting rational thinking & social reform.",
      image: "/images/superstition-removal.jpg",
    }
];

export default function StoriesOfTransformation() {
  const [flipped, setFlipped] = useState(Array(stories.length).fill(false));

  const toggleFlip = (index) => {
    setFlipped((prev) =>
      prev.map((val, i) => (i === index ? !val : val))
    );
  };

  return (
    <section
      id="transformation-stories"
      aria-labelledby="transformation-heading"
      className="py-16 px-6 bg-gradient-to-b from-yellow-50 to-orange-100 text-gray-900"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2
          id="transformation-heading"
          className="text-4xl font-bold font-merriweather text-orange-700"
        >
          Legacy of Arya Samaj's Reforms
        </h2>
        <p className="mt-3 text-lg font-noto-serif text-gray-800">
          Lives and communities transformed through Arya Samaj’s unwavering dedication to <strong>dharma, reform, and selfless service</strong>.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {stories.map((story, index) => {
          const isFlipped = flipped[index];
          return (
            <motion.article
              key={index}
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleFlip(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  toggleFlip(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Flip card for ${story.name}`}
              className="relative w-full h-[360px] sm:h-[400px] cursor-pointer outline-none perspective"
            >
              <div
                className={`relative w-full h-full duration-700 transform-style preserve-3d transition-transform ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 bg-white shadow-lg rounded-lg p-5 flex flex-col justify-center items-center text-center backface-hidden">
                  <h3 className="text-xl font-bold font-merriweather text-orange-800">
                    {story.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{story.title}</p>
                  <p className="mt-3 text-sm italic">&ldquo;{story.before}&rdquo;</p>
                  <span className="mt-3 text-orange-600 font-bold">
                    Tap to See Transformation
                  </span>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-orange-600 text-white shadow-lg rounded-lg p-5 transform rotate-y-180 backface-hidden">
                  <div className="relative w-full h-[160px] rounded-lg overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-lg"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <h3 className="text-xl font-bold font-merriweather mt-3">
                    {story.name}
                  </h3>
                  <p className="text-sm text-yellow-200 mt-1">{story.title}</p>
                  <p className="mt-3 text-sm italic">&ldquo;{story.after}&rdquo;</p>
                  <span className="mt-3 text-yellow-300 font-bold">
                    Tap to Flip Back
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
