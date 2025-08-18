"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

  // Did You Know? Facts
  const DID_YOU_KNOW_FACTS = [
    "Over 75% of Indian freedom fighters were influenced by Arya Samaj principles.",
    "Bhagat Singh was inspired by Maharshi Dayanand Saraswati’s Satyarth Prakash.",
    "Lala Lajpat Rai, an Arya Samaji, was called ‘Punjab Kesari’ for his role in India’s freedom struggle.",
    "Arya Samaj played a key role in promoting Swadeshi and banning foreign goods during the independence movement.",
    "Swami Shraddhanand, an Arya Samaj leader, was martyred for promoting national unity and education.",
    "Subhash Chandra Bose admired Arya Samaj for its fearless call to fight against British rule.",
    "Maharshi Dayanand was the first to demand 'Swarajya' in 1875, decades before Gandhiji.",
    "Arya Samaj established Gurukuls to educate revolutionaries like Ram Prasad Bismil and Rajguru.",
    "Satyarth Prakash inspired many revolutionaries to reject caste discrimination and fight for equality.",
    "The first Swadeshi movement was inspired by Arya Samaj's call for economic independence.",
    "Swami Shraddhanand fought against untouchability and established ‘Shuddhi’ movements to bring back converted Hindus.",
    "Arya Samaj supported widow remarriage and fought against child marriage, decades before legal reforms.",
    "Arya Samaj built the first indigenous publishing houses to print books against British propaganda.",
    "The Vedas do not support idol worship; instead, they emphasize meditation and inner realization.",
    "The Bhagavad Gita (2.47) teaches that one must focus on action, not results.",
    "Atharvaveda (6.133) highlights the importance of meditation for mental peace and well-being.",
    "Manusmriti (6.92) promotes vegetarianism and warns against animal cruelty.",
    "Upanishads emphasize that true wealth is knowledge, not gold or possessions.",
    "Arya Samaj promoted education for women in an era when it was denied to them.",
    "Ramayana describes Lord Ram as an ideal king who followed Raj Dharma above personal interests.",
    "The Mahabharata contains the world's first discussion on statecraft, politics, and governance.",
    "Bhagavad Gita (6.5) teaches self-reliance: 'Lift yourself by your own efforts.'",
    "Maharshi Dayanand fought against superstitions and promoted scientific temper in Hindu society.",
    "Sushruta, the ancient Indian surgeon, described over 300 surgical procedures centuries before modern medicine.",
    "Arya Samaj played a crucial role in ending caste-based discrimination in temples and education.",
    "The Vedas emphasize gender equality, mentioning women as warriors, scholars, and leaders.",
    "Satyarth Prakash warns against blind faith and promotes reasoning and logical thinking.",
    "Lala Hardayal, an Arya Samaji, founded the Ghadar Party to overthrow British rule.",
    "Arya Samaj schools educated several leaders of the Azad Hind Fauj (INA) under Netaji Subhash Chandra Bose.",
    "Maharshi Dayanand called for a return to Vaidik education, which emphasized science, logic, and ethics."
  ];
  

  // Vaidik Riddles
  const VAIDIK_RIDDLES = [
    { riddle: "I exist beyond time, yet I am within you. Who am I?", answer: "The Atman (Soul) - Upanishads" },
    { riddle: "What moves faster than the wind but is never seen?", answer: "The Mind - Bhagavad Gita (6.6)" },
    { riddle: "What gets smaller the more you use it, yet its impact increases?", answer: "Knowledge - Rigveda" },
    { riddle: "What has no legs yet runs?", answer: "A river (Symbolizing life and Dharma) - Atharvaveda" },
    { riddle: "What exists before birth, during life, and after death?", answer: "The Atman (Soul) - Bhagavad Gita (2.20)" },
    { riddle: "What is more valuable than gold, but is lost when given away freely?", answer: "Character & Reputation - Manusmriti (4.138)" },
    { riddle: "What cannot be burned by fire, wet by water, or cut by weapons?", answer: "The Soul - Bhagavad Gita (2.23)" },
    { riddle: "What increases when shared but disappears when hidden?", answer: "Happiness - Manusmriti" },
    { riddle: "What is greater than the ocean yet can fit inside a single drop?", answer: "Vaidik Knowledge - Rigveda" },
    { riddle: "What belongs to everyone but can never be stolen?", answer: "Dharma (Righteousness) - Mahabharata" },
    { riddle: "What is lighter than air yet heavier than mountains?", answer: "A promise - Ramayana" },
    { riddle: "What is the one thing even God cannot change?", answer: "The Law of Karma - Bhagavad Gita" },
    { riddle: "What is silent yet speaks the loudest?", answer: "A Good Deed - Manusmriti" },
    { riddle: "What is invisible yet creates the biggest impact?", answer: "Faith - Upanishads" },
    { riddle: "What has infinite energy but never tires?", answer: "The Sun - Rigveda" },
    { riddle: "What is the greatest enemy of wisdom?", answer: "Ego - Satyarth Prakash" },
    { riddle: "What binds all creatures but is never seen?", answer: "The Law of Dharma - Bhagavad Gita" },
    { riddle: "What is the only wealth that increases when given away?", answer: "Knowledge - Rigveda" },
    { riddle: "What is born out of truth and destroys ignorance?", answer: "Light of Knowledge - Upanishads" },
    { riddle: "What shines brighter than fire yet is cool as the moon?", answer: "Wisdom - Bhagavad Gita" },
    { riddle: "What can move mountains but remains unseen?", answer: "Faith & Determination - Ramayana" },
    { riddle: "What does not age but holds the wisdom of the universe?", answer: "The Vedas" },
    { riddle: "What has no physical form but weighs heavily on the mind?", answer: "Guilt - Manusmriti" },
    { riddle: "What is omnipresent yet unnoticed?", answer: "Divine Energy - Upanishads" },
    { riddle: "What is sharper than a sword and more powerful than an army?", answer: "Truth - Satyarth Prakash" },
    { riddle: "What flows endlessly, nourishing all life?", answer: "The Ganga (Symbolizing purity and wisdom) - Rigveda" },
    { riddle: "What is the strongest force that binds the universe?", answer: "Dharma - Bhagavad Gita" },
    { riddle: "What cannot be seen, yet it decides your fate?", answer: "Karma - Bhagavad Gita" },
    { riddle: "What has no beginning or end yet defines existence?", answer: "Time - Upanishads" }
  ];

export default function Footer() {
  const [didYouKnow, setDidYouKnow] = useState("");
  const [vaidikRiddle, setVaidikRiddle] = useState({ riddle: "", answer: "" });

  const pickRandom = useCallback((arr) => arr[Math.floor(Math.random() * arr.length)], []);

  useEffect(() => {
    setDidYouKnow(pickRandom(DID_YOU_KNOW_FACTS));
    setVaidikRiddle(pickRandom(VAIDIK_RIDDLES));
  }, [pickRandom]);

  return (
    <footer className="w-full bg-gradient-to-r from-yellow-600 to-orange-500 text-white py-10 shadow-lg rounded-t-[40px]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* 📍 Contact Info */}
        <div>
          <h2 className="text-xl font-bold font-merriweather mb-3">📍 Contact Us</h2>
          <p className="text-sm">Juhi Avenue, Surya Society, Sector 50, Seawoods, Navi Mumbai, Maharashtra (Pin Code: 400706)</p>
          <p className="text-sm">📞 +91 9223344556, +91 9323022055</p>
          <p className="text-sm">✉️ aryasamajseawoods@gmail.com</p>
        </div>

        {/* 📜 Did You Know & Vaidik Riddle */}
        <div>
          <h2 className="text-xl font-bold font-merriweather mb-3">📜 Did You Know?</h2>
          <p className="text-sm italic">&quot;{didYouKnow}&quot;</p>

          <h2 className="text-xl font-bold font-merriweather mt-4">🤔 Vaidik Riddle</h2>
          <p className="text-sm">{vaidikRiddle.riddle}</p>
          <p className="text-sm font-semibold">Answer: {vaidikRiddle.answer}</p>
        </div>

        {/* 🙏 Quick Donate */}
        <div className="text-center bg-gradient-to-br from-orange-100 via-pink-50 to-yellow-100 p-4 rounded-xl shadow-lg border border-orange-200">
          <h2 className="text-2xl font-bold font-merriweather text-orange-700 mb-2">🙏 Quick Donate</h2>

          {/* 80G Info */}
          <div className="flex justify-center items-center gap-2 text-green-800 text-sm font-semibold mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V7a1 1 0 112 0v2a1 1 0 11-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>Your contribution is tax exempt under Section 80G of the Income Tax Act.</span>
          </div>

          <p className="text-xs text-gray-600 italic mb-2">Support Arya Samaj’s selfless seva initiatives 🙏</p>

          {/* QR Image */}
          <Image
            src="/images/donation-qr.jpg"
            alt="Donation QR Code"
            width={120}
            height={120}
            className="mx-auto rounded-lg shadow-md"
          />

          <p className="text-sm mt-2 text-gray-700 font-medium">Scan to Donate</p>
        </div>
      </div>

      {/* 📍 Map */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold font-merriweather mb-3">📍 Arya Samaj Seawoods</h2>
        <div className="w-full flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.2458643646196!2d73.01384577502566!3d19.008884682181936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c360d9572cc7%3A0x88c5b6edd21c2b2!2sArya%20Samaj%20Nerul!5e0!3m2!1sen!2sin!4v1739626400718!5m2!1sen!2sin"
            width="100%"
            height="250"
            className="rounded-lg shadow-md"
            allowFullScreen
            loading="lazy"
            title="Arya Samaj Seawoods Location"
          />
        </div>
        <a
          href="https://www.google.com/maps/place/Arya+Samaj+Nerul/@19.008884,73.013846,15z"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
        >
          🚗 Get Directions
        </a>
      </div>

      {/* 🌍 Footer Note */}
      <div className="mt-6 text-center text-sm font-light">
        <p>© {new Date().getFullYear()} Arya Samaj - Seawoods. All rights reserved.</p>
      </div>
    </footer>
  );
}
