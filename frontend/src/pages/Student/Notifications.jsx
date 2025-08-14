import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaBell } from "react-icons/fa";
import { FiBriefcase, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useNotificationWebSocket from "../../hooks/useNotificationWebSocket";
import usePushNotifications from "../../hooks/usePushNotifications";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();
  const navigate = useNavigate();

  usePushNotifications();

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem("notifications") || "[]");
    console.log("Cached notifications:", cached);
    setNotifications(cached);
    setUnreadCount(cached.length);
  }, []);

  const handleIncoming = useCallback((data) => {
    setNotifications((prev) => {
      if (prev.some((n) => n.job_id === data.job_id)) {
        return prev;
      }
      const notification = {
        job_id: data.job_id,
        title: data.title,
        company: data.company,
        location: data.location,
        created_at: data.created_at || new Date().toISOString(),
      };
      const updated = [notification, ...prev];
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });

    setUnreadCount((c) => c + 1);
  }, []);

  useNotificationWebSocket(handleIncoming);

  const handleClearAll = useCallback(() => {
    localStorage.removeItem("notifications");
    setNotifications([]);
    setUnreadCount(0);
    setDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleJobClick = (jobId) => {
    navigate(`/job-details/${jobId}`);
    setDropdownOpen(false);
  };

  const role = localStorage.getItem("userRole");
  if (role !== "student") {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => {
          setUnreadCount(0);
          setDropdownOpen((v) => !v);
        }}
        className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
      >
        <FaBell size={22} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold border-2 border-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </div>

      <div
        className={`absolute right-0 mt-2 w-80 sm:w-96 bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden z-50 transition-all duration-200 ease-out transform ${
          dropdownOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-800">Notifications</h3>
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm text-indigo-600 hover:underline font-semibold focus:outline-none"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((job) => (
                <li
                  key={job.job_id}
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
                      {job.company} · {job.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
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
}
