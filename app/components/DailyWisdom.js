"use client";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import {
  FaWhatsapp,
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

const siteUrl = "https://www.aryasamajseawoods.co.in";

const quotes = [
  { 
    text: "ॐ स्वस्ति न इन्द्रो वृद्धश्रवाः। स्वस्ति नः पूषा विश्ववेदाः॥",
    meaning: "May Indra, the possessor of great wisdom, bless us. May the all-knowing Sun God grant us well-being.",
    source: "यजुर्वेद 25.19",
    // audio: "/audio/quote1.mp3"
  },
  { 
    text: "ॐ द्यौः शान्तिरन्तरिक्षँ शान्तिः। पृथिवी शान्तिरापः शान्तिः।",
    meaning: "May there be peace in the heavens, peace in the atmosphere, peace on earth, and peace in the waters.",
    source: "यजुर्वेद 36.17",
    // audio: "/audio/quote2.mp3"
  },
  { 
    text: "ॐ अग्ने व्रतपते व्रतं चरिष्यामि तच्छकेयम्।",
    meaning: "O Agni, Lord of vows! I shall observe my vow with dedication and capability.",
    source: "यजुर्वेद 1.5",
    // audio: "/audio/quote3.mp3"
  },
  { 
    text: "ॐ तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥",
    meaning: "Lead me from darkness to light. Lead me from death to immortality.",
    source: "बृहदारण्यक उपनिषद् 1.3.28",
    // audio: "/audio/quote4.mp3"
  },
  { 
    text: "ॐ इन्द्राय स्वाहा, इन्द्राय इदं न मम॥",
    meaning: "Salutations to Indra, this offering is for him, not for myself.",
    source: "ऋग्वेद 8.12.1",
    // audio: "/audio/quote5.mp3"
  },
  { 
    text: "ॐ सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः॥",
    meaning: "May all beings be happy. May all be free from diseases.",
    source: "यजुर्वेद 36.22",
    // audio: "/audio/quote6.mp3"
  },
  { 
    text: "ॐ रात्र्याग्निः शरदस्सप्त। द्वे ऋतू आसीताम्।",
    meaning: "O Agni, may the seven seasons exist. May there be balance in nature.",
    source: "अथर्ववेद 19.6.1",
    // audio: "/audio/quote7.mp3"
  },
  { 
    text: "ॐ ब्रह्मेन्द्राय देवाय नमः।",
    meaning: "Salutations to the Supreme Lord, Indra, and the Divine.",
    source: "ऋग्वेद 10.121.10",
    // audio: "/audio/quote8.mp3"
  },
  { 
    text: "ॐ अहम् वृक्षस्य रेरिवा। कीर्तिः पृथिव्या अरिवा॥",
    meaning: "I am the nourisher of the tree of life. My fame extends across the earth.",
    source: "तैत्तिरीय उपनिषद् 1.10",
    // audio: "/audio/quote9.mp3"
  },
  { 
    text: "ॐ अथ वयं विजानीयामः।",
    meaning: "Now, let us seek to understand the truth.",
    source: "मुण्डकोपनिषद् 3.1.3",
    // audio: "/audio/quote10.mp3"
  },
  {
    text: "ॐ स्वस्ति न इन्द्रो वृद्धश्रवाः। स्वस्ति नः पूषा विश्ववेदाः॥",
    meaning: "May Indra, the possessor of great wisdom, bless us. May the all-knowing Sun God grant us well-being.",
    source: "यजुर्वेद 25.19 (Swastivachan)"
  },
  {
    text: "ॐ द्यौः शान्तिरन्तरिक्षँ शान्तिः। पृथिवी शान्तिरापः शान्तिः॥",
    meaning: "May there be peace in the heavens, peace in the atmosphere, peace on earth, and peace in the waters.",
    source: "यजुर्वेद 36.17 (Shantikaran)"
  },
  {
    text: "ॐ तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥",
    meaning: "Lead me from darkness to light. Lead me from death to immortality.",
    source: "बृहदारण्यक उपनिषद् 1.3.28"
  },
  {
    text: "ॐ सत्यं वद। धर्मं चर।",
    meaning: "Speak the truth. Follow righteousness.",
    source: "तैत्तिरीय उपनिषद् 1.11.1"
  },
  {
    text: "ॐ मातृदेवो भव। पितृदेवो भव। आचार्यदेवो भव।",
    meaning: "Regard your mother, father, and teacher as God.",
    source: "तैत्तिरीय उपनिषद् 1.11.2"
  },
  {
    text: "ॐ आ नो भद्राः क्रतवो यन्तु विश्वतः।",
    meaning: "May noble thoughts come to us from all directions.",
    source: "ऋग्वेद 1.89.1"
  },
  {
    text: "ॐ अग्निमीळे पुरोहितं।",
    meaning: "I praise Agni, the first priest of the sacrifice.",
    source: "ऋग्वेद 1.1.1"
  },
  {
    text: "ॐ यज्ञायज्ञिनां पतये नमः।",
    meaning: "Salutations to the Lord of Sacrifice (Yajna).",
    source: "यजुर्वेद 3.1 (Ishwar Stuti)"
  },
  {
    text: "ॐ यज्ञेन यज्ञमयजन्त देवाः।",
    meaning: "By Yajna, the gods performed Yajna.",
    source: "ऋग्वेद 10.90.16"
  },
  {
    text: "ॐ आत्मानं रथिनं विद्धि।",
    meaning: "Know the self as the charioteer.",
    source: "कठोपनिषद् 1.3.3"
  },
  {
    text: "ॐ ऋतं च सत्यं चाभीध्यानात् तपसा योनिमाप्नुवन्ति।",
    meaning: "Through meditation on truth and righteousness, one attains the supreme goal.",
    source: "मुण्डकोपनिषद् 3.1.5"
  },
  {
    text: "ॐ सत्येन धार्यते पृथ्वी।",
    meaning: "The Earth is upheld by truth.",
    source: "अथर्ववेद 12.1.1"
  },
  {
    text: "ॐ प्रातरग्निं प्रातरिन्द्रं हवामहे। प्रातर्मित्रावरुणा प्रातरश्विना॥",
    meaning: "At dawn, we invoke Agni, Indra, Mitra, Varuna, and the Ashvins for blessings.",
    source: "ऋग्वेद 1.142.1 (Pratahkalin Mantra)"
  },
  {
    text: "ॐ यज्ञाग्निं प्रातरिन्द्रं हवामहे।",
    meaning: "We invoke the sacred fire and Indra in the morning.",
    source: "ऋग्वेद 1.142.1"
  },
  {
    text: "ॐ क्रिण्वन्तो विश्वमार्यम्।",
    meaning: "Make the entire world noble (Arya).",
    source: "ऋग्वेद 9.63.5"
  },
  {
    text: "ॐ आत्मा वा इदमेक एवाग्र आसीत्।",
    meaning: "In the beginning, only the supreme self existed.",
    source: "बृहदारण्यक उपनिषद् 1.4.1"
  },
  {
    text: "ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै॥",
    meaning: "May He protect us both (teacher and student). May we enjoy learning together. May we work with great energy.",
    source: "कठोपनिषद् 2.1.10"
  },
  {
    text: "ॐ यज्ञायज्ञिनां पतये नमो नमः।",
    meaning: "Salutations again and again to the Lord of Sacrifice.",
    source: "यजुर्वेद 3.35"
  },
  {
    text: "ॐ अग्निर्मूर्धा दिवः ककुत्पतिः पृथिव्या अयम्।",
    meaning: "Agni is the supreme head of heaven and the king of the earth.",
    source: "ऋग्वेद 10.1.1"
  },
  {
    text: "ॐ आत्मानं रथिनं विद्धि।",
    meaning: "Know the self as the charioteer.",
    source: "कठोपनिषद् 1.3.3"
  },
  {
    text: "ॐ ऋतं च सत्यं चाभीध्यानात् तपसा योनिमाप्नुवन्ति।",
    meaning: "Through meditation on truth and righteousness, one attains the supreme goal.",
    source: "मुण्डकोपनिषद् 3.1.5"
  }
];

export default function DailyWisdom() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const regionRef = useRef(null);

  const current = useMemo(() => quotes[currentQuoteIndex], [currentQuoteIndex]);

  const todayString = useMemo(
    () =>
      new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  // Keyboard support: ← and → to navigate
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentQuoteIndex(
          (prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }
    },
    []
  );

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const getEnrichedMessage = () => {
    return `🕉️ Vaidic Wisdom for ${todayString} 🕉️

📜 Shloka:
${current.text}

💬 Meaning:
"${current.meaning}"

🧘‍♂️ Source: ${current.source}

🔸 Shared via Arya Samaj Seawoods
🌐 ${siteUrl}
📞 +91-9223344556, +91-9323022055
📧 aryasamajseawoods@gmail.com
📍 https://maps.app.goo.gl/QQUvD9oD1yWA9ps8A

#VedicWisdom #AryaSamaj #SanatanDharma #Seawoods

🕯️ Embrace Vaidic values. Share knowledge. Inspire others.`;
  };

  const openNew = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      getEnrichedMessage()
    )}`;
    openNew(url);
  };

  const shareOnX = () => {
    const text = `${current.text}\n\n"${current.meaning}" — ${current.source}\n${siteUrl}\n#VedicWisdom #AryaSamaj`;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
    openNew(url);
  };

  const shareByCopyThenOpen = (destUrl, copiedLabel) => {
    const message = getEnrichedMessage();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(message)
        .then(() => {
          alert(`${copiedLabel} copied! Paste it into your post.`);
          openNew(destUrl);
        })
        .catch(() => openNew(destUrl));
    } else {
      // Fallback if Clipboard API not available
      openNew(destUrl);
    }
  };

  const shareOnInstagram = () =>
    shareByCopyThenOpen("https://www.instagram.com/", "Quote");

  const shareOnFacebook = () =>
    shareByCopyThenOpen("https://www.facebook.com/", "Shloka");

  const shareOnLinkedIn = () =>
    shareByCopyThenOpen("https://www.linkedin.com/", "Shloka");

  const nextQuote = () =>
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);

  const prevQuote = () =>
    setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);

  // JSON-LD for SEO (Quotation)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quotation",
    text: current.text,
    inLanguage: "sa", // Sanskrit
    translationOfWork: {
      "@type": "CreativeWork",
      inLanguage: "en",
      description: current.meaning,
    },
    citation: current.source,
    publisher: {
      "@type": "Organization",
      name: "Arya Samaj Seawoods",
      url: siteUrl,
    },
    datePublished: new Date().toISOString().split("T")[0],
  };

  return (
    <section
      ref={regionRef}
      role="region"
      aria-labelledby="daily-wisdom-heading"
      tabIndex={0}
      className="relative bg-yellow-100 text-gray-900 rounded-lg shadow-lg p-6 mx-auto w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 outline-none"
    >
      {/* SEO: Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="text-center">
        <h2
          id="daily-wisdom-heading"
          className="text-2xl font-bold text-orange-700 mb-2 flex justify-center items-center"
        >
          📖 Daily Vaidik Wisdom
        </h2>

        <article aria-label="Today’s Vaidik quote" className="mt-2">
          <blockquote className="mb-2">
            <p className="text-2xl sm:text-3xl font-sans text-gray-800 font-semibold leading-snug">
              {current.text}
            </p>
          </blockquote>
          <p className="text-base sm:text-lg text-gray-700 italic">
            “{current.meaning}”
          </p>
          <footer className="text-sm text-gray-600 mt-2">
            <cite title="Scriptural source">{current.source}</cite>
          </footer>
        </article>

        <p className="mt-3 text-xs text-gray-500" aria-hidden="true">
          Use ← / → keys to browse quotes
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-3 sm:gap-4 mt-4">
        <button
          onClick={prevQuote}
          aria-label="Previous quote"
          title="Previous quote"
          className="p-2 rounded-full bg-orange-300 hover:bg-orange-500 transition focus:ring-2 focus:ring-orange-600"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={shareOnWhatsApp}
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition focus:ring-2 focus:ring-green-700"
        >
          <FaWhatsapp size={20} />
        </button>

        <button
          onClick={shareOnX}
          aria-label="Share on X (Twitter)"
          title="Share on X (Twitter)"
          className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition focus:ring-2 focus:ring-black"
        >
          <FaXTwitter size={20} />
        </button>

        <button
          onClick={shareOnInstagram}
          aria-label="Copy & open Instagram"
          title="Copy & open Instagram"
          className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition focus:ring-2 focus:ring-pink-700"
        >
          <FaInstagram size={20} />
        </button>

        <button
          onClick={shareOnFacebook}
          aria-label="Copy & open Facebook"
          title="Copy & open Facebook"
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-800"
        >
          <FaFacebook size={20} />
        </button>

        <button
          onClick={shareOnLinkedIn}
          aria-label="Copy & open LinkedIn"
          title="Copy & open LinkedIn"
          className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition focus:ring-2 focus:ring-blue-900"
        >
          <FaLinkedin size={20} />
        </button>

        <button
          onClick={nextQuote}
          aria-label="Next quote"
          title="Next quote"
          className="p-2 rounded-full bg-orange-300 hover:bg-orange-500 transition focus:ring-2 focus:ring-orange-600"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
