// src/components/SkillCheckHomepage/Navigation.jsx
import React from "react";

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              skill<span className="text-purple-700">Check</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Testimonials
            </a>
            <button className="px-4 py-2 rounded border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Log In
            </button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Try Free
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 shadow-lg">
          <a
            href="#features"
            className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            Testimonials
          </a>
          <div className="mt-4 space-y-2">
            <button className="w-full px-4 py-2 rounded border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Log In
            </button>
            <button className="w-full px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Try Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
