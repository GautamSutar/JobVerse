// src/components/PracticePage/PracticePage.jsx
import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Header from "./Header";
import SettingsPanel from "./SettingsPanel";
import QuestionCategory from "./QuestionCategory";
import InterviewStage from "./InterviewStage";
import Controls from "./Controls";
import FeedbackSection from "./FeedbackSection";
import Transcript from "./Transcript";
import Footer from "./Footer";

// Question bank
const questionBank = {
  behavioral: [
    "Tell me about yourself.",
    "What are your strengths and weaknesses?",
    "Describe a challenge you faced and how you handled it.",
    "Tell me about a time you failed and what you learned.",
    "How do you handle stress or pressure?",
  ],
  career: [
    "Why should we hire you?",
    "Where do you see yourself in 5 years?",
    "What makes you unique?",
    "Why do you want to work for this company?",
    "What are your salary expectations?",
  ],
  technical: [
    "Describe your experience with [relevant technology].",
    "How do you stay updated with the latest industry trends?",
    "Tell me about a project you're particularly proud of.",
    "How do you approach troubleshooting technical issues?",
    "Describe your ideal development environment.",
  ],
};

const allQuestions = [
  ...questionBank.behavioral,
  ...questionBank.career,
  ...questionBank.technical,
];
const powerKeywords = [
  "teamwork",
  "leadership",
  "initiative",
  "communication",
  "problem-solving",
  "adaptability",
  "collaboration",
  "results",
  "achievement",
  "success",
  "improved",
  "developed",
  "managed",
  "created",
  "implemented",
  "analyzed",
  "designed",
  "coordinated",
  "reduced",
  "increased",
];
const fillerWords = [
  "um",
  "uh",
  "like",
  "you know",
  "actually",
  "basically",
  "literally",
  "sort of",
  "kind of",
];

const PracticePage = () => {
  const [question, setQuestion] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [progress, setProgress] = useState(0);
  const [progressInterval, setProgressInterval] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [fillerWordCount, setFillerWordCount] = useState(0);
  const [keywordsUsed, setKeywordsUsed] = useState([]);
  const [showKeywordAnalysis, setShowKeywordAnalysis] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isPaused, setIsPaused] = useState(false);
  const webcamRef = useRef(null);
  const [hasScreenshot, setHasScreenshot] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

const themeClasses = darkMode
  ? "bg-gradient-to-br from-black to-gray-950 shadow-red-800/20 shadow-xl"
        : "bg-gradient-to-br from-gray-950 to-red-950 shadow-red-700/30 shadow-lg";
    

    
    
const cardClasses = darkMode
  ? "bg-gradient-to-br from-black to-blue-950 shadow-blue-800/15 shadow-xl"
  : "bg-gradient-to-br from-gray-950 to-blue-900 shadow-blue-700/20 shadow-lg";
    
    
    

  useEffect(() => {
    if (listening && startTime && !isPaused) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 1000);
      setProgressInterval(interval);
    } else {
      clearInterval(progressInterval);
    }
    return () => clearInterval(progressInterval);
  }, [listening, startTime, isPaused]);

  useEffect(() => {
    getNewQuestion();
  }, [selectedCategory]);

  useEffect(() => {
    if (transcript) {
      const lowerTranscript = transcript.toLowerCase();
      let count = 0;
      fillerWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        const matches = lowerTranscript.match(regex);
        if (matches) count += matches.length;
      });
      setFillerWordCount(count);

      const foundKeywords = powerKeywords.filter((keyword) =>
        lowerTranscript.includes(keyword.toLowerCase())
      );
      setKeywordsUsed(foundKeywords);
    }
  }, [transcript]);

  const startResponse = () => {
    setStartTime(Date.now());
    setProgress(0);
    setIsRecording(true);
    setFeedback(null);
    setFillerWordCount(0);
    setKeywordsUsed([]);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const pauseResponse = () => {
    setIsPaused(!isPaused);
    if (!isPaused) SpeechRecognition.stopListening();
    else
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const stopResponse = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    setIsPaused(false);
    clearInterval(progressInterval);
    if (startTime) {
      const seconds = ((Date.now() - startTime) / 1000).toFixed(1);
      setResponseTime(seconds);
      if (webcamRef.current) {
        const screenshotData = webcamRef.current.getScreenshot();
        setScreenshot(screenshotData);
        setHasScreenshot(true);
      }
      const responseObj = {
        question,
        transcript,
        time: seconds,
        timestamp: new Date().toISOString(),
        fillerWords: fillerWordCount,
        keywordsUsed,
      };
      setSessionHistory((prev) => [responseObj, ...prev]);
      let feedbackType = "success";
      let feedbackMsg = "Good response time! You provided a well-paced answer.";
      if (seconds < 15) {
        feedbackType = "warning";
        feedbackMsg =
          "Your answer was quite brief. Consider expanding more on your experiences.";
      } else if (seconds > 120) {
        feedbackType = "info";
        feedbackMsg =
          "Your answer was quite detailed. Consider being more concise for interviews.";
      }
      if (fillerWordCount > 10) {
        feedbackMsg += " Watch out for filler words like 'um' and 'uh'.";
        feedbackType = "warning";
      }
      if (keywordsUsed.length > 5) {
        feedbackMsg += " Great use of power keywords!";
        feedbackType = "success";
      } else if (keywordsUsed.length === 0) {
        feedbackMsg +=
          " Try to include industry-relevant keywords in your answers.";
        feedbackType = "info";
      }
      setFeedback({ message: feedbackMsg, type: feedbackType });
    }
  };

  const getNewQuestion = () => {
    resetTranscript();
    setResponseTime(null);
    setFeedback(null);
    setProgress(0);
    setFillerWordCount(0);
    setKeywordsUsed([]);
    setIsRecording(false);
    setIsPaused(false);
    setHasScreenshot(false);
    let questionsPool =
      selectedCategory === "all"
        ? allQuestions
        : questionBank[selectedCategory];
    let newQuestion;
    do {
      newQuestion =
        questionsPool[Math.floor(Math.random() * questionsPool.length)];
    } while (newQuestion === question && questionsPool.length > 1);
    setQuestion(newQuestion);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true));
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const clearHistory = () => {
    if (
      window.confirm("Are you sure you want to clear all your session history?")
    ) {
      setSessionHistory([]);
    }
  };

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `interview_answer_${new Date()
      .toISOString()
      .slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      className={`flex flex-col mt-20 items-center justify-center min-h-screen ${themeClasses} p-4 md:p-6 transition-colors duration-500`}
    >
      <div
        className={`${cardClasses} rounded-xl p-6 md:p-8 max-w-7xl w-full text-center transition-all hover:shadow-white relative`}
      >
        <Header
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          toggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
        <SettingsPanel
          showSettings={showSettings}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          volume={volume}
          setVolume={setVolume}
          clearHistory={clearHistory}
        />
        <QuestionCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          darkMode={darkMode}
        />
        <InterviewStage
          webcamRef={webcamRef}
          question={question}
          isRecording={isRecording}
          isPaused={isPaused}
          progress={progress}
          darkMode={darkMode}
        />
        <Controls
          startResponse={startResponse}
          pauseResponse={pauseResponse}
          stopResponse={stopResponse}
          getNewQuestion={getNewQuestion}
          listening={listening}
          isPaused={isPaused}
          responseTime={responseTime}
          progress={progress}
          fillerWordCount={fillerWordCount}
          keywordsUsed={keywordsUsed}
          darkMode={darkMode}
        />
        <FeedbackSection
          showTips={showTips}
          setShowTips={setShowTips}
          showKeywordAnalysis={showKeywordAnalysis}
          setShowKeywordAnalysis={setShowKeywordAnalysis}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          feedback={feedback}
          hasScreenshot={hasScreenshot}
          screenshot={screenshot}
          setHasScreenshot={setHasScreenshot}
          keywordsUsed={keywordsUsed}
          sessionHistory={sessionHistory}
          darkMode={darkMode}
        />
        <Transcript
          transcript={transcript}
          downloadTranscript={downloadTranscript}
          darkMode={darkMode}
        />
        <Footer sessionHistory={sessionHistory} />
      </div>
    </div>
  );
};

export default PracticePage;
