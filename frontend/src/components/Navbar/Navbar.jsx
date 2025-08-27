import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import {
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiStar,
  FiTool,
  FiMail,
  FiUser, 
  FiLogOut,
  FiGrid,
  FiChevronDown,
} from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState({
    token: useAuthStore((state) => state.accessToken),
    role: useAuthStore((state) => state.role),
    firstName: useAuthStore((state) => state.first_name),
  });
  const refreshToken = useAuthStore.getState().refreshToken;
  useEffect(() => {
    const handleStorageChange = () => {
      setAuth({
        token: useAuthStore((state) => state.accessToken),
        role: useAuthStore((state) => state.role),
        firstName: useAuthStore((state) => state.first_name),
      });
    };

    const updateUserState = () => {
      handleStorageChange();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", updateUserState);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", updateUserState);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("auth/logout/", {
        refreshToken: useAuthStore((state) => state.refreshToken),
      });

      toast.success("You have been successfully logged out!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log("Logout token:", auth.token);
      console.log("Logout refreshToken:", {
        refreshToken: useAuthStore((state) => state.refreshToken),
      });
      console.error(
        "Logout failed, but proceeding with client-side cleanup:",
        err
      );

      toast.error(
        err.response?.data?.error ||
          err.message ||
          "An unknown error occurred during logout.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } finally {
      Object.keys(localStorage).forEach((key) => {
        if (
          key.startsWith("student") ||
          key.startsWith("hr") ||
          [
            "authToken",
            "refreshToken",
            "userRole",
            "userEmail",
            "first_name",
            "last_name",
          ].includes(key)
        ) {
          localStorage.removeItem(key);
        }
      });

      window.dispatchEvent(new Event("authChange"));
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Logo />
          <div className="hidden md:flex items-center space-x-2">
            <NavLinks role={auth.role} />
            <div className="w-px h-6 bg-gray-200 mx-2"></div> {/* Divider */}
            <AuthButtons auth={auth} handleLogout={handleLogout} />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-indigo-600"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        auth={auth}
        handleLogout={handleLogout}
      />
    </nav>
  );
}
const Logo = () => (
  <Link to="/" className="flex items-center space-x-3">
    <video className="w-16 h-16 rounded-lg" autoPlay muted loop playsInline>
      <source src="/assets/images/Logo/logo2.mp4" type="video/mp4" />
    </video>
    <h1 className="text-2xl font-bold tracking-tighter text-gray-800">
      <span className="text-indigo-600">Job</span>Verse
    </h1>
  </Link>
);

const NavLinks = ({ role }) => {
  const navItems = [
    { title: "Home", path: "/", icon: FiHome },
    { title: "About", path: "/about", icon: FiInfo },
    { title: "Features", path: "/features", icon: FiStar },
    { title: "Contact", path: "/contact", icon: FiMail },
  ];

  return (
    <ul className="flex items-center space-x-1">
      {navItems.map(
        (item) =>
          (!item.role || item.role === role) && (
            <li key={item.title}>
              <Link
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
              >
                <item.icon className="mr-2" />
                {item.title}
              </Link>
            </li>
          )
      )}
    </ul>
  );
};

const AuthButtons = ({ auth, handleLogout }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDashboardClick = () => {
    navigate(auth.role === "student" ? "/student-dashboard" : "/hr-dashboard");
    setDropdownOpen(false);
  };

  if (auth.token) {
    return (
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 p-2 rounded-full cursor-pointer hover:bg-gray-100"
        >
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {auth.firstName ? (
              auth.firstName.charAt(0).toUpperCase()
            ) : (
              <FiUser />
            )}
          </div>
          <span className="hidden lg:block text-sm font-medium text-gray-700">
            {auth.firstName || "Account"}
          </span>
          <FiChevronDown
            className={`transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 cursor-pointer border"
            >
              <button
                onClick={handleDashboardClick}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                <FiGrid className="mr-2" /> Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-50"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link
        to="/login"
        className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
      >
        Login
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
      >
        Sign Up
      </Link>
    </div>
  );
};

const MobileMenu = ({ isOpen, setIsOpen, auth, handleLogout }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 bg-white z-50 p-4 md:hidden"
      >
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-gray-600 hover:text-red-600"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <ul className="flex flex-col space-y-2">
            {[
              { title: "Home", path: "/", icon: FiHome },
              { title: "About", path: "/about", icon: FiInfo },
              { title: "Features", path: "/features", icon: FiStar },
              { title: "Contact", path: "/contact", icon: FiMail },
            ].map(
              (item) =>
                (!item.role || item.role === auth.role) && (
                  <li key={item.title}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center w-full px-4 py-3 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <item.icon className="mr-3" />
                      {item.title}
                    </Link>
                  </li>
                )
            )}
          </ul>
          <div className="border-t pt-4">
            {/* Reusing AuthButtons in mobile requires passing the logout function correctly */}
            <AuthButtons
              auth={auth}
              handleLogout={() => {
                handleLogout();
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
