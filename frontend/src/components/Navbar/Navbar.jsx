import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" bg-white text-black p-4 shadow-xl fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-9">
          <video className="w-20 h-20 rounded-xl" autoPlay muted loop>
            <source src="/assets/images/Logo/logo2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <h1 className="text-3xl font-extrabold tracking-wide cursor-pointer text-black opacity-80 transition duration-500 hover:opacity-100">
            <span className="text-blue-800">
              <span className="text-4xl text-blue-800">S</span>kill
            </span>
            <span className="text-4xl">C</span>heck
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "About", "Features", "Practice", "Contact", "Login"].map(
            (item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-lg font-semibold text-black opacity-80 underline transition duration-300 hover:opacity-100"
                >
                  {item}
                </Link>
              </li>
            )
          )}
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
            {[
              "Home",
              "About",
              "Features",
              "Practice",
              "Feedback",
              "Contact",
              "Login",
            ].map((item, index) => (
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
