// src/components/SkillCheckHomepage/HeroSection.jsx
import React from "react";

const HeroSection = ({
  handleResumeUpload,
  fileInputRef,
  handleFileChange,
}) => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center justify-between gap-12">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Master Your{" "}
              <span className="text-blue-600 relative">Interview Skills</span>{" "}
              with AI
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Prepare for job interviews with personalized AI-powered mock
              interviews. Get real-time feedback, improve your responses, and
              land your dream job.
            </p>

            {/* Resume Upload Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Fast-track your preparation
              </h3>
              <p className="text-gray-600 mb-4">
                Upload your resume and we'll tailor interview questions to your
                experience and target role.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleResumeUpload}
                  className="px-6 py-3 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
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
                  Upload Resume
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <button className="px-6 py-3 rounded border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="text-gray-700">✓ 30,000+ Users</div>
              <div className="text-gray-700">
                ✓ 95% Report Improved Confidence
              </div>
              <div className="text-gray-700">✓ Covers 200+ Job Roles</div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
              <img
                src="/api/placeholder/600/400"
                alt="AI Interview Preparation"
                className="rounded-lg shadow-xl relative z-10 w-full"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg z-20">
                <div className="text-center">
                  <div className="text-purple-600 font-bold text-lg">
                    AI-Powered
                  </div>
                  <div className="text-gray-800 text-sm">
                    Real-time Interview Simulation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
