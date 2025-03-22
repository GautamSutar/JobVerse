// src/components/PracticePage/SettingsPanel.jsx
import React from "react";

const SettingsPanel = ({
  showSettings,
  darkMode,
  setDarkMode,
  isMuted,
  setIsMuted,
  volume,
  setVolume,
  clearHistory,
}) =>
  showSettings && (
    <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 mb-6 text-left text-white/90 animate-fadeIn">
      <h3 className="font-semibold mb-3">Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="rounded"
            />
            <span>Dark Mode</span>
          </label>
          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={isMuted}
              onChange={() => setIsMuted(!isMuted)}
              className="rounded"
            />
            <span>Mute Notifications</span>
          </label>
        </div>
        <div>
          <label className="block mb-2">
            <span className="mb-1 block">Volume</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full"
            />
          </label>
          <div className="mt-4">
            <button
              onClick={clearHistory}
              className="bg-red-600/50 hover:bg-red-600/70 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Clear Session History
            </button>
          </div>
        </div>
      </div>
    </div>
  );

export default SettingsPanel;
