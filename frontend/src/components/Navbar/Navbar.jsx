import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-5 shadow-xl fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/assets/images/Logo/logo.jpg" 
            alt="Logo" 
            className="h-12 w-12 object-contain cursor-pointer 
            hover:brightness-125 transition duration-500"
          />

          <h1 className="text-3xl font-extrabold tracking-wide cursor-pointer text-pink-500 opacity-80 transition duration-500 hover:opacity-100">
            SkillCheck
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "About", "Features", "Practice", "Contact", "Login"].map((item, index) => (
            <li key={index}>
              <Link
                to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-lg font-semibold text-pink-500 opacity-80 underline transition duration-300 hover:opacity-100"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-5">
            {["Home", "About", "Features", "Practice", "Feedback", "Contact", "Login"].map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-lg font-semibold text-pink-500 opacity-80 underline transition duration-300 hover:opacity-100"
                  onClick={() => setIsOpen(false)} // Closes menu when clicked
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;