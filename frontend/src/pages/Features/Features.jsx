import React from "react";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiBarChart2,
  FiSettings,
  FiZap,
  FiShield,
  FiCode,
  FiCheckCircle,
  FiArrowRight,
  FiBriefcase, // Added for consistency
} from "react-icons/fi";

// --- Main Features Page Component ---
export default function Features() {
  const featuresData = [
    {
      title: "AI-Powered Interviews",
      description:
        "Experience the next generation of interviews. Our AI conducts dynamic, real-time conversations, asking intelligent and relevant questions tailored to the specific job role and candidate's skills.",
      benefits: [
        { icon: FiCpu, text: "Advanced conversational AI" },
        { icon: FiZap, text: "Real-time, adaptive questioning" },
        { icon: FiSettings, text: "Tailored to any job description" },
      ],
      image: "/assets/images/Features/f1.jpeg",
      align: "left",
    },
    {
      title: "Instant Feedback & Scoring",
      description:
        "Receive immediate, unbiased analysis of interview performance. Our AI provides a detailed breakdown of strengths and weaknesses, complete with actionable feedback to help candidates improve.",
      benefits: [
        { icon: FiBarChart2, text: "Comprehensive performance analytics" },
        { icon: FiCheckCircle, text: "Actionable, data-driven insights" },
        { icon: FiShield, text: "Unbiased and consistent evaluation" },
      ],
      image: "/assets/images/Features/f2.jpg",
      align: "right",
    },
    {
      title: "Multi-Stack & Role Support",
      description:
        "Whether you're hiring a software engineer, a project manager, or a sales executive, Job Verse has you covered. Our platform supports a vast array of programming languages, tech stacks, and professional roles.",
      benefits: [
        { icon: FiCode, text: "Supports dozens of tech stacks" },
        { icon: FiBriefcase, text: "Covers a wide range of job roles" },
        { icon: FiSettings, text: "Fully customizable skill assessments" },
      ],
      image: "/assets/images/Features/f6.jpg",
      align: "left",
    },
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen mt-20">
      <HeroSection />

      <div className="py-20">
        {featuresData.map((feature, index) => (
          <FeatureSection key={index} {...feature} />
        ))}
      </div>

      <CtaSection />
    </div>
  );
}

// --- Sub-components for a Clean and Organized Structure ---

const HeroSection = () => (
  <div className="relative bg-gray-50 text-center py-20 px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
        The Future of Interviewing is Here
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
        Discover how{" "}
        <span className="font-semibold text-indigo-600">Job Verse</span> uses
        cutting-edge AI to create a more efficient, insightful, and equitable
        hiring process for everyone.
      </p>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-12 max-w-5xl mx-auto"
    >
      <img
        src="/assets/images/Features/banner.png"
        alt="Job Verse Features Banner"
        className="w-full h-auto rounded-2xl shadow-2xl object-cover"
      />
    </motion.div>
  </div>
);

const FeatureSection = ({ title, description, benefits, image, align }) => {
  const isAlignedLeft = align === "left";

  return (
    <div className={`py-16 ${isAlignedLeft ? "bg-white" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid md:grid-cols-2 gap-12 items-center`}>
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: isAlignedLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className={`rounded-xl overflow-hidden shadow-2xl ${
              isAlignedLeft ? "md:order-1" : "md:order-2"
            }`}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`${isAlignedLeft ? "md:order-2" : "md:order-1"}`}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-gray-600 text-lg mb-6">{description}</p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-700">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="ml-4 text-md text-gray-700">{benefit.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CtaSection = () => (
  <div className="bg-indigo-700">
    <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        <span className="block">Ready to Revolutionize Your Hiring?</span>
      </h2>
      <p className="mt-4 text-lg leading-6 text-indigo-200">
        Join the growing number of companies and candidates choosing a smarter
        way to interview.
      </p>
      <motion.a
        href="/signup"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
      >
        Get Started Now <FiArrowRight className="ml-2" />
      </motion.a>
    </div>
  </div>
);
