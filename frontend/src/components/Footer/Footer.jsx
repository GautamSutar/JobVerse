import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowRight,
} from "react-icons/fi";

export default function Footer() {
  return (
    // Main container with white background and dark text
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Mission */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              <span className="text-indigo-600">Skill</span>Check
            </h2>
            <p className="text-gray-600 text-sm max-w-xs">
              An AI-powered interview platform designed to enhance hiring
              processes and empower skill-building for the next generation of
              professionals.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialLink href="#" icon={<FiFacebook />} />
              <SocialLink href="#" icon={<FiTwitter />} />
              <SocialLink href="#" icon={<FiInstagram />} />
              <SocialLink href="#" icon={<FiLinkedin />} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <FooterLinks
            title="Quick Links"
            links={[
              { text: "Home", href: "/home" },
              { text: "Features", href: "/features" },
              { text: "Contact Us", href: "/contact" },
              { text: "Login", href: "/login" },
            ]}
          />

          {/* Column 3: Resources */}
          <FooterLinks
            title="Resources"
            links={[
              { text: "Blog", href: "/blog" },
              { text: "FAQs", href: "/faqs" },
              { text: "Privacy Policy", href: "/privacy-policy" },
              { text: "Terms of Service", href: "/terms-of-service" },
            ]}
          />

          {/* Column 4: Newsletter/Updates */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Get the latest news, updates, and feature releases straight to
              your inbox.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-gray-100 text-gray-800 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700 transition-colors"
                aria-label="Subscribe"
              >
                <FiArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SkillCheck. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Reusable component for the link columns
const FooterLinks = ({ title, links }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.text}>
          <Link
            to={link.href}
            className="text-gray-600 hover:text-indigo-600 hover:pl-1 transition-all duration-300"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Reusable component for social media icons, styled for a light background
const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 bg-gray-100 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);
