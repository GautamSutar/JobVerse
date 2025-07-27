import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { SectionCard } from "./SectionCard"; // Make sure this path is correct
import { FiBarChart2 } from "react-icons/fi";

// Sample data for the chart
const data = [
  { date: "Jul 1", score: 70 },
  { date: "Jul 8", score: 75 },
  { date: "Jul 15", score: 80 },
  { date: "Jul 22", score: 85 },
  { date: "Jul 29", score: 82 },
  { date: "Aug 5", score: 90 },
];

// Custom Tooltip for a polished look
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 shadow-lg rounded-lg bg-white border border-gray-200">
        <p className="text-sm text-gray-500">{`Date: ${label}`}</p>
        <p className="text-md font-bold text-indigo-600">{`Score: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

// I am now using a NAMED export for consistency with the other components.
export const MockInterviewChart = () => {
  return (
    <SectionCard title="Mock Interview Score Trend" icon={FiBarChart2}>
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis
              domain={[50, 100]}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Define the gradient for the area fill */}
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* The Area under the line */}
            <Area
              type="monotone"
              dataKey="score"
              stroke="#4f46e5"
              fill="url(#colorScore)"
              strokeWidth={3}
              activeDot={{
                r: 8,
                stroke: "#4f46e5",
                fill: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
};
