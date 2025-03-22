// src/components/SkillCheckHomepage/FeaturesSection.jsx
import React from "react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose skillCheck?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform offers everything you need to ace your next
            interview
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="AI"
            iconColor="bg-blue-600"
            title="AI-Powered Interviews"
            description="Experience realistic interviews with our advanced AI that adapts to your responses, just like a real interviewer would."
          />
          <FeatureCard
            icon="📊"
            iconColor="bg-purple-600"
            title="Detailed Feedback"
            description="Get comprehensive analysis of your answers, communication style, and areas for improvement after each practice session."
          />
          <FeatureCard
            icon="🎯"
            iconColor="bg-cyan-500"
            title="Role-Specific Questions"
            description="Practice with questions tailored to your industry, job role, and experience level for the most relevant preparation."
          />
          <FeatureCard
            icon="📈"
            iconColor="bg-green-600"
            title="Progress Tracking"
            description="Monitor your improvement over time with detailed performance metrics and suggested focus areas."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
