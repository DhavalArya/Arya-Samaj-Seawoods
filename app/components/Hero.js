"use client";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import vedicBg from "@/public/images/vedic-bg.webp";

export default function Hero({ setShowForm }) {
  const quotes = [
    "ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥",
    "सच्चाई को कोई बुझा नहीं सकता, वह अग्नि की तरह जलती है।",
    "Truth is not afraid of questioning — it shines brighter when tested.",
    "आ नो भद्राः क्रतवो यन्तु विश्वतः।",
    "Be noble. Be truthful. Be fearless.",
    "कृण्वन्तो विश्वमार्यम्।",
    "ईश्वर एक है, वही सत्य है।",
    "Discipline is the bridge between thought and transformation.",
    "वेद का ज्ञान मनुष्य को अंधकार से प्रकाश की ओर ले जाता है।",
    "Speak the truth. Do your duty. Love all creation.",
    "नर वही जो नरता निभाए।",
    "Let your actions be inspired by selflessness and service.",
    "श्रद्धा, तप, और यज्ञ ही सच्चे विकास के पथ हैं।",
    "ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते॥",
    "Serve humanity. Worship truth. Reject superstition.",
    "धर्म वह है जो सबके हित का विचार करे।",
    "Be a light — not just a lamp.",
    "जब तक जीवन है, तब तक सीखना है।",
    "ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै॥",
    "The world becomes Arya when you become one first.",
    "राष्ट्र का उत्थान व्यक्ति के चरित्र पर निर्भर करता है।",
    "Be like the sun — rise for everyone, shine without pride.",
    "ईश्वर को पाने का मार्ग कर्म है, कर्म में यज्ञ हो।",
    "ॐ शं नो मित्रः शं वरुणः शं नो भवत्वर्यमा।",
    "Live by truth, not by tradition.",
    "समाज तभी आर्य बनेगा जब मनुष्य आर्य होगा।",
    "Let knowledge purify your mind, and service purify your soul.",
    "सत्य के मार्ग पर चलना कठिन है, पर वही शाश्वत है।",
    "The Vedas teach us to live in harmony with nature and self.",
    "ॐ नमः शिवाय — परंतु शिव वही जो रचना में शिवत्व लाए।",
    "A selfless act is the truest form of prayer.",
    "भक्ति वही जो जीवन में नीति लाए।",
    "मौन वह नहीं जो शब्द रोक दे, मौन वह जो विकार रोक दे।",
    "Your inner fire must be lit by knowledge, not by noise.",
    "ॐ दीपो ज्योतिर्ज्ञानम्।",
    "Fear none, follow truth, be humble — this is Ved Marg.",
    "ह्रदय में सत्य, वाणी में प्रेम, और कर्म में न्याय हो।",
    "The divine is not found in idols, but in ideals.",
    "ज्ञान दीपक है, सेवा उसका तेल, और त्याग उसकी लौ।",
    "ॐ स्वस्ति न इन्द्रो वृद्धश्रवाः।"
  ];

  const [currentQuote, setCurrentQuote] = useState(0);
  const [isSmall, setIsSmall] = useState(false);
  const [prefersReducedMotion, setPRM] = useState(false);

  // media queries (client only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqSmall = window.matchMedia("(max-width: 640px)");
    const mqPRM = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsSmall(mqSmall.matches);
      setPRM(mqPRM.matches);
    };
    sync();
    mqSmall.addEventListener?.("change", sync);
    mqPRM.addEventListener?.("change", sync);
    return () => {
      mqSmall.removeEventListener?.("change", sync);
      mqPRM.removeEventListener?.("change", sync);
    };
  }, []);

  const shouldAnimate = !isSmall && !prefersReducedMotion;

  // Rotate quotes only when we allow motion (saves main-thread on phones)
  useEffect(() => {
    if (!shouldAnimate) return;
    const id = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldAnimate, quotes.length]);

  return (
    <>
      {/* SEO Meta & Structured Data */}
      <Head>
        <title>Arya Samaj Seawoods | Vedic Principles & Social Service</title>
        <meta
          name="description"
          content="Arya Samaj Seawoods is dedicated to spreading Vedic wisdom, truth, and social service through community events, education, and cultural initiatives."
        />
        <meta
          name="keywords"
          content="Arya Samaj, Seawoods, Vedic teachings, truth, social service, community, Sanskrit quotes"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arya Samaj Seawoods",
              url: "https://aryasamajseawoods.co.in",
              logo: "https://aryasamajseawoods.co.in/images/arya-samaj-logo.jpg",
              sameAs: [
                "https://www.facebook.com/aryasamajseawoods",
                "https://twitter.com/yourhandle",
              ],
            }),
          }}
        />
      </Head>

      <section
        // NOTE: removed any CSS background-image class to avoid double downloads
        className="relative w-full text-center pt-[120px] pb-14 text-white rounded-b-[60px] shadow-lg mt-[96px] sm:pt-[140px] sm:pb-16 sm:rounded-b-[80px] sm:mt-[120px]"
        aria-label="Hero section with rotating inspirational quotes from Arya Samaj Seawoods"
      >
        {/* LCP image — prioritized & sized for phones */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src={vedicBg}
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={55}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            placeholder="blur"
            className="object-cover opacity-40 transition-opacity duration-700"
          />
        </div>

        {/* Content: animate on desktop only (mobile paints immediately) */}
        {shouldAnimate ? (
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroContent setShowForm={setShowForm} quote={quotes[currentQuote]} />
          </motion.div>
        ) : (
          <div className="relative z-10 text-center">
            <HeroContent setShowForm={setShowForm} quote={quotes[0]} />
          </div>
        )}
      </section>
    </>
  );
}

function HeroContent({ setShowForm, quote }) {
  return (
    <>
      <h1 className="text-3xl sm:text-5xl font-bold font-merriweather drop-shadow-lg">
        Welcome to Arya Samaj Seawoods
      </h1>
      <h2 className="mt-3 text-lg sm:text-xl font-noto-serif text-[#5b2c06]" lang="sa">
        &quot;सत्यं वद। धर्मं चर।&quot;
      </h2>

      {/* Keep hover animation on desktop; renders static instantly on mobile */}
      <button
        className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 transition rounded-full text-white font-semibold shadow-lg"
        onClick={() => setShowForm(true)}
        aria-label="Join Arya Samaj Seawoods movement"
      >
        Join the Movement
        <br />
        Fill the Membership Form
      </button>

      {/* Quote (no fade on mobile) */}
      <p className="mt-6 text-base sm:text-xl font-medium italic text-[#a06a40]" lang={/[\u0900-\u097F]/.test(quote) ? "sa" : "en"}>
        {quote}
      </p>
    </>
  );
}
