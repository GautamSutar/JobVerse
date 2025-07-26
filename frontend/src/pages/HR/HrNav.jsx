import React from "react";
import { Link } from "react-router-dom";

const HrNav = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">HR Portal</div>
        <div className="space-x-4">
          <Link to="/hr-dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/create-job" className="hover:text-gray-200">
            Create Job
          </Link>
          <div className="relative">
            <button className="flex items-center space-x-2 hover:text-gray-200">
              <img
                src="https://via.placeholder.com/30"
                alt="Profile"
                className="rounded-full"
              />
              <span>Profile</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg hidden group-hover:block">
              <Link
                to="/profile-completion"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HrNav;
