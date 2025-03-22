// src/components/PracticePage/Transcript.jsx
import React from "react";

const Transcript = ({ transcript, downloadTranscript, darkMode }) => (
  <div className="relative">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-white text-sm uppercase tracking-wider opacity-70 text-left">
        Your Response:
      </h3>
      {transcript && (
        <div className="flex gap-2">
          <button
            onClick={downloadTranscript}
            className="text-xs text-white/60 hover:text-white flex items-center gap-1"
            title="Download transcript"
          >
            <span>📥</span>
            <span>Download</span>
          </button>
        </div>
      )}
    </div>
    <textarea
      className={`w-full p-4 border-none rounded-md shadow-md text-gray-900 ${
        darkMode ? "bg-gray-200" : "bg-white/90"
      } focus:ring focus:ring-blue-300 transition-all min-h-32`}
      value={transcript}
      readOnly
      placeholder="Your response will appear here..."
    />
    {transcript && (
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          onClick={() => navigator.clipboard.writeText(transcript)}
          className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center"
          title="Copy to clipboard"
        >
          📋
        </button>
      </div>
    )}
  </div>
);

export default Transcript;
