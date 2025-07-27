import React from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiUsers,
  FiCpu,
  FiZap,
  FiAward,
  FiBarChart,
  FiArrowRight,
} from "react-icons/fi";

// --- Main About Page Component ---
export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen mt-20">
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
}

// --- Sub-components for a clean and organized structure ---

const HeroSection = () => (
  <div className="relative text-center bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    {/* Decorative background gradient */}
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-indigo-100"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 0% 100%)" }}
      ></div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-4xl mx-auto"
    >
      <img
        src="/assets/images/Logo/logo2.png" // Replace with your actual logo icon if you have one
        alt="Job Verse Logo"
        className="mx-auto h-24 w-24 mb-6 rounded-full shadow-lg"
      />
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
        About <span className="text-indigo-600">Job Verse</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Job Verse is an advanced AI-powered interview platform designed to
        empower both HR professionals and freshers, streamlining the path from
        application to career success.
      </p>
    </motion.div>
  </div>
);

const BenefitsSection = () => (
  <div className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-10">
        <BenefitCard
          icon={<FiBriefcase className="h-10 w-10 text-indigo-500" />}
          title="For HR Professionals"
          description="Maximize efficiency with AI-driven interviews. Streamline candidate screening and focus on securing top talent with a time-saving, data-driven approach."
        />
        <BenefitCard
          icon={<FiUsers className="h-10 w-10 text-green-500" />}
          title="For Freshers & Students"
          description="Build confidence through realistic AI interview simulations. Receive instant, actionable feedback to hone your skills and excel in your career journey."
        />
      </div>
    </div>
  </div>
);

const BenefitCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300"
  >
    <div className="mb-5">{icon}</div>
    <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiCpu />,
      title: "Intelligent Automation",
      description:
        "AI generates tailored questions based on job roles, programming languages, and tech stacks.",
    },
    {
      icon: <FiZap />,
      title: "Efficient Hiring",
      description:
        "Streamline your initial screening process, saving valuable time and resources for your HR team.",
    },
    {
      icon: <FiAward />,
      title: "Realistic Simulations",
      description:
        "Candidates experience lifelike interview scenarios, preparing them for real-world challenges.",
    },
    {
      icon: <FiBarChart />,
      title: "Data-Driven Feedback",
      description:
        "Receive instant, actionable insights on performance to identify strengths and areas for improvement.",
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Why Choose Job Verse?
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Our platform is meticulously crafted to provide a seamless, efficient,
          and insightful interview experience for everyone involved.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-start space-x-5 p-6 bg-white rounded-xl shadow-md"
  >
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const CtaSection = () => (
  <div className="bg-indigo-700">
    <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        <span className="block">Ready to elevate your interviews?</span>
      </h2>
      <p className="mt-4 text-lg leading-6 text-indigo-200">
        Join Job Verse today and revolutionize your hiring process or kickstart
        your career.
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
