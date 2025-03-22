// src/components/SkillCheckHomepage/HowItWorksSection.jsx
import React from "react";
import Step from "./Step";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How skillCheck Works
          </h2>
          <p className="text-lg text-gray-600">
            Our simple process helps you prepare for interviews in no time
          </p>
        </div>

        <div className="space-y-12">
          <Step
            number="1"
            title="Upload Your Resume"
            description="Share your resume to get personalized interview questions based on your experience and career goals."
          />
          <Step
            number="2"
            title="Select Interview Type"
            description="Choose from behavioral, technical, or industry-specific interviews based on what you want to practice."
          />
          <Step
            number="3"
            title="Complete Mock Interview"
            description="Engage in a realistic interview with our AI interviewer who adapts questions based on your responses."
          />
          <Step
            number="4"
            title="Review Feedback & Improve"
            description="Get detailed feedback, suggested improvements, and access to sample top-rated answers to improve your performance."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
