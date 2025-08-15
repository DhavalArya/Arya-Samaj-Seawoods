"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { FaFire, FaShareAlt } from "react-icons/fa";

// Quiz Data
const quizData = {
  easy: [
    {
      question: "Which Veda is known as the 'Book of Knowledge'?",
      options: ["Rigveda", "Yajurveda", "Samaveda", "Atharvaveda"],
      answer: "Rigveda",
      explanation: "Rigveda is the oldest and most sacred Veda, containing hymns of knowledge.",
    },
    {
      question: "What is the meaning of the word 'Arya' in Vaidik literature?",
      options: ["Rich person", "Warrior", "Noble and righteous person", "Priest"],
      answer: "Noble and righteous person",
      explanation: "In the Vedas, 'Arya' refers to someone who is noble in conduct and character.",
    },
    {
      question: "What is the sacred sound considered the essence of the universe in Vaidik tradition?",
      options: ["Shanti", "Om", "Hari", "Ram"],
      answer: "Om",
      explanation: "‘Om’ is considered the primal sound of the universe, representing Brahman in Vaidik philosophy.",
    },
    {
      question: "Who wrote the book 'Satyarth Prakash'?",
      options: ["Swami Vivekananda", "Swami Shraddhanand", "Maharshi Dayanand Saraswati", "Tulsidas"],
      answer: "Maharshi Dayanand Saraswati",
      explanation: "Satyarth Prakash was written by Maharshi Dayanand to promote truth and Vaidik ideals.",
    },
    {
      question: "What is the message of the Panchatantra stories?",
      options: ["Warfare techniques", "Devotional hymns", "Moral lessons through animals", "Scientific inventions"],
      answer: "Moral lessons through animals",
      explanation: "Panchatantra uses stories involving animals to teach wisdom, ethics, and strategy.",
    },
    {
      question: "Who was the loyal devotee of Lord Rama known for his strength and humility?",
      options: ["Lakshman", "Bharat", "Hanuman", "Sugriv"],
      answer: "Hanuman",
      explanation: "Hanuman is revered for his devotion, selflessness, and immense strength.",
    },
    {
      question: "What was Arjuna’s weapon in the Mahabharata?",
      options: ["Trishul", "Sudharshan Chakra", "Gada", "Gandiva"],
      answer: "Gandiva",
      explanation: "Arjuna’s divine bow was named Gandiva, gifted by Agni Dev.",
    },
    {
      question: "What value does the Arya Samaj emphasize in its first principle?",
      options: ["Devotion to one God", "Worship of idols", "Earning wealth", "Pilgrimage"],
      answer: "Devotion to one God",
      explanation: "The first principle of Arya Samaj emphasizes belief in one formless, omnipresent God.",
    },
    {
      question: "In the Bhagavad Gita, who is the charioteer and guide of Arjuna?",
      options: ["Balaram", "Bhishma", "Lord Krishna", "Sanjay"],
      answer: "Lord Krishna",
      explanation: "Krishna served as Arjuna's charioteer and spiritual guide during the Kurukshetra war.",
    },
    {
      question: "What is the essence of Indian cultural greeting 'Namaste'?",
      options: ["I bow to your wealth", "I greet your family", "I bow to the divine in you", "Hello"],
      answer: "I bow to the divine in you",
      explanation: "Namaste means ‘I bow to the divine spark in you’, reflecting humility and respect.",
    },
  ],
  medium: [
    {
      question: "According to the Upanishads, what is 'Brahman'?",
      options: ["A warrior", "A mantra", "The ultimate reality", "A Vaidik sage"],
      answer: "The ultimate reality",
      explanation: "Brahman is the unchanging, infinite reality that is the source of everything, as per the Upanishads.",
    },
    {
      question: "Which Veda is primarily associated with sacrificial rituals and yajnas?",
      options: ["Rigveda", "Samaveda", "Atharvaveda", "Yajurveda"],
      answer: "Yajurveda",
      explanation: "Yajurveda contains detailed procedures and mantras for conducting yajnas (Vaidik rituals).",
    },
    {
      question: "What key message does the Bhagavad Gita teach about action?",
      options: [
        "Avoid action to achieve peace",
        "Perform action without attachment to results",
        "Focus only on results",
        "Fight to attain personal glory"
      ],
      answer: "Perform action without attachment to results",
      explanation: "Krishna advises Arjuna to focus on karma (duty) without attachment to fruits of action (Nishkama Karma).",
    },
    {
      question: "According to Satyarth Prakash, what should be the aim of education?",
      options: [
        "Securing a government job",
        "Memorizing religious texts",
        "All-round development and truth-seeking",
        "Worship rituals"
      ],
      answer: "All-round development and truth-seeking",
      explanation: "Maharshi Dayanand emphasized Vaidik education for developing intellect, morals, and truth-seeking.",
    },
    {
      question: "Which great sage composed the Yoga Sutras?",
      options: ["Vyasa", "Patanjali", "Vasistha", "Bharadvaja"],
      answer: "Patanjali",
      explanation: "Maharshi Patanjali compiled the Yoga Sutras — foundational texts on yogic philosophy and practice.",
    },
    {
      question: "In Ramayana, who was the demon disguised as a golden deer?",
      options: ["Maricha", "Ravana", "Kumbhakarna", "Indrajit"],
      answer: "Maricha",
      explanation: "Maricha disguised himself as a golden deer to help Ravana abduct Sita.",
    },
    {
      question: "What does 'Swaraj' mean in the context of Arya Samaj philosophy?",
      options: ["Foreign rule", "Independence and self-governance", "Religious conversion", "Economic power"],
      answer: "Independence and self-governance",
      explanation: "Maharshi Dayanand promoted Swaraj — both spiritual self-rule and political independence.",
    },
    {
      question: "Which Upanishad contains the famous dialogue between Nachiketa and Yama (the god of death)?",
      options: ["Katha Upanishad", "Isha Upanishad", "Chandogya Upanishad", "Mundaka Upanishad"],
      answer: "Katha Upanishad",
      explanation: "Katha Upanishad explores death and immortality through a dialogue between Nachiketa and Yama.",
    },
    {
      question: "What is the primary teaching of Panchatantra stories?",
      options: ["Political theories", "Religious rituals", "Wisdom through practical life situations", "Martial arts"],
      answer: "Wisdom through practical life situations",
      explanation: "Panchatantra imparts niti (practical wisdom) through animal stories with real-world applications.",
    },
    {
      question: "According to Gita, what is the greatest enemy of a person?",
      options: ["Pride", "Anger", "Desire", "Jealousy"],
      answer: "Desire",
      explanation: "In Gita, Krishna states that uncontrolled desire (kama) leads to anger, delusion, and ruin.",
    },
    {
      question: "Does Arya Samaj believe in caste based on birth (jaati)?",
      options: ["Yes", "No", "Only Brahmins by birth", "Not sure"],
      answer: "No",
      explanation: "Arya Samaj and Vedas define caste (Varna) based on qualities (Guna), actions (Karma), and nature — not by birth.",
    },
    {
      question: "Did Maharshi Dayanand Saraswati support blind following of Manusmriti?",
      options: ["Yes, entirely", "Only selectively after rational analysis", "No, he rejected it", "He never read it"],
      answer: "Only selectively after rational analysis",
      explanation: "Dayanand Saraswati analyzed Manusmriti critically — accepting only the parts in line with Vedas and truth.",
    },
    {
      question: "According to Satyarth Prakash, how should scriptures be interpreted?",
      options: ["By tradition", "By priests only", "With logic, grammar, and context", "Through meditation only"],
      answer: "With logic, grammar, and context",
      explanation: "Dayanand advocated scriptural understanding based on Vaidik grammar, reason, and truth.",
    }
  ],
  hard: [
    {
      question: "What does the Isha Upanishad mean when it says, 'Tena tyaktena bhunjitha'?",
      options: [
        "Enjoy the world by renouncing desire",
        "Take as much as you want from the world",
        "Renounce the world completely",
        "Live in isolation and meditate"
      ],
      answer: "Enjoy the world by renouncing desire",
      explanation: "The phrase implies enjoying the world with detachment, without greed or attachment."
    },
    {
      question: "According to Satyarth Prakash, how should Manusmriti be interpreted?",
      options: [
        "Literally, without questioning",
        "Only after logical and Vaidik validation",
        "As a mythological text",
        "Only the Brahmin caste can interpret it"
      ],
      answer: "Only after logical and Vaidik validation",
      explanation: "Swami Dayanand clearly states that any shloka in Manusmriti contradictory to the Vedas is to be rejected."
    },
    {
      question: "Which Upanishad teaches the concept of 'Neti Neti' (Not this, Not this)?",
      options: [
        "Kena Upanishad",
        "Brihadaranyaka Upanishad",
        "Taittiriya Upanishad",
        "Chandogya Upanishad"
      ],
      answer: "Brihadaranyaka Upanishad",
      explanation: "It uses 'Neti Neti' to express the indescribable nature of the Absolute Brahman."
    },
    {
      question: "What is the Arya Samaj's stance on idol worship?",
      options: [
        "Idol worship is essential for spirituality",
        "It should be done in moderation",
        "It is against the teachings of the Vedas",
        "It is optional depending on one's belief"
      ],
      answer: "It is against the teachings of the Vedas",
      explanation: "Arya Samaj believes in formless God as per the Vedas and rejects idol worship."
    },
    {
      question: "Which Mahabharata character said: 'Dharma is subtle' (Dharma Sukshma)?",
      options: [
        "Krishna",
        "Bhishma",
        "Yudhishthira",
        "Drona"
      ],
      answer: "Yudhishthira",
      explanation: "In several moments, especially during war ethics discussions, Yudhishthira emphasizes the subtlety of Dharma."
    },
    {
      question: "Which scripture contains the earliest references to the four Varnas based on qualities (Guna) and actions (Karma)?",
      options: [
        "Manusmriti",
        "Mahabharata",
        "Bhagavad Gita",
        "Rigveda"
      ],
      answer: "Bhagavad Gita",
      explanation: "Gita (4.13) declares Varna is based on Guna (qualities) and Karma (actions), not birth."
    },
    {
      question: "According to Swami Dayanand, what is the best form of education?",
      options: [
        "Religious rituals and prayers",
        "Learning Sanskrit by rote",
        "Scientific and spiritual education combined",
        "Learning caste duties from elders"
      ],
      answer: "Scientific and spiritual education combined",
      explanation: "Swami Dayanand advocated Vaidik Gurukuls that taught science, logic, and spirituality."
    },
    {
      question: "What is the origin of caste discrimination, according to Arya Samaj?",
      options: [
        "It’s based on Vedas",
        "It’s a natural human division",
        "It’s a corruption of Varna system by society",
        "It was needed in ancient times"
      ],
      answer: "It’s a corruption of Varna system by society",
      explanation: "Arya Samaj teaches that Varna is based on merit, not birth; casteism is a later social distortion."
    },
    {
      question: "What is the Panch Mahayajna concept taught by Vedas and emphasized by Arya Samaj?",
      options: [
        "Five types of fire rituals",
        "Five daily acts of service and responsibility",
        "Five ways to achieve heaven",
        "Five sacrifices made to gods"
      ],
      answer: "Five daily acts of service and responsibility",
      explanation: "They include Brahmayajna (learning), Devyajna (worship), Pitriyajna (ancestor respect), Atithiyajna (guest hospitality), and Bhutayajna (service to all beings)."
    },
    {
      question: "What is the Vaidik position on women's rights and education?",
      options: [
        "Women must be confined to domestic duties",
        "Women should not read Vedas",
        "Women were educated and wrote hymns",
        "Women should follow husband’s will"
      ],
      answer: "Women were educated and wrote hymns",
      explanation: "Women like Ghosha, Lopamudra, and Gargi composed Vaidik hymns and debated philosophy."
    },
    {
      question: "Which shloka from Bhagavad Gita is often misused to justify inaction?",
      options: [
        "Karmanye vadhikaraste",
        "Sarva dharman parityajya",
        "Yada yada hi dharmasya",
        "Satyam vada dharmam chara"
      ],
      answer: "Karmanye vadhikaraste",
      explanation: "It teaches detached action, not abandonment of duty or goals."
    },
    {
      question: "According to Arya Samaj, who is authorized to perform yajnas?",
      options: [
        "Only Brahmins",
        "Only men above 40",
        "Anyone who is learned and ethical",
        "Only Acharyas of lineage"
      ],
      answer: "Anyone who is learned and ethical",
      explanation: "Vedas do not restrict yajnas to caste; Arya Samaj democratizes it for all."
    },
    {
      question: "Which Ramayana event best reflects the ideal of respecting even a fallen enemy?",
      options: [
        "Rama's return to Ayodhya",
        "Killing of Ravana",
        "Vibhishana's surrender",
        "Performing last rites of Ravana"
      ],
      answer: "Performing last rites of Ravana",
      explanation: "Lord Rama told Lakshmana to learn from Ravana even after slaying him, showing Dharma and humility."
    },
    {
      question: "According to Vedas and Arya Samaj, what is the nature of God (Ishwar)?",
      options: [
        "With form and attributes",
        "Multiple deities",
        "Formless, omniscient, omnipotent",
        "Born from divine energy"
      ],
      answer: "Formless, omniscient, omnipotent",
      explanation: "God is Nirakar (formless) and described through attributes, not images or avatars."
    },
    {
      question: "What does 'Satyameva Jayate' from the Mundaka Upanishad truly mean?",
      options: [
        "Truth always triumphs",
        "Lies never succeed",
        "Truth is sometimes successful",
        "Only truth can lead to salvation"
      ],
      answer: "Only truth can lead to salvation",
      explanation: "‘Satyameva Jayate Nanritam’ means only truth leads to ultimate victory and moksha."
    },
  ],
};

export default function VaidikQuiz() {
  // States
  const [level, setLevel] = useState("easy");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [pastAttempts, setPastAttempts] = useState([]);

  // Memoized current quiz questions
  const currentQuiz = useMemo(() => quizData[level] || [], [level]);

  // Load streak and pastAttempts from localStorage once
  useEffect(() => {
    const savedStreak = parseInt(localStorage.getItem("vaidikStreak")) || 0;
    setStreak(savedStreak);

    const savedPastAttempts = JSON.parse(localStorage.getItem("vaidikPastAttempts")) || [];
    setPastAttempts(savedPastAttempts);
  }, []);

  // Save streak and pastAttempts to localStorage only when these change
  useEffect(() => {
    localStorage.setItem("vaidikStreak", streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("vaidikPastAttempts", JSON.stringify(pastAttempts));
  }, [pastAttempts]);

    // Restart quiz helper
  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  }, []);

  // Reset quiz whenever level changes
  useEffect(() => {
    resetQuiz();
  }, [level, resetQuiz]);

  // Handler for selecting answer
  const handleAnswer = useCallback(
    (option) => {
      if (selectedAnswer !== null) return; // Prevent multiple clicks

      setSelectedAnswer(option);

      const correctAnswer = currentQuiz[currentQuestion]?.answer;

      const isCorrect = option === correctAnswer;
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setTimeout(() => {
        if (currentQuestion + 1 < currentQuiz.length) {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedAnswer(null);
        } else {
          // Quiz finished
          setQuizFinished(true);
          setStreak((prev) => prev + 1);
          setPastAttempts((prev) => [
            ...prev,
            { score: isCorrect ? score + 1 : score, date: new Date().toLocaleDateString() },
          ]);
        }
      }, 1500);
    },
    [currentQuestion, currentQuiz, selectedAnswer, score]
  );

  // Handle restart button
  const handleRestart = useCallback(() => {
    resetQuiz();
  }, [resetQuiz]);

  // Handle share button
  const handleShare = useCallback(() => {
    const shareUrl = "https://aryasamajseawoods.co.in/#VaidikQuiz"; // Replace as needed
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Quiz link copied! Share with friends.");
    });
  }, []);

  // Disable level buttons during quiz to prevent mid-quiz level change issues
  const levelButtonsDisabled = !quizFinished && currentQuestion > 0;

  return (
    <section className="bg-orange-100 p-6 rounded-xl shadow-lg max-w-4xl mx-auto mt-10 text-center select-none">
      <h2 className="text-3xl font-bold text-orange-700 flex justify-center items-center gap-2" aria-label="Vaidik Knowledge Quiz Title">
        🕉️ Vaidik Knowledge Quiz{" "}
        {streak > 0 && <FaFire className="text-red-500 animate-pulse" aria-label="Fire icon indicating streak" />}
      </h2>
      <p className="text-gray-700 mt-2" aria-live="polite">
        🔥 Streak: {streak} attempt{streak !== 1 ? "s" : ""}
      </p>

      {/* Level Selection */}
      <div className="flex justify-center gap-3 mt-3" role="radiogroup" aria-label="Select quiz difficulty level">
        {["easy", "medium", "hard"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => !levelButtonsDisabled && setLevel(lvl)}
            className={`px-4 py-2 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700 ${
              level === lvl ? "bg-orange-700" : "bg-gray-400"
            } ${levelButtonsDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"}`}
            aria-checked={level === lvl}
            role="radio"
            disabled={levelButtonsDisabled}
            tabIndex={level === lvl ? 0 : -1}
          >
            {lvl.toUpperCase()}
          </button>
        ))}
      </div>

      {currentQuiz.length === 0 ? (
        <p className="mt-6 text-red-600 font-semibold">No questions available for this level.</p>
      ) : !quizFinished ? (
        <>
          <h3
            className="text-lg font-semibold mt-6"
            aria-live="polite"
            aria-atomic="true"
            aria-relevant="additions"
          >
            {currentQuiz[currentQuestion].question}
          </h3>

          <div className="grid grid-cols-2 gap-4 mt-4" role="list" aria-label="Answer options">
            {currentQuiz[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentQuiz[currentQuestion].answer;

              // Show green for correct, red for wrong only after selection
              let btnClass = "bg-orange-500 hover:bg-orange-600";
              if (selectedAnswer) {
                if (isCorrectAnswer) btnClass = "bg-green-500";
                else if (isSelected) btnClass = "bg-red-500";
                else btnClass = "bg-gray-400 cursor-not-allowed";
              }

              return (
                <motion.button
                  key={index}
                  className={`py-3 rounded-lg text-white font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700 ${btnClass}`}
                  disabled={!!selectedAnswer}
                  onClick={() => handleAnswer(option)}
                  whileTap={{ scale: 0.9 }}
                  aria-pressed={isSelected}
                  tabIndex={selectedAnswer ? -1 : 0}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          {selectedAnswer && (
            <p
              className="text-sm text-gray-700 mt-2 italic"
              aria-live="polite"
              aria-atomic="true"
            >
              📖 {currentQuiz[currentQuestion].explanation}
            </p>
          )}
        </>
      ) : (
        <>
          <h3
            className="text-lg font-semibold mt-6"
            aria-live="polite"
            aria-atomic="true"
          >
            🎉 Quiz Completed! Your Score: {score}/{currentQuiz.length}
          </h3>

          {/* Past Attempts Display */}
          <h4 className="text-lg font-semibold mt-4">🏆 Past Attempts</h4>
          <ul
            className="bg-gray-200 p-4 rounded-lg max-w-md mx-auto text-left"
            aria-label="Past quiz attempts"
          >
            {pastAttempts
              .slice()
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((entry, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-bold">Attempt {index + 1}</span>
                  <span className="text-gray-600">Score: {entry.score}</span>
                  <span className="text-gray-500 text-sm">{entry.date}</span>
                </li>
              ))}
          </ul>

          {/* Restart & Share */}
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
            >
              Restart Quiz
            </button>
            <button
              onClick={handleShare}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
            >
              <FaShareAlt aria-hidden="true" />
              Share
            </button>
          </div>
        </>
      )}
    </section>
  );
}
