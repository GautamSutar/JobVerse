// src/components/SkillCheckHomepage/FeatureCard.jsx
import React from "react";

const FeatureCard = ({ icon, iconColor, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div
      className={`${iconColor} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mb-4`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
