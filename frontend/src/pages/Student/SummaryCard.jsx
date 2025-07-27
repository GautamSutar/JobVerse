import React from "react";

/**
 * A visually engaging summary card for displaying key statistics on the dashboard.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the statistic (e.g., "Jobs Applied").
 * @param {string | number} props.value - The value of the statistic (e.g., "3" or "85%").
 * @param {React.ElementType} props.icon - The icon component from a library like react-icons.
 * @param {string} props.color - The Tailwind CSS border color class (e.g., "border-blue-500").
 */
export function SummaryCard({ title, value, icon, color }) {
  const IconComponent = icon;

  return (
    <div
      className={`bg-white shadow-lg rounded-xl p-5 border-l-4 ${color} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex items-center gap-5">
        {/* Icon Container */}
        <div className="p-3 bg-gray-100 rounded-full">
          <IconComponent className="h-6 w-6 text-gray-800" />
        </div>

        {/* Text Content */}
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
