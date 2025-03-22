// import React, { useState, useEffect, useRef } from "react";
// import Webcam from "react-webcam";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import Button from "../Practice/Button"; // Adjust path if needed

// // Expanded question bank organized by categories
// const questionBank = {
//   behavioral: [
//     "Tell me about yourself.",
//     "What are your strengths and weaknesses?",
//     "Describe a challenge you faced and how you handled it.",
//     "Tell me about a time you failed and what you learned.",
//     "How do you handle stress or pressure?",
//   ],
//   career: [
//     "Why should we hire you?",
//     "Where do you see yourself in 5 years?",
//     "What makes you unique?",
//     "Why do you want to work for this company?",
//     "What are your salary expectations?",
//   ],
//   technical: [
//     "Describe your experience with [relevant technology].",
//     "How do you stay updated with the latest industry trends?",
//     "Tell me about a project you're particularly proud of.",
//     "How do you approach troubleshooting technical issues?",
//     "Describe your ideal development environment.",
//   ]
// };

// const allQuestions = [...questionBank.behavioral, ...questionBank.career, ...questionBank.technical];

// // Common interview keywords to track
// const powerKeywords = [
//   "teamwork", "leadership", "initiative", "communication", "problem-solving",
//   "adaptability", "collaboration", "results", "achievement", "success",
//   "improved", "developed", "managed", "created", "implemented",
//   "analyzed", "designed", "coordinated", "reduced", "increased"
// ];

// const PracticePage = () => {
//   const [question, setQuestion] = useState("");
//   const [startTime, setStartTime] = useState(null);
//   const [responseTime, setResponseTime] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [feedback, setFeedback] = useState(null);
//   const [showTips, setShowTips] = useState(false);
//   const { transcript, listening, resetTranscript } = useSpeechRecognition();
//   const [progress, setProgress] = useState(0);
//   const [progressInterval, setProgressInterval] = useState(null);
//   const [sessionHistory, setSessionHistory] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [showSettings, setShowSettings] = useState(false);
//   const [showHistory, setShowHistory] = useState(false);
//   const [fillerWordCount, setFillerWordCount] = useState(0);
//   const [keywordsUsed, setKeywordsUsed] = useState([]);
//   const [showKeywordAnalysis, setShowKeywordAnalysis] = useState(false);
//   const [volume, setVolume] = useState(50);
//   const [isPaused, setIsPaused] = useState(false);
//   const webcamRef = useRef(null);
//   const [hasScreenshot, setHasScreenshot] = useState(false);
//   const [screenshot, setScreenshot] = useState(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
  
//     const themeClasses = darkMode 
//     ? "bg-gradient-to-br from-black to-gray-900 shadow-yellow-500/30 shadow-xl" 
//     : "bg-gradient-to-br from-gray-900 to-yellow-700 shadow-lg shadow-yellow-600/40";
  

//   const cardClasses = darkMode ?
//   "bg-gradient-to-br from-black to-gray-900 shadow-yellow-500/30 shadow-xl" 
//     : "bg-gradient-to-br from-gray-900 to-yellow-700 shadow-lg shadow-yellow-600/40";
//     //"bg-gray-800/40 backdrop-blur-lg shadow-2xl" :
//    // "bg-white/15 backdrop-blur-lg shadow-2xl";

//   // Filler words to detect
//   const fillerWords = ["um", "uh", "like", "you know", "actually", "basically", "literally", "sort of", "kind of"];

//   // Progress timer for visualizing response time
//   useEffect(() => {
//     if (listening && startTime && !isPaused) {
//       const interval = setInterval(() => {
//         // Increment progress every second, max at 100%
//         setProgress((prev) => Math.min(prev + 1, 100));
//       }, 1000);
//       setProgressInterval(interval);
//     } else {
//       clearInterval(progressInterval);
//     }
    
//     return () => clearInterval(progressInterval);
//   }, [listening, startTime, isPaused]);

//   // Set random question on load
//   useEffect(() => {
//     getNewQuestion();
//   }, [selectedCategory]);

//   // Analyze transcript for filler words and keywords
//   useEffect(() => {
//     if (transcript) {
//       // Count filler words
//       let count = 0;
//       const lowerTranscript = transcript.toLowerCase();
      
//       fillerWords.forEach(word => {
//         const regex = new RegExp(`\\b${word}\\b`, 'gi');
//         const matches = lowerTranscript.match(regex);
//         if (matches) count += matches.length;
//       });
      
//       setFillerWordCount(count);
      
//       // Detect power keywords
//       const foundKeywords = powerKeywords.filter(keyword => 
//         lowerTranscript.includes(keyword.toLowerCase())
//       );
      
//       setKeywordsUsed(foundKeywords);
//     }
//   }, [transcript]);

//   const startResponse = () => {
//     setStartTime(Date.now());
//     setProgress(0);
//     setIsRecording(true);
//     setFeedback(null);
//     setFillerWordCount(0);
//     setKeywordsUsed([]);
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true, language: "en-US" });
//   };

//   const pauseResponse = () => {
//     setIsPaused(!isPaused);
//     if (!isPaused) {
//       // Pausing
//       SpeechRecognition.stopListening();
//     } else {
//       // Resuming
//       SpeechRecognition.startListening({ continuous: true, language: "en-US" });
//     }
//   };

//   const stopResponse = () => {
//     SpeechRecognition.stopListening();
//     setIsRecording(false);
//     setIsPaused(false);
//     clearInterval(progressInterval);
    
//     if (startTime) {
//       const seconds = ((Date.now() - startTime) / 1000).toFixed(1);
//       setResponseTime(seconds);
      
//       // Capture screenshot if webcam is available
//       if (webcamRef.current) {
//         const screenshotData = webcamRef.current.getScreenshot();
//         setScreenshot(screenshotData);
//         setHasScreenshot(true);
//       }
      
//       // Comprehensive feedback based on multiple factors
//       const responseObj = {
//         question,
//         transcript,
//         time: seconds,
//         timestamp: new Date().toISOString(),
//         fillerWords: fillerWordCount,
//         keywordsUsed
//       };
      
//       // Add to session history
//       setSessionHistory(prev => [responseObj, ...prev]);
      
//       // Generate feedback
//       let feedbackType = "success";
//       let feedbackMsg = "Good response time! You provided a well-paced answer.";
      
//       if (seconds < 15) {
//         feedbackType = "warning";
//         feedbackMsg = "Your answer was quite brief. Consider expanding more on your experiences.";
//       } else if (seconds > 120) {
//         feedbackType = "info";
//         feedbackMsg = "Your answer was quite detailed. Consider being more concise for interviews.";
//       }
      
//       if (fillerWordCount > 10) {
//         feedbackMsg += " Watch out for filler words like 'um' and 'uh'.";
//         feedbackType = "warning";
//       }
      
//       if (keywordsUsed.length > 5) {
//         feedbackMsg += " Great use of power keywords!";
//         feedbackType = "success";
//       } else if (keywordsUsed.length === 0) {
//         feedbackMsg += " Try to include industry-relevant keywords in your answers.";
//         feedbackType = "info";
//       }
      
//       setFeedback({
//         message: feedbackMsg,
//         type: feedbackType
//       });
//     }
//   };

//   const getNewQuestion = () => {
//     resetTranscript();
//     setResponseTime(null);
//     setFeedback(null);
//     setProgress(0);
//     setFillerWordCount(0);
//     setKeywordsUsed([]);
//     setIsRecording(false);
//     setIsPaused(false);
//     setHasScreenshot(false);
    
//     // Select questions from the appropriate category
//     let questionsPool;
//     if (selectedCategory === "all") {
//       questionsPool = allQuestions;
//     } else {
//       questionsPool = questionBank[selectedCategory];
//     }
    
//     // Ensure we get a different question
//     let newQuestion;
//     do {
//       newQuestion = questionsPool[Math.floor(Math.random() * questionsPool.length)];
//     } while (newQuestion === question && questionsPool.length > 1);
    
//     setQuestion(newQuestion);
//   };

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen().then(() => {
//         setIsFullscreen(true);
//       });
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen().then(() => {
//           setIsFullscreen(false);
//         });
//       }
//     }
//   };

//   const clearHistory = () => {
//     if (window.confirm("Are you sure you want to clear all your session history?")) {
//       setSessionHistory([]);
//     }
//   };

//   const downloadTranscript = () => {
//     const element = document.createElement("a");
//     const file = new Blob([transcript], {type: 'text/plain'});
//     element.href = URL.createObjectURL(file);
//     element.download = `interview_answer_${new Date().toISOString().slice(0,10)}.txt`;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//   };

//   return (
//     <div className={`flex flex-col  mt-20 items-center justify-center min-h-screen ${themeClasses} p-4 md:p-6 transition-colors duration-500`}>
//       <div className={`${cardClasses} rounded-xl p-6 md:p-8 max-w-4xl w-full text-center transition-all hover:shadow-blue-400/20 relative`}>
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-3xl font-bold text-white drop-shadow-lg flex items-center">
//             🎤 <span className="ml-2">AI Mock Interview</span>
//           </h1>
          
//           <div className="flex gap-2">
//             <button 
//               onClick={() => setShowSettings(!showSettings)}
//               className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
//               title="Settings"
//             >
//               ⚙️
//             </button>
//             <button 
//               onClick={toggleFullscreen}
//               className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
//               title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
//             >
//               {isFullscreen ? "↙️" : "↗️"}
//             </button>
//           </div>
//         </div>
        
//         <p className="text-blue-100 mb-2">Practice your interview skills with real-time feedback</p>
        
//         {/* Settings Panel */}
//         {showSettings && (
//           <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 mb-6 text-left text-white/90 animate-fadeIn">
//             <h3 className="font-semibold mb-3">Settings</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="flex items-center space-x-2 mb-4">
//                   <input 
//                     type="checkbox"
//                     checked={darkMode}
//                     onChange={() => setDarkMode(!darkMode)}
//                     className="rounded"
//                   />
//                   <span>Dark Mode</span>
//                 </label>
//                 <label className="flex items-center space-x-2 mb-4">
//                   <input 
//                     type="checkbox"
//                     checked={isMuted}
//                     onChange={() => setIsMuted(!isMuted)}
//                     className="rounded"
//                   />
//                   <span>Mute Notifications</span>
//                 </label>
//               </div>
//               <div>
//                 <label className="block mb-2">
//                   <span className="mb-1 block">Volume</span>
//                   <input 
//                     type="range"
//                     min="0"
//                     max="100"
//                     value={volume}
//                     onChange={(e) => setVolume(e.target.value)}
//                     className="w-full"
//                   />
//                 </label>
//                 <div className="mt-4">
//                   <button 
//                     onClick={clearHistory}
//                     className="bg-red-600/50 hover:bg-red-600/70 text-white px-3 py-1 rounded text-sm transition-colors"
//                   >
//                     Clear Session History
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Question Category Selection */}
//         <div className="flex flex-wrap gap-2 mb-4 justify-center">
//           <button 
//             onClick={() => setSelectedCategory("all")}
//             className={`px-3 py-1 rounded-full text-sm transition-all ${
//               selectedCategory === "all" 
//                 ? "bg-white/10 text-white font-medium" 
//                 : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
//             }`}
//           >
//             All Questions
//           </button>
//           <button 
//             onClick={() => setSelectedCategory("behavioral")}
//             className={`px-3 py-1 rounded-full text-sm transition-all ${
//               selectedCategory === "behavioral" 
//                 ? "bg-black-500 text-white font-medium" 
//                 : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
//             }`}
//           >
//             Behavioral
//           </button>
//           <button 
//             onClick={() => setSelectedCategory("career")}
//             className={`px-3 py-1 rounded-full text-sm transition-all ${
//               selectedCategory === "career" 
//                  ? darkMode 
//         ? "bg-gradient-to-br from-black to-gray-900 text-white font-medium shadow-yellow-500/30 shadow-xl hover:shadow-yellow-500/50"
//         : "bg-gradient-to-br from-gray-900 to-yellow-700 text-white font-medium shadow-lg shadow-yellow-600/40 hover:shadow-yellow-600/60"
//       : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
//             }`}
//           >
//             Career
//           </button>
//           <button 
//             onClick={() => setSelectedCategory("technical")}
//             className={`px-3 py-1 rounded-full text-sm transition-all ${
//               selectedCategory === "technical" 
//                 ? "bg-blue-500 text-white font-medium" 
//                 : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
//             }`}
//           >
//             Technical
//           </button>
//         </div>

//         {/* Interview Stage */}
//         <div className={`relative mb-8 ${darkMode ? "bg-gray-900/50" : "bg-indigo-900/30"} p-6 rounded-xl shadow-inner transition-colors`}>
//           {/* Webcam Section */}
//           <div className="relative flex justify-center mb-6">
//             <Webcam 
//               ref={webcamRef}
//               className="rounded-lg shadow-lg w-full max-w-md h-64 border-2 border-white/20 transition-all"
//               mirrored={true}
//               screenshotFormat="image/jpeg"
//               audio={false}
//             />
//             {isRecording && (
//               <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/50 py-1 px-3 rounded-full">
//                 <div className={`w-3 h-3 bg-red-500 rounded-full ${isPaused ? "" : "animate-pulse"}`}></div>
//                 <span className="text-white text-xs font-medium">
//                   {isPaused ? "PAUSED" : "REC"}
//                 </span>
//               </div>
//             )}
            
//             {/* Speech Rate Meter */}
//             {isRecording && (
//               <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-black/50 py-1 px-3 rounded-full">
//                 <span className="text-white text-xs">Speech Rate:</span>
//                 <div className="h-2 bg-white/20 rounded-full flex-1">
//                   <div 
//                     className={`h-full rounded-full transition-all ${
//                       progress < 30 ? "bg-green-500" : progress < 70 ? "bg-yellow-500" : "bg-red-500"
//                     }`}
//                     style={{ width: `${Math.min(progress * 0.8, 100)}%` }}
//                   ></div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Question Section */}
//           <div className={`${darkMode ? "bg-gray-800/50" : "bg-white/20"} p-5 rounded-lg shadow-md mb-6 transform transition-colors`}>
//             <h3 className="text-white text-sm uppercase tracking-wider mb-1 opacity-70">Current Question:</h3>
//             <p className="text-xl font-semibold text-white drop-shadow-md">{question}</p>
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div className="flex flex-col space-y-4">
//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-3 justify-center">
//               <Button
//                 onClick={startResponse}
//                 disabled={listening && !isPaused}
//                 className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 ${
//                   listening && !isPaused ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
//                 }`}
//               >
//                 <span className="text-lg">🎤</span>
//                 <span>Start</span>
//               </Button>
              
//               {listening && (
//                 <Button
//                   onClick={pauseResponse}
//                   className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 
//                     ${isPaused 
//                       ? darkMode 
//                         ? "bg-gradient-to-br from-black to-gray-900 shadow-yellow-500/30 hover:shadow-yellow-500/50" 
//                         : "bg-gradient-to-br from-gray-900 to-yellow-700 shadow-yellow-600/40 hover:shadow-yellow-600/60"
//                       : darkMode 
//                         ? "bg-gradient-to-br from-gray-900 to-black shadow-yellow-500/30 hover:shadow-yellow-500/50"
//                         : "bg-gradient-to-br from-yellow-700 to-gray-900 shadow-yellow-600/40 hover:shadow-yellow-600/60"
//                     } text-white`}
//                 >
//                   <span className="text-lg">{isPaused ? "▶️" : "⏸️"}</span>
//                   <span>{isPaused ? "Resume" : "Pause"}</span>
//                 </Button>
//               )}
              
//               <Button
//                 onClick={stopResponse}
//                 disabled={!listening}
//                 className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 ${
//                   !listening ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
//                 }`}
//               >
//                 <span className="text-lg">⏹️</span>
//                 <span>Stop</span>
//               </Button>
              
//               <Button
//                 onClick={getNewQuestion}
//                 className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95"
//               >
//                 <span className="text-lg">🔄</span>
//                 <span>Next</span>
//               </Button>
//             </div>
            
//             {/* Status and Time */}
//             <div className="flex justify-between items-center px-2">
//               <div className="flex items-center gap-2">
//                 <div className={`w-2 h-2 rounded-full ${
//                   listening && !isPaused ? "bg-green-400 animate-pulse" : 
//                   isPaused ? "bg-yellow-400" : "bg-gray-400"
//                 }`}></div>
//                 <p className="text-sm font-medium text-white/80">
//                   {listening && !isPaused ? "Listening..." : 
//                    isPaused ? "Paused" : "Ready"}
//                 </p>
//               </div>
//               {responseTime && (
//                 <p className="text-sm text-white font-medium">
//                   ⏱️ <span className="font-bold">{responseTime}s</span>
//                 </p>
//               )}
//             </div>
            
//             {/* Progress Bar */}
//             <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
//               <div 
//                 className={`h-full rounded-full transition-all duration-1000 ease-linear ${
//                   progress < 30 ? "bg-green-500" : progress < 60 ? "bg-yellow-500" : "bg-orange-500"
//                 }`}
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
            
//             {/* Filler Words Counter */}
//             {transcript && (
//               <div className="flex justify-between text-xs text-white/70 px-1">
//                 <span>Filler Words: <span className={`font-medium ${
//                   fillerWordCount > 10 ? "text-red-300" : 
//                   fillerWordCount > 5 ? "text-yellow-300" : "text-green-300"
//                 }`}>{fillerWordCount}</span></span>
//                 <span>Keywords: <span className="font-medium text-blue-300">{keywordsUsed.length}</span></span>
//               </div>
//             )}
//           </div>
          
//           <div>
//             {/* Tips and Resources */}
//             <div className="flex gap-2 justify-center mb-3">
//               <button 
//                 onClick={() => setShowTips(!showTips)}
//                 className={`text-xs px-3 py-1 rounded transition-all ${
//                   showTips ? "bg-blue-600 text-white" : "text-white/70 bg-white/10 hover:bg-white/20"
//                 }`}
//               >
//                 {showTips ? "Hide Tips" : "Show Tips"}
//               </button>
//               <button 
//                 onClick={() => setShowKeywordAnalysis(!showKeywordAnalysis)}
//                 className={`text-xs px-3 py-1 rounded transition-all ${
//                   showKeywordAnalysis ? "bg-purple-600 text-white" : "text-white/70 bg-white/10 hover:bg-white/20"
//                 }`}
//               >
//                 {showKeywordAnalysis ? "Hide Keywords" : "Keyword Analysis"}
//               </button>
//               <button 
//                 onClick={() => setShowHistory(!showHistory)}
//                 className={`text-xs px-3 py-1 rounded transition-all ${
//                   showHistory ? "bg-teal-600 text-white" : "text-white/70 bg-white/10 hover:bg-white/20"
//                 }`}
//               >
//                 {showHistory ? "Hide History" : "Session History"}
//               </button>
//             </div>
            
//             {/* Conditional Content based on active tab */}
//             {showTips && (
//               <div className={`${darkMode ? "bg-gray-800/70" : "bg-indigo-800/50"} text-white/90 p-3 rounded-md mb-3 text-left text-sm max-h-32 overflow-y-auto`}>
//                 <h4 className="font-medium mb-1">Interview Tips:</h4>
//                 <ul className="list-disc pl-4 space-y-1">
//                   <li>Use the STAR method (Situation, Task, Action, Result)</li>
//                   <li>Maintain eye contact with the camera</li>
//                   <li>Aim for 60-90 second answers for most questions</li>
//                   <li>Minimize filler words like "um" and "uh"</li>
//                   <li>Use power keywords relevant to the position</li>
//                   <li>Prepare examples beforehand for common questions</li>
//                 </ul>
//               </div>
//             )}
            
//             {showKeywordAnalysis && (
//               <div className={`${darkMode ? "bg-gray-800/70" : "bg-purple-900/40"} text-white/90 p-3 rounded-md mb-3 text-left text-sm max-h-32 overflow-y-auto`}>
//                 <h4 className="font-medium mb-1">Power Keywords Used:</h4>
//                 {keywordsUsed.length > 0 ? (
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     {keywordsUsed.map(keyword => (
//                       <span key={keyword} className="bg-purple-500/30 px-2 py-0.5 rounded-full text-xs">
//                         {keyword}
//                       </span>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-white/60 italic">No power keywords detected yet.</p>
//                 )}
//                 <p className="text-xs mt-2 text-white/70">
//                   Try to include industry-relevant terms and action verbs in your response.
//                 </p>
//               </div>
//             )}
            
//             {showHistory && (
//               <div className={`${darkMode ? "bg-gray-800/70" : "bg-teal-900/40"} text-white/90 p-3 rounded-md mb-3 text-left text-sm max-h-32 overflow-y-auto`}>
//                 <h4 className="font-medium mb-1">Session History:</h4>
//                 {sessionHistory.length > 0 ? (
//                   <div className="space-y-2">
//                     {sessionHistory.map((item, idx) => (
//                       <div key={idx} className="text-xs border-b border-white/10 pb-1">
//                         <div className="flex justify-between">
//                           <span className="font-medium truncate max-w-xs">{item.question}</span>
//                           <span>{item.time}s</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-white/60 italic">No responses recorded yet.</p>
//                 )}
//               </div>
//             )}
            
//             {/* Feedback */}
//             {feedback && (
//               <div className={`mb-3 p-3 rounded-md text-sm text-left ${
//                 feedback.type === "success" ? "bg-green-500/20 text-green-100" :
//                 feedback.type === "warning" ? "bg-yellow-500/20 text-yellow-100" :
//                 "bg-blue-500/20 text-blue-100"
//               }`}>
//                 {feedback.message}
//               </div>
//             )}
            
//             {/* Screenshot Preview */}
//             {hasScreenshot && (
//               <div className="mb-3">
//                 <div className="flex justify-between items-center mb-1">
//                   <h4 className="text-white/70 text-xs">Response Snapshot:</h4>
//                   <button 
//                     onClick={() => setHasScreenshot(false)}
//                     className="text-xs text-white/60 hover:text-white/100"
//                   >
//                     Hide
//                   </button>
//                 </div>
//                 <img 
//                   src={screenshot} 
//                   alt="Response snapshot" 
//                   className="rounded-md w-full max-h-20 object-cover border border-white/10"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Transcript */}
//         <div className="relative">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-white text-sm uppercase tracking-wider opacity-70 text-left">Your Response:</h3>
            
//             {transcript && (
//               <div className="flex gap-2">
//                 <button 
//                   onClick={downloadTranscript}
//                   className="text-xs text-white/60 hover:text-white flex items-center gap-1"
//                   title="Download transcript"
//                 >
//                   <span>📥</span>
//                   <span>Download</span>
//                 </button>
//               </div>
//             )}
//           </div>
          
//           <textarea
//             className={`w-full p-4 border-none rounded-md shadow-md text-gray-900 ${
//               darkMode ? "bg-gray-200" : "bg-white/90"
//             } focus:ring focus:ring-blue-300 transition-all min-h-32`}
//             value={transcript}
//             readOnly
//             placeholder="Your response will appear here..."
//           />
          
//           {transcript && (
//             <div className="absolute bottom-3 right-3 flex gap-2">
//               <button 
//                 onClick={() => navigator.clipboard.writeText(transcript)}
//                 className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center"
//                 title="Copy to clipboard"
//               >
//                 📋
//               </button>
//             </div>
//           )}
//         </div>
        
//         {/* Footer */}
//         <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50 flex justify-between">
//           <span>AI Interview Practice Tool</span>
//           <span>{sessionHistory.length} responses recorded this session</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PracticePage;