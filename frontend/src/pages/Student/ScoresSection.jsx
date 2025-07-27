import React from "react";
import { SectionCard } from "./SectionCard";
import { FiTrendingUp } from "react-icons/fi";

// A single, reusable component for displaying a score with a progress bar
const ScoreItem = ({ label, score, color }) => {
  // Determine the background color class based on the 'color' prop
  const bgColorClass =
    {
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      indigo: "bg-indigo-500",
    }[color] || "bg-gray-500";

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className={`text-sm font-bold text-${color}-600`}>{score}%</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${bgColorClass} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export function ScoresSection() {
  const scores = {
    ats: 78,
    aptitude: 85,
    mock: 90,
  };

  return (
    <SectionCard title="Scores Overview" icon={FiTrendingUp}>
      <div className="space-y-6">
        <ScoreItem label="Resume ATS Score" score={scores.ats} color="yellow" />
        <ScoreItem
          label="Aptitude Test"
          score={scores.aptitude}
          color="indigo"
        />
        <ScoreItem label="Mock Interview" score={scores.mock} color="green" />
      </div>
    </SectionCard>
  );
}
