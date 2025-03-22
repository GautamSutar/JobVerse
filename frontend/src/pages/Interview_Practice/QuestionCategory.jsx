// src/components/PracticePage/QuestionCategory.jsx
import React from "react";

const QuestionCategory = ({
  selectedCategory,
  setSelectedCategory,
  darkMode,
}) => (
  <div className="flex flex-wrap gap-2 mb-4 justify-center">
    <button
      onClick={() => setSelectedCategory("all")}
      className={`px-3 py-1 rounded-full text-sm transition-all ${
        selectedCategory === "all"
          ? "bg-white/10 text-white font-medium"
          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
      }`}
    >
      All Questions
    </button>
    <button
      onClick={() => setSelectedCategory("behavioral")}
      className={`px-3 py-1 rounded-full text-sm transition-all ${
        selectedCategory === "behavioral"
          ? "bg-black-500 text-white font-medium"
          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
      }`}
    >
      Behavioral
    </button>
    <button
      onClick={() => setSelectedCategory("career")}
      className={`px-3 py-1 rounded-full text-sm transition-all ${
        selectedCategory === "career"
          ? darkMode
            ? "bg-gradient-to-br from-black to-gray-900 text-white font-medium shadow-yellow-500/30 shadow-xl hover:shadow-yellow-500/50"
            : "bg-gradient-to-br from-gray-900 to-yellow-700 text-white font-medium shadow-lg shadow-yellow-600/40 hover:shadow-yellow-600/60"
          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
      }`}
    >
      Career
    </button>
    <button
      onClick={() => setSelectedCategory("technical")}
      className={`px-3 py-1 rounded-full text-sm transition-all ${
        selectedCategory === "technical"
          ? "bg-blue-500 text-white font-medium"
          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
      }`}
    >
      Technical
    </button>
  </div>
);

export default QuestionCategory;
