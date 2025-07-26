import React, { useState } from "react";
import { FiMenu, FiX, FiSend } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");
  const refreshToken = localStorage.getItem("refreshToken");

  const toggleMenu = () => setIsOpen(!isOpen);

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

  const handleLogout = async () => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/logout/`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("hrJobs_")) {
          localStorage.removeItem(key);
        }
      });

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const shouldShowDashboardButton =
    token && (role === "student" || role === "hr");

  const buttonClass = `
    px-4 py-2 rounded-full 
    flex items-center gap-2 
    text-slate-500
    shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
    hover:text-violet-500
    transition-all duration-300 ease-in-out
    hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
    cursor-pointer
  `;

  const navItems = ["Home", "About", "Features", "Practice", "Contact"];

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

        <ul className="hidden md:flex space-x-6">
          {navItems.map((item, index) => {
            if (item === "Practice") {
              if (token && role === "student") {
                return (
                  <li key={index}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className={buttonClass}
                    >
                      <FiSend />
                      <span>{item}</span>
                    </Link>
                  </li>
                );
              } else return null;
            } else {
              return (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className={buttonClass}
                  >
                    <FiSend />
                    <span>{item}</span>
                  </Link>
                </li>
              );
            }
          })}
          <div className="relative group inline-block">
            <button className={buttonClass}>
              <FiSend />
              <span>Account</span>
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white rounded-lg shadow-md font-semibold py-2 z-20 w-32">
              <Link to="/login" className={buttonClass}>
                <FiSend />
                Login
              </Link>
              <Link to="/signup" className={buttonClass}>
                <FiSend />
                Signup
              </Link>
              <button onClick={handleLogout} className={buttonClass}>
                <FiSend />
                Logout
              </button>
            </div>
          </div>
          {shouldShowDashboardButton && (
            <button onClick={handleDashboardClick} className={buttonClass}>
              <FiSend />
              <span>Dashboard</span>
            </button>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-5">
            {navItems.map((item, index) => {
              if (item === "Practice") {
                if (token && role === "student") {
                  return (
                    <li key={index}>
                      <Link
                        to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className={buttonClass}
                      >
                        <FiSend />
                        <span>{item}</span>
                      </Link>
                    </li>
                  );
                } else return null;
              } else {
                return (
                  <li key={index}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className={buttonClass}
                    >
                      <FiSend />
                      <span>{item}</span>
                    </Link>
                  </li>
                );
              }
            })}
            <div className="relative group inline-block">
              <button className={buttonClass}>
                <FiSend />
                <span>Account</span>
              </button>
              <div className="absolute hidden group-hover:flex flex-col bg-white rounded-lg shadow-md font-semibold py-2 z-20 w-32">
                <Link to="/login" className={buttonClass}>
                  <FiSend />
                  Login
                </Link>
                <Link to="/signup" className={buttonClass}>
                  <FiSend />
                  Signup
                </Link>
                <button onClick={handleLogout} className={buttonClass}>
                  <FiSend />
                  Logout
                </button>
              </div>
            </div>
            {shouldShowDashboardButton && (
              <button onClick={handleDashboardClick} className={buttonClass}>
                <FiSend />
                <span>Dashboard</span>
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
