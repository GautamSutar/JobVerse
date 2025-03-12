import React from 'react'

function About() {
  return (
    <>
     <div className="bg-grey-100 text-white min-h-screen flex flex-col items-center py-16 px-6 mt-12">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-6">About Skill Check</h1>
        <p className="text-lg text-gray-900 leading-relaxed mb-10">
          Skill Check is an AI-powered interview platform designed to assist both freshers and HR professionals.
          It automates the initial rounds of interviews by generating intelligent questions tailored to job roles,
          programming languages, and tech stacks.
        </p>
      </div>
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8">
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-200 mb-3 hover:underline">For HR Professionals</h2>
          <p className="text-gray-200">
            Save valuable time with AI-driven interviews, streamline candidate screening,
            and focus on hiring the best talent efficiently.
          </p>
        </div>
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-200 mb-3 hover:underline">For Freshers</h2>
          <p className="text-gray-200">
            Gain confidence by practicing real-time AI interviews, receive instant feedback,
            and refine your skills to ace your dream job.
          </p>
        </div>
      </div>
      <div className="max-w-5xl w-full bg-blue-800 p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-semibold text-gray-200 mb-3 text-center hover:underline">Why Choose Skill Check?</h2>
        <ul className="list-disc pl-6 text-gray-200 space-y-2 text-lg">
          <li>AI-powered intelligent interview automation</li>
          <li>Customized questions based on job roles & skills</li>
          <li>Time-saving & highly efficient hiring process</li>
          <li>Realistic simulation for freshers & professionals</li>
        </ul>
      </div>
      <p className="text-center text-lg font-medium text-blue-900 mt-8">
        Elevate your interview process with Skill Check today!
      </p>
      <div>
        <button className="bg-blue-800 text-xl h-10 w-30 rounded-xl mt-3 ransition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105">Start Now!</button>
      </div>
    </div>
    </>
  )
}

export default About