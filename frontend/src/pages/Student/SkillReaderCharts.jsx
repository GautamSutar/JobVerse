import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { SectionCard } from "./SectionCard"; // Ensure this path is correct
import { FiTarget } from "react-icons/fi";

// Sample data for the chart
const data = [
  { skill: "JavaScript", level: 80, fullMark: 100 },
  { skill: "Python", level: 75, fullMark: 100 },
  { skill: "React", level: 85, fullMark: 100 },
  { skill: "Django", level: 70, fullMark: 100 },
  { skill: "SQL", level: 65, fullMark: 100 },
  { skill: "UI/UX", level: 78, fullMark: 100 },
];

// Custom Tooltip for a more polished look
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-bold text-gray-800">{`${label}`}</p>
        <p className="text-sm text-indigo-600">{`Proficiency: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

// This is a NAMED export, so it must be imported with { SkillRadarChart }
export function SkillRadarChart() {
  return (
    <SectionCard title="Skill Proficiency" icon={FiTarget}>
      <div style={{ width: "100%", height: 237 }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: "#4b5563", fontSize: 14 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Skills"
              dataKey="level"
              stroke="#4f46e5"
              fill="#4f46e5"
              fillOpacity={0.1}
              strokeWidth={2}
              activeDot={{
                r: 8,
                strokeWidth: 2,
                fill: "#fff",
                stroke: "#4f46e5",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
