import React from "react";
import { FiBriefcase, FiCode, FiCalendar, FiPlayCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SectionCard } from "./SectionCard"; // Ensure this path is correct

// A single, reusable component for the new action cards
const ActionCard = ({ title, description, icon, color, action }) => {
  const IconComponent = icon;
  const colors = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      hoverBg: "hover:bg-blue-100",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      hoverBg: "hover:bg-green-100",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      hoverBg: "hover:bg-purple-100",
    },
    red: { bg: "bg-red-50", text: "text-red-700", hoverBg: "hover:bg-red-100" },
  };
  const selectedColor = colors[color] || colors.blue;

  return (
    <button
      onClick={action}
      className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${selectedColor.bg} ${selectedColor.hoverBg}`}
    >
      <div className={`p-2 inline-block rounded-full ${selectedColor.bg}`}>
        <IconComponent className={`h-6 w-6 ${selectedColor.text}`} />
      </div>
      <h4 className="font-bold text-gray-800 mt-3 text-md">{title}</h4>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </button>
  );
};

// Using a named export for consistency
export const JobsSection = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Explore Jobs",
      description: "Find your next career move.",
      icon: FiBriefcase,
      action: () => navigate("/explore-jobs"),
      color: "blue",
    },
    {
      title: "Internships",
      description: "Gain hands-on experience.",
      icon: FiCode,
      action: () => navigate("/internships"),
      color: "green",
    },
    {
      title: "Events",
      description: "Join workshops and webinars.",
      icon: FiCalendar,
      action: () => navigate("/events"),
      color: "purple",
    },
    {
      title: "Live Sessions",
      description: "Learn from industry experts.",
      icon: FiPlayCircle,
      action: () => navigate("/live-sessions"),
      color: "red",
    },
  ];

  return (
    <SectionCard title="Start Your Journey" icon={FiBriefcase}>
      <p className="text-sm cursor-pointer text-gray-600 mb-6">
        Discover opportunities and events tailored for you. What would you like
        to explore today?
      </p>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <ActionCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            color={card.color}
            action={card.action}
          />
        ))}
      </div>
    </SectionCard>
  );
};
