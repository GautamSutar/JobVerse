import React from "react";

function About() {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-6xl w-full text-center">
        <div className="mb-8">
          <img
            src="https://via.placeholder.com/150"
            alt="Skill Check Logo"
            className="mx-auto rounded-full"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 leading-tight">
          About Skill Check
        </h1>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
          Skill Check is an advanced AI-powered interview platform designed to
          empower both HR professionals and freshers. It automates initial
          interview rounds by generating tailored, intelligent questions based
          on job roles, programming languages, and tech stacks, streamlining the
          hiring process.
        </p>
      </div>
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-black hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3 hover:underline">
            For HR Professionals
          </h2>
          <p className="text-gray-700">
            Maximize efficiency with AI-driven interviews. Streamline candidate
            screening and focus on securing top talent with a time-saving,
            data-driven approach.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-black hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3 hover:underline">
            For Freshers
          </h2>
          <p className="text-gray-700">
            Build confidence through realistic AI interview simulations. Receive
            instant, actionable feedback to hone your skills and excel in your
            career journey.
          </p>
        </div>
      </div>
      <div className="max-w-6xl w-full bg-white p-6 rounded-lg shadow-black mb-12">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center hover:underline">
          Why Choose Skill Check?
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-3 text-base md:text-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <li>AI-powered intelligent interview automation</li>
          <li>Customized questions aligned with job roles & skills</li>
          <li>Highly efficient, time-saving hiring process</li>
          <li>Realistic simulation for both freshers and professionals</li>
        </ul>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-blue-900 mb-6">
          Elevate your interview experience with Skill Check today!
        </p>
        <button className="bg-blue-900 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default About;
