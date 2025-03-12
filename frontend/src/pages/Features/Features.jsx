import React from 'react'
// import banner from '../assets/images/';
function Features() {
  return (
    <>
    <div className="bg-gray-100 text-white min-h-screen py-16 px-6 flex flex-col items-center mt-12">
      {/* Title Section */}
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-6">Key Features</h1>
        <p className="text-lg text-gray-900 leading-relaxed mb-6">
          Discover how Skill Check streamlines interviews using AI, ensuring an efficient and effective hiring process.
        </p>
        
        {/* Banner Image */}
        <img 
          src="/assets/images/Features/banner.png"
          alt="Skill Check Features" 
          className="w-full max-w-5xl max-h-96 rounded-lg shadow-lg mb-10"
        />
      </div>

      {/* Features Grid */}
      <div className="max-w-5xl w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Feature 1 - AI-Powered Interviews */}
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <img src="/assets/images/Features/f1.jpeg" alt="AI Interviews" className="w-full h-40 object-cover rounded-md mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-200 mb-3 hover:underline">AI-Powered Interviews</h2>
          <p className="text-gray-200">
            Experience AI-driven interview simulations with real-time intelligent questioning tailored to job roles and skills.
          </p>
        </div>

        {/* Feature 2 - Instant Feedback */}
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <img src="/assets/images/Features/f2.jpg" alt="Instant Feedback" className="w-full h-40 object-cover rounded-md mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-200 mb-3 hover:underline">Instant Feedback & Scoring</h2>
          <p className="text-gray-200">
            Get immediate AI-generated analysis of your interview performance with actionable feedback to improve.
          </p>
        </div>

        {/* Feature 3 - Customizable Interviews */}
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <img src="/assets/images/Features/f3.jpg" alt="Customizable Interviews" className="w-full h-40 object-cover rounded-md mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-200 mb-3 hover:underline">Customizable Interviews</h2>
          <p className="text-gray-200">
            HR professionals can tailor interviews based on job roles, skill levels, and industry requirements.
          </p>
        </div>

        {/* Feature 4 - Practice Mode */}
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <img src="/assets/images/Features/f4.jpg" alt="Practice Mode" className="w-full h-40 object-cover rounded-md mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-200 mb-3 hover:underline">Practice Mode for Freshers</h2>
          <p className="text-gray-200">
            Prepare for real-world interviews with AI-driven mock sessions and performance tracking.
          </p>
        </div>

        {/* Feature 5 - Candidate Screening */}
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <img src="/assets/images/Features/f5.avif" alt="Candidate Screening" className="w-full h-40 object-cover rounded-md mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-200 mb-3 hover:underline">Efficient Candidate Screening</h2>
          <p className="text-gray-300">
            Automate initial screening rounds, allowing recruiters to focus on the best candidates.
          </p>
        </div>

        {/* Feature 6 - Multi-Stack Support */}
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <img src="/assets/images/Features/f6.jpg" alt="Multi-Stack Support" className="w-full h-40 object-cover rounded-md mb-4"/>
          <h2 className="text-2xl font-semibold text-gray-200 mb-3 hover:underline">Multi-Stack Support</h2>
          <p className="text-gray-300">
            Supports various programming languages and technical stacks for versatile hiring.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12">
        <button className="bg-blue-700 text-white text-lg px-6 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-500 hover:scale-105">
          Start Now
        </button>
      </div>
    </div>
    </>
  )
}

export default Features