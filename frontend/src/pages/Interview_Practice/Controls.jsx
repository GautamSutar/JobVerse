// src/components/PracticePage/Controls.jsx
import React from "react";
import Button from "./Button";

const Controls = ({
  startResponse,
  pauseResponse,
  stopResponse,
  getNewQuestion,
  listening,
  isPaused,
  responseTime,
  progress,
  fillerWordCount,
  keywordsUsed,
  darkMode,
  transcript,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={startResponse}
          disabled={listening && !isPaused}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 ${
            listening && !isPaused
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          <span className="text-lg">🎤</span>
          <span>Start</span>
        </Button>
        {listening && (
          <Button
            onClick={pauseResponse}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 ${
              isPaused
                ? darkMode
                  ? "bg-gradient-to-br from-black to-gray-900 shadow-yellow-500/30 hover:shadow-yellow-500/50"
                  : "bg-gradient-to-br from-gray-900 to-yellow-700 shadow-yellow-600/40 hover:shadow-yellow-600/60"
                : darkMode
                ? "bg-gradient-to-br from-gray-900 to-black shadow-yellow-500/30 hover:shadow-yellow-500/50"
                : "bg-gradient-to-br from-yellow-700 to-gray-900 shadow-yellow-600/40 hover:shadow-yellow-600/60"
            } text-white`}
          >
            <span className="text-lg">{isPaused ? "▶️" : "⏸️"}</span>
            <span>{isPaused ? "Resume" : "Pause"}</span>
          </Button>
        )}
        <Button
          onClick={stopResponse}
          disabled={!listening}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 ${
            !listening
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          <span className="text-lg">⏹️</span>
          <span>Stop</span>
        </Button>
        <Button
          onClick={getNewQuestion}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95"
        >
          <span className="text-lg">🔄</span>
          <span>Next</span>
        </Button>
      </div>
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              listening && !isPaused
                ? "bg-green-400 animate-pulse"
                : isPaused
                ? "bg-yellow-400"
                : "bg-gray-400"
            }`}
          ></div>
          <p className="text-sm font-medium text-white/80">
            {listening && !isPaused
              ? "Listening..."
              : isPaused
              ? "Paused"
              : "Ready"}
          </p>
        </div>
        {responseTime && (
          <p className="text-sm text-white font-medium">
            ⏱️ <span className="font-bold">{responseTime}s</span>
          </p>
        )}
      </div>
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            progress < 30
              ? "bg-green-500"
              : progress < 60
              ? "bg-yellow-500"
              : "bg-orange-500"
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {transcript && (
        <div className="flex justify-between text-xs text-white/70 px-1">
          <span>
            Filler Words:{" "}
            <span
              className={`font-medium ${
                fillerWordCount > 10
                  ? "text-red-300"
                  : fillerWordCount > 5
                  ? "text-yellow-300"
                  : "text-green-300"
              }`}
            >
              {fillerWordCount}
            </span>
          </span>
          <span>
            Keywords:{" "}
            <span className="font-medium text-blue-300">
              {keywordsUsed.length}
            </span>
          </span>
        </div>
      )}
    </div>
  </div>
);

export default Controls;
