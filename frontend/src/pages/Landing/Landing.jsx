import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardHover = {
  whileHover: { scale: 1.05, rotate: [0, 2, 0], boxShadow: '0px 0px 12px rgba(0,0,0,0.3)' },
  whileTap: { scale: 0.98 },
};

const progressVariant = {
  hidden: { width: '0%' },
  visible: width => ({ 
    width, 
    transition: { duration: 1.5, ease: 'easeOut', delay: width.delay } 
  }),
};

const Landing = () => {
  return (
    <div className="font-sans w-full">
      {/* NAVBAR */}
     
        <nav className="flex items-center justify-between py-4 px-6">
          {/* Logo / Brand */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInDown}
            className="text-2xl font-bold text-white"
          >
            MockInterviewer
          </motion.div>
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 text-white font-medium">
            <motion.li initial="hidden" animate="visible" variants={fadeInDown} className="hover:underline cursor-pointer">
              Features
            </motion.li>
            <motion.li initial="hidden" animate="visible" variants={fadeInDown} className="hover:underline cursor-pointer">
              Pricing
            </motion.li>
            <motion.li initial="hidden" animate="visible" variants={fadeInDown} className="hover:underline cursor-pointer">
              About
            </motion.li>
            <motion.li initial="hidden" animate="visible" variants={fadeInDown} className="hover:underline cursor-pointer">
              Resources
            </motion.li>
            <motion.li initial="hidden" animate="visible" variants={fadeInDown} className="hover:underline cursor-pointer">
              Login
            </motion.li>
            <motion.li initial="hidden" animate="visible" variants={fadeInDown}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
                Sign Up
              </button>
            </motion.li>
          </ul>
          {/* Mobile Menu Icon */}
          <div className="md:hidden text-white">
            <svg
              className="w-6 h-6 cursor-pointer"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </nav>

      {/* HERO SECTION with Background Video */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          src="/assets/images/3125448-uhd_3840_2160_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Blue Overlay for Contrast */}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>
        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4 max-w-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md"
          >
            Ace Your Interview with AI-Powered Mock Sessions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="text-base md:text-lg lg:text-xl mb-8 drop-shadow-sm"
          >
            Practice real interview scenarios, receive instant feedback, and improve your skills—all through our AI-driven mock interview platform.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.button {...cardHover} className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transition transform">
              Start Practicing
            </motion.button>
            <motion.button {...cardHover} className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition transform">
              Book a Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-8"
          >
            How It Works
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            {/* Step 1 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <div className="text-5xl mb-3 text-blue-600">1</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Set Your Interview Goals</h3>
              <p className="text-blue-700">
                Define the role, skills, and experience you want to practice.
              </p>
            </motion.div>
            {/* Step 2 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <div className="text-5xl mb-3 text-blue-600">2</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Engage in AI Interviews</h3>
              <p className="text-blue-700">
                Our AI simulates real interview scenarios tailored to your goals.
              </p>
            </motion.div>
            {/* Step 3 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <div className="text-5xl mb-3 text-blue-600">3</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Receive Instant Feedback</h3>
              <p className="text-blue-700">
                Analyze your performance with data-driven insights and tips.
              </p>
            </motion.div>
            {/* Step 4 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center">
              <div className="text-5xl mb-3 text-blue-600">4</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-900">Improve and Succeed</h3>
              <p className="text-blue-700">
                Practice continuously to master your interview skills.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-8"
          >
            Key Features
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            {/* Feature Card 1 */}
            <motion.div variants={fadeInUp} {...cardHover} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition">
              <div className="text-5xl mb-3">
                <span role="img" aria-label="Realistic Simulation" className="text-blue-600">🎤</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Realistic Simulation</h3>
              <p className="text-blue-700 text-center">
                Engage in lifelike interview scenarios powered by advanced AI.
              </p>
            </motion.div>
            {/* Feature Card 2 */}
            <motion.div variants={fadeInUp} {...cardHover} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition">
              <div className="text-5xl mb-3">
                <span role="img" aria-label="Instant Feedback" className="text-blue-600">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Instant Feedback</h3>
              <p className="text-blue-700 text-center">
                Get real-time analysis and actionable insights after each session.
              </p>
            </motion.div>
            {/* Feature Card 3 */}
            <motion.div variants={fadeInUp} {...cardHover} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition">
              <div className="text-5xl mb-3">
                <span role="img" aria-label="Customizable Experience" className="text-blue-600">🎛</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Customizable Experience</h3>
              <p className="text-blue-700 text-center">
                Tailor your mock interview sessions to match various industries and roles.
              </p>
            </motion.div>
            {/* Feature Card 4 */}
            <motion.div variants={fadeInUp} {...cardHover} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition">
              <div className="text-5xl mb-3">
                <span role="img" aria-label="Adaptive Learning" className="text-blue-600">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Adaptive Learning</h3>
              <p className="text-blue-700 text-center">
                Our system adjusts to your progress to provide personalized practice.
              </p>
            </motion.div>
            {/* Feature Card 5 */}
            <motion.div variants={fadeInUp} {...cardHover} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition">
              <div className="text-5xl mb-3">
                <span role="img" aria-label="Custom Reports" className="text-blue-600">📝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Custom Reports</h3>
              <p className="text-blue-700 text-center">
                Detailed analytics and reports to track your improvement over time.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROGRESS TRACKER / INTERVIEW SIMULATION SECTION */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12"
          >
            Interview Simulation & Progress Tracker
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Simulation Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="bg-blue-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-4">AI Interview Simulation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Hello, I'm your virtual interviewer. Are you ready to start?</p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Yes, I'm ready. Let's begin.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Great! Can you tell me about a time when you overcame a challenge?</p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">I faced a major issue with project delays, but I managed to streamline processes.</p>
                  </div>
                </div>
              </div>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105">
                Start Simulation
              </button>
            </motion.div>
            {/* Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="bg-blue-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Your Performance Metrics</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-blue-700">Confidence Score</p>
                  <div className="w-full bg-blue-200 rounded-full h-4 mt-1">
                    <motion.div
                      custom={{ delay: 0 }}
                      variants={progressVariant}
                      initial="hidden"
                      animate="visible"
                      style={{ width: '80%' }}
                      className="bg-blue-600 h-4 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Response Clarity</p>
                  <div className="w-full bg-blue-200 rounded-full h-4 mt-1">
                    <motion.div
                      custom={{ delay: 0.2 }}
                      variants={progressVariant}
                      initial="hidden"
                      animate="visible"
                      style={{ width: '70%' }}
                      className="bg-blue-600 h-4 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Overall Performance</p>
                  <div className="w-full bg-blue-200 rounded-full h-4 mt-1">
                    <motion.div
                      custom={{ delay: 0.4 }}
                      variants={progressVariant}
                      initial="hidden"
                      animate="visible"
                      style={{ width: '75%' }}
                      className="bg-blue-600 h-4 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Technical Skills</p>
                  <div className="w-full bg-blue-200 rounded-full h-4 mt-1">
                    <motion.div
                      custom={{ delay: 0.6 }}
                      variants={progressVariant}
                      initial="hidden"
                      animate="visible"
                      style={{ width: '85%' }}
                      className="bg-blue-600 h-4 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Communication</p>
                  <div className="w-full bg-blue-200 rounded-full h-4 mt-1">
                    <motion.div
                      custom={{ delay: 0.8 }}
                      variants={progressVariant}
                      initial="hidden"
                      animate="visible"
                      style={{ width: '90%' }}
                      className="bg-blue-600 h-4 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition transform hover:scale-105">
                Analyze My Performance
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inline Styles for Animated Gradient Background */}
      <style>{`
        .bg-animated {
          background: linear-gradient(45deg, #1e3a8a, #1e40af, #1e40af, #1e3a8a);
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
        }
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Landing;