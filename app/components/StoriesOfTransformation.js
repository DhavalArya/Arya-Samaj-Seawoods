"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const stories = [
    {
      name: "Swami Shraddhanand’s Shuddhi Movement",
      title: "Revival of Vedic Dharma",
      before: "Many communities had lost their connection with Vedic teachings due to forced conversions.",
      after: "Arya Samaj led the Shuddhi Movement to bring them back to their Vedic roots with dignity.",
      image: "/images/shuddhi-movement.jpg",
    },
    {
      name: "Arya Samaj Orphanages",
      title: "Transforming Lives of Orphans",
      before: "Many orphaned children in India had no access to education or proper upbringing.",
      after: "Arya Samaj established orphanages that provided them free education, Vedic values & a bright future.",
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
      after: "Arya Veer Dal & Veerangana Dal train youth in physical fitness, Vedic values & emergency response.",
      image: "/images/arya-veer-dal.jpg",
    },
    {
      name: "Gurukuls & Vaidik Education",
      title: "Preserving Vedic Culture & Universal Education",
      before: "True Vedic culture & ancient education methods were fading away.",
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
      after: "Arya Samaj spread true Vedic knowledge, promoting rational thinking & social reform.",
      image: "/images/superstition-removal.jpg",
    }
  ];

export default function StoriesOfTransformation() {
  const [flipped, setFlipped] = useState(Array(stories.length).fill(false));

  const toggleFlip = (index) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-yellow-50 to-orange-100 text-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-merriweather text-orange-700">
          Stories of Transformation
        </h2>
        <p className="mt-3 text-lg font-noto-serif text-gray-800">
          Real lives changed through Arya Samaj’s mission of <strong>education, empowerment & selfless service</strong>.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative w-full h-[300px] cursor-pointer perspective"
            onClick={() => toggleFlip(index)}
          >
            <div
              className={`relative w-full h-full transform transition-transform duration-700 ${
                flipped[index] ? "rotate-y-180" : ""
              }`}
            >
              {/* Front Side */}
              <motion.div
                className={`absolute w-full h-full bg-white shadow-lg rounded-lg flex flex-col justify-center items-center text-center backface-hidden p-5 ${
                  flipped[index] ? "hidden" : "block"
                }`}
              >
                <h3 className="text-xl font-bold font-merriweather text-orange-800">{story.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{story.title}</p>
                <p className="mt-3 text-sm italic">"{story.before}"</p>
                <button className="mt-3 text-orange-600 font-bold">Tap to See Transformation</button>
              </motion.div>

              {/* Back Side - Image + Text */}
              <motion.div
                className={`absolute w-full h-full bg-orange-600 text-white shadow-lg rounded-lg flex flex-col justify-center items-center text-center transform rotate-y-180 backface-hidden p-5 ${
                  flipped[index] ? "block" : "hidden"
                }`}
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-[160px] object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-bold font-merriweather mt-3">{story.name}</h3>
                <p className="text-sm text-yellow-200 mt-1">{story.title}</p>
                <p className="mt-3 text-sm italic">"{story.after}"</p>
                <button className="mt-3 text-yellow-300 font-bold" onClick={() => toggleFlip(index)}>
                  Tap to Flip Back
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
