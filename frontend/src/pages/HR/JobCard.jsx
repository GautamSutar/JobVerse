import React from "react";
import { Link } from "react-router-dom";
import {
  FiEye,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

const JobCard = ({ job }) => {
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:border-indigo-500 border-2 border-transparent">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              {job.category}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {job.title}
            </h3>
          </div>
          <div className="text-xs text-right text-gray-500">
            <p>Posted</p>
            <p>{timeSince(job.created_at)}</p>
          </div>
        </div>

        <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="flex items-center">
            <FiMapPin className="text-gray-400 mr-2" />
            <span>{job.location || "Not specified"}</span>
          </div>
          <div className="flex items-center">
            <FiBriefcase className="text-gray-400 mr-2" />
            <span className="capitalize">
              {job.job_type?.replace("_", " ")}
            </span>
          </div>
          <div className="flex items-center">
            <FiClock className="text-gray-400 mr-2" />
            <span>{job.experience_level || "Any"}</span>
          </div>
        </div>

        <div className="border-t pt-4 flex justify-end">
          <Link
            to={`/job/${job.id}/applicants`}
            className="group inline-flex items-center justify-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            View Applicants
            <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
