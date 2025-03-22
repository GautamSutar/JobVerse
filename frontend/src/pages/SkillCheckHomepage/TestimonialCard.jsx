// src/components/SkillCheckHomepage/TestimonialCard.jsx
import React from "react";

const TestimonialCard = ({ quote, name, title, initials }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <p className="italic text-gray-600 mb-6">{quote}</p>
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold mr-4">
        {initials}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
