// src/components/PracticePage/FeedbackSection.jsx
import React from "react";

const FeedbackSection = ({
  showTips,
  setShowTips,
  showKeywordAnalysis,
  setShowKeywordAnalysis,
  showHistory,
  setShowHistory,
  feedback,
  hasScreenshot,
  screenshot,
  setHasScreenshot,
  keywordsUsed,
  sessionHistory,
  darkMode,
}) => (
  <div>
    <div className="flex gap-2 justify-center mb-3">
      <button
        onClick={() => setShowTips(!showTips)}
        className={`text-xs px-3 py-1 rounded transition-all ${
          showTips
            ? "bg-blue-600 text-white"
            : "text-white/70 bg-white/10 hover:bg-white/20"
        }`}
      >
        {showTips ? "Hide Tips" : "Show Tips"}
      </button>
      <button
        onClick={() => setShowKeywordAnalysis(!showKeywordAnalysis)}
        className={`text-xs px-3 py-1 rounded transition-all ${
          showKeywordAnalysis
            ? "bg-purple-600 text-white"
            : "text-white/70 bg-white/10 hover:bg-white/20"
        }`}
      >
        {showKeywordAnalysis ? "Hide Keywords" : "Keyword Analysis"}
      </button>
      <button
        onClick={() => setShowHistory(!showHistory)}
        className={`text-xs px-3 py-1 rounded transition-all ${
          showHistory
            ? "bg-teal-600 text-white"
            : "text-white/70 bg-white/10 hover:bg-white/20"
        }`}
      >
        {showHistory ? "Hide History" : "Session History"}
      </button>
    </div>
    {showTips && (
      <div
        className={`${
          darkMode ? "bg-gray-800/70" : "bg-indigo-800/50"
        } text-white/90 p-3 rounded-md mb-3 text-left text-sm max-h-32 overflow-y-auto`}
      >
        <h4 className="font-medium mb-1">Interview Tips:</h4>
        <ul className="list-disc pl-4 space-y-1">
          <li>Use the STAR method (Situation, Task, Action, Result)</li>
          <li>Maintain eye contact with the camera</li>
          <li>Aim for 60-90 second answers for most questions</li>
          <li>Minimize filler words like "um" and "uh"</li>
          <li>Use power keywords relevant to the position</li>
          <li>Prepare examples beforehand for common questions</li>
        </ul>
      </div>
    )}
    {showKeywordAnalysis && (
      <div
        className={`${
          darkMode ? "bg-gray-800/70" : "bg-purple-900/40"
        } text-white/90 p-3 rounded-md mb-3 text-left text-sm max-h-32 overflow-y-auto`}
      >
        <h4 className="font-medium mb-1">Power Keywords Used:</h4>
        {keywordsUsed.length > 0 ? (
          <div className="flex flex-wrap gap-1 mt-1">
            {keywordsUsed.map((keyword) => (
              <span
                key={keyword}
                className="bg-purple-500/30 px-2 py-0.5 rounded-full text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-white/60 italic">
            No power keywords detected yet.
          </p>
        )}
        <p className="text-xs mt-2 text-white/70">
          Try to include industry-relevant terms and action verbs in your
          response.
        </p>
      </div>
    )}
    {showHistory && (
      <div
        className={`${
          darkMode ? "bg-gray-800/70" : "bg-teal-900/40"
        } text-white/90 p-3 rounded-md mb-3 text-left text-sm max-h-32 overflow-y-auto`}
      >
        <h4 className="font-medium mb-1">Session History:</h4>
        {sessionHistory.length > 0 ? (
          <div className="space-y-2">
            {sessionHistory.map((item, idx) => (
              <div key={idx} className="text-xs border-b border-white/10 pb-1">
                <div className="flex justify-between">
                  <span className="font-medium truncate max-w-xs">
                    {item.question}
                  </span>
                  <span>{item.time}s</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/60 italic">No responses recorded yet.</p>
        )}
      </div>
    )}
    {feedback && (
      <div
        className={`mb-3 p-3 rounded-md text-sm text-left ${
          feedback.type === "success"
            ? "bg-green-500/20 text-green-100"
            : feedback.type === "warning"
            ? "bg-yellow-500/20 text-yellow-100"
            : "bg-blue-500/20 text-blue-100"
        }`}
      >
        {feedback.message}
      </div>
    )}
    {hasScreenshot && (
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-white/70 text-xs">Response Snapshot:</h4>
          <button
            onClick={() => setHasScreenshot(false)}
            className="text-xs text-white/60 hover:text-white/100"
          >
            Hide
          </button>
        </div>
        <img
          src={screenshot}
          alt="Response snapshot"
          className="rounded-md w-full max-h-20 object-cover border border-white/10"
        />
      </div>
    )}
  </div>
);

export default FeedbackSection;
