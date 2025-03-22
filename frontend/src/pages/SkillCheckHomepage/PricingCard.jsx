// src/components/SkillCheckHomepage/PricingCard.jsx
import React from "react";

const PricingCard = ({
  tier,
  price,
  features,
  isPopular,
  buttonText = "Get Started",
}) => (
  <div
    className={`bg-white rounded-lg shadow-md overflow-hidden ${
      isPopular ? "ring-2 ring-blue-600 transform scale-105" : ""
    }`}
  >
    <div
      className={`p-6 ${
        isPopular ? "bg-purple-600" : "bg-blue-600"
      } text-white text-center`}
    >
      <div className="text-xl font-semibold mb-2">{tier}</div>
      <div className="text-3xl font-bold mb-1">{price}</div>
      <div className="text-sm opacity-80">per month</div>
    </div>
    <div className="p-6">
      <ul className="mb-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 rounded font-semibold transition-colors ${
          isPopular
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        }`}
      >
        {buttonText}
      </button>
    </div>
  </div>
);

export default PricingCard;
