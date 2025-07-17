import React from "react";

export default function ScoresSection() {
  const scores = {
    ats: 78,
    aptitude: 85,
    mock: 90,
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Scores Overview</h2>
      <ul className="space-y-2 text-gray-700">
        <li>
          Resume ATS Score: <span className="font-bold">{scores.ats}%</span>
        </li>
        <li>
          Aptitude Score: <span className="font-bold">{scores.aptitude}%</span>
        </li>
        <li>
          Mock Interview Score:{" "}
          <span className="font-bold">{scores.mock}%</span>
        </li>
      </ul>
    </div>
  );
}
