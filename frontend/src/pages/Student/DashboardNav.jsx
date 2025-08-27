import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiCode,
  FiCalendar,
  FiPlayCircle,
  FiMic,
} from "react-icons/fi";

const NavButton = ({ title, icon, color, action }) => {
  const IconComponent = icon;
  return (
    <button
      onClick={action}
      className={`flex items-center cursor-pointer justify-center w-full p-3 rounded-xl shadow-md transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1 ${color}`}
    >
      <IconComponent className="h-5 w-5 mr-2 text-white" />
      <span className="font-semibold  text-white text-sm">{title}</span>
    </button>
  );
};

export const DashboardNav = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      title: "Explore Jobs",
      icon: FiBriefcase,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => navigate("/explore-jobs"),
    },
    {
      title: "Internships",
      icon: FiCode,
      color: "bg-green-500 hover:bg-green-600",
      action: () => navigate("/internships"),
    },
    {
      title: "Live Events",
      icon: FiCalendar,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => navigate("/events"),
    },
    {
      title: "Practice",
      icon: FiPlayCircle,
      color: "bg-red-500 hover:bg-red-600",
      action: () => navigate("/aptitude"),
    },
    {
      title: "Live Interview",
      icon: FiMic,
      color: "bg-yellow-500 hover:bg-yellow-600",
      action: () => navigate("/live-interview"),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg mb-8">
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-5 gap-4">
        {navItems.map((item) => (
          <NavButton
            key={item.title}
            title={item.title}
            icon={item.icon}
            color={item.color}
            action={item.action}
          />
        ))}
      </div>
    </div>
  );
};
