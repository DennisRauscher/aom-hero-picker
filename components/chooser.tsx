"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Swords,
  Shield,
  Coins,
  Anchor,
  Map,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import positionsData from "@/data/positions.json";
import godsData from "@/data/gods.json";
import { LegalInfo } from "@/components/LegalInfo";
import { GodSkills } from "./GodSkills";
import { EmailPopup } from "./EmailPopup";

interface Answer {
  text: string;
  points: Record<string, number>;
}

interface Question {
  question: string;
  answers: Answer[];
}

interface God {
  id: number;
  name: string;
  pros: string[];
  cons: string[];
  artwork: string;
  counters: number[];
  counteredBy: number[];
  guides: {
    title: string;
    link: string;
  }[];
  metrics: {
    militaryStrength: number;
    economicGrowth: number;
    defensiveCapabilities: number;
    aggressionEarlyGamePower: number;
    mobilityMapControl: number;
    godPowerEffectiveness: number;
    mythUnitStrength: number;
    navalPower: number;
    scoutingVision: number;
    lateGamePotential: number;
  };
}

const questions: Question[] = positionsData.questions;
const gods: God[] = godsData.gods;
const questionIcons = [Swords, Shield, Coins, Anchor, Map];

export function AgeOfMythologyChooser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [godScores, setGodScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);
  const [selectedGod, setSelectedGod] = useState<God | null>(null);
  const [secondBestGod, setSecondBestGod] = useState<God | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBuilds, setShowBuilds] = useState(false);
  const [selectedBuild, setSelectedBuild] = useState<string | null>(null);
  const [showLegalInfo, setShowLegalInfo] = useState<
    "impressum" | "privacy" | "terms" | null
  >(null);

  const [showEmailPopup, setShowEmailPopup] = useState(false);

  useEffect(() => {
    const godName = searchParams.get("god");
    if (godName) {
      const god = gods.find(
        (g) => g.name.toLowerCase() === godName.toLowerCase()
      );
      if (god) {
        setResult(god.name);
        setSelectedGod(god);
        // Check if the popup has been shown before
        const popupShown = localStorage.getItem("emailPopupShown");
        if (!popupShown) {
          setTimeout(() => setShowEmailPopup(true), 1000);
        }
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const godName = searchParams.get("god");
    if (godName) {
      const god = gods.find(
        (g) => g.name.toLowerCase() === godName.toLowerCase()
      );
      if (god) {
        setResult(god.name);
        setSelectedGod(god);
      }
    }
  }, [searchParams]);

  const handleAnswer = (answer: Answer) => {
    setIsLoading(true);
    const newScores = { ...godScores };
    Object.entries(answer.points).forEach(([god, points]) => {
      newScores[god] = (newScores[god] || 0) + points;
    });
    setGodScores(newScores);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const sortedGods = Object.entries(newScores).sort(
          (a, b) => b[1] - a[1]
        );
        const winner = sortedGods[0][0];
        const runnerUp = sortedGods[1][0];
        setResult(winner);
        setSelectedGod(gods.find((god) => god.name === winner) || null);
        setSecondBestGod(gods.find((god) => god.name === runnerUp) || null);
        router.push(`?god=${encodeURIComponent(winner)}`);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleEmailPopupClose = () => {
    setShowEmailPopup(false);
    localStorage.setItem("emailPopupShown", "true");
  };

  const handleEmailSubmissionSuccess = () => {
    setShowEmailPopup(false);
    localStorage.setItem("emailPopupShown", "true");
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setGodScores({});
    setResult(null);
    setSelectedGod(null);
    setSecondBestGod(null);
    setShowBuilds(false);
    setSelectedBuild(null);
    router.push("/");
  };

  const selectGod = (god: God) => {
    setResult(god.name);
    setSelectedGod(god);
    setShowBuilds(false);
    setSelectedBuild(null);
    router.push(`?god=${encodeURIComponent(god.name)}`);
  };

  const renderGodCircles = (godIds: number[], title: string) => (
    <div className="mt-4">
      <h4 className="text-lg sm:text-xl font-semibold mb-2 text-yellow-300">
        {title}:
      </h4>
      <div className="flex flex-wrap gap-2">
        {godIds.map((id) => {
          const god = gods.find((g) => g.id === id);
          return god ? (
            <motion.div
              key={god.id}
              className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-yellow-400 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => selectGod(god)}
            >
              <Image
                src={god.artwork ? "/" + god.artwork : "/placeholder.png"}
                alt={god.name}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          ) : null;
        })}
      </div>
    </div>
  );

  const QuestionIcon = questionIcons[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-2 sm:p-4">
      <AnimatePresence>
        {showEmailPopup && (
          <EmailPopup onClose={handleEmailPopupClose} onSubmissionSuccess={handleEmailSubmissionSuccess}/>
        )}
      </AnimatePresence>
      <div className="w-full max-w-4xl bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 text-yellow-400 tracking-wide">
            AoM: God Chooser
          </h1>
          <AnimatePresence mode="wait">
            {result && selectedGod ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-yellow-300">
                  Your Chosen God is:
                </h2>
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-yellow-400 drop-shadow-glow">
                  {result}
                </p>
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg"
                  >
                    <Image
                      src={
                        selectedGod.artwork
                          ? "/" + selectedGod.artwork
                          : "/placeholder.png"
                      }
                      alt={selectedGod.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                  <div className="text-left max-w-sm sm:max-w-none">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-green-400">
                      Strengths:
                    </h3>
                    <ul className="list-none space-y-1 sm:space-y-2">
                      {selectedGod.pros.map((pro, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            duration: 0.3,
                          }}
                          className="flex items-center text-sm sm:text-base text-white"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
                          <span>{pro}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <h3 className="text-xl sm:text-2xl font-semibold mt-4 mb-2 text-red-400">
                      Weaknesses:
                    </h3>
                    <ul className="list-none space-y-1 sm:space-y-2">
                      {selectedGod.cons.map((con, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.5 + index * 0.1,
                            duration: 0.3,
                          }}
                          className="flex items-center text-sm sm:text-base text-white"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
                          <span>{con}</span>
                        </motion.li>
                      ))}
                    </ul>
                    {renderGodCircles(selectedGod.counters, "Gods You Counter")}
                    {renderGodCircles(
                      selectedGod.counteredBy,
                      "Gods That Counter You"
                    )}
                  </div>
                </div>
                <GodSkills metrics={selectedGod.metrics} />
                <motion.button
                  onClick={() => setShowBuilds(!showBuilds)}
                  className="mt-4 mr-8 px-4 sm:px-6 py-2 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showBuilds ? "Hide Builds" : "See Builds"}
                </motion.button>
                {showBuilds && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 space-y-2"
                  >
                    {selectedGod.guides.map((guide, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setSelectedBuild(guide.link)}
                        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition duration-300 text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {guide.title}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
                {secondBestGod && (
                  <div className="mt-6 sm:mt-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-300">
                      Second Best Option:
                    </h3>
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg mr-4 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => selectGod(secondBestGod)}
                      >
                        <Image
                          src={
                            secondBestGod.artwork
                              ? "/" + secondBestGod.artwork
                              : "/placeholder.png"
                          }
                          alt={secondBestGod.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </motion.div>
                      <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                        {secondBestGod.name}
                      </p>
                    </div>
                  </div>
                )}
                <motion.button
                  onClick={resetQuiz}
                  className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Again
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <QuestionIcon className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 mr-3 sm:mr-4" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    {questions[currentQuestion].question}
                  </h2>
                </div>
                <div className="flex flex-col space-y-3 sm:space-y-4">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(answer)}
                      className="px-4 sm:px-6 py-3 sm:py-4 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600 transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      <span>{answer.text}</span>
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                  ))}
                </div>
                <div className="mt-6 sm:mt-8 flex justify-between items-center">
                  <motion.button
                    onClick={() =>
                      setCurrentQuestion(Math.max(0, currentQuestion - 1))
                    }
                    className="px-3 sm:px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 text-sm sm:text-base"
                    disabled={currentQuestion === 0 || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    Previous
                  </motion.button>
                  <span className="text-base sm:text-lg font-semibold text-yellow-300">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-4 text-xs sm:text-sm text-gray-300 flex space-x-4">
        <button
          onClick={() => setShowLegalInfo("impressum")}
          className="hover:text-white transition-colors"
        >
          Impressum
        </button>
        <button
          onClick={() => setShowLegalInfo("privacy")}
          className="hover:text-white transition-colors"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setShowLegalInfo("terms")}
          className="hover:text-white transition-colors"
        >
          Terms of Use
        </button>
      </div>
      {selectedBuild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b">
              <h3 className="text-lg sm:text-xl font-bold">Build Guide</h3>
              <button
                onClick={() => setSelectedBuild(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <div className="p-2 sm:p-4 h-[60vh] sm:h-[80vh] overflow-y-auto">
              <iframe
                src={selectedBuild}
                className="w-full h-full border-0"
                title="Build Guide"
              />
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showLegalInfo && (
          <LegalInfo
            type={showLegalInfo}
            onClose={() => setShowLegalInfo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
