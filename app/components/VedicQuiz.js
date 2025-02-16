"use client";
import { useState, useEffect } from "react";
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
  ],
  medium: [
    {
      question: "Which Veda is primarily about music & chants?",
      options: ["Yajurveda", "Samaveda", "Atharvaveda", "Rigveda"],
      answer: "Samaveda",
      explanation: "Samaveda contains hymns that are sung as musical chants.",
    },
  ],
  hard: [
    {
      question: "Which Upanishad is considered the most important?",
      options: ["Chandogya", "Brihadaranyaka", "Kena", "Isha"],
      answer: "Brihadaranyaka",
      explanation: "Brihadaranyaka Upanishad contains deep spiritual and philosophical teachings.",
    },
  ],
};

export default function VedicQuiz() {
  const [level, setLevel] = useState("easy");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // Load Streak & Leaderboard from LocalStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem("vedicStreak") || 0;
    setStreak(parseInt(savedStreak));

    const savedLeaderboard = JSON.parse(localStorage.getItem("vedicLeaderboard")) || [];
    setLeaderboard(savedLeaderboard);
  }, []);

  // Handle Answer Selection
  const handleAnswer = (option) => {
    setSelectedAnswer(option);

    setTimeout(() => {
      let newScore = score;
      if (option === quizData[level][currentQuestion].answer) {
        newScore++;
        setScore(newScore);
      }

      if (currentQuestion + 1 < quizData[level].length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);

        // Save Streak
        setStreak(streak + 1);
        localStorage.setItem("vedicStreak", streak + 1);

        // Save Leaderboard Locally
        const newLeaderboard = [...leaderboard, { score: newScore, date: new Date().toLocaleDateString() }];
        setLeaderboard(newLeaderboard);
        localStorage.setItem("vedicLeaderboard", JSON.stringify(newLeaderboard));
      }
    }, 1500);
  };

  // Restart Quiz
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  // Share Quiz Link
  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert("Quiz link copied! Share with friends.");
  };

  return (
    <section className="bg-orange-100 p-6 rounded-xl shadow-lg max-w-4xl mx-auto mt-10 text-center">
      <h2 className="text-3xl font-bold text-orange-700 flex justify-center items-center gap-2">
        🕉️ Vedic Knowledge Quiz {streak > 0 && <FaFire className="text-red-500 animate-pulse" />}
      </h2>
      <p className="text-gray-700 mt-2">🔥 Streak: {streak} attempts</p>

      {/* Level Selection */}
      <div className="flex justify-center gap-3 mt-3">
        {["easy", "medium", "hard"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              level === lvl ? "bg-orange-700" : "bg-gray-400"
            }`}
          >
            {lvl.toUpperCase()}
          </button>
        ))}
      </div>

      {!quizFinished ? (
        <>
          <h3 className="text-lg font-semibold mt-6">{quizData[level][currentQuestion].question}</h3>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {quizData[level][currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                className={`py-3 rounded-lg text-white font-semibold transition-all ${
                  selectedAnswer
                    ? option === quizData[level][currentQuestion].answer
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
                disabled={selectedAnswer}
                onClick={() => handleAnswer(option)}
                whileTap={{ scale: 0.9 }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {selectedAnswer && (
            <p className="text-sm text-gray-700 mt-2 italic">
              📖 {quizData[level][currentQuestion].explanation}
            </p>
          )}
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mt-6">🎉 Quiz Completed! Your Score: {score}/{quizData[level].length}</h3>
          
          {/* Leaderboard Display */}
          <h4 className="text-lg font-semibold mt-4">🏆 Leaderboard</h4>
          <ul className="bg-gray-200 p-4 rounded-lg max-w-md mx-auto text-left">
            {leaderboard
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
          <button onClick={handleRestart} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg">
            Restart Quiz
          </button>
          <button onClick={handleShare} className="bg-green-600 text-white px-4 py-2 mt-2 rounded-lg ml-2">
            <FaShareAlt /> Share
          </button>
        </>
      )}
    </section>
  );
}
