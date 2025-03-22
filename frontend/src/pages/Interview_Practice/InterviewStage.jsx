// src/components/PracticePage/InterviewStage.jsx
import React from "react";
import Webcam from "react-webcam";

const InterviewStage = ({
  webcamRef,
  question,
  isRecording,
  isPaused,
  progress,
  darkMode,
}) => {
  // Define video constraints for better focus and zoom
  const videoConstraints = {
    width: 1280, // Higher resolution for better quality
    height: 720,
    facingMode: "user", // Use front-facing camera
    // Optionally, you can add zoom if supported by the device (not all browsers support this)
    zoom: 1.5, // Experimental: Zoom level (may not work in all browsers)
  };

  return (
    <div
      className={`relative mb-8 ${
        darkMode ? "bg-gray-900/50" : "bg-indigo-900/30"
      } p-6 rounded-xl shadow-inner transition-colors`}
    >
      <div className="relative flex justify-center mb-6">
        <div className="relative w-full max-w-md h-96 overflow-hidden rounded-lg shadow-lg border-2 border-white/20">
          <Webcam
            ref={webcamRef}
            className="absolute top-0 left-0 w-full h-full object-cover object-center transition-all"
            mirrored={true}
            screenshotFormat="image/jpeg"
            audio={false}
            videoConstraints={videoConstraints} // Add video constraints
          />
        </div>
        {isRecording && (
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/50 py-1 px-3 rounded-full">
            <div
              className={`w-3 h-3 bg-red-500 rounded-full ${
                isPaused ? "" : "animate-pulse"
              }`}
            ></div>
            <span className="text-white text-xs font-medium">
              {isPaused ? "PAUSED" : "REC"}
            </span>
          </div>
        )}
        {isRecording && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-black/50 py-1 px-3 rounded-full">
            <span className="text-white text-xs">Speech Rate:</span>
            <div className="h-2 bg-white/20 rounded-full flex-1">
              <div
                className={`h-full rounded-full transition-all ${
                  progress < 30
                    ? "bg-green-500"
                    : progress < 70
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${Math.min(progress * 0.8, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${
          darkMode ? "bg-gray-800/50" : "bg-white/20"
        } p-5 rounded-lg shadow-md mb-6 transform transition-colors`}
      >
        <h3 className="text-white text-sm uppercase tracking-wider mb-1 opacity-70">
          Current Question:
        </h3>
        <p className="text-xl font-semibold text-white drop-shadow-md">
          {question}
        </p>
      </div>
    </div>
  );
};

export default InterviewStage;
