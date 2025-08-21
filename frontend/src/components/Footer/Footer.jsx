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
    // Main container with a soft, light gray background
    <footer className="bg-slate-50 text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Mission */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-purple-600">Job</span>Verse
            </h2>
            <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
              An AI-powered interview platform designed to enhance hiring
              processes and empower skill-building for the next generation of
              professionals.
            </p>
            <div className="flex space-x-4 mt-8">
              <SocialLink href="#" icon={<FiFacebook size={18} />} />
              <SocialLink href="#" icon={<FiTwitter size={18} />} />
              <SocialLink href="#" icon={<FiInstagram size={18} />} />
              <SocialLink href="#" icon={<FiLinkedin size={18} />} />
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
            <p className="text-gray-600 text-sm mb-5">
              Get the latest news, updates, and feature releases straight to
              your inbox.
            </p>
            <form className="flex items-center shadow-sm rounded-lg">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white text-gray-800 border-t border-b border-l border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white p-4 rounded-r-lg hover:bg-purple-700 transition-colors duration-300"
                aria-label="Subscribe"
              >
                <FiArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} JobVerse. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Reusable component for the link columns
const FooterLinks = ({ title, links }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-900 mb-5">{title}</h2>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.text}>
          <Link
            to={link.href}
            className="text-gray-600 hover:text-purple-600 hover:pl-1.5 transition-all duration-300"
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
    className="text-gray-500 bg-white p-3 rounded-full shadow-sm border border-gray-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300"
  >
    {icon}
  </a>
);
