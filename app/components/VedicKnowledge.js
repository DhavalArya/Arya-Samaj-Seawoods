"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const vaidikTopics = [
  { 
    title: "Introduction to Arya Samaj", 
    description: "Founded in 1875 to promote Vaidik wisdom.",
    icon: "📜",
    link: "https://aryasamajbangalore.in/an-introduction/"
  },
  { 
    title: "Vaidik Dharma", 
    description: "Understanding the principles and aspects of Vaidik Dharma.",
    icon: "🔥",
    link: "https://aryasamajbangalore.in/vedic-dharam/"
  },
  {
    title: "Ved", 
    description: "Learn about the four Vedas, Upanishads, Vedangas, Upa-Vedas, Dharshana Sutras, Ithihasas and their significance.",
    icon: "📚",
    link: "https://aryasamajbangalore.in/ved/"
  },
  { 
    title: "Gayatri Mantra", 
    description: "Explore the meaning and benefits of the Gayatri Mantra.",
    icon: "📖",
    link: "https://aryasamajbangalore.in/om-gayatri-mantra/"
  },
  {
    title: "Arya", 
    description: "The meaning of word - Arya and its significance in Vaidik culture.",
    icon: "🕊️",
    link: "https://aryasamajbangalore.in/the-word-arya/"
  },
  {
    title: "Satyarth Prakash", 
    description: "A foundational book by Maharshi Dayanand Saraswati on Vaidik philosophy with downloadable resources.",
    icon: "📘",
    link: "https://aryasamajbangalore.in/satyarth-prakash/"
  },
  {
    title: "Sixteen Sanskars", 
    description: "Understanding the sixteen sanskars and their importance in Vaidik life.",
    icon: "🎉",
    link: "https://aryasamaj.davchennai.org/resources/samskaars/"
  },
  { 
    title: "Ten Rules of Arya Samaj", 
    description: "Learn about the ten fundamental rules of Arya Samaj.",
    icon: "📜",
    link: "https://aryasamaj.davchennai.org/principles/"
  },
  { 
    title: "Agnihotra Mantras", 
    description: "Mantras for performing Agnihotra, a sacred fire ritual.",
    icon: "🔥",
    link: "https://aryasamaj.davchennai.org/resources/agnihotra-mantras/"
  },
  { 
    title: "Arya Samaj Bhajans", 
    description: "Explore a collection of devotional songs and hymns.",
    icon: "🎶",
    link: "https://www.aryasamaj.org/bhajan"
  },
  {
    title: "Maharshi Dayanand Saraswati - A Small Introduction",
    description: "A brief introduction to the life and teachings of Maharshi Dayanand Saraswati.",
    icon: "👤",
    link: "https://maharshidayanand.com/brief-introduction/"
  },
  {
    title: "Maharshi Dayanand Saraswati - Special Works",
    description: "An overview of the special works and contributions of Maharshi Dayanand Saraswati.",
    icon: "📖",
    link: "https://maharshidayanand.com/special-works/"
  },
  {
    title: "Gem - Literature created by Maharshi Dayanand",
    description: "Explore the literary contributions of Maharshi Dayanand, including his writings and teachings.",
    icon: "📚",
    link: "https://maharshidayanand.com/literature/"
  },
  {
    title: "Maharshi Dayanand Saraswati - Travel and Life",
    description: "Discover the life journey and travels of Maharshi Dayanand Saraswati.",
    icon: "✈️",
    link: "https://maharshidayanand.com/travel-details/"
  },
  {
    title: "Assassination of attempts of Maharshi Dayanand Saraswati",
    description: "Learn about the attempts on the life of Maharshi Dayanand Saraswati and his resilience.",
    icon: "🛡️",
    link: "https://maharshidayanand.com/assassination-attempts/"
  },
  {
    title: "Impact of Maharshi Dayanand Saraswati and Arya Samaj",
    description: "An exploration of the impact of Maharshi Dayanand Saraswati and the Arya Samaj on society and culture.",
    icon: "🌍",
    link: "https://maharshidayanand.com/impact/"
  },
  {
    title: "Documentaries on Maharshi Dayanand Saraswati",
    description: "Watch documentaries created by various institutions that explore the life and teachings of Maharshi Dayanand Saraswati.",
    icon: "🎥",
    link: "https://maharshidayanand.com/documentary/"
  },
  {
    title: "Rishi Gatha",
    description: "Rishi Gatha created by Shri Pradeep Ji, a song that celebrates the life and teachings of Maharshi Dayanand Saraswati.",
    icon: "🎵",
    link: "https://maharshidayanand.com/rishi-gatha-2/"
  },
  {
    title: "Video stories on Maharshi Dayanand Saraswati",
    description: "A collection of video stories that narrate the life and teachings of Maharshi Dayanand Saraswati.",
    icon: "📺",
    link: "https://maharshidayanand.com/video-stories-2/"
  },
  {
    title: "Life pictorial of Maharshi Dayanand Saraswati",
    description: "A pictorial representation of the life of Maharshi Dayanand Saraswati, showcasing key moments and events.",
    icon: "🖼️",
    link: "https://maharshidayanand.com/life-pictorial/"
  },
  {
    title: "Comics on Maharshi Dayanand Saraswati and his disciples/freedom fighters",
    description: "Engaging comics that depict the life and teachings of Maharshi Dayanand Saraswati and his disciples.",
    icon: "📰",
    link: "https://maharshidayanand.com/comics/"
  },
  {
    title: "Children's corner - Vyavharbhanu video stories",
    description: "A collection of video stories for children that teach Vaidik values and principles.",
    icon: "👶",
    link: "https://maharshidayanand.com/vyavharbhanu-story-animation/"
  },
  {
    title: "Children's corner - Stayarthprakash video stories",
    description: "A collection of video stories for children that explain the concepts of Stayarthprakash.",
    icon: "👶",
    link: "https://maharshidayanand.com/satyarth-prakash-story-animation/"
  },
  {
    title: "Downloadable Resources",
    description: "Access a variety of downloadable resources related to Vaidik knowledge.",
    icon: "📥",
    link: "https://maharshidayanand.com/downloads/"
  },
  {
    title: "Why to join Arya Samaj",
    description: "Learn about the benefits and reasons to join Arya Samaj.",
    icon: "🤝",
    link: "https://www.thearyasamaj.org/articles?=1554_Why_should_we_Join_Arya_Samaj"
  },
  {
    title: "Submit Your thoughts about Maharshi Dayanand Saraswati",
    description: "Share your thoughts and reflections on the teachings of Maharshi Dayanand Saraswati.",
    icon: "📝",
    link: "https://maharshidayanand.com/your-thoughts-about-md/"
  }
];

export default function VaidikKnowledge() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { triggerOnce: true });
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative bg-gradient-to-br from-[#FDE5C7] to-[#F6D7A7] p-10 rounded-3xl shadow-lg text-gray-900 w-full max-w-6xl mx-auto text-center scroll-container"
    >
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-[#8C4A08] mb-6">📖 Hindu & Vaidik Knowledge Hub</h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-800/60 text-white rounded-full hover:bg-gray-900 transition-all"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-800/60 text-white rounded-full hover:bg-gray-900 transition-all"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Scrollable Card Section */}
      <div
        ref={scrollRef}
        className="overflow-x-auto flex space-x-6 snap-x scroll-smooth p-4 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {vaidikTopics.map((topic, index) => (
          <motion.div
            key={index}
            className="min-w-[320px] bg-white p-6 rounded-xl shadow-md snap-center border border-orange-300 flex flex-col items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold text-orange-800">{topic.icon} {topic.title}</h3>
            <p className="text-gray-700 mt-2">{topic.description}</p>
            {topic.link && (
              <a
                href={topic.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition-all shadow-md"
              >
                {topic.title.includes("Downloadable") ? "📥 Download" : "🔗 View"}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}