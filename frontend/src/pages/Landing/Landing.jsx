import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiCpu,
  FiBarChart2,
  FiZap,
  FiChevronRight,
  FiAward,
  FiMessageSquare,
  FiTrendingUp,
  FiSettings,
} from "react-icons/fi";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// --- Main Landing Page Component ---
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="font-sans bg-white text-gray-800">
      {/* Navbar has been removed from here */}
      <HeroSection navigate={navigate} />
      <HowItWorksSection />
      <KeyFeaturesSection />
      <SimulationAnalyticsSection />
      <CtaSection navigate={navigate} />
    </div>
  );
}

// --- Sub-components for a Clean and Organized Structure ---

const HeroSection = ({ navigate }) => (
  <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
    <video
      src="/assets/images/3125448-uhd_3840_2160_25fps.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative z-10 text-center text-gray-900 px-4 max-w-3xl"
    >
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
      >
        Ace Your Next Interview with{" "}
        <span className="text-indigo-600">AI-Powered Practice</span>
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
      >
        Practice real interview scenarios, receive instant, data-driven
        feedback, and build the confidence to land your dream job with Job
        Verse.
      </motion.p>
      <motion.div
        variants={staggerContainer}
        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <motion.button
          variants={fadeInUp}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/practice")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md transition-all"
        >
          Start Practicing Now
        </motion.button>
        <motion.button
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg shadow-md border border-gray-200"
        >
          Book a Demo
        </motion.button>
      </motion.div>
    </motion.div>
  </section>
);

const HowItWorksSection = () => {
  const steps = [
    {
      icon: FiSettings,
      title: "Set Your Goals",
      description:
        "Define the role, skills, and experience level you want to practice for.",
    },
    {
      icon: FiMessageSquare,
      title: "Engage with AI",
      description:
        "Our AI simulates a real, dynamic interview scenario tailored to your goals.",
    },
    {
      icon: FiTrendingUp,
      title: "Get Instant Feedback",
      description:
        "Analyze your performance with data-driven insights on clarity, confidence, and more.",
    },
    {
      icon: FiAward,
      title: "Improve and Succeed",
      description:
        "Continuously practice and track your progress to master your interview skills.",
    },
  ];
  return (
    <section id="how-it-works" className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          A Simple Path to Success
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          In just four simple steps, Job Verse prepares you for any interview
          challenge.
        </motion.p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center p-6"
            >
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-5 bg-indigo-100 text-indigo-600 rounded-full">
                <step.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const KeyFeaturesSection = () => {
  const features = [
    {
      icon: FiCpu,
      title: "Realistic Simulation",
      description:
        "Engage in lifelike interview scenarios powered by our advanced, conversational AI.",
    },
    {
      icon: FiBarChart2,
      title: "Instant Feedback",
      description:
        "Get real-time analysis and actionable insights on your answers, tone, and clarity.",
    },
    {
      icon: FiBriefcase,
      title: "Customizable Practice",
      description:
        "Tailor mock interviews for any industry, job role, and experience level.",
    },
    {
      icon: FiZap,
      title: "Adaptive Learning",
      description:
        "Our AI adjusts question difficulty based on your performance for personalized practice.",
    },
  ];
  return (
    <section id="features" className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Everything You Need to Succeed
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Job Verse is packed with powerful features to help you build
          confidence and master your interviews.
        </motion.p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex items-start p-6 bg-white rounded-xl shadow-md space-x-5"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600">
                  <feature.icon size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-1 text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SimulationAnalyticsSection = () => (
  <section className="bg-white py-20 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      {/* Simulation */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          AI Interview Simulation
        </h3>
        <div className="space-y-4 p-6 bg-gray-50 rounded-xl shadow-inner">
          <ChatMessage
            from="ai"
            text="Hello, I'm your virtual interviewer. Ready to start?"
          />
          <ChatMessage from="user" text="Yes, I'm ready. Let's begin." />
          <ChatMessage
            from="ai"
            text="Great! Can you tell me about a time you overcame a significant challenge?"
          />
        </div>
      </motion.div>
      {/* Analytics */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Your Performance Analytics
        </h3>
        <div className="space-y-5 p-6 bg-gray-50 rounded-xl shadow-inner">
          <ProgressBar label="Confidence Score" percentage={80} />
          <ProgressBar label="Response Clarity" percentage={70} />
          <ProgressBar label="Overall Performance" percentage={75} />
        </div>
      </motion.div>
    </div>
  </section>
);

const ChatMessage = ({ from, text }) => (
  <div
    className={`flex items-start gap-3 ${from === "user" ? "justify-end" : ""}`}
  >
    {from === "ai" && (
      <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0"></div>
    )}
    <div
      className={`px-4 py-2 rounded-lg max-w-xs ${
        from === "ai"
          ? "bg-indigo-100 text-indigo-800"
          : "bg-indigo-600 text-white"
      }`}
    >
      <p className="text-sm">{text}</p>
    </div>
  </div>
);

const ProgressBar = ({ label, percentage }) => (
  <div>
    <div className="flex justify-between mb-1">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-sm font-medium text-indigo-600">{percentage}%</p>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <motion.div
        className="bg-indigo-600 h-2.5 rounded-full"
        initial={{ width: "0%" }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>
    </div>
  </div>
);

const CtaSection = ({ navigate }) => (
  <section className="bg-indigo-600">
    <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl font-extrabold text-white sm:text-4xl"
      >
        Ready to Land Your Dream Job?
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-4 text-lg text-indigo-200"
      >
        Start practicing with Job Verse today and take the next step in your
        career with confidence.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/signup")}
        className="mt-8 bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full text-lg shadow-lg"
      >
        Sign Up for Free <FiChevronRight className="inline ml-2" />
      </motion.button>
    </div>
  </section>
);
