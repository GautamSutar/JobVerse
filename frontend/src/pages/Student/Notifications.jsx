import React, { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { FiBriefcase, FiCheckCircle } from "react-icons/fi"; // Added new icons
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Initialize with null
  const navigate = useNavigate();

  const role = localStorage.getItem("userRole");

  // --- No changes to your core logic ---
  useEffect(() => {
    if (role !== "student") return;

    const socket = new WebSocket("ws://127.0.0.1:8001/ws/jobs/notifications/");

    socket.onopen = () => console.log("✅ WebSocket connected");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📨 New job received:", data);
        setNotifications((prev) => [data, ...prev]);
        setUnreadCount((prev) => prev + 1);
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => console.error("❌ WebSocket error:", error);
    socket.onclose = () => console.log("🔌 WebSocket disconnected");

    return () => socket.close();
  }, [role]);

  // --- No changes to your core logic ---
  const handleClick = () => {
    if (!dropdownOpen) {
      setUnreadCount(0);
    }
    setDropdownOpen(!dropdownOpen);
  };

  // --- No changes to your core logic ---
  const handleJobClick = (jobId) => {
    navigate(`/job-details/${jobId}`);
    setDropdownOpen(false);
  };

  // --- No changes to your core logic ---
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (role !== "student") return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* --- Bell Icon & Badge --- */}
      <div
        onClick={handleClick}
        className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
      >
        <FaBell size={22} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-6 w-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold border-2 border-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </div>

      {/* --- Dropdown Panel with Animation --- */}
      <div
        className={`absolute right-0 mt-2 w-80 sm:w-96 bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden z-50 transition-all duration-200 ease-out transform
          ${
            dropdownOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        {/* --- Dropdown Header --- */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-800">Notifications</h3>
        </div>

        {/* --- Notifications List --- */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((job, index) => (
                <li
                  key={index}
                  onClick={() => handleJobClick(job.job_id)}
                  className="flex items-start gap-4 p-4 hover:bg-indigo-50 cursor-pointer transition-colors duration-150 border-t border-gray-100 first:border-t-0"
                >
                  <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full p-2">
                    <FiBriefcase size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm text-gray-800">
                      {job.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {job.company} &middot; {job.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            /* --- Empty State --- */
            <div className="flex flex-col items-center justify-center text-center p-8">
              <FiCheckCircle size={40} className="text-green-500 mb-3" />
              <h4 className="font-semibold text-gray-700">All Caught Up!</h4>
              <p className="text-sm text-gray-500 mt-1">
                You have no new notifications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
