// src/components/SkillCheckHomepage/CTASection.jsx
import React from "react";

const CTASection = ({ handleResumeUpload, fileInputRef, handleFileChange }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Ace Your Next Interview?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of job seekers who have improved their interview skills
          and landed their dream jobs with skillCheck.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleResumeUpload}
            className="px-8 py-4 rounded bg-white text-blue-600 font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto sm:mx-0"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Upload Resume & Start Now
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
