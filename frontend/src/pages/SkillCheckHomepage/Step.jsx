// src/components/SkillCheckHomepage/Step.jsx
import React from "react";

const Step = ({ number, title, description }) => (
  <div className="flex gap-6">
    <div className="flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
        {number}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Step;
