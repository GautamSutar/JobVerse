import React, { useState } from "react";
import { FiMenu, FiX, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDashboardClick = (event) => {
    event.preventDefault();
    if (token) {
      if (role === "student") {
        navigate("/student-dashboard");
      } else if (role === "hr") {
        navigate("/hr-dashboard");
      } else {
        navigate("/login");
      }
    }
  };

  const buttonClass = `
    px-4 py-2 rounded-full 
    flex items-center gap-2 
    text-slate-500
    shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
    transition-all
    hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
    hover:text-violet-500
  `;

  return (
    <nav className="bg-white text-black p-4 shadow-xl fixed w-full top-0 z-50">
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
                  className={buttonClass}
                >
                  <FiSend />
                  <span>{item}</span>
                </Link>
              </li>
            )
          )}
          <button onClick={handleDashboardClick} className={buttonClass}>
            <FiSend />
            <span>Dashboard</span>
          </button>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
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
                  className={buttonClass}
                  onClick={() => setIsOpen(false)}
                >
                  <FiSend />
                  <span>{item}</span>
                </Link>
              </li>
            ))}
            <button onClick={handleDashboardClick} className={buttonClass}>
              <FiSend />
              <span>Dashboard</span>
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
