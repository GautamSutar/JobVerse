// src/components/PracticePage/Header.jsx
import React from "react";

const Header = ({
  showSettings,
  setShowSettings,
  toggleFullscreen,
  isFullscreen,
}) => (
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-3xl font-bold text-white drop-shadow-lg flex items-center">
      🎤 <span className="ml-2">AI Mock Interview</span>
    </h1>
    <div className="flex gap-2">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
        title="Settings"
      >
        ⚙️
      </button>
      <button
        onClick={toggleFullscreen}
        className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? "↙️" : "↗️"}
      </button>
    </div>
  </div>
);

export default Header;
